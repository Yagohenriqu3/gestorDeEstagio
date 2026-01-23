import { useState } from 'react'
import { FiUser, FiClipboard, FiBarChart2, FiX, FiAlertCircle, FiLock, FiEdit2 } from 'react-icons/fi'

export default function DadosCadastrais({ aluno }) {
  const [modalAberto, setModalAberto] = useState(false)
  const [dadosEditaveis, setDadosEditaveis] = useState({
    email: aluno.email,
    telefone: aluno.telefone,
    rg: aluno.rg
  })

  const handleChange = (campo, valor) => {
    setDadosEditaveis({
      ...dadosEditaveis,
      [campo]: valor
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você enviaria os dados para o backend
    console.log('Solicitação de alteração:', dadosEditaveis)
    alert('Solicitação de alteração enviada com sucesso! Aguarde a análise do coordenador.')
    setModalAberto(false)
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900'>👤 Dados Cadastrais</h2>
      
      {/* Informações Pessoais */}
      <div className='bg-white rounded-2xl shadow-md p-6'>
        <h3 className='text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
          <FiUser size={24} className='text-[#237EE6]' />
          Informações Pessoais
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Nome Completo</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.nome}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Matrícula</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.matricula}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>CPF</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.cpf}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>RG</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.rg}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Data de Nascimento</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.data_nascimento}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Situação</p>
            <span className='inline-block px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-sm font-semibold'>
              {aluno.situacao}
            </span>
          </div>
        </div>
      </div>

      {/* Informações de Contato */}
      <div className='bg-white rounded-2xl shadow-md p-6'>
        <h3 className='text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
          <FiClipboard size={24} className='text-[#237EE6]' />
          Contato
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <p className='text-sm text-gray-600 mb-1'>E-mail Institucional</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.email}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Telefone</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.telefone}</p>
          </div>
        </div>
      </div>

      {/* Informações Acadêmicas */}
      <div className='bg-white rounded-2xl shadow-md p-6'>
        <h3 className='text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
          <FiBarChart2 size={24} className='text-[#237EE6]' />
          Informações Acadêmicas
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Unidade</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.unidade}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Curso</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.curso}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Período Atual</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.periodo}º Período</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Turno</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.turno}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Data de Ingresso</p>
            <p className='text-base font-semibold text-gray-900'>{aluno.data_ingresso}</p>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Frequência Geral</p>
            <p className='text-base font-semibold text-[#237EE6]'>{aluno.frequencia_percentual}%</p>
          </div>
        </div>
      </div>

      {/* Botão de Editar */}
      <div className='flex justify-end'>
        <button 
          onClick={() => setModalAberto(true)}
          className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2'
        >
          <FiEdit2 size={20} />
          Solicitar Alteração de Dados
        </button>
      </div>

      {/* Modal de Alteração */}
      {modalAberto && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            {/* Header do Modal */}
            <div className='sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
                <FiEdit2 size={28} className='text-[#237EE6]' />
                Solicitar Alteração de Dados
              </h2>
              <button
                onClick={() => setModalAberto(false)}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <FiX size={24} className='text-gray-600' />
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className='p-8 space-y-8'>
              {/* Alerta de Informações Imutáveis */}
              <div className='bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex gap-3'>
                <FiAlertCircle size={24} className='text-blue-600 shrink-0 mt-1' />
                <div>
                  <p className='font-semibold text-gray-900 mb-1'>Atenção</p>
                  <p className='text-sm text-gray-700'>
                    Campos com cadeado <FiLock className='inline' size={12} /> são <strong>dados imutáveis</strong> e não podem ser alterados. 
                    Alterações solicitadas serão analisadas pelo coordenador.
                  </p>
                </div>
              </div>

              {/* Informações Pessoais */}
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <FiUser size={20} className='text-[#237EE6]' />
                  Informações Pessoais
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* Nome Completo - Imutável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      Nome Completo <FiLock size={12} className='text-gray-400' />
                    </label>
                    <input
                      type='text'
                      value={aluno.nome}
                      disabled
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed'
                    />
                  </div>

                  {/* Matrícula - Imutável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      Matrícula <FiLock size={12} className='text-gray-400' />
                    </label>
                    <input
                      type='text'
                      value={aluno.matricula}
                      disabled
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed'
                    />
                  </div>

                  {/* CPF - Imutável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      CPF <FiLock size={12} className='text-gray-400' />
                    </label>
                    <input
                      type='text'
                      value={aluno.cpf}
                      disabled
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed'
                    />
                  </div>

                  {/* RG - Editável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      RG <span className='text-[#237EE6] text-xs'>(editável)</span>
                    </label>
                    <input
                      type='text'
                      value={dadosEditaveis.rg}
                      onChange={(e) => handleChange('rg', e.target.value)}
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                    />
                  </div>

                  {/* Data de Nascimento - Imutável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      Data de Nascimento <FiLock size={12} className='text-gray-400' />
                    </label>
                    <input
                      type='text'
                      value={aluno.data_nascimento}
                      disabled
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed'
                    />
                  </div>
                </div>
              </div>

              {/* Informações de Contato */}
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <FiClipboard size={20} className='text-[#237EE6]' />
                  Contato
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* E-mail - Editável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      E-mail Institucional <span className='text-[#237EE6] text-xs'>(editável)</span>
                    </label>
                    <input
                      type='email'
                      value={dadosEditaveis.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                    />
                  </div>

                  {/* Telefone - Editável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      Telefone <span className='text-[#237EE6] text-xs'>(editável)</span>
                    </label>
                    <input
                      type='tel'
                      value={dadosEditaveis.telefone}
                      onChange={(e) => handleChange('telefone', e.target.value)}
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none'
                    />
                  </div>
                </div>
              </div>

              {/* Informações Acadêmicas - Todas Imutáveis */}
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                  <FiBarChart2 size={20} className='text-[#237EE6]' />
                  Informações Acadêmicas
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* Unidade - Imutável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      Unidade <FiLock size={12} className='text-gray-400' />
                    </label>
                    <input
                      type='text'
                      value={aluno.unidade}
                      disabled
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed'
                    />
                  </div>

                  {/* Curso - Imutável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      Curso <FiLock size={12} className='text-gray-400' />
                    </label>
                    <input
                      type='text'
                      value={aluno.curso}
                      disabled
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed'
                    />
                  </div>

                  {/* Período - Imutável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      Período Atual <FiLock size={12} className='text-gray-400' />
                    </label>
                    <input
                      type='text'
                      value={`${aluno.periodo}º Período`}
                      disabled
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed'
                    />
                  </div>

                  {/* Turno - Imutável */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      Turno <FiLock size={12} className='text-gray-400' />
                    </label>
                    <input
                      type='text'
                      value={aluno.turno}
                      disabled
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed'
                    />
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Observações (opcional)
                </label>
                <textarea
                  rows='4'
                  placeholder='Adicione observações sobre as alterações solicitadas...'
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#237EE6] focus:outline-none resize-none'
                />
              </div>

              {/* Botões de Ação */}
              <div className='flex gap-4 justify-end pt-4 border-t border-gray-200'>
                <button
                  type='button'
                  onClick={() => setModalAberto(false)}
                  className='px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='px-8 py-3 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'
                >
                  <FiEdit2 size={20} />
                  Enviar Solicitação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
