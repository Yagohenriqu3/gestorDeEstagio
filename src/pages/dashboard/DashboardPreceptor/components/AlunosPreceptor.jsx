import { FiUsers, FiMapPin, FiClipboard, FiAlertCircle, FiCheckCircle, FiTrendingUp, FiEye, FiBarChart2 } from 'react-icons/fi'

const AlunosPreceptor = ({ alunos }) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={32} /> Meus Alunos</h2>

      {/* Grid de Alunos */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {alunos.map((aluno) => (
          <div key={aluno.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
            <div className='h-2 bg-linear-to-r from-[#237EE6] to-[#60C9E6]'></div>
            <div className='p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <p className='text-sm text-[#237EE6] font-semibold uppercase'>{aluno.periodo}º período</p>
                  <h3 className='text-xl font-bold text-gray-900 mt-1'>{aluno.nome}</h3>
                  <p className='text-sm text-gray-600 mt-1'>{aluno.matricula}</p>
                </div>
                <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                  {aluno.status}
                </span>
              </div>

              <div className='space-y-3 mb-6'>
                <div className='p-3 bg-[#237EE6]/10 rounded-lg'>
                  <p className='text-xs text-[#237EE6] font-semibold mb-1'>Instituição</p>
                  <p className='text-sm font-bold text-[#237EE6]'>{aluno.instituicao}</p>
                </div>
                <div className='flex items-center gap-3 text-gray-700'>
                  <FiMapPin size={18} className='text-[#237EE6]' />
                  <span className='text-sm'>{aluno.local}</span>
                </div>
                <div className='flex items-center gap-3 text-gray-700'>
                  <FiClipboard size={18} className='text-[#237EE6]' />
                  <span className='text-sm'>{aluno.especialidade}</span>
                </div>
                <div>
                  <div className='flex items-center justify-between mb-2'>
                    <p className='text-sm font-semibold text-gray-700'>Frequência</p>
                    <p className='text-sm font-bold text-[#237EE6]'>{aluno.frequencia}%</p>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                      style={{ width: `${aluno.frequencia}%` }}
                    ></div>
                  </div>
                </div>
                {(aluno.frequencias_pendentes > 0 || aluno.avaliacoes_pendentes > 0) && (
                  <div className='p-3 bg-yellow-50 rounded-lg'>
                    <p className='text-xs font-semibold text-yellow-700 mb-1 flex items-center gap-1'><FiAlertCircle size={14} /> Pendências:</p>
                    <div className='flex gap-2'>
                      {aluno.frequencias_pendentes > 0 && (
                        <span className='text-xs text-yellow-700'>
                          <FiCheckCircle className='inline mr-1' size={12} /> {aluno.frequencias_pendentes} frequências
                        </span>
                      )}
                      {aluno.avaliacoes_pendentes > 0 && (
                        <span className='text-xs text-yellow-700'>
                          <FiTrendingUp className='inline mr-1' size={12} /> {aluno.avaliacoes_pendentes} avaliações
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className='flex gap-3'>
                <button className='flex-1 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                  <FiEye size={14} /> Ver Detalhes
                </button>
                <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                  <FiBarChart2 size={14} /> Histórico
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlunosPreceptor
