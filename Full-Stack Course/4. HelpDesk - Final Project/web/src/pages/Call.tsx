import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Clock2, CircleCheckBig } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { formatDate } from "../utils/formatDate";

import { Link } from "../components/Link";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Status } from "../components/dashboard/Status";
import { InfoSection } from "../components/dashboard/InfoSection";
import { User } from "../components/dashboard/User";
import { Price } from "../components/dashboard/Price";


export function Call() {
  const [call, setCall] = useState<CallShow | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  async function fetchCall(id: string) {
    try {
      const response = await api.get<CallShow>(`/calls/${id}`);

      setCall(response.data);
    } catch (error) {
      navigate("/");
    }
  }

  async function updateStatus(id?: string, newStatus?: "progress" | "closed") {
    if (!id || !newStatus) return "";

    try {
      const response = await api.patch<CallShow>(
        `/calls/status/${id}`,
        { status: newStatus }
      );

      setCall(response.data);
    } catch (error) {
      console.log(error);

      alert("Não foi possível atualizar o estado");
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchCall(params.id);
    }
  }, [params.id]);

  return (
    <>
      <div className="w-full max-w-[800px] mx-auto flex sm:items-center sm:justify-between flex-wrap gap-3 sm:gap-4 flex-col sm:flex-row">
        <div className="flex flex-col gap-1">
          <Link
            Icon={ArrowLeft}
            text="Voltar"
            size="small"
            onClick={() => navigate("/")}
          />

          <h1 className="text-lg font-bold leading-[1.4] text-blue-dark">Chamado detalhado</h1>
        </div>

        {auth.session!.user.role !== "client" &&
          call?.status === "opened" &&
          <Button
            Icon={Clock2}
            text="Iniciar atendimento"
            type="primary"
            className="flex-1 md:flex-initial self-end w-full sm:w-auto"
            onClick={() => updateStatus(params.id, "progress")}
          />
        }

        {auth.session!.user.role !== "client" &&
          call?.status === "progress" &&
          <Button
            Icon={CircleCheckBig}
            text="Encerrar"
            type="secondary"
            className="flex-1 md:flex-initial self-end w-full sm:w-auto"
            onClick={() => updateStatus(params.id, "closed")}
          />
        }
      </div>

      <div className="flex justify-center items-start gap-4 lg:gap-6 flex-col lg:flex-row">
        <Container className="gap-5 w-full lg:max-w-[480px]">
          <div className="gap-[2px]">
            <div className="flex items-center">
              <span className="mr-auto text-xs font-normal leading-[1.4] text-gray-300">{call?.id.split("-")[0]}</span>
              <Status status={call?.status} />
            </div>
            <h2 className="text-md font-bold leading-[1.4] text-gray-200">{call?.title}</h2>
          </div >

          <InfoSection
            title="Descrição"
            description={call?.description}
          />

          <InfoSection
            title="Categoria"
            description={call?.service.title}
          />

          <div className="flex gap-8">
            <InfoSection
              title="Criado em"
              description={formatDate(call?.createdAt)}
            />

            <InfoSection
              title="Atualizado em"
              description={formatDate(call?.updatedAt)}
            />
          </div>

          {auth.session!.user.role !== "client" &&
            <InfoSection title="Cliente">
              <User
                name={call?.client.name}
                size="xsmall"
                avatar={call?.client.avatar}
              />
            </InfoSection>
          }
        </Container >

        <Container className="gap-8 w-full lg:max-w-[296px]">
          <div>
            <InfoSection title="Técnico responsável">
              <User
                name={call?.technician.name}
                email={call?.technician.email}
                size="medium"
                darkMode={true}
                avatar={call?.technician.avatar}
              />
            </InfoSection>
          </div>

          <div className="flex flex-col gap-4">
            <InfoSection title="Valores">
              <Price
                title="Preço base"
                price={call?.service.price}
              />
            </InfoSection>

            <InfoSection title="Adicionais">
              <div className="flex flex-col gap-[2px]">
                {call?.extraServices.map((call, index) => (
                  <Price
                    title={call.description}
                    price={call.price}
                    key={index}
                  />
                ))}
              </div>
            </InfoSection>

            <div className="pt-3 border-t border-gray-500">
              <Price
                title="Total"
                price={call?.extraServices.reduce(
                  (acc, cur) => acc + cur.price
                  , call?.service.price
                )}
                type="big"
              />
            </div>
          </div>
        </Container>
      </div >
    </>
  );
}
