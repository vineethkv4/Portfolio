type PrintMastheadProps = {
  title: string;
  summary: string;
  publishDate: string;
  tags: string[];
};

export function PrintMasthead({
  title,
  summary,
  publishDate,
  tags,
}: PrintMastheadProps) {
  return (
    <header className="border-b border-dashed border-foreground/30 pb-8">
      <div className="mb-6 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/50">
        <span>Case Study Job Ticket</span>
        <span>{publishDate}</span>
      </div>
      <h1 className="font-[family-name:var(--font-pixel)] text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-foreground/70">{summary}</p>
      <ul className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-widest text-foreground/50">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </header>
  );
}
