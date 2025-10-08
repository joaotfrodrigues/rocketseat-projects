import { NavLink } from "react-router-dom";
import { clsx } from "clsx";

import type { LucideIcon } from "lucide-react";


type Props = {
  title: string
  route: string
  Icon: LucideIcon
  onClick?: () => void
}

export function SidebarItem({ title, route, Icon, onClick }: Props) {
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
      onClick={onClick}
    >
      <Icon size={20} />
      {title}
    </NavLink>
  );
}
