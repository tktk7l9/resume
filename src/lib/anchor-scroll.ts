/**
 * Smooth scrolling is only helpful when the eye can follow it. A TOC tap on
 * the phone can be 11,000px away, and Chrome then animates for about two
 * seconds while the active TOC row flickers through every section on the way
 * (SHIG 65, 63). Anything further than two viewports jumps at once.
 */
export function anchorScrollBehavior(
  distancePx: number,
  viewportHeightPx: number,
): "smooth" | "instant" {
  if (viewportHeightPx <= 0) return "instant";
  return Math.abs(distancePx) > viewportHeightPx * 2 ? "instant" : "smooth";
}
