import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "../../Button";
import { Link } from "../../Link";


export function Header() {
  const navigate = useNavigate();

  return (
      <div className="flex gap-4">
        <div className="flex-1">
          <Link
            Icon={ArrowLeft}
            text="Voltar"
            size="small"
            onClick={() => navigate("/technicians")}
          />

          <h1 className="text-xl font-bold leading-[1.4] text-blue-dark">Perfil de técnico</h1>
        </div>

        <div className="flex items-end gap-2">
          <Button
            text="Cancelar"
            type="secondary"
            onClick={() => navigate("/technicians")}
          />
          <Button
            text="Salvar"
            htmlType="submit"
          />
        </div>
      </div>
  );
}
