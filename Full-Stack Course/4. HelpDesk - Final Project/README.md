# HelpDesk - Final Project

A full-stack helpdesk management system built with Node.js, React, and PostgreSQL. This project provides a complete solution for managing support tickets, technicians, clients, and services.

## 🚀 Tech Stack

### Backend (API)
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Prisma** as ORM
- **PostgreSQL** as database
- **JWT** for authentication
- **Multer** for file uploads
- **Zod** for data validation
- **Jest** for testing

### Frontend (Web)
- **React 19** with TypeScript
- **Vite** as build tool
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Axios** for API calls
- **Lucide React** for icons

### Infrastructure
- **Docker** and **Docker Compose** for containerization
- **Nginx** for web server

## 📋 Features

- **User Management**: Support for Admin, Technician, and Client roles
- **Authentication**: JWT-based authentication system
- **Call Management**: Create, track, and manage support tickets
- **Service Management**: Manage available services and pricing
- **Technician Management**: Assign and manage technicians
- **Client Management**: Manage client accounts
- **Extra Services**: Add additional services to calls
- **File Uploads**: Support for file attachments
- **Role-based Access Control**: Different permissions for different user types

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/joaotfrodrigues/rocketseat-projects
   cd rocketseat-projects/Full-Stack Course/4. HelpDesk - Final Project
   ```

2. **Start the services with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database on port 5432
   - API server on port 3333
   - Web application on port 5173

3. **Run database migrations**
   ```bash
   cd api
   npx prisma migrate deploy
   ```

4. **Access the application**
   - Web App: http://localhost:5173
   - API: http://localhost:3333

### Development Setup

If you prefer to run the services locally:

1. **Backend Setup**
   ```bash
   cd api
   npm install
   cp .env.example .env  # Configure your environment variables
   npx prisma migrate dev
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd web
   npm install
   npm run dev
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3333
```

### Authentication
Most endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### POST /sessions
**Description:** User login (returns JWT token)  
**Authentication:** None required

**Request:**
```bash
POST /sessions
Content-Type: application/json

{
  "email": "joao@gmail.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João",
    "email": "joao@gmail.com",
    "role": "admin"
  }
}
```

---

## 👤 User Management

### POST /users
**Description:** Create a new user account  
**Authentication:** None required

**Request:**
```bash
POST /users
Content-Type: application/json

{
  "name": "João 2 - Cliente",
  "email": "joao2@cliente.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "João 2 - Cliente",
  "email": "joao2@cliente.com",
  "role": "client",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### PATCH /users
**Description:** Update user profile  
**Authentication:** Required (all roles)

**Request:**
```bash
PATCH /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Updated",
  "email": "joao.updated@gmail.com",
  "filename": "avatar.png"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "João Updated",
  "email": "joao.updated@gmail.com",
  "role": "client",
  "avatar": "avatar.png",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### PATCH /users/password
**Description:** Update user password  
**Authentication:** Required (all roles)

**Request:**
```bash
PATCH /users/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "old_password": "123456",
  "new_password": "ola123"
}
```

**Response:**
```json
{
  "message": "Password updated successfully"
}
```

---

## 🔧 Technician Management

### GET /technicians
**Description:** List all technicians  
**Authentication:** Required (admin only)

**Request:**
```bash
GET /technicians
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "João Technician",
    "email": "joao.tech@gmail.com",
    "role": "technician",
    "schedules": "[1,2,3]",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /technicians/:id
**Description:** Get specific technician details  
**Authentication:** Required (technician/admin)

**Request:**
```bash
GET /technicians/5ea667dd-22c4-4f50-9578-2bbccfc84a58
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "5ea667dd-22c4-4f50-9578-2bbccfc84a58",
  "name": "João Technician",
  "email": "joao.tech@gmail.com",
  "role": "technician",
  "schedules": "[1,2,3]",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### POST /technicians
**Description:** Create new technician  
**Authentication:** Required (admin only)

**Request:**
```bash
POST /technicians
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Technician",
  "email": "tech@gmail.com",
  "password": "123456",
  "schedules": "[1,2,3]"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "New Technician",
  "email": "tech@gmail.com",
  "role": "technician",
  "schedules": "[1,2,3]",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### PATCH /technicians/:id
**Description:** Update technician information  
**Authentication:** Required (admin only)

**Request:**
```bash
PATCH /technicians/5ea667dd-22c4-4f50-9578-2bbccfc84a58
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Updated",
  "email": "joao.tecnico@gmail.com",
  "schedules": "[1,5,7,9]"
}
```

**Response:**
```json
{
  "id": "5ea667dd-22c4-4f50-9578-2bbccfc84a58",
  "name": "João Updated",
  "email": "joao.tecnico@gmail.com",
  "role": "technician",
  "schedules": "[1,5,7,9]",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### DELETE /technicians/:id
**Description:** Delete technician  
**Authentication:** Required (admin only)

**Request:**
```bash
DELETE /technicians/efde73d5-dab4-4808-b485-d30879303b7c
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Technician deleted successfully"
}
```

---

## 🛠️ Service Management

### GET /services
**Description:** List all services  
**Authentication:** Required (client/admin)

**Request:**
```bash
GET /services?perPage=999
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Primeiro serviço",
    "price": 12.99,
    "status": "active",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST /services
**Description:** Create new service  
**Authentication:** Required (admin only)

**Request:**
```bash
POST /services
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Primeiro serviço",
  "price": "12.99"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Primeiro serviço",
  "price": 12.99,
  "status": "active",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### PATCH /services/:id
**Description:** Update service information  
**Authentication:** Required (admin only)

**Request:**
```bash
PATCH /services/c35fbee6-70d8-45d5-8594-33ca7fbedf19
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Segundo serviço - 2",
  "price": "13.99"
}
```

**Response:**
```json
{
  "id": "c35fbee6-70d8-45d5-8594-33ca7fbedf19",
  "title": "Segundo serviço - 2",
  "price": 13.99,
  "status": "active",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### PATCH /services/status/:id
**Description:** Update service status  
**Authentication:** Required (admin only)

**Request:**
```bash
PATCH /services/status/c35fbee6-70d8-45d5-8594-33ca7fbedf19
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "inactive"
}
```

**Response:**
```json
{
  "id": "c35fbee6-70d8-45d5-8594-33ca7fbedf19",
  "title": "Segundo serviço - 2",
  "price": 13.99,
  "status": "inactive",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### DELETE /services/:id
**Description:** Delete service  
**Authentication:** Required (admin only)

**Request:**
```bash
DELETE /services/c35fbee6-70d8-45d5-8594-33ca7fbedf19
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Service deleted successfully"
}
```

---

## 👥 Client Management

### GET /clients
**Description:** List all clients  
**Authentication:** Required (admin only)

**Request:**
```bash
GET /clients
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "João Client",
    "email": "joao@cliente.com",
    "role": "client",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### PATCH /clients/:id
**Description:** Update client information  
**Authentication:** Required (admin only)

**Request:**
```bash
PATCH /clients/d9ec9510-80d4-4ba8-aa87-9f7a49d80bef
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Tomás",
  "email": "joaotomas@cliente.com"
}
```

