interface ResumeSkillCardProps {
  title: string;
  skills: string[];
}

export function ResumeSkillCard({ title, skills }: ResumeSkillCardProps) {
  return (
    <div className="skill-card border border-border rounded-lg p-4 bg-card">
      <h3 className="text-lg font-medium mb-2 text-foreground">{title}</h3>
      <ul className="space-y-1 text-muted-foreground">
        {skills.map((skill) => (
          <li key={skill} className="flex items-start text-muted-foreground">
            <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-timeline-work shrink-0" />
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
