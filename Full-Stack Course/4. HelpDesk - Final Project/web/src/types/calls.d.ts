type Call = {
  id: string
  title: string
  status: "opened" | "progress" | "closed"
  service: {
    title: string
    price: number
  }
  client: {
    name: string
    avatar: string | null
  }
  technician: {
    name: string
    avatar: string | null
  }
  updatedAt: string
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
