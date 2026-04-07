# Sistema Tech Forge - Full Stack TypeScript

Projeto full stack em TypeScript com backend em Express + Prisma + SQLite e frontend em React + Vite.

## O que foi incluído

- Autenticação com JWT
- Cadastro, login e edição do próprio usuário
- Senha com hash no banco
- Validação de CPF, e-mail e força de senha
- 3 CRUDs completos autenticados:
  - Categorias
  - Produtos
  - Pedidos
- Relacionamentos:
  - Produto pertence a Categoria
  - Pedido pertence a Usuário e Produto
- Paginação nas listagens
- Frontend com:
  - Login
  - Cadastro
  - Edição de perfil
  - Context global do usuário
  - Telas separadas para listagem e cadastro/edição
  - Componentes reutilizáveis
- Testes de exemplo no backend

## Estrutura

- `backend/` API REST
- `frontend/` aplicação React

## Como rodar

### Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```

Servidor padrão: `http://localhost:3333`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação padrão: `http://localhost:5173`

## Credenciais e fluxo

1. Cadastre um usuário
2. Faça login
3. Cadastre categorias
4. Cadastre produtos vinculados a categorias
5. Cadastre pedidos vinculados a produtos

## Observações

- Projeto pensado para atender aos requisitos do PDF enviado.
- Os testes estão como base inicial e podem ser expandidos conforme a banca exigir.
- O visual está limpo, moderno e pronto para evolução.
