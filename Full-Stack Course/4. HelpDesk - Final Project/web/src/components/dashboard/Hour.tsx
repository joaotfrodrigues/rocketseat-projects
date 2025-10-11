import { clsx } from "clsx";
import { X } from "lucide-react";


type Props = {
  hour: string
  disabled?: boolean
}

export function Hour({ hour, disabled = false }: Props) {
  return (
    <div className="relative w-fit">
      <input
        value={hour}
        id={hour}
        type="checkbox"
        className="peer hidden"
        disabled={disabled}
      />

      <label
        htmlFor={hour}
        title={`${hour}:00`}
        className={clsx(
          "w-fit flex items-center justify-center gap-[6px]",
          "text-xs font-normal leading-[1.4] text-gray-200 py-[6px] px-3 peer-checked:pr-6",
          "border border-gray-400 rounded-[999px]",
          disabled ? "text-gray-400 border-gray-500 cursor-default" : "cursor-pointer",
          "peer-checked:bg-blue-base peer-checked:border-blue-base peer-checked:text-gray-600"
        )}
      >
        {hour}:00
      </label>

      <X
        className={clsx("hidden peer-checked:block text-gray-600 cursor-pointer",
          "absolute right-[6px] top-1/2 -translate-y-1/2")}
        size={14}
        onClick={(e) => {
          e.stopPropagation(); // prevent the click from affecting parent
          const checkbox = document.getElementById(hour) as HTMLInputElement;
          if (checkbox) checkbox.checked = false;
        }}
      />
    </div >
  );
}
