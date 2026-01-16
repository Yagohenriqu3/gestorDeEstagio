import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecuperarSenha() {
  const [emailFocado, setEmailFocado] = useState(false)
  const [codigoFocado, setCodigoFocado] = useState(false)
  const [senhaFocada, setSenhaFocada] = useState(false)
  const [confirmarSenhaFocada, setConfirmarSenhaFocada] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#237EE6] to-[#1e5fa8] flex flex-col items-center justify-center p-4'>
      {/* Efeito de fundo decorativo */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-[#60C9E6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-72 h-72 bg-[#154c8b] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
      </div>

      <div className='relative z-10'>
        {/* Card Principal */}
        <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm'>
          {/* Header do Card */}
          <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] px-8 pt-10 pb-8'>
            <h1 className='text-3xl font-bold text-white mb-2'>Recuperar Senha</h1>
            <p className='text-blue-100 text-sm'>Redefinir sua senha em 3 passos</p>
          </div>

          {/* Formulário */}
          <div className='px-8 py-10'>
            {/* Passo 1: Email */}
            <div className='mb-6'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-xl'>📧</span>
                <label className='text-sm font-semibold text-gray-700'>E-mail</label>
              </div>
              <div className={`relative transition-all duration-300 ${emailFocado ? 'ring-2 ring-[#237EE6] ring-opacity-50' : ''}`}>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  onFocus={() => setEmailFocado(true)}
                  onBlur={() => setEmailFocado(false)}
                  className='w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#237EE6] focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400'
                />
              </div>
            </div>

            {/* Indicador de progresso */}
            <div className='flex gap-2 mb-8'>
              <div className='flex-1 h-1 bg-[#237EE6] rounded-full'></div>
              <div className='flex-1 h-1 bg-gray-200 rounded-full'></div>
              <div className='flex-1 h-1 bg-gray-200 rounded-full'></div>
            </div>

            {/* Passo 2: Código */}
            <div className='mb-6'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-xl'>🔐</span>
                <label className='text-sm font-semibold text-gray-700'>Código de Verificação</label>
              </div>
              <p className='text-xs text-gray-500 mb-3 ml-1'>Verifique seu e-mail e digite o código recebido</p>
              <div className={`relative transition-all duration-300 ${codigoFocado ? 'ring-2 ring-[#237EE6] ring-opacity-50' : ''}`}>
                <input
                  type="text"
                  placeholder="Digite o código"
                  onFocus={() => setCodigoFocado(true)}
                  onBlur={() => setCodigoFocado(false)}
                  className='w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#237EE6] focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400 text-center font-mono tracking-widest'
                />
              </div>
            </div>

            {/* Passo 3: Nova Senha */}
            <div className='mb-6'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-xl'>🔑</span>
                <label className='text-sm font-semibold text-gray-700'>Nova Senha</label>
              </div>
              <div className={`relative transition-all duration-300 ${senhaFocada ? 'ring-2 ring-[#237EE6] ring-opacity-50' : ''}`}>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Digite sua nova senha"
                  onFocus={() => setSenhaFocada(true)}
                  onBlur={() => setSenhaFocada(false)}
                  className='w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#237EE6] focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400 pr-14'
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#237EE6] transition-colors duration-300'
                >
                  {mostrarSenha ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Confirmar Senha */}
            <div className='mb-8'>
              <label className='block text-sm font-semibold text-gray-700 mb-3 ml-1'>
                <span className='mr-2'>✓</span>Confirmar Senha
              </label>
              <div className={`relative transition-all duration-300 ${confirmarSenhaFocada ? 'ring-2 ring-[#237EE6] ring-opacity-50' : ''}`}>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Confirme sua nova senha"
                  onFocus={() => setConfirmarSenhaFocada(true)}
                  onBlur={() => setConfirmarSenhaFocada(false)}
                  className='w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-[#237EE6] focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400 pr-14'
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#237EE6] transition-colors duration-300'
                >
                  {mostrarSenha ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Botão Recuperar */}
            <button className='w-full bg-linear-to-r from-[#237EE6] to-[#1e5fa8] text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-base flex items-center justify-center gap-2 mb-6'>
              <span>🔄</span>
              Redefinir Senha
            </button>

            {/* Dividor */}
            <div className='my-6 flex items-center gap-4'>
              <div className='flex-1 h-px bg-gray-200'></div>
              <span className='text-xs text-gray-400 font-medium'>OU</span>
              <div className='flex-1 h-px bg-gray-200'></div>
            </div>

            {/* Link voltar */}
            <div className='text-center'>
              <p className='text-sm text-gray-600 mb-3'>Lembrou sua senha?</p>
              <Link
                to='/'
                className='inline-block text-[#237EE6] hover:text-[#154c8b] font-semibold transition-colors duration-300 hover:underline'
              >
                ← Voltar ao Login
              </Link>
            </div>
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
 