import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/site";

// metadataBase が無いと、ファイル規約の opengraph-image が
// http://localhost:3000/... という絶対URLで出力されてしまう。
export const metadata: Metadata = { metadataBase: new URL(siteUrl) };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        {children}
      </body>
    </html>
  );
}
