"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlitchThumbProps = {
  src: string | null;
  className?: string;
};

const SLICES = 12.0;
const CHROMATIC = 0.025;
const OFFSET = 0.12;
const LERP = 0.055;

const VS = `
attribute vec2 aPos;
varying vec2 vUV;
void main(){
  gl_Position = vec4(aPos, 0.0, 1.0);
  vUV = aPos * 0.5 + 0.5;
}
`;

const FS = `
precision mediump float;
uniform sampler2D uTex0, uTex1;
uniform float uProgress, uTime, uSlices, uChromatic, uOffset;
uniform vec2 uRes, uImg0, uImg1;
varying vec2 vUV;

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 cover(vec2 uv, vec2 canvas, vec2 img){
  float scale = max(canvas.x / max(img.x, 1.0), canvas.y / max(img.y, 1.0));
  vec2 size = img * scale;
  vec2 off = (size - canvas) * 0.5;
  return (uv * canvas + off) / size;
}

vec4 sampleChromatic(sampler2D tex, vec2 uv, float ch){
  vec4 c;
  c.r = texture2D(tex, uv + vec2(ch, 0.0)).r;
  c.g = texture2D(tex, uv).g;
  c.b = texture2D(tex, uv - vec2(ch, 0.0)).b;
  c.a = 1.0;
  return c;
}

void main(){
  float intensity = sin(uProgress * 3.14159);
  float slice  = floor(vUV.y * uSlices);
  float rng    = rand(vec2(slice, floor(uTime * 8.0)));
  float active = step(0.55, rand(vec2(slice, floor(uTime * 4.0))));
  float offset = (rng - 0.5) * uOffset * intensity * active;
  vec2 uv = vUV + vec2(offset, 0.0);
  float ch = intensity * uChromatic;
  vec4 a = sampleChromatic(uTex0, cover(uv, uRes, uImg0), ch);
  vec4 b = sampleChromatic(uTex1, cover(uv, uRes, uImg1), ch);
  gl_FragColor = mix(a, b, uProgress);
}
`;

type Engine = {
  show: (url: string) => void;
  hide: () => void;
  resize: () => void;
  destroy: () => void;
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

function bindTex(gl: WebGLRenderingContext, tex: WebGLTexture, unit: number) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, tex);
}

function createSolid(
  gl: WebGLRenderingContext,
  color: [number, number, number, number],
) {
  const tex = gl.createTexture();
  if (!tex) return null;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array(color),
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return tex;
}

function createGlitchEngine(
  canvas: HTMLCanvasElement,
  wrap: HTMLElement,
): Engine | null {
  const glContext = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
  });
  if (!glContext) return null;
  const gl: WebGLRenderingContext = glContext;

  const vs = compile(gl, gl.VERTEX_SHADER, VS);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FS);
  const prog = gl.createProgram();
  if (!vs || !fs || !prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  gl.uniform1i(gl.getUniformLocation(prog, "uTex0"), 0);
  gl.uniform1i(gl.getUniformLocation(prog, "uTex1"), 1);
  const uProg = gl.getUniformLocation(prog, "uProgress");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uRes = gl.getUniformLocation(prog, "uRes");
  const uImg0 = gl.getUniformLocation(prog, "uImg0");
  const uImg1 = gl.getUniformLocation(prog, "uImg1");
  gl.uniform1f(gl.getUniformLocation(prog, "uSlices"), SLICES);
  gl.uniform1f(gl.getUniformLocation(prog, "uChromatic"), CHROMATIC);
  gl.uniform1f(gl.getUniformLocation(prog, "uOffset"), OFFSET);

  const black0 = createSolid(gl, [0, 0, 0, 255]);
  const black1 = createSolid(gl, [0, 0, 0, 255]);
  if (!black0 || !black1) return null;

  let tex0 = black0;
  let tex1 = black1;
  let size0: [number, number] = [1, 1];
  let size1: [number, number] = [1, 1];
  let cur = 0;
  let tgt = 0;
  let raf: number | null = null;
  const t0 = performance.now();
  let loadGen = 0;
  let destroyed = false;
  let open = false;

  bindTex(gl, tex0, 0);
  bindTex(gl, tex1, 1);

  function resize() {
    const w = Math.max(1, wrap.clientWidth);
    const h = Math.max(1, wrap.clientHeight);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }

  function draw() {
    if (destroyed) return;
    cur += (tgt - cur) * LERP;
    const done = Math.abs(tgt - cur) < 0.001;
    if (done) {
      cur = tgt;
      raf = null;
      if (tgt === 1) {
        tex0 = tex1;
        size0 = size1;
        bindTex(gl, tex0, 0);
        gl.uniform2f(uImg0, size0[0], size0[1]);
        cur = 0;
        tgt = 0;
      }
    } else {
      raf = requestAnimationFrame(draw);
    }
    gl.uniform1f(uProg, cur);
    gl.uniform1f(uTime, (performance.now() - t0) / 1000);
    gl.uniform2f(uImg0, size0[0], size0[1]);
    gl.uniform2f(uImg1, size1[0], size1[1]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function kick() {
    if (raf == null) raf = requestAnimationFrame(draw);
  }

  function uploadImage(img: HTMLImageElement, unit: 0 | 1) {
    const tex = gl.createTexture();
    if (!tex) return;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    if (unit === 0) {
      tex0 = tex;
      size0 = [img.naturalWidth, img.naturalHeight];
    } else {
      tex1 = tex;
      size1 = [img.naturalWidth, img.naturalHeight];
    }
  }

  function load(url: string, unit: 0 | 1, gen: number) {
    const img = new Image();
    img.onload = () => {
      if (destroyed || gen !== loadGen) return;
      uploadImage(img, unit);
      kick();
    };
    img.src = url;
  }

  resize();
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return {
    show(url: string) {
      const gen = ++loadGen;
      open = true;
      if (tgt === 1 || cur > 0.5) {
        tex0 = tex1;
        size0 = size1;
        bindTex(gl, tex0, 0);
        cur = 0;
      }
      tgt = 1;
      load(url, 1, gen);
      kick();
    },
    hide() {
      if (!open) return;
      open = false;
      loadGen += 1;
      if (cur < 0.01 && tgt === 0) {
        tex1 = tex0;
        size1 = size0;
        bindTex(gl, tex1, 1);
        tex0 = black0;
        size0 = [1, 1];
        bindTex(gl, tex0, 0);
        cur = 1;
      }
      tgt = 0;
      kick();
    },
    resize,
    destroy() {
      destroyed = true;
      loadGen += 1;
      if (raf != null) cancelAnimationFrame(raf);
    },
  };
}

export function GlitchThumb({ src, className }: GlitchThumbProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const engine = createGlitchEngine(canvas, wrap);
    engineRef.current = engine;
    if (!engine) return;

    const observer = new ResizeObserver(() => engine.resize());
    observer.observe(wrap);

    return () => {
      observer.disconnect();
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (src) engine.show(src);
    else engine.hide();
  }, [src]);

  return (
    <div
      ref={wrapRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={false}
        animate={{ x: src ? "0%" : "100%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
      </motion.div>
    </div>
  );
}
