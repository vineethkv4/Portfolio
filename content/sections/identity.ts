/**
 * Identity section content — swap this module for MDX/CMS later.
 * Keep `headline` under ~140 characters for the designed overlap composition.
 */
export const identityContent = {
  headline:
    "Enthusiastic about crafting ideas, visual elements, motion and typography into memorable creations.",
} as const;

/** Layout QA samples — geometry must hold for all three lengths */
export const IDENTITY_HEADLINE_SAMPLES = {
  short: "Crafting ideas into memorable digital experiences.", // ~48 chars
  current: identityContent.headline, // ~99 chars
  long: "Enthusiastic about crafting ideas, visual elements, motion and typography into memorable creations that feel intentional, human, and built to last across product surfaces.", // ~175 chars
} as const;
