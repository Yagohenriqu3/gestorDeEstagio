import { FiCheckCircle, FiFilter, FiMapPin, FiEye, FiAlertCircle } from 'react-icons/fi'

const ValidarFrequenciaPreceptor = ({
  frequenciasPendentes,
  filtroFrequencia,
  setFiltroFrequencia,
  filtroData,
  setFiltroData,
  filtroLocal,
  setFiltroLocal,
  locaisUnicos
}) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiCheckCircle size={32} /> Validar Frequência</h2>
      
      {/* Filtros */}
      <div className='bg-white rounded-2xl shadow-md p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Status</label>
            <select
              value={filtroFrequencia}
              onChange={(e) => setFiltroFrequencia(e.target.value)}
              className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
            >
              <option value='pendentes'>Pendentes ({frequenciasPendentes.length})</option>
              <option value='validadas'>Validadas</option>
              <option value='todas'>Todas</option>
            </select>
          </div>
          
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Data</label>
            <input
              type='date'
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
            />
          </div>
          
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Local</label>
            <select
              value={filtroLocal}
              onChange={(e) => setFiltroLocal(e.target.value)}
              className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
            >
              {locaisUnicos.map((local) => (
                <option key={local} value={local}>
                  {local === 'todos' ? 'Todos os Locais' : local}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {(filtroData || filtroLocal !== 'todos') && (
          <div className='mt-4 flex items-center gap-2'>
            <button
              onClick={() => {
                setFiltroData('')
                setFiltroLocal('todos')
              }}
              className='text-sm text-[#237EE6] hover:text-[#154c8b] font-semibold flex items-center gap-1'
            >
              <FiFilter size={14} /> Limpar filtros
            </button>
          </div>
        )}
      </div>

      {/* Lista de Frequências */}
      <div className='space-y-4'>
        {frequenciasPendentes
          .filter(freq => {
            // Filtro por data
            if (filtroData && freq.data !== filtroData) return false
            // Filtro por local
            if (filtroLocal !== 'todos' && freq.local !== filtroLocal) return false
            return true
          })
          .map((freq) => (
          <div key={freq.id} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
            <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
              <div className='flex-1'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-lg font-bold text-gray-900'>{freq.aluno}</h3>
                    <p className='text-sm text-[#237EE6] font-semibold mt-1'>{freq.instituicao}</p>
                    <p className='text-sm text-gray-600 mt-1'>{freq.data} • {freq.horario}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    freq.tipo === 'Check-in'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {freq.tipo}
                  </span>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Local</p>
                    <p className='text-sm font-semibold text-gray-900 flex items-center gap-1'><FiMapPin size={14} /> {freq.local}</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Distância</p>
                    <p className='text-sm font-semibold text-gray-900 flex items-center gap-1'><FiFilter size={14} /> {freq.distancia}m</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Raio</p>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      freq.dentro_raio
                        ? 'bg-[#10E686]/20 text-[#10E686]'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {freq.dentro_raio ? '✓ Dentro' : '✗ Fora'}
                    </span>
                  </div>
                </div>

                {freq.foto_checkin && (
                  <div className='p-3 bg-[#F5F7FA] rounded-lg'>
                    <p className='text-xs text-gray-600 mb-2'>Reconhecimento Facial</p>
                    <div className='flex items-center gap-2'>
                      <FiEye size={18} className='text-[#237EE6]' />
                      <span className='text-xs text-gray-700'>Foto capturada e validada</span>
                    </div>
                  </div>
                )}
              </div>

              <div className='flex lg:flex-col gap-3 lg:w-40'>
                <button className='flex-1 bg-linear-to-r from-[#10E686] to-[#60E6D7] text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                  <FiCheckCircle size={14} /> Validar
                </button>
                <button className='flex-1 bg-white border-2 border-red-500 text-red-500 font-semibold py-2 px-4 rounded-lg hover:bg-red-50 transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                  <FiAlertCircle size={14} /> Rejeitar
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {frequenciasPendentes
          .filter(freq => {
            if (filtroData && freq.data !== filtroData) return false
            if (filtroLocal !== 'todos' && freq.local !== filtroLocal) return false
            return true
          })
          .length === 0 && (
          <div className='bg-white rounded-2xl shadow-md p-12 text-center'>
            <FiCheckCircle size={48} className='mx-auto text-gray-300 mb-4' />
            <p className='text-gray-600 text-lg font-semibold mb-2'>Nenhuma frequência encontrada</p>
            <p className='text-gray-500 text-sm'>Ajuste os filtros para ver mais resultados</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ValidarFrequenciaPreceptor