**Response:**
```json
{
  "id": "d9ec9510-80d4-4ba8-aa87-9f7a49d80bef",
  "name": "João Tomás",
  "email": "joaotomas@cliente.com",
  "role": "client",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### DELETE /clients/:id
**Description:** Delete client  
**Authentication:** Required (admin only)

**Request:**
```bash
DELETE /clients/d9ec9510-80d4-4ba8-aa87-9f7a49d80bef
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Client deleted successfully"
}
```

---

## 📞 Call Management

### GET /calls
**Description:** List all calls (role-based filtering)  
**Authentication:** Required (all roles)

**Request:**
```bash
GET /calls
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Primeiro chamado",
    "description": "Descrição do primeiro chamado",
    "status": "opened",
    "service": {
      "id": "uuid",
      "title": "Primeiro serviço",
      "price": 12.99
    },
    "client": {
      "id": "uuid",
      "name": "João Client",
      "email": "joao@cliente.com"
    },
    "technician": {
      "id": "uuid",
      "name": "João Technician",
      "email": "joao.tech@gmail.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /calls/:call_id
**Description:** Get specific call details  
**Authentication:** Required (all roles)

**Request:**
```bash
GET /calls/81350ea1-e9d3-421d-b109-f6dd35b05352
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "81350ea1-e9d3-421d-b109-f6dd35b05352",
  "title": "Primeiro chamado",
  "description": "Descrição do primeiro chamado",
  "status": "opened",
  "service": {
    "id": "uuid",
    "title": "Primeiro serviço",
    "price": 12.99
  },
  "client": {
    "id": "uuid",
    "name": "João Client",
    "email": "joao@cliente.com"
  },
  "technician": {
    "id": "uuid",
    "name": "João Technician",
    "email": "joao.tech@gmail.com"
  },
  "extraServices": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### POST /calls
**Description:** Create new call  
**Authentication:** Required (client only)

**Request:**
```bash
POST /calls
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Primeiro chamado",
  "description": "Descrição do primeiro chamado",
  "service_id": "b530bfff-b762-40a5-9762-45f30ffdd3f4"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Primeiro chamado",
  "description": "Descrição do primeiro chamado",
  "status": "opened",
  "serviceId": "b530bfff-b762-40a5-9762-45f30ffdd3f4",
  "clientId": "uuid",
  "technicianId": "uuid",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### PATCH /calls/status/:call_id
**Description:** Update call status  
**Authentication:** Required (technician/admin)

**Request:**
```bash
PATCH /calls/status/b7899a4c-2b5f-4e2d-92b1-ad38f9ebd537
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "progress"
}
```

**Response:**
```json
{
  "id": "b7899a4c-2b5f-4e2d-92b1-ad38f9ebd537",
  "title": "Primeiro chamado",
  "description": "Descrição do primeiro chamado",
  "status": "progress",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 🔧 Extra Services

### POST /extra-services/:call_id
**Description:** Add extra service to call  
**Authentication:** Required (technician only)

**Request:**
```bash
POST /extra-services/0e175e24-fac0-4c0c-8121-01f381d430ec
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "descricao",
  "price": "12.99"
}
```

**Response:**
```json
{
  "id": "uuid",
  "description": "descricao",
  "price": 12.99,
  "callId": "0e175e24-fac0-4c0c-8121-01f381d430ec",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### DELETE /extra-services/:extra_service_id
**Description:** Remove extra service  
**Authentication:** Required (technician only)

**Request:**
```bash
DELETE /extra-services/987131d6-1f8c-4e06-96b0-c19d5fb4301f
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Extra service deleted successfully"
}
```

---

## 📁 File Uploads

### POST /uploads
**Description:** Upload file  
**Authentication:** Required (all roles)

**Request:**
```bash
POST /uploads
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [file upload]
```

**Response:**
```json
{
  "filename": "1557263466234 (1).png",
  "url": "http://localhost:3333/uploads/1557263466234 (1).png"
}
```

### DELETE /uploads
**Description:** Delete file  
**Authentication:** Required (all roles)

**Request:**
```bash
DELETE /uploads
Authorization: Bearer <token>
Content-Type: application/json

{
  "filename": "1557263466234 (1).png"
}
```

**Response:**
```json
{
  "message": "File deleted successfully"
}
```

## 🔐 User Roles & Permissions

### Admin
- Full access to all endpoints
- Can manage users, technicians, clients, services, and calls
- Can view all calls and statistics

### Technician
- Can view assigned calls
- Can update call status
- Can add/remove extra services
- Can upload files

### Client
- Can create calls
- Can view their own calls
- Can update their profile
- Can upload files

## 🧪 Testing

Run the test suite:

```bash
cd api
npm test
```

```

## 🐳 Docker

The project includes Docker configuration for easy deployment:

- **PostgreSQL**: Database service
- **API**: Node.js backend service
- **Web**: React frontend with Nginx

## 📝 Environment Variables

Create a `.env` file in the `api` directory:

```env
DATABASE_URL="postgresql://postgresql:postgresql@localhost:5432/helpdesk"
JWT_SECRET="your-jwt-secret"
PORT=3333
```

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**João Rodrigues**

---

For more detailed information about specific endpoints and their parameters, refer to the Insomnia collection file (`Insomnia.yaml`) included in the project.