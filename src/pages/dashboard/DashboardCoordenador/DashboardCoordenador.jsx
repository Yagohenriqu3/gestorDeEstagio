import { useState } from 'react'
import { FiHome, FiUsers, FiTarget, FiMapPin, FiClipboard, FiSettings, FiDownload, FiPlus, FiEdit2, FiEye, FiBarChart2, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiFilter, FiBook, FiClock, FiAward, FiMenu, FiX, FiCalendar, FiCheck, FiTrash2, FiStar } from 'react-icons/fi'
import { MdLocalHospital } from 'react-icons/md'
import Sidebar from '../../../components/layout/Sidebar/Sidebar'
import { menuCoordenador } from '../../../config/dashboardMenus'
import PreceptoresMultiplosAdm from '../DashboardAdm/components/PreceptoresMultiplosAdm'
import SemestreOfertasAdm from '../DashboardAdm/components/SemestreOfertasAdm'
import HeaderCoordenador from './components/HeaderCoordenador'
import VisaoGeralCoordenador from './components/VisaoGeralCoordenador'
import CurriculosCoordenador from './components/CurriculosCoordenador'
import AlunosCoordenador from './components/AlunosCoordenador'
import VagasCoordenador from './components/VagasCoordenador'
import TurmasCoordenador from './components/TurmasCoordenador'
import MatriculasCoordenador from './components/MatriculasCoordenador'
import ComponentesCoordenador from './components/ComponentesCoordenador'
import FrequenciaDetalhadaCoordenador from './components/FrequenciaDetalhadaCoordenador'
import AvaliacoesCoordenador from './components/AvaliacoesCoordenador'
import PerfilCoordenador from './components/PerfilCoordenador'

