import "@/styles/globals.css";
import type { Metadata } from "next";

import vazirFont from "@/constants/localFont";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | بلاگ اپ",
    default: "بلاگ اپ",
  },
  description: "اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans min-h-screen`}>
        <Toaster />
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
