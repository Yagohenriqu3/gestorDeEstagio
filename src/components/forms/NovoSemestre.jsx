import { useState } from 'react'
import { FiCalendar, FiSave, FiX, FiBook, FiMapPin, FiAlertCircle, FiClock } from 'react-icons/fi'

export default function NovoSemestre({ onVoltar, onSalvar }) {
  const [formData, setFormData] = useState({
    ano_letivo: new Date().getFullYear(),
    semestre: '1',
    descricao: '',
    id_curriculo: '',
    id_unidade: '',
    horas_praticas_exigidas: '',
    data_inicio: '',
    data_fim: '',
    observacoes: '',
    status: 'Planejado'
  })

  const [erros, setErros] = useState({})

  // Mock de currículos disponíveis
  const curriculos = [
    { id: 1, nome: 'Medicina - Currículo 2025', codigo: 'MED-2025' },
    { id: 2, nome: 'Enfermagem - Currículo 2025', codigo: 'ENF-2025' },
    { id: 3, nome: 'Farmácia - Currículo 2025', codigo: 'FAR-2025' },
    { id: 4, nome: 'Fisioterapia - Currículo 2025', codigo: 'FIS-2025' }
  ]

  // Mock de unidades disponíveis
  const unidades = [
    { id: 1, nome: 'Campus São Paulo', sigla: 'CSP' },
    { id: 2, nome: 'Campus Diadema', sigla: 'CD' },
    { id: 3, nome: 'Campus Guarulhos', sigla: 'CG' },
    { id: 4, nome: 'Campus Santos', sigla: 'CS' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Limpar erro do campo quando usuário começar a digitar
    if (erros[name]) {
      setErros(prev => ({ ...prev, [name]: '' }))
    }

    // Atualizar descrição automaticamente se ainda não foi preenchida
    if ((name === 'ano_letivo' || name === 'semestre') && !formData.descricao) {
      const ano = name === 'ano_letivo' ? value : formData.ano_letivo
      const sem = name === 'semestre' ? value : formData.semestre
      const curriculoSelecionado = curriculos.find(c => c.id === parseInt(formData.id_curriculo))
      
      if (curriculoSelecionado) {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          descricao: `Semestre ${ano}.${sem} - ${curriculoSelecionado.nome}`
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }
    }

    // Atualizar descrição quando currículo mudar
    if (name === 'id_curriculo' && value) {
      const curriculoSelecionado = curriculos.find(c => c.id === parseInt(value))
      if (curriculoSelecionado) {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          descricao: `Semestre ${formData.ano_letivo}.${formData.semestre} - ${curriculoSelecionado.nome}`
        }))
      }
    }
  }

  const validarFormulario = () => {
    const novosErros = {}

    if (!formData.ano_letivo || formData.ano_letivo < 2020 || formData.ano_letivo > 2030) {
      novosErros.ano_letivo = 'Ano letivo inválido (entre 2020 e 2030)'
    }

    if (!formData.semestre) {
      novosErros.semestre = 'Selecione o semestre'
    }

    if (!formData.descricao || formData.descricao.trim().length < 5) {
      novosErros.descricao = 'Descrição deve ter no mínimo 5 caracteres'
    }

    if (!formData.id_curriculo) {
      novosErros.id_curriculo = 'Selecione um currículo'
    }

    if (!formData.id_unidade) {
      novosErros.id_unidade = 'Selecione uma unidade'
    }

    if (!formData.horas_praticas_exigidas || formData.horas_praticas_exigidas <= 0) {
      novosErros.horas_praticas_exigidas = 'Horas práticas exigidas devem ser maior que 0'
    }

    if (!formData.data_inicio) {
      novosErros.data_inicio = 'Data de início é obrigatória'
    }

    if (!formData.data_fim) {
      novosErros.data_fim = 'Data de fim é obrigatória'
    }

    if (formData.data_inicio && formData.data_fim && formData.data_inicio >= formData.data_fim) {
      novosErros.data_fim = 'Data de fim deve ser posterior à data de início'
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validarFormulario()) {
      // Preparar dados para salvar
      const novoSemestre = {
        ...formData,
        id_oferta_semestre: Date.now(), // Mock ID
        horas_praticas_ofertadas: 0,
        total_alunos_previstos: 0,
        alunos_alocados: 0,
        alunos_pendentes: 0,
        dias_sem_alocar_media: 0,
        rodizios: [],
        convenios: [],
        proximos_formandos: [],
        alunos_nao_alocados: [],
        curso: curriculos.find(c => c.id === parseInt(formData.id_curriculo))?.nome || '',
        unidade: unidades.find(u => u.id === parseInt(formData.id_unidade))?.nome || ''
      }

      if (onSalvar) {
        onSalvar(novoSemestre)
      }
      
      alert('Semestre cadastrado com sucesso!')
      
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
            <FiCalendar size={28} /> Cadastrar Novo Semestre
          </h2>
          <p className='text-gray-600 mt-1'>Defina o semestre letivo e as ofertas de estágio</p>
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
            <FiCalendar size={20} /> Informações do Semestre
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Ano Letivo */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Ano Letivo <span className='text-red-500'>*</span>
              </label>
              <input
                type='number'
                name='ano_letivo'
                value={formData.ano_letivo}
                onChange={handleChange}
                min='2020'
                max='2030'
                className={`w-full px-4 py-2 border ${erros.ano_letivo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
                placeholder='Ex: 2025'
              />
              {erros.ano_letivo && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.ano_letivo}
                </p>
              )}
            </div>

            {/* Semestre */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Semestre <span className='text-red-500'>*</span>
              </label>
              <select
                name='semestre'
                value={formData.semestre}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.semestre ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
              >
                <option value='1'>1º Semestre</option>
                <option value='2'>2º Semestre</option>
              </select>
              {erros.semestre && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.semestre}
                </p>
              )}
            </div>

            {/* Currículo */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <FiBook size={16} /> Currículo <span className='text-red-500'>*</span>
              </label>
              <select
                name='id_curriculo'
                value={formData.id_curriculo}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.id_curriculo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
              >
                <option value=''>-- Selecione o Currículo --</option>
                {curriculos.map(curr => (
                  <option key={curr.id} value={curr.id}>
                    {curr.nome} ({curr.codigo})
                  </option>
                ))}
              </select>
              {erros.id_curriculo && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.id_curriculo}
                </p>
              )}
            </div>

            {/* Unidade */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <FiMapPin size={16} /> Unidade <span className='text-red-500'>*</span>
              </label>
              <select
                name='id_unidade'
                value={formData.id_unidade}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.id_unidade ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
              >
                <option value=''>-- Selecione a Unidade --</option>
                {unidades.map(uni => (
                  <option key={uni.id} value={uni.id}>
                    {uni.nome} ({uni.sigla})
                  </option>
                ))}
              </select>
              {erros.id_unidade && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.id_unidade}
                </p>
              )}
            </div>

            {/* Descrição */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Descrição <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='descricao'
                value={formData.descricao}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.descricao ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
                placeholder='Ex: Semestre 2025.1 - Medicina - Currículo 2025'
              />
              {erros.descricao && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.descricao}
                </p>
              )}
              <p className='text-xs text-gray-500 mt-1'>
                A descrição é gerada automaticamente ao selecionar o currículo, mas você pode editá-la
              </p>
            </div>
          </div>
        </div>

        {/* Carga Horária e Datas */}
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <FiClock size={20} /> Carga Horária e Período
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Horas Práticas Exigidas */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Horas Práticas Exigidas <span className='text-red-500'>*</span>
              </label>
              <input
                type='number'
                name='horas_praticas_exigidas'
                value={formData.horas_praticas_exigidas}
                onChange={handleChange}
                min='1'
                className={`w-full px-4 py-2 border ${erros.horas_praticas_exigidas ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
                placeholder='Ex: 120'
              />
              {erros.horas_praticas_exigidas && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.horas_praticas_exigidas}
                </p>
              )}
              <p className='text-xs text-gray-500 mt-1'>Total de horas que o currículo exige</p>
            </div>

            {/* Data de Início */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Data de Início <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                name='data_inicio'
                value={formData.data_inicio}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.data_inicio ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
              />
              {erros.data_inicio && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.data_inicio}
                </p>
              )}
            </div>

            {/* Data de Fim */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Data de Fim <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                name='data_fim'
                value={formData.data_fim}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${erros.data_fim ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
              />
              {erros.data_fim && (
                <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                  <FiAlertCircle size={12} /> {erros.data_fim}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Status e Observações */}
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>Observações e Status</h3>
          <div className='space-y-4'>
            {/* Status */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Status</label>
              <select
                name='status'
                value={formData.status}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
              >
                <option value='Planejado'>Planejado</option>
                <option value='Em Andamento'>Em Andamento</option>
                <option value='Vigente'>Vigente</option>
                <option value='Concluído'>Concluído</option>
              </select>
            </div>

            {/* Observações */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Observações</label>
              <textarea
                name='observacoes'
                value={formData.observacoes}
                onChange={handleChange}
                rows='4'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none resize-none'
                placeholder='Informações adicionais sobre o semestre (opcional)'
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
          <div className='flex gap-3'>
            <FiAlertCircle className='text-blue-600 shrink-0 mt-0.5' size={20} />
            <div className='space-y-2'>
              <p className='text-sm font-semibold text-blue-900'>Informações Importantes</p>
              <ul className='text-xs text-blue-800 space-y-1'>
                <li>• Após criar o semestre, você poderá adicionar rodízios e componentes curriculares</li>
                <li>• As horas práticas exigidas devem corresponder ao que está definido no currículo</li>
                <li>• O período (data início e fim) deve cobrir toda a duração do semestre letivo</li>
                <li>• Certifique-se de que o currículo e a unidade estejam corretos antes de salvar</li>
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
            <FiSave size={18} /> Cadastrar Semestre
          </button>
        </div>
      </form>
    </div>
  )
}
