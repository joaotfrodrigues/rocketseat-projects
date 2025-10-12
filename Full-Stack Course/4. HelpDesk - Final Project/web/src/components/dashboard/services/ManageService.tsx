import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { manageServiceSchema } from "../../../utils/manageServiceSchema";
import { api } from "../../../services/api";

import { Modal } from "../../Modal";
import { Input } from "../../Input";


type Service = {
  id: string
  title: string
  price: number
}

type FormData = {
  title: string
  price: string
}

type Props = {
  fetchServices: () => void
  closeModal: () => void
  type: "create" | "update"
  service?: Service
}

export function ManageService({ fetchServices, closeModal, type, service }: Props) {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      title: service?.title ?? "",
      price: service?.price ?? ""
    },
    resolver: zodResolver(manageServiceSchema)
  });

  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(data: FormData) {
    try {
      if (type === "create") {
        await api.post("/services", data);
      } else {
        await api.patch(`/services/${service?.id}`, data);
      }

      fetchServices();

      closeModal();
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          setServerError(error.response?.data.message);
        }

        const issues = error.response?.data?.issues;

        if (issues && typeof issues === "object" && "price" in issues) {
          setServerError("Preço inválido");
        } else {
          setServerError("Erro ao criar serviço");
        }
      }

      setServerError("Erro ao criar serviço");
    }
  }

  return (
    <Modal
      title={type === "create" ? "Cadastro de serviço" : "Serviço"}
      closeModal={closeModal}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <div className="p-7 border-y border-gray-500 flex flex-col gap-4">
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Input
              label="Título"
              id="title"
              placeholder="Nome do serviço"
              error={errors.title?.message != null}
              helper={errors.title?.message ?? ""}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <Input
              label="Valor"
              id="price"
              placeholder="0,00"
              error={errors.price?.message != null}
              helper={errors.price?.message ?? ""}
              {...field}
            />
          )}
        />

        {serverError && (
          <p className="text-sm text-center text-red-500 font-medium">{serverError}</p>
        )}
      </div>
    </Modal>
  );
}
