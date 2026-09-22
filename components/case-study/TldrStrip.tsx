type TldrStripProps = {
  items: string[];
};

export function TldrStrip({ items }: TldrStripProps) {
  return (
    <aside className="border border-foreground/20 bg-foreground text-background px-4 py-4">
      <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-background/60">
        TL;DR
      </p>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item}>— {item}</li>
        ))}
      </ul>
    </aside>
  );
}
