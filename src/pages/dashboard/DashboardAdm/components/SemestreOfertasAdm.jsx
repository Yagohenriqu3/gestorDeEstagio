import { useState } from 'react'
import { FiTrendingUp, FiDownload, FiPlus, FiCheckCircle, FiCalendar, FiUsers, FiClock, FiAlertTriangle, FiMapPin, FiFilter } from 'react-icons/fi'
import NovoSemestre from '../../../../components/forms/NovoSemestre'

export default function SemestreOfertasAdm({ ofertas = [] }) {
  const [semestreSelecionado, setSemestreSelecionado] = useState('todos')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [listaSemestres, setListaSemestres] = useState(ofertas)

  // Extrair semestres únicos das ofertas
  const semestresDisponiveis = [...new Set(listaSemestres.map(o => `${o.ano_letivo}.${o.semestre}`))].sort().reverse()

  // Filtrar ofertas pelo semestre selecionado
  const ofertasFiltradas = semestreSelecionado === 'todos'
    ? listaSemestres
    : listaSemestres.filter(o => `${o.ano_letivo}.${o.semestre}` === semestreSelecionado)

  const resumoHorasExigidas = ofertasFiltradas.reduce((total, o) => total + (o.horas_praticas_exigidas || 0), 0)
  const resumoHorasOfertadas = ofertasFiltradas.reduce((total, o) => total + (o.horas_praticas_ofertadas || 0), 0)
  const resumoAlunosPrevistos = ofertasFiltradas.reduce((total, o) => total + (o.total_alunos_previstos || 0), 0)
  const resumoAlunosAlocados = ofertasFiltradas.reduce((total, o) => total + (o.alunos_alocados || 0), 0)
  const resumoAlunosPendentes = ofertasFiltradas.reduce((total, o) => total + (o.alunos_pendentes || 0), 0)

  const proximosFormandos = ofertasFiltradas
    .flatMap(o => o?.proximos_formandos || [])
    .sort((a, b) => (a.faltam_horas || 0) - (b.faltam_horas || 0))
    .slice(0, 4)

  const alunosNaoAlocados = ofertasFiltradas
    .flatMap(o => o?.alunos_nao_alocados || [])
    .sort((a, b) => (b.dias_sem_alocacao || 0) - (a.dias_sem_alocacao || 0))

  const diasSemAlocacaoMax = alunosNaoAlocados[0]?.dias_sem_alocacao || 0
  const diasSemAlocacaoMedio = alunosNaoAlocados.length
    ? Math.round(alunosNaoAlocados.reduce((total, aluno) => total + (aluno.dias_sem_alocacao || 0), 0) / alunosNaoAlocados.length)
    : 0

  const handleExportar = () => {
    const header = ['ID', 'Ano', 'Semestre', 'Descrição', 'Curso', 'Unidade', 'Horas Exigidas', 'Horas Ofertadas', 'Alunos Previstos', 'Alunos Alocados', 'Alunos Pendentes', 'Status', 'Início', 'Fim']
    const csv = [
      header.join(','),
      ...ofertasFiltradas.map(o => [
        o.id_oferta_semestre || o.id,
        o.ano_letivo,
        o.semestre,
        o.descricao,
        o.curso || o.curriculo,
        o.unidade,
        o.horas_praticas_exigidas,
        o.horas_praticas_ofertadas,
        o.total_alunos_previstos,
        o.alunos_alocados,
        o.alunos_pendentes,
        o.status,
        o.data_inicio,
        o.data_fim
      ].join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ofertas_semestre_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const statusClass = (status) => {
    if (!status) return 'bg-gray-100 text-gray-700'
    const label = status.toLowerCase()
    if (label.includes('ando') || label.includes('ativo')) return 'bg-[#10E686]/20 text-[#0E9F6E]'
    if (label.includes('plane')) return 'bg-blue-100 text-blue-700'
    if (label.includes('vigen')) return 'bg-[#237EE6]/10 text-[#237EE6]'
    return 'bg-gray-200 text-gray-700'
  }

  const percent = (part, whole) => {
    if (!whole || whole === 0) return 0
    return Math.min(100, Math.round((part / whole) * 100))
  }

  const handleSalvarSemestre = (novoSemestre) => {
    setListaSemestres(prev => [...prev, novoSemestre])
    setMostrarFormulario(false)
  }

  const handleVoltar = () => {
    setMostrarFormulario(false)
  }

  // Se está mostrando o formulário, renderiza apenas ele
  if (mostrarFormulario) {
    return <NovoSemestre onVoltar={handleVoltar} onSalvar={handleSalvarSemestre} />
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiTrendingUp size={32} /> Semestre e Ofertas de Estágio</h2>
        <div className='flex flex-wrap gap-3'>
          <button
            onClick={handleExportar}
            className='bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold px-6 py-2 rounded-lg hover:bg-[#F5F7FA] transition-all flex items-center gap-2'
          >
            <FiDownload size={18} /> Exportar
          </button>
          <button 
            onClick={() => setMostrarFormulario(true)}
            className='bg-white border-2 border-[#10E686] text-[#10E686] font-semibold px-6 py-2 rounded-lg hover:bg-[#F5F7FA] transition-all flex items-center gap-2'
          >
            <FiPlus size={18} /> Novo Semestre
          </button>
          <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2'>
            <FiPlus size={18} /> Nova Oferta
          </button>
        </div>
      </div>

      {/* Filtro de semestre */}
      <div className='bg-white rounded-xl shadow-md p-4'>
        <div className='flex flex-col md:flex-row md:items-center gap-4'>
          <div className='flex items-center gap-2'>
            <FiFilter className='text-[#237EE6]' size={20} />
            <label className='font-semibold text-gray-900'>Filtrar por Semestre:</label>
          </div>
          <div className='flex-1 max-w-md'>
            <select
              value={semestreSelecionado}
              onChange={(e) => setSemestreSelecionado(e.target.value)}
              className='w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#237EE6] focus:outline-none font-medium text-gray-900'
            >
              <option value='todos'>Todos os semestres</option>
              {semestresDisponiveis.map(sem => (
                <option key={sem} value={sem}>
                  {sem.replace('.', '/')} - {sem.split('.')[1] === '1' ? '1º Semestre' : '2º Semestre'}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <FiCalendar />
            <span>
              {semestreSelecionado === 'todos' 
                ? `${ofertasFiltradas.length} ofertas no total` 
                : `${ofertasFiltradas.length} oferta(s) em ${semestreSelecionado.replace('.', '/')}`
              }
            </span>
          </div>
        </div>
      </div>

      {/* Resumo operacional */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <div className='bg-white rounded-xl shadow-md p-4 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600 text-sm'>Cobertura de horas</span>
            <FiClock className='text-[#237EE6]' />
          </div>
          <div className='text-2xl font-bold text-gray-900'>{resumoHorasOfertadas}h / {resumoHorasExigidas}h</div>
          <div className='w-full bg-gray-100 rounded-full h-2'>
            <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full' style={{ width: `${percent(resumoHorasOfertadas, resumoHorasExigidas)}%` }}></div>
          </div>
          <p className='text-xs text-gray-600'>Horas práticas ofertadas x exigidas pelo currículo</p>
        </div>

        <div className='bg-white rounded-xl shadow-md p-4 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600 text-sm'>Alocação</span>
            <FiUsers className='text-[#237EE6]' />
          </div>
          <div className='text-2xl font-bold text-gray-900'>{resumoAlunosAlocados}/{resumoAlunosPrevistos}</div>
          <div className='w-full bg-gray-100 rounded-full h-2'>
            <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full' style={{ width: `${percent(resumoAlunosAlocados, resumoAlunosPrevistos)}%` }}></div>
          </div>
          <p className='text-xs text-gray-600'>Pendentes: {resumoAlunosPendentes}</p>
        </div>

        <div className='bg-white rounded-xl shadow-md p-4 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600 text-sm'>Prioridade (formandos)</span>
            <FiAlertTriangle className='text-amber-500' />
          </div>
          <div className='text-2xl font-bold text-gray-900'>{proximosFormandos.length}</div>
          <p className='text-xs text-gray-600'>Ordenado pelos que faltam menos horas</p>
          <div className='space-y-1'>
            {proximosFormandos.map(aluno => (
              <div key={aluno.id} className='flex items-center justify-between text-xs text-gray-700'>
                <span className='font-semibold text-gray-900'>{aluno.nome}</span>
                <span>{aluno.periodo} · faltam {aluno.faltam_horas}h</span>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-4 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600 text-sm'>Sem alocação</span>
            <FiClock className='text-amber-500' />
          </div>
          <div className='text-2xl font-bold text-gray-900'>{alunosNaoAlocados.length}</div>
          <p className='text-xs text-gray-600'>Média {diasSemAlocacaoMedio} dias · Máximo {diasSemAlocacaoMax} dias</p>
        </div>
      </div>

      {/* Lista de ofertas */}
      {ofertasFiltradas.length === 0 ? (
        <div className='bg-white rounded-2xl shadow-md p-12 text-center'>
          <FiCalendar size={48} className='mx-auto text-gray-300 mb-4' />
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>Nenhuma oferta encontrada</h3>
          <p className='text-gray-600'>
            {semestreSelecionado === 'todos' 
              ? 'Não há ofertas cadastradas. Crie uma nova oferta para começar.'
              : `Não há ofertas para o semestre ${semestreSelecionado.replace('.', '/')}. Tente outro período.`
            }
          </p>
        </div>
      ) : (
        ofertasFiltradas.map((oferta) => {
        const alocPerc = percent(oferta.alunos_alocados || 0, oferta.total_alunos_previstos || 0)
        const horasPerc = percent(oferta.horas_praticas_ofertadas || 0, oferta.horas_praticas_exigidas || 0)
        const diasMax = Math.max(0, ...((oferta.alunos_nao_alocados || []).map(a => a.dias_sem_alocacao || 0)))

        return (
          <div key={oferta.id_oferta_semestre || oferta.id} className='bg-white rounded-2xl shadow-md p-6 space-y-4'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-500'>Oferta {oferta.id_oferta_semestre || oferta.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(oferta.status)}`}>{oferta.status}</span>
                </div>
                <h3 className='text-2xl font-bold text-gray-900'>{oferta.descricao}</h3>
                <div className='flex flex-wrap gap-3 text-sm text-gray-600'>
                  <span className='flex items-center gap-1'><FiCalendar /> {oferta.ano_letivo}.{oferta.semestre}</span>
                  <span className='flex items-center gap-1'><FiMapPin /> {oferta.unidade}</span>
                  <span className='flex items-center gap-1'><FiUsers /> {oferta.curso || oferta.curriculo}</span>
                  <span className='flex items-center gap-1'><FiClock /> {oferta.data_inicio} - {oferta.data_fim}</span>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='bg-[#F5F7FA] text-[#237EE6] px-3 py-2 rounded-lg text-sm font-semibold'>Previstos: {oferta.total_alunos_previstos}</div>
                <div className='bg-[#F5F7FA] text-[#237EE6] px-3 py-2 rounded-lg text-sm font-semibold'>Alocados: {oferta.alunos_alocados}</div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
              <div className='border rounded-xl p-3 bg-[#F8FAFC]'>
                <p className='text-xs text-gray-500'>Horas práticas</p>
                <p className='text-lg font-bold text-gray-900'>{oferta.horas_praticas_ofertadas}h / {oferta.horas_praticas_exigidas}h</p>
                <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
                  <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full' style={{ width: `${horasPerc}%` }}></div>
                </div>
              </div>
              <div className='border rounded-xl p-3 bg-[#F8FAFC]'>
                <p className='text-xs text-gray-500'>Alocação</p>
                <p className='text-lg font-bold text-gray-900'>{oferta.alunos_alocados}/{oferta.total_alunos_previstos}</p>
                <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
                  <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full' style={{ width: `${alocPerc}%` }}></div>
                </div>
                <p className='text-xs text-gray-600 mt-1'>Pendentes: {oferta.alunos_pendentes}</p>
              </div>
              <div className='border rounded-xl p-3 bg-[#F8FAFC]'>
                <p className='text-xs text-gray-500'>Sem alocação</p>
                <p className='text-lg font-bold text-gray-900'>Média {oferta.dias_sem_alocar_media || 0} dias</p>
                <p className='text-xs text-gray-600 mt-1'>Máximo {diasMax || 0} dias sem alocação</p>
              </div>
              <div className='border rounded-xl p-3 bg-[#F8FAFC]'>
                <p className='text-xs text-gray-500'>Convênios ativos</p>
                <p className='text-lg font-bold text-gray-900'>{oferta.convenios?.length || 0}</p>
                <p className='text-xs text-gray-600 mt-1'>Renovação: {(oferta.convenios || []).filter(c => c.renovacao_automatica).length} automática(s)</p>
              </div>
            </div>

            {oferta.observacoes && (
              <div className='bg-blue-50 border border-blue-100 text-blue-900 rounded-xl p-3 text-sm flex items-start gap-2'>
                <FiCheckCircle className='mt-0.5' />
                <div>
                  <p className='font-semibold'>Observações</p>
                  <p>{oferta.observacoes}</p>
                </div>
              </div>
            )}

            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <h4 className='text-lg font-semibold text-gray-900'>Rodízios</h4>
                <span className='text-xs text-gray-500'>Ordem de execução e componentes</span>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                {(oferta.rodizios || []).map((rodizio) => {
                  const ocupacao = percent(rodizio.vagas_ocupadas || 0, rodizio.vagas_total || 0)
                  return (
                    <div key={rodizio.id_rodizio} className='border rounded-xl p-4 space-y-3'>
                      <div className='flex items-center justify-between'>
                        <div className='space-y-1'>
                          <div className='flex items-center gap-2'>
                            <span className='w-3 h-3 rounded-full' style={{ backgroundColor: rodizio.cor_identificacao || '#CBD5E1' }}></span>
                            <p className='text-sm text-gray-500'>Rodízio {rodizio.ordem_execucao}</p>
                          </div>
                          <p className='text-lg font-semibold text-gray-900'>{rodizio.nome_rodizio}</p>
                          <p className='text-xs text-gray-600'>Código {rodizio.codigo_rodizio} · {rodizio.data_inicio} - {rodizio.data_fim}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(rodizio.status)}`}>{rodizio.status}</span>
                      </div>
                      <div className='space-y-1'>
                        <div className='flex items-center justify-between text-sm text-gray-700'>
                          <span>Vagas</span>
                          <span className='font-semibold'>{rodizio.vagas_ocupadas}/{rodizio.vagas_total}</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2'>
                          <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full' style={{ width: `${ocupacao}%` }}></div>
                        </div>
                      </div>

                      {(rodizio.componentes || []).length > 0 && (
                        <div className='bg-[#F8FAFC] border border-gray-100 rounded-lg overflow-hidden'>
                          <table className='w-full text-xs'>
                            <thead className='bg-gray-100 text-gray-700'>
                              <tr>
                                <th className='text-left px-3 py-2 font-semibold'>Componente</th>
                                <th className='text-left px-3 py-2 font-semibold'>Período</th>
                                <th className='text-left px-3 py-2 font-semibold'>CH/sem</th>
                                <th className='text-left px-3 py-2 font-semibold'>Vagas</th>
                                <th className='text-left px-3 py-2 font-semibold'>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rodizio.componentes.map(comp => (
                                <tr key={comp.id_oferta_componente} className='border-t border-gray-100'>
                                  <td className='px-3 py-2 text-gray-900'>{comp.nome_componente}</td>
                                  <td className='px-3 py-2 text-gray-700'>{comp.data_inicio_componente} - {comp.data_fim_componente}</td>
                                  <td className='px-3 py-2 text-gray-700'>{comp.carga_horaria_semanal}h</td>
                                  <td className='px-3 py-2 text-gray-700'>{comp.vagas_disponiveis}</td>
                                  <td className='px-3 py-2'>
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${statusClass(comp.status)}`}>{comp.status}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h4 className='text-lg font-semibold text-gray-900'>Convênios vigentes</h4>
                <span className='text-xs text-gray-500'>Renovação e vigência</span>
              </div>
              <div className='overflow-x-auto border rounded-xl'>
                <table className='w-full text-sm'>
                  <thead className='bg-[#F5F7FA] text-gray-700'>
                    <tr>
                      <th className='text-left px-4 py-3 font-semibold'>Número</th>
                      <th className='text-left px-4 py-3 font-semibold'>Tipo</th>
                      <th className='text-left px-4 py-3 font-semibold'>Local</th>
                      <th className='text-left px-4 py-3 font-semibold'>Vigência</th>
                      <th className='text-left px-4 py-3 font-semibold'>Renovação</th>
                      <th className='text-left px-4 py-3 font-semibold'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(oferta.convenios || []).map((conv) => (
                      <tr key={conv.id_convenio} className='border-t border-gray-200'>
                        <td className='px-4 py-3 font-semibold text-gray-900'>{conv.numero_convenio}</td>
                        <td className='px-4 py-3 text-gray-700'>{conv.tipo_convenio}</td>
                        <td className='px-4 py-3 text-gray-700'>{conv.local}</td>
                        <td className='px-4 py-3 text-gray-700'>{conv.data_inicio_vigencia} - {conv.data_fim_vigencia}</td>
                        <td className='px-4 py-3 text-gray-700'>{conv.renovacao_automatica ? `Automática (${conv.prazo_aviso_renovacao} dias)` : 'Manual'}</td>
                        <td className='px-4 py-3'>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(conv.status)}`}>{conv.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div className='border rounded-xl p-4 bg-white'>
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='text-lg font-semibold text-gray-900'>Formandos prioritários</h4>
                  <FiAlertTriangle className='text-amber-500' />
                </div>
                <div className='space-y-2'>
                  {(oferta.proximos_formandos || []).map(aluno => (
                    <div key={aluno.id} className='flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2'>
                      <div>
                        <p className='font-semibold text-gray-900'>{aluno.nome}</p>
                        <p className='text-xs text-gray-600'>{aluno.periodo} · faltam {aluno.faltam_horas}h</p>
                      </div>
                      <span className='text-xs text-gray-500'>Sem alocar há {aluno.dias_sem_alocacao} dias</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='border rounded-xl p-4 bg-white'>
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='text-lg font-semibold text-gray-900'>Alunos sem alocação</h4>
                  <FiClock className='text-amber-500' />
                </div>
                <div className='space-y-2'>
                  {(oferta.alunos_nao_alocados || []).map(aluno => (
                    <div key={aluno.id} className='flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2'>
                      <div>
                        <p className='font-semibold text-gray-900'>{aluno.nome}</p>
                        <p className='text-xs text-gray-600'>Matrícula {aluno.matricula} · {aluno.periodo}</p>
                      </div>
                      <span className='text-xs text-gray-500'>{aluno.dias_sem_alocacao} dias</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }))}

      {/* Informações sobre Controle de Ofertas */}
      <div className='bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6'>
        <h4 className='font-bold text-gray-900 text-lg mb-3 flex items-center gap-2'>
          <FiCheckCircle size={20} className='text-blue-600' />
          O que é Controle de Oferta de Estágio?
        </h4>
        
        <div className='space-y-4'>
          <p className='text-sm text-gray-700 leading-relaxed'>
            O <strong>Controle de Oferta</strong> é o processo gerenciado pelo <strong>Coordenador</strong> que define todas as vagas de estágio disponíveis em um semestre letivo. 
            O <strong>Administrador</strong> possui visão completa dessas ofertas para acompanhar métricas e garantir que o planejamento está sendo cumprido.
          </p>

          <div className='bg-white rounded-xl p-4 border border-blue-100'>
            <h5 className='font-semibold text-gray-900 mb-3'>Como funciona:</h5>
            <div className='space-y-3'>
              <div className='flex gap-3'>
                <div className='shrink-0 w-8 h-8 bg-[#237EE6] text-white rounded-full flex items-center justify-center font-bold text-sm'>1</div>
                <div>
                  <p className='font-semibold text-gray-900 text-sm'>Currículo define as exigências</p>
                  <p className='text-xs text-gray-600'>Cada curso possui um currículo que estabelece as disciplinas/especialidades obrigatórias e suas cargas horárias. 
                  Ex: <em>Clínica Médica I</em> exige 120 horas práticas.</p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className='shrink-0 w-8 h-8 bg-[#237EE6] text-white rounded-full flex items-center justify-center font-bold text-sm'>2</div>
                <div>
                  <p className='font-semibold text-gray-900 text-sm'>Coordenador cria a Oferta do Semestre</p>
                  <p className='text-xs text-gray-600'>Para cada semestre letivo, o coordenador define quantas vagas serão ofertadas para cada disciplina/especialidade, 
                  divididas em <strong>rodízios</strong> (períodos de rotação) e <strong>componentes curriculares</strong> (atividades específicas dentro do rodízio).</p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className='shrink-0 w-8 h-8 bg-[#237EE6] text-white rounded-full flex items-center justify-center font-bold text-sm'>3</div>
                <div>
                  <p className='font-semibold text-gray-900 text-sm'>Vaga vincula Oferta + Local + Convênio</p>
                  <p className='text-xs text-gray-600'>Cada vaga criada está vinculada a uma oferta (currículo + disciplina + semestre), 
                  a um local de estágio (ex: Hospital Universitário) e, quando necessário, a um convênio vigente que autoriza o uso daquele espaço.</p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className='shrink-0 w-8 h-8 bg-[#237EE6] text-white rounded-full flex items-center justify-center font-bold text-sm'>4</div>
                <div>
                  <p className='font-semibold text-gray-900 text-sm'>Aluno é alocado e cumpre a frequência</p>
                  <p className='text-xs text-gray-600'>O aluno é alocado em uma vaga e deve cumprir a carga horária exigida pela disciplina. 
                  O sistema de <strong>Frequência</strong> registra as horas cumpridas, permitindo que coordenadores e ADM validem se o aluno atingiu as 120h (ou outra CH) necessárias.</p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className='shrink-0 w-8 h-8 bg-[#10E686] text-white rounded-full flex items-center justify-center font-bold text-sm'>✓</div>
                <div>
                  <p className='font-semibold text-gray-900 text-sm'>Controle completo e priorização inteligente</p>
                  <p className='text-xs text-gray-600'>O sistema monitora alunos não alocados, prioriza formandos que faltam menos horas para se formar 
                  e alerta quando há alunos há muito tempo sem alocação, garantindo que todos cumpram os requisitos no prazo.</p>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            <div className='bg-white rounded-lg p-3 border border-blue-100'>
              <p className='text-xs font-semibold text-gray-900 mb-1'>📚 Parâmetros controlados</p>
              <ul className='text-xs text-gray-600 space-y-0.5'>
                <li>• Carga horária exigida x ofertada</li>
                <li>• Vagas totais x ocupadas</li>
                <li>• Período de execução (datas)</li>
                <li>• Locais e convênios vigentes</li>
              </ul>
            </div>

            <div className='bg-white rounded-lg p-3 border border-blue-100'>
              <p className='text-xs font-semibold text-gray-900 mb-1'>⚠️ Alertas e prioridades</p>
              <ul className='text-xs text-gray-600 space-y-0.5'>
                <li>• Formandos com menos horas faltantes</li>
                <li>• Alunos há X dias sem alocação</li>
                <li>• Convênios próximos do vencimento</li>
                <li>• Rodízios com vagas ociosas</li>
              </ul>
            </div>

            <div className='bg-white rounded-lg p-3 border border-blue-100'>
              <p className='text-xs font-semibold text-gray-900 mb-1'>🎯 Objetivo do controle</p>
              <ul className='text-xs text-gray-600 space-y-0.5'>
                <li>• Garantir cumprimento curricular</li>
                <li>• Otimizar ocupação de vagas</li>
                <li>• Evitar atrasos na formatura</li>
                <li>• Facilitar gestão de frequência</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
