import { describe, expect, it } from "vitest";
import { anchorScrollBehavior } from "@/lib/anchor-scroll";

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
});
