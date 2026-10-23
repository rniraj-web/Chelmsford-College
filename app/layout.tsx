import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionConfig } from "motion/react";
import { SkipLink } from "@/components/SkipLink";
import { NotificationBar } from "@/components/NotificationBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chelmsford College",
  description: "A clickable prototype for Chelmsford College's website tender.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-surface font-body text-fg antialiased">
        <MotionConfig reducedMotion="user">
          <SkipLink />
          <NotificationBar
            action={{ href: "/courses", label: "Search courses" }}
          >
            Most courses starting September 2027 are open for applications now.
          </NotificationBar>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
