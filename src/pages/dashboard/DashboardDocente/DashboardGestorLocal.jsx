import { useState } from 'react'
import { FiHome, FiUsers, FiTarget, FiMapPin, FiClipboard, FiEdit2, FiDownload, FiPlus, FiEye, FiUser, FiBarChart2, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiMenu, FiX, FiCalendar } from 'react-icons/fi'
import { MdLocalHospital } from 'react-icons/md'

export default function DashboardGestorLocal() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [filtroVagas, setFiltroVagas] = useState('todas')
  const [filtroAlunos, setFiltroAlunos] = useState('todos')
  const [instituicaoSelecionada, setInstituicaoSelecionada] = useState(null)
  const [modalInstituicao, setModalInstituicao] = useState(true)
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)

  // Mock de instituições atendidas pelo local
  const instituicoesAtendidas = [
    { id: 1, nome: 'UNIFESP', sigla: 'UNIFESP', alunos: 18, logo: '🏛️' },
    { id: 2, nome: 'USP - Faculdade de Medicina', sigla: 'USP-FM', alunos: 10, logo: '🎓' }
  ]

  // Dados mock do gestor do local
  const local = {
    nome: 'Hospital Universitário São Paulo',
    tipo: 'Hospital',
    cidade: 'São Paulo',
    endereco: 'Av. Lineu Prestes, 2565',
    telefone: '(11) 3091-9000',
    responsavel: 'Dra. Paula Santos',
    total_alunos: 28,
    alunos_ativos: 25,
    alunos_inativos: 3,
    vagas_total: 30,
    vagas_ocupadas: 25,
    vagas_livres: 5,
    preceptores_total: 8,
    convenio: 'Vigente',
    status: 'Ativo'
  }

  // Mock de vagas
  const vagas = [
    { id: 1, especialidade: 'Clínica Médica', preceptor: 'Dra. Maria Silva', ocupadas: 5, total: 5, status: 'Completa', periodo: '9º ao 11º', turno: 'Manhã', horario: '07:00 - 13:00', dias_semana: ['SEG', 'TER', 'QUA', 'QUI', 'SEX'], local: 'Enfermaria Ala A', instituicao: 'UNIFESP' },
    { id: 2, especialidade: 'Cirurgia Geral', preceptor: 'Dr. Carlos Oliveira', ocupadas: 4, total: 5, status: 'Disponível', periodo: '9º ao 11º', turno: 'Tarde', horario: '13:00 - 19:00', dias_semana: ['SEG', 'TER', 'QUA', 'QUI', 'SEX'], local: 'Centro Cirúrgico', instituicao: 'UNIFESP' },
    { id: 3, especialidade: 'Pediatria', preceptor: 'Dra. Ana Costa', ocupadas: 3, total: 4, status: 'Disponível', periodo: '10º ao 11º', turno: 'Manhã', horario: '07:00 - 13:00', dias_semana: ['SEG', 'TER', 'QUA'], local: 'Ambulatório Pediátrico', instituicao: 'USP-FM' },
    { id: 4, especialidade: 'Ginecologia', preceptor: 'Dra. Paula Santos', ocupadas: 5, total: 5, status: 'Completa', periodo: '9º ao 11º', turno: 'Integral', horario: '07:00 - 19:00', dias_semana: ['SEG', 'QUA', 'SEX'], local: 'Ambulatório Ginecológico', instituicao: 'UNIFESP' },
    { id: 5, especialidade: 'Cardiologia', preceptor: 'Dr. João Cardoso', ocupadas: 2, total: 3, status: 'Disponível', periodo: '10º ao 11º', turno: 'Tarde', horario: '13:00 - 19:00', dias_semana: ['SEG', 'QUA', 'SEX'], local: 'UTI Cardiológica', instituicao: 'USP-FM' },
    { id: 6, especialidade: 'Neurologia', preceptor: 'Dr. Rafael Lima', ocupadas: 3, total: 3, status: 'Completa', periodo: '11º', turno: 'Manhã', horario: '07:00 - 13:00', dias_semana: ['TER', 'QUI'], local: 'Ambulatório Neurológico', instituicao: 'UNIFESP' },
    { id: 7, especialidade: 'Ortopedia', preceptor: 'Dr. Fernando Costa', ocupadas: 2, total: 4, status: 'Disponível', periodo: '10º ao 11º', turno: 'Noite', horario: '19:00 - 01:00', dias_semana: ['SEG', 'QUA', 'SEX'], local: 'Pronto-Socorro Ortopédico', instituicao: 'USP-FM' },
    { id: 8, especialidade: 'Oftalmologia', preceptor: 'Dra. Beatriz Santos', ocupadas: 1, total: 2, status: 'Disponível', periodo: '11º', turno: 'Tarde', horario: '13:00 - 19:00', dias_semana: ['TER', 'QUI'], local: 'Ambulatório de Oftalmologia', instituicao: 'UNIFESP' }
  ]

  // Mock de preceptores
  const preceptores = [
    { id: 1, nome: 'Dra. Maria Silva', crm: '123456/SP', especialidade: 'Clínica Médica', experencia: 15, alunos: 5, status: 'Ativo', instituicao: 'UNIFESP' },
    { id: 2, nome: 'Dr. Carlos Oliveira', crm: '123457/SP', especialidade: 'Cirurgia Geral', experencia: 12, alunos: 4, status: 'Ativo', instituicao: 'UNIFESP' },
    { id: 3, nome: 'Dra. Ana Costa', crm: '123458/SP', especialidade: 'Pediatria', experencia: 10, alunos: 3, status: 'Ativo', instituicao: 'USP-FM' },
    { id: 4, nome: 'Dra. Paula Santos', crm: '123459/SP', especialidade: 'Ginecologia', experencia: 18, alunos: 5, status: 'Ativo', instituicao: 'UNIFESP' },
    { id: 5, nome: 'Dr. João Cardoso', crm: '123460/SP', especialidade: 'Cardiologia', experencia: 14, alunos: 2, status: 'Ativo', instituicao: 'USP-FM' },
    { id: 6, nome: 'Dr. Rafael Lima', crm: '123461/SP', especialidade: 'Neurologia', experencia: 11, alunos: 3, status: 'Ativo', instituicao: 'UNIFESP' },
    { id: 7, nome: 'Dr. Fernando Costa', crm: '123462/SP', especialidade: 'Ortopedia', experencia: 9, alunos: 2, status: 'Ativo', instituicao: 'USP-FM' },
    { id: 8, nome: 'Dra. Beatriz Santos', crm: '123463/SP', especialidade: 'Oftalmologia', experencia: 8, alunos: 1, status: 'Ativo', instituicao: 'UNIFESP' }
  ]

  // Mock de DISPONIBILIDADE_PRECEPTOR
  const disponibilidades = [
    {
      id_disponibilidade: 1,
      id_preceptor: 1,
      nome_preceptor: 'Dra. Maria Silva',
      nome_componente: 'Clínica Médica I',
      turno: 'Manhã',
      horario_inicio: '07:00',
      horario_fim: '13:00',
      dias_semana: ['SEG', 'TER', 'QUA', 'QUI', 'SEX'],
      capacidade_alunos: 5,
      alunos_alocados: 5,
      status: 'Ativa',
      instituicao: 'UNIFESP'
    },
    {
      id_disponibilidade: 2,
      id_preceptor: 2,
      nome_preceptor: 'Dr. Carlos Oliveira',
      nome_componente: 'Cirurgia Geral',
      turno: 'Tarde',
      horario_inicio: '13:00',
      horario_fim: '19:00',
      dias_semana: ['SEG', 'TER', 'QUA', 'QUI', 'SEX'],
      capacidade_alunos: 5,
      alunos_alocados: 4,
      status: 'Ativa',
      instituicao: 'UNIFESP'
    },
    {
      id_disponibilidade: 3,
      id_preceptor: 3,
      nome_preceptor: 'Dra. Ana Costa',
      nome_componente: 'Pediatria',
      turno: 'Manhã',
      horario_inicio: '07:00',
      horario_fim: '13:00',
      dias_semana: ['SEG', 'TER', 'QUA'],
      capacidade_alunos: 4,
      alunos_alocados: 3,
      status: 'Ativa',
      instituicao: 'USP-FM'
    },
    {
      id_disponibilidade: 4,
      id_preceptor: 5,
      nome_preceptor: 'Dr. João Cardoso',
      nome_componente: 'Cardiologia',
      turno: 'Tarde',
      horario_inicio: '13:00',
      horario_fim: '19:00',
      dias_semana: ['SEG', 'QUA', 'SEX'],
      capacidade_alunos: 3,
      alunos_alocados: 2,
      status: 'Ativa',
      instituicao: 'USP-FM'
    }
  ]

  // Mock de alunos do local
  const alunos = [
    { id: 1, nome: 'João Silva Santos', matricula: '202401234', periodo: 9, especialidade: 'Clínica Médica', preceptor: 'Dra. Maria Silva', desempenho: 9.0, frequencia: 95.5, status: 'Ativo', instituicao: 'UNIFESP' },
    { id: 2, nome: 'Maria Oliveira Costa', matricula: '202401235', periodo: 9, especialidade: 'Clínica Médica', preceptor: 'Dra. Maria Silva', desempenho: 8.2, frequencia: 88.2, status: 'Ativo', instituicao: 'UNIFESP' },
    { id: 3, nome: 'Carlos Ferreira Lima', matricula: '202401236', periodo: 10, especialidade: 'Cirurgia Geral', preceptor: 'Dr. Carlos Oliveira', desempenho: 8.8, frequencia: 92.1, status: 'Ativo', instituicao: 'UNIFESP' },
    { id: 4, nome: 'Ana Paula Silva', matricula: '202401237', periodo: 11, especialidade: 'Pediatria', preceptor: 'Dra. Ana Costa', desempenho: 7.5, frequencia: 85.0, status: 'Ativo', instituicao: 'USP-FM' },
    { id: 5, nome: 'Roberto Mendes', matricula: '202401238', periodo: 9, especialidade: 'Ginecologia', preceptor: 'Dra. Paula Santos', desempenho: 8.9, frequencia: 96.8, status: 'Ativo', instituicao: 'UNIFESP' },
    { id: 6, nome: 'Lucas Martins', matricula: '202401239', periodo: 10, especialidade: 'Cardiologia', preceptor: 'Dr. João Cardoso', desempenho: 8.0, frequencia: 90.0, status: 'Ativo', instituicao: 'USP-FM' },
    { id: 7, nome: 'Fernanda Rocha', matricula: '202401240', periodo: 11, especialidade: 'Ortopedia', preceptor: 'Dr. Fernando Costa', desempenho: 7.8, frequencia: 87.5, status: 'Ativo', instituicao: 'USP-FM' },
    { id: 8, nome: 'Patricia Gomes', matricula: '202401241', periodo: 11, especialidade: 'Oftalmologia', preceptor: 'Dra. Beatriz Santos', desempenho: 8.5, frequencia: 93.0, status: 'Ativo', instituicao: 'UNIFESP' }
  ]

  // Filtrar vagas e alunos por instituição selecionada
  const vagasFiltradas = vagas.filter(v => {
    const matchInstituicao = !instituicaoSelecionada || v.instituicao === instituicaoSelecionada
    if (filtroVagas === 'livres') return matchInstituicao && v.status === 'Disponível'
    if (filtroVagas === 'completas') return matchInstituicao && v.status === 'Completa'
    return matchInstituicao
  })

  // Filtrar alunos por instituição
  const alunosFiltrados = alunos.filter(a => {
    const matchInstituicao = !instituicaoSelecionada || a.instituicao === instituicaoSelecionada
    if (filtroAlunos === 'ativos') return matchInstituicao && a.status === 'Ativo'
    if (filtroAlunos === 'inativos') return matchInstituicao && a.status === 'Inativo'
    return matchInstituicao
  })

  // Filtrar preceptores por instituição
  const preceptoresFiltrados = preceptores.filter(p => {
    return !instituicaoSelecionada || p.instituicao === instituicaoSelecionada
  })

  // Filtrar disponibilidades por instituição
  const disponibilidadesFiltradas = disponibilidades.filter(d => {
    return !instituicaoSelecionada || d.instituicao === instituicaoSelecionada
  })

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-[#F5F7FA] to-white'>
      {/* Modal de Seleção de Instituição */}
      {modalInstituicao && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-fadeIn'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2 text-center'>🏛️ Selecione a Instituição</h2>
            <p className='text-gray-600 text-center mb-8'>Escolha qual instituição você deseja visualizar no local {local.nome}</p>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
              {instituicoesAtendidas.map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => {
                    setInstituicaoSelecionada(inst.sigla)
                    setModalInstituicao(false)
                  }}
                  className='bg-linear-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-[#237EE6] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg group'
                >
                  <div className='text-5xl mb-3 group-hover:scale-110 transition-transform duration-300'>{inst.logo}</div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>{inst.nome}</h3>
                  <div className='flex items-center justify-center gap-2 text-[#237EE6] font-semibold'>
                    <FiUsers size={18} />
                    <span>{inst.alunos} alunos</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setInstituicaoSelecionada(null)
                setModalInstituicao(false)
              }}
              className='w-full py-3 text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300'
            >
              Ver todas as instituições
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold mb-2'>🏥 Gestor do Local de Estágio</h1>
              <p className='text-blue-100 text-sm lg:text-base'>{local.nome} • {local.cidade}</p>
              {instituicaoSelecionada && (
                <div className='mt-2 inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-lg'>
                  <span className='text-sm'>Visualizando:</span>
                  <span className='font-bold'>{instituicoesAtendidas.find(i => i.sigla === instituicaoSelecionada)?.nome}</span>
                </div>
              )}
            </div>
            <div className='flex gap-3'>
              <button 
                onClick={() => setModalInstituicao(true)}
                className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300'
              >
                🏛️ Trocar Instituição
              </button>
              <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300'>
                ✏️ Editar Local
              </button>
              <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300'>
                📋 Relatórios
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className='border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm'>
        <div className='max-w-7xl mx-auto px-6 lg:px-12'>
          {/* Mobile: Botão Hambúrguer + Aba Atual */}
          <div className='md:hidden flex items-center justify-between py-4'>
            <button
              onClick={() => setMenuMobileAberto(!menuMobileAberto)}
              className='flex items-center gap-2 text-gray-900 font-semibold'
            >
              {menuMobileAberto ? <FiX size={24} /> : <FiMenu size={24} />}
              <span className='text-sm'>
                {abaSelecionada === 'overview' && '📊 Visão Geral'}
                {abaSelecionada === 'vagas' && '🎯 Vagas'}
                {abaSelecionada === 'preceptores' && '👨‍⚕️ Preceptores'}
                {abaSelecionada === 'alunos' && '👥 Alunos'}
                {abaSelecionada === 'disponibilidade' && '📅 Disponibilidade'}
              </span>
            </button>
          </div>

          {/* Mobile: Menu Dropdown */}
          {menuMobileAberto && (
            <div className='md:hidden absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg'>
              <div className='py-2'>
                <button
                  onClick={() => {
                    setAbaSelecionada('overview')
                    setMenuMobileAberto(false)
                  }}
                  className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${
                    abaSelecionada === 'overview'
                      ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiHome size={18} />
                  <span>Visão Geral</span>
                </button>
                <button
                  onClick={() => {
                    setAbaSelecionada('vagas')
                    setMenuMobileAberto(false)
                  }}
                  className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${
                    abaSelecionada === 'vagas'
                      ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiTarget size={18} />
                  <span>Vagas</span>
                </button>
                <button
                  onClick={() => {
                    setAbaSelecionada('preceptores')
                    setMenuMobileAberto(false)
                  }}
                  className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${
                    abaSelecionada === 'preceptores'
                      ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiUser size={18} />
                  <span>Preceptores</span>
                </button>
                <button
                  onClick={() => {
                    setAbaSelecionada('alunos')
                    setMenuMobileAberto(false)
                  }}
                  className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${
                    abaSelecionada === 'alunos'
                      ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiUsers size={18} />
                  <span>Alunos</span>
                </button>
                <button
                  onClick={() => {
                    setAbaSelecionada('disponibilidade')
                    setMenuMobileAberto(false)
                  }}
                  className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${
                    abaSelecionada === 'disponibilidade'
                      ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiCalendar size={18} />
                  <span>Disponibilidade</span>
                </button>
              </div>
            </div>
          )}

          {/* Desktop: Abas Horizontais */}
          <div className='hidden md:flex gap-8 overflow-x-auto'>
            <button
              onClick={() => setAbaSelecionada('overview')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'overview'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiHome size={18} />
              <span>Visão Geral</span>
            </button>
            <button
              onClick={() => setAbaSelecionada('vagas')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'vagas'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiTarget size={18} />
              <span>Vagas</span>
            </button>
            <button
              onClick={() => setAbaSelecionada('preceptores')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'preceptores'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiUser size={18} />
              <span>Preceptores</span>
            </button>
            <button
              onClick={() => setAbaSelecionada('alunos')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'alunos'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiUsers size={18} />
              <span>Alunos</span>
            </button>
            <button
              onClick={() => setAbaSelecionada('disponibilidade')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'disponibilidade'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiCalendar size={18} />
              <span>Disponibilidade</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className='max-w-7xl mx-auto px-6 lg:px-12 py-10'>
        {/* VISÃO GERAL */}
        {abaSelecionada === 'overview' && (
          <div className='space-y-8'>
            {/* Cards Principais */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {/* Card Alunos */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Alunos</h3>
                  <FiUsers size={32} className='text-[#237EE6]' />
                </div>
                <p className='text-4xl font-bold text-[#237EE6] mb-2'>{local.total_alunos}</p>
                <div className='text-sm text-gray-600 space-y-1'>
                  <p className='flex items-center gap-1'><FiCheckCircle size={14} /> {local.alunos_ativos} ativos</p>
                  <p className='flex items-center gap-1'><FiAlertCircle size={14} /> {local.alunos_inativos} inativos</p>
                </div>
              </div>

              {/* Card Vagas */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Vagas</h3>
                  <FiTarget size={32} className='text-[#10E686]' />
                </div>
                <p className='text-4xl font-bold text-[#10E686] mb-2'>{local.vagas_ocupadas}/{local.vagas_total}</p>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div className='bg-linear-to-r from-[#10E686] to-[#60E6D7] h-2 rounded-full' style={{ width: `${(local.vagas_ocupadas / local.vagas_total) * 100}%` }}></div>
                </div>
                <p className='text-sm text-gray-600 mt-2'>{((local.vagas_ocupadas / local.vagas_total) * 100).toFixed(0)}% ocupadas</p>
              </div>

              {/* Card Preceptores */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Preceptores</h3>
                  <FiUser size={32} className='text-[#60E6D7]' />
                </div>
                <p className='text-4xl font-bold text-[#60E6D7] mb-2'>{instituicaoSelecionada ? preceptoresFiltrados.length : local.preceptores_total}</p>
                <p className='text-sm text-gray-600'>{instituicaoSelecionada ? `Da ${instituicaoSelecionada}` : 'Ativos no local'}</p>
              </div>

              {/* Card Convênio */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Convênio</h3>
                  <FiCheckCircle size={32} className='text-[#60C9E6]' />
                </div>
                <p className='text-2xl font-bold text-[#60C9E6] mb-2'>{local.convenio}</p>
                <p className='text-sm text-gray-600'>Status do local</p>
              </div>
            </div>

            {/* Informações do Local */}
            <div className='bg-white rounded-2xl shadow-md p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'><FiMapPin size={28} /> Informações do Local</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <p className='text-sm text-gray-600'>Nome do Local</p>
                  <p className='text-lg font-semibold text-gray-900'>{local.nome}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Tipo</p>
                  <p className='text-lg font-semibold text-gray-900'>{local.tipo}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Endereço</p>
                  <p className='text-lg font-semibold text-gray-900'>{local.endereco}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Cidade</p>
                  <p className='text-lg font-semibold text-gray-900'>{local.cidade}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Telefone</p>
                  <p className='text-lg font-semibold text-gray-900'>{local.telefone}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Responsável</p>
                  <p className='text-lg font-semibold text-gray-900'>{local.responsavel}</p>
                </div>
              </div>
            </div>

            {/* Tabela Resumida de Alunos */}
            <div className='bg-white rounded-2xl shadow-md p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'><FiUsers size={28} /> Alunos Recentes</h2>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200'>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunosFiltrados.slice(0, 5).map((aluno) => (
                      <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aluno.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.matricula}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.instituicao}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.especialidade}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.preceptor}</td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>
                            {aluno.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ALUNOS */}
        {abaSelecionada === 'alunos' && (
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={32} /> Alunos do Local</h2>
              <div className='flex gap-3'>
                <select
                  value={filtroAlunos}
                  onChange={(e) => setFiltroAlunos(e.target.value)}
                  className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                >
                  <option value='todos'>Todos ({alunos.length})</option>
                  <option value='ativos'>Ativos ({alunos.filter(a => a.status === 'Ativo').length})</option>
                  <option value='inativos'>Inativos ({alunos.filter(a => a.status === 'Inativo').length})</option>
                </select>
                <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                  <FiPlus size={18} /> Matricular Aluno
                </button>
              </div>
            </div>

            {/* Tabela Completa de Alunos */}
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Período</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Desempenho</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunosFiltrados.map((aluno) => (
                      <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aluno.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.matricula}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.instituicao}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.periodo}º</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.especialidade}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.preceptor}</td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-16 bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                style={{ width: `${(aluno.desempenho / 10) * 100}%` }}
                              ></div>
                            </div>
                            <span className='text-sm font-semibold text-gray-900'>{aluno.desempenho}</span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-16 bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-linear-to-r from-[#60C9E6] to-[#10E686] h-2 rounded-full'
                                style={{ width: `${aluno.frequencia}%` }}
                              ></div>
                            </div>
                            <span className='text-sm font-semibold text-gray-900'>{aluno.frequencia}%</span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>
                            {aluno.status}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300'>
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VAGAS */}
        {abaSelecionada === 'vagas' && (
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiTarget size={32} /> Gestão de Vagas</h2>
              <div className='flex gap-3'>
                <select
                  value={filtroVagas}
                  onChange={(e) => setFiltroVagas(e.target.value)}
                  className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                >
                  <option value='todas'>Todas ({vagas.length})</option>
                  <option value='livres'>Disponíveis ({vagas.filter(v => v.status === 'Disponível').length})</option>
                  <option value='completas'>Completas ({vagas.filter(v => v.status === 'Completa').length})</option>
                </select>
                <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                  <FiPlus size={18} /> Nova Vaga
                </button>
              </div>
            </div>

            {/* Grid de Vagas */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {vagasFiltradas.map((vaga) => (
                <div key={vaga.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
                  <div className={`h-2 bg-linear-to-r ${
                    vaga.status === 'Completa'
                      ? 'from-gray-400 to-gray-500'
                      : 'from-[#10E686] to-[#60E6D7]'
                  }`}></div>
                  <div className='p-6'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <p className='text-sm text-[#237EE6] font-semibold uppercase'>{vaga.especialidade}</p>
                        <h3 className='text-lg font-bold text-gray-900 mt-1'>Vaga {vaga.id}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        vaga.status === 'Completa'
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-[#10E686]/20 text-[#10E686]'
                      }`}>
                        {vaga.status}
                      </span>
                    </div>

                    <div className='mb-4'>
                      <p className='text-sm text-gray-600 mb-2'>👨‍⚕️ {vaga.preceptor}</p>
                      <p className='text-sm text-gray-600 mb-2'>� {vaga.local}</p>
                      <p className='text-sm text-gray-600 mb-2'>🏛️ {vaga.instituicao}</p>
                      <p className='text-sm text-gray-600 mb-2'>📚 Períodos: {vaga.periodo}</p>
                      
                      <div className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 mb-2'>
                        <div className='flex items-center gap-2 mb-2'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            vaga.turno === 'Manhã' ? 'bg-amber-100 text-amber-700' :
                            vaga.turno === 'Tarde' ? 'bg-orange-100 text-orange-700' :
                            vaga.turno === 'Noite' ? 'bg-indigo-100 text-indigo-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {vaga.turno}
                          </span>
                          <span className='text-sm text-gray-900 font-bold'>⏰ {vaga.horario}</span>
                        </div>
                        <div className='flex gap-1 flex-wrap'>
                          {vaga.dias_semana.map((dia) => (
                            <span key={dia} className='px-2 py-1 bg-white border border-blue-200 text-blue-700 rounded text-xs font-semibold'>
                              {dia}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className='flex items-center justify-between mb-2'>
                        <p className='text-sm text-gray-700 font-semibold'>Ocupação</p>
                        <p className='text-sm text-gray-600'>{vaga.ocupadas} de {vaga.total}</p>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                          style={{ width: `${(vaga.ocupadas / vaga.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className='flex gap-3'>
                      <button className='flex-1 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm'>
                        Editar
                      </button>
                      <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300 text-sm'>
                        Ver Alunos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRECEPTORES */}
        {abaSelecionada === 'preceptores' && (
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiUser size={32} /> Gerenciamento de Preceptores</h2>
              <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                <FiPlus size={18} /> Novo Preceptor
              </button>
            </div>

            {/* Cards de Resumo */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-white rounded-2xl shadow-md p-6'>
                <p className='text-sm text-gray-600'>Total de Preceptores</p>
                <p className='text-4xl font-bold text-[#237EE6] mt-2'>{preceptoresFiltrados.length}</p>
              </div>
              <div className='bg-white rounded-2xl shadow-md p-6'>
                <p className='text-sm text-gray-600'>Média de Alunos/Preceptor</p>
                <p className='text-4xl font-bold text-[#10E686] mt-2'>{preceptoresFiltrados.length > 0 ? (alunosFiltrados.length / preceptoresFiltrados.length).toFixed(1) : '0'}</p>
              </div>
            </div>

            {/* Tabela de Preceptores */}
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>CRM</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Anos Exp.</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alunos</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preceptoresFiltrados.map((preceptor) => (
                      <tr key={preceptor.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{preceptor.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.crm}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.instituicao}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.especialidade}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.experencia}</td>
                        <td className='px-6 py-4 text-sm text-gray-700 font-semibold'>{preceptor.alunos}</td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>
                            {preceptor.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 flex items-center gap-2'>
                          <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                            <FiEdit2 size={16} /> Editar
                          </button>
                          <button className='text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                            <FiEye size={16} /> Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grid de Preceptores */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {preceptoresFiltrados.map((preceptor) => (
                <div key={preceptor.id} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-bold text-gray-900'>{preceptor.nome}</h3>
                    <FiUser size={24} className='text-[#237EE6]' />
                  </div>

                  <div className='space-y-3 mb-6'>
                    <div>
                      <p className='text-xs text-gray-600'>Instituição</p>
                      <p className='text-sm font-semibold text-gray-900'>🏛️ {preceptor.instituicao}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-600'>Especialidade</p>
                      <p className='text-sm font-semibold text-gray-900'>{preceptor.especialidade}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-600'>CRM</p>
                      <p className='text-sm font-semibold text-gray-900'>{preceptor.crm}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-600'>Experiência</p>
                      <p className='text-sm font-semibold text-gray-900'>{preceptor.experencia} anos</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-600 mb-1'>Alunos Supervisionados</p>
                      <p className='text-2xl font-bold text-[#237EE6]'>{preceptor.alunos}</p>
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <button className='flex-1 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                      <FiEdit2 size={14} /> Editar
                    </button>
                    <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                      <FiEye size={14} /> Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DISPONIBILIDADE DE PRECEPTORES */}
        {abaSelecionada === 'disponibilidade' && (
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>📅 Disponibilidade de Preceptores</h2>
              <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                <FiPlus size={18} /> Nova Disponibilidade
              </button>
            </div>
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Componente</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Turno</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Horário</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Dias</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Capacidade</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alocação</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disponibilidadesFiltradas.map((disp) => (
                      <tr key={disp.id_disponibilidade} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                        <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{disp.nome_preceptor}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{disp.nome_componente}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{disp.turno}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{disp.horario_inicio} - {disp.horario_fim}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>
                          <div className='flex gap-1'>
                            {disp.dias_semana.map((dia) => (
                              <span key={dia} className='px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold'>
                                {dia}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{disp.capacidade_alunos}</td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-20 bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                style={{ width: `${(disp.alunos_alocados / disp.capacidade_alunos) * 100}%` }}
                              ></div>
                            </div>
                            <span className='text-sm font-semibold'>{disp.alunos_alocados}/{disp.capacidade_alunos}</span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>{disp.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

