import { ReactNode } from "react";
import { SearchHeader } from "@/components/misc/search-header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-[var(--color-hero-bg-2)]">
      <SearchHeader />
      {children}
    </main>
  );
};

export default Layout;
