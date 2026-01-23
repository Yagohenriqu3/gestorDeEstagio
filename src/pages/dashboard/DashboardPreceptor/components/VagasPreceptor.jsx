import { FiTarget, FiMapPin, FiEdit2, FiEye } from 'react-icons/fi'

const VagasPreceptor = ({ vagas, setVagaSelecionada, setModalAssociarEspecialidade }) => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiTarget size={32} /> Minhas Vagas do Local</h2>
      </div>

      {/* Grid de Vagas */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {vagas.map((vaga) => (
          <div key={vaga.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all'>
            <div className='h-2 bg-linear-to-r from-[#237EE6] to-[#60C9E6]'></div>
            <div className='p-6'>
              <div className='mb-4'>
                <h3 className='text-xl font-bold text-gray-900'>{vaga.especialidade}</h3>
                <p className='text-sm text-[#237EE6] font-semibold mt-1 flex items-center gap-1'><FiMapPin size={14} /> {vaga.local}</p>
                <p className='text-sm text-gray-600 mt-1'>{vaga.instituicao}</p>
              </div>

              <div className='grid grid-cols-2 gap-4 mb-6 py-4 border-y border-gray-200'>
                <div>
                  <p className='text-xs text-gray-600 font-semibold uppercase'>Período</p>
                  <p className='text-lg font-bold text-gray-900 mt-1'>{vaga.periodo}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-600 font-semibold uppercase'>Turno</p>
                  <p className='text-lg font-bold text-gray-900 mt-1'>{vaga.turno}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-600 font-semibold uppercase'>Horário</p>
                  <p className='text-sm font-semibold text-gray-900 mt-1'>{vaga.horario}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-600 font-semibold uppercase'>Ocupação</p>
                  <p className={`text-lg font-bold mt-1 ${vaga.status === 'Completa' ? 'text-red-500' : 'text-[#10E686]'}`}>{vaga.ocupadas}/{vaga.total}</p>
                </div>
              </div>

              <div className='mb-4'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-sm font-semibold text-gray-700'>Taxa de Ocupação</span>
                  <span className={`text-sm font-bold ${vaga.status === 'Completa' ? 'text-red-500' : 'text-[#10E686]'}`}>{Math.round((vaga.ocupadas / vaga.total) * 100)}%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className={`h-2 rounded-full transition-all ${vaga.status === 'Completa' ? 'bg-red-500' : 'bg-linear-to-r from-[#237EE6] to-[#60C9E6]'}`}
                    style={{ width: `${(vaga.ocupadas / vaga.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className='flex gap-2'>
                <button
                  onClick={() => {
                    setVagaSelecionada(vaga)
                    setModalAssociarEspecialidade(true)
                  }}
                  className='flex-1 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2'
                >
                  <FiEdit2 size={16} /> Associar Especialidade
                </button>
                <button className='flex-1 bg-gray-100 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2'>
                  <FiEye size={16} /> Detalhes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VagasPreceptor
