import { FiTrendingUp, FiClipboard, FiCheckCircle, FiAlertCircle, FiEdit2 } from 'react-icons/fi'

const AvaliacoesPreceptor = ({ avaliacoesPendentes }) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiTrendingUp size={32} /> Avaliações Pendentes</h2>

      {/* Lista de Avaliações */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {avaliacoesPendentes.map((aval) => (
          <div key={aval.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
            <div className='h-2 bg-linear-to-r from-[#60E6D7] to-[#10E686]'></div>
            <div className='p-6'>
              <div className='mb-4'>
                <p className='text-sm text-[#60E6D7] font-semibold uppercase'>{aval.tipo}</p>
                <h3 className='text-xl font-bold text-gray-900 mt-1'>{aval.aluno}</h3>
                <p className='text-sm text-[#237EE6] font-semibold mt-1'>{aval.instituicao}</p>
                <p className='text-sm text-gray-600 mt-1'>Período: {aval.periodo}</p>
              </div>

              <div className='mb-6'>
                <p className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'><FiClipboard size={18} className='text-[#60E6D7]' /> Critérios a avaliar:</p>
                <div className='flex flex-wrap gap-2'>
                  {aval.criterios.map((crit, idx) => (
                    <span key={idx} className='px-3 py-1 bg-[#F5F7FA] text-gray-700 rounded-lg text-xs font-medium flex items-center gap-1'>
                      <FiCheckCircle size={12} /> {crit}
                    </span>
                  ))}
                </div>
              </div>

              <div className='p-3 bg-yellow-50 rounded-lg mb-4'>
                <p className='text-xs font-semibold text-yellow-700 flex items-center gap-1'>
                  <FiAlertCircle size={14} /> Prazo: {aval.prazo}
                </p>
              </div>

              <button className='w-full bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2'>
                <FiEdit2 size={16} /> Realizar Avaliação
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvaliacoesPreceptor
