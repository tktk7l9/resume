import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/site";

// Without metadataBase, the file-convention opengraph-image is emitted with an
// absolute URL like http://localhost:3000/....
export const metadata: Metadata = { metadataBase: new URL(siteUrl) };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        {children}
      </body>
    </html>
  );
}
