import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Reload trigger - 28/01/2026 - MySQL auth plugin fix
dotenv.config()

const app = express()

// ======================
// Middlewares globais
// ======================
app.use(cors({
  origin: '*', // depois troque pelo domínio do front
}))
app.use(express.json())

// ======================
// Rotas
// ======================
import healthRoutes from './routes/health.routes.js'
import authRoutes from './routes/auth.routes.js'
import instituicoesRoutes from './routes/instituicoes.routes.js'

app.use('/api', healthRoutes)
app.use('/api', authRoutes)
app.use('/api', instituicoesRoutes)

// ======================
// Porta dinâmica (HostGator)
// ======================
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`)
})