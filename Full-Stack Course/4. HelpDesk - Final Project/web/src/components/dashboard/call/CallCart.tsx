import { Container } from "../../Container";
import { InfoSection } from "../InfoSection";
import { Price } from "../Price";
import { User } from "../User";


type Props = {
  role: UserRole
  call: CallShow
}

export function CallCart({ role, call }: Props) {
  return (
    <Container className="gap-8 w-full lg:max-w-[296px]">
      <div>
        <InfoSection title="Técnico responsável">
          <User
            name={call?.technician.name}
            email={call?.technician.email}
            size="medium"
            darkMode={true}
            avatar={call?.technician.avatar}
          />
        </InfoSection>
      </div>

      <div className="flex flex-col gap-4">
        <InfoSection title="Valores">
          <Price
            title="Preço base"
            price={call?.service.price}
          />

          {role === "technician" &&
            <Price
              title="Adicionais"
              price={call?.extraServices.reduce(
                (acc, cur) => acc + cur.price, 0
              )}
            />
          }
        </InfoSection>

        {role !== "technician" &&
          <InfoSection title="Adicionais">
            <div className="flex flex-col gap-[2px]">
              {call?.extraServices.map((call, index) => (
                <Price
                  title={call.description}
                  price={call.price}
                  key={index}
                />
              ))}
            </div>
          </InfoSection>
        }

        <div className="pt-3 border-t border-gray-500">
          <Price
            title="Total"
            price={call?.extraServices.reduce(
              (acc, cur) => acc + cur.price
              , call?.service.price
            )}
            type="big"
          />
        </div>
      </div>
    </Container>
  );
}
