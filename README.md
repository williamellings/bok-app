# BokApp

En fullstack CRUD-applikation byggd som tekniskt test för en praktikansökan. Applikationen hanterar böcker och personliga citat, med JWT-baserad autentisering och en responsiv Angular-frontend.

## Funktioner

- 🔐 Registrering och inloggning med JWT-autentisering
- 📚 Full CRUD för böcker (skapa, läsa, uppdatera, radera)
- 💬 "Mina citat" – personliga citat kopplade till inloggad användare
- 🌗 Dark mode med sparat val i localStorage
- 📱 Responsiv design med Bootstrap 5 och Font Awesome-ikoner

## Tech stack

**Backend**
- .NET 9 / ASP.NET Core Web API
- Entity Framework Core + SQL Server
- JWT Bearer-autentisering
- BCrypt för lösenordshashning
- Swagger/OpenAPI

**Frontend**
- Angular 20 (standalone components, signals)
- Reactive Forms
- Bootstrap 5 + Font Awesome
- RxJS

## Kom igång lokalt

### Backend (BokApi)

```bash
cd BokApi
dotnet ef database update
dotnet run --launch-profile https
```

API:et körs på `https://localhost:7095`, Swagger på `https://localhost:7095/swagger`.

### Frontend (bok-app)

```bash
cd bok-app
npm install
ng serve
```

Öppna `http://localhost:4200` i webbläsaren. Se till att backend körs samtidigt.

## Projektstruktur
