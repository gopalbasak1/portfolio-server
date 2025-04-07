# Portfolio Project API

The goal of this project is to develop a backend for a portfolio with blogging platform where users can write, update, and delete their project & blogs. This system includes two roles: Admin and User.

## 🌍 Live Deployment Link

[Portfolio-Server](https://gopal-server.vercel.app/)

## 🚀 Features

## 1. User Roles

**Admin:**

- Manually created in the database with predefined credentials.
- Can delete any project & blog.
- Cannot update project & blogs.
- Can see all message by users

**User:**

- Can register and log in.
- Can create, update, and delete their own project and blogs.
- Cannot perform admin actions.
- Can write message to admin

## 2. Authentication & Authorization

- **Authentication:** Users must log in to perform write, update, and delete operations.

- **Authorization:** Role-based access control to differentiate between Admin and User roles.

## 3. Project API

- Public API for reading projects.

- Supports search, sorting, and filtering.

- Includes project title, content, author details, and metadata

- Development Tools:
  - Live reload with ts-node-dev.
  - Build with tsc.
  - Lint and format code using Prettier and ESLint.

## 4. Blog API

- Public API for reading blogs.

- Supports search, sorting, and filtering.

- Includes blog title, content, author details, and metadata

- Development Tools:
  - Live reload with ts-node-dev.
  - Build with tsc.
  - Lint and format code using Prettier and ESLint.

## 5. 📨 Message API

This API allows authenticated users to send messages and enables admins to view and manage messages from users.

## 🚀 Features

- ✅ Users can send messages through a contact form (only logged-in users).
- ✅ Messages include name, email, message.
- ✅ Admins can view all messages from users.
- ✅ Uses MongoDB for storing messages.
- ✅ Secure authentication using NextAuth.js.

## ✅ User Sends a Message

- User logs in and fills out the contact form.
- Message is stored in the database.

## ✅ Admin Views Messages

- Admin logs into the Dashboard (/dashboard/messages).
- Admin sees all messages and user details.

## Tech Stack

**Dependencies:** Node, Express, mongoose, dotenv, cors, JWT

**Dependencies:** typescript, ts-node-dev, prettier, eslint-config-prettier, @typescript-eslint/_, @types/_, bcrypt, cookie parser, zod, http-code-status.

## Prerequisites

Ensure you have the following installed:

- Node.js (>=16.x)
- npm or yarn
- MongoDB (running locally or a hosted instance)

## Getting Started

## 1 Clone the Repository

```bash
git clone https://github.com/gopalbasak1/Portfolio-Project-Backend.git
cd Portfolio-Project-Backend
```

## 2 Install Dependencies

```bash
npm install
```

## 3 Environment Setup

Create a .env file in the root directory and configure the following variables:

```bash
(DATABASE_URL) MONGO_URI=<your-mongodb-connection-string>

PORT=<port-number>

BCRYPT_SALT_ROUNDS=8

JWT_ACCESS_SECRET=<your-jwt-access-secret>
JWT_ACCESS_EXPIRES_IN=<your-jwt-access-expires-in>

JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
JWT_REFRESH_EXPIRES_IN=<your-jwt-refresh-expires-in>
```

## 4 Run the Project

- Development: Start the server with hot reloading:

```bash
npm run dev
```

- Production: Build and start the server: Start the server with hot reloading:

```bash
npm run build
npm start:prod
```

## 5 API Endpoints

**1. Authentication**

- . Authentication

  - POST /api/auth/register: Add a a new user.
  - POST /api/auth/login: Authenticates a user with their email and password and generates a JWT token.

  **2. Project Management**

  - POST /api/projects/create-project → Create a new project (Authenticated users).
  - GET /api/projects → Get All project (Authenticated admin).
  - PUT /api/projects/:id → Update own project.
  - DELETE /api/projects/:id → Delete own project

  **3. Blog Management**

  - POST /api/blogs/create-blog → Create a new blog (Authenticated users).
  - GET /api/blogs → GEt All blog (Authenticated admin).
  - PUT /api/blogs/:id → Update own blog.
  - DELETE /api/blogs/:id → Delete own blog.

  **4. Message Management**

  - POST /api/messages/create-message → Create and send new message (Authenticated users).
  - GET /api/message → GET All send message to see admin (Authenticated admin).

````

- Request Header:

```bash
 Authorization: <token>
````

**2. Admin Actions**

- PUT /api/blogs/:blogId: Admin any blog update.
- PUT /api/projects/:projectId: Admin any project update.
- DELETE /api/blogs/:blogId: Admin any blog delete.
- DELETE /api/projects/:projectId: Admin any project delete.
- GET /api/message: Admin get all message to send authenticated users.

- Request Header:

```bash
Authorization: <token>
```

## Common Errors:

- **Validation Errors:** Invalid input data.

- **Authentication Errors:** Invalid credentials or missing tokens.

- **Authorization Errors:** Insufficient permissions.

- **Resource Not Found:** Requested resources do not exist.

- **Internal Server Errors:** Unexpected server issues.

## Scripts

- `npm run dev`: Run the server in development mode with hot reload.
- `npm run build`: Build the project using TypeScript.
- `npm run start:prod`: Run the production build.
- `npm run lint`: Run ESLint for linting TypeScript files.
- `npm run lint:fix`: Automatically fix linting issues.
- `npm run prettier`: Format files using Prettier.
- `npm run prettier:fix`: Fix and format files with Prettier.

## Project Structure

```bash
plaintext

src/
├── controllers/   # Request handlers
├── interfaces/    # TypeScript interfaces
├── models/        # Mongoose schemas
├── routes/        # API route definitions
├── server.ts      # Application entry point

```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.
