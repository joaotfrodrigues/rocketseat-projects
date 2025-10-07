import { useState, useRef, useEffect } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { tabs } from "../../../utils/tabs";

import { SidebarLogo } from "./Logo";
import { SidebarItem } from "./Item";
import { SidebarUser } from "./User";
import { Options } from "../Options";


export function DashboardSidebar() {
  const [optionsVisibility, setOptionsVisibility] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const auth = useAuth();

  // Close the menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOptionsVisibility(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
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

      <SidebarUser
        onClick={() => setOptionsVisibility(!optionsVisibility)}
        visibility={optionsVisibility}
      />

      <Options size="small" show={optionsVisibility} ref={menuRef} />
    </aside>
  );
}
