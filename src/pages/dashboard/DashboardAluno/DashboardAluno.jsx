import { useState } from 'react'
import { FiHome, FiBarChart2, FiTarget, FiMapPin, FiCheckCircle, FiUser } from 'react-icons/fi'
import VisaoGeral from './components/VisaoGeral'
import MeusHorarios from './components/MeusHorarios'
import Locais from './components/Locais'
import Frequencia from './components/Frequencia'
import DadosCadastrais from './components/DadosCadastrais'

export default function DashboardAluno() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')

  // Dados mock do aluno
  const aluno = {
    nome: 'João Silva Santos',
    matricula: '202401234',
    periodo: 9,
    frequencia_percentual: 95.5,
    vagas_ativas: 1,
    email: 'joao.santos@universidade.edu.br',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    data_nascimento: '15/03/2000',
    unidade: 'Faculdade de Medicina - Campus Central',
    curso: 'Medicina',
    turno: 'Integral',
    situacao: 'Ativo',
    data_ingresso: '2020-02-01'
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

  // Mock de estágios históricos
  const estagios = {
    concluidos: [
      {
        id: 1,
        especialidade: 'Pediatria',
        local: 'Hospital das Clínicas',
        periodo: '2024-08-01 a 2024-10-01',
        carga_horaria: '200h',
        frequencia: '98%',
        nota: '9.5'
      },
      {
        id: 2,
        especialidade: 'Cirurgia Geral',
        local: 'Hospital Universitário',
        periodo: '2024-04-01 a 2024-06-01',
        carga_horaria: '180h',
        frequencia: '96%',
        nota: '9.0'
      }
    ],
    em_andamento: [
      {
        id: 3,
        especialidade: 'Clínica Médica',
        local: 'Hospital Universitário São Paulo',
        periodo: '2025-02-03 a 2025-04-02',
        carga_horaria: '40h / 200h',
        frequencia: '95.5%',
        progresso: 20
      }
    ],
    a_concluir: [
      {
        id: 4,
        especialidade: 'Cardiologia',
        local: 'Instituto do Coração',
        periodo: '2025-05-01 a 2025-07-01',
        carga_horaria: '200h',
        previsao: 'Início previsto'
      },
      {
        id: 5,
        especialidade: 'Neurologia',
        local: 'Hospital das Clínicas',
        periodo: '2025-08-01 a 2025-10-01',
        carga_horaria: '180h',
        previsao: 'Aguardando confirmação'
      }
    ]
  }

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
                <p className='text-blue-100 text-sm'>Meus Horários</p>
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
              <FiTarget size={18} className='inline mr-1' /> Meus Horários
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
            <button
              onClick={() => setAbaSelecionada('dados')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 ${
                abaSelecionada === 'dados'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiUser size={18} className='inline mr-1' /> Dados Cadastrais
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className='max-w-7xl mx-auto px-6 lg:px-12 py-10'>
        {/* VISÃO GERAL */}
        {abaSelecionada === 'overview' && (
          <VisaoGeral aluno={aluno} vagas={vagas} setAbaSelecionada={setAbaSelecionada} />
        )}

        {/* MEUS HORÁRIOS */}
        {abaSelecionada === 'vagas' && (
          <MeusHorarios vagas={vagas} />
        )}

        {/* LOCAIS DE ESTÁGIO */}
        {abaSelecionada === 'locais' && (
          <Locais locais={locais} />
        )}

        {/* FREQUÊNCIA */}
        {abaSelecionada === 'frequencia' && (
          <Frequencia frequencia={frequencia} estagios={estagios} />
        )}

        {/* DADOS CADASTRAIS */}
        {abaSelecionada === 'dados' && (
          <DadosCadastrais aluno={aluno} />
        )}
      </div>
    </div>
  )
}
