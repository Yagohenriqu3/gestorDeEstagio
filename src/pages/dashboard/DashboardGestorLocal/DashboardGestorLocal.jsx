import { useState } from 'react'
import { FiHome, FiUsers, FiTarget, FiMapPin, FiClipboard, FiEdit2, FiDownload, FiPlus, FiEye, FiUser, FiBarChart2, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiMenu, FiX, FiCalendar } from 'react-icons/fi'
import { MdLocalHospital } from 'react-icons/md'
import Sidebar from '../../../components/layout/Sidebar/Sidebar'
import { menuGestorLocal } from '../../../config/dashboardMenus'
import VisaoGeralGestorLocal from './components/VisaoGeralGestorLocal'
import AlunosGestorLocal from './components/AlunosGestorLocal'
import VagasGestorLocal from './components/VagasGestorLocal'
import PreceptoresGestorLocal from './components/PreceptoresGestorLocal'
import DisponibilidadeGestorLocal from './components/DisponibilidadeGestorLocal'
import FrequenciaLocaisGestorLocal from './components/FrequenciaLocaisGestorLocal'

export default function DashboardGestorLocal() {
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

  // Estado inicial depende de local: declare depois do mock para evitar ReferenceError
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [filtroVagas, setFiltroVagas] = useState('todas')
  const [filtroAlunos, setFiltroAlunos] = useState('todos')
  const [instituicaoSelecionada, setInstituicaoSelecionada] = useState(null)
  const [modalInstituicao, setModalInstituicao] = useState(true)
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)
  const [modalEditarLocal, setModalEditarLocal] = useState(false)
  const [modalAssociarPreceptor, setModalAssociarPreceptor] = useState(false)
  const [preceptorSelecionado, setPreceptorSelecionado] = useState(null)
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null)
  const [localEditando, setLocalEditando] = useState({ ...local })

  // Mock de instituições atendidas pelo local
  const instituicoesAtendidas = [
    { id: 1, nome: 'UNIFESP', sigla: 'UNIFESP', alunos: 18, logo: '🏛️' },
    { id: 2, nome: 'USP - Faculdade de Medicina', sigla: 'USP-FM', alunos: 10, logo: '🎓' }
  ]

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

  // Mock de frequência por local
  const frequenciaLocal = [
    { local: 'Enfermaria Ala A', frequencia_media: 94.3, alunos: 5, preceptor: 'Dra. Maria Silva' },
    { local: 'Centro Cirúrgico', frequencia_media: 91.2, alunos: 4, preceptor: 'Dr. Carlos Oliveira' },
    { local: 'Ambulatório Pediátrico', frequencia_media: 88.8, alunos: 3, preceptor: 'Dra. Ana Costa' },
    { local: 'Ambulatório Ginecológico', frequencia_media: 96.5, alunos: 5, preceptor: 'Dra. Paula Santos' },
    { local: 'UTI Cardiológica', frequencia_media: 90.1, alunos: 2, preceptor: 'Dr. João Cardoso' },
    { local: 'Ambulatório Neurológico', frequencia_media: 93.0, alunos: 3, preceptor: 'Dr. Rafael Lima' },
    { local: 'Pronto-Socorro Ortopédico', frequencia_media: 85.5, alunos: 2, preceptor: 'Dr. Fernando Costa' },
    { local: 'Ambulatório de Oftalmologia', frequencia_media: 91.0, alunos: 1, preceptor: 'Dra. Beatriz Santos' }
  ]

  // Mock de Componentes Curriculares (Especialidades)
  const componentesCurriculares = [
    { id: 1, nome: 'Clínica Médica I', codigo: 'CM001', periodo: '9º' },
    { id: 2, nome: 'Cirurgia Geral', codigo: 'CG001', periodo: '9º' },
    { id: 3, nome: 'Pediatria', codigo: 'PED001', periodo: '10º' },
    { id: 4, nome: 'Ginecologia', codigo: 'GIN001', periodo: '9º' },
    { id: 5, nome: 'Cardiologia', codigo: 'CAR001', periodo: '10º' },
    { id: 6, nome: 'Neurologia', codigo: 'NEU001', periodo: '11º' },
    { id: 7, nome: 'Ortopedia', codigo: 'ORT001', periodo: '11º' },
    { id: 8, nome: 'Oftalmologia', codigo: 'OFT001', periodo: '11º' }
  ]

  // Preceptores ativos (para modal de associação)
  const preceptoresAtivos = preceptores.filter(p => p.status === 'Ativo' && (!instituicaoSelecionada || p.instituicao === instituicaoSelecionada))

  return (
    <div className='flex w-full min-h-screen bg-linear-to-br from-[#F5F7FA] to-white overflow-x-hidden'>
      {/* Sidebar Desktop */}
      <Sidebar 
        abaSelecionada={abaSelecionada} 
        setAbaSelecionada={setAbaSelecionada}
        menuItems={menuGestorLocal}
        titulo="Gestor do Local"
        subtitulo="v1.0.0"
        onExpandChange={setSidebarExpanded}
      />
      
      {/* Conteúdo Principal */}
      <div className={`flex-1 transition-all duration-300 ${sidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'}`}>
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
              <button 
                onClick={() => setModalEditarLocal(true)}
                className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300'>
                ✏️ Editar Local
              </button>
              <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300'>
                📋 Relatórios
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className='max-w-7xl mx-auto px-6 lg:px-12 py-10'>
        {/* VISÃO GERAL */}
        {abaSelecionada === 'overview' && (
          <VisaoGeralGestorLocal
            local={local}
            instituicaoSelecionada={instituicaoSelecionada}
            preceptoresFiltrados={preceptoresFiltrados}
            alunosFiltrados={alunosFiltrados}
          />
        )}

        {/* ALUNOS */}
        {abaSelecionada === 'alunos' && (
          <AlunosGestorLocal
            alunosFiltrados={alunosFiltrados}
            filtroAlunos={filtroAlunos}
            setFiltroAlunos={setFiltroAlunos}
            alunos={alunos}
          />
        )}

        {/* VAGAS */}
        {abaSelecionada === 'vagas' && (
          <VagasGestorLocal
            vagasFiltradas={vagasFiltradas}
            filtroVagas={filtroVagas}
            setFiltroVagas={setFiltroVagas}
            vagas={vagas}
          />
        )}

        {/* PRECEPTORES */}
        {abaSelecionada === 'preceptores' && (
          <PreceptoresGestorLocal
            preceptoresFiltrados={preceptoresFiltrados}
            alunosFiltrados={alunosFiltrados}
          />
        )}

        {/* DISPONIBILIDADE DE PRECEPTORES */}
        {abaSelecionada === 'disponibilidade' && (
          <DisponibilidadeGestorLocal
            disponibilidadesFiltradas={disponibilidadesFiltradas}
          />
        )}

        {/* LOCAIS E FREQUÊNCIA */}
        {abaSelecionada === 'locaisFrequencia' && (
          <FrequenciaLocaisGestorLocal
            frequenciaLocal={frequenciaLocal}
            setLocalEditando={setLocalEditando}
            setModalEditarLocal={setModalEditarLocal}
            setModalAssociarPreceptor={setModalAssociarPreceptor}
          />
        )}
      </div>

      {/* MODAL: EDITAR LOCAL */}
      {modalEditarLocal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold text-gray-900'>✏️ Editar Local</h2>
              <button
                onClick={() => {
                  setModalEditarLocal(false)
                  setLocalEditando({ ...local })
                }}
                className='text-gray-500 hover:text-gray-700 transition-all'
              >
                <FiX size={24} />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Nome do Local</label>
                <input
                  type='text'
                  value={localEditando.nome || ''}
                  onChange={(e) => setLocalEditando({ ...localEditando, nome: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                  placeholder='Ex: Enfermaria Ala A'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Endereço</label>
                <input
                  type='text'
                  value={localEditando.endereco || ''}
                  onChange={(e) => setLocalEditando({ ...localEditando, endereco: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                  placeholder='Rua, número, complemento'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Telefone</label>
                <input
                  type='tel'
                  value={localEditando.telefone || ''}
                  onChange={(e) => setLocalEditando({ ...localEditando, telefone: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                  placeholder='(XX) XXXXX-XXXX'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Responsável</label>
                <input
                  type='text'
                  value={localEditando.responsavel || ''}
                  onChange={(e) => setLocalEditando({ ...localEditando, responsavel: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                  placeholder='Nome do responsável'
                />
              </div>
            </div>

            <div className='flex gap-3 pt-4 border-t border-gray-200'>
              <button
                onClick={() => {
                  setModalEditarLocal(false)
                  setLocalEditando({ ...local })
                }}
                className='flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-all'
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setModalEditarLocal(false)
                  alert('Local atualizado com sucesso!')
                }}
                className='flex-1 px-4 py-2 bg-[#237EE6] text-white font-semibold rounded-lg hover:shadow-lg transition-all'
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ASSOCIAR PRECEPTOR À ESPECIALIDADE */}
      {modalAssociarPreceptor && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold text-gray-900'>👥 Associar Preceptor</h2>
              <button
                onClick={() => setModalAssociarPreceptor(false)}
                className='text-gray-500 hover:text-gray-700 transition-all'
              >
                <FiX size={24} />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Selecione o Preceptor</label>
                <select
                  value={preceptorSelecionado?.id || ''}
                  onChange={(e) => {
                    const preceptor = preceptoresAtivos.find((p) => p.id === e.target.value)
                    setPreceptorSelecionado(preceptor)
                  }}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                >
                  <option value=''>-- Selecionar Preceptor --</option>
                  {preceptoresAtivos.map((preceptor) => (
                    <option key={preceptor.id} value={preceptor.id}>
                      {preceptor.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Selecione a Especialidade</label>
                <select
                  value={especialidadeSelecionada?.id || ''}
                  onChange={(e) => {
                    const especialidade = componentesCurriculares.find((c) => c.id === e.target.value)
                    setEspecialidadeSelecionada(especialidade)
                  }}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                >
                  <option value=''>-- Selecionar Especialidade --</option>
                  {componentesCurriculares.map((comp) => (
                    <option key={comp.id} value={comp.id}>
                      {comp.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Capacidade de Alunos</label>
                <input
                  type='number'
                  min='1'
                  max='50'
                  defaultValue='5'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                  placeholder='Quantidade de alunos'
                />
              </div>
            </div>

            <div className='flex gap-3 pt-4 border-t border-gray-200'>
              <button
                onClick={() => setModalAssociarPreceptor(false)}
                className='flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-all'
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setModalAssociarPreceptor(false)
                  alert('Preceptor associado com sucesso!')
                }}
                className='flex-1 px-4 py-2 bg-[#10E686] text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-all'
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

