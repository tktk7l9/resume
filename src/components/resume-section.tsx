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
		<section id={id} className="mb-10">
			<div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#e6e4df]">
				<span className="text-[#6b6b6b]">{icon}</span>
				<h2 className="text-xl font-bold text-[#4a4a4a]">{title}</h2>
			</div>
			<div className="space-y-4">{children}</div>
		</section>
	);
}
