import { ReactNode } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-[var(--color-hero-bg-2)]">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
