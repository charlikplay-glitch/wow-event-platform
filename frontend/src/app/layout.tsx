import type { Metadata } from "next";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Preloader from '@/components/Preloader';
import NewYearWidget from '@/components/NewYearWidget';
import ConfettiTransition from '@/components/ConfettiTransition';
// ИМПОРТ СНАЙПЕРА УДАЛЕН ОТСЮДА

const inter = Inter({ subsets: ["latin", "cyrillic"] });

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-signature"
});

export const metadata: Metadata = {
  title: "WOW Event - Организация мероприятий",
  description: "Премиальные мероприятия в Сочи, Москве и СПБ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${greatVibes.variable}`}>
      <body className={inter.className}>
        <Preloader />
        <ConfettiTransition />
        {children}
        <NewYearWidget />

        {/* КОМПОНЕНТ СНАЙПЕРА УДАЛЕН ОТСЮДА (он теперь внутри Footer) */}

        <Script id="replain-config" strategy="lazyOnload">
          {`
            window.replainSettings = { id: 'fa604d36-86af-44f8-a647-18fe4abca742' };
            (function(u){var s=document.createElement('script');s.async=true;s.src=u;
            var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
            })('https://widget.replain.cc/dist/client.js');
          `}
        </Script>
      </body>
    </html>
  );
}
