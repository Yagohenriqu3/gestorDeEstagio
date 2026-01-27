import { useState } from 'react'
import { FiSave, FiX, FiAlertCircle, FiGlobe, FiMail, FiPhone, FiMapPin, FiUpload, FiImage } from 'react-icons/fi'

export default function NovaInstituicao({ onVoltar, onSalvar }) {
  const [formData, setFormData] = useState({
    nome_instituicao: '',
    cnpj: '',
    tipo_instituicao: 'Pública',
    mantenedora: '',
    codigo_mec: '',
    site: '',
    telefone: '',
    email_contato: '',
    status: 'Ativa',
    logo: null
  })

  const [erros, setErros] = useState({})
  const [previewLogo, setPreviewLogo] = useState(null)

  // Máscaras
  const aplicarMascaraCNPJ = (valor) => {
    valor = valor.replace(/\D/g, '')
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2')
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2')
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2')
    return valor.substring(0, 18)
  }

  const aplicarMascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, '')
    if (valor.length <= 10) {
      valor = valor.replace(/^(\d{2})(\d)/, '($1) $2')
      valor = valor.replace(/(\d{4})(\d)/, '$1-$2')
    } else {
      valor = valor.replace(/^(\d{2})(\d)/, '($1) $2')
      valor = valor.replace(/(\d{5})(\d)/, '$1-$2')
    }
    return valor.substring(0, 15)
  }

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
    if (!url) return true // URL é opcional
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    let valorFormatado = value

    if (name === 'cnpj') {
      valorFormatado = aplicarMascaraCNPJ(value)
    } else if (name === 'telefone') {
      valorFormatado = aplicarMascaraTelefone(value)
    }

    setFormData(prev => ({ ...prev, [name]: valorFormatado }))
    
    // Limpar erro do campo quando usuário começar a digitar
    if (erros[name]) {
      setErros(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setErros(prev => ({ ...prev, logo: 'Apenas imagens são permitidas' }))
        return
      }

      // Validar tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErros(prev => ({ ...prev, logo: 'A imagem deve ter no máximo 5MB' }))
        return
      }

      setFormData(prev => ({ ...prev, logo: file }))
      
      // Criar preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewLogo(reader.result)
      }
      reader.readAsDataURL(file)

      // Limpar erro
      if (erros.logo) {
        setErros(prev => ({ ...prev, logo: '' }))
      }
    }
  }

  const removerLogo = () => {
    setFormData(prev => ({ ...prev, logo: null }))
    setPreviewLogo(null)
  }

  const validarFormulario = () => {
    const novosErros = {}

    if (!formData.nome_instituicao || formData.nome_instituicao.trim().length < 3) {
      novosErros.nome_instituicao = 'Nome da instituição deve ter no mínimo 3 caracteres'
    }

    if (!formData.cnpj) {
      novosErros.cnpj = 'CNPJ é obrigatório'
    } else if (!validarCNPJ(formData.cnpj)) {
      novosErros.cnpj = 'CNPJ inválido'
    }

    if (!formData.tipo_instituicao) {
      novosErros.tipo_instituicao = 'Selecione o tipo de instituição'
    }

    if (!formData.mantenedora || formData.mantenedora.trim().length < 3) {
      novosErros.mantenedora = 'Nome da mantenedora deve ter no mínimo 3 caracteres'
    }

    if (!formData.codigo_mec || formData.codigo_mec.trim().length < 1) {
      novosErros.codigo_mec = 'Código e-MEC é obrigatório'
    }

    if (formData.site && !validarURL(formData.site)) {
      novosErros.site = 'URL inválida. Use o formato: https://exemplo.com.br'
    }

    if (!formData.telefone) {
      novosErros.telefone = 'Telefone é obrigatório'
    } else if (formData.telefone.replace(/\D/g, '').length < 10) {
      novosErros.telefone = 'Telefone inválido'
    }

    if (!formData.email_contato) {
      novosErros.email_contato = 'E-mail é obrigatório'
    } else if (!validarEmail(formData.email_contato)) {
      novosErros.email_contato = 'E-mail inválido'
    }

    if (!formData.status) {
      novosErros.status = 'Selecione o status'
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validarFormulario()) {
      // Preparar dados para salvar
      const novaInstituicao = {
        ...formData,
        id_instituicao: Date.now(), // Mock ID
        data_cadastro: new Date().toISOString(),
        cnpj: formData.cnpj.replace(/\D/g, ''), // Remover formatação para salvar
        telefone: formData.telefone.replace(/\D/g, '') // Remover formatação para salvar
      }

      if (onSalvar) {
        onSalvar(novaInstituicao)
      }
      
      alert('Instituição cadastrada com sucesso!')
      
      if (onVoltar) {
        onVoltar()
      }
    }
  }

  const handleCancelar = () => {
    if (onVoltar) {
      onVoltar()
    }
  }

  return (
    <div className='space-y-6'>
      {/* Cabeçalho */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2'>
            🏛️ Cadastrar Nova Instituição de Ensino
          </h2>
          <p className='text-gray-600 mt-1'>Preencha os dados da instituição de ensino</p>
        </div>
        <button
          onClick={handleCancelar}
          className='text-gray-500 hover:text-gray-700 transition-colors'
        >
          <FiX size={28} />
        </button>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className='bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6'>
        {/* Informações Básicas */}
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            📋 Informações Básicas
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Nome da Instituição */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Nome da Instituição <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='nome_instituicao'
                value={formData.nome_instituicao}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.nome_instituicao ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
                placeholder='Ex: Universidade Federal de São Paulo'
              />
              {erros.nome_instituicao && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.nome_instituicao}
                </p>
              )}
            </div>

            {/* CNPJ */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                CNPJ <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='cnpj'
                value={formData.cnpj}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.cnpj ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
                placeholder='00.000.000/0000-00'
                maxLength='18'
              />
              {erros.cnpj && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.cnpj}
                </p>
              )}
            </div>

            {/* Código e-MEC */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Código e-MEC <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='codigo_mec'
                value={formData.codigo_mec}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.codigo_mec ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
                placeholder='Ex: 1234'
              />
              {erros.codigo_mec && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.codigo_mec}
                </p>
              )}
            </div>

            {/* Tipo de Instituição */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Tipo de Instituição <span className='text-red-500'>*</span>
              </label>
              <select
                name='tipo_instituicao'
                value={formData.tipo_instituicao}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.tipo_instituicao ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
              >
                <option value='Pública'>Pública</option>
                <option value='Privada'>Privada</option>
              </select>
              {erros.tipo_instituicao && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.tipo_instituicao}
                </p>
              )}
            </div>

            {/* Mantenedora */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Mantenedora <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='mantenedora'
                value={formData.mantenedora}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.mantenedora ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
                placeholder='Ex: Governo Federal'
              />
              {erros.mantenedora && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.mantenedora}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Status <span className='text-red-500'>*</span>
              </label>
              <select
                name='status'
                value={formData.status}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.status ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
              >
                <option value='Ativa'>Ativa</option>
                <option value='Inativa'>Inativa</option>
              </select>
              {erros.status && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.status}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Informações de Contato */}
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <FiMail size={20} /> Informações de Contato
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Telefone */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <FiPhone size={16} /> Telefone <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='telefone'
                value={formData.telefone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.telefone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
                placeholder='(00) 0000-0000'
                maxLength='15'
              />
              {erros.telefone && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.telefone}
                </p>
              )}
            </div>

            {/* E-mail */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <FiMail size={16} /> E-mail de Contato <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                name='email_contato'
                value={formData.email_contato}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.email_contato ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
                placeholder='contato@instituicao.edu.br'
              />
              {erros.email_contato && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.email_contato}
                </p>
              )}
            </div>

            {/* Site */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <FiGlobe size={16} /> Site Institucional
              </label>
              <input
                type='text'
                name='site'
                value={formData.site}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.site ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
                placeholder='https://www.instituicao.edu.br'
              />
              {erros.site && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.site}
                </p>
              )}
              <p className='text-xs text-gray-500 mt-1'>Digite a URL completa incluindo https://</p>
            </div>
          </div>
        </div>

        {/* Logo da Instituição */}
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <FiImage size={20} /> Logo da Instituição
          </h3>
          <div className='space-y-4'>
            {/* Upload */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Enviar Logo (opcional)
              </label>
              <div className='flex items-center gap-4'>
                <label className='cursor-pointer bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                  <FiUpload size={18} />
                  Selecionar Imagem
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleLogoChange}
                    className='hidden'
                  />
                </label>
                {formData.logo && (
                  <button
                    type='button'
                    onClick={removerLogo}
                    className='text-red-500 hover:text-red-700 font-semibold transition-colors flex items-center gap-1'
                  >
                    <FiX size={18} /> Remover
                  </button>
                )}
              </div>
              {erros.logo && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.logo}
                </p>
              )}
              <p className='text-xs text-gray-500 mt-1'>Formatos aceitos: JPG, PNG, SVG. Tamanho máximo: 5MB</p>
            </div>

            {/* Preview */}
            {previewLogo && (
              <div className='bg-gray-50 rounded-xl p-4 border-2 border-gray-200'>
                <p className='text-sm font-semibold text-gray-700 mb-3'>Preview da Logo:</p>
                <div className='flex items-center justify-center'>
                  <img
                    src={previewLogo}
                    alt='Preview'
                    className='max-h-40 rounded-lg shadow-md'
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
          <div className='flex gap-3'>
            <FiAlertCircle className='text-blue-600 shrink-0 mt-0.5' size={20} />
            <div className='space-y-2'>
              <p className='text-sm font-semibold text-blue-900'>Informações Importantes</p>
              <ul className='text-xs text-blue-800 space-y-1'>
                <li>• O CNPJ deve ser válido e único no sistema</li>
                <li>• O código e-MEC pode ser consultado no portal do MEC</li>
                <li>• Certifique-se de que todos os dados de contato estão corretos</li>
                <li>• A logo é opcional, mas recomendamos fazer o upload para identificação visual</li>
                <li>• Após cadastrar a instituição, você poderá adicionar unidades, cursos e currículos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className='flex flex-col md:flex-row gap-3 pt-4 border-t border-gray-200'>
          <button
            type='button'
            onClick={handleCancelar}
            className='flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2'
          >
            <FiX size={18} /> Cancelar
          </button>
          <button
            type='submit'
            className='flex-1 px-6 py-3 bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2'
          >
            <FiSave size={18} /> Cadastrar Instituição
          </button>
        </div>
      </form>
    </div>
  )
}
