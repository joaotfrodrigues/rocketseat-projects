import { useNavigate } from "react-router";

import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Input } from "../components/Input";


export function SignUp() {
  const navigate = useNavigate();

  return (
    <form className="flex flex-col gap-3">
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
          <Input
            label="Nome"
            id="name"
            placeholder="Digite o nome completo"
            error={false}
          />

          <Input
            label="E-mail"
            id="email"
            placeholder="exemplo@mail.com"
            error={false}
          />

          <Input
            label="Senha"
            id="password"
            placeholder="Digite sua senha"
            helper="Mínimo de 6 dígitos"
            htmlType="password"
            error={false}
          />
        </fieldset>

        <Button htmlType="submit" text="Cadastrar"/>
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
