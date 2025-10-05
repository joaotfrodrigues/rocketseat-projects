import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Input } from "../components/Input";


export function SignIn() {
  return (
    <form className="flex flex-col gap-3">
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
          <Input label="E-mail" id="email" placeholder="exemplo@mail.com" error={false} />
          <Input label="Senha" id="password" htmlType="password" placeholder="Digite sua senha" error={false} />
        </fieldset>

        <Button htmlType="submit" text="Entrar" />
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

        <Button htmlType="button" text="Criar Conta" type="secondary" />
      </Container>
    </form>
  );
}
