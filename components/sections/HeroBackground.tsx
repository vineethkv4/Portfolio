export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 bg-[var(--bg)]"
      style={{
        backgroundImage: "url('/images/hero-field.jpg')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-hidden
    />
  );
}
