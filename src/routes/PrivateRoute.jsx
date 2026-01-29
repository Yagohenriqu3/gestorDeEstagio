import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function PrivateRoute({ children, tiposPermitidos = [] }) {
  const { usuario, carregando, estaAutenticado } = useAuth()

  if (carregando) {
    return (
      <div className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#237EE6] to-[#1e5fa8]'>
        <div className='text-center'>
          <div className='animate-spin mb-4'>
            <div className='w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto'></div>
          </div>
          <p className='text-white font-semibold'>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!estaAutenticado()) {
    return <Navigate to='/' replace />
  }

  // Verificar se usuário tem permissão para acessar a rota
  if (tiposPermitidos.length > 0 && !tiposPermitidos.includes(usuario?.tipoUsuario)) {
    return (
      <div className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#237EE6] to-[#1e5fa8]'>
        <div className='bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center'>
          <div className='text-5xl mb-4'>🔒</div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Acesso Negado</h1>
          <p className='text-gray-600 mb-6'>
            Você não tem permissão para acessar esta página. Seu perfil é: <strong>{usuario?.tipoUsuario}</strong>
          </p>
          <a
            href='/'
            className='inline-block bg-gradient-to-r from-[#237EE6] to-[#1e5fa8] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300'
          >
            Voltar ao Login
          </a>
        </div>
      </div>
    )
  }

  return children
}
