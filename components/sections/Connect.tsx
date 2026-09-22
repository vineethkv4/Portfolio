"use client";

import { useState } from "react";
import { SectionTopBar } from "@/components/sections/SectionTopBar";
import { SectionNav } from "@/components/sections/SectionNav";
import { Button } from "@/components/ui/button";
import { connectContent } from "@/content/sections/connect";
import { cn } from "@/lib/utils";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function UnderlineField({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      {children}
      <span
        className={cn(
          "mt-1 block h-px w-full transition-colors",
          error
            ? "bg-red-500"
            : "bg-white/25 group-focus-within:bg-white group-hover:bg-white",
        )}
        aria-hidden
      />
      {error ? (
        <p className="mt-2 font-[family-name:var(--font-display-serif)] text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Connect() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate() {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "Please enter a valid email.";
    }
    if (!message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          botcheck,
          subject: "Portfolio — Connect",
        }),
      });

      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        setStatus("error");
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const details: ContactDetail[] = [
    {
      label: "Email",
      value: connectContent.email,
      href: `mailto:${connectContent.email}`,
    },
    ...(connectContent.phone
      ? [
          {
            label: "Phone",
            value: connectContent.phone,
            href: `tel:${connectContent.phone.replace(/\s+/g, "")}`,
          },
        ]
      : []),
    { label: "Location", value: connectContent.location },
  ];

  return (
    <div className="signal-grid-bg relative min-h-dvh w-full text-white">
      <SectionTopBar theme="dark" />
      <SectionNav />

      <section className="relative mx-auto w-full max-w-[1500px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="relative z-10 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="font-[family-name:var(--font-display-serif)]">
            <h1 className="select-none font-[family-name:var(--font-pixel)] text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.9] tracking-[0.04em]">
              <span className="block text-white/[0.20]">LETS</span>
              <span className="block text-white/[0.20]">CONNECT</span>
            </h1>

            <dl className="mt-10 max-w-md space-y-4">
              {details.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-3"
                >
                  <dt className="text-sm text-white/40">{row.label}</dt>
                  <dd className="text-right text-base text-white/90">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="transition-opacity hover:opacity-60"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {connectContent.socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-base text-white/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={onSubmit}
            className="font-[family-name:var(--font-display-serif)]"
            noValidate
          >
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              checked={botcheck === "on"}
              onChange={(event) =>
                setBotcheck(event.target.checked ? "on" : "")
              }
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden
            />

            <label className="block text-sm text-white/40" htmlFor="connect-name">
              Name
            </label>
            <UnderlineField error={errors.name}>
              <input
                id="connect-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                className="mt-2 h-11 w-full border-none bg-transparent px-0 text-base text-white caret-white outline-none placeholder:text-white/20"
              />
            </UnderlineField>

            <label
              className="mt-8 block text-sm text-white/40"
              htmlFor="connect-email"
            >
              Email
            </label>
            <UnderlineField error={errors.email}>
              <input
                id="connect-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                className="mt-2 h-11 w-full border-none bg-transparent px-0 text-base text-white caret-white outline-none placeholder:text-white/20"
              />
            </UnderlineField>

            <label
              className="mt-8 block text-sm text-white/40"
              htmlFor="connect-message"
            >
              Message
            </label>
            <UnderlineField error={errors.message}>
              <textarea
                id="connect-message"
                name="message"
                rows={5}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: undefined }));
                  }
                }}
                className="mt-2 w-full resize-none border-none bg-transparent px-0 text-base leading-relaxed text-white caret-white outline-none placeholder:text-white/20"
              />
            </UnderlineField>

            <Button
              type="submit"
              disabled={status === "sending"}
              className="mt-10 h-11 rounded-md bg-[#2a2a2a] px-6 text-sm text-white hover:bg-[#333] disabled:opacity-40"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </Button>

            <p
              className={cn(
                "mt-4 min-h-[1.5rem] text-sm",
                status === "success" && "text-white/45",
                status === "error" && "text-red-400",
              )}
              role="status"
              aria-live="polite"
            >
              {status === "success"
                ? "Message sent. I’ll get back to you soon."
                : status === "error"
                  ? `Something went wrong. Email me directly at ${connectContent.email}.`
                  : null}
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
