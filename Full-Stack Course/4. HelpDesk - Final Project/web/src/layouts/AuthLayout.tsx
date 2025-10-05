import { Outlet } from "react-router";
import { clsx } from "clsx";

import { AuthLogo } from "../components/auth/Logo";

import backgroundImage from "../assets/auth/background.svg";


export function AuthLayout() {
  return (
    <main className="min-h-screen flex bg-cover bg-center border-t border-transparent" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <section className={clsx(
        "flex flex-col gap-6 sm:gap-8 flex-grow ml-auto max-w-[680px]",
        "mt-8 sm:mt-3 bg-gray-600 rounded-t-[20px] sm:rounded-t-[0] sm:rounded-tl-[20px]",
        "px-6 sm:px-[140px] py-8 sm:py-12")
      }>
        <AuthLogo />
        <Outlet />
      </section>
    </main>
  );
}
