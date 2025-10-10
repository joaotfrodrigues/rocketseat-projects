import { api } from "./api";
import { formatDate } from "../utils/formatDate";

import type { Dispatch, SetStateAction } from "react";


type Props = {
  setCalls: Dispatch<SetStateAction<Call[]>>
  page?: number
  per_page?: number
  setTotalOfPage?: Dispatch<SetStateAction<number>>
};

export async function fetchCalls({ setCalls, per_page = 10, page, setTotalOfPage }: Props) {
  try {
    const response = await api.get<Calls>(
      page ? `/calls?page=${page}&perPage=${per_page}` : "/calls"
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

    if (setTotalOfPage) setTotalOfPage(response.data.pagination.totalPages);
  } catch (error) {
    console.log(error);

    alert("Não foi possível carregar");
  }
}

