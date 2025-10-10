import { useNavigate } from "react-router";
import { PenLine, Clock2 } from "lucide-react";

import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";

import { Button } from "../../Button";
import { User } from "../User";
import { Status } from "../Status";


type Props = {
  call: Call
}

export function CallCard({ call }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full md:max-w-[346px] flex flex-col gap-4 p-5 bg-gray-600 border border-gray-500 rounded-[10px] relative">
      <div className="absolute right-3 top-3 flex items-center justify-center gap-1">
        <Button
          Icon={PenLine}
          iconAlt="Editar"
          type="secondary"
          size="small"
          iconColor="text-gray-300"
          onClick={() => navigate(`/call/${call.id}`)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold leading-[1.4] text-gray-400">{call.id.split("-")[0]}</span>

        <div className="flex flex-col">
          <span className="text-md font-bold leading-[1.4] text-gray-100">{call.title}</span>
          <span className="text-xs font-normal leading-[1.4] text-gray-200">{call.service.title}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-normal leading-[1.2] text-gray-200">{formatDate(call.updatedAt)}</span>
          <span
            className="text-sm font-normal leading-[1.2] text-gray-200"
          >
            {formatCurrency(call.service.price)}€
          </span>
        </div>

        <hr className="text-gray-500 my-4" />

        <div className="flex justify-between gap-5">
          <User
            name={call.client.name}
            avatar={call.client.avatar}
            size="xsmall"
          />

          <Status
            status={call.status}
            justIcon={true}
          />
        </div>
      </div>
    </div>
  );
}
