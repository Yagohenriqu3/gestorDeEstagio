import { FiEdit2, FiPlus, FiUser } from 'react-icons/fi'

const FrequenciaLocaisGestorLocal = ({ frequenciaLocal, setLocalEditando, setModalEditarLocal, setModalAssociarPreceptor }) => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>📊 Frequência por Local</h2>
        <button
          onClick={() => setModalEditarLocal(true)}
          className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'
        >
          <FiEdit2 size={18} /> Editar Local
        </button>
      </div>

      {/* Grid de Frequência por Local */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {frequenciaLocal.map((freq, idx) => (
          <div key={freq.local || `freq-${idx}`} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all'>
            <div className='flex items-start justify-between mb-4'>
              <div>
                <h3 className='text-lg font-bold text-gray-900'>{freq.local}</h3>
                <p className='text-sm text-gray-600 flex items-center gap-1 mt-1'>
                  <FiUser size={14} /> {freq.preceptor}
                </p>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => {
                    setLocalEditando(freq)
                    setModalEditarLocal(true)
                  }}
                  className='p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-all'
                  title='Editar local'
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  onClick={() => setModalAssociarPreceptor(true)}
                  className='p-2 hover:bg-green-100 text-green-600 rounded-lg transition-all'
                  title='Associar preceptor'
                >
                  <FiPlus size={18} />
                </button>
              </div>
            </div>

            {/* Frequência com Barra de Progresso */}
            <div className='mb-4'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm font-semibold text-gray-700'>Frequência Média</span>
                <span className='text-2xl font-bold text-[#237EE6]'>{freq.frequencia_media}%</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-3'>
                <div
                  className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-3 rounded-full transition-all'
                  style={{ width: `${freq.frequencia_media}%` }}
                ></div>
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className='grid grid-cols-2 gap-4 pt-4 border-t border-gray-200'>
              <div>
                <p className='text-xs text-gray-600 font-semibold'>Alunos</p>
                <p className='text-2xl font-bold text-gray-900 mt-1'>{freq.alunos}</p>
              </div>
              <div>
                <p className='text-xs text-gray-600 font-semibold'>Preceptor</p>
                <p className='text-sm font-semibold text-gray-900 mt-1'>{freq.preceptor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FrequenciaLocaisGestorLocal
