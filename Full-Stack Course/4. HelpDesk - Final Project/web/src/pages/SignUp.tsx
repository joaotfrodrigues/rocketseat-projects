import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { AxiosError } from "axios";

import { api } from "../services/api";

import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Input } from "../components/Input";


type FormData = {
  name: string
  email: string
  password: string
}

const schema = z.object({
  name: z.string().trim()
    .min(2, { message: "O campo nome é obrigatório" })
    .max(16, { message: "Nome demasiado longo" }),
  email: z.string().trim().email({ message: "O campo e-mail é obrigatório" }),
  password: z.string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(16, { message: "Senha demasiado longa" })
});

export function SignUp() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(schema)
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    try {
      await api.post("/users", data);

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setServerError(error.response?.data.message);
      }

      setServerError("Não foi possível criar conta");
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Container className="gap-8 sm:gap-10">
        <div>
          <h1 className="text-lg font-bold leading-[1.4] text-gray-200">
            Crie sua conta
          </h1>
          <p className="text-xs font-normal leading-[1.4] text-gray-300">
            Informe seu nome, e-mail e senha
          </p>
        </div>

        <fieldset className="flex flex-col gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                label="Nome"
                id="name"
                placeholder="Digite o nome completo"
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
                placeholder="exemplo@mail.com"
                error={errors.email?.message != null}
                helper={errors.email?.message ?? ""}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                label="Senha"
                id="password"
                placeholder="Digite sua senha"
                htmlType="password"
                error={errors.password?.message != null}
                helper={errors.password?.message ?? "Mínimo de 6 dígitos"}
                {...field}
              />
            )}
          />

          {serverError && (
            <p className="text-sm text-center text-red-500 font-medium">{serverError}</p>
          )}
        </fieldset>

        <Button htmlType="submit" text="Cadastrar" disabled={isSubmitting} />
      </Container>

      <Container className="gap-5 sm:gap-6">
        <div>
          <h2 className="text-md font-bold leading-[1.4] text-gray-200">
            Já tem uma conta?
          </h2>
          <p className="text-xs font-normal leading-[1.4] text-gray-300">
            Entre agora mesmo
          </p>
        </div>

        <Button
          htmlType="button"
          text="Acessar conta"
          type="secondary"
          onClick={() => navigate("/")}
        />
      </Container>
    </form>
  );
}
