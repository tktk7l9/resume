import type { ReactNode } from "react";

interface ResumeTimelineProps {
	children: ReactNode;
}

export function ResumeTimeline({ children }: ResumeTimelineProps) {
	return (
		<div className="relative">
			{/* タイムラインの中央線 */}
			<div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e6e4df]"></div>
			<div className="space-y-8">{children}</div>
		</div>
	);
}
