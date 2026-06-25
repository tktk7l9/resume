import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        {children}
        {process.env.VERCEL && <SpeedInsights />}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
