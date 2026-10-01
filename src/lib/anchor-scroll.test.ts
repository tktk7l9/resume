import { describe, expect, it } from "vitest";
import {
  type AnchorJumpWindow,
  anchorScrollBehavior,
  jumpToAnchor,
} from "@/lib/anchor-scroll";

describe("anchorScrollBehavior", () => {
  it("keeps the smooth scroll for hops within two viewports", () => {
    expect(anchorScrollBehavior(0, 844)).toBe("smooth");
    expect(anchorScrollBehavior(1200, 844)).toBe("smooth");
    expect(anchorScrollBehavior(-1500, 844)).toBe("smooth");
    expect(anchorScrollBehavior(1688, 844)).toBe("smooth");
  });

  it("jumps at once when the target is further than two viewports away", () => {
    expect(anchorScrollBehavior(1689, 844)).toBe("instant");
    expect(anchorScrollBehavior(11389, 844)).toBe("instant");
    expect(anchorScrollBehavior(-5000, 800)).toBe("instant");
  });

  it("falls back to an instant jump when the viewport height is unknown", () => {
    expect(anchorScrollBehavior(300, 0)).toBe("instant");
  });

  it("never animates when the reader asked for reduced motion", () => {
    expect(anchorScrollBehavior(300, 844, true)).toBe("instant");
    expect(anchorScrollBehavior(0, 844, true)).toBe("instant");
  });
});

describe("jumpToAnchor", () => {
  function fakeWindow(reducedMotion: boolean, calls: string[]) {
    const win: AnchorJumpWindow = {
      history: {
        pushState: (_data, _unused, url) => {
          calls.push(`push ${url}`);
        },
      },
      innerHeight: 844,
      matchMedia: (query) => ({
        matches: reducedMotion && query === "(prefers-reduced-motion: reduce)",
      }),
    };
    return win;
  }

  function run(reducedMotion: boolean, distancePx: number) {
    const calls: string[] = [];
    jumpToAnchor(fakeWindow(reducedMotion, calls), {
      href: "/ja#skills",
      distancePx,
      scroll: (behavior) => calls.push(`scroll ${behavior}`),
      focus: () => calls.push("focus"),
    });
    return calls;
  }

  it("pushes the history entry before scrolling so Back returns to where the reader was", () => {
    expect(run(false, 11389)).toEqual([
      "push /ja#skills",
      "scroll instant",
      "focus",
    ]);
  });

  it("animates short hops only without a reduced-motion preference", () => {
    expect(run(false, 300)).toContain("scroll smooth");
    expect(run(true, 300)).toContain("scroll instant");
  });
});
