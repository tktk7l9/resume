import type { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  id: string;
  children: ReactNode;
  icon: ReactNode;
}

export function ResumeSection({
  title,
  id,
  children,
  icon,
}: ResumeSectionProps) {
  return (
    // tabIndex -1 lets the TOC hand focus to the section after a jump.
    <section
      id={id}
      tabIndex={-1}
      className="mb-10 scroll-mt-4 md:scroll-mt-24 focus:outline-none"
    >
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
