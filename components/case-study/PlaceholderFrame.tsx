import { cn } from "@/lib/utils";

type PlaceholderFrameProps = {
  label: string;
  aspect?: "video" | "square" | "wide";
  className?: string;
};

export function PlaceholderFrame({
  label,
  aspect = "video",
  className,
}: PlaceholderFrameProps) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "wide"
        ? "aspect-[21/9]"
        : "aspect-video";

  return (
    <figure
      className={cn(
        "flex items-center justify-center border border-dashed border-foreground/30 bg-foreground/[0.03]",
        aspectClass,
        className,
      )}
    >
      <figcaption className="px-4 text-center text-xs uppercase tracking-[0.2em] text-foreground/45">
        [— screenshot placeholder: {label} —]
      </figcaption>
    </figure>
  );
}
