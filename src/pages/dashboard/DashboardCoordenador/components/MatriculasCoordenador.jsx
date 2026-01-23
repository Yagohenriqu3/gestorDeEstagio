import { FiPlus } from 'react-icons/fi'

const MatriculasCoordenador = ({ matriculasTurma }) => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-gray-900'>Matrículas de Alunos</h2>
        <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
          <FiPlus size={18} /> Nova Matrícula
        </button>
      </div>
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200 bg-gray-50'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Turma</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Componente</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Data Matrícula</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Desempenho</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
              </tr>
            </thead>
            <tbody>
              {matriculasTurma.map((mat) => (
                <tr key={mat.id_matricula_turma} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                  <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{mat.nome_aluno}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{mat.matricula_aluno}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{mat.codigo_turma}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{mat.componente}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{new Date(mat.data_matricula).toLocaleDateString('pt-BR')}</td>
                  <td className='px-6 py-4'>
                    {mat.desempenho > 0 ? (
                      <div className='flex items-center gap-2'>
                        <div className='w-16 bg-gray-200 rounded-full h-2'>
                          <div
                            className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                            style={{ width: `${(mat.desempenho / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className='text-sm font-semibold'>{mat.desempenho.toFixed(1)}</span>
                      </div>
                    ) : (
                      <span className='text-gray-400'>-</span>
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    {mat.frequencia > 0 ? (
                      <div className='flex items-center gap-2'>
                        <div className='w-16 bg-gray-200 rounded-full h-2'>
                          <div
                            className='bg-linear-to-r from-[#60C9E6] to-[#10E686] h-2 rounded-full'
                            style={{ width: `${mat.frequencia}%` }}
                          ></div>
                        </div>
                        <span className='text-sm font-semibold'>{mat.frequencia}%</span>
                      </div>
                    ) : (
                      <span className='text-gray-400'>-</span>
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      mat.status === 'Matriculado' ? 'bg-[#10E686]/20 text-[#10E686]' :
                      mat.status === 'Pendente de Matrícula' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {mat.status}
                    </span>
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

export default MatriculasCoordenador
