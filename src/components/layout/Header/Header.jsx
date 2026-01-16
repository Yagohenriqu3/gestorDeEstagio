import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const location = useLocation()
  const [menuAberto, setMenuAberto] = useState(false)

  const links = [
    { path: '/', label: '🔐 Login', icon: '🔐' },
    { path: '/aluno', label: '👨‍🎓 Aluno', icon: '👨‍🎓' },
    { path: '/coordenador', label: '📊 Coordenador', icon: '📊' },
    { path: '/gestor-local', label: '📚 Gestor Local', icon: '📚' },
    { path: '/preceptor', label: '👨‍⚕️ Preceptor', icon: '👨‍⚕️' },
    { path: '/adm', label: '�️ Administrador', icon: '�️' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className='bg-gradient-to-r from-[#237EE6] to-[#60C9E6] shadow-lg sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6 lg:px-12'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo / Nome do Sistema */}
          <Link to='/' className='flex items-center gap-3 group'>
            <div className='bg-white/20 backdrop-blur p-2 rounded-lg group-hover:bg-white/30 transition-all duration-300'>
              <span className='text-2xl'>🎓</span>
            </div>
            <div className='hidden md:block'>
              <h1 className='text-white font-bold text-xl'>ConectaEstágio</h1>
              <p className='text-blue-100 text-xs'>Sistema de Controle</p>
            </div>
          </Link>

          {/* Menu Desktop */}
          <nav className='hidden lg:flex items-center gap-2'>
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-white text-[#237EE6] shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <span className='mr-2'>{link.icon}</span>
                {link.label.split(' ')[1]}
              </Link>
            ))}
          </nav>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className='lg:hidden bg-white/20 backdrop-blur hover:bg-white/30 text-white p-2 rounded-lg transition-all duration-300'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {menuAberto ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {menuAberto && (
          <div className='lg:hidden pb-4 animate-fadeIn'>
            <nav className='flex flex-col gap-2'>
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuAberto(false)}
                  className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-white text-[#237EE6] shadow-md'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Badge de Desenvolvimento */}
      <div className='bg-yellow-500 text-yellow-900 text-center py-1 px-4'>
        <p className='text-xs font-semibold'>
          ⚠️ Modo Desenvolvimento - Menu de Navegação Temporário
        </p>
      </div>
    </header>
  )
}
