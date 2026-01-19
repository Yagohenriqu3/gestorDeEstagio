export default function Locais({ locais }) {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900'>🏥 Locais de Estágio</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {locais.map((local) => (
          <div key={local.id} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
            <div className='flex items-start justify-between mb-4'>
              <div>
                <p className='text-sm text-[#237EE6] font-semibold uppercase'>{local.tipo}</p>
                <h3 className='text-xl font-bold text-gray-900 mt-1'>{local.nome}</h3>
              </div>
              <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-sm font-semibold'>
                {local.status}
              </span>
            </div>

            <div className='space-y-3 mb-6'>
              <div className='flex items-center gap-3 text-gray-700'>
                <span>📍</span>
                <span className='text-sm'>{local.cidade}</span>
              </div>
              <div className='flex items-center gap-3 text-gray-700'>
                <span>📞</span>
                <span className='text-sm'>{local.telefone}</span>
              </div>
            </div>

            <button className='w-full bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300'>
              Mais Informações
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
