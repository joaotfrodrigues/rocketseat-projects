import { useState, useEffect } from "react";
import { PenLine, Trash } from "lucide-react";

import { api } from "../services/api";

import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { User } from "../components/dashboard/User";
import { Pagination } from "../components/dashboard/Pagination";
import { DeleteModal } from "../components/dashboard/clients/DeleteModal";
import { EditModal } from "../components/dashboard/clients/EditModal";


type Client = {
  id: string
  name: string
  email: string
  avatar: string
}

const PER_PAGE = 10;

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [client, setClient] = useState<Client>({ id: "", name: "", email: "", avatar: "" });

  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [editModalShow, setEditModalShow] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [totalOfPage, setTotalOfPage] = useState<number>(0);

  async function fetchClients() {
    try {
      const response = await api.get(`/clients?page=${page}&perPage=${PER_PAGE}`);

      setClients(response.data.clients);
      setTotalOfPage(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);

      alert("Erro ao carregar clientes");
    }
  }

  useEffect(() => {
    fetchClients();
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
    { label: "Nome", className: "w-[40%] md:w-[50%]" },
    { label: "E-mail", className: "w-[40%] md:w-[20%]" },
    { label: "", className: "w-[52px]" },
  ];

  return (
    <>
      <h1 className="text-xl font-bold leading-[1.4] text-blue-dark">Clientes</h1>

      <Table columns={columns}>
        {clients.map((client, index) => (
          <tr key={index} className="border-t border-gray-500">
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200">
              <User
                name={client.name}
                avatar={client.avatar}
              />
            </td>
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200">
              {client.email}
            </td>
            <td className="px-3 py-[14px] text-xs font-normal text-gray-200 text-right">
              <div className="inline-flex items-center gap-2">
                <Button
                  Icon={Trash}
                  iconAlt="Eliminar"
                  type="secondary"
                  size="small"
                  iconColor="text-feedback-danger"
                  onClick={() => {
                    setClient(client);
                    setDeleteModalShow(true);
                  }}
                />

                <Button
                  Icon={PenLine}
                  iconAlt="Editar"
                  type="secondary"
                  size="small"
                  onClick={() => {
                    setClient(client);
                    setEditModalShow(true);
                  }}
                />
              </div>
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

      {deleteModalShow &&
        <DeleteModal
          closeModal={() => setDeleteModalShow(false)}
          client={client}
          fetchClients={fetchClients}
        />
      }

      {editModalShow &&
        <EditModal
          closeModal={() => setEditModalShow(false)}
          client={client}
          fetchClients={fetchClients}
        />
      }
    </>
  );
}
