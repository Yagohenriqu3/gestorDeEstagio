import { useMemo, useState } from 'react'
import { FiBook, FiSearch, FiX, FiPlus } from 'react-icons/fi'

export default function CursosInstituicaoModal({ instituicao, cursos, onClose, onCriarCurso }) {
  const [busca, setBusca] = useState('')

  const cursosDaInstituicao = useMemo(() => {
    const idsUnidades = instituicao.unidades.map((u) => u.id_unidade)
    return cursos.filter((curso) => idsUnidades.includes(curso.id_unidade))
  }, [cursos, instituicao])

  const filtrados = useMemo(() => {
    if (!busca) return cursosDaInstituicao
    return cursosDaInstituicao.filter((c) =>
      c.nome_curso.toLowerCase().includes(busca.toLowerCase())
    )
  }, [busca, cursosDaInstituicao])

  const obterNomeUnidade = (idUnidade) => {
    const unidade = instituicao.unidades.find((u) => u.id_unidade === idUnidade)
    return unidade?.nome_unidade || 'Unidade'
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white p-6 flex items-center justify-between sticky top-0 z-10'>
          <h2 className='text-2xl font-bold flex items-center gap-3'>
            <FiBook size={24} /> Cursos - {instituicao.nome_instituicao}
          </h2>
          <button onClick={onClose} className='p-1 hover:bg-white/20 rounded-lg transition-all'>
            <FiX size={24} />
          </button>
        </div>

        <div className='p-8 space-y-6'>
          <div className='bg-[#F5F7FA] p-4 rounded-lg'>
            <div className='relative'>
              <FiSearch className='absolute left-3 top-3 text-gray-400' size={18} />
              <input
                type='text'
                placeholder='Buscar curso por nome'
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#237EE6] transition-all'
              />
            </div>
          </div>

          {filtrados.length > 0 ? (
            <div className='space-y-4'>
              {filtrados.map((curso) => (
                <div key={curso.id_curso} className='bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#237EE6] hover:shadow-lg transition-all'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex-1'>
                      <h3 className='text-xl font-bold text-gray-900'>{curso.nome_curso}</h3>
                      <p className='text-sm text-gray-600 mt-1'>{curso.descricao}</p>
                      <div className='mt-3 inline-flex items-center gap-2 bg-[#E8F4F8] text-[#237EE6] px-3 py-1 rounded-full text-sm font-semibold'>
                        {obterNomeUnidade(curso.id_unidade)}
                      </div>
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

                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
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
                      <p className='text-sm font-bold text-gray-900'>{curso.duracao_semestres}s</p>
                    </div>
                    <div className='bg-[#F5F7FA] p-3 rounded-lg'>
                      <p className='text-xs text-gray-600 font-semibold mb-1'>Carga Horária</p>
                      <p className='text-sm font-bold text-gray-900'>{curso.carga_horaria_total}h</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-12'>
              <FiBook size={48} className='mx-auto text-gray-300 mb-4' />
              <p className='text-gray-600 text-lg'>Nenhum curso encontrado</p>
            </div>
          )}

          <div className='border-t-2 border-gray-200 pt-6'>
            <button
              onClick={() => onCriarCurso(instituicao)}
              className='w-full bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2'
            >
              <FiPlus size={18} /> Criar Novo Curso
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}