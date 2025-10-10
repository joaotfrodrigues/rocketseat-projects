import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { passwordSchema } from "../../../utils/passwordSchema";

import { api } from "../../../services/api";

import { Modal } from "../../Modal";
import { Input } from "../../Input";


type Props = {
  closeModal: (arg0: boolean) => void
  backButton: () => void
}

type FormData = {
  old_password: string
  new_password: string
}

export function PasswordUpdate({ closeModal, backButton }: Props) {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      old_password: "",
      new_password: ""
    },
    resolver: zodResolver(passwordSchema)
  });

  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(data: FormData) {
    try {
      reset();

      await api.patch("/users/password", data);

      backButton();
    } catch (error) {
      console.log(error);

      setServerError("Senha incorreta");
    }

  }

  return (
    <Modal
      title="Alterar senha"
      closeModal={() => closeModal(false)}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      backButton={backButton}
    >
      <div className="flex flex-col gap-4 p-7 pb-8 border-y border-gray-500">
        <Controller
          control={control}
          name="old_password"
          render={({ field }) => (
            <Input
              label="Senha atual"
              id="current_password"
              placeholder="Digite sua senha atual"
              htmlType="password"
              error={errors.old_password?.message != null}
              helper={errors.old_password?.message ?? ""}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="new_password"
          render={({ field }) => (
            <Input
              label="Nova senha"
              id="new_password"
              placeholder="Digite sua nova senha"
              htmlType="password"
              error={errors.new_password?.message != null}
              helper={errors.new_password?.message ?? "Mínimo de 6 dígitos"}
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
