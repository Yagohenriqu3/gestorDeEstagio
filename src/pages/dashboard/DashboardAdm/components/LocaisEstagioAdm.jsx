import { MdLocalHospital } from 'react-icons/md'
import { FiPlus, FiStar, FiEdit2, FiUsers, FiTrash2 } from 'react-icons/fi'

const LocaisEstagioAdm = ({ 
  locais, 
  filtroLocais, 
  setFiltroLocais, 
  setModalCriarEspecialidade,
  locaisFiltrados,
  setLocalSelecionadoParaEspecialidades,
  setEspecialidadesSelecionadas,
  locaisComEspecialidades,
  setModalEspecialidadesLocal,
  setLocalSelecionadoParaPreceptor,
  setModalAdicionarPreceptor,
  preceptoresAdicionadosPorLocal,
  setPreceptoresAdicionadosPorLocal
}) => {
  return (
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
            className='bg-linear-to-r from-[#10E686] to-[#60E6D7] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'
          >
            <FiStar size={18} /> Nova Especialidade
          </button>
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
                <div key={localId} className='border-2 border-[#10E686]/30 rounded-xl p-4 bg-linear-to-br from-[#10E686]/5 to-[#60E6D7]/5'>
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
  )
}

export default LocaisEstagioAdm
