import { Link } from "./Link";
import { X, ArrowLeft } from "lucide-react";
import { clsx } from "clsx";

import type { ReactNode } from "react";

import { Button } from "./Button";


type Props = {
  title: string
  closeModal: () => void
  onSubmit: () => void
  isSubmitting: boolean
  backButton?: () => void
  children: ReactNode
  cancelBtn?: boolean
  submitBtnText?: string
}

export function Modal({
  title,
  closeModal,
  onSubmit,
  isSubmitting,
  children,
  backButton,
  cancelBtn = false,
  submitBtnText }: Props) {
  return (
    <div className="z-50 w-full min-h-screen absolute top-0 left-0 bg-[#00000050] flex items-center justify-center">
      <form
        className="w-full max-w-[440px] m-4 bg-gray-600 border border-gray-500 rounded-[10px]"
        onSubmit={onSubmit}
      >
        <div className="flex items-center justify-between gap-3 py-5 px-7">
          {backButton &&
            <Link
              Icon={ArrowLeft}
              iconAlt="Voltar"
              onClick={backButton}
            />
          }

          <span className="flex-1 text-md font-normal leading-[1.4] text-gray-200">{title}</span>

          <Link
            Icon={X}
            iconAlt="Fechar"
            onClick={closeModal}
          />
        </div>

        {children}

        <div className={clsx(
          "py-6 px-7",
          cancelBtn ? "flex gap-2" : ""
        )}>
          {cancelBtn &&
            <Button
              text="Cancelar"
              className="w-full"
              disabled={isSubmitting}
              type="secondary"
              onClick={closeModal}
            />
          }
          <Button
            text={submitBtnText ?? "Salvar"}
            className="w-full"
            htmlType="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
