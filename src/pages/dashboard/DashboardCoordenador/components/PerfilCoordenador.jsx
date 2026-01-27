import { useState } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2, FiSave, FiX } from 'react-icons/fi'

export default function PerfilCoordenador({ coordenador }) {
  const [modoEdicao, setModoEdicao] = useState(false)
  const [dadosEditados, setDadosEditados] = useState({ ...coordenador })

  const handleSalvar = () => {
    // Aqui você implementaria a lógica de salvar no backend
    console.log('Salvando dados:', dadosEditados)
    setModoEdicao(false)
    alert('Dados atualizados com sucesso!')
  }

  const handleCancelar = () => {
    setDadosEditados({ ...coordenador })
    setModoEdicao(false)
  }

  return (
    <div className='space-y-6'>
      {/* Cabeçalho */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2'>
            <FiUser size={28} /> Perfil do Coordenador
          </h2>
          <p className='text-gray-600 mt-1'>Gerencie suas informações pessoais e de contato</p>
        </div>
        {!modoEdicao ? (
          <button
            onClick={() => setModoEdicao(true)}
            className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2'
          >
            <FiEdit2 size={18} /> Editar
          </button>
        ) : (
          <div className='flex gap-2'>
            <button
              onClick={handleCancelar}
              className='bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center gap-2'
            >
              <FiX size={18} /> Cancelar
            </button>
            <button
              onClick={handleSalvar}
              className='bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-gray-900 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2'
            >
              <FiSave size={18} /> Salvar
            </button>
          </div>
        )}
      </div>

      {/* Card de Informações */}
      <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6'>
        {/* Foto e Nome */}
        <div className='flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-gray-200'>
          <div className='w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#237EE6] to-[#60C9E6] flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg'>
            {coordenador.nome?.charAt(0).toUpperCase()}
          </div>
          <div className='text-center md:text-left'>
            <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>{coordenador.nome}</h3>
            <p className='text-lg text-gray-600 mt-1'>{coordenador.cargo || 'Coordenador(a) de Estágios'}</p>
            <div className='flex items-center justify-center md:justify-start gap-2 mt-2'>
              <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold'>
                Ativo
              </span>
            </div>
          </div>
        </div>

        {/* Informações Pessoais */}
        <div>
          <h4 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <FiUser size={20} /> Informações Pessoais
          </h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Nome Completo */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Nome Completo</label>
              {modoEdicao ? (
                <input
                  type='text'
                  value={dadosEditados.nome || ''}
                  onChange={(e) => setDadosEditados({ ...dadosEditados, nome: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                />
              ) : (
                <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.nome}</p>
              )}
            </div>

            {/* CPF */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>CPF</label>
              <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.cpf}</p>
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <FiCalendar size={16} /> Data de Nascimento
              </label>
              {modoEdicao ? (
                <input
                  type='date'
                  value={dadosEditados.data_nascimento || ''}
                  onChange={(e) => setDadosEditados({ ...dadosEditados, data_nascimento: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                />
              ) : (
                <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>
                  {coordenador.data_nascimento ? new Date(coordenador.data_nascimento).toLocaleDateString('pt-BR') : '-'}
                </p>
              )}
            </div>

            {/* RG */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>RG</label>
              {modoEdicao ? (
                <input
                  type='text'
                  value={dadosEditados.rg || ''}
                  onChange={(e) => setDadosEditados({ ...dadosEditados, rg: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                />
              ) : (
                <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.rg || '-'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Informações de Contato */}
        <div>
          <h4 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <FiMail size={20} /> Informações de Contato
          </h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Email */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <FiMail size={16} /> Email
              </label>
              {modoEdicao ? (
                <input
                  type='email'
                  value={dadosEditados.email || ''}
                  onChange={(e) => setDadosEditados({ ...dadosEditados, email: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                />
              ) : (
                <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.email}</p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <FiPhone size={16} /> Telefone
              </label>
              {modoEdicao ? (
                <input
                  type='tel'
                  value={dadosEditados.telefone || ''}
                  onChange={(e) => setDadosEditados({ ...dadosEditados, telefone: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                  placeholder='(XX) XXXXX-XXXX'
                />
              ) : (
                <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.telefone || '-'}</p>
              )}
            </div>

            {/* Celular */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <FiPhone size={16} /> Celular
              </label>
              {modoEdicao ? (
                <input
                  type='tel'
                  value={dadosEditados.celular || ''}
                  onChange={(e) => setDadosEditados({ ...dadosEditados, celular: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                  placeholder='(XX) XXXXX-XXXX'
                />
              ) : (
                <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.celular || '-'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div>
          <h4 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <FiMapPin size={20} /> Endereço
          </h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* CEP */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>CEP</label>
              {modoEdicao ? (
                <input
                  type='text'
                  value={dadosEditados.cep || ''}
                  onChange={(e) => setDadosEditados({ ...dadosEditados, cep: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                  placeholder='XXXXX-XXX'
                />
              ) : (
                <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.cep || '-'}</p>
              )}
            </div>

            {/* Cidade */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Cidade</label>
              {modoEdicao ? (
                <input
                  type='text'
                  value={dadosEditados.cidade || ''}
                  onChange={(e) => setDadosEditados({ ...dadosEditados, cidade: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                />
              ) : (
                <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.cidade || '-'}</p>
              )}
            </div>

            {/* Endereço Completo */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Endereço Completo</label>
              {modoEdicao ? (
                <input
                  type='text'
                  value={dadosEditados.endereco || ''}
                  onChange={(e) => setDadosEditados({ ...dadosEditados, endereco: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
                  placeholder='Rua, número, complemento'
                />
              ) : (
                <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.endereco || '-'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Informações Institucionais */}
        <div>
          <h4 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
            <FiUser size={20} /> Informações Institucionais
          </h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Instituição */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Instituição</label>
              <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.instituicao}</p>
            </div>

            {/* Unidade */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Unidade</label>
              <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.unidade}</p>
            </div>

            {/* Cargo */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Cargo</label>
              <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>{coordenador.cargo || 'Coordenador(a) de Estágios'}</p>
            </div>

            {/* Data de Admissão */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Data de Admissão</label>
              <p className='text-gray-900 bg-gray-50 px-4 py-2 rounded-lg'>
                {coordenador.data_admissao ? new Date(coordenador.data_admissao).toLocaleDateString('pt-BR') : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
