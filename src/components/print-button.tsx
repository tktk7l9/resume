"use client";

import { PrinterIcon } from "lucide-react";

type PrintButtonProps = {
  label: string;
};

export function PrintButton({ label }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.print();
        }
      }}
      aria-label={label}
      className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-card text-foreground hover:bg-accent transition-colors text-sm font-medium"
    >
      <PrinterIcon className="w-4 h-4" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
