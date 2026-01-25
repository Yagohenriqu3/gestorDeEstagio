import { useState, useEffect } from 'react'
import { FiCheckCircle, FiTrendingUp, FiTarget, FiMapPin, FiX, FiClock, FiCalendar } from 'react-icons/fi'

export default function Frequencia({ frequencia, estagios }) {
  const [modalCheckinAberto, setModalCheckinAberto] = useState(false)
  const [dataHoraAtual, setDataHoraAtual] = useState(new Date())
  const [geolocalizacao, setGeolocalizacao] = useState(null)
  const [carregandoGeo, setCarregandoGeo] = useState(false)

  // Atualiza data e hora a cada segundo quando o modal está aberto
  useEffect(() => {
    if (modalCheckinAberto) {
      const intervalo = setInterval(() => {
        setDataHoraAtual(new Date())
      }, 1000)
      return () => clearInterval(intervalo)
    }
  }, [modalCheckinAberto])

  // Formatar data e hora
  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatarHora = (data) => {
    return data.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  // Obter geolocalização
  const obterGeolocalizacao = () => {
    setCarregandoGeo(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocalizacao({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            precisao: position.coords.accuracy
          })
          setCarregandoGeo(false)
        },
        (error) => {
          console.error('Erro ao obter localização:', error)
          alert('Não foi possível obter sua localização. Verifique as permissões do navegador.')
          setCarregandoGeo(false)
        }
      )
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.')
      setCarregandoGeo(false)
    }
  }

  // Fazer check-in
  const realizarCheckin = () => {
    if (!geolocalizacao) {
      alert('Por favor, registre sua localização antes de fazer o check-in.')
      return
    }

    // Aqui seria a chamada para a API
    console.log('Check-in realizado:', {
      data: dataHoraAtual,
      localizacao: geolocalizacao,
      local: localEstagioHoje
    })

    alert('Check-in realizado com sucesso!')
    setModalCheckinAberto(false)
    setGeolocalizacao(null)
  }

  // Mock: Local de estágio do dia (deveria vir de uma API ou props)
  const localEstagioHoje = {
    nome: 'Hospital Municipal São José',
    especialidade: 'Clínica Médica',
    endereco: 'Rua das Flores, 123 - Centro',
    horario_entrada: '08:00',
    horario_saida: '12:00',
    preceptor: 'Dr. João Silva'
  }

  return (
    <div className='space-y-4 md:space-y-6'>
      <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>✅ Minha Frequência</h2>
      
      {/* Resumo */}
      <div className='bg-white rounded-2xl shadow-md p-4 md:p-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
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
          <table className='w-full min-w-[600px]'>
            <thead>
              <tr className='border-b-2 border-gray-200'>
                <th className='px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900'>Data</th>
                <th className='px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900'>Entrada</th>
                <th className='px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900'>Saída</th>
                <th className='px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900'>Total</th>
                <th className='px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-900'>Status</th>
              </tr>
            </thead>
            <tbody>
              {frequencia.map((reg, idx) => (
                <tr key={idx} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                  <td className='px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900 font-medium'>{reg.data} ({reg.dia})</td>
                  <td className='px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-700'>{reg.entrada}</td>
                  <td className='px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-700'>{reg.saida}</td>
                  <td className='px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-700 font-semibold'>4h05m</td>
                  <td className='px-3 md:px-6 py-3 md:py-4'>
                    <span className='px-2 md:px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
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
      <div className='px-2'>
        <button 
          onClick={() => setModalCheckinAberto(true)}
          className='w-full bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-bold py-3.5 md:py-4 px-4 md:px-8 rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-sm md:text-lg flex items-center justify-center gap-2'
        >
          <span className='text-lg md:text-xl'>📍</span>
          <span>Fazer Check-in Agora</span>
        </button>
      </div>

      {/* Modal de Check-in */}
      {modalCheckinAberto && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto'>
            {/* Header do Modal */}
            <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] px-6 py-4 flex items-center justify-between rounded-t-2xl'>
              <h3 className='text-xl font-bold text-white flex items-center gap-2'>
                <FiMapPin size={24} />
                Check-in de Presença
              </h3>
              <button
                onClick={() => {
                  setModalCheckinAberto(false)
                  setGeolocalizacao(null)
                }}
                className='text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300'
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className='p-6 space-y-6'>
              {/* Data e Hora Atual */}
              <div className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200'>
                <div className='flex items-center gap-3 mb-3'>
                  <FiCalendar className='text-[#237EE6]' size={24} />
                  <p className='text-sm font-semibold text-gray-700'>Data</p>
                </div>
                <p className='text-lg font-bold text-gray-900 capitalize mb-4'>
                  {formatarData(dataHoraAtual)}
                </p>
                
                <div className='flex items-center gap-3 mb-3'>
                  <FiClock className='text-[#237EE6]' size={24} />
                  <p className='text-sm font-semibold text-gray-700'>Horário</p>
                </div>
                <p className='text-3xl font-bold text-[#237EE6]'>
                  {formatarHora(dataHoraAtual)}
                </p>
              </div>

              {/* Informações do Local de Estágio */}
              <div className='bg-white border-2 border-gray-200 rounded-xl p-4'>
                <h4 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <span>🏥</span>
                  Local de Estágio
                </h4>
                <div className='space-y-3'>
                  <div>
                    <p className='text-sm text-gray-600'>Nome do Local</p>
                    <p className='text-base font-bold text-gray-900'>{localEstagioHoje.nome}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Especialidade</p>
                    <p className='text-base font-semibold text-[#237EE6]'>{localEstagioHoje.especialidade}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Endereço</p>
                    <p className='text-base text-gray-700'>{localEstagioHoje.endereco}</p>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm text-gray-600'>Entrada</p>
                      <p className='text-base font-semibold text-gray-900'>{localEstagioHoje.horario_entrada}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Saída</p>
                      <p className='text-base font-semibold text-gray-900'>{localEstagioHoje.horario_saida}</p>
                    </div>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Preceptor</p>
                    <p className='text-base font-semibold text-gray-900'>{localEstagioHoje.preceptor}</p>
                  </div>
                </div>
              </div>

              {/* Geolocalização */}
              <div className='bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4'>
                <h4 className='text-base font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <FiMapPin className='text-yellow-600' size={20} />
                  Localização
                </h4>
                {geolocalizacao ? (
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2 text-sm'>
                      <span className='text-green-600 font-semibold'>✓ Localização registrada</span>
                    </div>
                    <div className='bg-white rounded-lg p-3 text-xs space-y-1'>
                      <p><strong>Latitude:</strong> {geolocalizacao.latitude.toFixed(6)}</p>
                      <p><strong>Longitude:</strong> {geolocalizacao.longitude.toFixed(6)}</p>
                      <p><strong>Precisão:</strong> ±{geolocalizacao.precisao.toFixed(0)}m</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className='text-sm text-gray-700 mb-3'>
                      É necessário registrar sua localização para confirmar sua presença no local de estágio.
                    </p>
                    <button
                      onClick={obterGeolocalizacao}
                      disabled={carregandoGeo}
                      className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2'
                    >
                      {carregandoGeo ? (
                        <>
                          <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                          Obtendo localização...
                        </>
                      ) : (
                        <>
                          <FiMapPin size={20} />
                          Registrar Localização
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className='flex gap-3'>
                <button
                  onClick={() => {
                    setModalCheckinAberto(false)
                    setGeolocalizacao(null)
                  }}
                  className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300'
                >
                  Cancelar
                </button>
                <button
                  onClick={realizarCheckin}
                  disabled={!geolocalizacao}
                  className={`flex-1 font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    geolocalizacao
                      ? 'bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-white hover:shadow-xl hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FiCheckCircle size={20} />
                  Confirmar Check-in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Histórico de Estágios */}
      <div className='mt-8 md:mt-12'>
        <h2 className='text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6'>📚 Histórico de Estágios</h2>
        
        {/* Estágios Concluídos */}
        <div className='mb-6 md:mb-8'>
          <h3 className='text-lg md:text-xl font-semibold text-[#10E686] mb-3 md:mb-4 flex items-center gap-2'>
            <FiCheckCircle size={20} className='md:w-6 md:h-6' />
            Estágios Concluídos ({estagios.concluidos.length})
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
            {estagios.concluidos.map((estagio) => (
              <div key={estagio.id} className='bg-white rounded-xl shadow-md p-4 md:p-5 border-l-4 border-[#10E686] hover:shadow-lg transition-all duration-300'>
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
        <div className='mb-6 md:mb-8'>
          <h3 className='text-lg md:text-xl font-semibold text-[#237EE6] mb-3 md:mb-4 flex items-center gap-2'>
            <FiTrendingUp size={20} className='md:w-6 md:h-6' />
            Estágios Em Andamento ({estagios.em_andamento.length})
          </h3>
          <div className='grid grid-cols-1 gap-3 md:gap-4'>
            {estagios.em_andamento.map((estagio) => (
              <div key={estagio.id} className='bg-white rounded-xl shadow-md p-4 md:p-5 border-l-4 border-[#237EE6] hover:shadow-lg transition-all duration-300'>
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
                      <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full' style={{ width: `${estagio.progresso}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estágios A Concluir */}
        <div>
          <h3 className='text-lg md:text-xl font-semibold text-gray-600 mb-3 md:mb-4 flex items-center gap-2'>
            <FiTarget size={20} className='md:w-6 md:h-6' />
            Estágios A Concluir ({estagios.a_concluir.length})
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
            {estagios.a_concluir.map((estagio) => (
              <div key={estagio.id} className='bg-white rounded-xl shadow-md p-4 md:p-5 border-l-4 border-gray-300 hover:shadow-lg transition-all duration-300'>
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
