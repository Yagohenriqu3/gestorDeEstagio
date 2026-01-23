import { FiTarget, FiPlus } from 'react-icons/fi'

const VagasGestorLocal = ({ vagasFiltradas, filtroVagas, setFiltroVagas, vagas }) => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiTarget size={32} /> Gestão de Vagas</h2>
        <div className='flex gap-3'>
          <select
            value={filtroVagas}
            onChange={(e) => setFiltroVagas(e.target.value)}
            className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
          >
            <option value='todas'>Todas ({vagas.length})</option>
            <option value='livres'>Disponíveis ({vagas.filter(v => v.status === 'Disponível').length})</option>
            <option value='completas'>Completas ({vagas.filter(v => v.status === 'Completa').length})</option>
          </select>
          <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
            <FiPlus size={18} /> Nova Vaga
          </button>
        </div>
      </div>

      {/* Grid de Vagas */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {vagasFiltradas.map((vaga) => (
          <div key={vaga.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
            <div className={`h-2 bg-linear-to-r ${
              vaga.status === 'Completa'
                ? 'from-gray-400 to-gray-500'
                : 'from-[#10E686] to-[#60E6D7]'
            }`}></div>
            <div className='p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <p className='text-sm text-[#237EE6] font-semibold uppercase'>{vaga.especialidade}</p>
                  <h3 className='text-lg font-bold text-gray-900 mt-1'>Vaga {vaga.id}</h3>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  vaga.status === 'Completa'
                    ? 'bg-gray-200 text-gray-700'
                    : 'bg-[#10E686]/20 text-[#10E686]'
                }`}>
                  {vaga.status}
                </span>
              </div>

              <div className='mb-4'>
                <p className='text-sm text-gray-600 mb-2'>👨‍⚕️ {vaga.preceptor}</p>
                <p className='text-sm text-gray-600 mb-2'>📍 {vaga.local}</p>
                <p className='text-sm text-gray-600 mb-2'>🏛️ {vaga.instituicao}</p>
                <p className='text-sm text-gray-600 mb-2'>📚 Períodos: {vaga.periodo}</p>
                
                <div className='bg-linear-to-r from-blue-50 to-cyan-50 rounded-lg p-3 mb-2'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      vaga.turno === 'Manhã' ? 'bg-amber-100 text-amber-700' :
                      vaga.turno === 'Tarde' ? 'bg-orange-100 text-orange-700' :
                      vaga.turno === 'Noite' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {vaga.turno}
                    </span>
                    <span className='text-sm text-gray-900 font-bold'>⏰ {vaga.horario}</span>
                  </div>
                  <div className='flex gap-1 flex-wrap'>
                    {vaga.dias_semana.map((dia) => (
                      <span key={dia} className='px-2 py-1 bg-white border border-blue-200 text-blue-700 rounded text-xs font-semibold'>
                        {dia}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-sm text-gray-700 font-semibold'>Ocupação</p>
                  <p className='text-sm text-gray-600'>{vaga.ocupadas} de {vaga.total}</p>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                    style={{ width: `${(vaga.ocupadas / vaga.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className='flex gap-3'>
                <button className='flex-1 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm'>
                  Editar
                </button>
                <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300 text-sm'>
                  Ver Alunos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VagasGestorLocal
