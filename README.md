# 📅 TaskFlow API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Makefile](https://img.shields.io/badge/Makefile-064F8C?style=flat-square&logo=gnu&logoColor=white)

TaskFlow API is a REST API for collaborative task and board management.  
It helps users manage boards, tasks, members, and permissions in a shared workflow environment.

## 📄 License

TaskFlow API is licensed under the terms described in the [LICENSE file](LICENSE).  
Please refer to the LICENSE file for complete license terms.

## ✨ Features

- JWT authentication
- Board management
- Task management
- Board members and roles
- Permission-based access control
- Swagger API documentation

## 🛠️ Tech stack

- NestJS
- TypeScript
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

## 📘 API documentation

Swagger documentation is available when the application is running.

Typical local URL:

```bash
http://localhost:3000/docs
```

Adjust the port or route if your local configuration is different.

## 🎯 Project goal

TaskFlow API provides the backend for a collaborative task manager.  
It is designed to support boards, task assignment, member roles, and permission-based actions in a clean REST architecture.

## 🔗 Repository

GitHub repository: [TaskFlow API](https://github.com/SebastienCozeDev/task-flow-api)
