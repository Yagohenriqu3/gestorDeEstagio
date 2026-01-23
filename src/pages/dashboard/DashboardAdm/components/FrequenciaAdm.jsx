const FrequenciaAdm = ({ frequenciaResumo }) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900'>Resumo de Frequência</h2>
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200 bg-gray-50'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Registros</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Presenças</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Faltas</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
              </tr>
            </thead>
            <tbody>
              {frequenciaResumo.map((freq) => (
                <tr key={freq.id_aluno} className='border-b border-gray-200 hover:bg-[#F5F7FA]'>
                  <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{freq.aluno}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{freq.total_registros}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{freq.presencas}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{freq.faltas}</td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-16 bg-gray-200 rounded-full h-2'>
                        <div className='bg-linear-to-r from-[#10E686] to-[#60E6D7] h-2 rounded-full' style={{width: `${freq.frequencia_pct}%`}}></div>
                      </div>
                      <span className='text-sm font-semibold'>{freq.frequencia_pct.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className='px-6 py-4'><span className={`px-3 py-1 rounded-lg text-xs font-semibold ${freq.status === 'OK' ? 'bg-[#10E686]/20 text-[#10E686]' : 'bg-orange-100 text-orange-700'}`}>{freq.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FrequenciaAdm
