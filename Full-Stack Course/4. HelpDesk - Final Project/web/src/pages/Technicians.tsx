import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, PenLine } from "lucide-react";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Table } from "../components/Table";
import { User } from "../components/dashboard/User";
import { HoursDisplay } from "../components/dashboard/HoursDisplay";
import { Pagination } from "../components/dashboard/Pagination";


type Technician = {
  id: string
  name: string
  email: string
  avatar: string
  schedules: string
}

const PER_PAGE = 10;

export function Technicians() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalOfPage, setTotalOfPage] = useState<number>(0);

  const navigate = useNavigate();

  async function getTechnicians() {
    try {
      const response = await api.get(`/technicians?page=${page}&perPage=${PER_PAGE}`);

      setTechnicians(response.data.technicians);
      setTotalOfPage(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);

      alert("Erro ao carregar técnicos");
    }
  }

  useEffect(() => {
    getTechnicians();
  }, [page]);

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

  const columns = [
    { label: "Nome", className: "w-[55%] md:w-[40%]" },
    { label: "E-mail", className: "w-[30%] hidden md:table-cell" },
    { label: "Disponibilidade", className: "w-[25%]" },
    { label: "", className: "w-[52px]" },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold leading-[1.4] text-blue-dark">Técnicos</h1>

        <Button
          Icon={Plus}
          text="Novo"
          responsive={true}
          onClick={() => navigate("/technician/create")}
        />
      </div>

      <Table columns={columns}>
        {technicians.map((technician, index) => (
          <tr key={index} className="border-t border-gray-500">
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200">
              <User
                name={technician.name}
                avatar={technician.avatar}
              />
            </td>
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200 hidden md:table-cell">
              {technician.email}
            </td>
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200 flex items-center gap-1">
              <HoursDisplay hours={JSON.parse(technician.schedules)} />
            </td>
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200 text-right">
              <Button
                Icon={PenLine}
                iconAlt="Editar"
                type="secondary"
                size="small"
                onClick={() => navigate(`/technician/update/${technician.id}`)}
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
