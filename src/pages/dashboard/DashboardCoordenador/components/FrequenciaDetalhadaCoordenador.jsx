import { FiCheckCircle, FiEye, FiDownload } from 'react-icons/fi'

const FrequenciaDetalhadaCoordenador = ({ frequenciaDetalhada }) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiCheckCircle size={32} /> Frequência Detalhada por Aluno</h2>
      
      {/* Grid de Alunos com Detalhes de Frequência */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {frequenciaDetalhada.map((freq) => (
          <div key={freq.id_aluno} className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden'>
            <div className={`p-4 ${
              freq.frequencia_pct >= 90
                ? 'bg-linear-to-r from-[#10E686] to-[#60E6D7]'
                : freq.frequencia_pct >= 75
                ? 'bg-linear-to-r from-[#237EE6] to-[#60C9E6]'
                : 'bg-linear-to-r from-orange-500 to-orange-400'
            } text-white`}>
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='text-xl font-bold'>{freq.nome_aluno}</h3>
                  <p className='text-sm opacity-90'>Matrícula: {freq.matricula}</p>
                </div>
                <span className='bg-white/30 px-3 py-1 rounded-lg text-xs font-semibold'>
                  {freq.status}
                </span>
              </div>
            </div>
            <div className='p-6 space-y-4'>
              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Registros</p>
                  <p className='text-2xl font-bold text-gray-900'>{freq.total_registros}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Presenças</p>
                  <p className='text-2xl font-bold text-[#10E686]'>{freq.presencas}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Faltas</p>
                  <p className='text-2xl font-bold text-orange-500'>{freq.faltas}</p>
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-xs text-gray-500'>Percentual de Frequência</p>
                  <p className='text-lg font-bold text-[#237EE6]'>{freq.frequencia_pct.toFixed(1)}%</p>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-3'>
                  <div
                    className={`h-3 rounded-full ${
                      freq.frequencia_pct >= 90
                        ? 'bg-linear-to-r from-[#10E686] to-[#60E6D7]'
                        : freq.frequencia_pct >= 75
                        ? 'bg-linear-to-r from-[#237EE6] to-[#60C9E6]'
                        : 'bg-linear-to-r from-orange-500 to-orange-400'
                    }`}
                    style={{ width: `${freq.frequencia_pct}%` }}
                  ></div>
                </div>
              </div>

              {freq.detalhes_faltas && freq.detalhes_faltas.length > 0 && (
                <div className='pt-4 border-t border-gray-200'>
                  <p className='text-xs text-gray-500 mb-2 font-semibold'>Detalhes das Faltas:</p>
                  <div className='space-y-2'>
                    {freq.detalhes_faltas.map((falta, idx) => (
                      <div key={idx} className='flex items-center justify-between bg-gray-50 p-2 rounded-lg'>
                        <span className='text-sm text-gray-700'>{falta.data}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          falta.tipo === 'Falta justificada'
                            ? 'bg-[#60C9E6]/20 text-[#237EE6]'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {falta.tipo}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className='pt-4 border-t border-gray-200 flex justify-between'>
                <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                  <FiEye size={16} /> Ver Detalhes
                </button>
                <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                  <FiDownload size={16} /> Exportar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FrequenciaDetalhadaCoordenador
