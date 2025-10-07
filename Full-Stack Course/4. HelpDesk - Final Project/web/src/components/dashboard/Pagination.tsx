import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../Button";


type Props = {
  current: number
  total: number
  onNext: () => void
  onPrevious: () => void
}

export function Pagination({ current, total, onNext, onPrevious }: Props) {
  return (
    <div className="flex items-start">
      <div className="flex flex-1 items-center justify-center gap-4">
        <Button
          Icon={ArrowLeft}
          iconAlt="Ícone de voltar"
          htmlType="button"
          onClick={onPrevious}
          disabled={current === 1}
        />

        <span
          className="text-sm text-gray-200"
        >
          {current}/{total}
        </span>

        <Button
          Icon={ArrowRight}
          iconAlt="Ícone de avançar"
          htmlType="button"
          onClick={onNext}
          disabled={current === total}
        />
      </div>
    </div>
  );
}
