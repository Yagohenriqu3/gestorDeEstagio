# Backend - Sistema de Gestão de Estágios

Backend Node.js com Express, Prisma ORM e autenticação JWT.

## 🚀 Tecnologias

- **Node.js** v18+
- **Express.js** - Framework web
- **Prisma** v6.19.2 - ORM para MySQL
- **MySQL** 8.0 - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **CORS** - Habilitar requisições do frontend

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais
```

## ⚙️ Variáveis de Ambiente (.env)

```env
DATABASE_URL="mysql://user:password@host:3306/database?authPlugin=mysql_native_password&allowPublicKeyRetrieval=true"
JWT_SECRET="sua_chave_secreta_aqui"
JWT_REFRESH_SECRET="sua_chave_refresh_aqui"
PORT=3000
```

## 🗄️ Banco de Dados

```bash
# Gerar Prisma Client
npx prisma generate

# Sincronizar schema com banco
npx prisma db push

# Criar usuários de teste
npm run seed
```

## 🎯 Usuários de Teste

Após rodar `npm run seed`:

| Email | Senha | Tipo |
|-------|-------|------|
| admin@conexta.com.br | Admin@123 | Administrador |
| joao.silva@conexta.com.br | Aluno@123 | Aluno |
| maria.santos@conexta.com.br | Coord@123 | Coordenador |
| carlos.costa@conexta.com.br | Gestor@123 | Docente |
| ana.oliveira@conexta.com.br | Precep@123 | Preceptor |

## 🏃 Executar

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📡 Endpoints

### Autenticação
- `POST /api/auth/login` - Login com email/senha
- `POST /api/auth/refresh` - Renovar token
- `GET /api/auth/me` - Dados do usuário autenticado

### Instituições
- `GET /api/instituicoes` - Listar todas
- `POST /api/instituicoes` - Criar (requer admin)
- `GET /api/instituicoes/:id` - Buscar por ID
- `PUT /api/instituicoes/:id` - Atualizar (requer admin)
- `DELETE /api/instituicoes/:id` - Deletar (requer admin)

## 🔐 Autenticação

Todas as rotas (exceto `/auth/login`) requerem token JWT no header:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

## 📊 Estrutura do Banco

24 modelos principais:
- Usuario, Instituicao, Unidade, Curso, Curriculo
- LocalEstagio, Vaga, Convenio, Semestre
- Matricula, Rodizio, ComponenteCurricular
- Preceptor, Aluno, DisponibilidadePreceptor
- Frequencia, Avaliacao, Documento, Notificacao
- AuditLog, ConfiguracaoSistema, etc.

## 🚀 Deploy no Railway

1. Criar conta em https://railway.app
2. Conectar repositório GitHub
3. Adicionar variáveis de ambiente no painel
4. Deploy automático a cada push!

## 📝 Licença

MIT
