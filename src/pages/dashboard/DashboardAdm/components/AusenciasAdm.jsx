const AusenciasAdm = ({ justificativas }) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900'>Gestão de Ausências</h2>
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200 bg-gray-50'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Data Falta</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Tipo</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Descrição</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Reposição</th>
              </tr>
            </thead>
            <tbody>
              {justificativas.map((just) => (
                <tr key={just.id_justificativa} className='border-b border-gray-200 hover:bg-[#F5F7FA]'>
                  <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{just.aluno}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{just.data_falta}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{just.tipo}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{just.descricao}</td>
                  <td className='px-6 py-4'><span className={`px-3 py-1 rounded-lg text-xs font-semibold ${just.status === 'Aprovada' ? 'bg-[#10E686]/20 text-[#10E686]' : 'bg-yellow-100 text-yellow-700'}`}>{just.status}</span></td>
                  <td className='px-6 py-4 text-sm'>{just.requer_reposicao ? `${just.horas_reposicao}h` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AusenciasAdm
