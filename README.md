# Petshop — Projeto Final Web Back-End

Sistema de gerenciamento para petshop com API REST em ASP.NET Core e frontend em Angular.

---

## Tecnologias

**Backend**
- .NET 10 / ASP.NET Core Web API
- Entity Framework Core 10 + SQL Server
- Autenticação JWT (Bearer Token)
- OpenAPI (Swagger)

**Frontend**
- Angular 22 (standalone components, signals API)
- Angular Material 22
- HttpClient com interceptor JWT

---

## Estrutura do projeto

```
projetoFinal_WebBackEnd/
├── Controllers/
│   ├── AuthController.cs
│   ├── AnimaisController.cs
│   ├── ClientesController.cs
│   ├── ServicosController.cs
│   └── AgendamentosController.cs
├── Data/
│   └── AppDbContext.cs
├── DTO/
│   └── LoginRequest.cs
├── Models/
│   ├── Animal.cs
│   ├── Cliente.cs
│   ├── Servico.cs
│   └── Agendamento.cs
├── Program.cs
├── appsettings.json
└── frontend/
    └── src/app/
        ├── animais/         # Listagem, Novo, Detalhe
        ├── clientes/        # Listagem, Novo, Detalhe
        ├── servicos/        # Listagem, Novo, Detalhe
        ├── agendamentos/    # Listagem, Novo, Detalhe
        ├── services/        # AnimaisService, ClientesService, ServicosService, AgendamentosService
        ├── usuarios-login/
        ├── auth-service.ts
        ├── auth-interceptor.ts
        ├── auth-guard-guard.ts
        └── app.routes.ts
```

---

## Banco de dados

Nome do banco: **petshop**

### Tabelas

| Tabela | Campos principais |
|---|---|
| `Clientes` | Id, Nome, Telefone, Email |
| `Animais` | Id, Nome, Especie, Raca, Idade, ClienteId (FK) |
| `Servicos` | Id, Nome, Descricao, Preco |
| `Agendamentos` | Id, DataHora, Observacoes, AnimalId (FK), ServicoId (FK) |

---

## Como rodar

### Pré-requisitos

- .NET 10 SDK
- SQL Server (local ou Docker)
- Node.js + npm
- Angular CLI 22

### Backend

1. Ajuste a connection string em `appsettings.json` se necessário:
   ```json
   "DefaultConnection": "Server=localhost;Database=petshop;User Id=sa;Password=sysdba;TrustServerCertificate=True;"
   ```

2. Crie o banco e aplique as migrations:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

3. Inicie a API:
   ```bash
   dotnet run
   ```
   A API sobe em `http://localhost:5288`.

### Frontend

```bash
cd frontend
npm install
ng serve
```
O frontend sobe em `http://localhost:4200`.

---

## Autenticação

A API usa JWT. Todas as rotas (exceto `/api/auth/login`) exigem o token no header.

**Credenciais padrão:**
- Usuário: `admin`
- Senha: `123456`

**Fluxo:**
1. `POST /api/auth/login` → recebe o token
2. Enviar o token em todas as requisições: `Authorization: Bearer <token>`

---

## Endpoints da API

### Auth
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/login` | Realiza login e retorna o token JWT |

### Clientes
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/clientes` | Lista todos os clientes |
| GET | `/api/clientes/{id}` | Busca cliente por ID |
| POST | `/api/clientes` | Cadastra novo cliente |
| PUT | `/api/clientes/{id}` | Atualiza cliente |
| DELETE | `/api/clientes/{id}` | Remove cliente |

### Animais
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/animais` | Lista todos os animais |
| GET | `/api/animais/{id}` | Busca animal por ID |
| POST | `/api/animais` | Cadastra novo animal |
| PUT | `/api/animais/{id}` | Atualiza animal |
| DELETE | `/api/animais/{id}` | Remove animal |

### Serviços
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/servicos` | Lista todos os serviços |
| GET | `/api/servicos/{id}` | Busca serviço por ID |
| POST | `/api/servicos` | Cadastra novo serviço |
| PUT | `/api/servicos/{id}` | Atualiza serviço |
| DELETE | `/api/servicos/{id}` | Remove serviço |

### Agendamentos
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/agendamentos` | Lista todos os agendamentos |
| GET | `/api/agendamentos/{id}` | Busca agendamento por ID |
| POST | `/api/agendamentos` | Cria novo agendamento |
| PUT | `/api/agendamentos/{id}` | Atualiza agendamento |
| DELETE | `/api/agendamentos/{id}` | Remove agendamento |

---

## Testando a API

O arquivo `projetoFinal_WebBackEnd.http` na raiz do projeto contém exemplos prontos de todas as requisições. Basta abrir no VS Code com a extensão REST Client ou no Kiro IDE.

**Passo a passo:**
1. Execute o request de login para obter o token
2. Copie o token retornado
3. Substitua `SEU_TOKEN_AQUI` no topo do arquivo
4. Execute os demais requests normalmente
