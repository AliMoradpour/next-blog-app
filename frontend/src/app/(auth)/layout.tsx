import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="w-full max-w-md p-2">{children}</div>
    </div>
  );
};

export default Layout;
