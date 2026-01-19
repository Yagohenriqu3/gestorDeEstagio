import { useState, useMemo } from 'react'
import { FiUsers, FiPlus, FiClipboard, FiFilter } from 'react-icons/fi'

export default function ListaAlunosAdm({ alunos = [], instituicoes = [], onAdicionarAluno, onVerHistorico }) {
  const [filtroInstituicao, setFiltroInstituicao] = useState('todos')
  const [busca, setBusca] = useState('')

  const alunosFiltrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return alunos
      .filter((a) => filtroInstituicao === 'todos' || a.instituicao === filtroInstituicao)
      .filter((a) =>
        q === '' ||
        a.nome.toLowerCase().includes(q) ||
        a.matricula.toLowerCase().includes(q)
      )
  }, [alunos, filtroInstituicao, busca])

  return (
    <div className='space-y-6'>
      <div className='space-y-3 md:space-y-0 md:flex md:items-center md:justify-between'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2'><FiUsers size={28} className='md:hidden' /><FiUsers size={32} className='hidden md:block' /> Lista de Alunos</h2>
        <div className='w-full md:w-auto grid grid-cols-1 md:grid-cols-3 gap-3'>
          <div className='flex flex-col'>
            <label className='text-xs font-semibold text-gray-600 mb-1'>Instituição</label>
            <select
              value={filtroInstituicao}
              onChange={(e) => setFiltroInstituicao(e.target.value)}
              className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
              aria-label='Filtrar por instituição'
            >
              <option value='todos'>Todas as instituições</option>
              {instituicoes.map((inst) => (
                <option key={inst.id} value={inst.nome}>{inst.nome}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='text-xs font-semibold text-gray-600 mb-1'>Busca</label>
            <div className='relative'>
              <FiFilter className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
              <input
                type='text'
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder='Nome ou matrícula'
                className='w-full pl-9 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                aria-label='Buscar por nome ou matrícula'
              />
            </div>
          </div>

          <div className='flex items-end'>
            <button
              onClick={onAdicionarAluno}
              className='w-full md:w-auto bg-[#237EE6] text-white font-semibold px-4 md:px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center'
            >
              <FiPlus size={18} /> Adicionar Aluno
            </button>
          </div>
        </div>
      </div>

      {/* Lista em cards para mobile */}
      <div className='md:hidden space-y-3'>
        {alunosFiltrados.map((aluno) => (
          <div key={aluno.id} className='bg-white rounded-xl shadow p-4'>
            <div className='flex items-center justify-between mb-2'>
              <p className='font-semibold text-gray-900'>{aluno.nome}</p>
              <span className='text-xs text-gray-600'>{aluno.periodo}</span>
            </div>
            <p className='text-sm text-gray-700'><span className='font-semibold'>Matrícula:</span> {aluno.matricula}</p>
            <p className='text-sm text-gray-700'><span className='font-semibold'>Instituição:</span> {aluno.instituicao}</p>
            <div className='mt-3'>
              <button
                onClick={() => onVerHistorico?.(aluno)}
                className='w-full px-3 py-2 text-sm text-white bg-[#237EE6] rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-1'
                title='Ver histórico'
              >
                <FiClipboard size={14} /> Histórico
              </button>
            </div>
          </div>
        ))}
        {alunosFiltrados.length === 0 && (
          <div className='text-center text-gray-600 py-6'>Nenhum aluno encontrado com os filtros atuais.</div>
        )}
      </div>

      {/* Tabela para telas médias e maiores */}
      <div className='hidden md:block bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200 bg-[#F5F7FA]'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Nome</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Matrícula</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Período</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Instituição</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunosFiltrados.map((aluno) => (
                <tr key={aluno.id} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                  <td className='px-6 py-4 text-sm font-medium text-gray-900'>{aluno.nome}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.matricula}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.periodo}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{aluno.instituicao}</td>
                  <td className='px-6 py-4'>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => onVerHistorico?.(aluno)}
                        className='px-3 py-1 text-xs text-white bg-[#237EE6] rounded hover:shadow-md transition-all flex items-center gap-1'
                        title='Ver histórico'
                      >
                        <FiClipboard size={14} /> Histórico
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {alunosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5} className='px-6 py-8 text-center text-gray-600'>Nenhum aluno encontrado com os filtros atuais.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
