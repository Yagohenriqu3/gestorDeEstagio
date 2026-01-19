import { FiAlertCircle, FiDownload, FiPlus, FiEdit2, FiEye } from 'react-icons/fi'

export default function AlunosNaoAlocadosAdm({ alunos_nao_alocados }) {
  const handleExportar = () => {
    const csv = [
      ['ID', 'Aluno', 'Matrícula', 'Período', 'Instituição', 'Unidade', 'Dias Sem Alocação', 'Status'].join(','),
      ...alunos_nao_alocados.map(a =>
        [a.id, a.nome, a.matricula, a.periodo, a.instituicao, a.unidade, a.dias_sem_alocacao, a.status_demanda].join(',')
      )
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `alunos_nao_alocados_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const alunos_urgentes = alunos_nao_alocados.filter(a => a.dias_sem_alocacao > 30)
  const alunos_aviso = alunos_nao_alocados.filter(a => a.dias_sem_alocacao <= 30 && a.dias_sem_alocacao > 14)
  const alunos_normal = alunos_nao_alocados.filter(a => a.dias_sem_alocacao <= 14)

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiAlertCircle size={32} /> Alunos Não Alocados (Gestão de Demandas)</h2>
        <div className='flex gap-3'>
          <button 
            onClick={handleExportar}
            className='bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold px-6 py-2 rounded-lg hover:bg-[#F5F7FA] transition-all flex items-center gap-2'
          >
            <FiDownload size={18} /> Exportar
          </button>
          <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2'>
            <FiPlus size={18} /> Criar Vaga
          </button>
        </div>
      </div>

      {/* Alerta Geral */}
      {alunos_urgentes.length > 0 && (
        <div className='bg-red-50 border-l-4 border-red-500 p-4 rounded-lg'>
          <h3 className='font-semibold text-red-800 mb-1'>⚠️ Alunos com Alocação Urgente Necessária</h3>
          <p className='text-sm text-red-700'>
            {alunos_urgentes.length} aluno(s) aguardando alocação há mais de 30 dias. Ação imediata recomendada.
          </p>
        </div>
      )}

      {/* Resumo por Status */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white rounded-xl shadow-md p-4'>
          <h4 className='text-sm font-semibold text-gray-600'>Total Não Alocados</h4>
          <p className='text-3xl font-bold text-[#237EE6] mt-1'>{alunos_nao_alocados.length}</p>
        </div>
        <div className='bg-red-50 rounded-xl shadow-md p-4 border border-red-200'>
          <h4 className='text-sm font-semibold text-red-700'>● Urgente (mais de 30 dias)</h4>
          <p className='text-3xl font-bold text-red-600 mt-1'>{alunos_urgentes.length}</p>
        </div>
        <div className='bg-yellow-50 rounded-xl shadow-md p-4 border border-yellow-200'>
          <h4 className='text-sm font-semibold text-yellow-700'>● Atenção (15-30 dias)</h4>
          <p className='text-3xl font-bold text-yellow-600 mt-1'>{alunos_aviso.length}</p>
        </div>
        <div className='bg-blue-50 rounded-xl shadow-md p-4 border border-blue-200'>
          <h4 className='text-sm font-semibold text-blue-700'>● Normal (até 15 dias)</h4>
          <p className='text-3xl font-bold text-blue-600 mt-1'>{alunos_normal.length}</p>
        </div>
      </div>

      {/* Alunos Urgentes */}
      {alunos_urgentes.length > 0 && (
        <div className='bg-white rounded-2xl shadow-md overflow-hidden border-t-4 border-red-500'>
          <div className='bg-red-50 px-6 py-4 border-b border-gray-200'>
            <h3 className='font-bold text-gray-900 flex items-center gap-2'>
              <span className='w-3 h-3 bg-red-500 rounded-full'></span>
              Alocação Urgente ({alunos_urgentes.length})
            </h3>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b-2 border-gray-200 bg-[#F5F7FA]'>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Período</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição/Unidade</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Dias Sem Alocação</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos_urgentes.map((aluno) => (
                  <tr key={aluno.id} className='border-b border-gray-200 hover:bg-red-50 transition-colors'>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>{aluno.nome}</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>{aluno.periodo}º período</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>{aluno.instituicao} / {aluno.unidade}</td>
                    <td className='px-6 py-4'>
                      <span className='px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold'>
                        {aluno.dias_sem_alocacao} dias
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex gap-2'>
                        <button className='px-3 py-1 text-xs text-white bg-linear-to-r from-[#237EE6] to-[#60C9E6] rounded hover:shadow-md transition-all'>
                          Alocar Agora
                        </button>
                        <button className='p-1 text-gray-600 hover:bg-gray-100 rounded transition-all'>
                          <FiEye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Alunos em Atenção */}
      {alunos_aviso.length > 0 && (
        <div className='bg-white rounded-2xl shadow-md overflow-hidden border-t-4 border-yellow-500'>
          <div className='bg-yellow-50 px-6 py-4 border-b border-gray-200'>
            <h3 className='font-bold text-gray-900 flex items-center gap-2'>
              <span className='w-3 h-3 bg-yellow-500 rounded-full'></span>
              Alocação em Atenção ({alunos_aviso.length})
            </h3>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b-2 border-gray-200 bg-[#F5F7FA]'>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Período</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição/Unidade</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Dias Sem Alocação</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos_aviso.map((aluno) => (
                  <tr key={aluno.id} className='border-b border-gray-200 hover:bg-yellow-50 transition-colors'>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>{aluno.nome}</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>{aluno.periodo}º período</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>{aluno.instituicao} / {aluno.unidade}</td>
                    <td className='px-6 py-4'>
                      <span className='px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold'>
                        {aluno.dias_sem_alocacao} dias
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex gap-2'>
                        <button className='px-3 py-1 text-xs text-white bg-linear-to-r from-[#237EE6] to-[#60C9E6] rounded hover:shadow-md transition-all'>
                          Alocar
                        </button>
                        <button className='p-1 text-gray-600 hover:bg-gray-100 rounded transition-all'>
                          <FiEye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Alunos Normais */}
      {alunos_normal.length > 0 && (
        <div className='bg-white rounded-2xl shadow-md overflow-hidden border-t-4 border-blue-500'>
          <div className='bg-blue-50 px-6 py-4 border-b border-gray-200'>
            <h3 className='font-bold text-gray-900 flex items-center gap-2'>
              <span className='w-3 h-3 bg-blue-500 rounded-full'></span>
              Alocação em Prazos Normais ({alunos_normal.length})
            </h3>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b-2 border-gray-200 bg-[#F5F7FA]'>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Período</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição/Unidade</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Dias Sem Alocação</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos_normal.slice(0, 5).map((aluno) => (
                  <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>{aluno.nome}</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>{aluno.periodo}º período</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>{aluno.instituicao} / {aluno.unidade}</td>
                    <td className='px-6 py-4'>
                      <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold'>
                        {aluno.dias_sem_alocacao} dias
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex gap-2'>
                        <button className='p-1 text-gray-600 hover:bg-gray-100 rounded transition-all'>
                          <FiEdit2 size={16} />
                        </button>
                        <button className='p-1 text-gray-600 hover:bg-gray-100 rounded transition-all'>
                          <FiEye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {alunos_normal.length > 5 && (
            <div className='p-4 text-center border-t border-gray-200'>
              <button className='text-[#237EE6] font-semibold hover:underline'>
                Ver todos os {alunos_normal.length} alunos
              </button>
            </div>
          )}
        </div>
      )}

      {alunos_nao_alocados.length === 0 && (
        <div className='bg-[#10E686]/10 border border-[#10E686] rounded-lg p-8 text-center'>
          <p className='text-lg font-semibold text-gray-900'>✓ Todos os alunos estão alocados!</p>
          <p className='text-gray-600 mt-1'>Não há alunos pendentes de alocação neste momento.</p>
        </div>
      )}
    </div>
  )
}
