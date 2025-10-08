import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";

import { useAuth } from "../../hooks/useAuth";
import { tabs } from "../../utils/tabs";

import { SidebarItem } from "./sidebar/Item";


export function BurgerMenu() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <button
        className="text-gray-600 cursor-pointer w-10 h-10 bg-gray-200 flex items-center justify-center rounded-[5px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={clsx(
            "absolute top-25 left-1/2 transform -translate-x-1/2",
            "py-4 px-5 flex flex-col gap-4 w-full max-w-[350px] rounded-[10px] bg-gray-100"
          )}
        >
          <span className="text-xxs font-bold leading-[1.4] uppercase text-gray-400">Menu</span>
          <div className="flex flex-col gap-1">
            {tabs[auth.session!.user.role].map((item, index) => (
              <SidebarItem
                key={index}
                title={item.title}
                route={item.route}
                Icon={item.icon}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

