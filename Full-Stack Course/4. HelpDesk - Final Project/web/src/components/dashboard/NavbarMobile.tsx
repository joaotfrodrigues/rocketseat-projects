import { useState, useRef, useEffect } from "react";

import { useAuth } from "../../hooks/useAuth";
import { useOptions } from "../../hooks/useOptions";

import { SidebarLogo } from "./sidebar/Logo";
import { BurgerMenu } from "./BurgerMenu";
import { User } from "./User";
import { Options } from "./Options";


export function NavbarMobile() {
  const menuRef = useRef<HTMLDivElement>(null);

  const auth = useAuth();
  const options = useOptions();


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
        onClick={() => options?.setOptionsOpen(!options?.optionsOpen)}
        avatar={auth.session!.user.avatar}
      />

      <Options
        size="big"
        ref={menuRef}
      />
    </nav>
  );
}
