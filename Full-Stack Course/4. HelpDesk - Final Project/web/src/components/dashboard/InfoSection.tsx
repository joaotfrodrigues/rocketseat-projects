import { clsx } from "clsx";

import type { ReactNode } from "react";


type Props = {
  title: string
  description?: string
  size?: "big" | "small"
  children?: ReactNode
}

export function InfoSection({ title, description, size = "small", children }: Props) {
  return (
    <div className={clsx(
      "flex flex-col flex-1",
      children ? "gap-2" : "gap-[2px]"
    )}>
      <h3 className="text-xs text-normal leading-[1.4] text-gray-400">{title}</h3>

      {description && <p className={clsx(
        "leading-[1.4] text-gray-200",
        size === "big" ? "text-lg text-bold" : "text-sm text-normal"
      )}>
        {description}
      </p>
      }

      {children}
    </div>
  );
}
