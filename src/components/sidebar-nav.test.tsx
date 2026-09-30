import { act, render, screen } from "@testing-library/react";
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
});
