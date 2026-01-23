import { FiBarChart2, FiSettings, FiDownload } from 'react-icons/fi'

export default function HeaderCoordenador({ instituicao }) {
  return (
    <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2'>
              <FiBarChart2 size={36} /> Painel de Coordenação
            </h1>
            <p className='text-blue-100 text-sm lg:text-base'>{instituicao.nome} • {instituicao.unidade}</p>
          </div>
          <div className='flex gap-3'>
            <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2'>
              <FiSettings size={18} /> Configurações
            </button>
            <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2'>
              <FiDownload size={18} /> Relatórios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
