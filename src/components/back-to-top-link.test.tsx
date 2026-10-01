import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BackToTopLink } from "@/components/back-to-top-link";

let reducedMotion = false;

beforeEach(() => {
  reducedMotion = false;
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: reducedMotion })),
  );
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.spyOn(window.history, "pushState");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

function mountTop() {
  const top = document.createElement("div");
  top.id = "top";
  top.tabIndex = -1;
  document.body.appendChild(top);
  return top;
}

describe("BackToTopLink", () => {
  it("is a plain #top anchor that works without JavaScript", () => {
    render(<BackToTopLink label="ページの先頭へ" />);
    expect(
      screen.getByRole("link", { name: "ページの先頭へ" }),
    ).toHaveAttribute("href", "#top");
  });

  it("jumps at once from far down, records history first and focuses the top", () => {
    const top = mountTop();
    vi.spyOn(window, "scrollY", "get").mockReturnValue(12_000);
    render(<BackToTopLink label="Back to top" />);

    const click = fireEvent.click(
      screen.getByRole("link", { name: "Back to top" }),
    );

    expect(click).toBe(false); // default navigation prevented
    expect(window.history.pushState).toHaveBeenCalledWith(null, "", "#top");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "instant",
    });
    expect(document.activeElement).toBe(top);
  });

  it("animates a short hop unless reduced motion is requested", () => {
    mountTop();
    vi.spyOn(window, "scrollY", "get").mockReturnValue(100);
    render(<BackToTopLink label="Back to top" />);
    const link = screen.getByRole("link", { name: "Back to top" });

    fireEvent.click(link);
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 0,
      behavior: "smooth",
    });

    reducedMotion = true;
    fireEvent.click(link);
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 0,
      behavior: "instant",
    });
  });

  it("leaves modified, non-primary and already-handled clicks to the browser", () => {
    mountTop();
    render(<BackToTopLink label="Back to top" />);
    const link = screen.getByRole("link", { name: "Back to top" });

    expect(fireEvent.click(link, { metaKey: true })).toBe(true);
    expect(fireEvent.click(link, { ctrlKey: true })).toBe(true);
    expect(fireEvent.click(link, { shiftKey: true })).toBe(true);
    expect(fireEvent.click(link, { altKey: true })).toBe(true);
    expect(fireEvent.click(link, { button: 1 })).toBe(true);

    link.addEventListener("click", (e) => e.preventDefault(), { once: true });
    fireEvent.click(link);
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(window.history.pushState).not.toHaveBeenCalled();
  });

  it("falls back to the native anchor when there is no #top target", () => {
    render(<BackToTopLink label="Back to top" />);
    expect(
      fireEvent.click(screen.getByRole("link", { name: "Back to top" })),
    ).toBe(true);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
