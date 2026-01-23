import { FiHome } from 'react-icons/fi'

export default function HeaderAluno({ aluno }) {
  return (
    <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2'>
              <FiHome size={36} /> Bem-vindo, {aluno.nome.split(' ')[0]}!
            </h1>
            <p className='text-blue-100 text-sm lg:text-base'>
              Matrícula: {aluno.matricula} • Período: {aluno.periodo}º
            </p>
          </div>
          <div className='flex gap-4'>
            <div className='bg-white/20 backdrop-blur rounded-xl px-6 py-3'>
              <p className='text-blue-100 text-sm'>Frequência</p>
              <p className='text-2xl font-bold'>{aluno.frequencia_percentual}%</p>
            </div>
            <div className='bg-white/20 backdrop-blur rounded-xl px-6 py-3'>
              <p className='text-blue-100 text-sm'>Meus Horários</p>
              <p className='text-2xl font-bold'>{aluno.vagas_ativas}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
