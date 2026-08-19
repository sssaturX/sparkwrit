import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  variable: "--font-syne",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
});

const body = Manrope({
  variable: "--font-figtree",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sparkwrit — AI генератор постов, резюме и писем",
  description:
    "Micro-SaaS: генерация постов, резюме и сопроводительных писем с выбором тональности. Next.js + OpenAI + Vercel.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
