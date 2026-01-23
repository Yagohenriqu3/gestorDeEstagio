import { FiUsers, FiCheckCircle, FiTrendingUp, FiClipboard, FiBarChart2, FiMapPin, FiEye } from 'react-icons/fi'

const VisaoGeralPreceptor = ({ preceptor, vinculos, alunos, totalInstituicoes, instituicoesStats }) => {
  return (
    <div className='space-y-8'>
      {/* Cards Principais */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {/* Card Alunos */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Alunos</h3>
            <FiUsers size={32} className='text-[#237EE6]' />
          </div>
          <p className='text-4xl font-bold text-[#237EE6] mb-2'>{preceptor.total_alunos}</p>
          <p className='text-sm text-gray-600'>Sob supervisão</p>
        </div>

        {/* Card Frequências Pendentes */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Frequências</h3>
            <FiCheckCircle size={32} className='text-yellow-500' />
          </div>
          <p className='text-4xl font-bold text-yellow-600 mb-2'>{preceptor.frequencias_pendentes}</p>
          <p className='text-sm text-gray-600'>Aguardando validação</p>
        </div>

        {/* Card Avaliações Pendentes */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Avaliações</h3>
            <FiTrendingUp size={32} className='text-[#60E6D7]' />
          </div>
          <p className='text-4xl font-bold text-[#60E6D7] mb-2'>{preceptor.avaliacoes_pendentes}</p>
          <p className='text-sm text-gray-600'>Pendentes</p>
        </div>

        {/* Card Vínculos */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Vínculos</h3>
            <FiClipboard size={32} className='text-[#10E686]' />
          </div>
          <p className='text-4xl font-bold text-[#10E686] mb-2'>{preceptor.vinculos_ativos}</p>
          <p className='text-sm text-gray-600'>Instituições ativas</p>
        </div>
      </div>

      {/* Instituições Atendidas */}
      <div className='bg-white rounded-2xl shadow-md p-8'>
        <div className='flex items-center justify-between mb-6 flex-wrap gap-3'>
          <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'><FiBarChart2 size={28} /> Instituições Atendidas</h2>
          <span className='px-3 py-1 rounded-full bg-[#237EE6]/10 text-[#237EE6] text-sm font-semibold'>
            {totalInstituicoes} instituição{totalInstituicoes !== 1 ? 's' : ''}
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {instituicoesStats.map((inst, index) => (
            <div key={index} className='p-6 bg-linear-to-br from-[#F5F7FA] to-white border-2 border-gray-200 rounded-xl hover:border-[#237EE6] transition-all duration-300'>
              <div className='flex items-start justify-between mb-4'>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 mb-1'>{inst.instituicao}</h3>
                  <p className='text-sm text-gray-600 flex items-center gap-1'><FiMapPin size={14} /> {inst.local}</p>
                </div>
                <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                  {inst.status}
                </span>
              </div>
              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='p-3 bg-white rounded-lg'>
                  <p className='text-xs text-gray-600 mb-1'>Alunos nessa instituição</p>
                  <p className='text-2xl font-bold text-[#237EE6]'>{inst.totalAlunos}</p>
                </div>
                <div className='p-3 bg-white rounded-lg'>
                  <p className='text-xs text-gray-600 mb-1'>Horas semanais</p>
                  <p className='text-2xl font-bold text-[#60C9E6]'>{inst.cargaHoraria}h</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vínculos Ativos */}
      <div className='bg-white rounded-2xl shadow-md p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'><FiClipboard size={28} /> Meus Vínculos</h2>
        <div className='space-y-4'>
          {vinculos.map((vinculo) => (
            <div key={vinculo.id} className='p-5 border-2 border-gray-200 rounded-xl hover:border-[#237EE6] transition-all duration-300'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <h3 className='font-bold text-gray-900 text-lg'>{vinculo.local}</h3>
                    <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                      {vinculo.status}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600 mb-3'>{vinculo.instituicao}</p>
                  <div className='flex flex-wrap gap-4 text-sm text-gray-700'>
                    <span className='flex items-center gap-1'><FiClipboard size={16} /> {vinculo.tipo_vinculo}</span>
                    <span className='flex items-center gap-1'><FiBarChart2 size={16} /> {vinculo.carga_horaria_semanal}h semanais</span>
                    <span className='flex items-center gap-1'><FiTrendingUp size={16} /> R$ {vinculo.valor_hora.toFixed(2)}/hora</span>
                  </div>
                </div>
                <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap flex items-center gap-2'>
                  <FiEye size={16} /> Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumo de Alunos */}
      <div className='bg-white rounded-2xl shadow-md p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'><FiUsers size={28} /> Alunos Supervisionados</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200'>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Local</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Pendências</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Status</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                  <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aluno.nome}</td>
                  <td className='px-6 py-4 text-sm text-[#237EE6] font-semibold'>{aluno.instituicao}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.local}</td>
                  <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{aluno.frequencia}%</td>
                  <td className='px-6 py-4'>
                    <div className='flex gap-2'>
                      {aluno.frequencias_pendentes > 0 && (
                        <span className='px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold'>
                          {aluno.frequencias_pendentes} freq.
                        </span>
                      )}
                      {aluno.avaliacoes_pendentes > 0 && (
                        <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold'>
                          {aluno.avaliacoes_pendentes} aval.
                        </span>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                      {aluno.status}
                    </span>
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

export default VisaoGeralPreceptor
