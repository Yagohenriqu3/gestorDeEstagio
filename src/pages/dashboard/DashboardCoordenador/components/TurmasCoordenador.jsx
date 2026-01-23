import { FiPlus } from 'react-icons/fi'

const TurmasCoordenador = ({ turmas }) => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-gray-900'>Turmas de Estágio</h2>
        <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
          <FiPlus size={18} /> Nova Turma
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {turmas.map((turma) => (
          <div key={turma.id_turma} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
            <div className={`h-2 bg-linear-to-r ${
              turma.status === 'Ativa' ? 'from-[#10E686] to-[#60E6D7]' :
              turma.status === 'Planejada' ? 'from-yellow-400 to-yellow-500' :
              'from-gray-400 to-gray-500'
            }`}></div>
            <div className='p-6'>
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <p className='text-sm text-[#237EE6] font-semibold uppercase'>{turma.codigo_turma}</p>
                  <h3 className='text-lg font-bold text-gray-900 mt-1'>{turma.componente}</h3>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  turma.status === 'Ativa' ? 'bg-[#10E686]/20 text-[#10E686]' :
                  turma.status === 'Planejada' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {turma.status}
                </span>
              </div>
              <div className='space-y-2 mb-4 text-sm'>
                <p className='text-gray-700'><span className='font-semibold'>Local:</span> {turma.local}</p>
                <p className='text-gray-700'><span className='font-semibold'>Preceptor:</span> {turma.preceptor}</p>
                <p className='text-gray-700'><span className='font-semibold'>Turno:</span> {turma.turno}</p>
                <p className='text-gray-700'><span className='font-semibold'>Horário:</span> {turma.horario_inicio} - {turma.horario_fim}</p>
              </div>
              <div className='mb-4'>
                <p className='text-sm text-gray-600 mb-2'>Ocupação da Turma</p>
                <div className='flex items-center gap-2'>
                  <div className='flex-1 bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                      style={{ width: `${(turma.matriculados / turma.capacidade) * 100}%` }}
                    ></div>
                  </div>
                  <span className='text-sm font-semibold'>{turma.matriculados}/{turma.capacidade}</span>
                </div>
              </div>
              <div className='flex gap-2'>
                <button className='flex-1 bg-[#237EE6] text-white font-semibold py-2 rounded-lg hover:bg-[#154c8b] transition-colors text-sm'>
                  Detalhes
                </button>
                <button className='flex-1 bg-gray-100 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm'>
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TurmasCoordenador