export default function DashboardCoordenador() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)
  const [filtroAlunos, setFiltroAlunos] = useState('todos')
  const [filtroVisualizacao, setFiltroVisualizacao] = useState('instituicao')
  const [filtroLocais, setFiltroLocais] = useState('todos')
  const [abaUsuarios, setAbaUsuarios] = useState('lista')
  const [abaPreceptoresSubMenu, setAbaPreceptoresSubMenu] = useState('lista')
  const [perfilSelecionado, setPerfilSelecionado] = useState(null)
  const [modalAdicionarPreceptor, setModalAdicionarPreceptor] = useState(false)
  const [localSelecionadoParaPreceptor, setLocalSelecionadoParaPreceptor] = useState(null)
  const [preceptoresSelecionados, setPreceptoresSelecionados] = useState([])
  const [preceptoresAdicionadosPorLocal, setPreceptoresAdicionadosPorLocal] = useState({})
  const [modalEspecialidadesLocal, setModalEspecialidadesLocal] = useState(false)
  const [localSelecionadoParaEspecialidades, setLocalSelecionadoParaEspecialidades] = useState(null)
  const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState([])
  const [locaisComEspecialidades, setLocaisComEspecialidades] = useState({})
  const [modalCriarEspecialidade, setModalCriarEspecialidade] = useState(false)
  const [novaEspecialidadeNome, setNovaEspecialidadeNome] = useState('')
  const [novaEspecialidadeCodigo, setNovaEspecialidadeCodigo] = useState('')
  const [especialidadesDisponiveis, setEspecialidadesDisponiveis] = useState([
    { id: 1, nome: 'Clínica Médica', codigo: 'CM001' },
    { id: 2, nome: 'Cirurgia Geral', codigo: 'CG001' },
    { id: 3, nome: 'Pediatria', codigo: 'PED001' },
    { id: 4, nome: 'Cardiologia', codigo: 'CARD001' },
    { id: 5, nome: 'Ginecologia', codigo: 'GINE001' },
    { id: 6, nome: 'Enfermagem Clínica', codigo: 'ENF001' },
    { id: 7, nome: 'Farmácia Clínica', codigo: 'FAR001' },
    { id: 8, nome: 'Urgência e Emergência', codigo: 'URG001' },
    { id: 9, nome: 'Saúde Pública', codigo: 'SAU001' },
    { id: 10, nome: 'Ortopedia', codigo: 'ORT001' }
  ])

  // Mock de especialidades disponíveis
  const especialidades = especialidadesDisponiveis
  
  // Export helper (placeholder)
  const handleExportar = (dados, nome_arquivo) => {
    console.log('Exportando:', nome_arquivo || 'preceptores.csv', dados?.length || 0)
  }

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

  // Mock do coordenador logado
  const coordenador = {
    nome: 'Prof. Dr. Carlos Eduardo Santos',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    data_nascimento: '1980-05-15',
    email: 'carlos.santos@unifesp.br',
    telefone: '(11) 3091-9000',
    celular: '(11) 98765-4321',
    cep: '04023-062',
    endereco: 'Av. Lineu Prestes, 2565 - Cidade Universitária',
    cidade: 'São Paulo - SP',
    instituicao: 'Universidade Federal de São Paulo',
    unidade: 'Campus São Paulo',
    cargo: 'Coordenador(a) de Estágios',
    data_admissao: '2015-03-10'
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

  // Mock de CURRICULO_ESTAGIO (mesmo conteúdo do Admin)
  const curriculos = [
    {
      id_curriculo: 1,
      id_curso: 1,
      id_unidade: 1,
      nome_curriculo: 'Medicina - Currículo 2025',
      ano_vigencia: 2025,
      periodo_obrigatorio_minimo: 9,
      carga_horaria_total: 3200,
      carga_horaria_minima: 3000,
      versao: '1.0',
      status: 'Vigente',
      data_criacao: '2024-08-15',
      descricao: 'Currículo de medicina com 9º ao 12º período dedicados a estágios'
    },
    {
      id_curriculo: 2,
      id_curso: 5,
      id_unidade: 4,
      nome_curriculo: 'Medicina - Currículo 2025 (USP)',
      ano_vigencia: 2025,
      periodo_obrigatorio_minimo: 9,
      carga_horaria_total: 3200,
      carga_horaria_minima: 3000,
      versao: '1.0',
      status: 'Vigente',
      data_criacao: '2024-08-20',
      descricao: 'Currículo de medicina USP com ênfase em pesquisa'
    },
    {
      id_curriculo: 3,
      id_curso: 2,
      id_unidade: 1,
      nome_curriculo: 'Enfermagem - Currículo 2025',
      ano_vigencia: 2025,
      periodo_obrigatorio_minimo: 7,
      carga_horaria_total: 2400,
      carga_horaria_minima: 2200,
      versao: '1.0',
      status: 'Vigente',
      data_criacao: '2024-08-18',
      descricao: 'Currículo de enfermagem com ênfase em saúde coletiva'
    }
  ]

  // Mock de PRECEPTORES (mesmo conteúdo do Admin)
  const preceptores = [
    {
      id: 1,
      nome: 'Dr. Carlos Silva',
      crm: '123456/SP',
      email: 'carlos.silva@unifesp.br',
      telefone: '(11) 98765-4321',
      instituicao: 'UNIFESP',
      unidade: 'Campus São Paulo',
      alocacoes: [
        {
          id: 1,
          especialidade: 'Cardiologia',
          local: 'Hospital Universitário',
          status: 'Ativa',
          alunos: [
            { id: 101, nome: 'João Santos', matricula: 'MAT2024001', periodo: '6º' },
            { id: 103, nome: 'Pedro Oliveira', matricula: 'MAT2024003', periodo: '6º' },
            { id: 105, nome: 'Carlos Pereira', matricula: 'MAT2024005', periodo: '5º' }
          ]
        },
        {
          id: 2,
          especialidade: 'Clínica Geral',
          local: 'HC',
          status: 'Ativa',
          alunos: [
            { id: 102, nome: 'Maria Silva', matricula: 'MAT2024002', periodo: '8º' },
            { id: 104, nome: 'Ana Souza', matricula: 'MAT2024004', periodo: '7º' }
          ]
        }
      ],
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Dra. Ana Costa',
      crm: '789012/SP',
      email: 'ana.costa@usp.br',
      telefone: '(11) 91234-5678',
      instituicao: 'USP',
      unidade: 'Faculdade de Medicina',
      alocacoes: [
        {
          id: 3,
          especialidade: 'Pediatria',
          local: 'Instituto da Criança',
          status: 'Ativa',
          alunos: [
            { id: 102, nome: 'Maria Silva', matricula: 'MAT2024002', periodo: '8º' },
            { id: 104, nome: 'Ana Souza', matricula: 'MAT2024004', periodo: '7º' },
            { id: 106, nome: 'Luiza Santos', matricula: 'MAT2024006', periodo: '9º' },
            { id: 101, nome: 'João Santos', matricula: 'MAT2024001', periodo: '6º' }
          ]
        }
      ],
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Dr. Roberto Mendes',
      crm: '345678/SP',
      email: 'roberto.mendes@unifesp.br',
      telefone: '(11) 97654-3210',
      instituicao: 'UNIFESP',
      unidade: 'Campus Diadema',
      alocacoes: [
        {
          id: 4,
          especialidade: 'Farmácia Clínica',
          local: 'Lab. Clínico',
          status: 'Ativa',
          alunos: [
            { id: 105, nome: 'Carlos Pereira', matricula: 'MAT2024005', periodo: '5º' }
          ]
        }
      ],
      status: 'Ativo'
    }
  ]

  // Instituições para filtro dos preceptores (simplificado para o componente)
  const instituicoesPreceptor = [
    { id: 1, nome: 'UNIFESP', unidades: ['Campus São Paulo', 'Campus Diadema', 'Campus Santos'] },
    { id: 2, nome: 'USP', unidades: ['Faculdade de Medicina'] }
  ]

  // Mock de DISPONIBILIDADE_PRECEPTOR
  const disponibilidades = [
    {
      id_disponibilidade: 1,
      id_preceptor: 1,
      nome_preceptor: 'Dr. Carlos Silva',
      id_componente: 101,
      nome_componente: 'Clínica Médica I',
      id_local: 1,
      nome_local: 'Hospital Universitário',
      turno: 'Manhã',
      horario_inicio: '07:00',
      horario_fim: '13:00',
      dias_semana: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA'],
      capacidade_alunos: 5,
      alunos_alocados: 5,
      data_inicio: '2025-02-03',
      data_fim: '2025-03-02',
      status: 'Ocupado',
      observacoes: 'Turma completa para o rodízio de fevereiro'
    },
    {
      id_disponibilidade: 2,
      id_preceptor: 2,
      nome_preceptor: 'Dra. Ana Costa',
      id_componente: 102,
      nome_componente: 'Pediatria',
      id_local: 2,
      nome_local: 'Instituto da Criança',
      turno: 'Tarde',
      horario_inicio: '13:00',
      horario_fim: '19:00',
      dias_semana: ['SEGUNDA', 'TERÇA', 'QUARTA'],
      capacidade_alunos: 4,
      alunos_alocados: 2,
      data_inicio: '2025-02-03',
      data_fim: '2025-05-31',
      status: 'Disponível',
      observacoes: 'Vagas disponíveis para próximo rodízio'
    },
    {
      id_disponibilidade: 3,
      id_preceptor: 3,
      nome_preceptor: 'Dr. Roberto Mendes',
      id_componente: 103,
      nome_componente: 'Farmácia Clínica',
      id_local: 3,
      nome_local: 'Lab. Clínico',
      turno: 'Manhã',
      horario_inicio: '08:00',
      horario_fim: '12:00',
      dias_semana: ['TERÇA', 'QUINTA'],
      capacidade_alunos: 3,
      alunos_alocados: 1,
      data_inicio: '2025-03-01',
      data_fim: '2025-04-30',
      status: 'Disponível',
      observacoes: ''
    }
  ]

  // Mock de ofertas de semestre (com estrutura do Admin)
  const ofertas = [
    {
      id_oferta_semestre: 1,
      id_curriculo: 1,
      id_unidade: 1,
      unidade: 'Campus São Paulo',
      curso: 'Medicina',
      ano_letivo: 2025,
      semestre: 1,
      descricao: '1º Semestre 2025',
      data_inicio: '2025-02-03',
      data_fim: '2025-06-30',
      total_alunos_previstos: 115,
      status: 'Andamento',
      observacoes: 'Semestre com 4 rodízios e reforço em urgência/emergência',
      data_cadastro: '2025-01-15 10:30:00',
      horas_praticas_exigidas: 1200,
      horas_praticas_ofertadas: 1320,
      alunos_alocados: 92,
      alunos_pendentes: 23,
      dias_sem_alocar_media: 18,
      proximos_formandos: [
        { id: 201, nome: 'Paula Ribeiro', periodo: '11º', faltam_horas: 120, dias_sem_alocacao: 25 },
        { id: 202, nome: 'Lucas Martins', periodo: '12º', faltam_horas: 80, dias_sem_alocacao: 12 },
        { id: 203, nome: 'Fernanda Lopes', periodo: '10º', faltam_horas: 200, dias_sem_alocacao: 34 }
      ],
      alunos_nao_alocados: [
        { id: 101, nome: 'João Santos', matricula: 'MAT2024001', periodo: '6º', dias_sem_alocacao: 45 },
        { id: 102, nome: 'Maria Silva', matricula: 'MAT2024002', periodo: '8º', dias_sem_alocacao: 32 },
        { id: 103, nome: 'Pedro Oliveira', matricula: 'MAT2024003', periodo: '6º', dias_sem_alocacao: 18 }
      ],
      rodizios: [
        {
          id_rodizio: 1,
          nome_rodizio: 'Rodízio A',
          codigo_rodizio: '2025.1-A',
          vagas_total: 30,
          vagas_ocupadas: 28,
          ordem_execucao: 1,
          cor_identificacao: '#FF6B6B',
          status: 'Ativo',
          observacoes: 'Rodízio matutino',
          data_inicio: '2025-02-03',
          data_fim: '2025-03-30'
        }
      ],
      convenios: [
        {
          id_convenio: 1,
          id_unidade: 1,
          id_local: 1,
          numero_convenio: 'CONV-2025-001',
          tipo_convenio: 'Estágio',
          data_inicio_vigencia: '2025-01-01',
          data_fim_vigencia: '2027-12-31',
          renovacao_automatica: true,
          prazo_aviso_renovacao: 90,
          valor_mensal: 5000.0,
          forma_pagamento: 'Transferência bancária',
          objeto: 'Estágio curricular obrigatório',
          arquivo_convenio: '/docs/convenio_2025_001.pdf',
          status: 'Vigente',
          local: 'Hospital Universitário'
        }
      ]
    }
  ]

  // Mock de USUÁRIOS (para seção de Gestão de Usuários)
  const usuarios = [
    { id_usuario: 1, nome: 'Luiz Almeida', unidade: 'Campus São Paulo', cpf: '123.456.789-00', email: 'luiz.almeida@unifesp.br', perfil: 'Coordenador', instituicao: 'UNIFESP', ultimo_acesso: '2026-01-10 09:21', status: 'Ativo' },
    { id_usuario: 2, nome: 'Patrícia Gomes', unidade: 'Campus São Paulo', cpf: '987.654.321-00', email: 'patricia.gomes@unifesp.br', perfil: 'Preceptor', instituicao: 'UNIFESP', ultimo_acesso: '2026-01-18 14:03', status: 'Ativo' },
    { id_usuario: 3, nome: 'Ricardo Souza', unidade: 'Campus São Paulo', cpf: '111.222.333-44', email: 'ricardo.souza@unifesp.br', perfil: 'Docente', instituicao: 'UNIFESP', ultimo_acesso: '2025-12-22 16:45', status: 'Inativo' }
  ]

  // Mock de PERFIS (para seção de Perfis de Acesso)
  const perfis = [
    {
      id_perfil: 1,
      nome_perfil: 'Administrador',
      descricao: 'Acesso total ao sistema',
      status: 'Ativo',
      total_usuarios: 3,
      permissoes: ['criar', 'editar', 'excluir', 'visualizar', 'gerenciar_usuarios', 'gerenciar_estagios', 'gerenciar_alunos', 'validar_frequencia', 'avaliar_alunos', 'gerenciar_turmas', 'upload_documentos', 'gerenciar_lgpd', 'exportar_dados', 'configurar_sistema']
    },
    {
      id_perfil: 2,
      nome_perfil: 'Coordenador',
      descricao: 'Gerencia estágios, turmas e avaliações',
      status: 'Ativo',
      total_usuarios: 12,
      permissoes: ['criar', 'editar', 'visualizar', 'gerenciar_estagios', 'gerenciar_alunos', 'validar_frequencia', 'avaliar_alunos', 'gerenciar_turmas', 'upload_documentos', 'exportar_dados']
    },
    {
      id_perfil: 3,
      nome_perfil: 'Gestor Local',
      descricao: 'Gerencia estágios em um local específico',
      status: 'Ativo',
      total_usuarios: 8,
      permissoes: ['visualizar', 'gerenciar_estagios', 'gerenciar_alunos', 'validar_frequencia', 'avaliar_alunos', 'upload_documentos', 'exportar_dados']
    },
    {
      id_perfil: 4,
      nome_perfil: 'Preceptor',
      descricao: 'Acompanha alunos e lança avaliações',
      status: 'Ativo',
      total_usuarios: 28,
      permissoes: ['visualizar', 'validar_frequencia', 'avaliar_alunos', 'upload_documentos']
    },
    {
      id_perfil: 5,
      nome_perfil: 'Aluno',
      descricao: 'Registra frequência e acessa documentos',
      status: 'Ativo',
      total_usuarios: 115,
      permissoes: ['visualizar', 'registrar_frequencia', 'upload_documentos']
    }
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
    <div className='flex w-full min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white overflow-x-hidden'>
      {/* Sidebar Desktop */}
      <Sidebar 
        abaSelecionada={abaSelecionada} 
        setAbaSelecionada={setAbaSelecionada}
        menuItems={menuCoordenador}
        titulo="Painel de Coordenação"
        subtitulo="v1.0.0"
        onExpandChange={setSidebarExpanded}
      />
      
      {/* Conteúdo Principal */}
      <div className={`flex-1 w-full overflow-x-hidden transition-all duration-300 ml-0 ${sidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header */}
        <HeaderCoordenador 
          instituicao={instituicao} 
          coordenador={coordenador}
          onPerfilClick={() => setAbaSelecionada('perfil')}
        />

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
              {menuCoordenador.map((secao) => (
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
        {/* PERFIL DO COORDENADOR */}
        {abaSelecionada === 'perfil' && (
          <PerfilCoordenador coordenador={coordenador} />
        )}

        {/* VISÃO GERAL */}
        {abaSelecionada === 'overview' && (
          <VisaoGeralCoordenador instituicao={instituicao} alunos={alunos} />
        )}

        {/* PRECEPTORES (mantida inline devido à complexidade) */}
        {abaSelecionada === 'preceptores' && <PreceptoresMultiplosAdm preceptores={preceptores} instituicoesPreceptor={instituicoesPreceptor} handleExportar={handleExportar} abaPreceptoresSubMenu={abaPreceptoresSubMenu} setAbaPreceptoresSubMenu={setAbaPreceptoresSubMenu} />}

        {/* CURRÍCULOS */}
        {abaSelecionada === 'curriculos' && (
          <CurriculosCoordenador curriculos={curriculos} />
        )}

        {/* SEMESTRE E OFERTAS */}
        {abaSelecionada === 'semestre' && (
          <SemestreOfertasAdm ofertas={ofertas} />
        )}

        {/* ALUNOS */}
        {abaSelecionada === 'alunos' && (
          <AlunosCoordenador 
            alunos={alunos}
            alunosFiltrados={alunosFiltrados}
            filtroVisualizacao={filtroVisualizacao}
            setFiltroVisualizacao={setFiltroVisualizacao}
            filtroAlunos={filtroAlunos}
            setFiltroAlunos={setFiltroAlunos}
          />
        )}

        {/* VAGAS */}
        {abaSelecionada === 'vagas' && (
          <VagasCoordenador vagas={vagas} />
        )}

        {/* LOCAIS - Mantida inline devido à complexidade dos modals e estado */}
        {abaSelecionada === 'locais' && (
          <div className='space-y-6'>
            {/* Sub-abas de Preceptores */}
            <div className='overflow-x-auto whitespace-nowrap -mx-2 px-2'>
              <div className='flex gap-2 md:flex-wrap'>
                <button
                  onClick={() => setAbaPreceptoresSubMenu('lista')}
                  className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    abaPreceptoresSubMenu === 'lista'
                      ? 'bg-[#237EE6] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiUsers size={18} /> Lista de Preceptores
                </button>
                <button
                  onClick={() => setAbaPreceptoresSubMenu('disponibilidade')}
                  className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    abaPreceptoresSubMenu === 'disponibilidade'
                      ? 'bg-[#237EE6] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiCalendar size={18} /> Disponibilidade
                </button>
              </div>
            </div>

            {/* Conteúdo da sub-aba Lista */}
            {abaPreceptoresSubMenu === 'lista' && (
              <PreceptoresMultiplosAdm preceptores={preceptores} instituicoes={instituicoesPreceptor} handleExportar={() => handleExportar(preceptores, 'preceptores.csv')} />
            )}

            {/* Conteúdo da sub-aba Disponibilidade */}
            {abaPreceptoresSubMenu === 'disponibilidade' && (
              <div className='space-y-6'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-3xl font-bold text-gray-900'>Disponibilidade de Preceptores</h2>
                  <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
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
                          <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local</th>
                          <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Turno</th>
                          <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Horário</th>
                          <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Capacidade</th>
                          <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alocados</th>
                          <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {disponibilidades.map((disp) => (
                          <tr key={disp.id_disponibilidade} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                            <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{disp.nome_preceptor}</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>{disp.nome_componente}</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>{disp.nome_local}</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>{disp.turno}</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>{disp.horario_inicio} - {disp.horario_fim}</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>{disp.capacidade_alunos}</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>
                              <div className='flex items-center gap-2'>
                                <div className='w-16 bg-gray-200 rounded-full h-2'>
                                  <div
                                    className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                    style={{ width: `${(disp.alunos_alocados / disp.capacidade_alunos) * 100}%` }}
                                  ></div>
                                </div>
                                <span className='font-semibold'>{disp.alunos_alocados}/{disp.capacidade_alunos}</span>
                              </div>
                            </td>
                            <td className='px-6 py-4'>
                              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                disp.status === 'Disponível' 
                                  ? 'bg-[#10E686]/20 text-[#10E686]' 
                                  : 'bg-orange-100 text-orange-700'
                              }`}>
                                {disp.status}
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
          </div>
        )}

        {/* LOCAIS */}
        {abaSelecionada === 'locais' && (
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><MdLocalHospital size={32} /> Gerenciamento de Locais</h2>
              <div className='flex gap-3 flex-wrap'>
                <select
                  value={filtroLocais}
                  onChange={(e) => setFiltroLocais(e.target.value)}
                  className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                >
                  <option value='todos'>Todos ({locais.length})</option>
                  <option value='ativos'>Ativos ({locais.filter(l => l.status === 'Ativo').length})</option>
                  <option value='inativos'>Inativos ({locais.filter(l => l.status === 'Inativo').length})</option>
                </select>
                <button 
                  onClick={() => setModalCriarEspecialidade(true)}
                  className='bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'
                >
                  <FiStar size={18} /> Nova Especialidade
                </button>
                <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
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
                          <div className='flex gap-2 items-center flex-wrap'>
                            <button 
                              onClick={() => {
                                setLocalSelecionadoParaEspecialidades(local)
                                setEspecialidadesSelecionadas(locaisComEspecialidades[local.id] || [])
                                setModalEspecialidadesLocal(true)
                              }}
                              className='text-[#10E686] hover:text-[#0ab859] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'
                              title='Gerenciar especialidades'
                            >
                              <FiStar size={16} /> Especialidades
                            </button>
                            <button 
                              onClick={() => {
                                setLocalSelecionadoParaPreceptor(local)
                                setModalAdicionarPreceptor(true)
                              }}
                              className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'
                              title='Adicionar preceptor'
                            >
                              <FiPlus size={16} /> Preceptor
                            </button>
                            <button className='text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                              <FiEdit2 size={16} /> Editar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seção de Preceptores por Local */}
            {Object.keys(preceptoresAdicionadosPorLocal).length > 0 && (
              <div className='bg-white rounded-2xl shadow-md p-6'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  <FiUsers size={24} /> Preceptores Alocados por Local
                </h3>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  {Object.entries(preceptoresAdicionadosPorLocal).map(([localId, preceptores]) => {
                    const local = locais.find(l => l.id === parseInt(localId))
                    return (
                      <div key={localId} className='border-2 border-gray-200 rounded-xl p-4'>
                        <div className='flex items-center justify-between mb-4'>
                          <h4 className='text-lg font-semibold text-gray-900'>{local?.nome}</h4>
                          <span className='px-3 py-1 bg-[#237EE6]/10 text-[#237EE6] rounded-lg text-xs font-semibold'>
                            {preceptores.length} preceptor{preceptores.length !== 1 ? 'es' : ''}
                          </span>
                        </div>
                        <div className='space-y-2'>
                          {preceptores.map((preceptor) => (
                            <div key={preceptor.id} className='flex items-center justify-between p-2 bg-gray-50 rounded-lg'>
                              <div>
                                <p className='text-sm font-semibold text-gray-900'>{preceptor.nome}</p>
                                <p className='text-xs text-gray-600'>{preceptor.crm}</p>
                              </div>
                              <button
                                onClick={() => {
                                  const updated = { ...preceptoresAdicionadosPorLocal }
                                  updated[localId] = updated[localId].filter(p => p.id !== preceptor.id)
                                  if (updated[localId].length === 0) {
                                    delete updated[localId]
                                  }
                                  setPreceptoresAdicionadosPorLocal(updated)
                                }}
                                className='text-red-600 hover:text-red-700 transition-colors'
                                title='Remover preceptor'
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Seção de Especialidades por Local */}
            {Object.keys(locaisComEspecialidades).length > 0 && (
              <div className='bg-white rounded-2xl shadow-md p-6'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  <FiStar size={24} /> Especialidades por Local
                </h3>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  {Object.entries(locaisComEspecialidades).map(([localId, especialidades]) => {
                    const local = locais.find(l => l.id === parseInt(localId))
                    return (
                      <div key={localId} className='border-2 border-[#10E686]/30 rounded-xl p-4 bg-gradient-to-br from-[#10E686]/5 to-[#60E6D7]/5'>
                        <div className='flex items-center justify-between mb-4'>
                          <h4 className='text-lg font-semibold text-gray-900'>{local?.nome}</h4>
                          <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                            {especialidades.length} especialidade{especialidades.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {especialidades.map((esp) => (
                            <span 
                              key={esp.id}
                              className='px-3 py-1 bg-white border border-[#10E686]/40 text-gray-700 rounded-lg text-xs font-medium flex items-center gap-1'
                            >
                              <FiStar size={12} className='text-[#10E686]' />
                              {esp.nome}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODAL: Adicionar Preceptores a um Local */}
        {modalAdicionarPreceptor && localSelecionadoParaPreceptor && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto'>
              {/* Header */}
              <div className='sticky top-0 bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white p-6 flex items-center justify-between'>
                <div>
                  <h2 className='text-2xl font-bold'>Adicionar Preceptor</h2>
                  <p className='text-sm opacity-90 mt-1'>Local: {localSelecionadoParaPreceptor.nome}</p>
                </div>
                <button
                  onClick={() => {
                    setModalAdicionarPreceptor(false)
                    setLocalSelecionadoParaPreceptor(null)
                    setPreceptoresSelecionados([])
                  }}
                  className='text-white hover:text-gray-200 transition-colors'
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Body */}
              <div className='p-6'>
                <p className='text-gray-600 text-sm mb-4'>
                  Selecione um ou mais preceptores existentes para alocar a este local:
                </p>

                {/* Lista de Preceptores */}
                <div className='space-y-3 mb-6'>
                  {preceptores.map((preceptor) => (
                    <label key={preceptor.id} className='flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#237EE6] hover:bg-[#F5F7FA] cursor-pointer transition-all duration-300'>
                      <input
                        type='checkbox'
                        checked={preceptoresSelecionados.some(p => p.id === preceptor.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPreceptoresSelecionados([...preceptoresSelecionados, preceptor])
                          } else {
                            setPreceptoresSelecionados(preceptoresSelecionados.filter(p => p.id !== preceptor.id))
                          }
                        }}
                        className='mt-1 w-4 h-4 accent-[#237EE6] cursor-pointer'
                      />
                      <div className='flex-1'>
                        <p className='font-semibold text-gray-900'>{preceptor.nome}</p>
                        <p className='text-xs text-gray-600'>CRM: {preceptor.crm}</p>
                        <p className='text-xs text-gray-600'>{preceptor.email}</p>
                        <p className='text-xs text-gray-500 mt-1'>{preceptor.instituicao} • {preceptor.unidade}</p>
                        {preceptor.alocacoes && preceptor.alocacoes.length > 0 && (
                          <p className='text-xs text-[#237EE6] mt-1 font-semibold'>
                            {preceptor.alocacoes.length} alocação{preceptor.alocacoes.length !== 1 ? 'ões' : ''} existente{preceptor.alocacoes.length !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Resumo de Seleção */}
                {preceptoresSelecionados.length > 0 && (
                  <div className='bg-blue-50 border-2 border-[#237EE6] rounded-lg p-4 mb-6'>
                    <p className='text-sm font-semibold text-gray-900 mb-3'>
                      {preceptoresSelecionados.length} preceptor{preceptoresSelecionados.length !== 1 ? 'es' : ''} selecionado{preceptoresSelecionados.length !== 1 ? 's' : ''}:
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {preceptoresSelecionados.map((p) => (
                        <span key={p.id} className='inline-flex items-center gap-1 px-3 py-1 bg-[#237EE6] text-white rounded-lg text-xs font-semibold'>
                          {p.nome}
                          <button
                            onClick={() => setPreceptoresSelecionados(preceptoresSelecionados.filter(x => x.id !== p.id))}
                            className='hover:text-gray-200 transition-colors'
                          >
                            <FiX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className='sticky bottom-0 bg-gray-50 border-t-2 border-gray-200 p-6 flex gap-3 justify-end'>
                <button
                  onClick={() => {
                    setModalAdicionarPreceptor(false)
                    setLocalSelecionadoParaPreceptor(null)
                    setPreceptoresSelecionados([])
                  }}
                  className='px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300'
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (preceptoresSelecionados.length > 0) {
                      const localId = localSelecionadoParaPreceptor.id.toString()
                      setPreceptoresAdicionadosPorLocal({
                        ...preceptoresAdicionadosPorLocal,
                        [localId]: [
                          ...(preceptoresAdicionadosPorLocal[localId] || []),
                          ...preceptoresSelecionados.filter(p => 
                            !(preceptoresAdicionadosPorLocal[localId] || []).some(existente => existente.id === p.id)
                          )
                        ]
                      })
                      setModalAdicionarPreceptor(false)
                      setLocalSelecionadoParaPreceptor(null)
                      setPreceptoresSelecionados([])
                    }
                  }}
                  disabled={preceptoresSelecionados.length === 0}
                  className='px-6 py-2 bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                >
                  <FiCheck size={18} /> Adicionar {preceptoresSelecionados.length > 0 ? preceptoresSelecionados.length : ''}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Criar Nova Especialidade */}
        {modalCriarEspecialidade && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl max-w-lg w-full'>
              {/* Header */}
              <div className='bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-white p-6 flex items-center justify-between'>
                <h2 className='text-2xl font-bold'>Nova Especialidade</h2>
                <button
                  onClick={() => {
                    setModalCriarEspecialidade(false)
                    setNovaEspecialidadeNome('')
                    setNovaEspecialidadeCodigo('')
                  }}
                  className='text-white hover:text-gray-200 transition-colors'
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Body */}
              <div className='p-6 space-y-4'>
                <p className='text-gray-600 text-sm mb-4'>
                  Preencha os dados para criar uma nova especialidade que estará disponível para associação aos locais:
                </p>

                {/* Nome da Especialidade */}
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Nome da Especialidade *
                  </label>
                  <input
                    type='text'
                    value={novaEspecialidadeNome}
                    onChange={(e) => setNovaEspecialidadeNome(e.target.value)}
                    placeholder='Ex: Neurologia'
                    className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#10E686] focus:outline-none'
                  />
                </div>

                {/* Código da Especialidade */}
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Código da Especialidade *
                  </label>
                  <input
                    type='text'
                    value={novaEspecialidadeCodigo}
                    onChange={(e) => setNovaEspecialidadeCodigo(e.target.value.toUpperCase())}
                    placeholder='Ex: NEUR001'
                    className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#10E686] focus:outline-none'
                    maxLength={10}
                  />
                  <p className='text-xs text-gray-500 mt-1'>Use letras maiúsculas e números (máx. 10 caracteres)</p>
                </div>

                {/* Preview */}
                {novaEspecialidadeNome && novaEspecialidadeCodigo && (
                  <div className='bg-gradient-to-r from-[#10E686]/10 to-[#60E6D7]/10 border-2 border-[#10E686] rounded-lg p-4'>
                    <p className='text-sm font-semibold text-gray-900 mb-2'>Preview:</p>
                    <div className='flex items-center gap-2'>
                      <FiStar className='text-[#10E686]' size={16} />
                      <span className='font-semibold text-gray-900'>{novaEspecialidadeNome}</span>
                      <span className='text-xs text-gray-500'>({novaEspecialidadeCodigo})</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className='bg-gray-50 border-t-2 border-gray-200 p-6 flex gap-3 justify-end'>
                <button
                  onClick={() => {
                    setModalCriarEspecialidade(false)
                    setNovaEspecialidadeNome('')
                    setNovaEspecialidadeCodigo('')
                  }}
                  className='px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300'
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (novaEspecialidadeNome && novaEspecialidadeCodigo) {
                      const novaId = Math.max(...especialidadesDisponiveis.map(e => e.id)) + 1
                      setEspecialidadesDisponiveis([
                        ...especialidadesDisponiveis,
                        {
                          id: novaId,
                          nome: novaEspecialidadeNome,
                          codigo: novaEspecialidadeCodigo
                        }
                      ])
                      setModalCriarEspecialidade(false)
                      setNovaEspecialidadeNome('')
                      setNovaEspecialidadeCodigo('')
                    }
                  }}
                  disabled={!novaEspecialidadeNome || !novaEspecialidadeCodigo}
                  className='px-6 py-2 bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                >
                  <FiCheck size={18} /> Criar Especialidade
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Gerenciar Especialidades do Local */}
        {modalEspecialidadesLocal && localSelecionadoParaEspecialidades && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto'>
              {/* Header */}
              <div className='sticky top-0 bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-white p-6 flex items-center justify-between'>
                <div>
                  <h2 className='text-2xl font-bold'>Gerenciar Especialidades</h2>
                  <p className='text-sm opacity-90 mt-1'>Local: {localSelecionadoParaEspecialidades.nome}</p>
                </div>
                <button
                  onClick={() => {
                    setModalEspecialidadesLocal(false)
                    setLocalSelecionadoParaEspecialidades(null)
                    setEspecialidadesSelecionadas([])
                  }}
                  className='text-white hover:text-gray-200 transition-colors'
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Body */}
              <div className='p-6'>
                <p className='text-gray-600 text-sm mb-4'>
                  Selecione as especialidades oferecidas neste local de estágio:
                </p>

                {/* Status Atual */}
                {locaisComEspecialidades[localSelecionadoParaEspecialidades.id] && (
                  <div className='bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4'>
                    <p className='text-sm text-gray-700 mb-2'>
                      <strong>Especialidades Atuais:</strong> {locaisComEspecialidades[localSelecionadoParaEspecialidades.id].length}
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {locaisComEspecialidades[localSelecionadoParaEspecialidades.id].map(esp => (
                        <span key={esp.id} className='px-2 py-1 bg-[#10E686]/20 text-[#10E686] rounded text-xs font-semibold'>
                          {esp.nome}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lista de Especialidades */}
                <div className='space-y-3 mb-6'>
                  {especialidades.map((especialidade) => (
                    <label 
                      key={especialidade.id} 
                      className='flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300'
                      style={{
                        borderColor: especialidadesSelecionadas.some(e => e.id === especialidade.id) ? '#10E686' : '#E5E7EB',
                        backgroundColor: especialidadesSelecionadas.some(e => e.id === especialidade.id) ? '#10E68610' : 'white'
                      }}
                    >
                      <input
                        type='checkbox'
                        checked={especialidadesSelecionadas.some(e => e.id === especialidade.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEspecialidadesSelecionadas([...especialidadesSelecionadas, especialidade])
                          } else {
                            setEspecialidadesSelecionadas(especialidadesSelecionadas.filter(esp => esp.id !== especialidade.id))
                          }
                        }}
                        className='mt-1 w-4 h-4 accent-[#10E686] cursor-pointer'
                      />
                      <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                          <p className='font-semibold text-gray-900'>{especialidade.nome}</p>
                          {especialidadesSelecionadas.some(e => e.id === especialidade.id) && (
                            <FiCheck className='text-[#10E686]' size={20} />
                          )}
                        </div>
                        <p className='text-xs text-gray-500 mt-1'>Código: {especialidade.codigo}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Resumo de Seleção */}
                {especialidadesSelecionadas.length > 0 && (
                  <div className='bg-gradient-to-r from-[#10E686]/10 to-[#60E6D7]/10 border-2 border-[#10E686] rounded-lg p-4 mb-6'>
                    <p className='text-sm font-semibold text-gray-900 mb-3'>
                      {especialidadesSelecionadas.length} especialidade{especialidadesSelecionadas.length !== 1 ? 's' : ''} selecionada{especialidadesSelecionadas.length !== 1 ? 's' : ''}:
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {especialidadesSelecionadas.map((esp) => (
                        <span key={esp.id} className='inline-flex items-center gap-1 px-3 py-1 bg-[#10E686] text-white rounded-lg text-xs font-semibold'>
                          <FiStar size={12} />
                          {esp.nome}
                          <button
                            onClick={() => setEspecialidadesSelecionadas(especialidadesSelecionadas.filter(e => e.id !== esp.id))}
                            className='hover:text-gray-200 transition-colors'
                          >
                            <FiX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className='sticky bottom-0 bg-gray-50 border-t-2 border-gray-200 p-6 flex gap-3 justify-end'>
                <button
                  onClick={() => {
                    setModalEspecialidadesLocal(false)
                    setLocalSelecionadoParaEspecialidades(null)
                    setEspecialidadesSelecionadas([])
                  }}
                  className='px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300'
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    const localId = localSelecionadoParaEspecialidades.id
                    if (especialidadesSelecionadas.length > 0) {
                      setLocaisComEspecialidades({
                        ...locaisComEspecialidades,
                        [localId]: especialidadesSelecionadas
                      })
                    } else {
                      const updated = { ...locaisComEspecialidades }
                      delete updated[localId]
                      setLocaisComEspecialidades(updated)
                    }
                    setModalEspecialidadesLocal(false)
                    setLocalSelecionadoParaEspecialidades(null)
                    setEspecialidadesSelecionadas([])
                  }}
                  className='px-6 py-2 bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'
                >
                  <FiCheck size={18} /> Salvar {especialidadesSelecionadas.length > 0 ? `(${especialidadesSelecionadas.length})` : ''}
                </button>
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
                                className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
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
                                  className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
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
          <TurmasCoordenador turmas={turmas} />
        )}

        {/* MATRÍCULAS DE ALUNOS EM TURMAS */}
        {abaSelecionada === 'matriculas' && (
          <MatriculasCoordenador matriculasTurma={matriculasTurma} />
        )}

        {/* COMPONENTES CURRICULARES */}
        {abaSelecionada === 'componentes' && (
          <ComponentesCoordenador componentes={componentes} />
        )}

        {/* FREQUÊNCIA DETALHADA */}
        {abaSelecionada === 'frequenciaDetalhada' && (
          <FrequenciaDetalhadaCoordenador frequenciaDetalhada={frequenciaDetalhada} />
        )}

        {/* AVALIAÇÕES */}
        {abaSelecionada === 'avaliacoes' && (
          <AvaliacoesCoordenador avaliacoesAlunos={avaliacoesAlunos} />
        )}      
        {abaSelecionada === 'usuarios' && (
                    <div className='space-y-6'>
                      <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiSettings size={32} /> Gestão de Usuários e Perfis</h2>
        
                      {/* Sub-abas */}
                      <div>
                        <div className='flex flex-wrap gap-2'>
                          <button
                            onClick={() => setAbaUsuarios('lista')}
                            className={`shrink-0 px-2 py-2 md:px-4 md:py-2 text-xs md:text-base rounded-lg font-semibold transition-all flex items-center gap-1 md:gap-2 ${
                              abaUsuarios === 'lista'
                                ? 'bg-[#237EE6] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <FiUsers className='text-sm md:text-base' /> <span className='whitespace-nowrap'>Lista de Usuários</span>
                          </button>
                          <button
                            onClick={() => setAbaUsuarios('perfis')}
                            className={`shrink-0 px-2 py-2 md:px-4 md:py-2 text-xs md:text-base rounded-lg font-semibold transition-all flex items-center gap-1 md:gap-2 ${
                              abaUsuarios === 'perfis'
                                ? 'bg-[#237EE6] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <FiSettings className='text-sm md:text-base' /> <span className='whitespace-nowrap'>Perfis de Acesso</span>
                          </button>
                          <button
                            onClick={() => setAbaUsuarios('atribuir')}
                            className={`shrink-0 px-2 py-2 md:px-4 md:py-2 text-xs md:text-base rounded-lg font-semibold transition-all flex items-center gap-1 md:gap-2 ${
                              abaUsuarios === 'atribuir'
                                ? 'bg-[#237EE6] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <FiClipboard className='text-sm md:text-base' /> <span className='whitespace-nowrap'>Atribuir Funções</span>
                          </button>
                        </div>
                      </div>
        
                      {/* LISTA DE USUÁRIOS */}
                      {abaUsuarios === 'lista' && (
                        <div className='space-y-6'>
                          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div>
                              <h3 className='text-xl font-bold text-gray-900'>Usuários Cadastrados</h3>
                              <p className='text-sm text-gray-600 mt-1'>Total: {usuarios.length} usuários ativos</p>
                            </div>
                            <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                              <FiPlus size={18} /> Novo Usuário
                            </button>
                          </div>
        
                          {/* Filtros */}
                          <div className='bg-white rounded-2xl shadow-md p-6'>
                            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                              <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Buscar</label>
                                <input
                                  type='text'
                                  placeholder='Nome, CPF ou email...'
                                  className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                                />
                              </div>
                              <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Perfil</label>
                                <select className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'>
                                  <option value=''>Todos os perfis</option>
                                  {perfis.map(perfil => (
                                    <option key={perfil.id_perfil} value={perfil.id_perfil}>{perfil.nome_perfil}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Instituição</label>
                                <select className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'>
                                  <option value=''>Todas</option>
                                  <option value='UNIFESP'>UNIFESP</option>
                                  <option value='USP'>USP</option>
                                </select>
                              </div>
                              <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>Status</label>
                                <select className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'>
                                  <option value=''>Todos</option>
                                  <option value='Ativo'>Ativo</option>
                                  <option value='Inativo'>Inativo</option>
                                </select>
                              </div>
                            </div>
                          </div>
        
                          {/* Tabela de Usuários */}
                          <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                            <div className='overflow-x-auto'>
                              <table className='w-full'>
                                <thead>
                                  <tr className='border-b-2 border-gray-200 bg-gray-50'>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Usuário</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>CPF</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Email</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Perfil</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Último Acesso</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {usuarios.map((usuario) => (
                                    <tr key={usuario.id_usuario} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                                      <td className='px-6 py-4'>
                                        <div>
                                          <p className='text-sm font-semibold text-gray-900'>{usuario.nome}</p>
                                          <p className='text-xs text-gray-600'>{usuario.unidade}</p>
                                        </div>
                                      </td>
                                      <td className='px-6 py-4 text-sm text-gray-700'>{usuario.cpf}</td>
                                      <td className='px-6 py-4 text-sm text-gray-700'>{usuario.email}</td>
                                      <td className='px-6 py-4'>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                          usuario.perfil === 'Administrador' ? 'bg-purple-100 text-purple-700' :
                                          usuario.perfil === 'Coordenador' ? 'bg-blue-100 text-blue-700' :
                                          usuario.perfil === 'Preceptor' ? 'bg-green-100 text-green-700' :
                                          usuario.perfil === 'Docente' ? 'bg-yellow-100 text-yellow-700' :
                                          usuario.perfil === 'LGPD' ? 'bg-red-100 text-red-700' :
                                          'bg-gray-100 text-gray-700'
                                        }`}>
                                          {usuario.perfil}
                                        </span>
                                      </td>
                                      <td className='px-6 py-4 text-sm font-semibold text-[#237EE6]'>{usuario.instituicao}</td>
                                      <td className='px-6 py-4 text-xs text-gray-600'>{usuario.ultimo_acesso}</td>
                                      <td className='px-6 py-4'>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                          usuario.status === 'Ativo' ? 'bg-[#10E686]/20 text-[#10E686]' : 'bg-red-100 text-red-700'
                                        }`}>
                                          {usuario.status}
                                        </span>
                                      </td>
                                      <td className='px-6 py-4'>
                                        <div className='flex gap-2'>
                                          <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm'>
                                            Editar
                                          </button>
                                          <button className='text-gray-600 hover:text-gray-900 font-semibold text-sm'>
                                            Detalhes
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
        
                      {/* PERFIS DE ACESSO */}
                      {abaUsuarios === 'perfis' && (
                        <div className='space-y-6'>
                          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div>
                              <h3 className='text-xl font-bold text-gray-900'>Perfis de Acesso</h3>
                              <p className='text-sm text-gray-600 mt-1'>Gerenciar permissões e níveis de acesso</p>
                            </div>
                            <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                              <FiPlus size={18} /> Novo Perfil
                            </button>
                          </div>
        
                          {/* Cards de Perfis */}
                          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {perfis.map((perfil) => (
                              <div key={perfil.id_perfil} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                                <div className='flex justify-between items-start mb-4'>
                                  <div>
                                    <h3 className='text-xl font-bold text-gray-900'>{perfil.nome_perfil}</h3>
                                    <p className='text-sm text-gray-600 mt-1'>{perfil.descricao}</p>
                                  </div>
                                  <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
                                    {perfil.status}
                                  </span>
                                </div>
        
                                <div className='mb-4'>
                                  <div className='flex items-center justify-between mb-2'>
                                    <p className='text-sm font-semibold text-gray-700'>Usuários</p>
                                    <p className='text-2xl font-bold text-[#237EE6]'>{perfil.total_usuarios}</p>
                                  </div>
                                  <div className='w-full bg-gray-200 rounded-full h-2'>
                                    <div
                                      className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                      style={{ width: `${(perfil.total_usuarios / 322) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
        
                                <div className='mb-4'>
                                  <p className='text-xs font-semibold text-gray-700 mb-2'>Permissões:</p>
                                  <div className='flex flex-wrap gap-2'>
                                    {perfil.permissoes.map((permissao, idx) => (
                                      <span key={idx} className='text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded'>
                                        {permissao.replace('_', ' ')}
                                      </span>
                                    ))}
                                  </div>
                                </div>
        
                                <div className='flex gap-2'>
                                  <button className='flex-1 bg-[#237EE6] hover:bg-[#154c8b] text-white font-semibold py-2 rounded-lg transition-colors text-sm'>
                                    Editar
                                  </button>
                                  <button className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg transition-colors text-sm'>
                                    Ver Usuários
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
        
                          {/* Detalhes de Permissões */}
                          <div className='bg-white rounded-2xl shadow-md p-8'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-6'>Matriz de Permissões</h3>
                            <div className='overflow-x-auto'>
                              <table className='w-full'>
                                <thead>
                                  <tr className='border-b-2 border-gray-200'>
                                    <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Permissão</th>
                                    {perfis.map((perfil) => (
                                      <th key={perfil.id_perfil} className='px-4 py-3 text-center text-sm font-semibold text-gray-900'>
                                        {perfil.nome_perfil}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {['criar', 'editar', 'excluir', 'visualizar', 'gerenciar_usuarios', 'gerenciar_estagios', 'gerenciar_alunos', 'validar_frequencia', 'avaliar_alunos', 'gerenciar_turmas', 'registrar_frequencia', 'upload_documentos', 'gerenciar_lgpd', 'exportar_dados', 'excluir_dados', 'configurar_sistema'].map((permissao) => (
                                    <tr key={permissao} className='border-b border-gray-200 hover:bg-[#F5F7FA]'>
                                      <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{permissao.replace('_', ' ')}</td>
                                      {perfis.map((perfil) => (
                                        <td key={perfil.id_perfil} className='px-4 py-4 text-center'>
                                          {perfil.permissoes.includes(permissao) ? (
                                            <span className='text-[#10E686] font-bold text-lg'>✓</span>
                                          ) : (
                                            <span className='text-gray-300 font-bold text-lg'>—</span>
                                          )}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
        
                      {/* ATRIBUIR FUNÇÕES */}
                      {abaUsuarios === 'atribuir' && (
                        <div className='space-y-6'>
                          <div>
                            <h3 className='text-xl font-bold text-gray-900'>Atribuir Funções aos Usuários</h3>
                            <p className='text-sm text-gray-600 mt-1'>Selecione um perfil e gerencie os usuários atribuídos</p>
                          </div>
        
                          {/* Seletor de Perfil - Coordenador pode atribuir: Aluno, Preceptor, Gestor Local */}
                          <div className='bg-white rounded-2xl shadow-md p-6'>
                            <div className='mb-4'>
                              <label className='block text-sm font-semibold text-gray-700 mb-2'>Selecione o Perfil/Função</label>
                              <p className='text-xs text-gray-600'>Nota: Como Coordenador, você pode atribuir apenas: Aluno, Preceptor e Gestor Local</p>
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                              {perfis
                                .filter(p => [5, 4, 3].includes(p.id_perfil))
                                .map((perfil) => (
                                <button
                                  key={perfil.id_perfil}
                                  onClick={() => setPerfilSelecionado(perfil)}
                                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                    perfilSelecionado?.id_perfil === perfil.id_perfil
                                      ? 'border-[#237EE6] bg-blue-50'
                                      : 'border-gray-200 hover:border-gray-300 bg-white'
                                  }`}
                                >
                                  <div className='text-center'>
                                    <p className={`text-sm font-bold ${
                                      perfilSelecionado?.id_perfil === perfil.id_perfil ? 'text-[#237EE6]' : 'text-gray-900'
                                    }`}>
                                      {perfil.nome_perfil}
                                    </p>
                                    <p className='text-xs text-gray-600 mt-1'>{perfil.total_usuarios} usuários</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
        
                          {/* Conteúdo quando um perfil é selecionado */}
                          {perfilSelecionado && (
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                              {/* Usuários com este perfil */}
                              <div className='bg-white rounded-2xl shadow-md p-6'>
                                <div className='flex items-center justify-between mb-4'>
                                  <h4 className='text-lg font-bold text-gray-900'>
                                    Usuários com perfil "{perfilSelecionado.nome_perfil}"
                                  </h4>
                                  <span className='px-3 py-1 bg-[#237EE6] text-white rounded-lg text-sm font-semibold'>
                                    {usuarios.filter(u => u.id_perfil === perfilSelecionado.id_perfil).length}
                                  </span>
                                </div>
                                <div className='space-y-2 max-h-150 overflow-y-auto'>
                                  {usuarios.filter(u => u.id_perfil === perfilSelecionado.id_perfil).length === 0 ? (
                                    <div className='text-center py-8 text-gray-500'>
                                      <p className='text-sm'>Nenhum usuário com este perfil</p>
                                    </div>
                                  ) : (
                                    usuarios.filter(u => u.id_perfil === perfilSelecionado.id_perfil).map((usuario) => (
                                      <div key={usuario.id_usuario} className='flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-[#237EE6] transition-all'>
                                        <div className='flex-1'>
                                          <p className='text-sm font-semibold text-gray-900'>{usuario.nome}</p>
                                          <p className='text-xs text-gray-600'>{usuario.email}</p>
                                          <div className='flex items-center gap-2 mt-1'>
                                            <span className='text-xs text-[#237EE6] font-semibold'>{usuario.instituicao}</span>
                                            <span className='text-xs text-gray-500'>• {usuario.unidade}</span>
                                          </div>
                                        </div>
                                        <button 
                                          onClick={() => alert(`Remover ${usuario.nome} do perfil ${perfilSelecionado.nome_perfil}?`)}
                                          className='ml-3 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200 transition-colors'
                                        >
                                          Remover
                                        </button>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>
        
                              {/* Adicionar usuários ao perfil */}
                              <div className='bg-white rounded-2xl shadow-md p-6'>
                                <h4 className='text-lg font-bold text-gray-900 mb-4'>
                                  Adicionar Usuários ao Perfil
                                </h4>
                                
                                {/* Busca de usuários */}
                                <div className='mb-4'>
                                  <input
                                    type='text'
                                    placeholder='Buscar usuário por nome, CPF ou email...'
                                    className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none text-sm'
                                  />
                                </div>
        
                                {/* Lista de usuários disponíveis */}
                                <div className='space-y-2 max-h-130 overflow-y-auto'>
                                  <p className='text-xs text-gray-600 mb-3'>Usuários disponíveis (outros perfis)</p>
                                  {usuarios.filter(u => u.id_perfil !== perfilSelecionado.id_perfil).length === 0 ? (
                                    <div className='text-center py-8 text-gray-500'>
                                      <p className='text-sm'>Todos os usuários já possuem este perfil</p>
                                    </div>
                                  ) : (
                                    usuarios.filter(u => u.id_perfil !== perfilSelecionado.id_perfil).map((usuario) => (
                                      <div key={usuario.id_usuario} className='flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-all'>
                                        <div className='flex-1'>
                                          <p className='text-sm font-semibold text-gray-900'>{usuario.nome}</p>
                                          <p className='text-xs text-gray-600'>{usuario.email}</p>
                                          <div className='flex items-center gap-2 mt-1'>
                                            <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                                              usuario.perfil === 'Administrador' ? 'bg-purple-100 text-purple-700' :
                                              usuario.perfil === 'Coordenador' ? 'bg-blue-100 text-blue-700' :
                                              usuario.perfil === 'Preceptor' ? 'bg-green-100 text-green-700' :
                                              usuario.perfil === 'Docente' ? 'bg-yellow-100 text-yellow-700' :
                                              usuario.perfil === 'LGPD' ? 'bg-red-100 text-red-700' :
                                              'bg-gray-100 text-gray-700'
                                            }`}>
                                              {usuario.perfil}
                                            </span>
                                            <span className='text-xs text-gray-500'>• {usuario.instituicao}</span>
                                          </div>
                                        </div>
                                        <button 
                                          onClick={() => alert(`Atribuir perfil ${perfilSelecionado.nome_perfil} para ${usuario.nome}?`)}
                                          className='ml-3 px-3 py-1 bg-[#10E686] text-white rounded-lg text-xs font-semibold hover:bg-[#0bc970] transition-colors'
                                        >
                                          Atribuir
                                        </button>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
        
                          {/* Mensagem quando nenhum perfil está selecionado */}
                          {!perfilSelecionado && (
                            <div className='bg-white rounded-2xl shadow-md p-12 text-center'>
                              <FiSettings size={48} className='mx-auto text-gray-300 mb-4' />
                              <p className='text-gray-600 text-lg font-semibold mb-2'>Selecione um Perfil</p>
                              <p className='text-gray-500 text-sm'>Escolha um perfil acima para visualizar e gerenciar os usuários atribuídos</p>
                            </div>
                          )}
        
                          {/* Resumo de atribuições */}
                          <div className='bg-white rounded-2xl shadow-md p-6'>
                            <h4 className='text-lg font-bold text-gray-900 mb-4'>Resumo de Atribuições</h4>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                              {perfis.map((perfil) => {
                                const count = usuarios.filter(u => u.perfil === perfil.nome_perfil).length
                                const podeAtribuir = [5, 4, 3].includes(perfil.id_perfil)
                                return (
                                  <div key={perfil.id_perfil} className={`p-4 rounded-xl text-center ${
                                    podeAtribuir 
                                      ? 'bg-gradient-to-br from-[#F5F7FA] to-white border-2 border-gray-200' 
                                      : 'bg-gray-100 border-2 border-gray-300 opacity-60'
                                  }`}>
                                    <p className='text-xs text-gray-600 mb-2'>{perfil.nome_perfil}</p>
                                    <p className='text-3xl font-bold text-[#237EE6]'>{count}</p>
                                    <div className='mt-2 w-full bg-gray-200 rounded-full h-1.5'>
                                      <div
                                        className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-1.5 rounded-full'
                                        style={{ width: `${(count / usuarios.length) * 100}%` }}
                                      ></div>
                                    </div>
                                    {!podeAtribuir && (
                                      <p className='text-xs text-gray-500 mt-2'>Restrito</p>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
              
        </div>
      </div>
    </div>
  )
}


