import { useState } from 'react'
import { FiHome, FiUsers, FiTarget, FiMapPin, FiEdit2, FiDownload, FiPlus, FiEye, FiUser, FiBarChart2, FiTrendingUp, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { MdLocalHospital } from 'react-icons/md'

export default function DashboardGestorLocal() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [filtroVagas, setFiltroVagas] = useState('todas')
  const [filtroAlunos, setFiltroAlunos] = useState('todos')
  const [abaFrequencia, setAbaFrequencia] = useState('checkin')
  const [abaValidacao, setAbaValidacao] = useState('pendente')

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
    { id: 1, especialidade: 'Clínica Médica', preceptor: 'Dra. Maria Silva', ocupadas: 5, total: 5, status: 'Completa', periodo: '9º ao 11º' },
    { id: 2, especialidade: 'Cirurgia Geral', preceptor: 'Dr. Carlos Oliveira', ocupadas: 4, total: 5, status: 'Disponível', periodo: '9º ao 11º' },
    { id: 3, especialidade: 'Pediatria', preceptor: 'Dra. Ana Costa', ocupadas: 3, total: 4, status: 'Disponível', periodo: '10º ao 11º' },
    { id: 4, especialidade: 'Ginecologia', preceptor: 'Dra. Paula Santos', ocupadas: 5, total: 5, status: 'Completa', periodo: '9º ao 11º' },
    { id: 5, especialidade: 'Cardiologia', preceptor: 'Dr. João Cardoso', ocupadas: 2, total: 3, status: 'Disponível', periodo: '10º ao 11º' },
    { id: 6, especialidade: 'Neurologia', preceptor: 'Dr. Rafael Lima', ocupadas: 3, total: 3, status: 'Completa', periodo: '11º' },
    { id: 7, especialidade: 'Ortopedia', preceptor: 'Dr. Fernando Costa', ocupadas: 2, total: 4, status: 'Disponível', periodo: '10º ao 11º' },
    { id: 8, especialidade: 'Oftalmologia', preceptor: 'Dra. Beatriz Santos', ocupadas: 1, total: 2, status: 'Disponível', periodo: '11º' }
  ]

  // Mock de preceptores
  const preceptores = [
    { id: 1, nome: 'Dra. Maria Silva', crm: '123456/SP', especialidade: 'Clínica Médica', experencia: 15, alunos: 5, status: 'Ativo' },
    { id: 2, nome: 'Dr. Carlos Oliveira', crm: '123457/SP', especialidade: 'Cirurgia Geral', experencia: 12, alunos: 4, status: 'Ativo' },
    { id: 3, nome: 'Dra. Ana Costa', crm: '123458/SP', especialidade: 'Pediatria', experencia: 10, alunos: 3, status: 'Ativo' },
    { id: 4, nome: 'Dra. Paula Santos', crm: '123459/SP', especialidade: 'Ginecologia', experencia: 18, alunos: 5, status: 'Ativo' },
    { id: 5, nome: 'Dr. João Cardoso', crm: '123460/SP', especialidade: 'Cardiologia', experencia: 14, alunos: 2, status: 'Ativo' },
    { id: 6, nome: 'Dr. Rafael Lima', crm: '123461/SP', especialidade: 'Neurologia', experencia: 11, alunos: 3, status: 'Ativo' },
    { id: 7, nome: 'Dr. Fernando Costa', crm: '123462/SP', especialidade: 'Ortopedia', experencia: 9, alunos: 2, status: 'Ativo' },
    { id: 8, nome: 'Dra. Beatriz Santos', crm: '123463/SP', especialidade: 'Oftalmologia', experencia: 8, alunos: 1, status: 'Ativo' }
  ]

  // Mock de alunos do local
  const alunos = [
    { id: 1, nome: 'João Silva Santos', matricula: '202401234', periodo: 9, especialidade: 'Clínica Médica', preceptor: 'Dra. Maria Silva', desempenho: 9.0, frequencia: 95.5, status: 'Ativo' },
    { id: 2, nome: 'Maria Oliveira Costa', matricula: '202401235', periodo: 9, especialidade: 'Clínica Médica', preceptor: 'Dra. Maria Silva', desempenho: 8.2, frequencia: 88.2, status: 'Ativo' },
    { id: 3, nome: 'Carlos Ferreira Lima', matricula: '202401236', periodo: 10, especialidade: 'Cirurgia Geral', preceptor: 'Dr. Carlos Oliveira', desempenho: 8.8, frequencia: 92.1, status: 'Ativo' },
    { id: 4, nome: 'Ana Paula Silva', matricula: '202401237', periodo: 11, especialidade: 'Pediatria', preceptor: 'Dra. Ana Costa', desempenho: 7.5, frequencia: 85.0, status: 'Ativo' },
    { id: 5, nome: 'Roberto Mendes', matricula: '202401238', periodo: 9, especialidade: 'Ginecologia', preceptor: 'Dra. Paula Santos', desempenho: 8.9, frequencia: 96.8, status: 'Ativo' },
    { id: 6, nome: 'Lucas Martins', matricula: '202401239', periodo: 10, especialidade: 'Cardiologia', preceptor: 'Dr. João Cardoso', desempenho: 8.0, frequencia: 90.0, status: 'Ativo' },
    { id: 7, nome: 'Fernanda Rocha', matricula: '202401240', periodo: 11, especialidade: 'Ortopedia', preceptor: 'Dr. Fernando Costa', desempenho: 7.8, frequencia: 87.5, status: 'Ativo' },
    { id: 8, nome: 'Patricia Gomes', matricula: '202401241', periodo: 11, especialidade: 'Oftalmologia', preceptor: 'Dra. Beatriz Santos', desempenho: 8.5, frequencia: 93.0, status: 'Ativo' }
  ]

  // Mock de REGISTRO_FREQUENCIA (check-in / check-out)
  const registrosFrequencia = [
    { id: 1, id_aluno: 1, nome_aluno: 'João Silva Santos', matricula: '202401234', data: '2025-05-15', hora_checkin: '08:00', hora_checkout: null, status_validacao: 'Pendente', preceptor: 'Dra. Maria Silva', local: 'Enfermaria A' },
    { id: 2, id_aluno: 2, nome_aluno: 'Maria Oliveira Costa', matricula: '202401235', data: '2025-05-15', hora_checkin: '07:55', hora_checkout: '17:10', status_validacao: 'Validado', preceptor: 'Dra. Maria Silva', local: 'UTI' },
    { id: 3, id_aluno: 3, nome_aluno: 'Carlos Ferreira Lima', matricula: '202401236', data: '2025-05-15', hora_checkin: '08:05', hora_checkout: null, status_validacao: 'Pendente', preceptor: 'Dr. Carlos Mendes', local: 'Pronto Socorro' },
    { id: 4, id_aluno: 4, nome_aluno: 'Ana Paula Silva', matricula: '202401237', data: '2025-05-15', hora_checkin: '08:00', hora_checkout: '16:55', status_validacao: 'Pendente', preceptor: 'Dra. Ana Costa', local: 'Pediatria' },
    { id: 5, id_aluno: 5, nome_aluno: 'Roberto Mendes', matricula: '202401238', data: '2025-05-15', hora_checkin: '07:58', hora_checkout: '17:05', status_validacao: 'Validado', preceptor: 'Dra. Paula Santos', local: 'Ginecologia' },
    { id: 6, id_aluno: 1, nome_aluno: 'João Silva Santos', matricula: '202401234', data: '2025-05-14', hora_checkin: '08:02', hora_checkout: '17:00', status_validacao: 'Validado', preceptor: 'Dra. Maria Silva', local: 'Enfermaria A' },
    { id: 7, id_aluno: 2, nome_aluno: 'Maria Oliveira Costa', matricula: '202401235', data: '2025-05-14', hora_checkin: '08:00', hora_checkout: '17:05', status_validacao: 'Validado', preceptor: 'Dra. Maria Silva', local: 'UTI' }
  ]

  // Filtrar vagas
  const vagasFiltradas = vagas.filter(v => {
    if (filtroVagas === 'livres') return v.status === 'Disponível'
    if (filtroVagas === 'completas') return v.status === 'Completa'
    return true
  })

  // Filtrar alunos
  const alunosFiltrados = alunos.filter(a => {
    if (filtroAlunos === 'ativos') return a.status === 'Ativo'
    if (filtroAlunos === 'inativos') return a.status === 'Inativo'
    return true
  })

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white'>
      {/* Header */}
      <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2'><MdLocalHospital size={36} /> Gestor do Local de Estágio</h1>
              <p className='text-blue-100 text-sm lg:text-base'>{local.nome} • {local.cidade}</p>
            </div>
            <div className='flex gap-3'>
              <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2'>
                <FiEdit2 size={18} /> Editar Local
              </button>
              <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2'>
                <FiDownload size={18} /> Relatórios
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className='border-b border-gray-200 bg-white sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-6 lg:px-12'>
          <div className='flex gap-8 overflow-x-auto'>
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
              onClick={() => setAbaSelecionada('preceptores')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'preceptores'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiUser size={18} /> Preceptores
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
              onClick={() => setAbaSelecionada('frequencia')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'frequencia'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiCheckCircle size={18} /> Frequência
            </button>
            <button
              onClick={() => setAbaSelecionada('validacao')}
              className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 ${
                abaSelecionada === 'validacao'
                  ? 'border-[#237EE6] text-[#237EE6]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiBarChart2 size={18} /> Validação
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
                  <div className='bg-gradient-to-r from-[#10E686] to-[#60E6D7] h-2 rounded-full' style={{ width: `${(local.vagas_ocupadas / local.vagas_total) * 100}%` }}></div>
                </div>
                <p className='text-sm text-gray-600 mt-2'>{((local.vagas_ocupadas / local.vagas_total) * 100).toFixed(0)}% ocupadas</p>
              </div>

              {/* Card Preceptores */}
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Preceptores</h3>
                  <FiUser size={32} className='text-[#60E6D7]' />
                </div>
                <p className='text-4xl font-bold text-[#60E6D7] mb-2'>{local.preceptores_total}</p>
                <p className='text-sm text-gray-600'>Ativos no local</p>
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
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.slice(0, 5).map((aluno) => (
                      <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{aluno.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.matricula}</td>
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
                <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
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
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.periodo}º</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.especialidade}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{aluno.preceptor}</td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-16 bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
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
                                className='bg-gradient-to-r from-[#60C9E6] to-[#10E686] h-2 rounded-full'
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
              <h2 className='text-3xl font-bold text-gray-900'>🎯 Gestão de Vagas</h2>
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
                <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300'>
                  ➕ Nova Vaga
                </button>
              </div>
            </div>

            {/* Grid de Vagas */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {vagasFiltradas.map((vaga) => (
                <div key={vaga.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300'>
                  <div className={`h-2 bg-gradient-to-r ${
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
                      <p className='text-sm text-gray-600 mb-2'>📚 Períodos: {vaga.periodo}</p>
                      <div className='flex items-center justify-between mb-2'>
                        <p className='text-sm text-gray-700 font-semibold'>Ocupação</p>
                        <p className='text-sm text-gray-600'>{vaga.ocupadas} de {vaga.total}</p>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                          style={{ width: `${(vaga.ocupadas / vaga.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className='flex gap-3'>
                      <button className='flex-1 bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm'>
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

        {/* HABILIDADES */}
        {abaSelecionada === 'habilidades' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>👨‍⚕️ Gerenciamento de Preceptores</h2>

            {/* Cards de Resumo */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-white rounded-2xl shadow-md p-6'>
                <p className='text-sm text-gray-600'>Total de Preceptores</p>
                <p className='text-4xl font-bold text-[#237EE6] mt-2'>{preceptores.length}</p>
              </div>
              <div className='bg-white rounded-2xl shadow-md p-6'>
                <p className='text-sm text-gray-600'>Média de Alunos/Preceptor</p>
                <p className='text-4xl font-bold text-[#10E686] mt-2'>{(alunos.length / preceptores.length).toFixed(1)}</p>
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
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Anos Exp.</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alunos</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preceptores.map((preceptor) => (
                      <tr key={preceptor.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{preceptor.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.crm}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.especialidade}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{preceptor.experencia}</td>
                        <td className='px-6 py-4 text-sm text-gray-700 font-semibold'>{preceptor.alunos}</td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>
                            {preceptor.status}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold text-sm transition-colors duration-300'>
                            Editar
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
              {preceptores.map((preceptor) => (
                <div key={preceptor.id} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-bold text-gray-900'>{preceptor.nome}</h3>
                    <span className='text-2xl'>👨‍⚕️</span>
                  </div>

                  <div className='space-y-3 mb-6'>
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
                    <button className='flex-1 bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm'>
                      Editar
                    </button>
                    <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all duration-300 text-sm'>
                      Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FREQUÊNCIA - CHECK-IN */}
        {abaSelecionada === 'frequencia' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiCheckCircle size={32} /> Registro de Frequência (Check-in / Check-out)</h2>
            
            {/* Cards de Resumo */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Registros Hoje</h3>
                  <FiCheckCircle size={32} className='text-[#237EE6]' />
                </div>
                <p className='text-4xl font-bold text-[#237EE6] mb-2'>{registrosFrequencia.filter(r => r.data === '2025-05-15').length}</p>
                <p className='text-sm text-gray-600'>Registros ativos</p>
              </div>

              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Check-ins Pendentes</h3>
                  <FiAlertCircle size={32} className='text-orange-500' />
                </div>
                <p className='text-4xl font-bold text-orange-500 mb-2'>{registrosFrequencia.filter(r => r.hora_checkout === null).length}</p>
                <p className='text-sm text-gray-600'>Sem check-out</p>
              </div>

              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Check-outs Realizados</h3>
                  <FiCheckCircle size={32} className='text-[#10E686]' />
                </div>
                <p className='text-4xl font-bold text-[#10E686] mb-2'>{registrosFrequencia.filter(r => r.hora_checkout !== null).length}</p>
                <p className='text-sm text-gray-600'>Completos hoje</p>
              </div>

              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Validações Pendentes</h3>
                  <FiBarChart2 size={32} className='text-[#60C9E6]' />
                </div>
                <p className='text-4xl font-bold text-[#60C9E6] mb-2'>{registrosFrequencia.filter(r => r.status_validacao === 'Pendente').length}</p>
                <p className='text-sm text-gray-600'>Aguardando validação</p>
              </div>
            </div>

            {/* Tabela de Registros de Hoje */}
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='p-6 border-b border-gray-200'>
                <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={28} /> Registros de Hoje</h3>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Data</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Check-in</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Check-out</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrosFrequencia.filter(r => r.data === '2025-05-15').map((reg) => (
                      <tr key={reg.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{reg.nome_aluno}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.matricula}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.data}</td>
                        <td className='px-6 py-4 text-sm font-semibold text-[#10E686]'>{reg.hora_checkin}</td>
                        <td className='px-6 py-4 text-sm font-semibold'>
                          {reg.hora_checkout ? (
                            <span className='text-[#10E686]'>{reg.hora_checkout}</span>
                          ) : (
                            <span className='text-orange-500'>Pendente</span>
                          )}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.local}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.preceptor}</td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            reg.hora_checkout !== null
                              ? 'bg-[#10E686]/20 text-[#10E686]'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {reg.hora_checkout ? 'Completo' : 'Em andamento'}
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
        )}

        {/* VALIDAÇÃO DE FREQUÊNCIA */}
        {abaSelecionada === 'validacao' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiBarChart2 size={32} /> Validação de Frequência</h2>
            
            {/* Cards de Resumo */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Pendentes de Validação</h3>
                  <FiAlertCircle size={32} className='text-orange-500' />
                </div>
                <p className='text-4xl font-bold text-orange-500 mb-2'>{registrosFrequencia.filter(r => r.status_validacao === 'Pendente').length}</p>
                <p className='text-sm text-gray-600'>Aguardando aprovação</p>
              </div>

              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Validados</h3>
                  <FiCheckCircle size={32} className='text-[#10E686]' />
                </div>
                <p className='text-4xl font-bold text-[#10E686] mb-2'>{registrosFrequencia.filter(r => r.status_validacao === 'Validado').length}</p>
                <p className='text-sm text-gray-600'>Aprovados</p>
              </div>

              <div className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Total de Registros</h3>
                  <FiBarChart2 size={32} className='text-[#237EE6]' />
                </div>
                <p className='text-4xl font-bold text-[#237EE6] mb-2'>{registrosFrequencia.length}</p>
                <p className='text-sm text-gray-600'>Registros totais</p>
              </div>
            </div>

            {/* Tabela de Registros Pendentes de Validação */}
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='p-6 border-b border-gray-200 flex items-center justify-between'>
                <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'><FiAlertCircle size={28} /> Registros Pendentes de Validação</h3>
                <button className='bg-[#237EE6] hover:bg-[#154c8b] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2'>
                  <FiCheckCircle size={18} /> Validar Selecionados
                </button>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>
                        <input type='checkbox' className='w-4 h-4 cursor-pointer' />
                      </th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Data</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Check-in</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Check-out</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrosFrequencia.filter(r => r.status_validacao === 'Pendente' && r.hora_checkout !== null).map((reg) => (
                      <tr key={reg.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4'>
                          <input type='checkbox' className='w-4 h-4 cursor-pointer' />
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{reg.nome_aluno}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.matricula}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.data}</td>
                        <td className='px-6 py-4 text-sm font-semibold text-[#237EE6]'>{reg.hora_checkin}</td>
                        <td className='px-6 py-4 text-sm font-semibold text-[#10E686]'>{reg.hora_checkout}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.local}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.preceptor}</td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-orange-100 text-orange-700'>
                            {reg.status_validacao}
                          </span>
                        </td>
                        <td className='px-6 py-4 flex gap-2'>
                          <button className='text-[#10E686] hover:text-[#0a9160] font-semibold text-sm transition-colors duration-300 flex items-center gap-1'>
                            <FiCheckCircle size={16} /> Validar
                          </button>
                          <button className='text-red-600 hover:text-red-800 font-semibold text-sm transition-colors duration-300'>
                            Rejeitar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabela de Registros Validados */}
            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='p-6 border-b border-gray-200'>
                <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'><FiCheckCircle size={28} /> Registros Validados</h3>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-gray-50'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Data</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Check-in</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Check-out</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrosFrequencia.filter(r => r.status_validacao === 'Validado').map((reg) => (
                      <tr key={reg.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors duration-300'>
                        <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{reg.nome_aluno}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.matricula}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.data}</td>
                        <td className='px-6 py-4 text-sm font-semibold text-[#237EE6]'>{reg.hora_checkin}</td>
                        <td className='px-6 py-4 text-sm font-semibold text-[#10E686]'>{reg.hora_checkout}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.local}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{reg.preceptor}</td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>
                            {reg.status_validacao}
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
        )}
  )
}
