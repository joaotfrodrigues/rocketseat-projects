import { clsx } from "clsx";

import type { ReactNode } from "react";


type Props = {
  children?: ReactNode
  className?: string
}

export function Container({ children, className = "" }: Props) {
  return (
    <div className={clsx(
      className,
      "flex flex-col p-6 sm:p-7 border border-gray-500 rounded-[10px]"
    )}>
      {children}
    </div>
  );
}
