import { clsx } from "clsx";


interface Props extends Button {
  href?: string
  newWindow?: boolean
}

export function Link({
  Icon,
  text = "",
  iconAlt = "",
  size = "big",
  href,
  onClick,
  newWindow = false }: Props) {

  const iconSize = size === "big" ? 18 : 14;

  return (
    <a
      href={href}
      title={text || iconAlt}
      aria-label={text || iconAlt}
      target={newWindow ? "_blank" : ""}
      className={clsx(
        "w-fit inline-flex items-center gap-[8px] text-gray-300 font-normal leading-[1.4] hover:text-gray-100 hover:bg-gray-500 rounded-[5px] cursor-pointer",
        text ? "p-[2px]" : "p-[3px]",
        size === "big" ? "text-sm" : "text-xs"
      )}
      onClick={onClick}
    >
      {Icon && <Icon size={iconSize} />}
      {text}
    </a>
  );
}
