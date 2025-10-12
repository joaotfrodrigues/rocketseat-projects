import { useForm } from "react-hook-form";

import { api } from "../../../services/api";

import { Modal } from "../../Modal";


type Client = {
  id: string
  name: string
  email: string
  avatar: string
}

type Props = {
  client: Client
  fetchClients: () => void
  closeModal: () => void
}

export function DeleteModal({ client, fetchClients, closeModal }: Props) {
  const { handleSubmit, formState: { isSubmitting } } = useForm();

  async function onSubmit() {
    try {
      await api.delete(`/clients/${client.id}`);

      fetchClients();

      closeModal();
    } catch (error) {
      console.log(error);

      alert("Erro ao eliminar cliente");
    }
  }

  return (
    <Modal
      title="Excluir cliente"
      cancelBtn={true}
      submitBtnText="Sim, excluir"
      closeModal={closeModal}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-7 flex flex-col gap-5 border-y border-gray-500">
        <p>Deseja realmente excluir <strong>{client.name}?</strong></p>

        <p className="text-md font-normal leading-[1.4] text-gray-200">
          Ao excluir, todos os chamados deste client serão removidos e esta ação não poderá ser desfeita.
        </p>
      </div>
    </Modal>
  );
}
