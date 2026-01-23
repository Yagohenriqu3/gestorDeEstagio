import { 
  FiHome, 
  FiBriefcase, 
  FiUsers, 
  FiCalendar, 
  FiFileText, 
  FiGrid, 
  FiTarget, 
  FiMapPin, 
  FiCheckSquare, 
  FiBarChart2, 
  FiAlertCircle, 
  FiShield,
  FiCheckCircle,
  FiUser,
  FiClock,
  FiAward,
  FiSettings,
  FiBook,
  FiTrendingUp,
  FiClipboard,
  FiList
} from 'react-icons/fi'
import { MdSchool, MdVaccines, MdLocalHospital } from 'react-icons/md'

// Menu para Dashboard Administrativo
export const menuAdministrador = [
  {
    categoria: 'Visão Geral',
    items: [
      { id: 'overview', nome: 'Visão Geral', icone: FiHome }
    ]
  },
  {
    categoria: 'Gestão Acadêmica',
    items: [
      { id: 'instituicoes', nome: 'Instituições', icone: FiBriefcase },
      { id: 'curriculos', nome: 'Currículos', icone: FiFileText },
      { id: 'componentes', nome: 'Componentes', icone: FiGrid }
    ]
  },
  {
    categoria: 'Pessoas',
    items: [
      { id: 'alunos', nome: 'Alunos', icone: MdSchool },
      { id: 'preceptores', nome: 'Preceptores', icone: FiUsers },
      { id: 'usuarios', nome: 'Usuários', icone: FiShield }
    ]
  },
  {
    categoria: 'Estágios',
    items: [
      { id: 'ofertas', nome: 'Ofertas', icone: FiCalendar },
      { id: 'locais', nome: 'Locais', icone: FiMapPin },
      { id: 'vagas', nome: 'Vagas', icone: FiTarget }
    ]
  },
  {
    categoria: 'Acompanhamento',
    items: [
      { id: 'frequencia', nome: 'Frequência', icone: FiCheckSquare },
      { id: 'avaliacoes', nome: 'Avaliações', icone: FiBarChart2 },
      { id: 'ausencias', nome: 'Ausências', icone: FiAlertCircle },
      { id: 'vacinas', nome: 'Vacinas', icone: MdVaccines }
    ]
  }
]

// Menu para Dashboard do Aluno
export const menuAluno = [
  {
    categoria: 'Principal',
    items: [
      { id: 'overview', nome: 'Visão Geral', icone: FiHome },
      { id: 'horarios', nome: 'Meus Horários', icone: FiClock },
      { id: 'locais', nome: 'Locais', icone: FiMapPin }
    ]
  },
  {
    categoria: 'Acompanhamento',
    items: [
      { id: 'frequencia', nome: 'Frequência', icone: FiCheckCircle },
      { id: 'documentos', nome: 'Documentos', icone: FiFileText },
      { id: 'dados', nome: 'Dados Cadastrais', icone: FiUser }
    ]
  }
]

// Menu para Dashboard do Coordenador
export const menuCoordenador = [
  {
    categoria: 'Visão Geral',
    items: [
      { id: 'overview', nome: 'Visão Geral', icone: FiHome }
    ]
  },
  {
    categoria: 'Gestão de Estágios',
    items: [
      { id: 'semestre', nome: 'Ofertas', icone: FiCalendar },
      { id: 'turmas', nome: 'Turmas', icone: MdSchool },
      { id: 'matriculas', nome: 'Matrículas', icone: FiClipboard },
      { id: 'componentes', nome: 'Componentes', icone: FiBook },
      { id: 'vagas', nome: 'Vagas', icone: FiTarget },
      { id: 'locais', nome: 'Locais', icone: FiMapPin },
      { id: 'curriculos', nome: 'Currículos', icone: FiFileText }
    ]
  },
  {
    categoria: 'Pessoas',
    items: [
      { id: 'alunos', nome: 'Alunos', icone: FiUsers },
      { id: 'preceptores', nome: 'Preceptores', icone: FiUsers },
      { id: 'usuarios', nome: 'Usuários', icone: FiShield }
    ]
  },
  {
    categoria: 'Acompanhamento',
    items: [
      { 
        id: 'frequencia', 
        nome: 'Frequência', 
        icone: FiCheckSquare,
        submenu: [
          { id: 'frequenciaDetalhada', nome: 'Frequência Detalhada', icone: FiList }
        ]
      },
      { id: 'avaliacoes', nome: 'Avaliações', icone: FiBarChart2 }
    ]
  }
]

// Menu para Dashboard do Docente
export const menuDocente = [
  {
    categoria: 'Principal',
    items: [
      { id: 'overview', nome: 'Visão Geral', icone: FiHome }
    ]
  },
  {
    categoria: 'Gestão',
    items: [
      { id: 'vagas', nome: 'Vagas', icone: FiTarget },
      { id: 'preceptores', nome: 'Preceptores', icone: FiUsers },
      { id: 'alunos', nome: 'Alunos', icone: MdSchool }
    ]
  },
  {
    categoria: 'Acompanhamento',
    items: [
      { id: 'frequencia', nome: 'Frequência', icone: FiCheckSquare },
      { id: 'validacao', nome: 'Validação', icone: FiCheckCircle }
    ]
  }
]

// Menu para Dashboard do Gestor Local
export const menuGestorLocal = [
  {
    categoria: 'Principal',
    items: [
      { id: 'overview', nome: 'Visão Geral', icone: FiHome }
    ]
  },
  {
    categoria: 'Gestão',
    items: [
      { id: 'vagas', nome: 'Vagas', icone: FiTarget },
      { id: 'preceptores', nome: 'Preceptores', icone: FiUsers },
      { id: 'alunos', nome: 'Alunos', icone: MdSchool },
      { id: 'disponibilidade', nome: 'Disponibilidade', icone: FiCalendar }
    ]
  },
  {
    categoria: 'Acompanhamento',
    items: [
      { id: 'locaisFrequencia', nome: 'Locais e Frequência', icone: FiMapPin }
    ]
  }
]

// Menu para Dashboard do Preceptor
export const menuPreceptor = [
  {
    categoria: 'Principal',
    items: [
      { id: 'overview', nome: 'Visão Geral', icone: FiHome },
      { id: 'alunos', nome: 'Meus Alunos', icone: FiUsers },
      { id: 'vagas', nome: 'Vagas do Local', icone: FiTarget }
    ]
  },
  {
    categoria: 'Acompanhamento',
    items: [
      { id: 'frequencia', nome: 'Validar Frequência', icone: FiCheckCircle },
      { id: 'avaliacoes', nome: 'Avaliações', icone: FiTrendingUp }
    ]
  }
]
