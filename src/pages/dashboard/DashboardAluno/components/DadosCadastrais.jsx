import { FiUser, FiClipboard, FiBarChart2 } from 'react-icons/fi'

export default function DadosCadastrais({ aluno }) {
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
        <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
          <FiUser size={20} />
          Solicitar Alteração de Dados
        </button>
      </div>
    </div>
  )
}
