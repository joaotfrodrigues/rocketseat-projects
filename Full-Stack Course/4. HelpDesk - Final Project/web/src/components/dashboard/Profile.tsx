import { useState, useRef } from "react";
import { Upload, Trash } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import { Modal } from "../Modal";
import { User } from "./User";
import { Button } from "../Button";
import { Input } from "../Input";
import { Hour } from "./Hour";


type Props = {
  profileOpen: boolean
  closeModal: () => void
}

export function Profile({ profileOpen, closeModal }: Props) {
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const avatarRef = useRef<HTMLInputElement | null>(null);

  const auth = useAuth();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewAvatar(previewUrl);
    }
  };

  const handleRemoveAvatar = () => {
    setPreviewAvatar(null);
    if (avatarRef.current) {
      avatarRef.current.value = ""; // reset input
    }
  };

  return (
    <>
      {profileOpen &&
        <Modal
          title="Perfil"
          onSubmit={() => { }}
          isSubmitting={false}
          closeModal={() => {
            handleRemoveAvatar();
            closeModal();
          }}
        >
          <div className="pb-8 p-7 flex flex-col gap-5 border-y border-gray-500">
            <div className="flex items-center gap-3">
              <User
                name={auth.session!.user.name}
                size="xbig"
                avatar={previewAvatar || auth.session!.user.avatar}
                avatarMobile={true}
              />

              <div className="flex items-center gap-1">
                <Button
                  Icon={Upload}
                  text="Nova imagem"
                  size="small"
                  type="secondary"
                  onClick={() => avatarRef.current?.click()}
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
              <Input
                label="Nome"
                id="name"
                error={false}
                placeholder="Nome"
              />

              <Input
                label="E-mail"
                id="email"
                error={false}
                placeholder="E-mail"
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
                />
              </Input>
            </div>
          </div>

          {auth.session!.user.role === "technician" &&
            <div className="flex flex-col gap-3 py-5 px-7">
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
        </Modal>
      }
    </>
  );
}
