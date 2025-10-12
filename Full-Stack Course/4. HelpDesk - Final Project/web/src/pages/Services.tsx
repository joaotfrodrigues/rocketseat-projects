import { useState, useEffect } from "react";
import { Plus, PenLine, CircleCheck, Ban } from "lucide-react";

import { api } from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";

import { Button } from "../components/Button";
import { Link } from "../components/Link";
import { Pagination } from "../components/dashboard/Pagination";
import { ServiceStatus } from "../components/dashboard/ServiceStatus";
import { ManageService } from "../components/dashboard/services/ManageService";
import { Table } from "../components/Table";


type Service = {
  id: string
  title: string
  price: number
  status: "active" | "inactive"
}

const PER_PAGE = 10;

export function Services() {
  const [services, setServices] = useState<Service[]>([]);

  const [newServiceShow, setNewServiceShow] = useState<boolean>(false);
  const [editService, setEditService] = useState<Service>();
  const [editServiceShow, setEditServiceShow] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [totalOfPage, setTotalOfPage] = useState<number>(0);

  async function fetchServices() {
    try {
      const response = await api.get(`/services?page=${page}&perPage=${PER_PAGE}`);

      setServices(response.data.services);
      setTotalOfPage(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);

      alert("Erro ao carregar serviços");
    }
  }

  async function updateStatus(id: string, index: number) {
    try {
      await api.patch(`/services/status/${id}`, {
        status: services[index].status === "active" ? "inactive" : "active"
      });

      fetchServices();
    } catch (error) {
      console.log(error);

      alert("Erro ao atualizar status");
    }
  }

  useEffect(() => {
    fetchServices();
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
    { label: "Título", className: "w-[40%] md:w-[50%]" },
    { label: "Valor", className: "w-[40%] md:w-[20%]" },
    { label: "Status", className: "w-[40%] md:w-[20%]" },
    { label: "", className: "w-[52px]" },
  ];

  return (
    <>
      <div className="flex gap-3">
        <h1 className="flex-1 text-xl font-bold leading-[1.4] text-blue-dark">Serviços</h1>

        <Button
          Icon={Plus}
          text="Novo"
          responsive={true}
          onClick={() => setNewServiceShow(true)}
        />
      </div>

      <Table columns={columns}>
        {services.map((service, index) => (
          <tr key={index} className="border-t border-gray-500">
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200">
              {service.title}
            </td>
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200">
              {formatCurrency(service.price)}€
            </td>
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200">
              <ServiceStatus status={service.status} />
            </td>
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200 flex items-center justify-end md:px-3 gap-2">
              <Link
                Icon={service.status === "active" ? Ban : CircleCheck}
                text={service.status === "active" ? "Desativar" : "Reativar"}
                size="small"
                responsive={true}
                onClick={() => updateStatus(service.id, index)}
              />

              <Button
                Icon={PenLine}
                iconAlt="Editar"
                type="secondary"
                size="small"
                onClick={() => {
                  setEditService(service);
                  setEditServiceShow(true);
                }}
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

      {newServiceShow &&
        <ManageService
          type="create"
          fetchServices={fetchServices}
          closeModal={() => setNewServiceShow(false)}
        />
      }

      {editServiceShow &&
        <ManageService
          type="update"
          service={editService}
          fetchServices={fetchServices}
          closeModal={() => setEditServiceShow(false)}
        />
      }
    </>
  );
}
