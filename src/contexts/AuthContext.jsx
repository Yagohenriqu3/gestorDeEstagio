import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [token, setToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

  // Carregar token do localStorage ao inicializar
  useEffect(() => {
    const tokenArmazenado = localStorage.getItem('token')
    const usuarioArmazenado = localStorage.getItem('usuario')
    const refreshTokenArmazenado = localStorage.getItem('refreshToken')

    if (tokenArmazenado && usuarioArmazenado) {
      try {
        setToken(tokenArmazenado)
        setUsuario(JSON.parse(usuarioArmazenado))
        setRefreshToken(refreshTokenArmazenado)
      } catch (erro) {
        console.error('Erro ao carregar dados do localStorage:', erro)
        logout()
      }
    }

    setCarregando(false)
  }, [])

  // Função de login
  const login = async (email, senha) => {
    try {
      setCarregando(true)
      setErro(null)

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      })

      const dados = await response.json()

      if (!response.ok) {
        throw new Error(dados.erro || 'Erro ao fazer login')
      }

      // Armazenar token e usuário
      localStorage.setItem('token', dados.token)
      localStorage.setItem('usuario', JSON.stringify(dados.usuario))
      localStorage.setItem('refreshToken', dados.refreshToken)

      setToken(dados.token)
      setUsuario(dados.usuario)
      setRefreshToken(dados.refreshToken)

      return { sucesso: true, usuario: dados.usuario }
    } catch (erro) {
      setErro(erro.message)
      return { sucesso: false, erro: erro.message }
    } finally {
      setCarregando(false)
    }
  }

  // Função para renovar token
  const renovarToken = async () => {
    if (!refreshToken) {
      logout()
      return false
    }

    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      const dados = await response.json()

      if (!response.ok) {
        logout()
        return false
      }

      // Atualizar token
      localStorage.setItem('token', dados.token)
      setToken(dados.token)

      return true
    } catch (erro) {
      console.error('Erro ao renovar token:', erro)
      logout()
      return false
    }
  }

  // Função de logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('refreshToken')

    setToken(null)
    setUsuario(null)
    setRefreshToken(null)
    setErro(null)
  }

  // Verificar se usuário está autenticado
  const estaAutenticado = () => {
    return !!token && !!usuario
  }

  // Verificar se usuário tem um tipo específico
  const temTipo = (tipo) => {
    return usuario?.tipoUsuario === tipo
  }

  const value = {
    usuario,
    token,
    refreshToken,
    carregando,
    erro,
    login,
    logout,
    renovarToken,
    estaAutenticado,
    temTipo,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
