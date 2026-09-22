export type SignalTrack = "design" | "tech";

export const SIGNAL_TRACKS: readonly SignalTrack[] = ["design", "tech"];

export function isSignalTrack(value: unknown): value is SignalTrack {
  return value === "design" || value === "tech";
}
