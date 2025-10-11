import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Clock2, CircleCheckBig } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { extraServiceSchema } from "../utils/extraServiceSchema";

import { Link } from "../components/Link";
import { Button } from "../components/Button";

import { ExtraServicesContainer } from "../components/dashboard/call/ExtraServices";
import { CallDetails } from "../components/dashboard/call/CallDetails";
import { CallCart } from "../components/dashboard/call/CallCart";
import { ExtraServiceModal } from "../components/dashboard/call/ExtraServiceModal";


type FormData = {
  description: string
  price: string
}

export function Call() {
  const [call, setCall] = useState<CallShow | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      description: "",
      price: ""
    },
    resolver: zodResolver(extraServiceSchema)
  });

  const [serverError, setServerError] = useState<string | null>(null);

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

  useEffect(() => {
    if (params.id) {
      fetchCall(params.id);
    }
  }, [params.id]);

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

  async function deleteAdicionalService(id: string) {
    try {
      await api.delete(`/extra-services/${id}`);

      if (params.id) fetchCall(params.id);
    } catch (error) {
      console.log(error);

      alert("Não foi possível remover o serviço adicional");
    }
  }

  async function onSubmit(data: FormData) {
    try {
      data.price = data.price.replace("€", "");

      await api.post(
        `/extra-services/${params.id}`, data);

      setModalOpen(false);
      reset();

      if (params.id) fetchCall(params.id);
    } catch (error) {
      setServerError("Erro ao criar serviço adicional");
    }
  }

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

          <h1 className="text-xl font-bold leading-[1.4] text-blue-dark">Chamado detalhado</h1>
        </div>

        {auth.session!.user.role !== "client" &&
          call?.status === "opened" &&
          <Button
            Icon={Clock2}
            text="Iniciar atendimento"
            type="primary"
            className="flex-1 md:flex-initial self-end w-full sm:w-auto"
            onClick={() => updateStatus({ id: params.id, newStatus: "progress" })}
          />
        }

        {auth.session!.user.role !== "client" &&
          call?.status === "progress" &&
          <Button
            Icon={CircleCheckBig}
            text="Encerrar"
            type="secondary"
            className="flex-1 md:flex-initial self-end w-full sm:w-auto"
            onClick={() => updateStatus({ id: params.id, newStatus: "closed" })}
          />
        }
      </div>

      <div className="flex justify-center items-start gap-4 lg:gap-6 flex-col lg:flex-row">
        <div className="gap-4 sm:gap-3 flex flex-col w-full lg:max-w-[480px]">
          <CallDetails
            role={auth.session!.user.role}
            call={call!}
          />

          <ExtraServicesContainer
            call={call!}
            deleteAdicionalService={deleteAdicionalService}
            openModal={() => setModalOpen(true)}
          />
        </div>

        <CallCart
          role={auth.session!.user.role}
          call={call!}
        />
      </div >

      {modalOpen &&
        <ExtraServiceModal
          closeModal={() => setModalOpen(false)}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          control={control}
          errors={errors}
          serverError={serverError}
        />
      }
    </>
  );
}

