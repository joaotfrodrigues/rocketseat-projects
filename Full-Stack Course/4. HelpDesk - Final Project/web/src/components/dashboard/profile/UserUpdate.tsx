import { Controller } from "react-hook-form";
import { Upload, Trash } from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";

import { Modal } from "../../Modal";
import { User } from "../User";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Hour } from "../Hour";


type Props = {
  onSubmit: () => void
  isSubmitting: boolean
  closeModal: () => void

  avatar?: string
  newAvatar: () => void
  avatarRef: any
  handleAvatarChange: any
  handleRemoveAvatar: () => void

  errors: any
  control: any
  serverError: string | null

  passwordModal: any
}

export function UserUpdate({
  onSubmit,
  isSubmitting,
  closeModal,
  avatar,
  newAvatar,
  avatarRef,
  handleAvatarChange,
  handleRemoveAvatar,
  errors,
  control,
  serverError,
  passwordModal }: Props) {

  const auth = useAuth();

  return (

    <Modal
      title="Perfil"
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      closeModal={closeModal}
    >
      <div className="pb-8 p-7 flex flex-col gap-5 border-y border-gray-500">
        <div className="flex items-center gap-3">
          <User
            name={auth.session!.user.name}
            size="xbig"
            avatarMobile={true}
            avatar={avatar}
          />

          <div className="flex items-center gap-1">
            <Button
              Icon={Upload}
              text="Nova imagem"
              size="small"
              type="secondary"
              onClick={newAvatar}
            />

            <input
              type="file"
              name="avatar"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png"
              ref={avatarRef}
              onChange={handleAvatarChange}
            />

            <Button
              Icon={Trash}
              iconAlt="Remover imagem"
              size="small"
              type="secondary"
              iconColor="text-feedback-danger"
              onClick={handleRemoveAvatar}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                label="Nome"
                id="name"
                placeholder="Nome"
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
                placeholder="E-mail"
                error={errors.email?.message != null}
                helper={errors.email?.message ?? ""}
                {...field}
              />
            )}
          />

          <Input
            label="Senha"
            id="password"
            error={false}
            htmlType="password"
            disabled={true}
            value="12345678"
          >
            <Button
              text="Alterar"
              type="secondary"
              size="small"
              className="absolute right-0 top-1/2 -translate-y-1/2"
              onClick={passwordModal}
            />
          </Input>

          {serverError && (
            <p className="text-sm text-center text-red-500 font-medium">{serverError}</p>
          )}
        </div>
      </div>

      {auth.session!.user.role === "technician" &&
        <div className="flex flex-col gap-3 py-5 px-7 border-b border-gray-500">
          <div>
            <span className="text-sm font-normal leading-[1.4] text-gray-200">Disponibilidade</span>
            <p className="text-xs font-normal leading-[1.4] text-gray-300">
              Horários de atendimento definidos pelo admin
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            {JSON.parse(auth.session!.user.schedules).map((schedule: any, index: number) => (
              <Hour
                hour={schedule}
                disabled={true}
                key={index}
              />
            ))}
          </div>
        </div>
      }
    </Modal >
  );
}
