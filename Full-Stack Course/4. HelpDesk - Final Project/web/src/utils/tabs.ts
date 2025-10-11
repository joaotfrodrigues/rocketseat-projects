import { ClipboardList, Users, BriefcaseBusiness, Wrench, Plus } from "lucide-react";


export const tabs = {
  "admin": [
    { title: "Chamados", route: "/", icon: ClipboardList },
    { title: "Técnicos", route: "/technicians", icon: Users },
    { title: "Clientes", route: "/clients", icon: BriefcaseBusiness },
    { title: "Serviços", route: "/services", icon: Wrench }
  ],
  "technician": [
    { title: "Meus chamados", route: "/", icon: ClipboardList }
  ],
  "client": [
    { title: "Chamados", route: "/", icon: ClipboardList },
    { title: "Criar chamado", route: "/create-call", icon: Plus }
  ]
}
