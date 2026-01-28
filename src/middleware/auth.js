import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' })
  }

  try {
    const usuario = jwt.verify(token, SECRET_KEY)
    req.usuario = usuario
    next()
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido' })
  }
}

export const validarAdmin = (req, res, next) => {
  if (req.usuario?.tipo_usuario !== 'Administrador') {
    return res.status(403).json({ 
      erro: 'Acesso negado. Apenas administradores podem acessar este recurso.' 
    })
  }
  next()
}
