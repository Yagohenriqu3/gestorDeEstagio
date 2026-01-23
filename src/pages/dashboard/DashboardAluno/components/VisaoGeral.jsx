import { useState } from 'react'
import { FiTrendingUp, FiTarget, FiClipboard, FiMapPin, FiPhone, FiClock, FiChevronDown, FiChevronUp, FiCheckCircle } from 'react-icons/fi'

export default function VisaoGeral({ aluno, vagas, setAbaSelecionada }) {
  const [vagaExpandida, setVagaExpandida] = useState(null)

  // Dados mock dos locais com informações detalhadas
  const locaisDetalhes = {
    'Hospital Universitário São Paulo': {
      endereco: 'Rua Prof. Arthur Ramos, 126 - Cidade Universitária, São Paulo - SP',
      cep: '05508-010',
      telefone: '(11) 3091-9200',
      email: 'contato@husp.org.br',
      horario_chegada: '07:45',
      horario_saida: '12:15'
    },
    'Hospital das Clínicas': {
      endereco: 'Av. Dr. Enéas de Carvalho Aguiar, 255 - Cerqueira César, São Paulo - SP',
      cep: '05403-000',
      telefone: '(11) 2661-6000',
      email: 'atendimento@hc.fm.usp.br',
      horario_chegada: '13:45',
      horario_saida: '18:15'
    }
  }

  const toggleDetalhes = (vagaId) => {
    setVagaExpandida(vagaExpandida === vagaId ? null : vagaId)
  }

  return (
    <div className='space-y-6 md:space-y-8'>
      {/* Cards Informativos */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
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
          <button onClick={() => setAbaSelecionada('horarios')} className='mt-4 w-full bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300'>
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
          <button onClick={() => setAbaSelecionada('documentos')} className='mt-4 w-full bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300'>
            Acessar
          </button>
        </div>
      </div>

      {/* Próximas Atividades */}
      <div className='bg-white rounded-2xl shadow-md p-6'>
        <h3 className='text-xl font-semibold text-gray-900 mb-6'>📋 Próximas Atividades</h3>
        <div className='space-y-4'>
          {vagas.map((vaga) => {
            const localInfo = locaisDetalhes[vaga.local]
            const isExpandida = vagaExpandida === vaga.id
            
            return (
              <div key={vaga.id} className='border-2 border-gray-200 rounded-xl hover:border-[#237EE6] transition-all duration-300'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-4'>
                  <div className='flex-1'>
                    <p className='font-semibold text-gray-900'>{vaga.especialidade}</p>
                    <p className='text-sm text-gray-600'>{vaga.local}</p>
                    <p className='text-sm text-gray-500 mt-1'>Prof. {vaga.preceptor} • {vaga.horario}</p>
                    <p className='text-xs text-gray-400 mt-1'>📅 {vaga.data_inicio} até {vaga.data_fim}</p>
                  </div>
                  <div className='flex items-center gap-2 md:gap-3 mt-3 md:mt-0'>
                    <span className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap ${
                      vaga.status === 'Ativa'
                        ? 'bg-[#10E686]/20 text-[#10E686]'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {vaga.status}
                    </span>
                    <button 
                      onClick={() => toggleDetalhes(vaga.id)}
                      className='px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap'
                    >
                      Detalhes
                      {isExpandida ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {/* Seção Expandida com Detalhes do Local */}
                {isExpandida && localInfo && (
                  <div className='px-4 pb-4 pt-2 border-t border-gray-200 mt-2 animate-fadeIn'>
                    <div className='bg-[#F5F7FA] rounded-xl p-5'>
                      <h4 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                        <FiMapPin className='text-[#237EE6]' size={20} />
                        Informações do Local
                      </h4>
                      
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5'>
                        {/* Endereço */}
                        <div className='bg-white rounded-lg p-4'>
                          <p className='text-xs font-semibold text-gray-600 uppercase mb-2 flex items-center gap-1'>
                            <FiMapPin size={14} /> Endereço
                          </p>
                          <p className='text-sm text-gray-900 font-medium'>{localInfo.endereco}</p>
                          <p className='text-xs text-gray-500 mt-1'>CEP: {localInfo.cep}</p>
                        </div>

                        {/* Contato */}
                        <div className='bg-white rounded-lg p-4'>
                          <p className='text-xs font-semibold text-gray-600 uppercase mb-2 flex items-center gap-1'>
                            <FiPhone size={14} /> Contato
                          </p>
                          <p className='text-sm text-gray-900 font-medium'>{localInfo.telefone}</p>
                          <p className='text-xs text-gray-500 mt-1'>{localInfo.email}</p>
                        </div>

                        {/* Horário de Chegada */}
                        <div className='bg-white rounded-lg p-4'>
                          <p className='text-xs font-semibold text-gray-600 uppercase mb-2 flex items-center gap-1'>
                            <FiClock size={14} /> Horário de Chegada
                          </p>
                          <p className='text-2xl font-bold text-[#237EE6]'>{localInfo.horario_chegada}</p>
                          <p className='text-xs text-gray-500 mt-1'>Chegue com 15min de antecedência</p>
                        </div>

                        {/* Horário de Saída */}
                        <div className='bg-white rounded-lg p-4'>
                          <p className='text-xs font-semibold text-gray-600 uppercase mb-2 flex items-center gap-1'>
                            <FiClock size={14} /> Horário de Saída
                          </p>
                          <p className='text-2xl font-bold text-[#10E686]'>{localInfo.horario_saida}</p>
                          <p className='text-xs text-gray-500 mt-1'>Horário previsto</p>
                        </div>
                      </div>

                      {/* Botão Registrar Presença */}
                      {vaga.status === 'Ativa' && (
                        <button
                          onClick={() => setAbaSelecionada('frequencia')}
                          className='w-full bg-linear-to-r from-[#10E686] to-[#60E6D7] text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2'
                        >
                          <FiCheckCircle size={20} />
                          Registrar Presença
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
