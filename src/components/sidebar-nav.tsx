"use client";

import { ClockIcon, CodeIcon, RocketIcon, UserIcon } from "lucide-react";
import { type MouseEvent, useEffect, useState } from "react";
import { anchorScrollBehavior } from "@/lib/anchor-scroll";

const iconMap = {
  about: UserIcon,
  timeline: ClockIcon,
  projects: RocketIcon,
  skills: CodeIcon,
} as const;

export type SidebarNavId = keyof typeof iconMap;

export type SidebarNavItem = {
  id: SidebarNavId;
  label: string;
};

export function SidebarNav({
  items,
  basePath = "",
}: {
  items: SidebarNavItem[];
  basePath?: string;
}) {
  const [activeId, setActiveId] = useState<SidebarNavId | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) {
      setActiveId(null);
      return;
    }

    setActiveId(items[0]?.id ?? null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id as SidebarNavId);
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    for (const el of targets) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  // Same-page hops: land at once when the section is far away instead of
  // animating for seconds (SHIG 65), and hand focus to the section so a
  // keyboard or screen-reader user continues from there (SHIG 94).
  const handleClick =
    (id: SidebarNavId, href: string) =>
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const behavior = anchorScrollBehavior(
        target.getBoundingClientRect().top,
        window.innerHeight,
      );
      target.scrollIntoView({ behavior, block: "start" });
      history.pushState(null, "", href);
      target.focus({ preventScroll: true });
      setActiveId(id);
    };

  return (
    <ul className="py-1">
      {items.map((item) => {
        const Icon = iconMap[item.id];
        const active = item.id === activeId;
        const href = `${basePath}#${item.id}`;
        return (
          <li key={item.id}>
            <a
              href={href}
              onClick={handleClick(item.id, href)}
              aria-current={active ? "location" : undefined}
              className={
                active
                  ? "w-full min-h-11 text-left px-4 py-2 text-sm flex items-center gap-2 bg-accent text-foreground font-medium transition-colors"
                  : "w-full min-h-11 text-left px-4 py-2 text-sm flex items-center gap-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              }
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
