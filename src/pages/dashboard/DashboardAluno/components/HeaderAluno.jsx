import { useState } from 'react'
import { FiHome, FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../hooks/useAuth'

export default function HeaderAluno({ aluno }) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [mostrarModalSair, setMostrarModalSair] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const confirmarLogout = () => {
    setMostrarModalSair(false)
    handleLogout()
  }

  return (
    <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2'>
              <FiHome size={36} /> Bem-vindo, {aluno.nome.split(' ')[0]}!
            </h1>
            <p className='text-blue-100 text-sm lg:text-base'>
              Matrícula: {aluno.matricula} • Período: {aluno.periodo}º
            </p>
          </div>
          <div className='flex gap-4 items-center'>
            <div className='bg-white/20 backdrop-blur rounded-xl px-6 py-3'>
              <p className='text-blue-100 text-sm'>Frequência</p>
              <p className='text-2xl font-bold'>{aluno.frequencia_percentual}%</p>
            </div>
            <div className='bg-white/20 backdrop-blur rounded-xl px-6 py-3'>
              <p className='text-blue-100 text-sm'>Meus Horários</p>
              <p className='text-2xl font-bold'>{aluno.vagas_ativas}</p>
            </div>
            <button
              onClick={() => setMostrarModalSair(true)}
              className='bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors duration-200'
              title='Sair da conta'
            >
              <FiLogOut size={20} />
              <span className='hidden sm:inline'>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Logout */}
      {mostrarModalSair && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4'>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Tem certeza?</h3>
            <p className='text-gray-600 mb-6'>Você realmente deseja sair da aplicação?</p>
            <div className='flex gap-3 justify-end'>
              <button
                onClick={() => setMostrarModalSair(false)}
                className='px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg font-semibold transition-colors'
              >
                Cancelar
              </button>
              <button
                onClick={confirmarLogout}
                className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors'
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
