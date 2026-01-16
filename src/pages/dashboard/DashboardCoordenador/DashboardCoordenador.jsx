import { useState } from 'react'
import { FiHome, FiUsers, FiTarget, FiMapPin, FiClipboard, FiSettings, FiDownload, FiPlus, FiEdit2, FiEye, FiBarChart2, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiFilter } from 'react-icons/fi'
import { MdLocalHospital } from 'react-icons/md'

export default function DashboardCoordenador() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [filtroAlunos, setFiltroAlunos] = useState('todos')
  const [filtroLocais, setFiltroLocais] = useState('todos')

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
    <div className='w-full min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white'>
      {/* Header */}
      <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
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
                  <div className='bg-gradient-to-r from-[#10E686] to-[#60E6D7] h-2 rounded-full' style={{ width: `${(instituicao.vagas_ocupadas / instituicao.vagas_total) * 100}%` }}></div>
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
                <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
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
                                className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
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
              <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                <FiPlus size={18} /> Nova Vaga
              </button>
            </div>

            {/* Grid de Vagas */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {vagas.map((vaga) => (
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
                          className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                          style={{ width: `${(vaga.ocupadas / vaga.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className='flex gap-3'>
                      <button className='flex-1 bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-1'>
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
      </div>
    </div>
  )
}
