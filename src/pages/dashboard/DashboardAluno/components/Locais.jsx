import { useState } from 'react'
import { FiMapPin, FiPhone, FiClock, FiChevronDown, FiChevronUp, FiMail, FiCheckCircle } from 'react-icons/fi'

export default function Locais({ locais }) {
  const [localExpandido, setLocalExpandido] = useState(null)

  // Dados mock com informações detalhadas dos locais
  const locaisDetalhes = {
    'Hospital Universitário São Paulo': {
      endereco: 'Rua Prof. Arthur Ramos, 126 - Cidade Universitária, São Paulo - SP',
      cep: '05508-010',
      email: 'contato@husp.org.br',
      horario_funcionamento: '24 horas',
      horario_chegada: '07:45',
      horario_saida: '12:15'
      
    },
    'Hospital das Clínicas': {
      endereco: 'Av. Dr. Enéas de Carvalho Aguiar, 255 - Cerqueira César, São Paulo - SP',
      cep: '05403-000',
      email: 'atendimento@hc.fm.usp.br',
      horario_funcionamento: '24 horas',
      horario_chegada: '13:45',
      horario_saida: '18:15'
    
    }
  }

  const toggleDetalhes = (localId) => {
    setLocalExpandido(localExpandido === localId ? null : localId)
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900'>🏥 Locais de Estágio</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {locais.map((local) => {
          const detalhes = locaisDetalhes[local.nome]
          const isExpandido = localExpandido === local.id

          return (
            <div key={local.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
              <div className='p-6'>
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
                    <FiMapPin className='text-[#237EE6]' size={18} />
                    <span className='text-sm'>{local.cidade}</span>
                  </div>
                  <div className='flex items-center gap-3 text-gray-700'>
                    <FiPhone className='text-[#237EE6]' size={18} />
                    <span className='text-sm'>{local.telefone}</span>
                  </div>
                </div>

                <button 
                  onClick={() => toggleDetalhes(local.id)}
                  className='w-full bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2'
                >
                  Mais Informações
                  {isExpandido ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                </button>
              </div>

              {/* Seção Expandida com Detalhes */}
              {isExpandido && detalhes && (
                <div className='px-6 pb-6 pt-2 border-t border-gray-200 animate-fadeIn'>
                  <div className='bg-[#F5F7FA] rounded-xl p-5'>
                    <h4 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                      <FiMapPin className='text-[#237EE6]' size={20} />
                      Informações Detalhadas
                    </h4>

                    <div className='space-y-4'>
                      {/* Endereço */}
                      <div className='bg-white rounded-lg p-4'>
                        <p className='text-xs font-semibold text-gray-600 uppercase mb-2 flex items-center gap-1'>
                          <FiMapPin size={14} /> Endereço Completo
                        </p>
                        <p className='text-sm text-gray-900 font-medium'>{detalhes.endereco}</p>
                        <p className='text-xs text-gray-500 mt-1'>CEP: {detalhes.cep}</p>
                      </div>

                      {/* Contato */}
                      <div className='bg-white rounded-lg p-4'>
                        <p className='text-xs font-semibold text-gray-600 uppercase mb-2 flex items-center gap-1'>
                          <FiPhone size={14} /> Contato
                        </p>
                        <p className='text-sm text-gray-900 font-medium flex items-center gap-2'>
                          <FiPhone size={14} /> {local.telefone}
                        </p>
                        <p className='text-sm text-gray-900 font-medium flex items-center gap-2 mt-1'>
                          <FiMail size={14} /> {detalhes.email}
                        </p>
                      </div>

                      {/* Horários */}
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='bg-white rounded-lg p-4'>
                          <p className='text-xs font-semibold text-gray-600 uppercase mb-2 flex items-center gap-1'>
                            <FiClock size={14} /> Chegada
                          </p>
                          <p className='text-2xl font-bold text-[#237EE6]'>{detalhes.horario_chegada}</p>
                          <p className='text-xs text-gray-500 mt-1'>Recomendado</p>
                        </div>

                        <div className='bg-white rounded-lg p-4'>
                          <p className='text-xs font-semibold text-gray-600 uppercase mb-2 flex items-center gap-1'>
                            <FiClock size={14} /> Saída
                          </p>
                          <p className='text-2xl font-bold text-[#10E686]'>{detalhes.horario_saida}</p>
                          <p className='text-xs text-gray-500 mt-1'>Previsto</p>
                        </div>
                      </div>

                      {/* Funcionamento */}
                      <div className='bg-white rounded-lg p-4'>
                        <p className='text-xs font-semibold text-gray-600 uppercase mb-2'>
                          Horário de Funcionamento
                        </p>
                        <p className='text-sm text-gray-900 font-medium'>{detalhes.horario_funcionamento}</p>
                      </div>


                      
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
