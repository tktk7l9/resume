import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { SpeedInsights } from "@vercel/speed-insights/next";

const url = "https://resume-tktk7l9.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "齋藤拓也のresume",
  description: "フロントエンドエンジニア 齋藤拓也の職務経歴書。Next.js・React・TypeScriptを中心としたWebアプリ開発の経歴とスキルを掲載。",
  authors: [{ name: "齋藤拓也" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url,
    siteName: "齋藤拓也のresume",
    title: "齋藤拓也のresume",
    description: "フロントエンドエンジニア 齋藤拓也の職務経歴書。Next.js・React・TypeScriptを中心としたWebアプリ開発の経歴とスキルを掲載。",
  },
  twitter: {
    card: "summary_large_image",
    title: "齋藤拓也のresume",
    description: "フロントエンドエンジニア 齋藤拓也の職務経歴書。Next.js・React・TypeScriptを中心としたWebアプリ開発の経歴とスキルを掲載。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
      </head>
      <body className="min-h-screen bg-[#f8f7f4] flex flex-col">
        <Header />
        <div className="flex-1">
          <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 py-8 gap-8">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        </div>
        <Footer />
        {process.env.VERCEL && <SpeedInsights />}
      </body>
    </html>
  );
}
