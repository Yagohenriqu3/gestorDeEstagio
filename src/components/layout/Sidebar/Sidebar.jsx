import { useState } from 'react'
import { 
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi'

export default function Sidebar({ abaSelecionada, setAbaSelecionada, menuItems, titulo = 'Gestor Estágio', subtitulo = 'v1.0.0', onMenuItemClick, onExpandChange }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [submenuAberto, setSubmenuAberto] = useState({})

  const toggleSubmenu = (itemId) => {
    setSubmenuAberto(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const handleItemClick = (itemId) => {
    if (onMenuItemClick) {
      onMenuItemClick(itemId)
    }
    setAbaSelecionada(itemId)
  }

  const handleToggleExpand = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    if (onExpandChange) {
      onExpandChange(newState)
    }
  }

  return (
    <aside 
      className={`
        hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-gray-200 
        transition-all duration-300 ease-in-out z-40
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      {/* Header com Logo */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {isExpanded ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#237EE6] to-[#60C9E6] flex items-center justify-center">
              <span className="text-white font-bold text-sm">GE</span>
            </div>
            <span className="font-semibold text-gray-800">Gestor Estágio</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#237EE6] to-[#60C9E6] flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">GE</span>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={handleToggleExpand}
        className={`
          absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-gray-300 rounded-full 
          flex items-center justify-center text-gray-600 hover:bg-[#237EE6] hover:text-white hover:border-[#237EE6]
          transition-all duration-200 shadow-md hover:shadow-lg
        `}
        title={isExpanded ? 'Recolher menu' : 'Expandir menu'}
      >
        {isExpanded ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
      </button>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((grupo, idx) => (
          <div key={idx} className="mb-6">
            {/* Categoria */}
            {isExpanded && (
              <div className="px-4 mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {grupo.categoria}
                </span>
              </div>
            )}
            
            {/* Items do grupo */}
            <div className={!isExpanded ? 'space-y-1' : ''}>
              {grupo.items.map((item) => {
                const Icon = item.icone
                const isActive = abaSelecionada === item.id
                const hasSubmenu = item.submenu && item.submenu.length > 0
                const isSubmenuOpen = submenuAberto[item.id]
                const isAnySubmenuActive = hasSubmenu && item.submenu.some(sub => abaSelecionada === sub.id)
                
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        handleItemClick(item.id)
                        if (hasSubmenu) {
                          toggleSubmenu(item.id)
                        }
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200
                        ${isActive || isAnySubmenuActive
                          ? 'bg-[#237EE6] text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-[#237EE6]'
                        }
                        ${!isExpanded && 'justify-center px-2'}
                      `}
                      title={!isExpanded ? item.nome : ''}
                    >
                      <Icon size={20} className={isActive || isAnySubmenuActive ? 'text-white' : ''} />
                      {isExpanded && (
                        <>
                          <span className="text-sm font-medium flex-1">{item.nome}</span>
                          {hasSubmenu && (
                            isSubmenuOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />
                          )}
                        </>
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {hasSubmenu && isExpanded && isSubmenuOpen && (
                      <div className="bg-gray-50">
                        {item.submenu.map((subitem) => {
                          const SubIcon = subitem.icone
                          const isSubActive = abaSelecionada === subitem.id
                          
                          return (
                            <button
                              key={subitem.id}
                              onClick={() => handleItemClick(subitem.id)}
                              className={`
                                w-full flex items-center gap-3 pl-12 pr-4 py-2 text-left transition-all duration-200
                                ${isSubActive
                                  ? 'bg-[#237EE6] text-white' 
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-[#237EE6]'
                                }
                              `}
                            >
                              <SubIcon size={16} className={isSubActive ? 'text-white' : ''} />
                              <span className="text-sm">{subitem.nome}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {/* Separador entre categorias quando colapsado */}
            {!isExpanded && idx < menuItems.length - 1 && (
              <div className="my-3 mx-auto w-8 h-px bg-gray-200" />
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {isExpanded ? (
          <div className="text-xs text-gray-500 text-center">
            <p>{titulo}</p>
            <p className="mt-1 text-[10px]">{subtitulo}</p>
          </div>
        ) : (
          <div className="text-[10px] text-gray-400 text-center">
            {subtitulo.split('.')[0]}
          </div>
        )}
      </div>
    </aside>
  )
}
