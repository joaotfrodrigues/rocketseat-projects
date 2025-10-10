import { Link } from "./Link";
import { X } from "lucide-react";

import type { ReactNode } from "react";

import { Button } from "./Button";


type Props = {
  title: string
  closeModal: () => void
  onSubmit: () => void
  isSubmitting: boolean
  children: ReactNode
}

export function Modal({ title, closeModal, onSubmit, isSubmitting, children }: Props) {
  return (
    <div className="z-50 w-full min-h-screen absolute top-0 left-0 bg-[#00000050] flex items-center justify-center">
      <form
        className="w-full max-w-[440px] m-4 bg-gray-600 border border-gray-500 rounded-[10px]"
        onSubmit={onSubmit}
      >
        <div className="flex items-center justify-between py-5 px-7">
          <span className="text-md font-normal leading-[1.4] text-gray-200">{title}</span>

          <Link
            Icon={X}
            iconAlt="Fechar"
            onClick={closeModal}
          />
        </div>

        {children}

        <div className="py-6 px-7">
          <Button
            text="Salvar"
            className="w-full"
            htmlType="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
