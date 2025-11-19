# 🏗️ Clean Architecture Solution (.NET 8 + PostgreSQL + Identity + JWT)

Includes Clean Architecture, CQRS, EF Core, PostgreSQL, JWT and Swagger.

## 📂 Structure
- Domain
- Application
- Infrastructure
- WebAPI

## 🚀 Run
```bash
dotnet restore
dotnet ef migrations add InitialCreate --project src/Infrastructure --startup-project src/WebAPI
dotnet ef database update --project src/Infrastructure --startup-project src/WebAPI
dotnet run --project src/WebAPI
```

## 🖼️ Diagrams

### Architecture
```mermaid
flowchart TD
    A[Domain] --> B[Application]
    B --> C[Infrastructure]
    B --> D[WebAPI]
    C --> D
```

### JWT Auth
```mermaid
sequenceDiagram
    participant U as User
    participant A as API
    U->>A: Login
    A-->>U: JWT Token
    U->>A: Request with Token
    A-->>U: Response
```

### CRUD
```mermaid
sequenceDiagram
    U->>API: POST /api/products
    API->>DB: INSERT
    DB-->>API: OK
    API-->>U: 201 Created
```
