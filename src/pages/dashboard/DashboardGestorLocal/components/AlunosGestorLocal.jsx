import { FiUsers, FiPlus } from 'react-icons/fi'

const AlunosGestorLocal = ({ alunosFiltrados, filtroAlunos, setFiltroAlunos, alunos }) => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={32} /> Alunos do Local</h2>
        <div className='flex gap-3'>
          <select
            value={filtroAlunos}
            onChange={(e) => setFiltroAlunos(e.target.value)}
            className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
          >
            <option value='todos'>Todos ({alunos.length})</option>
            <option value='ativos'>Ativos ({alunos.filter(a => a.status === 'Ativo').length})</option>
            <option value='inativos'>Inativos ({alunos.filter(a => a.status === 'Inativo').length})</option>
          </select>
          <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
            <FiPlus size={18} /> Matricular Aluno
          </button>
        </div>
      </div>

      {/* Tabela Completa de Alunos */}
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200 bg-gray-50'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Período</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Desempenho</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunosFiltrados.map((aluno) => (
                <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                  <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aluno.nome}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.matricula}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.instituicao}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.periodo}º</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.especialidade}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.preceptor}</td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-16 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                          style={{ width: `${(aluno.desempenho / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-semibold text-gray-900'>{aluno.desempenho}</span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-16 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-linear-to-r from-[#60C9E6] to-[#10E686] h-2 rounded-full'
                          style={{ width: `${aluno.frequencia}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-semibold text-gray-900'>{aluno.frequencia}%</span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>
                      {aluno.status}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300'>
                      Ver Detalhes
                    </button>
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

export default AlunosGestorLocal
