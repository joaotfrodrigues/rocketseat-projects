import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PenLine } from "lucide-react";
import { clsx } from "clsx";

import { useAuth } from "../hooks/useAuth";

import { api } from "../services/api";
import { formatDate } from "../utils/formatDate";

import { Button } from "../components/Button";
import { Table } from "../components/Table";
import { User } from "../components/dashboard/User";
import { Status } from "../components/dashboard/Status";
import { Pagination } from "../components/dashboard/Pagination";


const PER_PAGE = 8;

export function Calls() {
  const [page, setPage] = useState(1);
  const [totalOfPage, setTotalOfPage] = useState(0);
  const [calls, setCalls] = useState<Call[]>([]);

  const navigate = useNavigate();
  const auth = useAuth();

  async function fetchRefunds() {
    try {
      const response = await api.get<Calls>(
        `/calls?page=${page}&perPage=${PER_PAGE}`
      );

      setCalls(
        response.data.calls.map(call => ({
          id: call.id,
          title: call.title,
          status: call.status,
          service: call.service,
          client: call.client,
          technician: call.technician,
          updatedAt: formatDate(call.updatedAt)
        }))
      );

      setTotalOfPage(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);

      alert("Não foi possível carregar");
    }
  }

  function handlePagination(action: "next" | "previous") {
    setPage((prevPage) => {
      if (action === "next" && prevPage < totalOfPage) {
        return prevPage + 1;
      }

      if (action === "previous" && prevPage > 1) {
        return prevPage - 1;
      }

      return prevPage;
    });
  }

  useEffect(() => {
    fetchRefunds();
  }, [page]);

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
    <>
      <h1 className="text-lg font-bold leading-[1.4] text-blue-dark">Chamados</h1>

      <Table columns={headers}>
        {calls.map((call) => (
          <tr key={call.id} className="border-t border-gray-500">
            {/* Atualizado em */}
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200 text-center hidden sm:table-cell">
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
                Icon={PenLine}
                type="secondary"
                size="small"
                iconAlt="Editar"
                onClick={() => navigate(`/call/${call.id}`)}
              />
            </td>
          </tr>
        ))}
      </Table>

      <Pagination
        current={page}
        total={totalOfPage}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </>
  );
}
