type UserRole = "client" | "technician" | "admin";

type UserAPIResponse = {
  token: string
  user: {
    id: string
    name: string
    email: string
    role: UserRole
    avatar: string
    schedules: string
    createdAt: string
    updatedAt: string
  }
}
