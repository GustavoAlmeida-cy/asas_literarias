import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <main className="bg-[var(--color-hero-bg-2)]">{children}</main>;
};

export default Layout;
