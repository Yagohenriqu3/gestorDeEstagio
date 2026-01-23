const AvaliacoesAdm = ({ avaliacoes }) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-gray-900'>Avaliações de Alunos</h2>
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-200 bg-gray-50'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Componente</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Nota</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Avaliador</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Situação</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {avaliacoes.map((av) => (
                <tr key={av.id_avaliacao} className='border-b border-gray-200 hover:bg-[#F5F7FA]'>
                  <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{av.aluno}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{av.componente}</td>
                  <td className='px-6 py-4 text-sm font-semibold'>{av.nota ? av.nota.toFixed(1) : '-'}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{av.avaliador}</td>
                  <td className='px-6 py-4'><span className={`px-3 py-1 rounded-lg text-xs font-semibold ${av.situacao === 'Realizada' ? 'bg-[#10E686]/20 text-[#10E686]' : 'bg-yellow-100 text-yellow-700'}`}>{av.situacao}</span></td>
                  <td className='px-6 py-4 text-sm text-gray-700'>{av.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AvaliacoesAdm
