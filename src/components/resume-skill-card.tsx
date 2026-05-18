interface ResumeSkillCardProps {
  title: string;
  skills: string[];
}

export function ResumeSkillCard({ title, skills }: ResumeSkillCardProps) {
  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <h3 className="text-sm font-medium mb-3 text-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs bg-background text-muted-foreground border border-border"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
