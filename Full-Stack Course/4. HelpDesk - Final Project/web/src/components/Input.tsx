import { clsx } from "clsx";

import { CircleAlert } from "lucide-react";


type Props = {
  label: string
  id: string
  helper?: string
  autoComplete?: string
  placeholder?: string
  error: boolean
  htmlType?: "text" | "password"
}

export function Input({
  label,
  id,
  helper,
  autoComplete,
  placeholder,
  error,
  htmlType = "text" }: Props) {
  return (
    <div className={clsx("text-input flex flex-col", error ? "error" : "")}>
      <label htmlFor={id} className={clsx(
        "text-xxs font-bold leading-[1.4] uppercase",
        error ? "text-feedback-danger" : "text-gray-300")
      }>
        {label}
      </label>

      <input
        id={id}
        type={htmlType}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={clsx(
          "py-[8px] text-md placeholder-gray-400 font-normal leading-[1.4] outline-none border-b border-gray-500",
          !error && "focus:border-blue-base")
        }
      />

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
