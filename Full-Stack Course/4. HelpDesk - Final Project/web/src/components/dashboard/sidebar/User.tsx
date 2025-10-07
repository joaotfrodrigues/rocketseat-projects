import { clsx } from "clsx";

import { useAuth } from "../../../hooks/useAuth";

import { User } from "../User";


type Props = {
  visibility: boolean
  onClick: () => void
}

export function SidebarUser({ visibility, onClick }: Props) {
  const auth = useAuth();

  const name = auth.session!.user.name;
  const email = auth.session!.user.email;

  return (
    <div
      className={clsx(
        "py-5 px-4 cursor-pointer transition-colors hover:bg-gray-200",
        visibility ? "bg-gray-200" : "hover:bg-gray-200"
      )}
      onClick={onClick}
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
