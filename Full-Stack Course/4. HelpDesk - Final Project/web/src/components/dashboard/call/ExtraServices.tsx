import React from "react";
import { Plus } from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";

import { Container } from "../../Container";
import { Button } from "../../Button";
import { AdicionalService } from "./AdicionalService";


type Props = {
  call: CallShow
  deleteAdicionalService: (id: string) => void
  openModal: () => void
}

export function ExtraServicesContainer({ call, deleteAdicionalService, openModal }: Props) {
  const auth = useAuth();

  return (
    <>
      {
        auth.session!.user.role === "technician" &&
        <Container className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-5">
            <h3 className="text-xs font-normal leading-[1.4] text-gray-400">Serviços adicionais</h3>

            <Button
              Icon={Plus}
              iconAlt="Adicionar serviço"
              size="small"
              disabled={call?.status === "closed"}
              onClick={openModal}
            />
          </div>

          <div className="flex flex-col">
            {call?.extraServices.map((extraService, index) => {
              return (
                <React.Fragment key={index}>
                  {index !== 0 && <hr className="my-2 text-gray-500" />}
                  <AdicionalService
                    description={extraService.description}
                    price={extraService.price}
                    disabled={call?.status === "closed"}
                    onClick={() => deleteAdicionalService(extraService.id)}
                  />
                </React.Fragment>
              )
            })}
          </div>
        </Container >
      }
    </>
  );
}
