"use client";

import { ExternalLink } from "@/components/external-link";
import {
	ADDRESS,
	EMAIL,
	GITHUb_URL,
	LINKEDIN_URL,
	PHONE_NUMBER,
} from "@/const";
import {
	ClockIcon,
	CodeIcon,
	GithubIcon,
	LanguagesIcon as LanguageIcon,
	LinkedinIcon,
	MailIcon,
	MapPinIcon,
	PhoneIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export function Sidebar() {
	const [activeSection, setActiveSection] = useState("timeline");

	// スクロール位置に基づいてアクティブなセクションを更新
	useEffect(() => {
		const handleScroll = () => {
			const sections = ["timeline", "skills", "languages"];
			const scrollPosition = window.scrollY + 150; // ヘッダーの高さを考慮

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const offsetTop = element.offsetTop;
					const offsetHeight = element.offsetHeight;

					if (
						scrollPosition >= offsetTop &&
						scrollPosition < offsetTop + offsetHeight
					) {
						setActiveSection(section);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ id: "timeline", label: "経歴", icon: <ClockIcon className="w-4 h-4" /> },
		{ id: "skills", label: "スキル", icon: <CodeIcon className="w-4 h-4" /> },
		{
			id: "languages",
			label: "言語",
			icon: <LanguageIcon className="w-4 h-4" />,
		},
	];

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			window.scrollTo({
				top: element.offsetTop - 100,
				behavior: "smooth",
			});
			setActiveSection(id);
		}
	};

	return (
		<aside className="w-full md:w-64 shrink-0">
			<div className="mb-6">
				<nav>
					<div className="border border-[#e6e4df] rounded-lg overflow-hidden bg-[#f5f4f0] mb-6">
						<h3 className="text-sm font-medium px-4 py-2 border-b border-[#e6e4df] text-[#4a4a4a]">
							目次
						</h3>
						<ul className="py-1">
							{navItems.map((item, index) => (
								<li key={`${item.id}-${index}`}>
									<button
										onClick={() => scrollToSection(item.id)}
										className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors
                    ${
											activeSection === item.id
												? "text-[#4a4a4a] font-medium bg-[#f0efe9]"
												: "text-[#6b6b6b] hover:bg-[#f0efe9]"
										}
                  `}
									>
										{item.icon}
										{item.label}
									</button>
								</li>
							))}
						</ul>
					</div>

					{/* デスクトップ表示 */}
					<div className="space-y-4 hidden md:block">
						<div className="border border-[#e6e4df] rounded-lg overflow-hidden bg-[#f5f4f0]">
							<h3 className="text-sm font-medium px-4 py-2 border-b border-[#e6e4df] text-[#4a4a4a]">
								連絡先
							</h3>
							<div className="p-4 text-sm text-[#6b6b6b] space-y-2">
								<div className="flex items-center gap-2">
									<MailIcon className="w-4 h-4 text-[#6b6b6b]" />
									<span>{EMAIL}</span>
								</div>
								<div className="flex items-center gap-2">
									<PhoneIcon className="w-4 h-4 text-[#6b6b6b]" />
									<span>{PHONE_NUMBER}</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPinIcon className="w-4 h-4 text-[#6b6b6b]" />
									<span>{ADDRESS}</span>
								</div>
							</div>
						</div>

						<div className="border border-[#e6e4df] rounded-lg overflow-hidden bg-[#f5f4f0]">
							<h3 className="text-sm font-medium px-4 py-2 border-b border-[#e6e4df] text-[#4a4a4a]">
								リンク
							</h3>
							<div className="p-4 flex gap-4">
								<ExternalLink
									href={GITHUb_URL}
									className="text-[#6b6b6b] hover:text-[#4a4a4a] transition-colors"
									aria-label="GitHub"
								>
									<GithubIcon className="w-5 h-5" />
								</ExternalLink>
								<ExternalLink
									href={LINKEDIN_URL}
									className="text-[#6b6b6b] hover:text-[#4a4a4a] transition-colors"
									aria-label="LinkedIn"
								>
									<LinkedinIcon className="w-5 h-5" />
								</ExternalLink>
							</div>
						</div>
					</div>

					{/* モバイル表示 */}
					<div className="mt-6 md:hidden">
						<div className="border border-[#e6e4df] rounded-lg p-3 bg-[#f5f4f0]">
							<div className="flex flex-wrap gap-3 justify-center">
								<a
									href={`mailto:${EMAIL}`}
									className="flex items-center gap-1 text-xs text-[#6b6b6b] hover:text-[#4a4a4a]"
								>
									<MailIcon className="w-3 h-3" />
									<span>メール</span>
								</a>
								<a
									href={`tel:${PHONE_NUMBER}`}
									className="flex items-center gap-1 text-xs text-[#6b6b6b] hover:text-[#4a4a4a]"
								>
									<PhoneIcon className="w-3 h-3" />
									<span>電話</span>
								</a>
								<span className="flex items-center gap-1 text-xs text-[#6b6b6b]">
									<MapPinIcon className="w-3 h-3" />
									<span>{ADDRESS}</span>
								</span>
								<ExternalLink
									href={GITHUb_URL}
									className="flex items-center gap-1 text-xs text-[#6b6b6b] hover:text-[#4a4a4a]"
								>
									<GithubIcon className="w-3 h-3" />
									<span>GitHub</span>
								</ExternalLink>
								<ExternalLink
									href={LINKEDIN_URL}
									className="flex items-center gap-1 text-xs text-[#6b6b6b] hover:text-[#4a4a4a]"
								>
									<LinkedinIcon className="w-3 h-3" />
									<span>LinkedIn</span>
								</ExternalLink>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</aside>
	);
}
