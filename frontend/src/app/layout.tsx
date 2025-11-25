import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- ВОТ ЭТО ВКЛЮЧАЕТ СТИЛИ

const inter = Inter({ subsets: ["latin", "cyrillic"] });

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
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
