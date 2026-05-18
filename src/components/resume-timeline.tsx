import type { ReactNode } from "react";

interface ResumeTimelineProps {
  children: ReactNode;
}

export function ResumeTimeline({ children }: ResumeTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
      <div className="space-y-8">{children}</div>
    </div>
  );
}
