import { FiFileText, FiCheckCircle, FiAlertCircle, FiUpload, FiDownload, FiEye, FiClock } from 'react-icons/fi'

export default function Documentos() {
  // Mock de documentos
  const documentosEnviados = [
    {
      id: 1,
      nome: 'Termo de Compromisso',
      tipo: 'Obrigatório',
      dataEnvio: '2025-01-15',
      status: 'Aprovado',
      tamanho: '245 KB',
      formato: 'PDF'
    },
    {
      id: 2,
      nome: 'Comprovante de Seguro',
      tipo: 'Obrigatório',
      dataEnvio: '2025-01-18',
      status: 'Aprovado',
      tamanho: '189 KB',
      formato: 'PDF'
    },
    {
      id: 3,
      nome: 'Atestado Médico',
      tipo: 'Obrigatório',
      dataEnvio: '2025-01-20',
      status: 'Em Análise',
      tamanho: '312 KB',
      formato: 'PDF'
    },
    {
      id: 4,
      nome: 'Carteira de Vacinação - COVID-19',
      tipo: 'Vacinação',
      dataEnvio: '2025-01-10',
      status: 'Aprovado',
      tamanho: '456 KB',
      formato: 'PDF'
    },
    {
      id: 5,
      nome: 'Comprovante - Hepatite B',
      tipo: 'Vacinação',
      dataEnvio: '2025-01-10',
      status: 'Aprovado',
      tamanho: '378 KB',
      formato: 'PDF'
    }
  ]

  const documentosPendentes = [
    {
      id: 6,
      nome: 'Comprovante de Vacinação - Tétano',
      tipo: 'Vacinação',
      prazo: '2025-02-15',
      obrigatorio: true,
      descricao: 'Enviar comprovante da última dose da vacina contra o tétano'
    },
    {
      id: 7,
      nome: 'Comprovante de Vacinação - Influenza',
      tipo: 'Vacinação',
      prazo: '2025-02-20',
      obrigatorio: true,
      descricao: 'Enviar comprovante da vacinação anual contra gripe (influenza)'
    },
    {
      id: 8,
      nome: 'Declaração de Matrícula Atualizada',
      tipo: 'Obrigatório',
      prazo: '2025-02-10',
      obrigatorio: true,
      descricao: 'Declaração de matrícula do semestre atual emitida pela instituição'
    },
    {
      id: 9,
      nome: 'Foto 3x4 Recente',
      tipo: 'Obrigatório',
      prazo: '2025-02-28',
      obrigatorio: true,
      descricao: 'Foto recente para crachá de identificação no local de estágio'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-[#10E686]/20 text-[#10E686]'
      case 'Em Análise':
        return 'bg-yellow-100 text-yellow-700'
      case 'Rejeitado':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Aprovado':
        return <FiCheckCircle size={16} />
      case 'Em Análise':
        return <FiClock size={16} />
      case 'Rejeitado':
        return <FiAlertCircle size={16} />
      default:
        return null
    }
  }

  const diasRestantes = (prazo) => {
    const hoje = new Date()
    const dataPrazo = new Date(prazo)
    const diff = Math.ceil((dataPrazo - hoje) / (1000 * 60 * 60 * 24))
    return diff
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
          <FiFileText size={32} /> Meus Documentos
        </h2>
        <div className='flex gap-2'>
          <span className='px-4 py-2 bg-[#10E686]/20 text-[#10E686] rounded-lg text-sm font-semibold'>
            {documentosEnviados.filter(d => d.status === 'Aprovado').length} Aprovados
          </span>
          <span className='px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold'>
            {documentosPendentes.length} Pendentes
          </span>
        </div>
      </div>

      {/* Documentos Pendentes - Prioridade */}
      {documentosPendentes.length > 0 && (
        <div className='bg-white rounded-2xl shadow-md p-6'>
          <div className='flex items-center gap-2 mb-6'>
            <FiAlertCircle size={24} className='text-red-500' />
            <h3 className='text-xl font-bold text-gray-900'>Documentos Pendentes</h3>
            <span className='px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold'>
              {documentosPendentes.length} documento{documentosPendentes.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className='space-y-4'>
            {documentosPendentes.map((doc) => {
              const dias = diasRestantes(doc.prazo)
              const isUrgente = dias <= 7

              return (
                <div
                  key={doc.id}
                  className={`p-5 border-2 rounded-xl transition-all duration-300 ${
                    isUrgente ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-[#237EE6]'
                  }`}
                >
                  <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4'>
                    <div className='flex-1'>
                      <div className='flex items-start gap-3 mb-2'>
                        <FiFileText size={24} className='text-[#237EE6] mt-1' />
                        <div>
                          <h4 className='font-bold text-gray-900 text-lg'>{doc.nome}</h4>
                          <p className='text-sm text-gray-600 mt-1'>{doc.descricao}</p>
                          <div className='flex items-center gap-4 mt-3'>
                            <span className='px-3 py-1 bg-[#237EE6]/10 text-[#237EE6] rounded-lg text-xs font-semibold'>
                              {doc.tipo}
                            </span>
                            <span className={`text-sm font-semibold flex items-center gap-1 ${
                              isUrgente ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              <FiClock size={14} />
                              Prazo: {new Date(doc.prazo).toLocaleDateString('pt-BR')}
                              {isUrgente && ` (${dias} dia${dias !== 1 ? 's' : ''})`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap'>
                      <FiUpload size={18} />
                      Enviar Documento
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Documentos Enviados */}
      <div className='bg-white rounded-2xl shadow-md p-6'>
        <div className='flex items-center gap-2 mb-6'>
          <FiCheckCircle size={24} className='text-[#10E686]' />
          <h3 className='text-xl font-bold text-gray-900'>Documentos Enviados</h3>
          <span className='px-3 py-1 bg-[#10E686]/20 text-[#10E686] rounded-lg text-xs font-semibold'>
            {documentosEnviados.length} documento{documentosEnviados.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Filtros por categoria */}
        <div className='flex flex-wrap gap-2 mb-6'>
          <button className='px-4 py-2 bg-[#237EE6] text-white font-semibold rounded-lg text-sm'>
            Todos ({documentosEnviados.length})
          </button>
          <button className='px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-200 transition-colors'>
            Obrigatórios ({documentosEnviados.filter(d => d.tipo === 'Obrigatório').length})
          </button>
          <button className='px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-200 transition-colors'>
            Vacinação ({documentosEnviados.filter(d => d.tipo === 'Vacinação').length})
          </button>
        </div>

        {/* Lista de documentos enviados */}
        <div className='space-y-3'>
          {documentosEnviados.map((doc) => (
            <div
              key={doc.id}
              className='flex flex-col md:flex-row md:items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-[#237EE6] transition-all duration-300'
            >
              <div className='flex items-center gap-4 flex-1'>
                <div className='p-3 bg-[#237EE6]/10 rounded-lg'>
                  <FiFileText size={24} className='text-[#237EE6]' />
                </div>
                <div className='flex-1'>
                  <h4 className='font-bold text-gray-900'>{doc.nome}</h4>
                  <div className='flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600'>
                    <span className='flex items-center gap-1'>
                      <FiClock size={14} />
                      Enviado: {new Date(doc.dataEnvio).toLocaleDateString('pt-BR')}
                    </span>
                    <span>• {doc.tamanho}</span>
                    <span>• {doc.formato}</span>
                    <span className='px-2 py-1 bg-[#237EE6]/10 text-[#237EE6] rounded text-xs font-semibold'>
                      {doc.tipo}
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-3 mt-4 md:mt-0'>
                <span className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 ${getStatusColor(doc.status)}`}>
                  {getStatusIcon(doc.status)}
                  {doc.status}
                </span>
                <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'>
                  <FiEye size={20} className='text-gray-700' />
                </button>
                <button className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'>
                  <FiDownload size={20} className='text-gray-700' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Informações importantes */}
      <div className='bg-blue-50 border-2 border-blue-200 rounded-2xl p-6'>
        <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
          <FiAlertCircle size={20} className='text-blue-600' />
          Informações Importantes sobre Documentos
        </h4>
        <ul className='space-y-2 text-sm text-gray-700'>
          <li className='flex items-start gap-2'>
            <span className='text-blue-600 mt-1'>•</span>
            <span>Todos os documentos devem estar em formato <strong>PDF</strong> e com tamanho máximo de <strong>5MB</strong></span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-blue-600 mt-1'>•</span>
            <span>Documentos de vacinação devem conter carimbo e assinatura do profissional de saúde</span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-blue-600 mt-1'>•</span>
            <span>O prazo de análise dos documentos é de até <strong>3 dias úteis</strong></span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-blue-600 mt-1'>•</span>
            <span>Mantenha seus comprovantes de vacinação sempre atualizados para garantir a segurança no ambiente de estágio</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
