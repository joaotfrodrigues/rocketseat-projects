import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "../utils/registerSchema";
import { registerSchemaUpdate } from "../utils/registerSchema";

import { api } from "../services/api";

import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { User } from "../components/dashboard/User";
import { Hour } from "../components/dashboard/Hour";
import { Header } from "../components/dashboard/technician/Header";


type Props = {
  operation: "create" | "update"
}

type FormData = {
  name: string
  email: string
  password?: string
}

export function ManageTechnician({ operation }: Props) {
  const [user, setUser] = useState({ name: "", email: "", avatar: null });
  const [schedules, setSchedules] = useState<string[]>([]);

  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const schema = operation === "create" ? registerSchema : registerSchemaUpdate;

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
    },
    resolver: zodResolver(schema)
  });

  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(data: FormData) {
    try {
      if (operation === "create") {
        await api.post("/technicians", data = {
          name: data.name,
          email: data.email,
          password: data.password,
          schedules: JSON.stringify(schedules)
        });
      } else {
        if (params.id) {
          await api.patch(`/technicians/${params.id}`, data = {
            name: data.name,
            email: data.email,
            schedules: JSON.stringify(schedules)
          });
        }
      }

      navigate("/technicians");
    } catch (error) {
      console.log(error);

      if (operation === "create") {
        setServerError("Erro ao criar técnico");
      } else {
        setServerError("Erro ao atualizar técnico");
      }
    }
  }

  async function fetchUser() {
    try {
      const response = await api.get(`/technicians/${params.id}`);

      const fetchedUser = {
        name: response.data.name,
        email: response.data.email,
        avatar: response.data.avatar
      };

      setSchedules(JSON.parse(response.data.schedules));
      setUser(fetchedUser);
      reset(fetchedUser);
    } catch (error) {
      console.log(error);

      alert("Erro ao carregar utilizador");
    }
  }

  useEffect(() => {
    if (operation === "update") {
      fetchUser();
    }
  }, [operation, params.id]);

  return (
    <form className="w-full max-w-[800px] mx-auto flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Header />

      <div className="flex items-start gap-6 flex-col lg:flex-row">
        <Container className="w-full lg:max-w-[296px] p-6 gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-md font-bold leading-[1.4] text-gray-200">Dados pessoais</h2>
            <p className="text-xs font-normal leading-[1.4] text-gray-300">
              Defina as informações do perfil de técnico
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {operation === "update" &&
              <User
                name={user.name}
                size="xbig"
                avatar={user.avatar}
              />
            }

            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  label="Nome"
                  id="name"
                  placeholder="Nome completo"
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
                  placeholder="exemplo@mail.com"
                  htmlType="email"
                  error={errors.email?.message != null}
                  helper={errors.email?.message ?? ""}
                  {...field}
                />
              )}
            />

            {operation === "create" &&
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    label="Senha"
                    id="password"
                    placeholder="Defina a senha de acesso"
                    htmlType="password"
                    error={errors.password?.message != null}
                    helper={errors.password?.message ?? "Mínimo de 6 dígitos"}
                    {...field}
                  />
                )}
              />
            }

            {serverError && (
              <p className="text-sm text-center text-red-500 font-medium">{serverError}</p>
            )}
          </div>
        </Container>

        <Container className="w-full lg:max-w-[480px] p-6 gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-md font-bold leading-[1.4] text-gray-200">Horários de atendimento</h2>
            <p className="text-xs font-normal leading-[1.4] text-gray-300">
              Selecione os horários de disponibilidade do técnico para atendimento
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xxs font-bold leading-[1.4] text-gray-300 uppercase">Manhã</span>

              <div className="flex flex-wrap gap-2">
                {["07", "08", "09", "10", "11", "12"].map((hour, index) => (
                  <Hour
                    hour={hour}
                    key={index}
                    checked={schedules.includes(hour)}
                    onToggle={(hour, isChecked) => {
                      setSchedules((prev) =>
                        isChecked ? [...prev, hour] : prev.filter((h) => h !== hour)
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xxs font-bold leading-[1.4] text-gray-300 uppercase">Tarde</span>

              <div className="flex flex-wrap gap-2">
                {["13", "14", "15", "16", "17", "18"].map((hour, index) => (
                  <Hour
                    hour={hour}
                    key={index}
                    checked={schedules.includes(hour)}
                    onToggle={(hour, isChecked) => {
                      setSchedules((prev) =>
                        isChecked ? [...prev, hour] : prev.filter((h) => h !== hour)
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xxs font-bold leading-[1.4] text-gray-300 uppercase">Noite</span>

              <div className="flex flex-wrap gap-2">
                {["19", "20", "21", "22", "23"].map((hour, index) => (
                  <Hour
                    hour={hour}
                    key={index}
                    checked={schedules.includes(hour)}
                    onToggle={(hour, isChecked) => {
                      setSchedules((prev) =>
                        isChecked ? [...prev, hour] : prev.filter((h) => h !== hour)
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </form>
  );
}
