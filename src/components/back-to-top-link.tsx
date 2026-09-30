"use client";

import { ArrowUpIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { anchorScrollBehavior } from "@/lib/anchor-scroll";

/**
 * Plain "#top" anchor that jumps at once from far down the page instead of
 * animating for seconds (SHIG 65), and hands focus to the header so keyboard
 * and screen-reader users continue from the top (SHIG 94). Without
 * JavaScript it is still an ordinary anchor.
 */
export function BackToTopLink({ label }: { label: string }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    const top = document.getElementById("top");
    if (!top) return;
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: anchorScrollBehavior(window.scrollY, window.innerHeight),
    });
    history.pushState(null, "", "#top");
    top.focus({ preventScroll: true });
  };

  return (
    // biome-ignore lint/a11y/useValidAnchor: same-page navigation that works without JavaScript; onClick only tunes the scroll and focus
    <a
      href="#top"
      onClick={handleClick}
      className="inline-flex min-h-11 items-center gap-1 text-sm text-foreground underline underline-offset-4 hover:opacity-80 print:hidden"
    >
      <ArrowUpIcon className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
