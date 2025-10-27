import { ReactNode } from "react";
import { ProfileHeader } from "@/components/misc/profile-header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-[var(--color-hero-bg-2)]">
      <ProfileHeader />
      {children}
    </main>
  );
};

export default Layout;
