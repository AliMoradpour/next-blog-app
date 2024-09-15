import "@/styles/globals.css";
import type { Metadata } from "next";

import vazirFont from "@/constants/localFont";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    template: "%s | بلاگ اپ",
    default: "بلاگ اپ",
  },
  description: "اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans min-h-screen`}>
        <Header />
        <div className="container xl:max-w-screen-xl">{children}</div>
      </body>
    </html>
  );
}
