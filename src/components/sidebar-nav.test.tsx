import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SidebarNav, type SidebarNavItem } from "@/components/sidebar-nav";

const items: SidebarNavItem[] = [
  { id: "about", label: "自己紹介" },
  { id: "timeline", label: "経歴" },
  { id: "projects", label: "個人開発" },
  { id: "skills", label: "スキル" },
];

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

const observers: {
  callback: Callback;
  observed: Element[];
  disconnect: () => void;
  options?: IntersectionObserverInit;
}[] = [];

class FakeIntersectionObserver {
  constructor(callback: Callback, options?: IntersectionObserverInit) {
    observers.push({
      callback,
      observed: [],
      disconnect: vi.fn(),
      options,
    });
  }
  observe(el: Element) {
    observers[observers.length - 1]?.observed.push(el);
  }
  disconnect() {
    observers[observers.length - 1]?.disconnect();
  }
  unobserve() {}
  takeRecords() {
    return [];
  }
}

function mountSections(ids: string[]) {
  for (const id of ids) {
    const section = document.createElement("section");
    section.id = id;
    document.body.appendChild(section);
  }
}

function entry(id: string, top: number, isIntersecting = true) {
  return {
    isIntersecting,
    target: document.getElementById(id) as Element,
    boundingClientRect: { top } as DOMRectReadOnly,
  };
}

function activeLink() {
  return screen
    .getAllByRole("link")
    .find((link) => link.getAttribute("aria-current") === "location");
}

beforeEach(() => {
  observers.length = 0;
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

describe("SidebarNav", () => {
  it("links every item to its section under the base path", () => {
    render(<SidebarNav items={items} basePath="/ja" />);
    for (const item of items) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        `/ja#${item.id}`,
      );
    }
  });

  it("uses a bare fragment when no base path is given", () => {
    render(<SidebarNav items={items} />);
    expect(screen.getByRole("link", { name: "経歴" })).toHaveAttribute(
      "href",
      "#timeline",
    );
  });

  it("marks the first section as current before any scrolling", () => {
    mountSections(items.map((i) => i.id));
    render(<SidebarNav items={items} basePath="/ja" />);
    expect(activeLink()).toHaveTextContent("自己紹介");
    expect(observers[0]?.observed).toHaveLength(4);
  });

  it("follows the topmost visible section as the visitor scrolls", () => {
    mountSections(items.map((i) => i.id));
    render(<SidebarNav items={items} basePath="/ja" />);

    act(() => {
      observers[0]?.callback([
        entry("projects", 300),
        entry("timeline", 120),
        entry("about", -400, false),
      ]);
    });
    expect(activeLink()).toHaveTextContent("経歴");

    act(() => {
      observers[0]?.callback([entry("skills", 40)]);
    });
    expect(activeLink()).toHaveTextContent("スキル");
  });

  it("keeps the current item when nothing is intersecting", () => {
    mountSections(items.map((i) => i.id));
    render(<SidebarNav items={items} basePath="/ja" />);
    act(() => {
      observers[0]?.callback([entry("about", -900, false)]);
    });
    expect(activeLink()).toHaveTextContent("自己紹介");
  });

  it("marks nothing current when the sections are not on the page", () => {
    render(<SidebarNav items={items} basePath="/ja" />);
    expect(activeLink()).toBeUndefined();
    expect(observers).toHaveLength(0);
  });

  it("stops observing when unmounted", () => {
    mountSections(items.map((i) => i.id));
    const { unmount } = render(<SidebarNav items={items} basePath="/ja" />);
    unmount();
    expect(observers[0]?.disconnect).toHaveBeenCalledTimes(1);
  });

  describe("when a TOC row is clicked", () => {
    let reducedMotion = false;

    beforeEach(() => {
      reducedMotion = false;
      vi.stubGlobal(
        "matchMedia",
        vi.fn(() => ({ matches: reducedMotion })),
      );
      vi.spyOn(window.history, "pushState");
    });

    afterEach(() => vi.restoreAllMocks());

    function mountTarget(id: string, top: number) {
      mountSections([id]);
      const target = document.getElementById(id) as HTMLElement;
      target.tabIndex = -1;
      target.scrollIntoView = vi.fn();
      vi.spyOn(target, "getBoundingClientRect").mockReturnValue({
        top,
      } as DOMRect);
      return target;
    }

    it("jumps at once to a far section, records history first and focuses it", () => {
      const target = mountTarget("skills", 11_389);
      render(<SidebarNav items={items} basePath="/ja" />);

      const click = fireEvent.click(
        screen.getByRole("link", { name: "スキル" }),
      );

      expect(click).toBe(false);
      expect(window.history.pushState).toHaveBeenCalledWith(
        null,
        "",
        "/ja#skills",
      );
      expect(target.scrollIntoView).toHaveBeenCalledWith({
        behavior: "instant",
        block: "start",
      });
      expect(document.activeElement).toBe(target);
      expect(activeLink()).toHaveTextContent("スキル");
    });

    it("animates a near hop unless reduced motion is requested", () => {
      const target = mountTarget("timeline", 300);
      render(<SidebarNav items={items} basePath="/ja" />);
      const link = screen.getByRole("link", { name: "経歴" });

      fireEvent.click(link);
      expect(target.scrollIntoView).toHaveBeenLastCalledWith({
        behavior: "smooth",
        block: "start",
      });

      reducedMotion = true;
      fireEvent.click(link);
      expect(target.scrollIntoView).toHaveBeenLastCalledWith({
        behavior: "instant",
        block: "start",
      });
    });

    it("leaves modified, non-primary and already-handled clicks to the browser", () => {
      const target = mountTarget("projects", 2_000);
      render(<SidebarNav items={items} basePath="/ja" />);
      const link = screen.getByRole("link", { name: "個人開発" });

      expect(fireEvent.click(link, { metaKey: true })).toBe(true);
      expect(fireEvent.click(link, { ctrlKey: true })).toBe(true);
      expect(fireEvent.click(link, { shiftKey: true })).toBe(true);
      expect(fireEvent.click(link, { altKey: true })).toBe(true);
      expect(fireEvent.click(link, { button: 1 })).toBe(true);
      link.addEventListener("click", (e) => e.preventDefault(), {
        once: true,
      });
      fireEvent.click(link);

      expect(target.scrollIntoView).not.toHaveBeenCalled();
      expect(window.history.pushState).not.toHaveBeenCalled();
    });

    it("falls back to the native anchor when the section is missing", () => {
      render(<SidebarNav items={items} basePath="/ja" />);
      expect(
        fireEvent.click(screen.getByRole("link", { name: "自己紹介" })),
      ).toBe(true);
      expect(window.history.pushState).not.toHaveBeenCalled();
    });
  });
});
