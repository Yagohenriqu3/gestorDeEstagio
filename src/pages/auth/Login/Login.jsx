import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiAlertCircle, FiLoader } from 'react-icons/fi'
import { useAuth } from '../../../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const { login, carregando } = useAuth()

  const [verSenha, setVerSenha] = useState(false)
  const [usuarioFocado, setUsuarioFocado] = useState(false)
  const [senhaFocada, setSenhaFocada] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function mostrarSenha() {
    setVerSenha(!verSenha)
  }

  async function handleLogin(e) {
    e.preventDefault()
    setErro('')

    if (!email || !senha) {
      setErro('Email e senha são obrigatórios')
      return
    }

    const resultado = await login(email, senha)

    if (resultado.sucesso) {
      const tipoUsuario = resultado.usuario?.tipoUsuario

      // Redirecionar baseado no tipo de usuário
      switch (tipoUsuario) {
        case 'Aluno':
          navigate('/aluno')
          break
        case 'Preceptor':
          navigate('/preceptor')
          break
        case 'Coordenador':
          navigate('/coordenador')
          break
        case 'Docente':
          navigate('/gestor-local') // Docente -> Gestor Local por enquanto
          break
        case 'Administrador':
          navigate('/adm')
          break
        default:
          navigate('/aluno')
      }
    } else {
      setErro(resultado.erro || 'Erro ao fazer login')
    }
  }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-[#237EE6] to-[#1e5fa8] flex flex-col items-center justify-center p-4'>
      {/* Efeito de fundo decorativo */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-[#60C9E6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-72 h-72 bg-[#154c8b] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
      </div>

      <div className='relative z-10'>
        {/* Card Principal */}
        <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm'>
          {/* Header do Card */}
          <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] px-8 pt-10 pb-8'>
            <h1 className='text-3xl font-bold text-white mb-2'>Bem-vindo</h1>
            <p className='text-blue-100 text-sm'>Faça login para acessar sua conta</p>
          </div>

          {/* Formulário */}
          <div className='px-8 py-10'>
            {/* Mensagem de Erro */}
            {erro && (
              <div className='mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3'>
                <FiAlertCircle className='text-red-600 shrink-0 mt-0.5' size={20} />
                <div>
                  <p className='font-semibold text-red-900 text-sm'>{erro}</p>
                </div>
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={handleLogin} className='space-y-6'>
              {/* Campo de Login */}
              <div className='mb-6'>
                <label className='block text-sm font-semibold text-gray-700 mb-3 ml-1'>
                  <span className='mr-2'>👤</span>Email
                </label>
                <div className={`relative transition-all duration-300 ${usuarioFocado ? 'ring-2 ring-[#237EE6] ring-opacity-50' : ''}`}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    onFocus={() => setUsuarioFocado(true)}
                    onBlur={() => setUsuarioFocado(false)}
                    className='w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#237EE6] focus:outline-none focus:rounded-2xl transition-colors duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400'
                    disabled={carregando}
                  />
                </div>
              </div>

              {/* Campo de Senha */}
              <div className='mb-8'>
                <label className='block text-sm font-semibold text-gray-700 mb-3 ml-1'>
                  <span className='mr-2'>🔐</span>Senha
                </label>
                <div className={`relative transition-all duration-300 ${senhaFocada ? 'ring-2 ring-[#237EE6] ring-opacity-50' : ''}`}>
                  <input
                    type={verSenha ? 'text' : 'password'}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    onFocus={() => setSenhaFocada(true)}
                    onBlur={() => setSenhaFocada(false)}
                    className='w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#237EE6] focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400 pr-14'
                    disabled={carregando}
                  />
                  <button
                    type="button"
                    onClick={mostrarSenha}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#237EE6] transition-colors duration-300 font-medium text-sm'
                    disabled={carregando}
                  >
                    {verSenha ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Link Esqueci Senha */}
              <div className='mb-8 text-right'>
                <Link
                  to='/recuperar-senha'
                  className='text-sm font-semibold text-[#237EE6] hover:text-[#154c8b] transition-colors duration-300 hover:underline'
                >
                  Esqueci minha senha
                </Link>
              </div>

              {/* Botão Entrar */}
              <button
                type='submit'
                disabled={carregando}
                className='w-full bg-linear-to-r from-[#237EE6] to-[#1e5fa8] text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {carregando ? (
                  <>
                    <FiLoader size={20} className='animate-spin' />
                    Entrando...
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Entrar
                  </>
                )}
              </button>

              {/* Dividor */}
              <div className='my-8 flex items-center gap-4'>
                <div className='flex-1 h-px bg-gray-200'></div>
                <span className='text-xs text-gray-400 font-medium'>OU</span>
                <div className='flex-1 h-px bg-gray-200'></div>
              </div>

              {/* Texto de suporte */}
              <p className='text-center text-sm text-gray-600'>
                Não tem uma conta? <Link to='/cadastro' className='text-[#237EE6] font-semibold hover:underline'>Crie uma aqui</Link>
              </p>
            </form>
          </div>

          {/* Footer do Card */}
          <div className='px-8 py-4 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500'>
            Sua segurança é nossa prioridade
          </div>
        </div>

        {/* Rodapé */}
        <div className='mt-8 text-center text-blue-100 text-sm'>
          <p>© 2026 ConectaEstágio. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}
