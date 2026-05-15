# Infor LN — API de Gestão de Pedidos e Estoque

API REST para gerenciamento de pedidos e estoque, desenvolvida com Node.js, Express e Prisma, seguindo padrão de arquitetura em camadas com separação de responsabilidades e autenticação JWT.

## Índice

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
- [Estrutura](#estrutura)
- [API](#api)
- [Banco de Dados](#banco-de-dados)

---

## Visão Geral

Sistema de API REST para gerenciar:

- **Pedidos**: validação, identificação de duplicatas e faturamento
- **Estoque**: consulta e movimentação de produtos
- **Autenticação**: proteção de endpoints via JWT

---

## Requisitos

- Node.js v18+
- npm v9+
- MySQL 8.0+

---

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Atualizar variáveis em .env
# PORT=3000
# DATABASE_URL=mysql://usuario:senha@localhost:3306/infor_proc-sel
# JWT_SECRET=sua_chave_secreta

# Popular dados iniciais
npx prisma db seed
```

---

## Execução

**Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

Servidor disponível em `http://localhost:3000`


---

## Estrutura

```
src/
├── controllers/      # Orquestração de requisições
├── middlewares/      # Autenticação e tratamento de erros
├── models/          # Esquemas de dados
├── repositories/    # Acesso ao banco de dados
├── routes/          # Definição de endpoints
└── services/        # Lógica de negócio

prisma/
├── schema.prisma    # Modelos de banco de dados
└── seed.js          # Dados iniciais
```

### Fluxo de Requisição

```
Request → Routes → Middlewares → Controllers → Services → Repositories → Database
```

---

## API

**Base URL:** `http://localhost:3000`

### POST `/auth/login`

Autenticação e geração de token JWT.

**Request:**
```json
{
  "usuario": "admin",
  "senha": "Infor123"
}
```

**Response (200):**
```json
{
  "sucesso": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiraEm": "1h"
}
```

---

### GET `/pedidos/validar`

Retorna pedidos válidos para faturamento (status APROVADO ou PENDENTE).

**Response (200):**
```json
{
  "sucesso": true,
  "data": {
    "totalValidos": 3,
    "totalInvalidos": 3,
    "validos": [
      {
        "id": 1001,
        "valorTotal": 350,
        "status": "APROVADO",
        "criadoEm": "2025-05-14T02:50:20Z"
      }
    ],
    "invalidos": []
  }
}
```

---

### POST `/pedidos/duplicatas`

Identifica IDs de pedidos duplicados.

**Request:**
```json
{
  "ids": [1001, 1002, 1003, 1002, 1005, 1001]
}
```

**Response (200):**
```json
{
  "sucesso": true,
  "data": {
    "duplicados": [1001, 1002],
    "unicos": [1003, 1005]
  }
}
```

---

### GET `/estoque`

Lista produtos com quantidades em estoque.

**Response (200):**
```json
{
  "sucesso": true,
  "data": [
    {
      "id": 1,
      "nome": "Monitor 24\"",
      "estoqueAtual": 10,
      "quantidadeMinima": 3,
      "abaixoDoMinimo": false
    }
  ]
}
```

---

### POST `/estoque/vender`

Realiza venda de produto (reduz estoque). **Requer autenticação.**

**Request:**
```json
{
  "produtoId": 1,
  "quantidade": 8
}
```

**Response (200):**
```json
{
  "sucesso": true,
  "alerta": "⚠ Estoque de \"Monitor 24\" abaixo do mínimo!",
  "data": {
    "id": 1,
    "nome": "Monitor 24\"",
    "estoqueAtual": 2,
    "quantidadeMinima": 3
  }
}
```

**Response (400):**
```json
{
  "sucesso": false,
  "mensagem": "Estoque insuficiente. Disponível: 2, Solicitado: 7"
}
```

**Headers requeridos:**
```
Authorization: Bearer <token>
```

---

## Banco de Dados

### Modelo Entidade-Relacionamento

```
Cliente (1) ─── (N) Pedido (1) ─── (N) ItensPedido
```

### Tabela: `clientes`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT (PK) | Identificador único |
| `nome` | VARCHAR(100) | Nome do cliente |

### Tabela: `pedidos`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT (PK) | Identificador único |
| `cliente_id` | INT (FK) | Referência ao cliente |
| `valor` | DECIMAL(10,2) | Valor total do pedido |
| `data` | DATE | Data do pedido |

### Tabela: `itens_pedido`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT (PK) | Identificador único |
| `pedido_id` | INT (FK) | Referência ao pedido |
| `produto` | VARCHAR(100) | Nome/descrição do produto |
| `quantidade` | INT | Quantidade do item |

### Tabela: `produtos`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT (PK) | Identificador único |
| `descricao` | VARCHAR(100) | Descrição do produto |
| `preco` | DECIMAL(10,2) | Preço unitário |
| `ativo` | TINYINT(1) | Status ativo/inativo |

---

## Padrões e Arquitetura

- **MVC em Camadas**: Separação clara entre apresentação, lógica de negócio e acesso a dados
- **Repository Pattern**: Abstração de operações de banco de dados
- **JWT Bearer**: Autenticação stateless de endpoints protegidos
- **Middleware Centralizado**: Tratamento de erros e validações transversais
- **Prisma ORM**: Type-safety e migrations automáticas
- **Relacionamentos**: Integridade referencial com Foreign Keys

---

## Licença

ISC
