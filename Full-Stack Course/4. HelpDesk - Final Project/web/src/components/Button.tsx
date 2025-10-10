import { clsx } from "clsx";


interface Props extends Button {
  type?: "primary" | "secondary"
  htmlType?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
  iconColor?: string
}

export function Button({
  Icon,
  text = "",
  type = "primary",
  size = "big",
  iconAlt = "Icon Button",
  onClick,
  htmlType = "button",
  disabled,
  className = "",
  iconColor }: Props) {

  const iconSize = size === "big" ? 18 : 14;

  return (
    <button className={clsx(
      "inline-flex items-center justify-center gap-[8px] rounded-[5px] cursor-pointer transition font-normal leading-[1.4] disabled:cursor-not-allowed",
      text ? (size === "big" ? "px-[16px] py-[10px]" : "px-[8px] py-[5.5px]") : "p-[7px]",
      type === "primary" ? "bg-gray-200 text-gray-600 hover:bg-gray-100 disabled:bg-gray-300"
        : "bg-gray-500 text-gray-200 hover:bg-gray-400 hover:text-gray-100 disabled:bg-gray-600",
      size === "big" ? "text-sm" : "text-xs",
      className
    )}
      onClick={onClick}
      aria-label={text || iconAlt}
      title={text || iconAlt}
      type={htmlType}
      disabled={disabled}
    >
      {Icon && <Icon size={iconSize} className={iconColor} />}
      {text}
    </button>
  );
}
