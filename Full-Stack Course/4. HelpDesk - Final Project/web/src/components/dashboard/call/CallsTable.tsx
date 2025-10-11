import { useNavigate } from "react-router";
import { clsx } from "clsx";
import { PenLine, Eye } from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";

import { Table } from "../../Table";
import { Button } from "../../Button";
import { User } from "../User";
import { Status } from "../Status";


type Props = {
  calls: Call[]
}

export function CallsTable({ calls }: Props) {
  const navigate = useNavigate();
  const auth = useAuth();

  const isAdmin = auth.session!.user.role === "admin";

  const headers = isAdmin
    ? [
      { label: "Atualizado em", className: "hidden sm:table-cell" },
      { label: "Id", className: "hidden xl:table-cell" },
      { label: "Título e Serviço", className: "" },
      { label: "Valor total", className: "hidden md:table-cell" },
      { label: "Cliente", className: "hidden lg:table-cell" },
      { label: "Técnico", className: "hidden lg:table-cell" },
      { label: "Status", className: "" },
      { label: "", className: "" },
    ]
    : [
      { label: "Atualizado em", className: "hidden sm:table-cell" },
      { label: "Id", className: "hidden xl:table-cell" },
      { label: "Título", className: "" },
      { label: "Serviço", className: "hidden lg:table-cell" },
      { label: "Valor total", className: "hidden md:table-cell" },
      { label: "Técnico", className: "hidden lg:table-cell" },
      { label: "Status", className: "" },
      { label: "", className: "" },
    ];

  return (
    <Table columns={headers}>
      {calls.map((call) => (
        <tr key={call.id} className="border-t border-gray-500">
          {/* Atualizado em */}
          <td className="px-3 py-[14px] text-xs font-normal text-gray-200 hidden sm:table-cell">
            {call.updatedAt}
          </td>

          {/* ID */}
          <td className="px-3 py-[14px] text-xs font-bold text-gray-200 hidden xl:table-cell">
            {call.id.split("-")[0]}
          </td>

          {isAdmin ? (
            /* ADMIN: Title + Service in same cell */
            <td className="px-3 py-[14px] flex flex-col gap-0 flex-1 min-w-0">
              <span className="text-sm font-bold text-gray-200 truncate max-w-[100px] sm:max-w-[200px] xl:max-w-[250px]">
                {call.title}
              </span>
              <span className="text-xs font-normal text-gray-200 truncate max-w-[100px] sm:max-w-[200px] xl:max-w-[250px]">
                {call.service.title}
              </span>
            </td>
          ) : (
            /* CLIENT: Separate Title + Service columns */
            <>
              <td className="px-3 py-[14px] text-sm font-bold text-gray-200 truncate max-w-[200px]">
                {call.title}
              </td>
              <td className={clsx(
                "px-3 py-[14px] text-sm font-normal text-gray-200 truncate max-w-[200px]",
                isAdmin ? "" : "hidden lg:table-cell"
              )}>
                {call.service.title}
              </td>
            </>
          )}

          {/* Service price  */}
          <td className="px-3 py-[14px] text-sm font-normal text-gray-200 hidden md:table-cell">
            {call.service.price ? `${call.service.price}€` : "—"}
          </td>

          {/* Client (only for admin) */}
          {isAdmin && (
            <td className="px-3 py-[14px] hidden lg:table-cell">
              <User name={call.client?.name || "—"} size="xsmall" avatar={call.client?.avatar} />
            </td>
          )}

          {/* Técnico */}
          <td className="px-3 py-[14px] hidden lg:table-cell">
            <User name={call.technician?.name || "—"} size="xsmall" avatar={call.technician?.avatar} />
          </td>

          {/* Status */}
          <td className="px-3 py-[14px]">
            <Status status={call.status} responsive />
          </td>

          {/* Edit button */}
          <td className="px-3 py-[14px]">
            <Button
              Icon={auth.session!.user.role === "client" ? Eye : PenLine}
              type="secondary"
              size="small"
              iconAlt="Editar"
              onClick={() => navigate(`/call/${call.id}`)}
            />
          </td>
        </tr>
      ))}
    </Table>
  );
}
