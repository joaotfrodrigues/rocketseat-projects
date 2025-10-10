import { useRef, useEffect } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { useOptions } from "../../../hooks/useOptions";

import { tabs } from "../../../utils/tabs";

import { SidebarLogo } from "./Logo";
import { SidebarItem } from "./Item";
import { SidebarUser } from "./User";
import { Options } from "../Options";


export function DashboardSidebar() {
  const menuRef = useRef<HTMLDivElement>(null);

  const auth = useAuth();
  const options = useOptions();

  return (
    <>
      <aside className="max-w-[200px] hidden sm:flex flex-col sm:sm:flex-grow">
        <SidebarLogo />

        <div className="flex flex-col gap-1 flex-grow border-y border-gray-200 py-5 px-4">
          {tabs[auth.session!.user.role].map((item, index) => (
            <SidebarItem
              key={index}
              title={item.title}
              route={item.route}
              Icon={item.icon}
            />
          ))}
        </div>

        <SidebarUser />

        <Options size="small" ref={menuRef} />

      </aside>
    </>
  );
}
