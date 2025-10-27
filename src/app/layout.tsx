import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

// @ts-expect-error: allow side-effect CSS import without type declarations
import "./globals.css";

import { ScrollTopButton } from "@/components/misc/scroll-top-btn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asas Literárias",
  description: "Plataforma de doação de livros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className="w-screen h-screen p-0 m-0 !overflow-x-clip"
    >
      <body
        id="initial"
        className={`${geistSans.variable} ${geistMono.variable} antialiased top-0 left-0 min-h-screen absolute w-screen !overflow-x-clip bg-[var(--color-hero-bg-2)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollTopButton />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
