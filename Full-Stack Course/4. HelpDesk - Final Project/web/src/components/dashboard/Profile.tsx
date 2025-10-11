import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";

import { api } from "../../services/api";
import { profileSchema } from "../../utils/profileSchema";

import { UserUpdate } from "./profile/UserUpdate";
import { PasswordUpdate } from "./profile/PasswordUpdate";


type Props = {
  closeModal: () => void
}

type FormData = {
  name: string
  email: string
}

export function Profile({ closeModal }: Props) {
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);

  const auth = useAuth();
  const profile = useProfile();

  const [avatar, setAvatar] = useState<string | undefined>(auth.session!.user.avatar);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      name: auth.session!.user.name,
      email: auth.session!.user.email
    },
    resolver: zodResolver(profileSchema)
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
    }
  }

  const handleRemoveAvatar = () => {
    setAvatar(undefined);
    if (avatarRef.current) {
      avatarRef.current.value = ""; // reset input
    }
  }

  function close() {
    handleRemoveAvatar();
    closeModal();
  }

  async function onSubmit(data: FormData) {
    try {
      setServerError(null);

      let avatarFilename = avatar;

      const file = avatarRef.current?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("/uploads", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (!response.data.filename) throw new Error("Erro ao atualizar avatar");

        avatarFilename = response.data.filename;
      }

      const userUpdated = {
        name: data.name,
        email: data.email,
      }

      await api.patch("/users", {
        ...userUpdated,
        filename: avatarFilename
      });

      auth.refresh({ ...userUpdated, avatar: avatarFilename });
      close();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erro ao atualizar o perfil.";
        setServerError(message);
      } else {
        setServerError("Erro ao atualizar o perfil.");
      }
    }
  }

  return (
    <>
      {profile?.profileOpen &&
        <UserUpdate
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          closeModal={close}

          avatar={avatar}
          newAvatar={() => avatarRef.current?.click()}
          avatarRef={avatarRef}
          handleAvatarChange={handleAvatarChange}
          handleRemoveAvatar={handleRemoveAvatar}

          errors={errors}
          control={control}
          serverError={serverError}

          passwordModal={() => {
            closeModal();
            setPasswordModalOpen(true);
          }}
        />
      }

      {passwordModalOpen &&
        <PasswordUpdate
          closeModal={() => setPasswordModalOpen(false)}
          backButton={() => {
            setPasswordModalOpen(false);
            profile?.setProfileOpen(true);
          }}
        />
      }
    </>
  );
}
