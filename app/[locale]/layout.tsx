import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import { RootLayoutProps } from "@/lib/utils";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DOM Playground - Learn HTML nesting with drag and drop",
  description: "Learn HTML nesting with drag and drop in this playground, created by Horacio Gutierrez",
  authors: [{ name: "Horacio Gutierrez", url: "https://github.com/HoracioGutierrez" }],
  keywords: "horacio gutierrez,horacio,gutierrez,playground,html,css,dom,html playground,dom playground, html nesting,drag,drop,drag and drop",
  robots: "index,follow"
};

async function RootLayout({ children, params: { locale } }: RootLayoutProps) {

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-r from-background to-muted-foreground dark:to-destructive-foreground text-slate-900 min-h-[100dvh] flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>

            <div className="flex flex-col xl:grid xl:grid-cols-[1fr_max-content] grow">
              <div className="flex flex-col row-span-3 grow">

                <Header />
                <main className='flex flex-col p-4 pb-8 grow'>{children}</main>
                <Footer />
              </div>
              <Sidebar />
            </div>
            <Toaster />
            
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;