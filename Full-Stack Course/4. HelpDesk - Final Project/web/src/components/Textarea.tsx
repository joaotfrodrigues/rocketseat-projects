import { clsx } from "clsx";

import type { ReactNode } from "react";

import { CircleAlert } from "lucide-react";


type Props = {
  label: string
  id: string
  helper?: string
  placeholder?: string
  error: boolean
  children?: ReactNode
}

export function Textarea({
  label,
  id,
  helper,
  placeholder,
  error,
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

      <textarea
        id={id}
        placeholder={placeholder}
        className={clsx(
          "w-full py-[8px] text-md placeholder-gray-400 font-normal leading-[1.4]",
          "h-[138px] resize-none outline-none border-b border-gray-500",
          !error && "focus:border-blue-base")
        }
        {...rest}
      >
      </textarea>

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
