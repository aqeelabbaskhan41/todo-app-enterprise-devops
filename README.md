# Todo App — Enterprise Azure CI/CD

A full-stack Todo application built with React, Node.js/Express, PostgreSQL (Prisma ORM), containerized with Docker, and deployed via Azure DevOps CI/CD pipelines.

## Tech Stack

| Layer | Technology | Azure Service |
|---|---|---|
| Frontend | React 18, Redux, Bootstrap 5 | Azure Static Web App |
| Backend | Node.js 18, Express, Prisma ORM | Azure App Service (Container) |
| Database | PostgreSQL | Azure SQL / PostgreSQL |
| Container Registry | Docker | Azure Container Registry |
| CI/CD | YAML Pipelines | Azure DevOps |
| Source Control | Git Flow | Azure Repos / GitHub |

## Project Structure

```
todo-app/
├── backend/                  # Express + Prisma + PostgreSQL
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── lib/
│   │   └── prisma.js
│   ├── index.js
│   ├── Dockerfile
│   └── package.json
├── frontend/                 # React SPA
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Git Flow Branching Strategy

```
main          ← production-ready, protected
develop       ← integration branch
feature/*     ← feature development
release/*     ← release preparation
```

## Local Development (without Docker)

```bash
# Backend
cd backend
npm install
npm run dev          # http://localhost:8080

# Frontend
cd frontend
npm install
npm start            # http://localhost:3000
```

## Local Development (with Docker)

```bash
# Build images
docker build -t todo-backend ./backend
docker build --build-arg REACT_APP_API_BASE_URL=http://localhost:8081/api -t todo-frontend ./frontend

# Run containers
docker run -d --name todo-backend -p 8081:8080 \
  -e DATABASE_URL="postgresql://postgres:PASSWORD@host.docker.internal:5432/todoapp?schema=public" \
  -e TOKEN_KEY="your_secret" \
  -e PORT=8080 todo-backend

docker run -d --name todo-frontend -p 3000:80 todo-frontend
```

## Environment Variables

### Backend (`backend/.env`)
```
TOKEN_KEY=your_jwt_secret
DATABASE_URL=postgresql://user:password@localhost:5432/todoapp?schema=public
PORT=8080
```

### Frontend (`frontend/.env`)
```
PORT=3000
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/users/register` | Register user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/todos` | Get all todos | Yes |
| POST | `/api/todos` | Create todo | Yes |
| PUT | `/api/todos/:id` | Update todo | Yes |
| DELETE | `/api/todos/:id` | Delete todo | Yes |
| DELETE | `/api/todos/delete/all` | Delete all todos | Yes |
| GET | `/api/health` | Health check | No |

## Live URLs

> Fill in after Azure deployment

| Service | URL |
|---|---|
| Frontend | `https://<static-web-app>.azurestaticapps.net` |
| Backend API | `https://<app-service>.azurewebsites.net/api` |
| Health Check | `https://<app-service>.azurewebsites.net/api/health` |
