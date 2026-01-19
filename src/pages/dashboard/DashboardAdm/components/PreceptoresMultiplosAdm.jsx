import { useState, useMemo } from 'react'
import { FiClipboard, FiPlus, FiChevronDown, FiChevronUp, FiFilter, FiPhone, FiMail, FiDownload } from 'react-icons/fi'

export default function PreceptoresMultiplosAdm({ preceptores = [], instituicoes = [], handleExportar }) {
  const [filtroInstituicao, setFiltroInstituicao] = useState('todos')
  const [filtroUnidade, setFiltroUnidade] = useState('todos')
  const [busca, setBusca] = useState('')
  const [expandidos, setExpandidos] = useState({})

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

                  {/* Botão Ver Mais */}
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
    </div>
  )
}
