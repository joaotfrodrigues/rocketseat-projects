import { CircleHelp, Clock2, CircleCheckBig } from "lucide-react";
import { clsx } from "clsx";


type Props = {
  status: "opened" | "progress" | "closed"
  responsive?: boolean
}

export function Status({ status, responsive = false }: Props) {
  let statusText;
  let statusColor;
  let statusBackground;
  let Icon;

  switch (status) {
    case "opened":
      statusText = "Aberto";
      statusColor = "text-feedback-open";
      statusBackground = "bg-[#CC3D6A20]";
      Icon = CircleHelp;

      break;
    case "progress":
      statusText = "Em atendimento";
      statusColor = "text-feedback-progress";
      statusBackground = "bg-[#355EC520]";
      Icon = Clock2;

      break;
    case "closed":
      statusText = "Encerrado";
      statusColor = "text-feedback-done";
      statusBackground = "bg-[#508B2620]";
      Icon = CircleCheckBig;
  }

  return (
    <span className={clsx(
      "px-2 py-[6px] rounded-[999px] flex items-center justify-center gap-[6px]",
      "w-fit text-xs font-bold leading-[1.4]",
      statusColor,
      statusBackground
    )}>
      <Icon size={16} />
      <span className={clsx(
        responsive ? "hidden sm:inline" : ""
      )}>
        {statusText}
      </span>
    </span>
  );
}
