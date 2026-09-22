import {
  ScrollImageSwap,
  type ScrollImage,
} from "@/components/identity/ScrollImageSwap";

type IdentityPortraitProps = {
  images: ScrollImage[];
};

/** Boxed portrait frame — fills a relative parent, not full-bleed */
export function IdentityPortrait({ images }: IdentityPortraitProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#121018]">
      <ScrollImageSwap images={images} />
    </div>
  );
}
