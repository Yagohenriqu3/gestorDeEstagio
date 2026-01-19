import { FiUpload, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { useState } from 'react'

export default function ImportacaoCSVAdm() {
  const [arquivo, setArquivo] = useState(null)
  const [resultados, setResultados] = useState(null)
  const [carregando, setCarregando] = useState(false)

  const handleArquivo = (e) => {
    const file = e.target.files[0]
    if (file) {
      setArquivo(file)
    }
  }

  const handleImportar = async () => {
    if (!arquivo) return

    setCarregando(true)
    // Simular processamento
    setTimeout(() => {
      setResultados({
        total: 150,
        sucesso: 145,
        erros: 5,
        detalhes: [
          { linha: 2, aluno: 'João Silva', matricula: '202401001', status: 'sucesso', mensagem: 'Aluno importado com sucesso' },
          { linha: 3, aluno: 'Maria Santos', matricula: '202401002', status: 'sucesso', mensagem: 'Aluno importado com sucesso' },
          { linha: 15, aluno: 'Ana Costa', matricula: '202401015', status: 'erro', mensagem: 'Matrícula já existe no sistema' },
          { linha: 42, aluno: 'Carlos Oliveira', matricula: '202401042', status: 'erro', mensagem: 'E-mail inválido' },
          { linha: 89, aluno: 'Pedro Lima', matricula: '202401089', status: 'erro', mensagem: 'Unidade não encontrada' }
        ]
      })
      setCarregando(false)
    }, 2000)
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-2'><FiUpload size={32} /> Importação de Alunos (CSV)</h2>

      <div className='bg-white rounded-2xl shadow-md p-8'>
        {/* Seção de Upload */}
        <div className='mb-8'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>1. Selecione o arquivo CSV</h3>
          <div className='border-2 border-dashed border-[#237EE6] rounded-xl p-8 text-center hover:bg-[#F5F7FA] transition-colors cursor-pointer'>
            <div className='flex flex-col items-center gap-3'>
              <FiUpload size={40} className='text-[#237EE6]' />
              <div>
                <p className='text-lg font-semibold text-gray-900'>Arraste o arquivo ou clique para selecionar</p>
                <p className='text-sm text-gray-600 mt-1'>Formato: CSV • Tamanho máximo: 10MB</p>
              </div>
              <input
                type='file'
                accept='.csv'
                onChange={handleArquivo}
                className='hidden'
                id='csv-input'
              />
              <label htmlFor='csv-input' className='mt-4 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all cursor-pointer'>
                Selecionar Arquivo
              </label>
            </div>
            {arquivo && (
              <div className='mt-4 text-sm text-[#10E686] font-semibold flex items-center justify-center gap-2'>
                <FiCheckCircle size={18} /> {arquivo.name}
              </div>
            )}
          </div>
        </div>

        {/* Modelo de Planilha */}
        <div className='mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <h4 className='font-semibold text-gray-900 mb-2'>Estrutura do arquivo CSV</h4>
          <p className='text-sm text-gray-700 mb-3'>O arquivo deve conter as seguintes colunas (nesta ordem):</p>
          <div className='bg-white rounded-lg p-3 text-sm font-mono text-gray-800 overflow-x-auto'>
            <code>
              matricula,nome,email,cpf,data_nascimento,periodo,unidade_id,curso_id,turno
            </code>
          </div>
          <button className='mt-3 text-[#237EE6] font-semibold text-sm hover:underline flex items-center gap-1'>
            📋 Baixar modelo de planilha
          </button>
        </div>

        {/* Botão de Importação */}
        <div className='flex gap-3 mb-8'>
          <button
            onClick={handleImportar}
            disabled={!arquivo || carregando}
            className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {carregando ? '⏳ Importando...' : '✓ Iniciar Importação'}
          </button>
          <button className='bg-white border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg hover:border-gray-400 transition-all'>
            Cancelar
          </button>
        </div>

        {/* Resultados */}
        {resultados && (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900'>2. Resultados da Importação</h3>

            {/* Resumo */}
            <div className='grid grid-cols-3 gap-4'>
              <div className='bg-[#10E686]/10 border border-[#10E686] rounded-lg p-4 text-center'>
                <p className='text-gray-600 text-sm'>Total Processado</p>
                <p className='text-2xl font-bold text-[#10E686] mt-1'>{resultados.total}</p>
              </div>
              <div className='bg-[#10E686]/10 border border-[#10E686] rounded-lg p-4 text-center'>
                <p className='text-gray-600 text-sm'>Sucesso</p>
                <p className='text-2xl font-bold text-[#10E686] mt-1'>{resultados.sucesso}</p>
              </div>
              <div className='bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-center'>
                <p className='text-gray-600 text-sm'>Erros</p>
                <p className='text-2xl font-bold text-yellow-600 mt-1'>{resultados.erros}</p>
              </div>
            </div>

            {/* Detalhes dos Erros */}
            {resultados.erros > 0 && (
              <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                  <FiAlertCircle size={18} className='text-yellow-600' />
                  Registros com erro ({resultados.erros})
                </h4>
                <div className='space-y-2 max-h-40 overflow-y-auto'>
                  {resultados.detalhes.filter(r => r.status === 'erro').map((detalhe, idx) => (
                    <div key={idx} className='text-sm p-2 bg-white rounded border border-yellow-200'>
                      <p className='font-semibold text-gray-900'>Linha {detalhe.linha}: {detalhe.aluno}</p>
                      <p className='text-yellow-700'>{detalhe.mensagem}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opções de Finalização */}
            <div className='flex gap-3 pt-4 border-t border-gray-200'>
              <button className='flex-1 bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all'>
                ✓ Confirmar Importação
              </button>
              <button className='flex-1 bg-white border-2 border-[#237EE6] text-[#237EE6] font-semibold px-6 py-2 rounded-lg hover:bg-[#F5F7FA] transition-all'>
                ↻ Fazer novo upload
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Histórico de Importações */}
      <div className='bg-white rounded-2xl shadow-md p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Histórico de Importações</h3>
        <div className='space-y-2'>
          {[
            { data: '2025-02-15', arquivo: 'turma_2024_1.csv', total: 120, sucesso: 120, por: 'Admin' },
            { data: '2025-02-10', arquivo: 'turma_2024_2.csv', total: 95, sucesso: 92, por: 'Coordenador' },
            { data: '2025-02-05', arquivo: 'turma_2024_especial.csv', total: 35, sucesso: 35, por: 'Admin' }
          ].map((hist, idx) => (
            <div key={idx} className='flex items-center justify-between p-3 bg-[#F5F7FA] rounded-lg'>
              <div>
                <p className='font-semibold text-gray-900'>{hist.arquivo}</p>
                <p className='text-xs text-gray-600'>{hist.data} • Por: {hist.por}</p>
              </div>
              <div className='text-right'>
                <p className='font-semibold text-gray-900'>{hist.sucesso}/{hist.total}</p>
                <p className='text-xs text-[#10E686] font-semibold'>✓ Sucesso</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
