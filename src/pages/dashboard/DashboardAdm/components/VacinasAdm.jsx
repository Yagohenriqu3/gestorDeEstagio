const VacinasAdm = ({ vacinasObrigatorias, registroVacinas }) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900'>Gestão de Vacinas</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <h3 className='text-xl font-bold text-gray-900'>Vacinas Obrigatórias</h3>
          <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b-2 border-gray-200 bg-gray-50'>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-gray-900'>Vacina</th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-gray-900'>Doses</th>
                  </tr>
                </thead>
                <tbody>
                  {vacinasObrigatorias.map((vac) => (
                    <tr key={vac.id_vacina} className='border-b border-gray-200 hover:bg-[#F5F7FA]'>
                      <td className='px-4 py-3 text-sm font-semibold text-gray-900'>{vac.nome}</td>
                      <td className='px-4 py-3 text-sm text-gray-700'>{vac.doses_necessarias}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='space-y-4'>
          <h3 className='text-xl font-bold text-gray-900'>Conformidade por Aluno</h3>
          <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b-2 border-gray-200 bg-gray-50'>
                    <th className='px-4 py-3 text-left text-xs font-semibold text-gray-900'>Aluno</th>
                    <th className='px-4 py-3 text-left text-xs font-semibold text-gray-900'>Vacina</th>
                    <th className='px-4 py-3 text-left text-xs font-semibold text-gray-900'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {registroVacinas.map((reg, idx) => (
                    <tr key={idx} className='border-b border-gray-200 hover:bg-[#F5F7FA]'>
                      <td className='px-4 py-3 text-xs font-semibold text-gray-900'>{reg.aluno}</td>
                      <td className='px-4 py-3 text-xs text-gray-700'>{reg.vacina}</td>
                      <td className='px-4 py-3'><span className={`px-2 py-1 rounded text-xs font-semibold ${reg.status === 'Completo' ? 'bg-[#10E686]/20 text-[#10E686]' : 'bg-orange-100 text-orange-700'}`}>{reg.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VacinasAdm
