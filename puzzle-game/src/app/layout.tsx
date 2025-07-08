import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toast";
import { AppHeader } from "@/components/AppHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knjižni puzzle",
  description: "Knjižni puzzle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="bg-gray-900 text-gray-100 flex flex-col items-center">
          <AppHeader />
        </div>
          {children}
          <Toaster />
      </body>
    </html>
  );
}