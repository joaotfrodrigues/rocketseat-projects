import { useState, useEffect } from "react";

import { fetchCalls } from "../services/fetchCalls";

import { CallCard } from "../components/dashboard/call/CallCard";
import { Status } from "../components/dashboard/Status";


export function TechnicianCalls() {
  const [calls, setCalls] = useState<Call[]>([]);

  useEffect(() => {
    fetchCalls({ setCalls });
  }, []);

  return (
    <>
      <h1 className="text-lg font-bold leading-[1.4] text-blue-dark">Meus Chamados</h1>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Status status="progress" />

          <div className="flex flex-wrap gap-4">
            {calls
              .filter(call => call.status === "progress")
              .map((call, index) => (
              <CallCard
                call={call}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Status status="opened" />

          <div className="flex flex-wrap gap-4">
            {calls
              .filter(call => call.status === "opened")
              .map((call, index) => (
              <CallCard
                call={call}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Status status="closed" />

          <div className="flex flex-wrap gap-4">
            {calls
              .filter(call => call.status === "closed")
              .map((call, index) => (
              <CallCard
                call={call}
                key={index}
              />
            ))}
          </div>
        </div>


      </section>
    </>
  );
}
