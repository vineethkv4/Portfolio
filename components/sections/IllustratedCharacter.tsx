import { cn } from "@/lib/utils";

type IllustratedCharacterProps = {
  className?: string;
};

/** Hero center motif — profile illustration from /public/images */
export function IllustratedCharacter({ className }: IllustratedCharacterProps) {
  return (
    <div className={cn("illustration-float w-full", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/profile_pic.svg"
        alt=""
        className="h-auto w-full"
        aria-hidden
        draggable={false}
      />
    </div>
  );
}
