import { useAuth } from "../../../hooks/useAuth";

import logoLight from "../../../assets/dashboard/logoLight.svg";


export function SidebarLogo() {
  const auth = useAuth();

  let role;
  switch (auth.session!.user.role) {
    case "client":
      role = "cliente";
      break;
    case "technician":
      role = "técnico";
      break;
    case "admin":
      role = "admin";
      break;
  }

  return (
    <div className="sm:py-6 sm:px-5">
      <a href="/" className="flex gap-3">
        <img src={logoLight} alt="Helpdesk logo" loading="lazy" className="w-11 h-11" />

        <div className="flex flex-col gap-0">
          <h2 className="text-lg font-bold leading-[1.4] text-gray-600">HelpDesk</h2>
          <span className="text-xxs font-bold leading-[1.4] text-blue-light uppercase">{role}</span>
        </div>
      </a>
    </div>
  );
}
