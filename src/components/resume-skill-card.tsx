interface ResumeSkillCardProps {
  title: string;
  skills: string[];
}

export function ResumeSkillCard({ title, skills }: ResumeSkillCardProps) {
  return (
    <div className="border border-[#e6e4df] rounded-lg p-4 bg-[#f5f4f0]">
      <h3 className="text-lg font-medium mb-2 text-[#4a4a4a]">{title}</h3>
      <ul className="list-disc list-inside space-y-1 text-[#6b6b6b]">
        {skills.map((skill) => (
          <li key={skill} className="flex items-start text-[#6b6b6b]">
            <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7eb0d5] shrink-0" />
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
