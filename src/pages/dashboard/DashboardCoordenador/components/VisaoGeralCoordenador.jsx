import { FiUsers, FiTarget, FiTrendingUp, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { MdLocalHospital } from 'react-icons/md'

export default function VisaoGeralCoordenador({ instituicao, alunos }) {
  return (
    <div className='space-y-8'>
      {/* Cards Principais */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {/* Card Alunos */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Alunos</h3>
            <FiUsers size={32} className='text-[#237EE6]' />
          </div>
          <p className='text-4xl font-bold text-[#237EE6] mb-2'>{instituicao.total_alunos}</p>
          <div className='text-sm text-gray-600 space-y-1'>
            <p className='flex items-center gap-1'><FiCheckCircle size={14} /> {instituicao.alunos_ativos} ativos</p>
            <p className='flex items-center gap-1'><FiAlertCircle size={14} /> {instituicao.alunos_pendentes} pendentes</p>
          </div>
        </div>

        {/* Card Vagas */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Vagas</h3>
            <FiTarget size={32} className='text-[#10E686]' />
          </div>
          <p className='text-4xl font-bold text-[#10E686] mb-2'>{instituicao.vagas_ocupadas}/{instituicao.vagas_total}</p>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div className='bg-linear-to-r from-[#10E686] to-[#60E6D7] h-2 rounded-full' style={{ width: `${(instituicao.vagas_ocupadas / instituicao.vagas_total) * 100}%` }}></div>
          </div>
          <p className='text-sm text-gray-600 mt-2'>{((instituicao.vagas_ocupadas / instituicao.vagas_total) * 100).toFixed(0)}% ocupadas</p>
        </div>

        {/* Card Locais */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Locais</h3>
            <MdLocalHospital size={32} className='text-[#60E6D7]' />
          </div>
          <p className='text-4xl font-bold text-[#60E6D7] mb-2'>{instituicao.locais_ativos}</p>
          <p className='text-sm text-gray-600'>Convênios ativos</p>
        </div>

        {/* Card Frequência */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Frequência</h3>
            <FiTrendingUp size={32} className='text-[#60C9E6]' />
          </div>
          <p className='text-4xl font-bold text-[#60C9E6] mb-2'>{instituicao.frequencia_media}%</p>
          <p className='text-sm text-gray-600'>Média geral</p>
        </div>
      </div>

      {/* Tabela Resumida de Alunos */}
      <div className='bg-white rounded-2xl shadow-md p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'><FiUsers size={28} /> Alunos Recentes</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200'>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Período</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Status</th>
              </tr>
            </thead>
            <tbody>
              {alunos.slice(0, 5).map((aluno) => (
                <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                  <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aluno.nome}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.matricula}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.periodo}º período</td>
                  <td className='px-6 py-4 text-sm text-gray-700 font-semibold'>{aluno.frequencia}%</td>
                  <td className='px-6 py-4'>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      aluno.status === 'Ativo'
                        ? 'bg-[#10E686]/20 text-[#10E686]'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {aluno.status}
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
