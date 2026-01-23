import { useState } from 'react'
import { FiUsers,  FiClipboard, FiFilter, FiMapPin, FiX, FiMenu} from 'react-icons/fi'
import Sidebar from '../../../components/layout/Sidebar/Sidebar'
import { menuPreceptor } from '../../../config/dashboardMenus'
import VisaoGeralPreceptor from './components/VisaoGeralPreceptor'
import AlunosPreceptor from './components/AlunosPreceptor'
import ValidarFrequenciaPreceptor from './components/ValidarFrequenciaPreceptor'
import VagasPreceptor from './components/VagasPreceptor'
import AvaliacoesPreceptor from './components/AvaliacoesPreceptor'

export default function DashboardPreceptor() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
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
    <div className='flex w-full min-h-screen bg-linear-to-br from-[#F5F7FA] to-white overflow-x-hidden'>
      {/* Sidebar Desktop */}
      <Sidebar 
        abaSelecionada={abaSelecionada} 
        setAbaSelecionada={setAbaSelecionada}
        menuItems={menuPreceptor}
        titulo="Painel do Preceptor"
        subtitulo="v1.0.0"
        onExpandChange={setSidebarExpanded}
      />
      
      {/* Conteúdo Principal */}
      <div className={`flex-1 transition-all duration-300 ml-0 ${sidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header */}
        <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
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
              {menuPreceptor.map((secao) => (
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
      <div className='max-w-7xl mx-auto px-6 lg:px-12 py-10'>
        {/* VISÃO GERAL */}
        {abaSelecionada === 'overview' && (
          <VisaoGeralPreceptor
            preceptor={preceptor}
            vinculos={vinculos}
            alunos={alunos}
            totalInstituicoes={totalInstituicoes}
            instituicoesStats={instituicoesStats}
          />
        )}

        {/* MEUS ALUNOS */}
        {abaSelecionada === 'alunos' && (
          <AlunosPreceptor alunos={alunos} />
        )}

        {/* VALIDAR FREQUÊNCIA */}
        {abaSelecionada === 'frequencia' && (
          <ValidarFrequenciaPreceptor
            frequenciasPendentes={frequenciasPendentes}
            filtroFrequencia={filtroFrequencia}
            setFiltroFrequencia={setFiltroFrequencia}
            filtroData={filtroData}
            setFiltroData={setFiltroData}
            filtroLocal={filtroLocal}
            setFiltroLocal={setFiltroLocal}
            locaisUnicos={locaisUnicos}
          />
        )}

        {/* VAGAS DO LOCAL */}
        {abaSelecionada === 'vagas' && (
          <VagasPreceptor
            vagas={vagas}
            setVagaSelecionada={setVagaSelecionada}
            setModalAssociarEspecialidade={setModalAssociarEspecialidade}
          />
        )}

        {/* AVALIAÇÕES */}
        {abaSelecionada === 'avaliacoes' && (
          <AvaliacoesPreceptor avaliacoesPendentes={avaliacoesPendentes} />
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
                className='flex-1 px-4 py-2 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Associar
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
