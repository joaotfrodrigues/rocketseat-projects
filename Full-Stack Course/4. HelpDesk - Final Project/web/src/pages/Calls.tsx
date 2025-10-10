import { useState, useEffect } from "react";

import { useAuth } from "../hooks/useAuth";
import { fetchCalls } from "../services/fetchCalls";

import { Pagination } from "../components/dashboard/Pagination";
import { CallsTable } from "../components/dashboard/call/CallsTable";


export function Calls() {
  const [page, setPage] = useState<number>(1);
  const [totalOfPage, setTotalOfPage] = useState<number>(0);
  const [calls, setCalls] = useState<Call[]>([]);

  const auth = useAuth();

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
    fetchCalls({ page, setCalls, setTotalOfPage });
  }, [page]);

  return (
    <>
      <h1 className="text-lg font-bold leading-[1.4] text-blue-dark">Chamados</h1>

      <CallsTable
        calls={calls}
      />

      <Pagination
        current={page}
        total={totalOfPage}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </>
  );
}
