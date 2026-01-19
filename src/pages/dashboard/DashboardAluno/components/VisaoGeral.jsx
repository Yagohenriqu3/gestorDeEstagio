import { FiTrendingUp, FiTarget, FiClipboard } from 'react-icons/fi'

export default function VisaoGeral({ aluno, vagas, setAbaSelecionada }) {
  return (
    <div className='space-y-8'>
      {/* Cards Informativos */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Card Frequência */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Frequência Geral</h3>
            <FiTrendingUp size={32} className='text-[#237EE6]' />
          </div>
          <p className='text-4xl font-bold text-[#237EE6] mb-2'>{aluno.frequencia_percentual}%</p>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full' style={{ width: `${aluno.frequencia_percentual}%` }}></div>
          </div>
          <p className='text-sm text-gray-600 mt-3'>38 de 40 horas validadas</p>
        </div>

        {/* Card Horários */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Meus Horários</h3>
            <FiTarget size={32} className='text-[#10E686]' />
          </div>
          <p className='text-4xl font-bold text-[#10E686] mb-2'>{vagas.length}</p>
          <p className='text-sm text-gray-600'>1 em andamento, 1 pendente</p>
          <button onClick={() => setAbaSelecionada('vagas')} className='mt-4 w-full bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300'>
            Ver Detalhes
          </button>
        </div>

        {/* Card Documentos */}
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Documentos</h3>
            <FiClipboard size={32} className='text-[#60E6D7]' />
          </div>
          <p className='text-4xl font-bold text-[#60E6D7] mb-2'>3</p>
          <p className='text-sm text-gray-600'>Termo + Seguro + Atestado</p>
          <button className='mt-4 w-full bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300'>
            Acessar
          </button>
        </div>
      </div>

      {/* Próximas Atividades */}
      <div className='bg-white rounded-2xl shadow-md p-6'>
        <h3 className='text-xl font-semibold text-gray-900 mb-6'>📋 Próximas Atividades</h3>
        <div className='space-y-4'>
          {vagas.map((vaga) => (
            <div key={vaga.id} className='flex flex-col md:flex-row md:items-center md:justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-[#237EE6] transition-all duration-300'>
              <div className='flex-1'>
                <p className='font-semibold text-gray-900'>{vaga.especialidade}</p>
                <p className='text-sm text-gray-600'>{vaga.local}</p>
                <p className='text-sm text-gray-500 mt-1'>Prof. {vaga.preceptor} • {vaga.horario}</p>
                <p className='text-xs text-gray-400 mt-1'>📅 {vaga.data_inicio} até {vaga.data_fim}</p>
              </div>
              <div className='flex items-center gap-3 mt-4 md:mt-0'>
                <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  vaga.status === 'Ativa'
                    ? 'bg-[#10E686]/20 text-[#10E686]'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {vaga.status}
                </span>
                <button className='px-4 py-2 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300'>
                  Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
