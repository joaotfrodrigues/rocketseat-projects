import { CircleCheck, Ban } from "lucide-react";
import { clsx } from "clsx";


type Props = {
  status: "active" | "inactive"
}

export function ServiceStatus({ status }: Props) {
  return (
    <div className={clsx(
      "text-xs font-bold leading-[1.4] py-[6px] px-[6px] md:px-3 rounded-[999px] w-fit",
      status === "active" ? "text-feedback-done bg-[#508B2620]" : "text-feedback-danger bg-[#D03E3E20]"
    )}>
      <span className="hidden md:inline">
        {status === "active" ? "Ativo" : "Inativo"}
      </span>

      <span className="inline md:hidden">
        {status === "active" ? <CircleCheck size={16} /> : <Ban size={16} />}
      </span>
    </div>
  );
}
