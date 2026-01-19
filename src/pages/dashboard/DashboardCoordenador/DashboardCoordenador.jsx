import { useState } from 'react'
import { FiHome, FiUsers, FiTarget, FiMapPin, FiClipboard, FiSettings, FiDownload, FiPlus, FiEdit2, FiEye, FiBarChart2, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiFilter, FiBook, FiClock, FiAward, FiMenu, FiX } from 'react-icons/fi'
import { MdLocalHospital } from 'react-icons/md'

export default function DashboardCoordenador() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)
  const [filtroAlunos, setFiltroAlunos] = useState('todos')
  const [filtroLocais, setFiltroLocais] = useState('todos')
  const [abaTurmas, setAbaTurmas] = useState('lista')
  const [abaComponentes, setAbaComponentes] = useState('lista')
  const [abaFrequencia, setAbaFrequencia] = useState('detalhada')
  const [abaAvaliacoes, setAbaAvaliacoes] = useState('lista')

  // Dados mock do coordenador
  const instituicao = {
    nome: 'Universidade Federal de São Paulo',
    sigla: 'UNIFESP',
    unidade: 'Campus São Paulo',
    total_alunos: 115,
    alunos_ativos: 112,
    alunos_pendentes: 3,
    vagas_total: 30,
    vagas_ocupadas: 28,
    locais_ativos: 8,
    frequencia_media: 94.3
  }

  // Mock de alunos
  const alunos = [
    { id: 1, nome: 'João Silva Santos', matricula: '202401234', periodo: 9, frequencia: 95.5, status: 'Ativo', rodizio: 'A' },
    { id: 2, nome: 'Maria Oliveira Costa', matricula: '202401235', periodo: 9, frequencia: 88.2, status: 'Ativo', rodizio: 'A' },
    { id: 3, nome: 'Carlos Ferreira Lima', matricula: '202401236', periodo: 10, frequencia: 92.1, status: 'Ativo', rodizio: 'B' },
    { id: 4, nome: 'Ana Paula Silva', matricula: '202401237', periodo: 11, frequencia: 0, status: 'Pendente', rodizio: 'C' },
    { id: 5, nome: 'Roberto Mendes', matricula: '202401238', periodo: 9, frequencia: 96.8, status: 'Ativo', rodizio: 'A' }
  ]

  // Mock de vagas
  const vagas = [
    { id: 1, especialidade: 'Clínica Médica', local: 'Hospital Universitário', preceptor: 'Dra. Maria Silva', ocupadas: 5, total: 5, status: 'Completa' },
    { id: 2, especialidade: 'Cirurgia Geral', local: 'Hospital das Clínicas', preceptor: 'Dr. Carlos Oliveira', ocupadas: 4, total: 5, status: 'Disponível' },
    { id: 3, especialidade: 'Pediatria', local: 'Santa Casa', preceptor: 'Dra. Ana Costa', ocupadas: 3, total: 4, status: 'Disponível' },
    { id: 4, especialidade: 'Ginecologia', local: 'Hospital Universitário', preceptor: 'Dra. Paula Santos', ocupadas: 5, total: 5, status: 'Completa' },
    { id: 5, especialidade: 'Cardiologia', local: 'Instituto Dante Pazzanese', preceptor: 'Dr. João Cardoso', ocupadas: 2, total: 3, status: 'Disponível' }
  ]

  // Mock de locais
  const locais = [
    { id: 1, nome: 'Hospital Universitário São Paulo', tipo: 'Hospital', cidade: 'São Paulo', alunos: 10, vagas: 8, convenio: 'Vigente', status: 'Ativo' },
    { id: 2, nome: 'Hospital das Clínicas', tipo: 'Hospital', cidade: 'São Paulo', alunos: 12, vagas: 7, convenio: 'Vigente', status: 'Ativo' },
    { id: 3, nome: 'Santa Casa de Misericórdia', tipo: 'Hospital', cidade: 'São Paulo', alunos: 8, vagas: 4, convenio: 'Vigente', status: 'Ativo' },
    { id: 4, nome: 'Instituto Dante Pazzanese', tipo: 'Instituto Especializado', cidade: 'São Paulo', alunos: 5, vagas: 3, convenio: 'Vigente', status: 'Ativo' },
    { id: 5, nome: 'Centro de Saúde Escola', tipo: 'UBS', cidade: 'São Paulo', alunos: 6, vagas: 4, convenio: 'Vencido', status: 'Inativo' }
  ]

  // Mock de TURMA
  const turmas = [
    {
      id_turma: 1,
      id_oferta_componente: 1,
      codigo_turma: 'MED-101-T01',
      componente: 'Clínica Médica I',
      local: 'Hospital Universitário',
      preceptor: 'Dra. Maria Silva',
      turno: 'Manhã',
      horario_inicio: '07:00',
      horario_fim: '13:00',
      dias_semana: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA'],
      capacidade: 5,
      matriculados: 5,
      data_inicio: '2025-02-03',
      data_fim: '2025-03-02',
      status: 'Ativa',
      observacoes: 'Turma completa'
    },
    {
      id_turma: 2,
      id_oferta_componente: 2,
      codigo_turma: 'MED-102-T01',
      componente: 'Urgência e Emergência',
      local: 'PS Hospital das Clínicas',
      preceptor: 'Dra. Ana Costa',
      turno: 'Integral',
      horario_inicio: '07:00',
      horario_fim: '19:00',
      dias_semana: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'],
      capacidade: 6,
      matriculados: 4,
      data_inicio: '2025-02-03',
      data_fim: '2025-03-02',
      status: 'Ativa',
      observacoes: 'Rodízio matutino'
    },
    {
      id_turma: 3,
      id_oferta_componente: 3,
      codigo_turma: 'MED-103-T01',
      componente: 'Pediatria',
      local: 'Instituto da Criança',
      preceptor: 'Dr. Carlos Oliveira',
      turno: 'Tarde',
      horario_inicio: '13:00',
      horario_fim: '19:00',
      dias_semana: ['SEGUNDA', 'TERÇA', 'QUARTA'],
      capacidade: 4,
      matriculados: 3,
      data_inicio: '2025-04-01',
      data_fim: '2025-05-31',
      status: 'Planejada',
      observacoes: 'Aguardando confirmação com o local'
    }
  ]

  // Mock de MATRICULA_TURMA (Relacionamento N:N entre ALUNO e TURMA)
  const matriculasTurma = [
    {
      id_matricula_turma: 1,
      id_aluno: 1,
      nome_aluno: 'João Silva Santos',
      matricula_aluno: '202401234',
      id_turma: 1,
      codigo_turma: 'MED-101-T01',
      componente: 'Clínica Médica I',
      data_matricula: '2025-02-03',
      data_conclusao: null,
      status: 'Matriculado',
      desempenho: 9.0,
      frequencia: 95.5,
      observacoes: 'Aluno destaque'
    },
    {
      id_matricula_turma: 2,
      id_aluno: 2,
      nome_aluno: 'Maria Oliveira Costa',
      matricula_aluno: '202401235',
      id_turma: 1,
      codigo_turma: 'MED-101-T01',
      componente: 'Clínica Médica I',
      data_matricula: '2025-02-03',
      data_conclusao: null,
      status: 'Matriculado',
      desempenho: 8.2,
      frequencia: 88.2,
      observacoes: 'Participação regular'
    },
    {
      id_matricula_turma: 3,
      id_aluno: 3,
      nome_aluno: 'Carlos Ferreira Lima',
      matricula_aluno: '202401236',
      id_turma: 2,
      codigo_turma: 'MED-102-T01',
      componente: 'Urgência e Emergência',
      data_matricula: '2025-02-03',
      data_conclusao: null,
      status: 'Matriculado',
      desempenho: 8.8,
      frequencia: 92.1,
      observacoes: 'Excelente desempenho em emergência'
    },
    {
      id_matricula_turma: 4,
      id_aluno: 5,
      nome_aluno: 'Roberto Mendes',
      matricula_aluno: '202401238',
      id_turma: 2,
      codigo_turma: 'MED-102-T01',
      componente: 'Urgência e Emergência',
      data_matricula: '2025-02-03',
      data_conclusao: null,
      status: 'Matriculado',
      desempenho: 8.9,
      frequencia: 96.8,
      observacoes: 'Dedicação exemplar'
    },
    {
      id_matricula_turma: 5,
      id_aluno: 4,
      nome_aluno: 'Ana Paula Silva',
      matricula_aluno: '202401237',
      id_turma: 3,
      codigo_turma: 'MED-103-T01',
      componente: 'Pediatria',
      data_matricula: '2025-04-01',
      data_conclusao: null,
      status: 'Pendente de Matrícula',
      desempenho: 0,
      frequencia: 0,
      observacoes: 'Aguardando confirmação de matrícula'
    }
  ]

  // Mock de COMPONENTE_CURRICULAR
  const componentes = [
    { id_componente: 1, codigo: 'MED-101', nome: 'Clínica Médica I', descricao: 'Clínica médica geral e sistêmica', carga_horaria: 180, creditos: 6, semestre: 9, competencias: ['Anamnese', 'Exame físico', 'Diagnóstico'], tipo: 'Obrigatório', status: 'Ativo' },
    { id_componente: 2, codigo: 'MED-102', nome: 'Urgência e Emergência', descricao: 'Atendimento em situações de urgência/emergência', carga_horaria: 160, creditos: 5, semestre: 10, competencias: ['Triagem', 'Estabilização', 'Atendimento inicial'], tipo: 'Obrigatório', status: 'Ativo' },
    { id_componente: 3, codigo: 'MED-103', nome: 'Pediatria', descricao: 'Especialidade pediátrica', carga_horaria: 140, creditos: 5, semestre: 9, competencias: ['Avaliação pediátrica', 'Desenvolvimento infantil'], tipo: 'Obrigatório', status: 'Ativo' },
    { id_componente: 4, codigo: 'MED-104', nome: 'Cirurgia Geral', descricao: 'Técnicas cirúrgicas gerais', carga_horaria: 200, creditos: 7, semestre: 10, competencias: ['Técnica cirúrgica', 'Assepsia', 'Sutura'], tipo: 'Obrigatório', status: 'Ativo' },
    { id_componente: 5, codigo: 'MED-105', nome: 'Ginecologia', descricao: 'Especialidade ginecológica', carga_horaria: 150, creditos: 5, semestre: 11, competencias: ['Exame ginecológico', 'Obstretrícia básica'], tipo: 'Obrigatório', status: 'Ativo' }
  ]

  // Mock de REGISTRO_FREQUENCIA detalhado por aluno
  const frequenciaDetalhada = [
    {
      id_aluno: 1,
      nome_aluno: 'João Silva Santos',
      matricula: '202401234',
      total_registros: 45,
      presencas: 42,
      faltas: 3,
      frequencia_pct: 93.3,
      detalhes_faltas: [
        { data: '2025-02-05', tipo: 'Falta injustificada' },
        { data: '2025-02-10', tipo: 'Falta justificada' },
        { data: '2025-03-01', tipo: 'Falta injustificada' }
      ],
      status: 'OK'
    },
    {
      id_aluno: 2,
      nome_aluno: 'Maria Oliveira Costa',
      matricula: '202401235',
      total_registros: 48,
      presencas: 45,
      faltas: 3,
      frequencia_pct: 93.7,
      detalhes_faltas: [
        { data: '2025-02-15', tipo: 'Falta justificada' }
      ],
      status: 'OK'
    },
    {
      id_aluno: 3,
      nome_aluno: 'Carlos Ferreira Lima',
      matricula: '202401236',
      total_registros: 40,
      presencas: 35,
      faltas: 5,
      frequencia_pct: 87.5,
      detalhes_faltas: [
        { data: '2025-02-20', tipo: 'Falta injustificada' },
        { data: '2025-03-05', tipo: 'Falta injustificada' }
      ],
      status: 'Alerta'
    }
  ]

  // Mock de AVALIACAO_ALUNO (avaliações por componente)
  const avaliacoesAlunos = [
    { id: 1, nome_aluno: 'João Silva Santos', componente: 'Clínica Médica I', nota: 9.0, data_avaliacao: '2025-03-15', preceptor: 'Dra. Maria Silva', feedback: 'Excelente desempenho', status: 'Realizada' },
    { id: 2, nome_aluno: 'Maria Oliveira Costa', componente: 'Clínica Médica I', nota: 8.5, data_avaliacao: '2025-03-15', preceptor: 'Dra. Maria Silva', feedback: 'Bom desempenho', status: 'Realizada' },
    { id: 3, nome_aluno: 'Carlos Ferreira Lima', componente: 'Urgência e Emergência', nota: 8.8, data_avaliacao: '2025-03-18', preceptor: 'Prof. João Mendes', feedback: 'Muito bom', status: 'Realizada' },
    { id: 4, nome_aluno: 'Roberto Mendes', componente: 'Urgência e Emergência', nota: 9.2, data_avaliacao: '2025-03-18', preceptor: 'Prof. João Mendes', feedback: 'Excelente', status: 'Realizada' },
    { id: 5, nome_aluno: 'Ana Paula Silva', componente: 'Pediatria', nota: null, data_avaliacao: null, preceptor: '-', feedback: '-', status: 'Pendente' }
  ]

  // Filtrar alunos
  const alunosFiltrados = alunos.filter(a => {
    if (filtroAlunos === 'ativos') return a.status === 'Ativo'
    if (filtroAlunos === 'pendentes') return a.status === 'Pendente'
    return true
  })

  // Filtrar locais
  const locaisFiltrados = locais.filter(l => {
    if (filtroLocais === 'ativos') return l.status === 'Ativo'
    if (filtroLocais === 'inativos') return l.status === 'Inativo'
    return true
  })

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-[#F5F7FA] to-white'>
      {/* Header */}
      <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2'><FiBarChart2 size={36} /> Painel de Coordenação</h1>
              <p className='text-blue-100 text-sm lg:text-base'>{instituicao.nome} • {instituicao.unidade}</p>
            </div>
            <div className='flex gap-3'>
              <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2'>
                <FiSettings size={18} /> Configurações
              </button>
              <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2'>
                <FiDownload size={18} /> Relatórios
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
                {abaSelecionada === 'alunos' && 'Alunos'}
                {abaSelecionada === 'vagas' && 'Vagas'}
                {abaSelecionada === 'locais' && 'Locais'}
                {abaSelecionada === 'frequencia' && 'Frequência'}
                {abaSelecionada === 'turmas' && 'Turmas'}
                {abaSelecionada === 'matriculas' && 'Matrículas'}
                {abaSelecionada === 'componentes' && 'Componentes'}
                {abaSelecionada === 'frequenciaDetalhada' && 'Frequência Detalh.'}
                {abaSelecionada === 'avaliacoes' && 'Avaliações'}
              </span>
            </button>
          </div>

          {/* Mobile: Menu Dropdown */}
          {menuMobileAberto && (
            <div className='md:hidden absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg'>
              <div className='py-2'>
                <button onClick={() => { setAbaSelecionada('overview'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'overview' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiHome size={18} /> Visão Geral</button>
                <button onClick={() => { setAbaSelecionada('alunos'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'alunos' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiUsers size={18} /> Alunos</button>
                <button onClick={() => { setAbaSelecionada('vagas'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'vagas' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiTarget size={18} /> Vagas</button>
                <button onClick={() => { setAbaSelecionada('locais'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'locais' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiMapPin size={18} /> Locais</button>
                <button onClick={() => { setAbaSelecionada('frequencia'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'frequencia' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiClipboard size={18} /> Frequência</button>
                <button onClick={() => { setAbaSelecionada('turmas'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'turmas' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiUsers size={18} /> Turmas</button>
                <button onClick={() => { setAbaSelecionada('matriculas'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'matriculas' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiClipboard size={18} /> Matrículas</button>
                <button onClick={() => { setAbaSelecionada('componentes'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'componentes' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiBook size={18} /> Componentes</button>
                <button onClick={() => { setAbaSelecionada('frequenciaDetalhada'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'frequenciaDetalhada' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiCheckCircle size={18} /> Frequência Detalh.</button>
                <button onClick={() => { setAbaSelecionada('avaliacoes'); setMenuMobileAberto(false) }} className={`w-full text-left px-6 py-3 font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${abaSelecionada === 'avaliacoes' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-600 hover:bg-gray-50'}`}><FiBarChart2 size={18} /> Avaliações</button>
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
              <FiHome size={18} /> Visão Geral
            </button>
            <button
              onClick={() => setAbaSelecionada('alunos')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'alunos'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiUsers size={18} /> Alunos
            </button>
            <button
              onClick={() => setAbaSelecionada('vagas')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'vagas'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiTarget size={18} /> Vagas
            </button>
            <button
              onClick={() => setAbaSelecionada('locais')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'locais'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <MdLocalHospital size={18} /> Locais
            </button>
            <button
              onClick={() => setAbaSelecionada('frequencia')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'frequencia'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiClipboard size={18} /> Frequência
            </button>
            <button
              onClick={() => setAbaSelecionada('turmas')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'turmas'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiUsers size={18} /> Turmas
            </button>
            <button
              onClick={() => setAbaSelecionada('matriculas')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'matriculas'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiClipboard size={18} /> Matrículas
            </button>
            <button
              onClick={() => setAbaSelecionada('componentes')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'componentes'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiBook size={18} /> Componentes
            </button>
            <button
              onClick={() => setAbaSelecionada('frequenciaDetalhada')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'frequenciaDetalhada'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiCheckCircle size={18} /> Frequência Detalh.
            </button>
            <button
              onClick={() => setAbaSelecionada('avaliacoes')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'avaliacoes'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiBarChart2 size={18} /> Avaliações
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
                <p className='text-4xl font-bold text-[#237EE6] mb-2'>{instituicao.total_alunos}</p>
                <div className='text-sm text-gray-600 space-y-1'>
                  <p className='flex items-center gap-1'><FiCheckCircle size={14} /> {instituicao.alunos_ativos} ativos</p>
                  <p className='flex items-center gap-1'><FiAlertCircle size={14} /> {instituicao.alunos_pendentes} pendentes</p>
                </div>
              </div>

              {/* Card Vagas */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Vagas</h3>
                  <FiTarget size={32} className='text-[#10E686]' />
                </div>
                <p className='text-4xl font-bold text-[#10E686] mb-2'>{instituicao.vagas_ocupadas}/{instituicao.vagas_total}</p>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div className='bg-linear-to-r from-[#10E686] to-[#60E6D7] h-2 rounded-full' style={{ width: `${(instituicao.vagas_ocupadas / instituicao.vagas_total) * 100}%` }}></div>
                </div>
                <p className='text-sm text-gray-600 mt-2'>{((instituicao.vagas_ocupadas / instituicao.vagas_total) * 100).toFixed(0)}% ocupadas</p>
              </div>

              {/* Card Locais */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Locais</h3>
                  <MdLocalHospital size={32} className='text-[#60E6D7]' />
                </div>
                <p className='text-4xl font-bold text-[#60E6D7] mb-2'>{instituicao.locais_ativos}</p>
                <p className='text-sm text-gray-600'>Convênios ativos</p>
              </div>

              {/* Card Frequência */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Frequência</h3>
                  <FiTrendingUp size={32} className='text-[#60C9E6]' />
                </div>
                <p className='text-4xl font-bold text-[#60C9E6] mb-2'>{instituicao.frequencia_media}%</p>
                <p className='text-sm text-gray-600'>Média geral</p>
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
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Período</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.slice(0, 5).map((aluno) => (
                      <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aluno.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.matricula}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.periodo}º período</td>
                        <td className='px-6 py-4 text-sm text-gray-700 font-semibold'>{aluno.frequencia}%</td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            aluno.status === 'Ativo'
                              ? 'bg-[#10E686]/20 text-[#10E686]'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
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
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={32} /> Gerenciamento de Alunos</h2>
              <div className='flex gap-3'>
                <select
                  value={filtroAlunos}
                  onChange={(e) => setFiltroAlunos(e.target.value)}
                  className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                >
                  <option value='todos'>Todos ({alunos.length})</option>
                  <option value='ativos'>Ativos ({alunos.filter(a => a.status === 'Ativo').length})</option>
                  <option value='pendentes'>Pendentes ({alunos.filter(a => a.status === 'Pendente').length})</option>
                </select>
                <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                  <FiPlus size={18} /> Novo Aluno
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
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Período</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Rodízio</th>
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
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.periodo}º</td>
                        <td className='px-6 py-4 text-sm text-gray-700 font-semibold'>{aluno.rodizio}</td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-16 bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                style={{ width: `${aluno.frequencia}%` }}
                              ></div>
                            </div>
                            <span className='text-sm font-semibold text-gray-900'>{aluno.frequencia}%</span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            aluno.status === 'Ativo'
                              ? 'bg-[#10E686]/20 text-[#10E686]'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
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
              <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                <FiPlus size={18} /> Nova Vaga
              </button>
            </div>

            {/* Grid de Vagas */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {vagas.map((vaga) => (
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
                        <h3 className='text-lg font-bold text-gray-900 mt-1'>{vaga.local}</h3>
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
                      <button className='flex-1 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                        <FiEdit2 size={16} /> Editar
                      </button>
                      <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300 text-sm flex items-center justify-center gap-1'>
                        <FiEye size={16} /> Ver Alunos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOCAIS */}
        {abaSelecionada === 'locais' && (
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><MdLocalHospital size={32} /> Gerenciamento de Locais</h2>
              <div className='flex gap-3'>
                <select
                  value={filtroLocais}
                  onChange={(e) => setFiltroLocais(e.target.value)}
                  className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                >
                  <option value='todos'>Todos ({locais.length})</option>
                  <option value='ativos'>Ativos ({locais.filter(l => l.status === 'Ativo').length})</option>
                  <option value='inativos'>Inativos ({locais.filter(l => l.status === 'Inativo').length})</option>
                </select>
                <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                  <FiPlus size={18} /> Novo Local
                </button>
              </div>
            </div>

            {/* Tabela de Locais */}
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Tipo</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Cidade</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alunos</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Vagas</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Convênio</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locaisFiltrados.map((local) => (
                      <tr key={local.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{local.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{local.tipo}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{local.cidade}</td>
                        <td className='px-6 py-4 text-sm text-gray-700 font-semibold'>{local.alunos}</td>
                        <td className='px-6 py-4 text-sm text-gray-700 font-semibold'>{local.vagas}</td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            local.convenio === 'Vigente'
                              ? 'bg-[#10E686]/20 text-[#10E686]'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {local.convenio}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            local.status === 'Ativo'
                              ? 'bg-[#60E6D7]/20 text-[#60E6D7]'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {local.status}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                            <FiEdit2 size={16} /> Editar
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

        {/* FREQUÊNCIA */}
        {abaSelecionada === 'frequencia' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiClipboard size={32} /> Relatório de Frequência</h2>
            
            {/* Cards de Resumo de Frequência */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Card Frequência Média */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Frequência Média</h3>
                  <FiBarChart2 size={32} className='text-[#237EE6]' />
                </div>
                <p className='text-4xl font-bold text-[#237EE6] mb-2'>{instituicao.frequencia_media}%</p>
                <p className='text-sm text-gray-600'>Geral da instituição</p>
              </div>

              {/* Card Alunos com boa frequência */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Boa Frequência</h3>
                  <FiCheckCircle size={32} className='text-[#10E686]' />
                </div>
                <p className='text-4xl font-bold text-[#10E686] mb-2'>{alunos.filter(a => a.frequencia >= 75).length}</p>
                <p className='text-sm text-gray-600'>{alunos.length} alunos total</p>
              </div>

              {/* Card Alunos com baixa frequência */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Frequência Baixa</h3>
                  <FiAlertCircle size={32} className='text-orange-500' />
                </div>
                <p className='text-4xl font-bold text-orange-500 mb-2'>{alunos.filter(a => a.frequencia < 75 && a.frequencia > 0).length}</p>
                <p className='text-sm text-gray-600'>Requer atenção</p>
              </div>
            </div>

            {/* Tabela de Frequência por Aluno */}
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='p-6 border-b border-gray-200'>
                <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={28} /> Frequência por Aluno</h3>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.map((aluno) => (
                      <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aluno.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.matricula}</td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-24 bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                style={{ width: `${aluno.frequencia}%` }}
                              ></div>
                            </div>
                            <span className='text-sm font-semibold text-gray-900'>{aluno.frequencia}%</span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            aluno.frequencia >= 75
                              ? 'bg-[#10E686]/20 text-[#10E686]'
                              : aluno.frequencia > 0
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {aluno.frequencia >= 75 ? 'Boa' : aluno.frequencia > 0 ? 'Baixa' : 'Sem Registro'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabela de Frequência por Local */}
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='p-6 border-b border-gray-200'>
                <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'><MdLocalHospital size={28} /> Frequência por Local</h3>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alunos</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Frequência Média</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Desempenho</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locaisFiltrados.map((local) => {
                      const frequenciaLocal = (Math.random() * 30 + 65).toFixed(1);
                      return (
                        <tr key={local.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                          <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{local.nome}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{local.alunos} alunos</td>
                          <td className='px-6 py-4'>
                            <div className='flex items-center gap-2'>
                              <div className='w-24 bg-gray-200 rounded-full h-2'>
                                <div
                                  className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                  style={{ width: `${frequenciaLocal}%` }}
                                ></div>
                              </div>
                              <span className='text-sm font-semibold text-gray-900'>{frequenciaLocal}%</span>
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                              frequenciaLocal >= 85
                                ? 'bg-[#10E686]/20 text-[#10E686]'
                                : frequenciaLocal >= 75
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {frequenciaLocal >= 85 ? 'Excelente' : frequenciaLocal >= 75 ? 'Bom' : 'Regular'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TURMAS */}
        {abaSelecionada === 'turmas' && (
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-bold text-gray-900'>Turmas de Estágio</h2>
                <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                <FiPlus size={18} /> Nova Turma
              </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {turmas.map((turma) => (
                <div key={turma.id_turma} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
                  <div className={`h-2 bg-linear-to-r ${
                    turma.status === 'Ativa' ? 'from-[#10E686] to-[#60E6D7]' :
                    turma.status === 'Planejada' ? 'from-yellow-400 to-yellow-500' :
                    'from-gray-400 to-gray-500'
                  }`}></div>
                  <div className='p-6'>
                    <div className='flex justify-between items-start mb-3'>
                      <div>
                        <p className='text-sm text-[#237EE6] font-semibold uppercase'>{turma.codigo_turma}</p>
                        <h3 className='text-lg font-bold text-gray-900 mt-1'>{turma.componente}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        turma.status === 'Ativa' ? 'bg-[#10E686]/20 text-[#10E686]' :
                        turma.status === 'Planejada' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {turma.status}
                      </span>
                    </div>
                    <div className='space-y-2 mb-4 text-sm'>
                      <p className='text-gray-700'><span className='font-semibold'>Local:</span> {turma.local}</p>
                      <p className='text-gray-700'><span className='font-semibold'>Preceptor:</span> {turma.preceptor}</p>
                      <p className='text-gray-700'><span className='font-semibold'>Turno:</span> {turma.turno}</p>
                      <p className='text-gray-700'><span className='font-semibold'>Horário:</span> {turma.horario_inicio} - {turma.horario_fim}</p>
                    </div>
                    <div className='mb-4'>
                      <p className='text-sm text-gray-600 mb-2'>Ocupação da Turma</p>
                      <div className='flex items-center gap-2'>
                        <div className='flex-1 bg-gray-200 rounded-full h-2'>
                          <div
                            className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                            style={{ width: `${(turma.matriculados / turma.capacidade) * 100}%` }}
                          ></div>
                        </div>
                        <span className='text-sm font-semibold'>{turma.matriculados}/{turma.capacidade}</span>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <button className='flex-1 bg-[#237EE6] text-white font-semibold py-2 rounded-lg hover:bg-[#154c8b] transition-colors text-sm'>
                        Detalhes
                      </button>
                      <button className='flex-1 bg-gray-100 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm'>
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MATRÍCULAS DE ALUNOS EM TURMAS */}
        {abaSelecionada === 'matriculas' && (
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-bold text-gray-900'>Matrículas de Alunos</h2>
              <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                <FiPlus size={18} /> Nova Matrícula
              </button>
            </div>
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Turma</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Componente</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Data Matrícula</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Desempenho</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matriculasTurma.map((mat) => (
                      <tr key={mat.id_matricula_turma} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                        <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{mat.nome_aluno}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{mat.matricula_aluno}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{mat.codigo_turma}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{mat.componente}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{new Date(mat.data_matricula).toLocaleDateString('pt-BR')}</td>
                        <td className='px-6 py-4'>
                          {mat.desempenho > 0 ? (
                            <div className='flex items-center gap-2'>
                              <div className='w-16 bg-gray-200 rounded-full h-2'>
                                <div
                                  className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                  style={{ width: `${(mat.desempenho / 10) * 100}%` }}
                                ></div>
                              </div>
                              <span className='text-sm font-semibold'>{mat.desempenho.toFixed(1)}</span>
                            </div>
                          ) : (
                            <span className='text-gray-400'>-</span>
                          )}
                        </td>
                        <td className='px-6 py-4'>
                          {mat.frequencia > 0 ? (
                            <div className='flex items-center gap-2'>
                              <div className='w-16 bg-gray-200 rounded-full h-2'>
                                <div
                                  className='bg-linear-to-r from-[#60C9E6] to-[#10E686] h-2 rounded-full'
                                  style={{ width: `${mat.frequencia}%` }}
                                ></div>
                              </div>
                              <span className='text-sm font-semibold'>{mat.frequencia}%</span>
                            </div>
                          ) : (
                            <span className='text-gray-400'>-</span>
                          )}
                        </td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            mat.status === 'Matriculado' ? 'bg-[#10E686]/20 text-[#10E686]' :
                            mat.status === 'Pendente de Matrícula' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {mat.status}
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

        {/* COMPONENTES CURRICULARES */}
        {abaSelecionada === 'componentes' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiBook size={32} /> Componentes Curriculares</h2>
            
            {/* Cards de Resumo */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Total de Componentes</h3>
                  <FiBook size={32} className='text-[#237EE6]' />
                </div>
                <p className='text-4xl font-bold text-[#237EE6] mb-2'>{componentes.length}</p>
                <p className='text-sm text-gray-600'>Componentes ofertados</p>
              </div>

              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Carga Horária Total</h3>
                  <FiClock size={32} className='text-[#10E686]' />
                </div>
                <p className='text-4xl font-bold text-[#10E686] mb-2'>{componentes.reduce((acc, c) => acc + c.carga_horaria, 0)}h</p>
                <p className='text-sm text-gray-600'>Total de horas</p>
              </div>

              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Créditos Totais</h3>
                  <FiAward size={32} className='text-[#60C9E6]' />
                </div>
                <p className='text-4xl font-bold text-[#60C9E6] mb-2'>{componentes.reduce((acc, c) => acc + c.creditos, 0)}</p>
                <p className='text-sm text-gray-600'>Créditos ofertados</p>
              </div>
            </div>

            {/* Grid de Componentes */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {componentes.map((comp) => (
                <div key={comp.id_componente} className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden'>
                  <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] p-4 text-white'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <span className='text-xs font-semibold bg-white/30 px-2 py-1 rounded'>{comp.codigo}</span>
                        <h3 className='text-xl font-bold mt-2'>{comp.nome}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        comp.tipo === 'Obrigatório'
                          ? 'bg-white/30 text-white'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {comp.tipo}
                      </span>
                    </div>
                  </div>
                  <div className='p-6 space-y-4'>
                    <p className='text-sm text-gray-600'>{comp.descricao}</p>
                    
                    <div className='grid grid-cols-3 gap-4'>
                      <div>
                        <p className='text-xs text-gray-500 mb-1'>Carga Horária</p>
                        <p className='text-lg font-bold text-gray-900'>{comp.carga_horaria}h</p>
                      </div>
                      <div>
                        <p className='text-xs text-gray-500 mb-1'>Créditos</p>
                        <p className='text-lg font-bold text-gray-900'>{comp.creditos}</p>
                      </div>
                      <div>
                        <p className='text-xs text-gray-500 mb-1'>Semestre</p>
                        <p className='text-lg font-bold text-gray-900'>{comp.semestre}º</p>
                      </div>
                    </div>

                    <div>
                      <p className='text-xs text-gray-500 mb-2'>Competências Desenvolvidas:</p>
                      <div className='flex flex-wrap gap-2'>
                        {comp.competencias.map((comp_comp, idx) => (
                          <span key={idx} className='bg-[#60C9E6]/20 text-[#237EE6] px-2 py-1 rounded text-xs font-semibold'>
                            {comp_comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className='pt-4 border-t border-gray-200 flex justify-between items-center'>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        comp.status === 'Ativo'
                          ? 'bg-[#10E686]/20 text-[#10E686]'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {comp.status}
                      </span>
                      <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                        <FiEdit2 size={16} /> Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FREQUÊNCIA DETALHADA */}
        {abaSelecionada === 'frequenciaDetalhada' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiCheckCircle size={32} /> Frequência Detalhada por Aluno</h2>
            
            {/* Grid de Alunos com Detalhes de Frequência */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {frequenciaDetalhada.map((freq) => (
                <div key={freq.id_aluno} className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden'>
                  <div className={`p-4 ${
                    freq.frequencia_pct >= 90
                      ? 'bg-linear-to-r from-[#10E686] to-[#60E6D7]'
                      : freq.frequencia_pct >= 75
                      ? 'bg-linear-to-r from-[#237EE6] to-[#60C9E6]'
                      : 'bg-linear-to-r from-orange-500 to-orange-400'
                  } text-white`}>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='text-xl font-bold'>{freq.nome_aluno}</h3>
                        <p className='text-sm opacity-90'>Matrícula: {freq.matricula}</p>
                      </div>
                      <span className='bg-white/30 px-3 py-1 rounded-lg text-xs font-semibold'>
                        {freq.status}
                      </span>
                    </div>
                  </div>
                  <div className='p-6 space-y-4'>
                    <div className='grid grid-cols-3 gap-4'>
                      <div>
                        <p className='text-xs text-gray-500 mb-1'>Registros</p>
                        <p className='text-2xl font-bold text-gray-900'>{freq.total_registros}</p>
                      </div>
                      <div>
                        <p className='text-xs text-gray-500 mb-1'>Presenças</p>
                        <p className='text-2xl font-bold text-[#10E686]'>{freq.presencas}</p>
                      </div>
                      <div>
                        <p className='text-xs text-gray-500 mb-1'>Faltas</p>
                        <p className='text-2xl font-bold text-orange-500'>{freq.faltas}</p>
                      </div>
                    </div>

                    <div>
                      <div className='flex items-center justify-between mb-2'>
                        <p className='text-xs text-gray-500'>Percentual de Frequência</p>
                        <p className='text-lg font-bold text-[#237EE6]'>{freq.frequencia_pct.toFixed(1)}%</p>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-3'>
                        <div
                          className={`h-3 rounded-full ${
                            freq.frequencia_pct >= 90
                              ? 'bg-linear-to-r from-[#10E686] to-[#60E6D7]'
                              : freq.frequencia_pct >= 75
                              ? 'bg-linear-to-r from-[#237EE6] to-[#60C9E6]'
                              : 'bg-linear-to-r from-orange-500 to-orange-400'
                          }`}
                          style={{ width: `${freq.frequencia_pct}%` }}
                        ></div>
                      </div>
                    </div>

                    {freq.detalhes_faltas && freq.detalhes_faltas.length > 0 && (
                      <div className='pt-4 border-t border-gray-200'>
                        <p className='text-xs text-gray-500 mb-2 font-semibold'>Detalhes das Faltas:</p>
                        <div className='space-y-2'>
                          {freq.detalhes_faltas.map((falta, idx) => (
                            <div key={idx} className='flex items-center justify-between bg-gray-50 p-2 rounded-lg'>
                              <span className='text-sm text-gray-700'>{falta.data}</span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                falta.tipo === 'Falta justificada'
                                  ? 'bg-[#60C9E6]/20 text-[#237EE6]'
                                  : 'bg-orange-100 text-orange-700'
                              }`}>
                                {falta.tipo}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className='pt-4 border-t border-gray-200 flex justify-between'>
                      <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                        <FiEye size={16} /> Ver Detalhes
                      </button>
                      <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                        <FiDownload size={16} /> Exportar
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
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiBarChart2 size={32} /> Avaliações dos Alunos</h2>
            
            {/* Cards de Resumo */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Total Avaliações</h3>
                  <FiClipboard size={32} className='text-[#237EE6]' />
                </div>
                <p className='text-4xl font-bold text-[#237EE6] mb-2'>{avaliacoesAlunos.length}</p>
                <p className='text-sm text-gray-600'>Registradas</p>
              </div>

              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Avaliações Realizadas</h3>
                  <FiCheckCircle size={32} className='text-[#10E686]' />
                </div>
                <p className='text-4xl font-bold text-[#10E686] mb-2'>{avaliacoesAlunos.filter(a => a.status === 'Realizada').length}</p>
                <p className='text-sm text-gray-600'>Concluídas</p>
              </div>

              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Avaliações Pendentes</h3>
                  <FiAlertCircle size={32} className='text-orange-500' />
                </div>
                <p className='text-4xl font-bold text-orange-500 mb-2'>{avaliacoesAlunos.filter(a => a.status === 'Pendente').length}</p>
                <p className='text-sm text-gray-600'>Aguardando</p>
              </div>

              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Média Geral</h3>
                  <FiAward size={32} className='text-[#60C9E6]' />
                </div>
                <p className='text-4xl font-bold text-[#60C9E6] mb-2'>
                  {avaliacoesAlunos.filter(a => a.nota !== null).length > 0
                    ? (avaliacoesAlunos.filter(a => a.nota !== null).reduce((acc, a) => acc + a.nota, 0) / avaliacoesAlunos.filter(a => a.nota !== null).length).toFixed(1)
                    : '-'}
                </p>
                <p className='text-sm text-gray-600'>Nota média</p>
              </div>
            </div>

            {/* Tabela de Avaliações */}
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='p-6 border-b border-gray-200'>
                <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={28} /> Avaliações por Aluno e Componente</h3>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Componente</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Nota</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Data Avaliação</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Feedback</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {avaliacoesAlunos.map((aval) => (
                      <tr key={aval.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aval.nome_aluno}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aval.componente}</td>
                        <td className='px-6 py-4'>
                          {aval.nota !== null ? (
                            <div className='flex items-center gap-2'>
                              <span className={`text-lg font-bold ${
                                aval.nota >= 9.0
                                  ? 'text-[#10E686]'
                                  : aval.nota >= 7.0
                                  ? 'text-[#60C9E6]'
                                  : 'text-orange-500'
                              }`}>
                                {aval.nota.toFixed(1)}
                              </span>
                            </div>
                          ) : (
                            <span className='text-gray-400'>-</span>
                          )}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aval.data_avaliacao || '-'}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aval.preceptor}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aval.feedback}</td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            aval.status === 'Realizada'
                              ? 'bg-[#10E686]/20 text-[#10E686]'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {aval.status}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                            <FiEye size={16} /> Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}      </div>
    </div>
  )
}

