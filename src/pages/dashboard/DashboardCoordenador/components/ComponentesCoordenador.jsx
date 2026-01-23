import { FiBook, FiClock, FiAward, FiPlus } from 'react-icons/fi'

const ComponentesCoordenador = ({ componentes }) => {
  return (
    <div className='space-y-6'>
      {/* Cards de Resumo */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Total de Componentes</h3>
            <FiBook size={32} className='text-[#237EE6]' />
          </div>
          <p className='text-4xl font-bold text-[#237EE6] mb-2'>{componentes.length}</p>
          <p className='text-sm text-gray-600'>Componentes ofertados</p>
        </div>

        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Carga Horária Total</h3>
            <FiClock size={32} className='text-[#10E686]' />
          </div>
          <p className='text-4xl font-bold text-[#10E686] mb-2'>{componentes.reduce((acc, c) => acc + c.carga_horaria, 0)}h</p>
          <p className='text-sm text-gray-600'>Total de horas</p>
        </div>

        <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Créditos Totais</h3>
            <FiAward size={32} className='text-[#60C9E6]' />
          </div>
          <p className='text-4xl font-bold text-[#60C9E6] mb-2'>{componentes.reduce((acc, c) => acc + c.creditos, 0)}</p>
          <p className='text-sm text-gray-600'>Créditos ofertados</p>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-gray-900'>Componentes Curriculares</h2>
        <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
          <FiPlus size={18} /> Novo Componente
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {componentes.map((comp) => (
          <div key={comp.id_componente} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
            <div className='flex justify-between items-start mb-3'>
              <div>
                <p className='text-sm text-[#237EE6] font-semibold uppercase'>{comp.codigo_componente}</p>
                <h3 className='text-lg font-bold text-gray-900 mt-1'>{comp.nome_componente}</h3>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                comp.tipo === 'Obrigatório' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {comp.tipo}
              </span>
            </div>
            <p className='text-sm text-gray-600 mb-3'>{comp.descricao}</p>
            <div className='grid grid-cols-2 gap-3 mb-4 text-sm'>
              <div>
                <p className='text-gray-600 text-xs'>Carga Horária</p>
                <p className='font-semibold text-gray-900'>{comp.carga_horaria}h</p>
              </div>
              <div>
                <p className='text-gray-600 text-xs'>Créditos</p>
                <p className='font-semibold text-gray-900'>{comp.creditos}</p>
              </div>
              <div>
                <p className='text-gray-600 text-xs'>Semestre</p>
                <p className='font-semibold text-gray-900'>{comp.semestre_ideal}º</p>
              </div>
              <div>
                <p className='text-gray-600 text-xs'>Status</p>
                <span className='text-xs font-semibold text-[#10E686]'>✓ Ativo</span>
              </div>
            </div>
            <div className='mb-4'>
              <p className='text-xs text-gray-600 mb-2'>Competências:</p>
              <div className='flex flex-wrap gap-2'>
                {comp.competencias.map((competencia, idx) => (
                  <span key={idx} className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'>
                    {competencia}
                  </span>
                ))}
              </div>
            </div>
            <button className='w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg transition-colors'>
              Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComponentesCoordenador
