import { clsx } from "clsx";


interface Props extends Button {
  type?: "primary" | "secondary"
  htmlType?: "button" | "submit" | "reset"
}

export function Button({
  Icon,
  text = "",
  type = "primary",
  size = "big",
  iconAlt = "Icon Button",
  onClick,
  htmlType }: Props) {

  const iconSize = size === "big" ? 18 : 14;

  return (
    <button className={clsx(
      "inline-flex items-center justify-center gap-[8px] rounded-[5px] cursor-pointer transition font-normal leading-[1.4]",
      text ? "px-[16px] py-[10px]" : "p-[11px]",
      type === "primary" ? "bg-gray-200 text-gray-600 hover:bg-gray-100"
        : "bg-gray-500 text-gray-200 hover:bg-gray-400 hover:text-gray-100",
      size === "big" ? "text-sm" : "text-xs"
    )}
      onClick={onClick}
      aria-label={text || iconAlt}
      title={text || iconAlt}
      type={htmlType}
    >
      {Icon && <Icon size={iconSize} />}
      {text}
    </button>
  );
}
