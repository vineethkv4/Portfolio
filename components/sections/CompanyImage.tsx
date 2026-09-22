import { cn } from "@/lib/utils";

type CompanyImageProps = {
  src?: string;
  className?: string;
};

const FALLBACK = "/images/ascent_img.jpg";

/**
 * Left-column Ascent photo.
 * Prefer `src` from `companies[].image`; falls back to the shared ascent plate.
 */
export function CompanyImage({ src = FALLBACK, className }: CompanyImageProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-neutral-200", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        onError={(event) => {
          event.currentTarget.src = FALLBACK;
        }}
      />
    </div>
  );
}
