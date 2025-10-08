import { clsx } from "clsx";

import type { ReactNode } from "react";


type Props = {
  title: string
  description?: string
  children?: ReactNode
}

export function InfoSection({ title, description, children }: Props) {
  return (
    <div className={clsx(
      "flex flex-col flex-1",
      children ? "gap-2" : "gap-[2px]"
    )}>
      <h3 className="text-xs text-normal leading-[1.4] text-gray-400">{title}</h3>

      {description && <p className="text-sm text-normal leading-[1.4] text-gray-200">
        {description}
      </p>
      }

      {children}
    </div>
  );
}
