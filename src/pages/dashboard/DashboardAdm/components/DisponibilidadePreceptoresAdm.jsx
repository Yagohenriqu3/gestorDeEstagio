import { FiPlus } from 'react-icons/fi'

export default function DisponibilidadePreceptoresAdm({ disponibilidades }) {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-gray-900'>Disponibilidade de Preceptores</h2>
        <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
          <FiPlus size={18} /> Nova Disponibilidade
        </button>
      </div>
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200 bg-gray-50'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Componente</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Turno</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Horário</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Capacidade</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alocados</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
              </tr>
            </thead>
            <tbody>
              {disponibilidades.map((disp) => (
                <tr key={disp.id_disponibilidade} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                  <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{disp.nome_preceptor}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{disp.nome_componente}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{disp.nome_local}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{disp.turno}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{disp.horario_inicio} - {disp.horario_fim}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{disp.capacidade_alunos}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    <div className='flex items-center gap-2'>
                      <div className='w-16 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                          style={{ width: `${(disp.alunos_alocados / disp.capacidade_alunos) * 100}%` }}
                        ></div>
                      </div>
                      <span className='font-semibold'>{disp.alunos_alocados}/{disp.capacidade_alunos}</span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>{disp.status}</span>
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
