import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TransitionProvider } from "@/components/animation/TransitionProvider";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vineeth Vijayan — UX Engineer",
    template: "%s — Vineeth Vijayan",
  },
  description:
    "Portfolio of Vineeth Vijayan, independent designer and UX engineer from Bangalore, India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--bg)]">
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
