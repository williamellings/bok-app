# BokApp

A fullstack CRUD application built as a technical test for an internship application. The app manages books and personal quotes, with JWT-based authentication and a responsive Angular frontend.

## Features

- 🔐 Registration and login with JWT authentication
- 📚 Full CRUD for books (create, read, update, delete)
- 💬 "My Quotes" – personal quotes linked to the logged-in user
- 🌗 Dark mode with saved preference in localStorage
- 📱 Responsive design with Bootstrap 5 and Font Awesome icons

## Tech stack

**Backend**
- .NET 9 / ASP.NET Core Web API
- Entity Framework Core + SQL Server
- JWT Bearer authentication
- BCrypt for password hashing
- Swagger/OpenAPI

**Frontend**
- Angular 20 (standalone components, signals)
- Reactive Forms
- Bootstrap 5 + Font Awesome
- RxJS

## Getting started locally

### Backend (BokApi)

```bash
cd BokApi
dotnet ef database update
dotnet run --launch-profile https
```

The API runs on `https://localhost:7095`, Swagger on `https://localhost:7095/swagger`.

### Frontend (bok-app)

```bash
cd bok-app
npm install
ng serve
```

Open `http://localhost:4200` in your browser. Make sure the backend is running at the same time.

## Project structure

## Links

- 🌐 Live demo:
- 🔧 Backend repo: [bok-api](https://github.com/williamellings/bok-api)
- 🎨 Frontend repo (this repo)
