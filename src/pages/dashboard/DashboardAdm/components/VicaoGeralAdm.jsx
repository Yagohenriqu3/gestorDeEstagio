import { FiBarChart2, FiUsers, FiMapPin, FiClipboard, FiTrendingUp, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

export default function VicaoGeralAdm({ admin, instituicoes, frequenciaLocal }) {
  return (
    <div className='space-y-8'>
      {/* Cards Principais */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4'>
        <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-semibold text-gray-600'>Instituições</h3>
            <FiBarChart2 size={24} className='text-[#237EE6]' />
          </div>
          <p className='text-3xl font-bold text-[#237EE6]'>{admin.total_instituicoes}</p>
        </div>
        <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-semibold text-gray-600'>Unidades</h3>
            <FiMapPin size={24} className='text-[#60E6D7]' />
          </div>
          <p className='text-3xl font-bold text-[#60E6D7]'>{admin.total_unidades}</p>
        </div>
        <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-semibold text-gray-600'>Usuários</h3>
            <FiUsers size={24} className='text-[#60E6D7]' />
          </div>
          <p className='text-3xl font-bold text-[#60E6D7]'>{admin.total_usuarios}</p>
        </div>
        <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-semibold text-gray-600'>Locais</h3>
            <FiMapPin size={24} className='text-[#10E686]' />
          </div>
          <p className='text-3xl font-bold text-[#10E686]'>{admin.total_locais}</p>
        </div>
        <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-semibold text-gray-600'>Preceptores</h3>
            <FiClipboard size={24} className='text-yellow-500' />
          </div>
          <p className='text-3xl font-bold text-yellow-600'>{admin.total_preceptores}</p>
        </div>
        <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-semibold text-gray-600'>Vagas</h3>
            <FiTrendingUp size={24} className='text-purple-500' />
          </div>
          <p className='text-3xl font-bold text-purple-600'>{admin.total_vagas}</p>
        </div>
        <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-semibold text-gray-600'>Alunos Ativos</h3>
            <FiCheckCircle size={24} className='text-[#60E6D7]' />
          </div>
          <p className='text-3xl font-bold text-[#60E6D7]'>{admin.total_alunos_ativos}</p>
        </div>
      </div>

      {/* Resumo Rápido */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Instituições Recentes */}
        <div className='bg-white rounded-2xl shadow-md p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'><FiBarChart2 size={24} /> Instituições Ativas</h2>
          <div className='space-y-3'>
            {instituicoes.slice(0, 3).map((inst) => (
              <div key={inst.id} className='p-3 bg-[#F5F7FA] rounded-lg flex items-center justify-between'>
                <div>
                  <p className='font-semibold text-gray-900'>{inst.nome}</p>
                  <p className='text-xs text-gray-600'>{inst.total_unidades} unidades • {inst.total_usuarios} usuários</p>
                </div>
                <span className='px-2 py-1 bg-[#10E686]/20 text-[#10E686] rounded text-xs font-semibold'>{inst.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Frequência Média */}
        <div className='bg-white rounded-2xl shadow-md p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'><FiTrendingUp size={24} /> Frequência por Local</h2>
          <div className='space-y-3'>
            {frequenciaLocal.slice(0, 3).map((freq) => (
              <div key={freq.id} className='p-3 bg-[#F5F7FA] rounded-lg'>
                <div className='flex items-center justify-between mb-1'>
                  <p className='font-semibold text-gray-900 text-sm'>{freq.local}</p>
                  <p className='font-bold text-[#237EE6]'>{freq.frequencia_media}%</p>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full' style={{ width: `${freq.frequencia_media}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
