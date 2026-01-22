import { useState } from 'react'
import { FiHome, FiUsers, FiCheckCircle, FiAlertCircle, FiClipboard, FiEdit2, FiDownload, FiPlus, FiEye, FiBarChart2, FiTrendingUp, FiFilter, FiMapPin, FiMenu, FiX, FiTarget, FiCalendar } from 'react-icons/fi'

export default function DashboardPreceptor() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)
  const [filtroFrequencia, setFiltroFrequencia] = useState('pendentes')
  const [filtroData, setFiltroData] = useState('')
  const [filtroLocal, setFiltroLocal] = useState('todos')
  const [modalAssociarEspecialidade, setModalAssociarEspecialidade] = useState(false)
  const [vagaSelecionada, setVagaSelecionada] = useState(null)
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null)

  // Dados mock do preceptor
  const preceptor = {
    nome: 'Dra. Maria Silva',
    cpf: '123.456.789-00',
    especialidade: 'Clínica Médica',
    registro: 'CRM-SP 123456',
    total_alunos: 5,
    frequencias_pendentes: 8,
    avaliacoes_pendentes: 3,
    vinculos_ativos: 2
  }

  // Mock de vínculos
  const vinculos = [
    {
      id: 1,
      instituicao: 'UNIFESP',
      local: 'Hospital Universitário São Paulo',
      tipo_vinculo: 'Bolsista',
      carga_horaria_semanal: 20,
      valor_hora: 150.00,
      status: 'Ativo'
    },
    {
      id: 2,
      instituicao: 'USP',
      local: 'Hospital das Clínicas',
      tipo_vinculo: 'PJ',
      carga_horaria_semanal: 12,
      valor_hora: 180.00,
      status: 'Ativo'
    }
  ]

  // Mock de alunos supervisionados
  const alunos = [
    {
      id: 1,
      nome: 'João Silva Santos',
      matricula: '202401234',
      periodo: 9,
      instituicao: 'UNIFESP',
      especialidade: 'Clínica Médica',
      frequencia: 95.5,
      frequencias_pendentes: 2,
      avaliacoes_pendentes: 1,
      local: 'Hospital Universitário',
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Maria Oliveira Costa',
      matricula: '202401235',
      periodo: 9,
      instituicao: 'UNIFESP',
      especialidade: 'Clínica Médica',
      frequencia: 88.2,
      frequencias_pendentes: 3,
      avaliacoes_pendentes: 0,
      local: 'Hospital Universitário',
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Carlos Ferreira Lima',
      matricula: '202401236',
      periodo: 10,
      instituicao: 'USP',
      especialidade: 'Clínica Médica',
      frequencia: 92.1,
      frequencias_pendentes: 1,
      avaliacoes_pendentes: 1,
      local: 'Hospital das Clínicas',
      status: 'Ativo'
    },
    {
      id: 4,
      nome: 'Ana Paula Silva',
      matricula: '202401237',
      periodo: 11,
      instituicao: 'USP',
      especialidade: 'Clínica Médica',
      frequencia: 85.0,
      frequencias_pendentes: 2,
      avaliacoes_pendentes: 1,
      local: 'Hospital das Clínicas',
      status: 'Ativo'
    },
    {
      id: 5,
      nome: 'Pedro Almeida',
      matricula: '202401238',
      periodo: 9,
      instituicao: 'UNIFESP',
      especialidade: 'Clínica Médica',
      frequencia: 90.0,
      frequencias_pendentes: 0,
      avaliacoes_pendentes: 0,
      local: 'Hospital Universitário',
      status: 'Ativo'
    }
  ]

  // Obter locais únicos
  const locaisUnicos = ['todos', ...new Set(alunos.map(a => a.local))]

  // Mock de registros de frequência para validação
  const frequenciasPendentes = [
    {
      id: 1,
      aluno: 'João Silva Santos',
      instituicao: 'UNIFESP',
      data: '2025-02-12',
      tipo: 'Check-in',
      horario: '08:05:32',
      local: 'Hospital Universitário',
      distancia: 45,
      dentro_raio: true,
      foto_checkin: '/fotos/checkin_123.jpg',
      status: 'Pendente'
    },
    {
      id: 2,
      aluno: 'João Silva Santos',
      instituicao: 'UNIFESP',
      data: '2025-02-12',
      tipo: 'Check-out',
      horario: '12:10:15',
      local: 'Hospital Universitário',
      distancia: 38,
      dentro_raio: true,
      foto_checkin: '/fotos/checkout_123.jpg',
      status: 'Pendente'
    },
    {
      id: 3,
      aluno: 'Maria Oliveira Costa',
      instituicao: 'UNIFESP',
      data: '2025-02-11',
      tipo: 'Check-in',
      horario: '08:00:10',
      local: 'Hospital Universitário',
      distancia: 52,
      dentro_raio: true,
      foto_checkin: '/fotos/checkin_124.jpg',
      status: 'Pendente'
    },
    {
      id: 4,
      aluno: 'Maria Oliveira Costa',
      instituicao: 'UNIFESP',
      data: '2025-02-11',
      tipo: 'Check-out',
      horario: '12:05:45',
      local: 'Hospital Universitário',
      distancia: 48,
      dentro_raio: true,
      foto_checkin: '/fotos/checkout_124.jpg',
      status: 'Pendente'
    },
    {
      id: 5,
      aluno: 'Carlos Ferreira Lima',
      instituicao: 'USP',
      data: '2025-02-10',
      tipo: 'Check-in',
      horario: '14:02:20',
      local: 'Hospital das Clínicas',
      distancia: 120,
      dentro_raio: false,
      foto_checkin: '/fotos/checkin_125.jpg',
      status: 'Pendente'
    }
  ]

  // Mock de avaliações pendentes
  const avaliacoesPendentes = [
    {
      id: 1,
      aluno: 'João Silva Santos',
      instituicao: 'UNIFESP',
      periodo: '2025-02-03 a 2025-04-02',
      tipo: 'Avaliação Atitudinal',
      criterios: ['Assiduidade', 'Pontualidade', 'Comprometimento', 'Trabalho em Equipe'],
      prazo: '2025-04-05'
    },
    {
      id: 2,
      aluno: 'Carlos Ferreira Lima',
      instituicao: 'USP',
      periodo: '2025-02-03 a 2025-04-02',
      tipo: 'Avaliação Atitudinal',
      criterios: ['Assiduidade', 'Pontualidade', 'Comprometimento', 'Trabalho em Equipe'],
      prazo: '2025-04-05'
    },
    {
      id: 3,
      aluno: 'Ana Paula Silva',
      instituicao: 'USP',
      periodo: '2025-02-03 a 2025-04-02',
      tipo: 'Avaliação Atitudinal',
      criterios: ['Assiduidade', 'Pontualidade', 'Comprometimento', 'Trabalho em Equipe'],
      prazo: '2025-04-05'
    }
  ]

  // Calcular estatísticas consolidadas por instituição (alunos e carga horária somada)
  const instituicoesStats = Object.values(
    vinculos.reduce((acc, vinculo) => {
      const alunosDaInstituicao = alunos.filter(aluno => aluno.instituicao === vinculo.instituicao)
      if (!acc[vinculo.instituicao]) {
        acc[vinculo.instituicao] = {
          instituicao: vinculo.instituicao,
          local: vinculo.local,
          totalAlunos: alunosDaInstituicao.length,
          cargaHoraria: vinculo.carga_horaria_semanal,
          status: vinculo.status
        }
      } else {
        acc[vinculo.instituicao].cargaHoraria += vinculo.carga_horaria_semanal
        acc[vinculo.instituicao].totalAlunos = alunosDaInstituicao.length
      }
      return acc
    }, {})
  )
  const totalInstituicoes = instituicoesStats.length

  // Mock de vagas do preceptor (apenas suas vagas)
  const vagas = [
    { id: 1, especialidade: 'Clínica Médica I', local: 'Hospital Universitário São Paulo', instituicao: 'UNIFESP', ocupadas: 5, total: 5, status: 'Completa', periodo: '9º ao 11º', turno: 'Manhã', horario: '07:00 - 13:00', dias_semana: ['SEG', 'TER', 'QUA', 'QUI', 'SEX'] },
    { id: 2, especialidade: 'Clínica Médica II', local: 'Hospital Universitário São Paulo', instituicao: 'UNIFESP', ocupadas: 3, total: 5, status: 'Disponível', periodo: '9º ao 11º', turno: 'Tarde', horario: '13:00 - 19:00', dias_semana: ['SEG', 'TER', 'QUA', 'QUI', 'SEX'] },
    { id: 3, especialidade: 'Clínica Médica III', local: 'Hospital das Clínicas', instituicao: 'USP', ocupadas: 4, total: 4, status: 'Completa', periodo: '10º ao 11º', turno: 'Manhã', horario: '07:00 - 13:00', dias_semana: ['SEG', 'TER', 'QUA'] }
  ]

  // Mock de especialidades disponíveis para associação
  const especialidades = [
    { id: 1, nome: 'Clínica Médica I', codigo: 'CM001', periodo: '9º' },
    { id: 2, nome: 'Clínica Médica II', codigo: 'CM002', periodo: '9º' },
    { id: 3, nome: 'Clínica Médica III', codigo: 'CM003', periodo: '10º' },
    { id: 4, nome: 'Clínica Médica IV', codigo: 'CM004', periodo: '11º' }
  ]

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white'>
      {/* Header */}
      <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2'><FiUsers size={36} /> {preceptor.nome}</h1>
              <p className='text-blue-100 text-sm lg:text-base'>{preceptor.especialidade} • {preceptor.registro}</p>
            </div>
            <div className='flex gap-3'>
              <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2'>
                <FiClipboard size={18} /> Meus Vínculos
              </button>
              <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2'>
                <FiFilter size={18} /> Configurações
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
                {abaSelecionada === 'overview' && 'Visão Geral'}
                {abaSelecionada === 'alunos' && 'Meus Alunos'}
                {abaSelecionada === 'frequencia' && 'Validar Frequência'}
                {abaSelecionada === 'avaliacoes' && 'Avaliações'}
              </span>
            </button>
          </div>

          {/* Mobile: Menu Dropdown */}
          {menuMobileAberto && (
            <div className='md:hidden absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg'>
              <div className='py-2'>
                <button onClick={() => { setAbaSelecionada('overview'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'overview' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiHome size={18} /> Visão Geral</button>
                <button onClick={() => { setAbaSelecionada('alunos'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'alunos' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiUsers size={18} /> Meus Alunos</button>
                <button onClick={() => { setAbaSelecionada('vagas'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'vagas' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiTarget size={18} /> Vagas do Local</button>
                <button onClick={() => { setAbaSelecionada('frequencia'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'frequencia' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiCheckCircle size={18} /> Validar Frequência</button>
                <button onClick={() => { setAbaSelecionada('avaliacoes'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'avaliacoes' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiTrendingUp size={18} /> Avaliações</button>
              </div>
            </div>
          )}

          {/* Desktop: Abas Horizontais */}
          <div className='hidden md:flex gap-8 overflow-x-auto'>
            <button
              onClick={() => setAbaSelecionada('overview')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap ${
                abaSelecionada === 'overview'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiHome size={18} className='inline mr-1' /> Visão Geral
            </button>
            <button
              onClick={() => setAbaSelecionada('alunos')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap ${
                abaSelecionada === 'alunos'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiUsers size={18} className='inline mr-1' /> Meus Alunos
            </button>
            <button
              onClick={() => setAbaSelecionada('vagas')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap ${
                abaSelecionada === 'vagas'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiTarget size={18} className='inline mr-1' /> Vagas do Local
            </button>
            <button
              onClick={() => setAbaSelecionada('frequencia')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap ${
                abaSelecionada === 'frequencia'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiCheckCircle size={18} className='inline mr-1' /> Validar Frequência
            </button>
            <button
              onClick={() => setAbaSelecionada('avaliacoes')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap ${
                abaSelecionada === 'avaliacoes'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiTrendingUp size={18} className='inline mr-1' /> Avaliações
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
                <p className='text-4xl font-bold text-[#237EE6] mb-2'>{preceptor.total_alunos}</p>
                <p className='text-sm text-gray-600'>Sob supervisão</p>
              </div>

              {/* Card Frequências Pendentes */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Frequências</h3>
                  <FiCheckCircle size={32} className='text-yellow-500' />
                </div>
                <p className='text-4xl font-bold text-yellow-600 mb-2'>{preceptor.frequencias_pendentes}</p>
                <p className='text-sm text-gray-600'>Aguardando validação</p>
              </div>

              {/* Card Avaliações Pendentes */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Avaliações</h3>
                  <FiTrendingUp size={32} className='text-[#60E6D7]' />
                </div>
                <p className='text-4xl font-bold text-[#60E6D7] mb-2'>{preceptor.avaliacoes_pendentes}</p>
                <p className='text-sm text-gray-600'>Pendentes</p>
              </div>

              {/* Card Vínculos */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Vínculos</h3>
                  <FiClipboard size={32} className='text-[#10E686]' />
                </div>
                <p className='text-4xl font-bold text-[#10E686] mb-2'>{preceptor.vinculos_ativos}</p>
                <p className='text-sm text-gray-600'>Instituições ativas</p>
              </div>
            </div>

            {/* Instituições Atendidas */}
            <div className='bg-white rounded-2xl shadow-md p-8'>
              <div className='flex items-center justify-between mb-6 flex-wrap gap-3'>
                <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'><FiBarChart2 size={28} /> Instituições Atendidas</h2>
                <span className='px-3 py-1 rounded-full bg-[#237EE6]/10 text-[#237EE6] text-sm font-semibold'>
                  {totalInstituicoes} instituição{totalInstituicoes !== 1 ? 's' : ''}
                </span>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {instituicoesStats.map((inst, index) => (
                  <div key={index} className='p-6 bg-gradient-to-br from-[#F5F7FA] to-white border-2 border-gray-200 rounded-xl hover:border-[#237EE6] transition-all duration-300'>
                    <div className='flex items-start justify-between mb-4'>
                      <div>
                        <h3 className='text-xl font-bold text-gray-900 mb-1'>{inst.instituicao}</h3>
                        <p className='text-sm text-gray-600 flex items-center gap-1'><FiMapPin size={14} /> {inst.local}</p>
                      </div>
                      <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                        {inst.status}
                      </span>
                    </div>
                    <div className='grid grid-cols-2 gap-4 mt-4'>
                      <div className='p-3 bg-white rounded-lg'>
                        <p className='text-xs text-gray-600 mb-1'>Alunos nessa instituição</p>
                        <p className='text-2xl font-bold text-[#237EE6]'>{inst.totalAlunos}</p>
                      </div>
                      <div className='p-3 bg-white rounded-lg'>
                        <p className='text-xs text-gray-600 mb-1'>Horas semanais</p>
                        <p className='text-2xl font-bold text-[#60C9E6]'>{inst.cargaHoraria}h</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vínculos Ativos */}
            <div className='bg-white rounded-2xl shadow-md p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'><FiClipboard size={28} /> Meus Vínculos</h2>
              <div className='space-y-4'>
                {vinculos.map((vinculo) => (
                  <div key={vinculo.id} className='p-5 border-2 border-gray-200 rounded-xl hover:border-[#237EE6] transition-all duration-300'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <h3 className='font-bold text-gray-900 text-lg'>{vinculo.local}</h3>
                          <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                            {vinculo.status}
                          </span>
                        </div>
                        <p className='text-sm text-gray-600 mb-3'>{vinculo.instituicao}</p>
                        <div className='flex flex-wrap gap-4 text-sm text-gray-700'>
                          <span className='flex items-center gap-1'><FiClipboard size={16} /> {vinculo.tipo_vinculo}</span>
                          <span className='flex items-center gap-1'><FiBarChart2 size={16} /> {vinculo.carga_horaria_semanal}h semanais</span>
                          <span className='flex items-center gap-1'><FiTrendingUp size={16} /> R$ {vinculo.valor_hora.toFixed(2)}/hora</span>
                        </div>
                      </div>
                      <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 whitespace-nowrap flex items-center gap-2'>
                        <FiEye size={16} /> Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo de Alunos */}
            <div className='bg-white rounded-2xl shadow-md p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'><FiUsers size={28} /> Alunos Supervisionados</h2>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200'>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Local</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Pendências</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.map((aluno) => (
                      <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aluno.nome}</td>
                        <td className='px-6 py-4 text-sm text-[#237EE6] font-semibold'>{aluno.instituicao}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.local}</td>
                        <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{aluno.frequencia}%</td>
                        <td className='px-6 py-4'>
                          <div className='flex gap-2'>
                            {aluno.frequencias_pendentes > 0 && (
                              <span className='px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold'>
                                {aluno.frequencias_pendentes} freq.
                              </span>
                            )}
                            {aluno.avaliacoes_pendentes > 0 && (
                              <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold'>
                                {aluno.avaliacoes_pendentes} aval.
                              </span>
                            )}
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
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

        {/* MEUS ALUNOS */}
        {abaSelecionada === 'alunos' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={32} /> Meus Alunos</h2>

            {/* Grid de Alunos */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {alunos.map((aluno) => (
                <div key={aluno.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
                  <div className='h-2 bg-gradient-to-r from-[#237EE6] to-[#60C9E6]'></div>
                  <div className='p-6'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <p className='text-sm text-[#237EE6] font-semibold uppercase'>{aluno.periodo}º período</p>
                        <h3 className='text-xl font-bold text-gray-900 mt-1'>{aluno.nome}</h3>
                        <p className='text-sm text-gray-600 mt-1'>{aluno.matricula}</p>
                      </div>
                      <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                        {aluno.status}
                      </span>
                    </div>

                    <div className='space-y-3 mb-6'>
                      <div className='p-3 bg-[#237EE6]/10 rounded-lg'>
                        <p className='text-xs text-[#237EE6] font-semibold mb-1'>Instituição</p>
                        <p className='text-sm font-bold text-[#237EE6]'>{aluno.instituicao}</p>
                      </div>
                      <div className='flex items-center gap-3 text-gray-700'>
                        <FiMapPin size={18} className='text-[#237EE6]' />
                        <span className='text-sm'>{aluno.local}</span>
                      </div>
                      <div className='flex items-center gap-3 text-gray-700'>
                        <FiClipboard size={18} className='text-[#237EE6]' />
                        <span className='text-sm'>{aluno.especialidade}</span>
                      </div>
                      <div>
                        <div className='flex items-center justify-between mb-2'>
                          <p className='text-sm font-semibold text-gray-700'>Frequência</p>
                          <p className='text-sm font-bold text-[#237EE6]'>{aluno.frequencia}%</p>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2'>
                          <div
                            className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                            style={{ width: `${aluno.frequencia}%` }}
                          ></div>
                        </div>
                      </div>
                      {(aluno.frequencias_pendentes > 0 || aluno.avaliacoes_pendentes > 0) && (
                        <div className='p-3 bg-yellow-50 rounded-lg'>
                          <p className='text-xs font-semibold text-yellow-700 mb-1 flex items-center gap-1'><FiAlertCircle size={14} /> Pendências:</p>
                          <div className='flex gap-2'>
                            {aluno.frequencias_pendentes > 0 && (
                              <span className='text-xs text-yellow-700'>
                                <FiCheckCircle className='inline mr-1' size={12} /> {aluno.frequencias_pendentes} frequências
                              </span>
                            )}
                            {aluno.avaliacoes_pendentes > 0 && (
                              <span className='text-xs text-yellow-700'>
                                <FiTrendingUp className='inline mr-1' size={12} /> {aluno.avaliacoes_pendentes} avaliações
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='flex gap-3'>
                      <button className='flex-1 bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                        <FiEye size={14} /> Ver Detalhes
                      </button>
                      <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                        <FiBarChart2 size={14} /> Histórico
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VALIDAR FREQUÊNCIA */}
        {abaSelecionada === 'frequencia' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiCheckCircle size={32} /> Validar Frequência</h2>
            
            {/* Filtros */}
            <div className='bg-white rounded-2xl shadow-md p-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Status</label>
                  <select
                    value={filtroFrequencia}
                    onChange={(e) => setFiltroFrequencia(e.target.value)}
                    className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                  >
                    <option value='pendentes'>Pendentes ({frequenciasPendentes.length})</option>
                    <option value='validadas'>Validadas</option>
                    <option value='todas'>Todas</option>
                  </select>
                </div>
                
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Data</label>
                  <input
                    type='date'
                    value={filtroData}
                    onChange={(e) => setFiltroData(e.target.value)}
                    className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                  />
                </div>
                
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Local</label>
                  <select
                    value={filtroLocal}
                    onChange={(e) => setFiltroLocal(e.target.value)}
                    className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                  >
                    {locaisUnicos.map((local) => (
                      <option key={local} value={local}>
                        {local === 'todos' ? 'Todos os Locais' : local}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {(filtroData || filtroLocal !== 'todos') && (
                <div className='mt-4 flex items-center gap-2'>
                  <button
                    onClick={() => {
                      setFiltroData('')
                      setFiltroLocal('todos')
                    }}
                    className='text-sm text-[#237EE6] hover:text-[#154c8b] font-semibold flex items-center gap-1'
                  >
                    <FiFilter size={14} /> Limpar filtros
                  </button>
                </div>
              )}
            </div>

            {/* Lista de Frequências */}
            <div className='space-y-4'>
              {frequenciasPendentes
                .filter(freq => {
                  // Filtro por data
                  if (filtroData && freq.data !== filtroData) return false
                  // Filtro por local
                  if (filtroLocal !== 'todos' && freq.local !== filtroLocal) return false
                  return true
                })
                .map((freq) => (
                <div key={freq.id} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                  <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
                    <div className='flex-1'>
                      <div className='flex items-start justify-between mb-4'>
                        <div>
                          <h3 className='text-lg font-bold text-gray-900'>{freq.aluno}</h3>
                          <p className='text-sm text-[#237EE6] font-semibold mt-1'>{freq.instituicao}</p>
                          <p className='text-sm text-gray-600 mt-1'>{freq.data} • {freq.horario}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          freq.tipo === 'Check-in'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {freq.tipo}
                        </span>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                        <div>
                          <p className='text-xs text-gray-600 mb-1'>Local</p>
                          <p className='text-sm font-semibold text-gray-900 flex items-center gap-1'><FiMapPin size={14} /> {freq.local}</p>
                        </div>
                        <div>
                          <p className='text-xs text-gray-600 mb-1'>Distância</p>
                          <p className='text-sm font-semibold text-gray-900 flex items-center gap-1'><FiFilter size={14} /> {freq.distancia}m</p>
                        </div>
                        <div>
                          <p className='text-xs text-gray-600 mb-1'>Raio</p>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            freq.dentro_raio
                              ? 'bg-[#10E686]/20 text-[#10E686]'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {freq.dentro_raio ? '✓ Dentro' : '✗ Fora'}
                          </span>
                        </div>
                      </div>

                      {freq.foto_checkin && (
                        <div className='p-3 bg-[#F5F7FA] rounded-lg'>
                          <p className='text-xs text-gray-600 mb-2'>Reconhecimento Facial</p>
                          <div className='flex items-center gap-2'>
                            <FiEye size={18} className='text-[#237EE6]' />
                            <span className='text-xs text-gray-700'>Foto capturada e validada</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='flex lg:flex-col gap-3 lg:w-40'>
                      <button className='flex-1 bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                        <FiCheckCircle size={14} /> Validar
                      </button>
                      <button className='flex-1 bg-white border-2 border-red-500 text-red-500 font-semibold py-2 px-4 rounded-lg hover:bg-red-50 transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                        <FiAlertCircle size={14} /> Rejeitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {frequenciasPendentes
                .filter(freq => {
                  if (filtroData && freq.data !== filtroData) return false
                  if (filtroLocal !== 'todos' && freq.local !== filtroLocal) return false
                  return true
                })
                .length === 0 && (
                <div className='bg-white rounded-2xl shadow-md p-12 text-center'>
                  <FiCheckCircle size={48} className='mx-auto text-gray-300 mb-4' />
                  <p className='text-gray-600 text-lg font-semibold mb-2'>Nenhuma frequência encontrada</p>
                  <p className='text-gray-500 text-sm'>Ajuste os filtros para ver mais resultados</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VAGAS DO LOCAL */}
        {abaSelecionada === 'vagas' && (
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiTarget size={32} /> Minhas Vagas do Local</h2>
            </div>

            {/* Grid de Vagas */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {vagas.map((vaga) => (
                <div key={vaga.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all'>
                  <div className='h-2 bg-gradient-to-r from-[#237EE6] to-[#60C9E6]'></div>
                  <div className='p-6'>
                    <div className='mb-4'>
                      <h3 className='text-xl font-bold text-gray-900'>{vaga.especialidade}</h3>
                      <p className='text-sm text-[#237EE6] font-semibold mt-1 flex items-center gap-1'><FiMapPin size={14} /> {vaga.local}</p>
                      <p className='text-sm text-gray-600 mt-1'>{vaga.instituicao}</p>
                    </div>

                    <div className='grid grid-cols-2 gap-4 mb-6 py-4 border-y border-gray-200'>
                      <div>
                        <p className='text-xs text-gray-600 font-semibold uppercase'>Período</p>
                        <p className='text-lg font-bold text-gray-900 mt-1'>{vaga.periodo}</p>
                      </div>
                      <div>
                        <p className='text-xs text-gray-600 font-semibold uppercase'>Turno</p>
                        <p className='text-lg font-bold text-gray-900 mt-1'>{vaga.turno}</p>
                      </div>
                      <div>
                        <p className='text-xs text-gray-600 font-semibold uppercase'>Horário</p>
                        <p className='text-sm font-semibold text-gray-900 mt-1'>{vaga.horario}</p>
                      </div>
                      <div>
                        <p className='text-xs text-gray-600 font-semibold uppercase'>Ocupação</p>
                        <p className={`text-lg font-bold mt-1 ${vaga.status === 'Completa' ? 'text-red-500' : 'text-[#10E686]'}`}>{vaga.ocupadas}/{vaga.total}</p>
                      </div>
                    </div>

                    <div className='mb-4'>
                      <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm font-semibold text-gray-700'>Taxa de Ocupação</span>
                        <span className={`text-sm font-bold ${vaga.status === 'Completa' ? 'text-red-500' : 'text-[#10E686]'}`}>{Math.round((vaga.ocupadas / vaga.total) * 100)}%</span>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className={`h-2 rounded-full transition-all ${vaga.status === 'Completa' ? 'bg-red-500' : 'bg-gradient-to-r from-[#237EE6] to-[#60C9E6]'}`}
                          style={{ width: `${(vaga.ocupadas / vaga.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <button
                        onClick={() => {
                          setVagaSelecionada(vaga)
                          setModalAssociarEspecialidade(true)
                        }}
                        className='flex-1 bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2'
                      >
                        <FiEdit2 size={16} /> Associar Especialidade
                      </button>
                      <button className='flex-1 bg-gray-100 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2'>
                        <FiEye size={16} /> Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AVALIAÇÕES */}
        {abaSelecionada === 'avaliacoes' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiTrendingUp size={32} /> Avaliações Pendentes</h2>

            {/* Lista de Avaliações */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {avaliacoesPendentes.map((aval) => (
                <div key={aval.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
                  <div className='h-2 bg-gradient-to-r from-[#60E6D7] to-[#10E686]'></div>
                  <div className='p-6'>
                    <div className='mb-4'>
                      <p className='text-sm text-[#60E6D7] font-semibold uppercase'>{aval.tipo}</p>
                      <h3 className='text-xl font-bold text-gray-900 mt-1'>{aval.aluno}</h3>
                      <p className='text-sm text-[#237EE6] font-semibold mt-1'>{aval.instituicao}</p>
                      <p className='text-sm text-gray-600 mt-1'>Período: {aval.periodo}</p>
                    </div>

                    <div className='mb-6'>
                      <p className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'><FiClipboard size={18} className='text-[#60E6D7]' /> Critérios a avaliar:</p>
                      <div className='flex flex-wrap gap-2'>
                        {aval.criterios.map((crit, idx) => (
                          <span key={idx} className='px-3 py-1 bg-[#F5F7FA] text-gray-700 rounded-lg text-xs font-medium flex items-center gap-1'>
                            <FiCheckCircle size={12} /> {crit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className='p-3 bg-yellow-50 rounded-lg mb-4'>
                      <p className='text-xs font-semibold text-yellow-700 flex items-center gap-1'>
                        <FiAlertCircle size={14} /> Prazo: {aval.prazo}
                      </p>
                    </div>

                    <button className='w-full bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2'>
                      <FiEdit2 size={16} /> Realizar Avaliação
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ASSOCIAR ESPECIALIDADE */}
      {modalAssociarEspecialidade && vagaSelecionada && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold text-gray-900'>📚 Associar Especialidade</h2>
              <button
                onClick={() => setModalAssociarEspecialidade(false)}
                className='text-gray-500 hover:text-gray-700 transition-all'
              >
                <FiX size={24} />
              </button>
            </div>

            <div className='space-y-4 bg-blue-50 rounded-lg p-4'>
              <p className='text-sm font-semibold text-gray-700'>Vaga Selecionada:</p>
              <div className='space-y-1'>
                <p className='text-base font-bold text-gray-900'>{vagaSelecionada.especialidade}</p>
                <p className='text-sm text-gray-600 flex items-center gap-1'><FiMapPin size={14} /> {vagaSelecionada.local}</p>
                <p className='text-sm text-gray-600'>{vagaSelecionada.instituicao} • {vagaSelecionada.periodo}</p>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Especialidade</label>
                <select
                  value={especialidadeSelecionada?.id || ''}
                  onChange={(e) => {
                    const especialidade = especialidades.find((esp) => esp.id === parseInt(e.target.value))
                    setEspecialidadeSelecionada(especialidade)
                  }}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                >
                  <option value=''>-- Selecionar Especialidade --</option>
                  {especialidades.map((esp) => (
                    <option key={esp.id} value={esp.id}>
                      {esp.nome} ({esp.codigo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Detalhes da Associação</label>
                <div className='bg-gray-50 rounded-lg p-3 space-y-2 text-sm'>
                  <p><span className='font-semibold text-gray-700'>Período:</span> {vagaSelecionada.periodo}</p>
                  <p><span className='font-semibold text-gray-700'>Turno:</span> {vagaSelecionada.turno}</p>
                  <p><span className='font-semibold text-gray-700'>Horário:</span> {vagaSelecionada.horario}</p>
                  <p><span className='font-semibold text-gray-700'>Dias:</span> {vagaSelecionada.dias_semana.join(', ')}</p>
                  <p><span className='font-semibold text-gray-700'>Capacidade:</span> {vagaSelecionada.total} alunos</p>
                </div>
              </div>

              <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
                <p className='text-xs text-yellow-800'>
                  <strong>⚠️ Atenção:</strong> Esta ação associará a especialidade selecionada à sua vaga. Você será responsável por supervisionar os alunos alocados.
                </p>
              </div>
            </div>

            <div className='flex gap-3 pt-4 border-t border-gray-200'>
              <button
                onClick={() => setModalAssociarEspecialidade(false)}
                className='flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-all'
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setModalAssociarEspecialidade(false)
                  alert(`Especialidade "${especialidadeSelecionada?.nome}" associada com sucesso!`)
                }}
                disabled={!especialidadeSelecionada}
                className='flex-1 px-4 py-2 bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Associar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
