export function InfoStrip() {
  return (
    <div className="mx-auto flex w-full shrink-0 flex-col items-center gap-3 bg-white/60 px-5 py-4 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-6 sm:text-left">
      <div className="flex max-w-[280px] items-start justify-center gap-2 sm:max-w-[260px] sm:justify-start sm:gap-3">
        <svg
          className="mt-0.5 h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
          viewBox="0 0 24 24"
          fill="#15121c"
          aria-hidden
        >
          <path d="M12 0l3.5 8.5L24 12l-8.5 3.5L12 24l-3.5-8.5L0 12l8.5-3.5z" />
        </svg>
        <p className="font-[family-name:var(--font-display-serif)] text-[10px] font-semibold uppercase leading-[1.45] tracking-[0.06em] text-[var(--ink-soft)] sm:text-sm sm:leading-[1.7]">
          Designing interfaces, then shipping the code that runs them.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 font-[family-name:var(--font-mono)] text-[12px] sm:gap-6 sm:text-[13px]">
        <a
          href="mailto:vineethkv.pro@gmail.com"
          className="border-transparent text-[var(--ascent-bg)] transition-colors hover:text-[var(--signal-green)] font-semibold"
        >
          vineethkv.pro@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/vineeth-vijayan-bb836334/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-transparent text-[var(--ascent-bg)] transition-colors hover:text-[var(--signal-green)] font-semibold"
        >
          LinkedIn
        </a>
      </div>

      <div className="flex max-w-[280px] items-start justify-center gap-2 sm:max-w-[260px] sm:justify-end sm:gap-3">
        <p className="font-[family-name:var(--font-display-serif)] text-[10px] font-semibold uppercase leading-[1.45] tracking-[0.06em] text-[var(--ink-soft)] sm:max-w-[260px] sm:text-right sm:text-sm sm:leading-[1.7]">
          Building design systems and AI-assisted workflows that make complex
          work clearer and more human.
        </p>
        <svg
          className="mt-0.5 h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
          viewBox="0 0 24 24"
          fill="#15121c"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>
    </div>
  );
}
