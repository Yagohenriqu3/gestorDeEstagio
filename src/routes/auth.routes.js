import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient({})

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production'
const TOKEN_EXPIRY = '1h' // Token expira em 1 hora
const REFRESH_TOKEN_EXPIRY = '7d' // Refresh token expira em 7 dias

// ============================================
// POST - Login
// ============================================
router.post('/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body

    // Validações básicas
    if (!email || !senha) {
      return res.status(400).json({
        sucesso: false,
        erro: 'Email e senha são obrigatórios',
      })
    }

    // Buscar usuário no banco
    const usuario = await prisma.Usuario.findUnique({
      where: { email },
      select: {
        idUsuario: true,
        nomeCompleto: true,
        email: true,
        senhaHash: true,
        tipoUsuario: true,
        status: true,
        fotoPerfil: true,
        primeiroAcesso: true,
        ultimoAcesso: true,
      },
    })

    // Usuário não encontrado
    if (!usuario) {
      return res.status(401).json({
        sucesso: false,
        erro: 'Email ou senha inválidos',
      })
    }

    // Usuário inativo
    if (usuario.status !== 'Ativo') {
      return res.status(401).json({
        sucesso: false,
        erro: 'Usuário inativo. Entre em contato com o administrador.',
      })
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash)

    if (!senhaValida) {
      return res.status(401).json({
        sucesso: false,
        erro: 'Email ou senha inválidos',
      })
    }

    // Gerar tokens
    const token = jwt.sign(
      {
        idUsuario: usuario.idUsuario,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario,
        nomeCompleto: usuario.nomeCompleto,
      },
      SECRET_KEY,
      { expiresIn: TOKEN_EXPIRY }
    )

    const refreshToken = jwt.sign(
      {
        idUsuario: usuario.idUsuario,
        email: usuario.email,
      },
      REFRESH_SECRET_KEY,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    )

    // Atualizar último acesso
    await prisma.Usuario.update({
      where: { idUsuario: usuario.idUsuario },
      data: { ultimoAcesso: new Date() },
    })

    // Retornar resposta
    res.json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso!',
      token,
      refreshToken,
      usuario: {
        idUsuario: usuario.idUsuario,
        nomeCompleto: usuario.nomeCompleto,
        email: usuario.email,
        tipoUsuario: usuario.tipoUsuario,
        fotoPerfil: usuario.fotoPerfil,
        primeiroAcesso: usuario.primeiroAcesso,
      },
    })
  } catch (erro) {
    console.error('Erro ao fazer login:', erro)
    res.status(500).json({ erro: 'Erro ao fazer login' })
  }
})

// ============================================
// POST - Refresh Token
// ============================================
router.post('/auth/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({
        sucesso: false,
        erro: 'Refresh token não fornecido',
      })
    }

    // Verificar refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY)

    // Gerar novo token
    const novoToken = jwt.sign(
      {
        idUsuario: decoded.idUsuario,
        email: decoded.email,
      },
      SECRET_KEY,
      { expiresIn: TOKEN_EXPIRY }
    )

    res.json({
      sucesso: true,
      token: novoToken,
    })
  } catch (erro) {
    console.error('Erro ao renovar token:', erro)
    res.status(401).json({
      sucesso: false,
      erro: 'Refresh token inválido ou expirado',
    })
  }
})

// ============================================
// GET - Validar Token (opcional, para debug)
// ============================================
router.get('/auth/me', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ erro: 'Token não fornecido' })
    }

    const usuario = jwt.verify(token, SECRET_KEY)

    res.json({
      sucesso: true,
      usuario,
    })
  } catch (erro) {
    console.error('Erro ao validar token:', erro)
    res.status(401).json({
      sucesso: false,
      erro: 'Token inválido ou expirado',
    })
  }
})

export default router
