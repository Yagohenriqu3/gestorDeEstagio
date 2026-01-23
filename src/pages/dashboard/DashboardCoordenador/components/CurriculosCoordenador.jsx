import { FiBook, FiPlus } from 'react-icons/fi'

export default function CurriculosCoordenador({ curriculos }) {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiBook size={32} /> Currículos de Estágio</h2>
        <div className='flex gap-3'>
          <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2'>
            <FiPlus size={18} /> Novo Currículo
          </button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {curriculos.map((cur) => (
          <div key={cur.id_curriculo} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all'>
            <div className='flex items-start justify-between gap-2 mb-2'>
              <h3 className='text-xl font-bold text-gray-900'>{cur.nome_curriculo}</h3>
              <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#237EE6]/10 text-[#237EE6]'>
                {cur.status}
              </span>
            </div>
            <p className='text-sm text-gray-600 mb-3'>{cur.descricao}</p>
            <div className='grid grid-cols-2 gap-2 text-sm text-gray-700'>
              <span><strong>Ano:</strong> {cur.ano_vigencia}</span>
              <span><strong>Período mín.:</strong> {cur.periodo_obrigatorio_minimo}º</span>
              <span><strong>CH total:</strong> {cur.carga_horaria_total}h</span>
              <span><strong>CH mínima:</strong> {cur.carga_horaria_minima}h</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
