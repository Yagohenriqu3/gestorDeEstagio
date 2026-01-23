export default function MeusHorarios({ vagas }) {
  return (
    <div className='space-y-4 md:space-y-6'>
      <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>📅 Meus Horários</h2>
      
      {/* Quadro de Horários */}
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='p-4 md:p-6'>
          <h3 className='text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6'>Grade Semanal</h3>
          <div className='overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0'>
            <table className='w-full border-collapse min-w-[800px]'>
              <thead>
                <tr className='bg-linear-to-r from-[#237EE6] to-[#60C9E6]'>
                  <th className='border border-gray-300 px-4 py-3 text-white font-semibold text-sm'>Horário</th>
                  <th className='border border-gray-300 px-4 py-3 text-white font-semibold text-sm'>Segunda</th>
                  <th className='border border-gray-300 px-4 py-3 text-white font-semibold text-sm'>Terça</th>
                  <th className='border border-gray-300 px-4 py-3 text-white font-semibold text-sm'>Quarta</th>
                  <th className='border border-gray-300 px-4 py-3 text-white font-semibold text-sm'>Quinta</th>
                  <th className='border border-gray-300 px-4 py-3 text-white font-semibold text-sm'>Sexta</th>
                  <th className='border border-gray-300 px-4 py-3 text-white font-semibold text-sm'>Sábado</th>
                  <th className='border border-gray-300 px-4 py-3 text-white font-semibold text-sm'>Domingo</th>
                </tr>
              </thead>
              <tbody>
                <tr className='hover:bg-[#F5F7FA] transition-colors duration-200'>
                  <td className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-50'>08:00 - 10:00</td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-[#237EE6]/10'>
                    <div className='font-semibold text-[#237EE6]'>Clínica Médica</div>
                    <div className='text-xs text-gray-600 mt-1'>Hospital Universitário</div>
                    <div className='text-xs text-gray-500'>Dra. Maria Silva</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-[#237EE6]/10'>
                    <div className='font-semibold text-[#237EE6]'>Clínica Médica</div>
                    <div className='text-xs text-gray-600 mt-1'>Hospital Universitário</div>
                    <div className='text-xs text-gray-500'>Dra. Maria Silva</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-[#237EE6]/10'>
                    <div className='font-semibold text-[#237EE6]'>Clínica Médica</div>
                    <div className='text-xs text-gray-600 mt-1'>Hospital Universitário</div>
                    <div className='text-xs text-gray-500'>Dra. Maria Silva</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-[#237EE6]/10'>
                    <div className='font-semibold text-[#237EE6]'>Clínica Médica</div>
                    <div className='text-xs text-gray-600 mt-1'>Hospital Universitário</div>
                    <div className='text-xs text-gray-500'>Dra. Maria Silva</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-[#237EE6]/10'>
                    <div className='font-semibold text-[#237EE6]'>Clínica Médica</div>
                    <div className='text-xs text-gray-600 mt-1'>Hospital Universitário</div>
                    <div className='text-xs text-gray-500'>Dra. Maria Silva</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                </tr>
                <tr className='hover:bg-[#F5F7FA] transition-colors duration-200'>
                  <td className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-50'>10:00 - 12:00</td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-[#237EE6]/10'>
                    <div className='font-semibold text-[#237EE6]'>Clínica Médica</div>
                    <div className='text-xs text-gray-600 mt-1'>Hospital Universitário</div>
                    <div className='text-xs text-gray-500'>Dra. Maria Silva</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-[#237EE6]/10'>
                    <div className='font-semibold text-[#237EE6]'>Clínica Médica</div>
                    <div className='text-xs text-gray-600 mt-1'>Hospital Universitário</div>
                    <div className='text-xs text-gray-500'>Dra. Maria Silva</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-[#237EE6]/10'>
                    <div className='font-semibold text-[#237EE6]'>Clínica Médica</div>
                    <div className='text-xs text-gray-600 mt-1'>Hospital Universitário</div>
                    <div className='text-xs text-gray-500'>Dra. Maria Silva</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-[#237EE6]/10'>
                    <div className='font-semibold text-[#237EE6]'>Clínica Médica</div>
                    <div className='text-xs text-gray-600 mt-1'>Hospital Universitário</div>
                    <div className='text-xs text-gray-500'>Dra. Maria Silva</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-[#237EE6]/10'>
                    <div className='font-semibold text-[#237EE6]'>Clínica Médica</div>
                    <div className='text-xs text-gray-600 mt-1'>Hospital Universitário</div>
                    <div className='text-xs text-gray-500'>Dra. Maria Silva</div>
                  </td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                </tr>
                <tr className='hover:bg-[#F5F7FA] transition-colors duration-200'>
                  <td className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-50'>14:00 - 16:00</td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                </tr>
                <tr className='hover:bg-[#F5F7FA] transition-colors duration-200'>
                  <td className='border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-50'>16:00 - 18:00</td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                  <td className='border border-gray-300 px-4 py-3 text-sm bg-gray-50'></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
