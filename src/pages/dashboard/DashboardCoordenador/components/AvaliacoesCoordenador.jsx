import { FiBarChart2, FiClipboard, FiCheckCircle, FiAlertCircle, FiAward, FiUsers, FiEye } from 'react-icons/fi'

const AvaliacoesCoordenador = ({ avaliacoesAlunos }) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiBarChart2 size={32} /> Avaliações dos Alunos</h2>
      
      {/* Cards de Resumo */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Total Avaliações</h3>
            <FiClipboard size={32} className='text-[#237EE6]' />
          </div>
          <p className='text-4xl font-bold text-[#237EE6] mb-2'>{avaliacoesAlunos.length}</p>
          <p className='text-sm text-gray-600'>Registradas</p>
        </div>

        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Avaliações Realizadas</h3>
            <FiCheckCircle size={32} className='text-[#10E686]' />
          </div>
          <p className='text-4xl font-bold text-[#10E686] mb-2'>{avaliacoesAlunos.filter(a => a.status === 'Realizada').length}</p>
          <p className='text-sm text-gray-600'>Concluídas</p>
        </div>

        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Avaliações Pendentes</h3>
            <FiAlertCircle size={32} className='text-orange-500' />
          </div>
          <p className='text-4xl font-bold text-orange-500 mb-2'>{avaliacoesAlunos.filter(a => a.status === 'Pendente').length}</p>
          <p className='text-sm text-gray-600'>Aguardando</p>
        </div>

        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Média Geral</h3>
            <FiAward size={32} className='text-[#60C9E6]' />
          </div>
          <p className='text-4xl font-bold text-[#60C9E6] mb-2'>
            {avaliacoesAlunos.filter(a => a.nota !== null).length > 0
              ? (avaliacoesAlunos.filter(a => a.nota !== null).reduce((acc, a) => acc + a.nota, 0) / avaliacoesAlunos.filter(a => a.nota !== null).length).toFixed(1)
              : '-'}
          </p>
          <p className='text-sm text-gray-600'>Nota média</p>
        </div>
      </div>

      {/* Tabela de Avaliações */}
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='p-6 border-b border-gray-200'>
          <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={28} /> Avaliações por Aluno e Componente</h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200 bg-gray-50'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Componente</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Nota</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Data Avaliação</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Feedback</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {avaliacoesAlunos.map((aval) => (
                <tr key={aval.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                  <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aval.nome_aluno}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aval.componente}</td>
                  <td className='px-6 py-4'>
                    {aval.nota !== null ? (
                      <div className='flex items-center gap-2'>
                        <span className={`text-lg font-bold ${
                          aval.nota >= 9.0
                            ? 'text-[#10E686]'
                            : aval.nota >= 7.0
                            ? 'text-[#60C9E6]'
                            : 'text-orange-500'
                        }`}>
                          {aval.nota.toFixed(1)}
                        </span>
                      </div>
                    ) : (
                      <span className='text-gray-400'>-</span>
                    )}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aval.data_avaliacao || '-'}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aval.preceptor}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aval.feedback}</td>
                  <td className='px-6 py-4'>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      aval.status === 'Realizada'
                        ? 'bg-[#10E686]/20 text-[#10E686]'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {aval.status}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                      <FiEye size={16} /> Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AvaliacoesCoordenador
