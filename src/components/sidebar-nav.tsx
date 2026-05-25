"use client";

import { ClockIcon, CodeIcon, RocketIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

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

  return (
    <ul className="py-1">
      {items.map((item) => {
        const Icon = iconMap[item.id];
        const active = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              href={`${basePath}#${item.id}`}
              aria-current={active ? "true" : undefined}
              className={
                active
                  ? "w-full text-left px-4 py-2 text-sm flex items-center gap-2 bg-accent text-foreground font-medium transition-colors"
                  : "w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              }
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
