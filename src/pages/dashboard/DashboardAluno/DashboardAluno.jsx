import { useState } from 'react'
import { FiHome, FiUsers, FiTarget, FiMapPin, FiClipboard, FiDownload, FiEye, FiBarChart2, FiTrendingUp, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

export default function DashboardAluno() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')

  // Dados mock do aluno
  const aluno = {
    nome: 'João Silva Santos',
    matricula: '202401234',
    periodo: 9,
    frequencia_percentual: 95.5,
    vagas_ativas: 1
  }

  // Mock de vagas
  const vagas = [
    {
      id: 1,
      local: 'Hospital Universitário São Paulo',
      especialidade: 'Clínica Médica',
      preceptor: 'Dra. Maria Silva',
      data_inicio: '2025-02-03',
      data_fim: '2025-04-02',
      status: 'Ativa',
      horario: '08:00 - 12:00'
    },
    {
      id: 2,
      local: 'Hospital das Clínicas',
      especialidade: 'Cirurgia Geral',
      preceptor: 'Dr. Carlos Oliveira',
      data_inicio: '2025-04-07',
      data_fim: '2025-06-06',
      status: 'Pendente',
      horario: '14:00 - 18:00'
    }
  ]

  // Mock de locais
  const locais = [
    {
      id: 1,
      nome: 'Hospital Universitário São Paulo',
      tipo: 'Hospital',
      cidade: 'São Paulo',
      telefone: '(11) 3091-9200',
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Hospital das Clínicas',
      tipo: 'Hospital',
      cidade: 'São Paulo',
      telefone: '(11) 2661-6000',
      status: 'Ativo'
    }
  ]

  // Mock de frequência
  const frequencia = [
    { data: '2025-02-03', dia: 'Seg', entrada: '08:05', saida: '12:10', status: 'Validada' },
    { data: '2025-02-04', dia: 'Ter', entrada: '08:00', saida: '12:05', status: 'Validada' },
    { data: '2025-02-05', dia: 'Qua', entrada: '08:15', saida: '12:20', status: 'Validada' },
    { data: '2025-02-06', dia: 'Qui', entrada: '08:02', saida: '12:08', status: 'Validada' },
    { data: '2025-02-07', dia: 'Sex', entrada: '08:10', saida: '12:15', status: 'Validada' }
  ]

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-[#F5F7FA] to-white'>
      {/* Header */}
      <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2'><FiHome size={36} /> Bem-vindo, {aluno.nome.split(' ')[0]}!</h1>
              <p className='text-blue-100 text-sm lg:text-base'>Matrícula: {aluno.matricula} • Período: {aluno.periodo}º</p>
            </div>
            <div className='flex gap-4'>
              <div className='bg-white/20 backdrop-blur rounded-xl px-6 py-3'>
                <p className='text-blue-100 text-sm'>Frequência</p>
                <p className='text-2xl font-bold'>{aluno.frequencia_percentual}%</p>
              </div>
              <div className='bg-white/20 backdrop-blur rounded-xl px-6 py-3'>
                <p className='text-blue-100 text-sm'>Vagas Ativas</p>
                <p className='text-2xl font-bold'>{aluno.vagas_ativas}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className='border-b border-gray-200 bg-white sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-6 lg:px-12'>
          <div className='flex gap-8'>
            <button
              onClick={() => setAbaSelecionada('overview')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 ${
                abaSelecionada === 'overview'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiBarChart2 size={18} className='inline mr-1' /> Visão Geral
            </button>
            <button
              onClick={() => setAbaSelecionada('vagas')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 ${
                abaSelecionada === 'vagas'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiTarget size={18} className='inline mr-1' /> Minhas Vagas
            </button>
            <button
              onClick={() => setAbaSelecionada('locais')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 ${
                abaSelecionada === 'locais'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiMapPin size={18} className='inline mr-1' /> Locais
            </button>
            <button
              onClick={() => setAbaSelecionada('frequencia')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 ${
                abaSelecionada === 'frequencia'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiCheckCircle size={18} className='inline mr-1' /> Frequência
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className='max-w-7xl mx-auto px-6 lg:px-12 py-10'>
        {/* VISÃO GERAL */}
        {abaSelecionada === 'overview' && (
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

              {/* Card Vagas */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Vagas Ativas</h3>
                  <FiTarget size={32} className='text-[#10E686]' />
                </div>
                <p className='text-4xl font-bold text-[#10E686] mb-2'>{vagas.length}</p>
                <p className='text-sm text-gray-600'>1 em andamento, 1 pendente</p>
                <button className='mt-4 w-full bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300'>
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

            {/* Resumo de Vagas */}
            <div className='bg-white rounded-2xl shadow-md p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'><FiTarget size={28} /> Minhas Vagas</h2>
              <div className='space-y-4'>
                {vagas.map((vaga) => (
                  <div key={vaga.id} className='flex flex-col md:flex-row md:items-center md:justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-[#237EE6] transition-all duration-300'>
                    <div className='flex-1'>
                      <p className='font-semibold text-gray-900'>{vaga.especialidade}</p>
                      <p className='text-sm text-gray-600'>{vaga.local}</p>
                      <p className='text-sm text-gray-500 mt-1'>Prof. {vaga.preceptor} • {vaga.horario}</p>
                    </div>
                    <div className='flex items-center gap-3 mt-4 md:mt-0'>
                      <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        vaga.status === 'Ativa'
                          ? 'bg-[#10E686]/20 text-[#10E686]'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {vaga.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MINHAS VAGAS */}
        {abaSelecionada === 'vagas' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>🎯 Minhas Vagas</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {vagas.map((vaga) => (
                <div key={vaga.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
                  <div className={`h-2 bg-linear-to-r ${vaga.status === 'Ativa' ? 'from-[#10E686] to-[#60E6D7]' : 'from-yellow-400 to-yellow-600'}`}></div>
                  <div className='p-6'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <p className='text-sm text-[#237EE6] font-semibold uppercase'>{vaga.especialidade}</p>
                        <h3 className='text-xl font-bold text-gray-900 mt-1'>{vaga.local}</h3>
                      </div>
                      <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        vaga.status === 'Ativa'
                          ? 'bg-[#10E686]/20 text-[#10E686]'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {vaga.status}
                      </span>
                    </div>
                    
                    <div className='space-y-3 mb-6'>
                      <div className='flex items-center gap-3 text-gray-700'>
                        <span>👨‍⚕️</span>
                        <span className='text-sm'>{vaga.preceptor}</span>
                      </div>
                      <div className='flex items-center gap-3 text-gray-700'>
                        <span>⏰</span>
                        <span className='text-sm'>{vaga.horario}</span>
                      </div>
                      <div className='flex items-center gap-3 text-gray-700'>
                        <span>📅</span>
                        <span className='text-sm'>{vaga.data_inicio} até {vaga.data_fim}</span>
                      </div>
                    </div>

                    <div className='flex gap-3'>
                      <button className='flex-1 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300'>
                        Ver Detalhes
                      </button>
                      <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300'>
                        📋 Documentos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOCAIS DE ESTÁGIO */}
        {abaSelecionada === 'locais' && (
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
        )}

        {/* FREQUÊNCIA */}
        {abaSelecionada === 'frequencia' && (
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
          </div>
        )}
      </div>
    </div>
  )
}
