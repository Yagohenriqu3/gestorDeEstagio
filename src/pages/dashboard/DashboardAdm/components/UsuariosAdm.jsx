import { FiSettings, FiUsers, FiClipboard, FiPlus } from 'react-icons/fi'

const UsuariosAdm = ({ 
  abaUsuarios, 
  setAbaUsuarios, 
  usuarios, 
  perfis,
  perfilSelecionado,
  setPerfilSelecionado
}) => {
  return (
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
            <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
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
                      className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
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

          {/* Seletor de Perfil */}
          <div className='bg-white rounded-2xl shadow-md p-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-3'>Selecione o Perfil/Função</label>
            <div className='overflow-x-auto'>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 min-w-min'>
              {perfis.map((perfil) => (
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
            <div className='overflow-x-auto'>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-w-min'>
              {perfis.map((perfil) => {
                const count = usuarios.filter(u => u.id_perfil === perfil.id_perfil).length
                return (
                  <div key={perfil.id_perfil} className='p-4 bg-linear-to-br from-[#F5F7FA] to-white border-2 border-gray-200 rounded-xl text-center'>
                    <p className='text-xs text-gray-600 mb-2'>{perfil.nome_perfil}</p>
                    <p className='text-3xl font-bold text-[#237EE6]'>{count}</p>
                    <div className='mt-2 w-full bg-gray-200 rounded-full h-1.5'>
                      <div
                        className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-1.5 rounded-full'
                        style={{ width: `${(count / usuarios.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsuariosAdm
