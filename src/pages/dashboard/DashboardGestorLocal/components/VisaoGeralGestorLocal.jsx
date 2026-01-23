import { FiUsers, FiTarget, FiUser, FiCheckCircle, FiAlertCircle, FiMapPin } from 'react-icons/fi'

const VisaoGeralGestorLocal = ({ local, instituicaoSelecionada, preceptoresFiltrados, alunosFiltrados }) => {
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
          <p className='text-4xl font-bold text-[#237EE6] mb-2'>{local.total_alunos}</p>
          <div className='text-sm text-gray-600 space-y-1'>
            <p className='flex items-center gap-1'><FiCheckCircle size={14} /> {local.alunos_ativos} ativos</p>
            <p className='flex items-center gap-1'><FiAlertCircle size={14} /> {local.alunos_inativos} inativos</p>
          </div>
        </div>

        {/* Card Vagas */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Vagas</h3>
            <FiTarget size={32} className='text-[#10E686]' />
          </div>
          <p className='text-4xl font-bold text-[#10E686] mb-2'>{local.vagas_ocupadas}/{local.vagas_total}</p>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div className='bg-linear-to-r from-[#10E686] to-[#60E6D7] h-2 rounded-full' style={{ width: `${(local.vagas_ocupadas / local.vagas_total) * 100}%` }}></div>
          </div>
          <p className='text-sm text-gray-600 mt-2'>{((local.vagas_ocupadas / local.vagas_total) * 100).toFixed(0)}% ocupadas</p>
        </div>

        {/* Card Preceptores */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Preceptores</h3>
            <FiUser size={32} className='text-[#60E6D7]' />
          </div>
          <p className='text-4xl font-bold text-[#60E6D7] mb-2'>{instituicaoSelecionada ? preceptoresFiltrados.length : local.preceptores_total}</p>
          <p className='text-sm text-gray-600'>{instituicaoSelecionada ? `Da ${instituicaoSelecionada}` : 'Ativos no local'}</p>
        </div>

        {/* Card Convênio */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Convênio</h3>
            <FiCheckCircle size={32} className='text-[#60C9E6]' />
          </div>
          <p className='text-2xl font-bold text-[#60C9E6] mb-2'>{local.convenio}</p>
          <p className='text-sm text-gray-600'>Status do local</p>
        </div>
      </div>

      {/* Informações do Local */}
      <div className='bg-white rounded-2xl shadow-md p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'><FiMapPin size={28} /> Informações do Local</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <p className='text-sm text-gray-600'>Nome do Local</p>
            <p className='text-lg font-semibold text-gray-900'>{local.nome}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Tipo</p>
            <p className='text-lg font-semibold text-gray-900'>{local.tipo}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Endereço</p>
            <p className='text-lg font-semibold text-gray-900'>{local.endereco}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Cidade</p>
            <p className='text-lg font-semibold text-gray-900'>{local.cidade}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Telefone</p>
            <p className='text-lg font-semibold text-gray-900'>{local.telefone}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600'>Responsável</p>
            <p className='text-lg font-semibold text-gray-900'>{local.responsavel}</p>
          </div>
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
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Status</th>
              </tr>
            </thead>
            <tbody>
              {alunosFiltrados.slice(0, 5).map((aluno) => (
                <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                  <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aluno.nome}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.matricula}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.instituicao}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.especialidade}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.preceptor}</td>
                  <td className='px-6 py-4'>
                    <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>
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

export default VisaoGeralGestorLocal
