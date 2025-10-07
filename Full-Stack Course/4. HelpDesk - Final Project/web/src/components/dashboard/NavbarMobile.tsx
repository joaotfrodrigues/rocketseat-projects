import { useState, useRef, useEffect } from "react";

import { useAuth } from "../../hooks/useAuth";

import { SidebarLogo } from "./sidebar/Logo";
import { BurgerMenu } from "./BurgerMenu";
import { User } from "./User";
import { Options } from "./Options";


export function NavbarMobile() {
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

  const name = auth.session!.user.name;

  return (
    <nav className="flex sm:hidden p-6">
      <div className="flex items-center gap-4">
        <BurgerMenu />
        <SidebarLogo />
      </div>

      <User
        name={name}
        size="big"
        avatarMobile={true}
        className="ml-auto cursor-pointer"
        onClick={() => setOptionsVisibility(!optionsVisibility)}
        avatar={auth.session!.user.avatar}
      />

      <Options size="big" show={optionsVisibility} ref={menuRef} />
    </nav>
  );
}
