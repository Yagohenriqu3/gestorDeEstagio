import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiMail, FiPhone, FiFileText, FiCalendar, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiAlertCircle } from 'react-icons/fi'

export default function Cadastro() {
  const [etapa, setEtapa] = useState(1)
  const [verSenha, setVerSenha] = useState(false)
  const [verConfirmaSenha, setVerConfirmaSenha] = useState(false)
  const [erros, setErros] = useState({})
  
  const [formData, setFormData] = useState({
    // Dados Pessoais
    nomeCompleto: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    
    // Contato
    email: '',
    telefone: '',
    celular: '',
    
    // Credenciais
    usuario: '',
    senha: '',
    confirmaSenha: ''
  })

  // Validação de CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '')
    
    if (cpf.length !== 11) return false
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false
    
    // Validação do primeiro dígito verificador
    let soma = 0
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let resto = 11 - (soma % 11)
    let digito1 = resto >= 10 ? 0 : resto
    
    if (digito1 !== parseInt(cpf.charAt(9))) return false
    
    // Validação do segundo dígito verificador
    soma = 0
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i)
    }
    resto = 11 - (soma % 11)
    let digito2 = resto >= 10 ? 0 : resto
    
    if (digito2 !== parseInt(cpf.charAt(10))) return false
    
    return true
  }

  // Validação de Email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Validação de Senha Forte
  const validarSenhaForte = (senha) => {
    if (senha.length < 8) return false
    if (!/[A-Z]/.test(senha)) return false // Pelo menos uma letra maiúscula
    if (!/[a-z]/.test(senha)) return false // Pelo menos uma letra minúscula
    if (!/[0-9]/.test(senha)) return false // Pelo menos um número
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) return false // Pelo menos um caractere especial
    return true
  }

  const handleChange = (campo, valor) => {
    setFormData({
      ...formData,
      [campo]: valor
    })
    
    // Limpa erro do campo quando o usuário começa a digitar
    if (erros[campo]) {
      setErros({
        ...erros,
        [campo]: ''
      })
    }
  }

  const validarEtapa1 = () => {
    const novosErros = {}
    
    if (!formData.nomeCompleto.trim()) {
      novosErros.nomeCompleto = 'Nome completo é obrigatório'
    } else if (formData.nomeCompleto.trim().split(' ').length < 2) {
      novosErros.nomeCompleto = 'Digite nome e sobrenome'
    }
    
    if (!formData.cpf.trim()) {
      novosErros.cpf = 'CPF é obrigatório'
    } else if (!validarCPF(formData.cpf)) {
      novosErros.cpf = 'CPF inválido'
    }
    
    if (!formData.rg.trim()) {
      novosErros.rg = 'RG é obrigatório'
    }
    
    if (!formData.dataNascimento) {
      novosErros.dataNascimento = 'Data de nascimento é obrigatória'
    } else {
      const idade = new Date().getFullYear() - new Date(formData.dataNascimento).getFullYear()
      if (idade < 16) {
        novosErros.dataNascimento = 'Você deve ter pelo menos 16 anos'
      }
    }
    
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const validarEtapa2 = () => {
    const novosErros = {}
    
    if (!formData.email.trim()) {
      novosErros.email = 'E-mail é obrigatório'
    } else if (!validarEmail(formData.email)) {
      novosErros.email = 'E-mail inválido. Use o formato: exemplo@dominio.com'
    }
    
    if (!formData.celular.trim()) {
      novosErros.celular = 'Celular é obrigatório'
    } else if (formData.celular.replace(/\D/g, '').length < 10) {
      novosErros.celular = 'Celular inválido'
    }
    
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const validarEtapa3 = () => {
    const novosErros = {}
    
    if (!formData.usuario.trim()) {
      novosErros.usuario = 'Nome de usuário é obrigatório'
    } else if (formData.usuario.length < 4) {
      novosErros.usuario = 'Nome de usuário deve ter pelo menos 4 caracteres'
    }
    
    if (!formData.senha) {
      novosErros.senha = 'Senha é obrigatória'
    } else if (!validarSenhaForte(formData.senha)) {
      novosErros.senha = 'Senha deve ter 8+ caracteres, maiúsculas, minúsculas, números e símbolos'
    }
    
    if (!formData.confirmaSenha) {
      novosErros.confirmaSenha = 'Confirme sua senha'
    } else if (formData.senha !== formData.confirmaSenha) {
      novosErros.confirmaSenha = 'As senhas não coincidem'
    }
    
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validarEtapa3()) {
      return
    }
    
    console.log('Dados do cadastro:', formData)
    alert('Cadastro enviado com sucesso! Aguarde a aprovação do coordenador para ter acesso ao sistema.')
  }

  const proximaEtapa = () => {
    let valido = false
    
    if (etapa === 1) {
      valido = validarEtapa1()
    } else if (etapa === 2) {
      valido = validarEtapa2()
    }
    
    if (valido && etapa < 3) {
      setEtapa(etapa + 1)
    }
  }

  const etapaAnterior = () => {
    if (etapa > 1) {
      setErros({})
      setEtapa(etapa - 1)
    }
  }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-[#237EE6] to-[#1e5fa8] flex flex-col items-center justify-center p-4'>
      {/* Efeito de fundo decorativo */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-[#60C9E6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-72 h-72 bg-[#154c8b] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
      </div>

      <div className='relative z-10 w-full max-w-2xl'>
        {/* Card Principal */}
        <div className='bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm'>
          {/* Header do Card */}
          <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] px-8 pt-10 pb-8'>
            <h1 className='text-3xl font-bold text-white mb-2'>Criar Conta</h1>
            <p className='text-blue-100 text-sm'>Preencha seus dados para solicitar acesso ao sistema</p>
            
            {/* Indicador de Progresso */}
            <div className='flex items-center gap-2 mt-6'>
              {[1, 2, 3].map((num) => (
                <div key={num} className='flex-1 flex items-center gap-2'>
                  <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                    etapa >= num ? 'bg-white' : 'bg-white/30'
                  }`}></div>
                  {num < 3 && <div className='w-2 h-2 rounded-full bg-white/30'></div>}
                </div>
              ))}
            </div>
            <div className='flex justify-between mt-2 text-xs text-blue-100'>
              <span>Dados Pessoais</span>
              <span>Contato</span>
              <span>Credenciais</span>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className='px-8 py-10'>
            {/* Etapa 1: Dados Pessoais */}
            {etapa === 1 && (
              <div className='space-y-6 animate-fadeIn'>
                <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  <FiUser className='text-[#237EE6]' size={24} />
                  Dados Pessoais
                </h2>

                {/* Nome Completo */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Nome Completo *
                  </label>
                  <input
                    type='text'
                    value={formData.nomeCompleto}
                    onChange={(e) => handleChange('nomeCompleto', e.target.value)}
                    placeholder='Digite seu nome completo'
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white ${
                      erros.nomeCompleto ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#237EE6]'
                    }`}
                  />
                  {erros.nomeCompleto && (
                    <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                      <FiAlertCircle size={12} /> {erros.nomeCompleto}
                    </p>
                  )}
                </div>

                {/* CPF e RG */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      CPF *
                    </label>
                    <input
                      type='text'
                      value={formData.cpf}
                      onChange={(e) => handleChange('cpf', e.target.value)}
                      placeholder='000.000.000-00'
                      maxLength='14'
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white ${
                        erros.cpf ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#237EE6]'
                      }`}
                    />
                    {erros.cpf && (
                      <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                        <FiAlertCircle size={12} /> {erros.cpf}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      RG *
                    </label>
                    <input
                      type='text'
                      value={formData.rg}
                      onChange={(e) => handleChange('rg', e.target.value)}
                      placeholder='00.000.000-0'
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white ${
                        erros.rg ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#237EE6]'
                      }`}
                    />
                    {erros.rg && (
                      <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                        <FiAlertCircle size={12} /> {erros.rg}
                      </p>
                    )}
                  </div>
                </div>

                {/* Data de Nascimento */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Data de Nascimento *
                  </label>
                  <input
                    type='date'
                    value={formData.dataNascimento}
                    onChange={(e) => handleChange('dataNascimento', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white ${
                      erros.dataNascimento ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#237EE6]'
                    }`}
                  />
                  {erros.dataNascimento && (
                    <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                      <FiAlertCircle size={12} /> {erros.dataNascimento}
                    </p>
                  )}
                </div>

                {/* Botão Próximo */}
                <button
                  type='button'
                  onClick={proximaEtapa}
                  className='w-full bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
                >
                  Próximo
                </button>
              </div>
            )}

            {/* Etapa 2: Contato */}
            {etapa === 2 && (
              <div className='space-y-6 animate-fadeIn'>
                <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  <FiMail className='text-[#237EE6]' size={24} />
                  Informações de Contato
                </h2>

                {/* Email */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    E-mail *
                  </label>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder='seu.email@exemplo.com'
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white ${
                      erros.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#237EE6]'
                    }`}
                  />
                  {erros.email && (
                    <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                      <FiAlertCircle size={12} /> {erros.email}
                    </p>
                  )}
                </div>

                {/* Telefone e Celular */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Telefone
                    </label>
                    <input
                      type='tel'
                      value={formData.telefone}
                      onChange={(e) => handleChange('telefone', e.target.value)}
                      placeholder='(00) 0000-0000'
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#237EE6] focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Celular *
                    </label>
                    <input
                      type='tel'
                      value={formData.celular}
                      onChange={(e) => handleChange('celular', e.target.value)}
                      placeholder='(00) 00000-0000'
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white ${
                        erros.celular ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#237EE6]'
                      }`}
                    />
                    {erros.celular && (
                      <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                        <FiAlertCircle size={12} /> {erros.celular}
                      </p>
                    )}
                  </div>
                </div>

                {/* Alerta */}
                <div className='bg-blue-50 border-2 border-blue-200 rounded-xl p-4'>
                  <p className='text-sm text-gray-700'>
                    <strong>Importante:</strong> Utilize um e-mail válido. Todas as comunicações importantes serão enviadas para este endereço.
                  </p>
                </div>

                {/* Botões */}
                <div className='flex gap-4'>
                  <button
                    type='button'
                    onClick={etapaAnterior}
                    className='flex-1 bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2'
                  >
                    <FiArrowLeft size={20} />
                    Voltar
                  </button>
                  <button
                    type='button'
                    onClick={proximaEtapa}
                    className='flex-1 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 3: Credenciais */}
            {etapa === 3 && (
              <div className='space-y-6 animate-fadeIn'>
                <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  <FiLock className='text-[#237EE6]' size={24} />
                  Credenciais de Acesso
                </h2>

                {/* Nome de Usuário */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Nome de Usuário *
                  </label>
                  <input
                    type='text'
                    value={formData.usuario}
                    onChange={(e) => handleChange('usuario', e.target.value)}
                    placeholder='Digite seu nome de usuário'
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white ${
                      erros.usuario ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#237EE6]'
                    }`}
                  />
                  {erros.usuario ? (
                    <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                      <FiAlertCircle size={12} /> {erros.usuario}
                    </p>
                  ) : (
                    <p className='text-xs text-gray-500 mt-1'>Este será seu login no sistema</p>
                  )}
                </div>

                {/* Senha */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Senha *
                  </label>
                  <div className='relative'>
                    <input
                      type={verSenha ? 'text' : 'password'}
                      value={formData.senha}
                      onChange={(e) => handleChange('senha', e.target.value)}
                      placeholder='Digite uma senha forte'
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white pr-12 ${
                        erros.senha ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#237EE6]'
                      }`}
                    />
                    <button
                      type='button'
                      onClick={() => setVerSenha(!verSenha)}
                      className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#237EE6] transition-colors'
                    >
                      {verSenha ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {erros.senha ? (
                    <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                      <FiAlertCircle size={12} /> {erros.senha}
                    </p>
                  ) : (
                    <p className='text-xs text-gray-500 mt-1'>Mínimo 8 caracteres, inclua letras maiúsculas, minúsculas, números e símbolos</p>
                  )}
                </div>

                {/* Confirmar Senha */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Confirmar Senha *
                  </label>
                  <div className='relative'>
                    <input
                      type={verConfirmaSenha ? 'text' : 'password'}
                      value={formData.confirmaSenha}
                      onChange={(e) => handleChange('confirmaSenha', e.target.value)}
                      placeholder='Digite a senha novamente'
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-300 bg-gray-50 hover:bg-white pr-12 ${
                        erros.confirmaSenha ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#237EE6]'
                      }`}
                    />
                    <button
                      type='button'
                      onClick={() => setVerConfirmaSenha(!verConfirmaSenha)}
                      className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#237EE6] transition-colors'
                    >
                      {verConfirmaSenha ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {erros.confirmaSenha && (
                    <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                      <FiAlertCircle size={12} /> {erros.confirmaSenha}
                    </p>
                  )}
                </div>

                {/* Alerta Perfil */}
                <div className='bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4'>
                  <p className='text-sm text-gray-700'>
                    <strong>Atenção:</strong> Seu perfil de acesso (Aluno, Preceptor, Coordenador, etc.) será atribuído pelo administrador após a aprovação do seu cadastro.
                  </p>
                </div>

                {/* Botões */}
                <div className='flex gap-4'>
                  <button
                    type='button'
                    onClick={etapaAnterior}
                    className='flex-1 bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2'
                  >
                    <FiArrowLeft size={20} />
                    Voltar
                  </button>
                  <button
                    type='submit'
                    className='flex-1 bg-linear-to-r from-[#10E686] to-[#60E6D7] text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
                  >
                    Criar Conta
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Footer do Card */}
          <div className='px-8 py-4 bg-gray-50 border-t border-gray-100'>
            <p className='text-center text-sm text-gray-600'>
              Já tem uma conta?{' '}
              <Link to='/login' className='text-[#237EE6] font-semibold hover:underline'>
                Faça login
              </Link>
            </p>
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
