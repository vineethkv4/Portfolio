"use client";

import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";

type ShowcaseLightboxProps = {
  src: string;
  alt: string;
  caption: string;
};

export function ShowcaseLightbox({ src, alt, caption }: ShowcaseLightboxProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button type="button" className="fig" aria-label={`Enlarge image: ${caption}`}>
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1040}
            sizes="(min-width: 961px) 40vw, 50vw"
          />
          <span className="fig-cap">{caption}</span>
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="echo-lb" />
        <DialogPrimitive.Content className="echo-lb-stage" aria-describedby={undefined}>
          <DialogPrimitive.Title className="sr-only">{caption}</DialogPrimitive.Title>
          <DialogPrimitive.Close className="echo-lb-x" aria-label="Close preview">
            ×
          </DialogPrimitive.Close>
          {/* Native img so a tall screen keeps its real height and can scroll. */}
          <img src={src} alt={alt} className="echo-lb-img" />
          <p className="echo-lb-cap">{caption}</p>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
