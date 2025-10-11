import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";
import { createCallSchema } from "../utils/createCallSchema";

import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Select } from "../components/Select";
import { InfoSection } from "../components/dashboard/InfoSection";
import { Button } from "../components/Button";


type Service = {
  id: string
  title: string
  price: number
}

type FormData = {
  title: string
  description: string
  service_id: string
}

const PER_PAGE = 99;

export function CreateCall() {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceSelected, setServiceSelected] = useState<string>("");
  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      service_id: ""
    },
    resolver: zodResolver(createCallSchema)
  });

  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(data: FormData) {
    try {
      await api.post("/calls", data = {
        title: data.title,
        description: data.description,
        service_id: services[Number(data.service_id)].id
      });

      navigate("/");
    } catch (error) {
      console.log(error);

      setServerError("Erro ao criar chamado");
    }
  }

  async function getServices() {
    try {
      const response = await api.get(`/services?perPage=${PER_PAGE}`);

      setServices(response.data.services);
    } catch (error) {
      console.log(error);

      alert("Erro ao buscar serviços");
    }
  }

  useEffect(() => {
    getServices()
  }, []);

  return (
    <>
      <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
        <h1 className="text-xl font-bold leading-[1.4] text-blue-dark">Novo chamado</h1>

        <form className="flex items-start gap-6 flex-col lg:flex-row" onSubmit={handleSubmit(onSubmit)}>
          <Container className="w-full lg:max-w-[480px] p-8 flex gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-md font-bold leading-[1.4] text-gray-200">
                Informações
              </h2>
              <p className="text-xs font-normal leading-[1.4] text-gray-300">
                Configure os dias e horários em que você está disponível para atender chamados
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    label="Título"
                    id="title"
                    placeholder="Digite um título para o chamado"
                    error={errors.title?.message != null}
                    helper={errors.title?.message ?? ""}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea
                    label="Descrição"
                    id="description"
                    placeholder="Descreva o que está acontecendo"
                    error={errors.description?.message != null}
                    helper={errors.description?.message ?? ""}
                    {...field}

                  />
                )}
              />

              <Controller
                control={control}
                name="service_id"
                render={({ field }) => (
                  <Select
                    label="Categoria de serviço"
                    id="service"
                    placeholder="Selecione a categoria de atendimento"
                    error={errors.service_id?.message != null}
                    helper={errors.service_id?.message ?? ""}
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      field.onChange(e);
                      setServiceSelected(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Selecione a categoria de atendimento
                    </option>
                    {services.map((service, index) => (
                      <option
                        value={index}
                        key={index}
                      >
                        {service.title}
                      </option>
                    ))}
                  </Select>
                )}
              />

              {serverError && (
                <p className="text-sm text-center text-red-500 font-medium">{serverError}</p>
              )}

            </div>
          </Container>

          <Container className="w-full lg:max-w-[296px] p-6 flex gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-md font-bold leading-[1.4] text-gray-200">
                Resumo
              </h2>
              <span className="text-xs font-normal leading-[1.4] text-gray-300">
                Valores e detalhes
              </span>
            </div>

            {serviceSelected &&
              <>
                <InfoSection
                  title="Categoria de serviço"
                  description={services[Number(serviceSelected)].title}
                />

                <InfoSection
                  title="Custo inicial"
                  description={`${formatCurrency(services[Number(serviceSelected)].price)}€`}
                  size="big"
                />
              </>
            }

            <p className="text-xs font-normal leading-[1.4] text-gray-300">
              O chamado será automaticamente atribuído a um técnico disponível
            </p>

            <Button
              text="Criar chamado"
              htmlType="submit"
            />
          </Container>
        </form>
      </div>
    </>
  );
}
