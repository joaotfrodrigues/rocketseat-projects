import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AxiosError } from "axios";

import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../utils/loginSchema";

import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Input } from "../components/Input";


type FormData = {
  email: string
  password: string
}

export function SignIn() {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(loginSchema)
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useAuth();

  async function onSubmit(data: FormData) {
    try {
      reset({ email: data.email, password: "" });

      const response = await api.post("/sessions", data);

      auth.save(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setServerError(error.response?.data.message);
      }

      setServerError("Credenciais inválidas");
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Container className="gap-8 sm:gap-10">
        <div>
          <h1 className="text-lg font-bold leading-[1.4] text-gray-200">
            Acesse o portal
          </h1>
          <p className="text-xs font-normal leading-[1.4] text-gray-300">
            Entre usando seu e-mail e senha cadastrados
          </p>
        </div>

        <fieldset className="flex flex-col gap-4">
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
                htmlType="password"
                placeholder="Digite sua senha"
                error={errors.password?.message != null}
                helper={errors.password?.message ?? ""}
                {...field}
              />
            )}
          />

          {serverError && (
            <p className="text-sm text-center text-red-500 font-medium">{serverError}</p>
          )}
        </fieldset>

        <Button htmlType="submit" text="Entrar" disabled={isSubmitting} />
      </Container>

      <Container className="gap-5 sm:gap-6">
        <div>
          <h2 className="text-md font-bold leading-[1.4] text-gray-200">
            Ainda não tem uma conta?
          </h2>
          <p className="text-xs font-normal leading-[1.4] text-gray-300">
            Cadastre agora mesmo
          </p>
        </div>

        <Button
          htmlType="button"
          text="Criar Conta"
          type="secondary"
          onClick={() => navigate("/signup")}
        />
      </Container>
    </form>
  );
}
