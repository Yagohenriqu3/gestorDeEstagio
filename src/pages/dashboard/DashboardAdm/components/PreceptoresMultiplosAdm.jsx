import { useState, useMemo } from 'react'
import { FiClipboard, FiPlus, FiChevronDown, FiChevronUp, FiFilter, FiPhone, FiMail, FiDownload, FiX, FiCheck, FiStar } from 'react-icons/fi'

export default function PreceptoresMultiplosAdm({ preceptores = [], instituicoes = [], handleExportar }) {
  const [filtroInstituicao, setFiltroInstituicao] = useState('todos')
  const [filtroUnidade, setFiltroUnidade] = useState('todos')
  const [busca, setBusca] = useState('')
  const [expandidos, setExpandidos] = useState({})
  const [modalAssociarEspecialidade, setModalAssociarEspecialidade] = useState(false)
  const [preceptorSelecionado, setPreceptorSelecionado] = useState(null)
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('')
  const [preceptoresComEspecialidade, setPreceptoresComEspecialidade] = useState({})

  // Mock de especialidades disponíveis
  const especialidades = [
    { id: 1, nome: 'Clínica Médica', codigo: 'CM001' },
    { id: 2, nome: 'Cirurgia Geral', codigo: 'CG001' },
    { id: 3, nome: 'Pediatria', codigo: 'PED001' },
    { id: 4, nome: 'Cardiologia', codigo: 'CARD001' },
    { id: 5, nome: 'Ginecologia', codigo: 'GINE001' },
    { id: 6, nome: 'Enfermagem Clínica', codigo: 'ENF001' },
    { id: 7, nome: 'Farmácia Clínica', codigo: 'FAR001' },
    { id: 8, nome: 'Urgência e Emergência', codigo: 'URG001' },
    { id: 9, nome: 'Saúde Pública', codigo: 'SAU001' },
    { id: 10, nome: 'Ortopedia', codigo: 'ORT001' }
  ]

  // Obter unidades da instituição selecionada
  const unidadesDisponiveis = useMemo(() => {
    if (filtroInstituicao === 'todos') return []
    const inst = instituicoes.find(i => i.nome === filtroInstituicao)
    return inst?.unidades || []
  }, [filtroInstituicao, instituicoes])

  // Filtrar preceptores
  const preceptoresFiltrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return preceptores
      .filter(p => filtroInstituicao === 'todos' || p.instituicao === filtroInstituicao)
      .filter(p => filtroUnidade === 'todos' || p.unidade === filtroUnidade)
      .filter(p => q === '' || p.nome.toLowerCase().includes(q) || p.crm.toLowerCase().includes(q))
  }, [preceptores, filtroInstituicao, filtroUnidade, busca])

  const toggleExpandir = (id) => {
    setExpandidos(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const totalAlunos = (alocacoes) => {
    return alocacoes.reduce((sum, aloc) => sum + (aloc.alunos?.length || 0), 0)
  }

  return (
    <div className='space-y-6'>
      {/* Filtros */}
      <div className='bg-white rounded-2xl shadow-md p-6'>
        <div className='flex items-center gap-2 mb-4'>
          <FiFilter className='text-[#237EE6]' size={20} />
          <h3 className='text-lg font-semibold text-gray-900'>Filtros</h3>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {/* Filtro Instituição */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Instituição</label>
            <select
              value={filtroInstituicao}
              onChange={(e) => {
                setFiltroInstituicao(e.target.value)
                setFiltroUnidade('todos')
              }}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#237EE6] focus:border-transparent'
            >
              <option value='todos'>Todas</option>
              {instituicoes.map(inst => (
                <option key={inst.id} value={inst.nome}>{inst.nome}</option>
              ))}
            </select>
          </div>

          {/* Filtro Unidade */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Unidade</label>
            <select
              value={filtroUnidade}
              onChange={(e) => setFiltroUnidade(e.target.value)}
              disabled={filtroInstituicao === 'todos'}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#237EE6] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'
            >
              <option value='todos'>Todas</option>
              {unidadesDisponiveis.map(unidade => (
                <option key={unidade} value={unidade}>{unidade}</option>
              ))}
            </select>
          </div>

          {/* Busca por Nome ou CRM */}
          <div className='md:col-span-2'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Buscar por Nome ou CRM</label>
            <input
              type='text'
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder='Digite o nome ou CRM...'
              className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#237EE6] focus:border-transparent'
            />
          </div>
        </div>

        {/* Botão Exportar */}
        <div className='flex justify-end mt-4'>
          <button 
            onClick={handleExportar}
            className='bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold px-6 py-2 rounded-lg hover:bg-[#F5F7FA] transition-all flex items-center gap-2'
          >
            <FiDownload size={18} /> Exportar
          </button>
        </div>
      </div>

      {/* Lista de Preceptores */}
      <div className='space-y-4'>
        {preceptoresFiltrados.length === 0 ? (
          <div className='bg-white rounded-2xl shadow-md p-8 text-center'>
            <p className='text-gray-500'>Nenhum preceptor encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          preceptoresFiltrados.map((prec) => (
            <div key={prec.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all'>
              {/* Header do Card */}
              <div className='p-6'>
                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <h3 className='text-xl font-bold text-gray-900'>{prec.nome}</h3>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        prec.status === 'Ativo'
                          ? 'bg-[#10E686]/20 text-[#10E686]'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {prec.status}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600'>{prec.crm}</p>
                    
                    <div className='mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-700'>
                      <span><strong>Instituição:</strong> {prec.instituicao}</span>
                      <span><strong>Unidade:</strong> {prec.unidade}</span>
                      <span className='text-[#237EE6] font-semibold'>
                        {totalAlunos(prec.alocacoes)} aluno(s) supervisionado(s)
                      </span>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className='shrink-0 flex gap-2 flex-wrap'>
                    <button
                      onClick={() => {
                        setPreceptorSelecionado(prec)
                        setModalAssociarEspecialidade(true)
                      }}
                      className='bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-white font-semibold px-4 md:px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2'
                      title='Associar especialidade'
                    >
                      <FiStar size={16} /> Especialidade
                    </button>
                    <button
                      onClick={() => toggleExpandir(prec.id)}
                      className='shrink-0 bg-[#237EE6] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#1d6bbf] transition-all flex items-center gap-2'
                    >
                      {expandidos[prec.id] ? (
                        <>
                          Ocultar <FiChevronUp size={18} />
                        </>
                      ) : (
                        <>
                          Ver Mais <FiChevronDown size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Detalhes Expandidos */}
                {expandidos[prec.id] && (
                  <div className='mt-6 pt-6 border-t border-gray-200 space-y-6'>
                    {/* Informações de Contato */}
                    <div className='bg-[#F5F7FA] rounded-lg p-4'>
                      <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                        <FiMail className='text-[#237EE6]' size={18} />
                        Informações de Contato
                      </h4>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div className='flex items-center gap-2 text-sm'>
                          <FiMail className='text-gray-500' size={16} />
                          <span className='text-gray-700'>{prec.email}</span>
                        </div>
                        <div className='flex items-center gap-2 text-sm'>
                          <FiPhone className='text-gray-500' size={16} />
                          <span className='text-gray-700'>{prec.telefone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Especialidade Associada */}
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                        <FiStar className='text-[#10E686]' size={18} />
                        Especialidade Associada
                      </h4>
                      {preceptoresComEspecialidade[prec.id] ? (
                        <div className='bg-gradient-to-br from-[#10E686]/10 to-[#60E6D7]/10 rounded-lg p-4 border border-[#10E686]/30'>
                          <div className='flex items-center justify-between'>
                            <div>
                              <p className='font-semibold text-gray-900'>{preceptoresComEspecialidade[prec.id]}</p>
                              <p className='text-xs text-gray-600 mt-1'>Clique em "Especialidade" para alterar</p>
                            </div>
                            <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                              Ativa
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className='bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 text-center'>
                          <p className='text-gray-600 text-sm'>Nenhuma especialidade associada</p>
                          <p className='text-xs text-gray-500 mt-1'>Clique em "Especialidade" para associar uma</p>
                        </div>
                      )}
                    </div>

                    {/* Alocações Ativas */}
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                        <FiClipboard className='text-[#237EE6]' size={18} />
                        Alocações Ativas ({prec.alocacoes.length})
                      </h4>
                      <div className='space-y-4'>
                        {prec.alocacoes.map((aloc) => (
                          <div key={aloc.id} className='bg-gradient-to-br from-[#F5F7FA] to-white rounded-lg p-4 border border-gray-200'>
                            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3'>
                              <div>
                                <p className='font-semibold text-gray-900 text-lg'>{aloc.especialidade}</p>
                                <p className='text-sm text-gray-600 mt-1'>{aloc.local}</p>
                              </div>
                              <span className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                                aloc.status === 'Ativa'
                                  ? 'bg-[#10E686]/20 text-[#10E686]'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {aloc.status}
                              </span>
                            </div>

                            {/* Lista de Alunos */}
                            <div className='mt-3'>
                              <p className='text-sm font-semibold text-gray-700 mb-2'>
                                Alunos Supervisionados ({aloc.alunos.length})
                              </p>
                              <div className='space-y-2'>
                                {aloc.alunos.map((aluno) => (
                                  <div key={aluno.id} className='bg-white rounded-lg p-3 border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                                    <div className='flex-1'>
                                      <p className='font-medium text-gray-900'>{aluno.nome}</p>
                                      <div className='flex flex-wrap gap-3 mt-1 text-xs text-gray-600'>
                                        <span><strong>Matrícula:</strong> {aluno.matricula}</span>
                                        <span><strong>Período:</strong> {aluno.periodo}</span>
                                      </div>
                                    </div>
                                    <button className='shrink-0 text-[#237EE6] hover:underline text-sm font-medium'>
                                      Ver Detalhes
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Associar Especialidade */}
      {modalAssociarEspecialidade && preceptorSelecionado && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full'>
            {/* Header */}
            <div className='bg-gradient-to-r from-[#10E686] to-[#60E6D7] rounded-t-2xl p-4 md:p-6 flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-bold text-white'>Associar Especialidade</h2>
                <p className='text-white/80 text-sm mt-1'>{preceptorSelecionado.nome}</p>
              </div>
              <button
                onClick={() => {
                  setModalAssociarEspecialidade(false)
                  setPreceptorSelecionado(null)
                  setEspecialidadeSelecionada('')
                }}
                className='text-white hover:bg-white/20 p-2 rounded-lg transition-all'
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Conteúdo */}
            <div className='p-6 space-y-4'>
              {/* Status Atual */}
              <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
                <p className='text-sm text-gray-700'>
                  <strong>Especialidade Atual:</strong>{' '}
                  {preceptoresComEspecialidade[preceptorSelecionado.id] ? (
                    <span className='text-[#10E686] font-semibold'>
                      {preceptoresComEspecialidade[preceptorSelecionado.id]}
                    </span>
                  ) : (
                    <span className='text-gray-500 italic'>Nenhuma especialidade associada</span>
                  )}
                </p>
              </div>

              {/* Lista de Especialidades */}
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-3'>
                  Selecione uma Especialidade
                </label>
                <div className='space-y-2 max-h-96 overflow-y-auto'>
                  {especialidades.map((esp) => (
                    <label
                      key={esp.id}
                      className='flex items-center p-3 rounded-lg border-2 cursor-pointer hover:bg-blue-50 transition-all'
                      style={{
                        borderColor: especialidadeSelecionada === esp.id ? '#237EE6' : '#E5E7EB',
                        backgroundColor: especialidadeSelecionada === esp.id ? '#EEF5FF' : 'white'
                      }}
                    >
                      <input
                        type='radio'
                        name='especialidade'
                        value={esp.id}
                        checked={especialidadeSelecionada === esp.id}
                        onChange={(e) => setEspecialidadeSelecionada(Number(e.target.value))}
                        className='w-4 h-4 text-[#237EE6] cursor-pointer'
                      />
                      <div className='ml-3 flex-1'>
                        <p className='font-medium text-gray-900'>{esp.nome}</p>
                        <p className='text-xs text-gray-500'>{esp.codigo}</p>
                      </div>
                      {especialidadeSelecionada === esp.id && (
                        <FiCheck className='text-[#10E686]' size={20} />
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer com Botões */}
            <div className='bg-gray-50 rounded-b-2xl p-6 flex gap-3 justify-end border-t border-gray-200'>
              <button
                onClick={() => {
                  setModalAssociarEspecialidade(false)
                  setPreceptorSelecionado(null)
                  setEspecialidadeSelecionada('')
                }}
                className='px-6 py-2 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-all'
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (especialidadeSelecionada) {
                    const especialidadeNome = especialidades.find(e => e.id === especialidadeSelecionada)?.nome
                    setPreceptoresComEspecialidade(prev => ({
                      ...prev,
                      [preceptorSelecionado.id]: especialidadeNome
                    }))
                    setModalAssociarEspecialidade(false)
                    setPreceptorSelecionado(null)
                    setEspecialidadeSelecionada('')
                  }
                }}
                disabled={!especialidadeSelecionada}
                className='px-4 md:px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#10E686] to-[#60E6D7] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
