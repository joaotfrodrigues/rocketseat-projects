import { formatDate } from "../../../utils/formatDate";

import { Container } from "../../Container";
import { InfoSection } from "../InfoSection";
import { Status } from "../Status";
import { User } from "../User";


type Props = {
  role: UserRole
  call: CallShow
}

export function CallDetails({ role, call }: Props) {
  return (
    <Container className="gap-5 w-full">
      <div className="gap-[2px]">
        <div className="flex items-center">
          <span className="mr-auto text-xs font-normal leading-[1.4] text-gray-300">{call?.id.split("-")[0]}</span>
          <Status status={call?.status} />
        </div>
        <h2 className="text-md font-bold leading-[1.4] text-gray-200">{call?.title}</h2>
      </div >

      <InfoSection
        title="Descrição"
        description={call?.description}
      />

      <InfoSection
        title="Categoria"
        description={call?.service.title}
      />

      <div className="flex gap-8">
        <InfoSection
          title="Criado em"
          description={formatDate(call?.createdAt)}
        />

        <InfoSection
          title="Atualizado em"
          description={formatDate(call?.updatedAt)}
        />
      </div>

      {role !== "client" &&
        <InfoSection title="Cliente">
          <User
            name={call?.client.name}
            size="xsmall"
            avatar={call?.client.avatar}
          />
        </InfoSection>
      }
    </Container >

  );
}
