import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
	title: "齋藤拓也のresume",
	description: "齋藤拓也のresume",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className="min-h-screen bg-[#f8f7f4] flex flex-col">
				<Header />
				<div className="flex-1">
					<div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 py-8 gap-8">
						<Sidebar />
						<main className="flex-1">{children}</main>
					</div>
				</div>
				<Footer />
				<SpeedInsights />
			</body>
		</html>
	);
}
