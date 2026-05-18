"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  label: string;
};

export function ThemeToggle({ label }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border bg-card text-foreground hover:bg-accent transition-colors"
    >
      {isDark ? (
        <SunIcon className="w-4 h-4" aria-hidden="true" />
      ) : (
        <MoonIcon className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}
