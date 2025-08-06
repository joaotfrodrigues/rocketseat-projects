# Tasks Manager API

A comprehensive task management API built with Node.js, Express, TypeScript, and PostgreSQL. This project implements a complete task management system with user authentication, team collaboration, and task tracking capabilities.

## 🚀 Features

- **User Management**: Create, view, and manage users with role-based access control
- **Authentication**: JWT-based authentication system with secure password hashing
- **Team Management**: Create and manage teams for collaborative work
- **Task Management**: Full CRUD operations for tasks with status tracking
- **Task History**: Track changes to task status over time
- **Authorization**: Role-based access control (Admin/Member)
- **Database**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript implementation with Zod validation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Testing**: Jest
- **Development**: tsx (TypeScript execution)

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tasks_manager"
JWT_SECRET="your-super-secret-jwt-key"
```

### 3. Database Setup

Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

### 4. Database Migration

Run the Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

### 5. Start the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3333`

## 📚 API Endpoints

### Authentication

#### POST `/sessions`
Create a new session (login)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "member",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Users

#### POST `/users`
Create a new user

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/users`
List all users (Admin only)

#### GET `/users/:user_id`
Get user details by ID

### Teams

#### POST `/teams`
Create a new team

**Request Body:**
```json
{
  "name": "Team Name",
  "description": "Team description"
}
```

#### GET `/teams`
List all teams

#### GET `/teams/:id`
Get team details by ID

#### PUT `/teams/:id`
Update team information

#### DELETE `/teams/:id`
Delete a team

### Team Members

#### POST `/team`
Add a user to a team

**Request Body:**
```json
{
  "user_id": "user-uuid",
  "team_id": "team-uuid"
}
```

#### GET `/team/:team_id`
List team members

#### DELETE `/team/:team_id/:user_id`
Remove user from team

### Tasks

#### POST `/tasks`
Create a new task

**Request Body:**
```json
{
  "title": "Task Title",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "assigned_to": "user-uuid",
  "team_id": "team-uuid"
}
```

#### GET `/tasks`
List all tasks (with authorization)

#### GET `/tasks/:task_id`
Get task details by ID

#### GET `/tasks/team/:team_id`
List tasks by team

#### PUT `/tasks/:task_id`
Update task information

#### DELETE `/tasks/:task_id`
Delete a task

## 🔐 Authentication & Authorization

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <jwt-token>
```

### User Roles

- **Admin**: Can access all resources and manage the system
- **Member**: Can only access resources they're assigned to or belong to

### Authorization Rules

- Users can only view tasks they're assigned to or tasks from teams they belong to
- Admins can view and manage all resources
- Team members can only view tasks from their teams
- Task creation requires the assigned user to be a member of the specified team

## 🗄️ Database Schema

### Users
- `id`: UUID (Primary Key)
- `name`: String (100 chars)
- `email`: String (150 chars, unique)
- `password`: String (255 chars, hashed)
- `role`: Enum (admin/member)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Teams
- `id`: UUID (Primary Key)
- `name`: String (100 chars)
- `description`: Text
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Team Members
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key to Users)
- `teamId`: UUID (Foreign Key to Teams)
- `createdAt`: DateTime

### Tasks
- `id`: UUID (Primary Key)
- `title`: String (200 chars)
- `description`: Text
- `status`: Enum (pending/in_progress/completed)
- `priority`: Enum (low/medium/high)
- `assignedTo`: UUID (Foreign Key to Users)
- `teamId`: UUID (Foreign Key to Teams)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Task History
- `id`: UUID (Primary Key)
- `taskId`: UUID (Foreign Key to Tasks)
- `changedBy`: UUID (Foreign Key to Users)
- `oldStatus`: Enum (TaskStatus)
- `newStatus`: Enum (TaskStatus)
- `changedAt`: DateTime

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📦 Scripts

- `npm run dev`: Start development server with hot reload
- `npm test`: Run test suite
- `npx prisma migrate dev`: Run database migrations
- `npx prisma studio`: Open Prisma Studio for database management

## 🐳 Docker

The project includes Docker Compose configuration for PostgreSQL:

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down
```

## 📁 Project Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts             # Server entry point
├── env.ts                # Environment validation
├── config/
│   └── auth.ts          # JWT configuration
├── controllers/          # Route controllers
├── database/
│   └── prisma.ts        # Prisma client
├── middlewares/          # Express middlewares
├── routes/              # API routes
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🔧 Configuration

### Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token signing

### JWT Configuration

JWT tokens are configured with:
- **Secret**: From `JWT_SECRET` environment variable
- **Expiration**: 1 day
- **Algorithm**: HS256

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**João Rodrigues**

---

This project was developed as part of the Rocketseat Full Stack Course challenge. It demonstrates modern Node.js development practices with TypeScript, proper authentication, authorization, and database management using Prisma ORM.
