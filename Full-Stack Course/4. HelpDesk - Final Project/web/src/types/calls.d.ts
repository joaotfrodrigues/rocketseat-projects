type Client = {
  name: string
  avatar: string | null
}

type Service = {
  title: string
  price: number
}

type Technician = {
  name: string
  email: string | undefined
  avatar: string | null
}

type Call = {
  id: string
  title: string
  status: "opened" | "progress" | "closed"
  service: Service
  client: Client
  technician: Technician
  updatedAt: string
}

type ExtraService = {
  id: string
  description: string
  price: number
}

type CallShow = Call & {
  description: string
  createdAt: string
  extraServices: ExtraService[]
}

type Calls = {
  calls: Call[]
  pagination: {
    page: number
    perPage: number
    totalRecords: number
    totalPages: number
  }
}
