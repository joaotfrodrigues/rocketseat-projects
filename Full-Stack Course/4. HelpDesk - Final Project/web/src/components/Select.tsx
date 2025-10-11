import { clsx } from "clsx";

import type { ReactNode } from "react";

import { CircleAlert } from "lucide-react";


type Props = {
  label: string
  id: string
  helper?: string
  placeholder?: string
  error: boolean
  onChange: any
  children?: ReactNode
}

export function Select({
  label,
  id,
  helper,
  placeholder,
  error,
  onChange,
  children,
  ...rest }: Props) {
  return (
    <div className={clsx("text-input flex flex-col", error ? "error" : "")}>
      <label htmlFor={id} className={clsx(
        "text-xxs font-bold leading-[1.4] uppercase",
        error ? "text-feedback-danger" : "text-gray-300")
      }>
        {label}
      </label>

      <select
        id={id}
        onChange={onChange}
        className={clsx(
          "py-2 outline-none border-b border-gray-500",
          "text-md font-normal leading-[1.4] text-gray-400"
        )}
        {...rest}
      >
        {children}
      </select>

      {
        helper &&
        <span className={clsx("flex items-center gap-[4px] mt-[6px] text-xs font-normal leading-[1.4]",
          error ? "text-feedback-danger" : "text-gray-400")
        }>
          {error &&
            <CircleAlert size={16} />
          }

          {helper}
        </span>
      }
    </div>
  );
}
