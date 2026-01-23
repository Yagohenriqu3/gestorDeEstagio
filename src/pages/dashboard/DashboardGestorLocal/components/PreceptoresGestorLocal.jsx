import { FiUser, FiPlus, FiEdit2, FiEye } from 'react-icons/fi'

const PreceptoresGestorLocal = ({ preceptoresFiltrados, alunosFiltrados }) => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiUser size={32} /> Gerenciamento de Preceptores</h2>
        <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
          <FiPlus size={18} /> Novo Preceptor
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white rounded-2xl shadow-md p-6'>
          <p className='text-sm text-gray-600'>Total de Preceptores</p>
          <p className='text-4xl font-bold text-[#237EE6] mt-2'>{preceptoresFiltrados.length}</p>
        </div>
        <div className='bg-white rounded-2xl shadow-md p-6'>
          <p className='text-sm text-gray-600'>Média de Alunos/Preceptor</p>
          <p className='text-4xl font-bold text-[#10E686] mt-2'>{preceptoresFiltrados.length > 0 ? (alunosFiltrados.length / preceptoresFiltrados.length).toFixed(1) : '0'}</p>
        </div>
      </div>

      {/* Tabela de Preceptores */}
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200 bg-gray-50'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>CRM</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Anos Exp.</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alunos</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {preceptoresFiltrados.map((preceptor) => (
                <tr key={preceptor.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                  <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{preceptor.nome}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.crm}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.instituicao}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.especialidade}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.experencia}</td>
                  <td className='px-6 py-4 text-sm text-gray-700 font-semibold'>{preceptor.alunos}</td>
                  <td className='px-6 py-4'>
                    <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>
                      {preceptor.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 flex items-center gap-2'>
                    <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                      <FiEdit2 size={16} /> Editar
                    </button>
                    <button className='text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                      <FiEye size={16} /> Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid de Preceptores */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {preceptoresFiltrados.map((preceptor) => (
          <div key={preceptor.id} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-bold text-gray-900'>{preceptor.nome}</h3>
              <FiUser size={24} className='text-[#237EE6]' />
            </div>

            <div className='space-y-3 mb-6'>
              <div>
                <p className='text-xs text-gray-600'>Instituição</p>
                <p className='text-sm font-semibold text-gray-900'>🏛️ {preceptor.instituicao}</p>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Especialidade</p>
                <p className='text-sm font-semibold text-gray-900'>{preceptor.especialidade}</p>
              </div>
              <div>
                <p className='text-xs text-gray-600'>CRM</p>
                <p className='text-sm font-semibold text-gray-900'>{preceptor.crm}</p>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Experiência</p>
                <p className='text-sm font-semibold text-gray-900'>{preceptor.experencia} anos</p>
              </div>
              <div>
                <p className='text-xs text-gray-600 mb-1'>Alunos Supervisionados</p>
                <p className='text-2xl font-bold text-[#237EE6]'>{preceptor.alunos}</p>
              </div>
            </div>

            <div className='flex gap-2'>
              <button className='flex-1 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                <FiEdit2 size={14} /> Editar
              </button>
              <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                <FiEye size={14} /> Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PreceptoresGestorLocal
