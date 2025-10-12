import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { editClientSchema } from "../../../utils/editClientSchema";
import { api } from "../../../services/api";

import { Modal } from "../../Modal";
import { Input } from "../../Input";
import { User } from "../User";


type Client = {
  id: string
  name: string
  email: string
  avatar: string
}

type Props = {
  client: Client
  fetchClients: () => void
  closeModal: () => void
}

type FormData = {
  name: string
  email: string
}

export function EditModal({ client, fetchClients, closeModal }: Props) {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      name: client.name,
      email: client.email
    },
    resolver: zodResolver(editClientSchema)
  });

  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(data: FormData) {
    try {
      await api.patch(`/clients/${client.id}`, data);

      fetchClients();

      closeModal();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setServerError(error.response?.data.message);

        return;
      }

      setServerError("Erro ao atualizar cliente");
    }

  }

  return (
    <Modal
      title="Cliente"
      closeModal={closeModal}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <div className="flex flex-col gap-5 p-7">
        <User
          name={client.name}
          avatar={client.avatar}
          size="xbig"
          avatarMobile={true}
        />

        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                label="Nome"
                id="name"
                placeholder="Nome"
                error={errors.name?.message != null}
                helper={errors.name?.message ?? ""}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                label="E-mail"
                id="email"
                placeholder="E-mail"
                htmlType="email"
                error={errors.email?.message != null}
                helper={errors.email?.message ?? ""}
                {...field}
              />
            )}
          />
        </div>

        {serverError && (
          <p className="text-sm text-center text-red-500 font-medium">{serverError}</p>
        )}
      </div>
    </Modal>
  );
}
