# LogiRoute

O LogiRoute é um sistema de gestão logística voltado ao controle de frotas e à triagem de encomendas de uma operação de transporte de pequeno/médio porte. O sistema permite que um operador logístico cadastre motoristas e seus veículos, cadastre encomendas com peso e dimensões, e inicie o despacho de uma entrega associando um motorista disponível a uma encomenda pendente.

## Estrutura do projeto

```
logiroute/
--logiroute-back/    # API REST (Node.js, Express, Prisma, PostgreSQL)
--logiroute-front/   # Aplicação web (React, TypeScript, Vite, Tailwind)
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
- [PostgreSQL](https://www.postgresql.org/) em execução (local ou remoto)
- Git
- Prisma ORM v5 (instalado automaticamente via `npm install`, já fixado no `package.json` do backend)

## 1. Clonando o repositório

```bash
git clone https://github.com/iscaio/logiroute.git
cd logiroute
```

## 2. Configurando o backend (`logiroute-back`)

### 2.1. Instalar dependências

```bash
cd logiroute-back
npm install
```

### 2.2. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro de `logiroute-back` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/logiroute?schema=public"
JWT_SECRET="uma_chave_secreta_forte_aqui"
PORT=3000
```

Ajuste `usuario`, `senha`, host e nome do banco conforme o seu ambiente PostgreSQL.

### 2.3. Rodar as migrations do Prisma

Isso cria as tabelas no banco de dados a partir do `schema.prisma`:

```bash
npx prisma migrate deploy
```

> Em ambiente de desenvolvimento, você também pode usar `npx prisma migrate dev` para aplicar migrations e gerar o client automaticamente.

Se precisar gerar o Prisma Client manualmente:

```bash
npx prisma generate
```

### 2.4. (Opcional) Popular o banco com dados iniciais

O projeto possui um script de seed (`prisma/seed.js`):

```bash
node prisma/seed.js
```

### 2.5. Iniciar o servidor

```bash
npm run dev
```

A API deverá subir em `http://localhost:3000` (ou na porta definida em `PORT`).

## 3. Configurando o frontend (`logiroute-front`)

### 3.1. Instalar dependências

Em outro terminal, a partir da raiz do projeto:

```bash
cd logiroute-front
npm install
```

### 3.2. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro de `logiroute-front` apontando para a API (ajuste se o backend estiver em outra porta/host):

```env
VITE_AUTH_API_URL=http://localhost:3000
VITE_LOGISTICS_API_URL=http://localhost:3000
```

> Essas variáveis são opcionais — se não forem definidas, o frontend usa `http://localhost:3000` como padrão.

### 3.3. Iniciar a aplicação

```bash
npm run dev
```

Por padrão o Vite sobe em `http://localhost:5173`.

### 3.4. Build de produção (opcional)

```bash
npm run build
npm run preview
```

## Resumo

```bash
# Backend
cd logiroute-back
npm install
# configurar .env (DATABASE_URL, JWT_SECRET, PORT)
npx prisma migrate deploy
npm run dev

# Frontend (em outro terminal)
cd logiroute-front
npm install
# configurar .env (VITE_AUTH_API_URL, VITE_LOGISTICS_API_URL)
npm run dev
```

## Tecnologias utilizadas

**Backend:** Node.js, Express, Prisma ORM (v5), PostgreSQL, JWT (jsonwebtoken), bcrypt, cors

**Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router, Axios

## Projeto para disciplina da faculdade.
