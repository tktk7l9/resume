/**
 * Smooth scrolling is only helpful when the eye can follow it. A TOC tap on
 * the phone can be 11,000px away, and Chrome then animates for about two
 * seconds while the active TOC row flickers through every section on the way
 * (SHIG 65, 63). Anything further than two viewports jumps at once.
 *
 * An explicit `behavior: "smooth"` overrides the stylesheet, which only turns
 * smooth scrolling on under `prefers-reduced-motion: no-preference`, so the
 * reduced-motion preference has to be honoured here as well.
 */
export function anchorScrollBehavior(
  distancePx: number,
  viewportHeightPx: number,
  prefersReducedMotion = false,
): "smooth" | "instant" {
  if (prefersReducedMotion || viewportHeightPx <= 0) return "instant";
  return Math.abs(distancePx) > viewportHeightPx * 2 ? "instant" : "smooth";
}

export type AnchorJumpWindow = {
  history: Pick<History, "pushState">;
  innerHeight: number;
  matchMedia: (query: string) => { matches: boolean };
};

export type AnchorJump = {
  href: string;
  /** Distance from the current scroll position to the target, in px. */
  distancePx: number;
  scroll: (behavior: "smooth" | "instant") => void;
  focus: () => void;
};

/**
 * Same-page hop that behaves like a native anchor: the history entry is
 * pushed before scrolling, because the browser records the scroll position
 * of the entry being left at that moment. Pushing after an instant jump would
 * make Back return to the target instead of where the reader was (SHIG 60).
 * Focus follows the jump so keyboard users continue from there (SHIG 94).
 */
export function jumpToAnchor(win: AnchorJumpWindow, jump: AnchorJump): void {
  win.history.pushState(null, "", jump.href);
  const reduced = win.matchMedia("(prefers-reduced-motion: reduce)").matches;
  jump.scroll(anchorScrollBehavior(jump.distancePx, win.innerHeight, reduced));
  jump.focus();
}
