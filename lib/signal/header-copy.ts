import type { SignalTrack } from "@/lib/signal/types";

/**
 * Optional unlocked-header variants — not wired into the UI yet.
 * TODO: confirm copy with Vineeth, do not finalize without approval.
 */
export function signalHeaderCopy(tracks: SignalTrack[]): string {
  const hasDesign = tracks.includes("design");
  const hasTech = tracks.includes("tech");

  if (hasDesign && hasTech) {
    // TODO: confirm copy with Vineeth — combined access
    return "DECODING PROBLEMS INTO INTERFACES THAT WORK";
  }
  if (hasTech) {
    // TODO: confirm copy with Vineeth — tech-only
    return "DECODING SYSTEMS INTO SHIPPED PRODUCT";
  }
  // TODO: confirm copy with Vineeth — design-only
  return "DECODING PROBLEMS INTO INTERFACES THAT WORK";
}
