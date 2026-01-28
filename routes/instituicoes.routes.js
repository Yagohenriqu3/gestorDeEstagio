import express from 'express'
import { PrismaClient } from '@prisma/client'
import { autenticar, validarAdmin } from '../middleware/auth.js'

const router = express.Router()
const prisma = new PrismaClient({})

// ============================================
// Validações
// ============================================
const validarCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, '')

  if (cnpj.length !== 14) return false
  if (/^(\d)\1+$/.test(cnpj)) return false

  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  let digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado != digitos.charAt(0)) return false

  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado != digitos.charAt(1)) return false

  return true
}

const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const validarURL = (url) => {
  if (!url) return true
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// ============================================
// GET - Listar todas as instituições
// ============================================
router.get('/instituicoes', autenticar, async (req, res) => {
  try {
    const instituicoes = await prisma.InstituicaoEnsino.findMany({
      select: {
        idInstituicao: true,
        nomeInstituicao: true,
        cnpj: true,
        tipoInstituicao: true,
        mantenedora: true,
        codigoMec: true,
        site: true,
        telefone: true,
        emailContato: true,
        status: true,
        dataCadastro: true,
      },
      orderBy: {
        dataCadastro: 'desc',
      },
    })

    res.json({
      sucesso: true,
      dados: instituicoes,
      total: instituicoes.length,
    })
  } catch (erro) {
    console.error('Erro ao listar instituições:', erro)
    res.status(500).json({ erro: 'Erro ao listar instituições' })
  }
})

// ============================================
// GET - Buscar instituição por ID
// ============================================
router.get('/instituicoes/:id', autenticar, async (req, res) => {
  try {
    const { id } = req.params

    const instituicao = await prisma.InstituicaoEnsino.findUnique({
      where: { idInstituicao: parseInt(id) },
      select: {
        idInstituicao: true,
        nomeInstituicao: true,
        cnpj: true,
        tipoInstituicao: true,
        mantenedora: true,
        codigoMec: true,
        site: true,
        telefone: true,
        emailContato: true,
        status: true,
        dataCadastro: true,
      },
    })

    if (!instituicao) {
      return res.status(404).json({ erro: 'Instituição não encontrada' })
    }

    res.json({
      sucesso: true,
      dados: instituicao,
    })
  } catch (erro) {
    console.error('Erro ao buscar instituição:', erro)
    res.status(500).json({ erro: 'Erro ao buscar instituição' })
  }
})

// ============================================
// POST - Criar nova instituição
// ============================================
router.post('/instituicoes', autenticar, validarAdmin, async (req, res) => {
  try {
    const {
      nomeInstituicao,
      cnpj,
      tipoInstituicao,
      mantenedora,
      codigoMec,
      site,
      telefone,
      emailContato,
      status,
    } = req.body

    // ============ Validações ============
    const erros = {}

    if (!nomeInstituicao || nomeInstituicao.trim().length < 3) {
      erros.nomeInstituicao = 'Nome deve ter no mínimo 3 caracteres'
    }

    if (!cnpj || !validarCNPJ(cnpj)) {
      erros.cnpj = 'CNPJ inválido'
    } else {
      // Verificar se CNPJ já existe
      const cnpjLimpo = cnpj.replace(/\D/g, '')
      const cnpjExistente = await prisma.InstituicaoEnsino.findUnique({
        where: { cnpj: cnpjLimpo },
      })
      if (cnpjExistente) {
        erros.cnpj = 'CNPJ já cadastrado'
      }
    }

    if (!tipoInstituicao || !['Pública', 'Privada'].includes(tipoInstituicao)) {
      erros.tipoInstituicao = 'Tipo de instituição inválido'
    }

    if (!mantenedora || mantenedora.trim().length < 3) {
      erros.mantenedora = 'Mantenedora deve ter no mínimo 3 caracteres'
    }

    if (!codigoMec || codigoMec.trim().length < 1) {
      erros.codigoMec = 'Código e-MEC é obrigatório'
    }

    if (site && !validarURL(site)) {
      erros.site = 'URL inválida'
    }

    if (!telefone || telefone.replace(/\D/g, '').length < 10) {
      erros.telefone = 'Telefone inválido'
    }

    if (!emailContato || !validarEmail(emailContato)) {
      erros.emailContato = 'E-mail inválido'
    }

    if (!status || !['Ativa', 'Inativa'].includes(status)) {
      erros.status = 'Status inválido'
    }

    if (Object.keys(erros).length > 0) {
      return res.status(400).json({
        sucesso: false,
        erros,
      })
    }

    // ============ Criar instituição ============
    const novaInstituicao = await prisma.InstituicaoEnsino.create({
      data: {
        nomeInstituicao,
        cnpj: cnpj.replace(/\D/g, ''),
        tipoInstituicao,
        mantenedora,
        codigoMec,
        site: site || null,
        telefone: telefone.replace(/\D/g, ''),
        emailContato,
        status,
        dataCadastro: new Date(),
      },
      select: {
        idInstituicao: true,
        nomeInstituicao: true,
        cnpj: true,
        tipoInstituicao: true,
        mantenedora: true,
        codigoMec: true,
        site: true,
        telefone: true,
        emailContato: true,
        status: true,
        dataCadastro: true,
      },
    })

    res.status(201).json({
      sucesso: true,
      mensagem: 'Instituição cadastrada com sucesso!',
      dados: novaInstituicao,
    })
  } catch (erro) {
    console.error('Erro ao criar instituição:', erro)
    res.status(500).json({ erro: 'Erro ao criar instituição' })
  }
})

// ============================================
// PUT - Atualizar instituição
// ============================================
router.put('/instituicoes/:id', autenticar, validarAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const {
      nomeInstituicao,
      tipoInstituicao,
      mantenedora,
      codigoMec,
      site,
      telefone,
      emailContato,
      status,
    } = req.body

    // ============ Validações ============
    const erros = {}

    if (!nomeInstituicao || nomeInstituicao.trim().length < 3) {
      erros.nomeInstituicao = 'Nome deve ter no mínimo 3 caracteres'
    }

    if (tipoInstituicao && !['Pública', 'Privada'].includes(tipoInstituicao)) {
      erros.tipoInstituicao = 'Tipo de instituição inválido'
    }

    if (!mantenedora || mantenedora.trim().length < 3) {
      erros.mantenedora = 'Mantenedora deve ter no mínimo 3 caracteres'
    }

    if (site && !validarURL(site)) {
      erros.site = 'URL inválida'
    }

    if (telefone && telefone.replace(/\D/g, '').length < 10) {
      erros.telefone = 'Telefone inválido'
    }

    if (emailContato && !validarEmail(emailContato)) {
      erros.emailContato = 'E-mail inválido'
    }

    if (status && !['Ativa', 'Inativa'].includes(status)) {
      erros.status = 'Status inválido'
    }

    if (Object.keys(erros).length > 0) {
      return res.status(400).json({
        sucesso: false,
        erros,
      })
    }

    // ============ Verificar se existe ============
    const instituicaoExistente = await prisma.InstituicaoEnsino.findUnique({
      where: { idInstituicao: parseInt(id) },
    })

    if (!instituicaoExistente) {
      return res.status(404).json({ erro: 'Instituição não encontrada' })
    }

    // ============ Atualizar ============
    const instituicaoAtualizada = await prisma.InstituicaoEnsino.update({
      where: { idInstituicao: parseInt(id) },
      data: {
        nomeInstituicao,
        tipoInstituicao,
        mantenedora,
        codigoMec,
        site: site || null,
        telefone: telefone.replace(/\D/g, ''),
        emailContato,
        status,
      },
      select: {
        idInstituicao: true,
        nomeInstituicao: true,
        cnpj: true,
        tipoInstituicao: true,
        mantenedora: true,
        codigoMec: true,
        site: true,
        telefone: true,
        emailContato: true,
        status: true,
        dataCadastro: true,
      },
    })

    res.json({
      sucesso: true,
      mensagem: 'Instituição atualizada com sucesso!',
      dados: instituicaoAtualizada,
    })
  } catch (erro) {
    console.error('Erro ao atualizar instituição:', erro)
    res.status(500).json({ erro: 'Erro ao atualizar instituição' })
  }
})

// ============================================
// DELETE - Deletar instituição
// ============================================
router.delete('/instituicoes/:id', autenticar, validarAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const instituicaoExistente = await prisma.InstituicaoEnsino.findUnique({
      where: { idInstituicao: parseInt(id) },
    })

    if (!instituicaoExistente) {
      return res.status(404).json({ erro: 'Instituição não encontrada' })
    }

    await prisma.InstituicaoEnsino.delete({
      where: { idInstituicao: parseInt(id) },
    })

    res.json({
      sucesso: true,
      mensagem: 'Instituição deletada com sucesso!',
    })
  } catch (erro) {
    console.error('Erro ao deletar instituição:', erro)
    if (erro.code === 'P2003') {
      return res.status(400).json({
        erro: 'Não é possível deletar esta instituição. Existem registros relacionados.',
      })
    }
    res.status(500).json({ erro: 'Erro ao deletar instituição' })
  }
})

export default router
