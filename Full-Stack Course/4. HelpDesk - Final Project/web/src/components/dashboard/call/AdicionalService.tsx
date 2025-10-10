import { Trash } from "lucide-react";

import { formatCurrency } from "../../../utils/formatCurrency";

import { Button } from "../../Button";


type Props = {
  description: string
  price: number
  onClick: () => void
  disabled: boolean
}

export function AdicionalService({ description, price, onClick, disabled }: Props) {
  return (
    <div className="flex items-center gap-6">
      <span
        className="flex-1 text-xs font-bold leading-[1.4] text-gray-200 capitalize"
      >
        {description}
      </span>

      <span className="text-xs font-normal leading-[1.4] text-gray-200">
        {formatCurrency(price)}€
      </span>

      { !disabled &&
      <Button
        Icon={Trash}
        iconAlt="Remover serviço"
        size="small"
        type="secondary"
        iconColor="text-feedback-danger"
        onClick={onClick}
      />
      }
    </div>
  );
}
