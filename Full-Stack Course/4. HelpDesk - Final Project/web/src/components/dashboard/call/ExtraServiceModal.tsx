import { Controller } from "react-hook-form";

import { Modal } from "../../Modal";
import { Input } from "../../Input";


type Props = {
  closeModal: () => void
  onSubmit: () => void
  isSubmitting: boolean
  control: any
  errors: any
  serverError: string | null
}

export function ExtraServiceModal({
  closeModal,
  onSubmit,
  isSubmitting,
  control,
  errors,
  serverError }: Props) {
  return (
    <Modal
      title="Serviço adicional"
      closeModal={closeModal}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    >
      <div className="p-7 flex flex-col gap-4 border-y border-gray-500">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Input
              label="Descrição"
              id="description"
              placeholder="Descrição do serviço adicional"
              error={errors.description?.message != null}
              helper={errors.description?.message ?? ""}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <Input
              label="Valor"
              id="price"
              placeholder="Preço do serviço adicional (€)"
              error={errors.price?.message != null}
              helper={errors.price?.message ?? ""}
              {...field}
            />
          )}
        />

        {serverError && (
          <p className="text-sm text-center text-red-500 font-medium">{serverError}</p>
        )}
      </div>
    </Modal >
  );
}
