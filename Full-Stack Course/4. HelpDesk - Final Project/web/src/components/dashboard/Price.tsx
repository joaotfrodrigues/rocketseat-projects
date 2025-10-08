import { clsx } from "clsx";

import { formatCurrency } from "../../utils/formatCurrency";


type Props = {
  title: string
  price?: number
  type?: "big" | "small"
}

export function Price({ title, price, type = "small" }: Props) {
  if (!price) return "";

  return (
    <p className={clsx(
      "leading-[1.4] text-gray-200 flex justify-between gap-2",
      type === "big" ? "text-sm font-bold" : "text-xs font-normal"
    )}>
      {title}
      <span>{formatCurrency(price)}€</span>
    </p>
  );
}
