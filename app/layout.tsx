import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DOM Playground - Learn HTML nesting with drag and drop",
  description: "Learn HTML nesting with drag and drop in this playground, created by Horacio Gutierrez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`bg-gradient-to-r from-emerald-500 to-emerald-900 text-slate-900 ${inter.className} flex flex-col min-h-[100dvh]`}>
        <Header />
        <main className='p-4 grow'>{children}</main>
        <Toaster />
        <Footer/>
      </body>
    </html>
  );
}
