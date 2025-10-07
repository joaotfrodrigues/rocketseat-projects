import { clsx } from "clsx";

import type { ReactNode } from "react";


type Column = {
  label: string
  className?: string
}

type Props = {
  columns: Column[]
  children: ReactNode
}

export function Table({ columns, children }: Props) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-gray-500">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={clsx(
                  "text-sm font-normal leading-[1.4] text-gray-400 py-[14px] px-3",
                  index === 0 ? "text-center" : "text-left",
                  column.className
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {children}
        </tbody>
      </table>
    </div >
  );
}
