import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import sendScheduledEmails from "@/lib/node-cron";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notification App",
  description: "Coding Challenge - Notification Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Start the scheduler
  if (typeof window === 'undefined') {
    sendScheduledEmails();
  }
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
