interface ResumeCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

export function ResumeCard({
  title,
  company,
  period,
  description,
}: ResumeCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow dark:border-zinc-800">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <span className="text-sm text-zinc-500 dark:text-zinc-400 md:ml-4 shrink-0">
          {period}
        </span>
      </div>
      <div className="text-zinc-600 dark:text-zinc-400 mb-2">{company}</div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
