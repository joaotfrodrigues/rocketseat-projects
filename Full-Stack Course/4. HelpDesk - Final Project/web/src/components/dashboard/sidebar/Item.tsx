import { NavLink } from "react-router-dom";
import { clsx } from "clsx";

import type { LucideIcon } from "lucide-react";


type Props = {
  title: string
  route: string
  Icon: LucideIcon

}

export function SidebarItem({ title, route, Icon }: Props) {
  return (
    <NavLink
      to={route}
      arial-label={title}
      title={title}
      className={({ isActive }) => clsx(
        "flex items-center gap-3 p-3 text-gray-400 rounded-[5px] text-sm font-normal leading-[1.4] transition-colors",
        isActive
          ? "bg-blue-dark text-gray-600"
          : "hover:bg-gray-200 hover:text-gray-500"
      )}
    >
      <Icon size={20} />
      {title}
    </NavLink>
  );
}
