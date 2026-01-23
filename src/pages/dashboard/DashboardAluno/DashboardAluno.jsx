import { useState } from 'react'
import { FiHome, FiBarChart2, FiTarget, FiMapPin, FiCheckCircle, FiUser, FiMenu, FiX } from 'react-icons/fi'
import Sidebar from '../../../components/layout/Sidebar/Sidebar'
import { menuAluno } from '../../../config/dashboardMenus'
import VisaoGeral from './components/VisaoGeral'
import MeusHorarios from './components/MeusHorarios'
import Locais from './components/Locais'
import Frequencia from './components/Frequencia'
import DadosCadastrais from './components/DadosCadastrais'
import Documentos from './components/Documentos'
import HeaderAluno from './components/HeaderAluno'

export default function DashboardAluno() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)
  
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
    <div className='flex w-full min-h-screen bg-linear-to-br from-[#F5F7FA] to-white overflow-x-hidden'>
      {/* Sidebar Desktop */}
      <Sidebar 
        abaSelecionada={abaSelecionada} 
        setAbaSelecionada={setAbaSelecionada}
        menuItems={menuAluno}
        titulo="Painel do Aluno"
        subtitulo="v1.0.0"
        onExpandChange={setSidebarExpanded}
      />
      
      {/* Conteúdo Principal */}
      <div className={`flex-1 transition-all duration-300 ml-0 ${sidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header */}
        <HeaderAluno aluno={aluno} />

        {/* Menu Mobile */}
        <div className='lg:hidden bg-white border-b border-gray-200 px-4 py-3'>
          <button
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
            className='flex items-center gap-2 text-gray-700 hover:text-[#237EE6] transition-colors'
          >
            {menuMobileAberto ? <FiX size={24} /> : <FiMenu size={24} />}
            <span className='font-semibold'>Menu</span>
          </button>

          {/* Dropdown Menu Mobile */}
          {menuMobileAberto && (
            <div className='mt-4 space-y-4 animate-fadeIn'>
              {menuAluno.map((secao) => (
                <div key={secao.categoria}>
                  <p className='text-xs font-semibold text-gray-500 uppercase mb-2'>{secao.categoria}</p>
                  <div className='space-y-2'>
                    {secao.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setAbaSelecionada(item.id)
                          setMenuMobileAberto(false)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          abaSelecionada === item.id
                            ? 'bg-[#237EE6] text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icone size={20} />
                        <span className='font-medium'>{item.nome}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      {/* Conteúdo */}
      <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-6 md:py-10'>
        {/* VISÃO GERAL */}
        {abaSelecionada === 'overview' && (
          <VisaoGeral aluno={aluno} vagas={vagas} setAbaSelecionada={setAbaSelecionada} />
        )}

        {/* MEUS HORÁRIOS */}
        {abaSelecionada === 'horarios' && (
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

        {/* DOCUMENTOS */}
        {abaSelecionada === 'documentos' && (
          <Documentos />
        )}

        {/* DADOS CADASTRAIS */}
        {abaSelecionada === 'dados' && (
          <DadosCadastrais aluno={aluno} />
        )}
      </div>
      </div>
    </div>
  )
}
