import { clsx } from "clsx";

import { useAuth } from "../../../hooks/useAuth";
import { useOptions } from "../../../hooks/useOptions";

import { User } from "../User";


export function SidebarUser() {
  const auth = useAuth();
  const options = useOptions();

  const name = auth.session!.user.name;
  const email = auth.session!.user.email;

  return (
    <div
      className={clsx(
        "py-5 px-4 cursor-pointer transition-colors hover:bg-gray-200",
        options?.optionsOpen ? "bg-gray-200" : "hover:bg-gray-200"
      )}
      onClick={() => options?.setOptionsOpen(!options?.optionsOpen)}
    >
      <User
        name={name}
        email={email}
        size="medium"
        avatar={auth.session!.user.avatar}
      />
    </div>
  );
}
