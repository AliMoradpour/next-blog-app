import Header from "@/components/Header";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const layout = ({children} : RootLayoutProps) => {
  return (
    <>
      <Header />
      <div className="container xl:max-w-screen-xl">{children}</div>
    </>
  );
};
