# 📅 TaskFlow

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Makefile](https://img.shields.io/badge/Makefile-064F8C?style=flat-square&logo=gnu&logoColor=white)

TaskFlow is a collaborative task management application for managing boards, tasks, members, and permissions.
It helps users manage boards, tasks, members, and permissions in a shared workflow environment.

## 📄 License

TaskFlow is licensed under the terms described in the [LICENSE file](LICENSE).  
Please refer to the LICENSE file for complete license terms.

## ✨ Features

- JWT authentication
- Board management
- Task management
- Board members and roles
- Permission-based access control
- API documentation
- Web interface

## 🛠️ Tech stack

- NestJS
- Next.js
- TypeScript
- DaisyUI
- TailwindCSS
- PostgreSQL
- TypeORM
- Docker / Docker Compose
- Makefile

## 🚀 Getting started

### Build the project

> Do not run development and production on the same PostgreSQL service.

```bash
make build PROFILE=<dev|prod>
```

Example:

```bash
make build PROFILE=dev
```

### Start the project

```bash
make up PROFILE=<dev|prod>
```

Example:

```bash
make up PROFILE=dev
```

### Stop the project

```bash
make down PROFILE=<dev|prod>
```

Example:

```bash
make down PROFILE=dev
```

## ⚙️ Environment

The project supports two profiles:

- `dev` for local development
- `prod` for production

Make sure each profile uses its own PostgreSQL service and environment configuration.

## 📘 Documentation

API documentation is available when the backend is running.

Typical local URL:

```bash
http://localhost:3000/docs
```

Adjust the port or route if your local configuration is different.

## 🎯 Project goal

TaskFlow is designed to support collaborative work through boards, tasks, member roles, and permission-based actions.  
It provides a structured environment for organizing work, assigning responsibilities, and managing access across teams.

## 🔗 Repository

GitHub repository: [TaskFlow](https://github.com/SebastienCozeDev/task-flow-api)
