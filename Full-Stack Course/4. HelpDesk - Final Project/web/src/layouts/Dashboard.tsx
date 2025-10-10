import { Outlet } from "react-router";
import { clsx } from "clsx";

import { useProfile } from "../hooks/useProfile";

import { DashboardSidebar } from "../components/dashboard/sidebar/Sidebar";
import { NavbarMobile } from "../components/dashboard/NavbarMobile";
import { Profile } from "../components/dashboard/Profile";


export function DashboardLayout() {
  const { profileOpen, setProfileOpen } = useProfile();

  return (
    <main className="min-h-screen bg-gray-100 sm:pt-3 flex flex-col sm:flex-row">
      <DashboardSidebar />
      <NavbarMobile />

      <Profile
        profileOpen={profileOpen}
        closeModal={() => setProfileOpen(false)}
      />


      <section className={clsx(
        "pt-7 pb-6 px-6 sm:pt-13 sm:pb-12 sm:px-12",
        "bg-gray-600 flex-grow flex flex-col gap-4 sm:gap-6",
        "rounded-t-[20px] sm:rounded-t-[0] sm:rounded-tl-[20px]"
      )}>
        <Outlet />
      </section>
    </main>
  );
}
