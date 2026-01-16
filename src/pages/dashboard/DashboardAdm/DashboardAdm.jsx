import { useState } from 'react'
import { FiHome, FiUsers, FiMapPin, FiClipboard, FiBarChart2, FiSettings, FiPlus, FiEdit2, FiEye, FiTrash2, FiDownload, FiTrendingUp, FiCheckCircle, FiAlertCircle, FiFilter } from 'react-icons/fi'

export default function DashboardAdm() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [filtroUsuario, setFiltroUsuario] = useState('todos')
  const [filtroLocal, setFiltroLocal] = useState('todos')

  // Dados mock do administrador
  const admin = {
    nome: 'Administrador Master',
    email: 'admin@sistema.com',
    total_instituicoes: 8,
    total_usuarios: 125,
    total_locais: 24,
    total_preceptores: 45,
    total_vagas: 89,
    total_alunos_ativos: 234
  }

  // Mock de instituições
  const instituicoes = [
    { id: 1, nome: 'UNIFESP', sigla: 'UNIFESP', cidade: 'São Paulo', estado: 'SP', status: 'Ativa', unidades: 3, usuarios: 28 },
    { id: 2, nome: 'USP', sigla: 'USP', cidade: 'São Paulo', estado: 'SP', status: 'Ativa', unidades: 5, usuarios: 42 },
    { id: 3, nome: 'FMUSP', sigla: 'FMUSP', cidade: 'São Paulo', estado: 'SP', status: 'Ativa', unidades: 2, usuarios: 15 },
    { id: 4, nome: 'Universidade Federal de Goiás', sigla: 'UFG', cidade: 'Goiânia', estado: 'GO', status: 'Ativa', unidades: 2, usuarios: 18 },
    { id: 5, nome: 'UFMG', sigla: 'UFMG', cidade: 'Belo Horizonte', estado: 'MG', status: 'Ativa', unidades: 3, usuarios: 22 }
  ]

  // Mock de usuários
  const usuarios = [
    { id: 1, nome: 'Dr. Carlos Silva', email: 'carlos@unifesp.br', perfil: 'Coordenador', instituicao: 'UNIFESP', status: 'Ativo', ultimo_acesso: '2025-02-16' },
    { id: 2, nome: 'João Santos', email: 'joao@unifesp.br', perfil: 'Gestor Local', instituicao: 'UNIFESP', status: 'Ativo', ultimo_acesso: '2025-02-16' },
    { id: 3, nome: 'Dra. Maria Silva', email: 'maria@unifesp.br', perfil: 'Preceptor', instituicao: 'UNIFESP', status: 'Ativo', ultimo_acesso: '2025-02-15' },
    { id: 4, nome: 'Ana Paula Costa', email: 'ana@unifesp.br', perfil: 'Aluno', instituicao: 'UNIFESP', status: 'Ativo', ultimo_acesso: '2025-02-16' },
    { id: 5, nome: 'Prof. Roberto Lima', email: 'roberto@usp.br', perfil: 'Coordenador', instituicao: 'USP', status: 'Ativo', ultimo_acesso: '2025-02-14' },
    { id: 6, nome: 'Dra. Fernanda Oliveira', email: 'fernanda@usp.br', perfil: 'Preceptor', instituicao: 'USP', status: 'Inativo', ultimo_acesso: '2025-01-20' }
  ]

  // Mock de locais de estágio
  const locais = [
    { id: 1, nome: 'Hospital Universitário São Paulo', cidade: 'São Paulo', estado: 'SP', instituicao: 'UNIFESP', especialidades: 5, preceptores: 8, alunos: 24, status: 'Ativo' },
    { id: 2, nome: 'Hospital das Clínicas', cidade: 'São Paulo', estado: 'SP', instituicao: 'USP', especialidades: 8, preceptores: 12, alunos: 35, status: 'Ativo' },
    { id: 3, nome: 'Hospital Federal de Brasília', cidade: 'Brasília', estado: 'DF', instituicao: 'UNIFESP', especialidades: 3, preceptores: 5, alunos: 15, status: 'Ativo' },
    { id: 4, nome: 'Centro Médico de Goiânia', cidade: 'Goiânia', estado: 'GO', instituicao: 'UFG', especialidades: 4, preceptores: 6, alunos: 18, status: 'Ativo' },
    { id: 5, nome: 'Hospital Santa Casa', cidade: 'Belo Horizonte', estado: 'MG', instituicao: 'UFMG', especialidades: 6, preceptores: 10, alunos: 28, status: 'Ativo' }
  ]

  // Mock de preceptores
  const preceptores = [
    { id: 1, nome: 'Dra. Maria Silva', crm: 'CRM-SP 123456', especialidade: 'Clínica Médica', local: 'Hospital Universitário', alunos: 5, status: 'Ativo' },
    { id: 2, nome: 'Dr. Fernando Costa', crm: 'CRM-SP 123457', especialidade: 'Cirurgia', local: 'Hospital das Clínicas', alunos: 7, status: 'Ativo' },
    { id: 3, nome: 'Dra. Ana Santos', crm: 'CRM-DF 234567', especialidade: 'Pediatria', local: 'Hospital Federal', alunos: 4, status: 'Ativo' },
    { id: 4, nome: 'Dr. Paulo Oliveira', crm: 'CRM-GO 345678', especialidade: 'Ginecologia', local: 'Centro Médico', alunos: 3, status: 'Ativo' },
    { id: 5, nome: 'Dra. Carla Mendes', crm: 'CRM-MG 456789', especialidade: 'Cardiologia', local: 'Santa Casa', alunos: 6, status: 'Inativo' }
  ]

  // Mock de vagas
  const vagas = [
    { id: 1, instituicao: 'UNIFESP', local: 'Hospital Universitário', especialidade: 'Clínica Médica', periodo: 9, quantidade: 5, preenchidas: 3, status: 'Aberta' },
    { id: 2, instituicao: 'UNIFESP', local: 'Hospital Universitário', especialidade: 'Cirurgia', periodo: 9, quantidade: 3, preenchidas: 2, status: 'Aberta' },
    { id: 3, instituicao: 'USP', local: 'Hospital das Clínicas', especialidade: 'Clínica Médica', periodo: 10, quantidade: 8, preenchidas: 5, status: 'Aberta' },
    { id: 4, instituicao: 'USP', local: 'Hospital das Clínicas', especialidade: 'Pediatria', periodo: 10, quantidade: 4, preenchidas: 4, status: 'Completa' },
    { id: 5, instituicao: 'UFG', local: 'Centro Médico', especialidade: 'Ginecologia', periodo: 8, quantidade: 6, preenchidas: 4, status: 'Aberta' }
  ]

  // Mock de frequência por local
  const frequenciaLocal = [
    { id: 1, local: 'Hospital Universitário', alunos_ativos: 24, frequencia_media: 92.5, validacoes_pendentes: 12, validacoes_concluidas: 156 },
    { id: 2, local: 'Hospital das Clínicas', alunos_ativos: 35, frequencia_media: 88.3, validacoes_pendentes: 18, validacoes_concluidas: 245 },
    { id: 3, local: 'Hospital Federal', alunos_ativos: 15, frequencia_media: 94.2, validacoes_pendentes: 5, validacoes_concluidas: 98 },
    { id: 4, local: 'Centro Médico', alunos_ativos: 18, frequencia_media: 85.7, validacoes_pendentes: 8, validacoes_concluidas: 127 },
    { id: 5, local: 'Santa Casa', alunos_ativos: 28, frequencia_media: 90.1, validacoes_pendentes: 14, validacoes_concluidas: 189 }
  ]

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white'>
      {/* Header */}
      <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2'><FiSettings size={36} /> Dashboard Administrativo</h1>
              <p className='text-blue-100 text-sm lg:text-base'>Gerenciamento completo do sistema</p>
            </div>
            <button className='bg-white/20 backdrop-blur hover:bg-white/30 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 w-fit'>
              <FiDownload size={18} /> Exportar Relatório
            </button>
          </div>
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className='border-b border-gray-200 bg-white sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-6 lg:px-12'>
          <div className='flex gap-8 overflow-x-auto'>
            {[
              { id: 'overview', label: 'Visão Geral', icon: FiHome },
              { id: 'instituicoes', label: 'Instituições', icon: FiBarChart2 },
              { id: 'usuarios', label: 'Usuários', icon: FiUsers },
              { id: 'locais', label: 'Locais', icon: FiMapPin },
              { id: 'preceptores', label: 'Preceptores', icon: FiClipboard },
              { id: 'vagas', label: 'Vagas', icon: FiTrendingUp },
              { id: 'frequencia', label: 'Frequência', icon: FiCheckCircle }
            ].map((aba) => {
              const IconComponent = aba.icon
              return (
                <button
                  key={aba.id}
                  onClick={() => setAbaSelecionada(aba.id)}
                  className={`py-4 px-2 font-semibold text-sm lg:text-base transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-1 ${
                    abaSelecionada === aba.id
                      ? 'border-[#237EE6] text-[#237EE6]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent size={18} /> {aba.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className='max-w-7xl mx-auto px-6 lg:px-12 py-10'>
        {/* VISÃO GERAL */}
        {abaSelecionada === 'overview' && (
          <div className='space-y-8'>
            {/* Cards Principais */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
              <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-sm font-semibold text-gray-600'>Instituições</h3>
                  <FiBarChart2 size={24} className='text-[#237EE6]' />
                </div>
                <p className='text-3xl font-bold text-[#237EE6]'>{admin.total_instituicoes}</p>
              </div>
              <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-sm font-semibold text-gray-600'>Usuários</h3>
                  <FiUsers size={24} className='text-[#60E6D7]' />
                </div>
                <p className='text-3xl font-bold text-[#60E6D7]'>{admin.total_usuarios}</p>
              </div>
              <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-sm font-semibold text-gray-600'>Locais</h3>
                  <FiMapPin size={24} className='text-[#10E686]' />
                </div>
                <p className='text-3xl font-bold text-[#10E686]'>{admin.total_locais}</p>
              </div>
              <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-sm font-semibold text-gray-600'>Preceptores</h3>
                  <FiClipboard size={24} className='text-yellow-500' />
                </div>
                <p className='text-3xl font-bold text-yellow-600'>{admin.total_preceptores}</p>
              </div>
              <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-sm font-semibold text-gray-600'>Vagas</h3>
                  <FiTrendingUp size={24} className='text-purple-500' />
                </div>
                <p className='text-3xl font-bold text-purple-600'>{admin.total_vagas}</p>
              </div>
              <div className='bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-sm font-semibold text-gray-600'>Alunos Ativos</h3>
                  <FiCheckCircle size={24} className='text-[#60E6D7]' />
                </div>
                <p className='text-3xl font-bold text-[#60E6D7]'>{admin.total_alunos_ativos}</p>
              </div>
            </div>

            {/* Resumo Rápido */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Instituições Recentes */}
              <div className='bg-white rounded-2xl shadow-md p-6'>
                <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'><FiBarChart2 size={24} /> Instituições Ativas</h2>
                <div className='space-y-3'>
                  {instituicoes.slice(0, 3).map((inst) => (
                    <div key={inst.id} className='p-3 bg-[#F5F7FA] rounded-lg flex items-center justify-between'>
                      <div>
                        <p className='font-semibold text-gray-900'>{inst.nome}</p>
                        <p className='text-xs text-gray-600'>{inst.unidades} unidades • {inst.usuarios} usuários</p>
                      </div>
                      <span className='px-2 py-1 bg-[#10E686]/20 text-[#10E686] rounded text-xs font-semibold'>{inst.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequência Média */}
              <div className='bg-white rounded-2xl shadow-md p-6'>
                <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'><FiTrendingUp size={24} /> Frequência por Local</h2>
                <div className='space-y-3'>
                  {frequenciaLocal.slice(0, 3).map((freq) => (
                    <div key={freq.id} className='p-3 bg-[#F5F7FA] rounded-lg'>
                      <div className='flex items-center justify-between mb-1'>
                        <p className='font-semibold text-gray-900 text-sm'>{freq.local}</p>
                        <p className='font-bold text-[#237EE6]'>{freq.frequencia_media}%</p>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full' style={{ width: `${freq.frequencia_media}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INSTITUIÇÕES */}
        {abaSelecionada === 'instituicoes' && (
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiBarChart2 size={32} /> Instituições</h2>
              <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 w-fit'>
                <FiPlus size={18} /> Nova Instituição
              </button>
            </div>

            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-[#F5F7FA]'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Localização</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Unidades</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Usuários</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instituicoes.map((inst) => (
                      <tr key={inst.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                        <td className='px-6 py-4 text-sm font-medium text-gray-900'>{inst.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{inst.cidade}, {inst.estado}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{inst.unidades}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{inst.usuarios}</td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>{inst.status}</span>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex gap-2'>
                            <button className='p-1 text-[#237EE6] hover:bg-blue-100 rounded transition-all' title='Editar'>
                              <FiEdit2 size={16} />
                            </button>
                            <button className='p-1 text-gray-600 hover:bg-gray-100 rounded transition-all' title='Visualizar'>
                              <FiEye size={16} />
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

        {/* USUÁRIOS */}
        {abaSelecionada === 'usuarios' && (
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={32} /> Usuários</h2>
              <div className='flex gap-3'>
                <select
                  value={filtroUsuario}
                  onChange={(e) => setFiltroUsuario(e.target.value)}
                  className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                >
                  <option value='todos'>Todos os perfis</option>
                  <option value='coordenador'>Coordenador</option>
                  <option value='gestor'>Gestor Local</option>
                  <option value='preceptor'>Preceptor</option>
                  <option value='aluno'>Aluno</option>
                </select>
                <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2'>
                  <FiPlus size={18} /> Novo Usuário
                </button>
              </div>
            </div>

            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-[#F5F7FA]'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Nome</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Email</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Perfil</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Último Acesso</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                        <td className='px-6 py-4 text-sm font-medium text-gray-900'>{usuario.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{usuario.email}</td>
                        <td className='px-6 py-4'>
                          <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold'>{usuario.perfil}</span>
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{usuario.instituicao}</td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            usuario.status === 'Ativo'
                              ? 'bg-[#10E686]/20 text-[#10E686]'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {usuario.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{usuario.ultimo_acesso}</td>
                        <td className='px-6 py-4'>
                          <div className='flex gap-2'>
                            <button className='p-1 text-[#237EE6] hover:bg-blue-100 rounded transition-all'>
                              <FiEdit2 size={16} />
                            </button>
                            <button className='p-1 text-red-600 hover:bg-red-100 rounded transition-all'>
                              <FiTrash2 size={16} />
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

        {/* LOCAIS DE ESTÁGIO */}
        {abaSelecionada === 'locais' && (
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiMapPin size={32} /> Locais de Estágio</h2>
              <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 w-fit'>
                <FiPlus size={18} /> Novo Local
              </button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {locais.map((local) => (
                <div key={local.id} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all'>
                  <div className='h-2 bg-gradient-to-r from-[#237EE6] to-[#60C9E6]'></div>
                  <div className='p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div>
                        <h3 className='text-lg font-bold text-gray-900'>{local.nome}</h3>
                        <p className='text-sm text-gray-600 mt-1 flex items-center gap-1'><FiMapPin size={14} /> {local.cidade}, {local.estado}</p>
                      </div>
                      <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>{local.status}</span>
                    </div>

                    <div className='grid grid-cols-3 gap-3 mb-4'>
                      <div className='text-center p-3 bg-[#F5F7FA] rounded-lg'>
                        <p className='text-xs text-gray-600 mb-1'>Especialidades</p>
                        <p className='text-xl font-bold text-[#237EE6]'>{local.especialidades}</p>
                      </div>
                      <div className='text-center p-3 bg-[#F5F7FA] rounded-lg'>
                        <p className='text-xs text-gray-600 mb-1'>Preceptores</p>
                        <p className='text-xl font-bold text-[#60E6D7]'>{local.preceptores}</p>
                      </div>
                      <div className='text-center p-3 bg-[#F5F7FA] rounded-lg'>
                        <p className='text-xs text-gray-600 mb-1'>Alunos</p>
                        <p className='text-xl font-bold text-[#10E686]'>{local.alunos}</p>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <button className='flex-1 bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all text-sm flex items-center justify-center gap-1'>
                        <FiEdit2 size={14} /> Editar
                      </button>
                      <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-[#F5F7FA] transition-all text-sm flex items-center justify-center gap-1'>
                        <FiEye size={14} /> Detalhes
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
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiClipboard size={32} /> Preceptores</h2>
              <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 w-fit'>
                <FiPlus size={18} /> Novo Preceptor
              </button>
            </div>

            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-[#F5F7FA]'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>CRM</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alunos</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preceptores.map((prec) => (
                      <tr key={prec.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                        <td className='px-6 py-4 text-sm font-medium text-gray-900'>{prec.nome}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{prec.crm}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{prec.especialidade}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{prec.local}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{prec.alunos}</td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            prec.status === 'Ativo'
                              ? 'bg-[#10E686]/20 text-[#10E686]'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {prec.status}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex gap-2'>
                            <button className='p-1 text-[#237EE6] hover:bg-blue-100 rounded transition-all'>
                              <FiEdit2 size={16} />
                            </button>
                            <button className='p-1 text-gray-600 hover:bg-gray-100 rounded transition-all'>
                              <FiEye size={16} />
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

        {/* VAGAS */}
        {abaSelecionada === 'vagas' && (
          <div className='space-y-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiTrendingUp size={32} /> Vagas</h2>
              <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 w-fit'>
                <FiPlus size={18} /> Nova Vaga
              </button>
            </div>

            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-[#F5F7FA]'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Período</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Vagas</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preenchidas</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vagas.map((vaga) => (
                      <tr key={vaga.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                        <td className='px-6 py-4 text-sm font-medium text-gray-900'>{vaga.instituicao}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{vaga.local}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{vaga.especialidade}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{vaga.periodo}º</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{vaga.quantidade}</td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-16 bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                style={{ width: `${(vaga.preenchidas / vaga.quantidade) * 100}%` }}
                              ></div>
                            </div>
                            <span className='text-xs font-semibold text-gray-700'>{vaga.preenchidas}/{vaga.quantidade}</span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            vaga.status === 'Aberta'
                              ? 'bg-[#10E686]/20 text-[#10E686]'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {vaga.status}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex gap-2'>
                            <button className='p-1 text-[#237EE6] hover:bg-blue-100 rounded transition-all'>
                              <FiEdit2 size={16} />
                            </button>
                            <button className='p-1 text-gray-600 hover:bg-gray-100 rounded transition-all'>
                              <FiEye size={16} />
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

        {/* FREQUÊNCIA */}
        {abaSelecionada === 'frequencia' && (
          <div className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiCheckCircle size={32} /> Relatório de Frequência</h2>

            <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b-2 border-gray-200 bg-[#F5F7FA]'>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local de Estágio</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alunos Ativos</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Frequência Média</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Validações Concluídas</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Pendentes</th>
                      <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frequenciaLocal.map((freq) => (
                      <tr key={freq.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                        <td className='px-6 py-4 text-sm font-medium text-gray-900'>{freq.local}</td>
                        <td className='px-6 py-4 text-sm text-gray-700'>{freq.alunos_ativos}</td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-20 bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                style={{ width: `${freq.frequencia_media}%` }}
                              ></div>
                            </div>
                            <span className='text-xs font-semibold text-gray-700'>{freq.frequencia_media}%</span>
                          </div>
                        </td>
                        <td className='px-6 py-4 text-sm font-medium text-gray-900'>{freq.validacoes_concluidas}</td>
                        <td className='px-6 py-4'>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            freq.validacoes_pendentes > 0
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-[#10E686]/20 text-[#10E686]'
                          }`}>
                            {freq.validacoes_pendentes}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <button className='p-1 text-[#237EE6] hover:bg-blue-100 rounded transition-all'>
                            <FiDownload size={16} />
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
      </div>
    </div>
  )
}