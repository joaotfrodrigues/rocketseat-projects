import { useAuth } from "../../hooks/useAuth";


export function Calls() {
  const auth = useAuth();

  return (
    <h1>Chamados</h1>
  );
}
