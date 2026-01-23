import { FiPlus } from 'react-icons/fi'

const CurriculosAdm = ({ curriculos, cursos }) => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-gray-900'>Currículos de Estágio</h2>
        <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
          <FiPlus size={18} /> Novo Currículo
        </button>
      </div>
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200 bg-gray-50'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Currículo</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Curso</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Período Mín.</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Carga Horária</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Versão</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {curriculos.map((curr) => {
                const curso = cursos.find(c => c.id_curso === curr.id_curso)
                return (
                  <tr key={curr.id_curriculo} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                    <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{curr.nome_curriculo}</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>{curso?.nome_curso || 'N/A'}</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>{curr.periodo_obrigatorio_minimo}º</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>{curr.carga_horaria_total}h</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>{curr.versao}</td>
                    <td className='px-6 py-4'>
                      <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>{curr.status}</span>
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold'>Editar</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CurriculosAdm
