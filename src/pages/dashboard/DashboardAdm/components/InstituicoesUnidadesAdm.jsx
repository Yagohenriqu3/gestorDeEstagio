import { useState } from 'react'
import { FiBarChart2, FiPlus, FiEdit2, FiEye, FiDownload, FiX, FiTrash2, FiBook, FiSearch, FiFilter, FiCheck } from 'react-icons/fi'
import NovoCurso from '../../../../components/forms/NovoCurso'
import CursosInstituicaoModal from './CursosInstituicaoModal'
import NovaInstituicao from '../../../../components/forms/NovaInstituicao'

export default function InstituicoesUnidadesAdm({ instituicoes, cursos, abaInstituicoes, setAbaInstituicoes }) {
  const [expandido, setExpandido] = useState(null)
  const [modalAberto, setModalAberto] = useState(null)
  const [dadosSelecionados, setDadosSelecionados] = useState(null)
  const [modalCursosAberto, setModalCursosAberto] = useState(false)
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(null)
  const [termoBusca, setTermoBusca] = useState('')
  const [areaFiltro, setAreaFiltro] = useState('')
  const [modalNovosCursos, setModalNovosCursos] = useState(false)
  const [instituicaoSelecionada, setInstituicaoSelecionada] = useState(null)
  const [unidadesParaCurso, setUnidadesParaCurso] = useState([])
  const [instituicaoCursosAberta, setInstituicaoCursosAberta] = useState(null)
  const [mostrarFormularioInstituicao, setMostrarFormularioInstituicao] = useState(false)
  const [listaInstituicoes, setListaInstituicoes] = useState(instituicoes)
  const [mostrarNovoCursoForm, setMostrarNovoCursoForm] = useState(false)

  const handleExportar = () => {
    const csv = [
      ['ID', 'Instituição', 'Unidade', 'Cidade', 'Estado', 'Usuários', 'Status'].join(','),
      ...listaInstituicoes.flatMap(inst =>
        inst.unidades.map(un =>
          [inst.id, inst.nome, un.nome, un.cidade, un.estado, un.usuarios, inst.status].join(',')
        )
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `instituicoes_unidades_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const abrirModalInstituicao = (inst) => {
    setDadosSelecionados({ tipo: 'instituicao', dados: inst })
    setModalAberto(true)
  }

  const abrirModalUnidade = (inst, unidade) => {
    setDadosSelecionados({ tipo: 'unidade', dados: { instituicao: inst, unidade } })
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setDadosSelecionados(null)
  }

  const abrirModalCursos = (unidade) => {
    setUnidadeSelecionada(unidade)
    setModalCursosAberto(true)
  }

  const fecharModalCursos = () => {
    setModalCursosAberto(false)
    setUnidadeSelecionada(null)
    setTermoBusca('')
    setAreaFiltro('')
  }

  const cursosDaUnidade = () => {
    if (!unidadeSelecionada) return []
    let cursosFiltrados = cursos.filter(curso => curso.id_unidade === unidadeSelecionada.id_unidade)
    
    // Filtro por termo de busca (nome)
    if (termoBusca) {
      cursosFiltrados = cursosFiltrados.filter(curso =>
        curso.nome_curso.toLowerCase().includes(termoBusca.toLowerCase())
      )
    }
    
    // Filtro por área
    if (areaFiltro) {
      cursosFiltrados = cursosFiltrados.filter(curso =>
        curso.area === areaFiltro
      )
    }
    
    return cursosFiltrados
  }

  // Obter todas as áreas únicas dos cursos da unidade
  const obterAreasUnicas = () => {
    if (!unidadeSelecionada) return []
    const cursosUnidade = cursos.filter(curso => curso.id_unidade === unidadeSelecionada.id_unidade)
    const areas = [...new Set(cursosUnidade.map(curso => curso.area))]
    return areas.sort()
  }

  const handleAdicionarCurso = () => {
    alert('Ação: Adicionar novo curso à unidade')
  }

  const handleEditarCurso = (curso) => {
    alert(`Ação: Editar curso - ${curso.nome_curso}`)
  }

  const handleRemoverCurso = (curso) => {
    alert(`Ação: Remover curso - ${curso.nome_curso}`)
  }

  const abrirCursosInstituicao = (instituicao) => {
    setInstituicaoCursosAberta(instituicao)
  }

  const fecharCursosInstituicao = () => {
    setInstituicaoCursosAberta(null)
  }

  const abrirModalNovoCurso = (instituicao) => {
    setInstituicaoSelecionada(instituicao)
    setUnidadesParaCurso([])
    setModalNovosCursos(true)
  }

  const fecharModalNovoCurso = () => {
    setModalNovosCursos(false)
    setInstituicaoSelecionada(null)
    setUnidadesParaCurso([])
  }

  const toggleUnidadeParaCurso = (idUnidade) => {
    if (unidadesParaCurso.includes(idUnidade)) {
      setUnidadesParaCurso(unidadesParaCurso.filter(id => id !== idUnidade))
    } else {
      setUnidadesParaCurso([...unidadesParaCurso, idUnidade])
    }
  }

  const handleCriarCurso = () => {
    if (unidadesParaCurso.length === 0) {
      alert('Selecione pelo menos uma unidade para oferecer o curso')
      return
    }
    alert(`Criar novo curso para as unidades: ${unidadesParaCurso.join(', ')}`)
    fecharModalNovoCurso()
  }

  const handleSalvarInstituicao = (novaInstituicao) => {
    setListaInstituicoes(prev => [...prev, novaInstituicao])
    setMostrarFormularioInstituicao(false)
  }

  const handleVoltarFormulario = () => {
    setMostrarFormularioInstituicao(false)
  }

  // Se está mostrando o formulário, renderiza apenas ele
  if (mostrarFormularioInstituicao) {
    return <NovaInstituicao onVoltar={handleVoltarFormulario} onSalvar={handleSalvarInstituicao} />
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiBarChart2 size={32} /> Instituições e Unidades</h2>
        <div className='flex gap-3'>
          <button 
            onClick={handleExportar}
            className='bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold px-6 py-2 rounded-lg hover:bg-[#F5F7FA] transition-all flex items-center gap-2'
          >
            <FiDownload size={18} /> Exportar
          </button>
          <button 
            onClick={() => setMostrarFormularioInstituicao(true)}
            className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2'
          >
            <FiPlus size={18} /> Nova Instituição
          </button>
        </div>
      </div>

      <div className='space-y-4'>
          {listaInstituicoes.map((inst) => (
            <div key={inst.id_instituicao} className='bg-white rounded-2xl shadow-md overflow-hidden'>
              {/* Cabeçalho da Instituição */}
              <div 
                className='p-6 bg-gradient-to-r from-[#237EE6]/10 to-[#60C9E6]/10 cursor-pointer hover:from-[#237EE6]/20 hover:to-[#60C9E6]/20 transition-all'
                onClick={() => setExpandido(expandido === inst.id_instituicao ? null : inst.id_instituicao)}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <h3 className='text-lg font-bold text-gray-900'>{inst.nome_instituicao}</h3>
                    <p className='text-sm text-gray-600 mt-1'>{inst.total_unidades} unidades • {inst.total_usuarios} usuários totais</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <button 
                      onClick={() => abrirCursosInstituicao(inst)}
                      className='p-2 text-[#237EE6] hover:bg-blue-100 rounded-lg transition-all'
                      title='Ver cursos da instituição'
                    >
                      <FiBook size={18} />
                    </button>
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      inst.status === 'Ativa'
                        ? 'bg-[#10E686]/20 text-[#10E686]'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {inst.status}
                    </span>
                    <button 
                      onClick={() => abrirModalInstituicao(inst)}
                      className='p-2 text-[#237EE6] hover:bg-blue-100 rounded-lg transition-all'
                      title='Ver dados cadastrais'
                    >
                      <FiEye size={18} />
                    </button>
                    <button className='p-2 text-[#237EE6] hover:bg-blue-100 rounded-lg transition-all'>
                      <FiEdit2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Unidades (expandível) */}
              {expandido === inst.id_instituicao && (
                <div className='border-t border-gray-200 divide-y divide-gray-200'>
                  {inst.unidades.map((un) => (
                    <div key={un.id_unidade} className='p-6 hover:bg-[#F5F7FA] transition-colors'>
                      <div className='flex items-start justify-between'>
                        <div>
                          <h4 className='text-base font-semibold text-gray-900'>{un.nome_unidade}</h4>
                          <p className='text-sm text-gray-600 mt-1'>{un.cidade}, {un.uf}</p>
                          <div className='flex gap-6 mt-3 text-sm'>
                            <span className='text-gray-700'><strong>{un.usuarios}</strong> usuários</span>
                            <span className='text-gray-700'><strong>{un.cursos?.length || 0}</strong> cursos</span>
                            <span className='text-gray-700'><strong>{un.locais?.length || 0}</strong> locais vinculados</span>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <button 
                            onClick={() => abrirModalCursos(un)}
                            className='p-2 text-[#60C9E6] hover:bg-cyan-100 rounded-lg transition-all'
                            title='Ver cursos'
                          >
                            <FiBook size={16} />
                          </button>
                          <button 
                            onClick={() => abrirModalUnidade(inst, un)}
                            className='p-2 text-[#237EE6] hover:bg-blue-100 rounded-lg transition-all'
                            title='Ver dados cadastrais'
                          >
                            <FiEye size={16} />
                          </button>
                          <button className='p-2 text-[#237EE6] hover:bg-blue-100 rounded-lg transition-all'>
                            <FiEdit2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='p-4 bg-[#F5F7FA]'>
                    <button className='w-full text-[#237EE6] font-semibold py-2 rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center gap-2'>
                      <FiPlus size={16} /> Adicionar Unidade
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Modal de Dados */}
      {modalAberto && dadosSelecionados && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white p-6 flex items-center justify-between'>
              <h2 className='text-2xl font-bold'>
                {dadosSelecionados.tipo === 'instituicao' 
                  ? `Dados da Instituição: ${dadosSelecionados.dados.nome_instituicao}`
                  : `Dados da Unidade: ${dadosSelecionados.dados.unidade.nome_unidade}`}
              </h2>
              <button
                onClick={fecharModal}
                className='p-1 hover:bg-white/20 rounded-lg transition-all'
              >
                <FiX size={24} />
              </button>
            </div>

            <div className='p-8'>
              {dadosSelecionados.tipo === 'instituicao' ? (
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>ID da Instituição</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.id_instituicao}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Sigla</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.sigla}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg md:col-span-2'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Nome da Instituição</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.nome_instituicao}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>CNPJ</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.cnpj}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Tipo de Instituição</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.tipo_instituicao}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Mantenedora</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.mantenedora}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Código MEC</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.codigo_mec}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Site</p>
                      <a href={`https://${dadosSelecionados.dados.site}`} target='_blank' rel='noopener noreferrer' className='text-lg text-[#237EE6] font-bold hover:underline'>
                        {dadosSelecionados.dados.site}
                      </a>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Telefone</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.telefone}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Email de Contato</p>
                      <a href={`mailto:${dadosSelecionados.dados.email_contato}`} className='text-lg text-[#237EE6] font-bold hover:underline'>
                        {dadosSelecionados.dados.email_contato}
                      </a>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Status</p>
                      <span className={`px-3 py-1 rounded-lg text-sm font-semibold inline-block ${
                        dadosSelecionados.dados.status === 'Ativa'
                          ? 'bg-[#10E686]/20 text-[#10E686]'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {dadosSelecionados.dados.status}
                      </span>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Data de Cadastro</p>
                      <p className='text-lg text-gray-900 font-bold'>{new Date(dadosSelecionados.dados.data_cadastro).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg md:col-span-2'>
                      <p className='text-sm text-gray-600 font-semibold mb-3'>Logo</p>
                      <img src={dadosSelecionados.dados.logo} alt='Logo da instituição' className='h-16 w-auto object-contain' />
                    </div>
                  </div>

                  <div className='border-t-2 border-gray-200 pt-6'>
                    <h3 className='text-lg font-bold text-gray-900 mb-4'>Resumo</h3>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                      <div className='bg-[#F5F7FA] p-4 rounded-lg text-center'>
                        <p className='text-sm text-gray-600 font-semibold'>Unidades</p>
                        <p className='text-2xl font-bold text-[#237EE6]'>{dadosSelecionados.dados.total_unidades}</p>
                      </div>
                      <div className='bg-[#F5F7FA] p-4 rounded-lg text-center'>
                        <p className='text-sm text-gray-600 font-semibold'>Usuários</p>
                        <p className='text-2xl font-bold text-[#237EE6]'>{dadosSelecionados.dados.total_usuarios}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>ID da Unidade</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.id_unidade}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>ID da Instituição</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.id_instituicao}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Instituição</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.instituicao.nome_instituicao}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Sigla</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.sigla}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg md:col-span-2'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Nome da Unidade</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.nome_unidade}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>CNPJ da Unidade</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.cnpj_unidade}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Tipo de Unidade</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.tipo_unidade}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg md:col-span-2'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Endereço Completo</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.endereco_completo}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Cidade</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.cidade}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>UF</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.uf}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>CEP</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.cep}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Telefone</p>
                      <p className='text-lg text-gray-900 font-bold'>{dadosSelecionados.dados.unidade.telefone}</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg md:col-span-2'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Email de Contato</p>
                      <a href={`mailto:${dadosSelecionados.dados.unidade.email_contato}`} className='text-lg text-[#237EE6] font-bold hover:underline'>
                        {dadosSelecionados.dados.unidade.email_contato}
                      </a>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Status</p>
                      <span className={`px-3 py-1 rounded-lg text-sm font-semibold inline-block ${
                        dadosSelecionados.dados.unidade.status === 'Ativa'
                          ? 'bg-[#10E686]/20 text-[#10E686]'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {dadosSelecionados.dados.unidade.status}
                      </span>
                    </div>
                    <div className='bg-[#F5F7FA] p-4 rounded-lg'>
                      <p className='text-sm text-gray-600 font-semibold mb-1'>Data de Cadastro</p>
                      <p className='text-lg text-gray-900 font-bold'>{new Date(dadosSelecionados.dados.unidade.data_cadastro).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>

                  <div className='border-t-2 border-gray-200 pt-6'>
                    <h3 className='text-lg font-bold text-gray-900 mb-4'>Resumo</h3>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                      <div className='bg-[#F5F7FA] p-4 rounded-lg text-center'>
                        <p className='text-sm text-gray-600 font-semibold'>Usuários</p>
                        <p className='text-2xl font-bold text-[#237EE6]'>{dadosSelecionados.dados.unidade.usuarios}</p>
                      </div>
                      <div className='bg-[#F5F7FA] p-4 rounded-lg text-center'>
                        <p className='text-sm text-gray-600 font-semibold'>Cursos</p>
                        <p className='text-2xl font-bold text-[#237EE6]'>{dadosSelecionados.dados.unidade.cursos?.length || 0}</p>
                      </div>
                      <div className='bg-[#F5F7FA] p-4 rounded-lg text-center'>
                        <p className='text-sm text-gray-600 font-semibold'>Locais</p>
                        <p className='text-2xl font-bold text-[#237EE6]'>{dadosSelecionados.dados.unidade.locais?.length || 0}</p>
                      </div>
                    </div>
                  </div>

                  {dadosSelecionados.dados.unidade.cursos && dadosSelecionados.dados.unidade.cursos.length > 0 && (
                    <div className='border-t-2 border-gray-200 pt-6'>
                      <h3 className='text-lg font-bold text-gray-900 mb-4'>Cursos</h3>
                      <div className='flex flex-wrap gap-3'>
                        {dadosSelecionados.dados.unidade.cursos.map((curso, idx) => (
                          <span key={idx} className='bg-[#237EE6]/10 text-[#237EE6] px-4 py-2 rounded-lg font-semibold'>
                            {curso}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {dadosSelecionados.dados.unidade.locais && dadosSelecionados.dados.unidade.locais.length > 0 && (
                    <div className='border-t-2 border-gray-200 pt-6'>
                      <h3 className='text-lg font-bold text-gray-900 mb-4'>Locais Vinculados</h3>
                      <div className='flex flex-wrap gap-3'>
                        {dadosSelecionados.dados.unidade.locais.map((local, idx) => (
                          <span key={idx} className='bg-[#10E686]/10 text-[#10E686] px-4 py-2 rounded-lg font-semibold'>
                            {local}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className='border-t-2 border-gray-200 mt-8 pt-6 flex gap-3 justify-end'>
                <button
                  onClick={fecharModal}
                  className='bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-all'
                >
                  Fechar
                </button>
                <button className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2'>
                  <FiEdit2 size={16} /> Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cursos da Unidade */}
      {modalCursosAberto && unidadeSelecionada && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='bg-gradient-to-r from-[#60C9E6] to-[#237EE6] text-white p-6 flex items-center justify-between sticky top-0 z-10'>
              <h2 className='text-2xl font-bold flex items-center gap-2'>
                <FiBook size={24} /> Cursos - {unidadeSelecionada.nome_unidade}
              </h2>
              <button
                onClick={fecharModalCursos}
                className='p-1 hover:bg-white/20 rounded-lg transition-all'
              >
                <FiX size={24} />
              </button>
            </div>

            <div className='p-8'>
              <div className='mb-8 bg-[#F5F7FA] p-6 rounded-lg'>
                <div className='flex items-center gap-2 mb-4'>
                  <FiFilter size={20} className='text-[#237EE6]' />
                  <h3 className='text-lg font-bold text-gray-900'>Filtros</h3>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='relative'>
                    <FiSearch className='absolute left-3 top-3 text-gray-400' size={18} />
                    <input
                      type='text'
                      placeholder='Buscar por nome do curso...'
                      value={termoBusca}
                      onChange={(e) => setTermoBusca(e.target.value)}
                      className='w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#237EE6] transition-all'
                    />
                  </div>

                  <select
                    value={areaFiltro}
                    onChange={(e) => setAreaFiltro(e.target.value)}
                    className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#237EE6] transition-all bg-white font-semibold'
                  >
                    <option value=''>Todas as Áreas</option>
                    {obterAreasUnicas().map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {(termoBusca || areaFiltro) && (
                  <div className='mt-4 p-3 bg-blue-100 text-blue-700 rounded-lg text-sm'>
                    <strong>Filtros ativos:</strong> {termoBusca && `Nome: "${termoBusca}"`} {termoBusca && areaFiltro && '•'} {areaFiltro && `Área: ${areaFiltro}`}
                  </div>
                )}
              </div>

              {cursosDaUnidade().length > 0 ? (
                <div className='space-y-4'>
                  {cursosDaUnidade().map((curso) => (
                    <div key={curso.id_curso} className='bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#237EE6] hover:shadow-lg transition-all'>
                      <div className='flex items-start justify-between mb-4'>
                        <div className='flex-1'>
                          <h3 className='text-xl font-bold text-gray-900'>{curso.nome_curso}</h3>
                          <p className='text-sm text-gray-600 mt-1'>{curso.descricao}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          curso.status === 'Ativo'
                            ? 'bg-[#10E686]/20 text-[#10E686]'
                            : curso.status === 'Inativo'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {curso.status}
                        </span>
                      </div>

                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                        <div className='bg-[#F5F7FA] p-3 rounded-lg'>
                          <p className='text-xs text-gray-600 font-semibold mb-1'>ID</p>
                          <p className='text-sm font-bold text-gray-900'>{curso.id_curso}</p>
                        </div>
                        <div className='bg-[#F5F7FA] p-3 rounded-lg'>
                          <p className='text-xs text-gray-600 font-semibold mb-1'>Grau</p>
                          <p className='text-sm font-bold text-gray-900'>{curso.grau}</p>
                        </div>
                        <div className='bg-[#F5F7FA] p-3 rounded-lg'>
                          <p className='text-xs text-gray-600 font-semibold mb-1'>Modalidade</p>
                          <p className='text-sm font-bold text-gray-900'>{curso.modalidade}</p>
                        </div>
                        <div className='bg-[#F5F7FA] p-3 rounded-lg'>
                          <p className='text-xs text-gray-600 font-semibold mb-1'>Duração</p>
                          <p className='text-sm font-bold text-gray-900'>{curso.duracao_semestres} semestres</p>
                        </div>
                        <div className='bg-[#F5F7FA] p-3 rounded-lg'>
                          <p className='text-xs text-gray-600 font-semibold mb-1'>Carga Horária</p>
                          <p className='text-sm font-bold text-gray-900'>{curso.carga_horaria_total}h</p>
                        </div>
                        <div className='bg-[#F5F7FA] p-3 rounded-lg'>
                          <p className='text-xs text-gray-600 font-semibold mb-1'>Código MEC</p>
                          <p className='text-sm font-bold text-gray-900'>{curso.codigo_mec}</p>
                        </div>
                        <div className='bg-[#F5F7FA] p-3 rounded-lg'>
                          <p className='text-xs text-gray-600 font-semibold mb-1'>Área</p>
                          <span className='text-sm font-bold text-[#237EE6] bg-[#237EE6]/10 px-2 py-1 rounded'>{curso.area}</span>
                        </div>
                        <div className='bg-[#F5F7FA] p-3 rounded-lg'>
                          <p className='text-xs text-gray-600 font-semibold mb-1'>ID Unidade</p>
                          <p className='text-sm font-bold text-gray-900'>{curso.id_unidade}</p>
                        </div>
                      </div>

                      <div className='flex gap-2 justify-end pt-4 border-t border-gray-200'>
                        <button
                          onClick={() => handleEditarCurso(curso)}
                          className='px-4 py-2 bg-[#237EE6] text-white font-semibold rounded-lg hover:bg-[#1a5bb8] transition-all flex items-center gap-2'
                        >
                          <FiEdit2 size={16} /> Editar
                        </button>
                        <button
                          onClick={() => handleRemoverCurso(curso)}
                          className='px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all flex items-center gap-2'
                        >
                          <FiTrash2 size={16} /> Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-12'>
                  <FiBook size={48} className='mx-auto text-gray-300 mb-4' />
                  <p className='text-gray-600 text-lg'>Nenhum curso cadastrado nesta unidade</p>
                </div>
              )}

              <div className='border-t-2 border-gray-200 mt-8 pt-6 flex gap-3 justify-end'>
                <button
                  onClick={fecharModalCursos}
                  className='bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-all'
                >
                  Fechar
                </button>
                <button
                  onClick={handleAdicionarCurso}
                  className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2'
                >
                  <FiPlus size={16} /> Adicionar Curso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cursos por Instituição */}
      {instituicaoCursosAberta && (
        <CursosInstituicaoModal
          instituicao={instituicaoCursosAberta}
          cursos={cursos}
          onClose={fecharCursosInstituicao}
          onCriarCurso={abrirModalNovoCurso}
        />
      )}

      {/* Modal de Criar Novo Curso */}
      {modalNovosCursos && instituicaoSelecionada && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full'>
            <div className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white p-6 flex items-center justify-between'>
              <h2 className='text-2xl font-bold flex items-center gap-2'>
                <FiPlus size={24} /> Criar Novo Curso
              </h2>
              <button
                onClick={fecharModalNovoCurso}
                className='p-1 hover:bg-white/20 rounded-lg transition-all'
              >
                <FiX size={24} />
              </button>
            </div>

            <div className='p-8'>
              {mostrarNovoCursoForm ? (
                <NovoCurso
                  initialValues={{ id_unidade: unidadesParaCurso[0] ?? instituicaoSelecionada.unidades[0]?.id_unidade ?? '' }}
                  onVoltar={() => setMostrarNovoCursoForm(false)}
                  onSalvar={(curso) => {
                    setMostrarNovoCursoForm(false)
                    if (typeof handleCriarCurso === 'function') {
                      handleCriarCurso(curso)
                    }
                  }}
                />
              ) : (
                <>
                  <div className='mb-8'>
                    <h3 className='text-lg font-bold text-gray-900 mb-4'>
                      Selecione as unidades que oferecerão este curso:
                    </h3>
                    <p className='text-sm text-gray-600 mb-4'>
                      Instituição: <strong>{instituicaoSelecionada.nome_instituicao}</strong>
                    </p>
                  </div>

                  <div className='space-y-3 mb-8'>
                    {instituicaoSelecionada.unidades.map((unidade) => (
                      <div
                        key={unidade.id_unidade}
                        onClick={() => toggleUnidadeParaCurso(unidade.id_unidade)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          unidadesParaCurso.includes(unidade.id_unidade)
                            ? 'border-[#237EE6] bg-[#237EE6]/10'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className='flex items-center gap-3'>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            unidadesParaCurso.includes(unidade.id_unidade)
                              ? 'bg-[#237EE6] border-[#237EE6]'
                              : 'border-gray-300'
                          }`}>
                            {unidadesParaCurso.includes(unidade.id_unidade) && (
                              <FiCheck size={16} className='text-white' />
                            )}
                          </div>
                          <div className='flex-1'>
                            <p className='font-semibold text-gray-900'>{unidade.nome_unidade}</p>
                            <p className='text-sm text-gray-600'>{unidade.cidade}, {unidade.uf}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {unidadesParaCurso.length > 0 && (
                    <div className='bg-blue-100 border-2 border-[#237EE6] p-4 rounded-lg mb-8'>
                      <p className='text-sm font-semibold text-[#237EE6]'>
                        {unidadesParaCurso.length} unidade(s) selecionada(s)
                      </p>
                    </div>
                  )}

                  <div className='border-t-2 border-gray-200 pt-6 flex gap-3 justify-end'>
                    <button
                      onClick={fecharModalNovoCurso}
                      className='bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-all'
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => setMostrarNovoCursoForm(true)}
                      disabled={unidadesParaCurso.length === 0}
                      className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                    >
                      <FiPlus size={16} /> Criar Curso
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
