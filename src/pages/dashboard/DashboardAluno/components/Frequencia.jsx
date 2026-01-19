import { FiCheckCircle, FiTrendingUp, FiTarget } from 'react-icons/fi'

export default function Frequencia({ frequencia, estagios }) {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900'>✅ Minha Frequência</h2>
      
      {/* Resumo */}
      <div className='bg-white rounded-2xl shadow-md p-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div>
            <p className='text-gray-600 text-sm'>Semana Atual</p>
            <p className='text-2xl font-bold text-[#237EE6] mt-1'>40h</p>
          </div>
          <div>
            <p className='text-gray-600 text-sm'>Validadas</p>
            <p className='text-2xl font-bold text-[#10E686] mt-1'>38h</p>
          </div>
          <div>
            <p className='text-gray-600 text-sm'>Pendentes</p>
            <p className='text-2xl font-bold text-yellow-600 mt-1'>2h</p>
          </div>
          <div>
            <p className='text-gray-600 text-sm'>Faltando</p>
            <p className='text-2xl font-bold text-gray-400 mt-1'>0h</p>
          </div>
        </div>
      </div>

      {/* Tabela de Frequência */}
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Data</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Entrada</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Saída</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Total</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
              </tr>
            </thead>
            <tbody>
              {frequencia.map((reg, idx) => (
                <tr key={idx} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                  <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{reg.data} ({reg.dia})</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{reg.entrada}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{reg.saida}</td>
                  <td className='px-6 py-4 text-sm text-gray-700 font-semibold'>4h05m</td>
                  <td className='px-6 py-4'>
                    <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                      {reg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botão de Check-in */}
      <div className='flex justify-center'>
        <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-lg flex items-center gap-3'>
          <span>📍</span>
          Fazer Check-in Agora
        </button>
      </div>

      {/* Histórico de Estágios */}
      <div className='mt-12'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>📚 Histórico de Estágios</h2>
        
        {/* Estágios Concluídos */}
        <div className='mb-8'>
          <h3 className='text-xl font-semibold text-[#10E686] mb-4 flex items-center gap-2'>
            <FiCheckCircle size={24} />
            Estágios Concluídos ({estagios.concluidos.length})
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {estagios.concluidos.map((estagio) => (
              <div key={estagio.id} className='bg-white rounded-xl shadow-md p-5 border-l-4 border-[#10E686] hover:shadow-lg transition-all duration-300'>
                <h4 className='text-lg font-bold text-gray-900 mb-2'>{estagio.especialidade}</h4>
                <p className='text-sm text-gray-600 mb-3'>{estagio.local}</p>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Período:</span>
                    <span className='font-semibold text-gray-900'>{estagio.periodo}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Carga Horária:</span>
                    <span className='font-semibold text-gray-900'>{estagio.carga_horaria}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Frequência:</span>
                    <span className='font-semibold text-[#10E686]'>{estagio.frequencia}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Nota Final:</span>
                    <span className='font-semibold text-[#237EE6]'>{estagio.nota}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estágios Em Andamento */}
        <div className='mb-8'>
          <h3 className='text-xl font-semibold text-[#237EE6] mb-4 flex items-center gap-2'>
            <FiTrendingUp size={24} />
            Estágios Em Andamento ({estagios.em_andamento.length})
          </h3>
          <div className='grid grid-cols-1 gap-4'>
            {estagios.em_andamento.map((estagio) => (
              <div key={estagio.id} className='bg-white rounded-xl shadow-md p-5 border-l-4 border-[#237EE6] hover:shadow-lg transition-all duration-300'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                  <div>
                    <h4 className='text-lg font-bold text-gray-900 mb-1'>{estagio.especialidade}</h4>
                    <p className='text-sm text-gray-600'>{estagio.local}</p>
                  </div>
                  <span className='px-4 py-2 bg-[#237EE6]/20 text-[#237EE6] rounded-lg text-sm font-semibold mt-2 md:mt-0 inline-block'>
                    Em Progresso
                  </span>
                </div>
                <div className='space-y-3'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Período:</span>
                    <span className='font-semibold text-gray-900'>{estagio.periodo}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Carga Horária:</span>
                    <span className='font-semibold text-gray-900'>{estagio.carga_horaria}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Frequência Atual:</span>
                    <span className='font-semibold text-[#237EE6]'>{estagio.frequencia}</span>
                  </div>
                  <div>
                    <div className='flex justify-between text-sm mb-2'>
                      <span className='text-gray-600'>Progresso:</span>
                      <span className='font-semibold text-gray-900'>{estagio.progresso}%</span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full' style={{ width: `${estagio.progresso}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estágios A Concluir */}
        <div>
          <h3 className='text-xl font-semibold text-gray-600 mb-4 flex items-center gap-2'>
            <FiTarget size={24} />
            Estágios A Concluir ({estagios.a_concluir.length})
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {estagios.a_concluir.map((estagio) => (
              <div key={estagio.id} className='bg-white rounded-xl shadow-md p-5 border-l-4 border-gray-300 hover:shadow-lg transition-all duration-300'>
                <h4 className='text-lg font-bold text-gray-900 mb-2'>{estagio.especialidade}</h4>
                <p className='text-sm text-gray-600 mb-3'>{estagio.local}</p>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Período:</span>
                    <span className='font-semibold text-gray-900'>{estagio.periodo}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Carga Horária:</span>
                    <span className='font-semibold text-gray-900'>{estagio.carga_horaria}</span>
                  </div>
                  <div className='mt-3'>
                    <span className='px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-semibold'>
                      {estagio.previsao}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
