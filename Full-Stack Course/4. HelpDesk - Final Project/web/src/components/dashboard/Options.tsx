import { CircleUser, LogOut } from "lucide-react";
import { clsx } from "clsx";

import type { Ref } from "react";

import { useAuth } from "../../hooks/useAuth";


type Props = {
  size: "big" | "small"
  show: boolean
  ref: Ref<HTMLDivElement>
}

export function Options({ size, show, ref }: Props) {
  const auth = useAuth();

  return (
    <div
      ref={ref}
      className={clsx(
        "absolute py-4 px-5 bg-gray-100 flex-col gap-4 rounded-[10px]",
        size === "big" ? "w-[350px] top-25 left-1/2 transform -translate-x-1/2" : "w-[198px] bottom-5 left-52",
        show ? "flex" : "hidden"
      )}
    >
      <span className="text-xxs font-bold leading-[1.4] uppercase text-gray-400">Opções</span>
      <div className="flex flex-col gap-0">
        <button
          aria-label="Perfil"
          title="Perfil"
          className="w-fit flex items-center gap-2 text-gray-500 text-md font-normal leading-[1.4] py-2 cursor-pointer"
        >
          <CircleUser size={20} />
          Perfil
        </button>

        <button
          aria-label="Sair"
          title="Sair"
          className="w-fit flex items-center gap-2 text-feedback-danger text-md font-normal leading-[1.4] py-2 cursor-pointer"
          onClick={() => auth.remove()}
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </div>
  );
}
