import { useState } from 'react'
import { FiSave, FiX, FiAlertCircle, FiBook, FiCalendar, FiClock } from 'react-icons/fi'

export default function NovoCurriculo({ onVoltar, onSalvar, initialValues = {} }) {
	const nowDateTimeLocal = () => {
		const d = new Date()
		const pad = (n) => String(n).padStart(2, '0')
		const yyyy = d.getFullYear()
		const MM = pad(d.getMonth() + 1)
		const dd = pad(d.getDate())
		const hh = pad(d.getHours())
		const mm = pad(d.getMinutes())
		return `${yyyy}-${MM}-${dd}T${hh}:${mm}`
	}

	const [formData, setFormData] = useState({
		id_curriculo: initialValues.id_curriculo ?? '',
		id_curso: initialValues.id_curso ?? '',
		nome_curriculo: initialValues.nome_curriculo ?? '',
		descricao: initialValues.descricao ?? '',
		versao: initialValues.versao ?? '',
		ano_vigencia: initialValues.ano_vigencia ?? new Date().getFullYear(),
		carga_horaria_total_estagio: initialValues.carga_horaria_total_estagio ?? '',
		periodos_inicio: initialValues.periodos_inicio ?? '',
		periodos_fim: initialValues.periodos_fim ?? '',
		status: initialValues.status ?? 'Ativo',
		data_cadastro: initialValues.data_cadastro
			? initialValues.data_cadastro
			: nowDateTimeLocal()
	})

	const [erros, setErros] = useState({})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))

		if (erros[name]) {
			setErros((prev) => ({ ...prev, [name]: '' }))
		}
	}

	const validarFormulario = () => {
		const novosErros = {}

		if (!formData.id_curso) {
			novosErros.id_curso = 'Informe o ID do curso (FK)'
		} else if (parseInt(formData.id_curso) <= 0) {
			novosErros.id_curso = 'ID do curso deve ser positivo'
		}

		if (!formData.nome_curriculo || formData.nome_curriculo.trim().length < 3) {
			novosErros.nome_curriculo = 'Nome deve ter no mínimo 3 caracteres'
		}

		if (!formData.descricao || formData.descricao.trim().length < 5) {
			novosErros.descricao = 'Descrição deve ter no mínimo 5 caracteres'
		}

		if (!formData.versao || formData.versao.trim().length < 1) {
			novosErros.versao = 'Informe a versão do currículo'
		}

		if (!formData.ano_vigencia) {
			novosErros.ano_vigencia = 'Ano de vigência é obrigatório'
		} else if (parseInt(formData.ano_vigencia) < 2000 || parseInt(formData.ano_vigencia) > 2100) {
			novosErros.ano_vigencia = 'Ano deve estar entre 2000 e 2100'
		}

		if (!formData.carga_horaria_total_estagio) {
			novosErros.carga_horaria_total_estagio = 'Carga horária total é obrigatória'
		} else if (parseInt(formData.carga_horaria_total_estagio) <= 0) {
			novosErros.carga_horaria_total_estagio = 'Carga horária deve ser maior que 0'
		}

		if (!formData.periodos_inicio) {
			novosErros.periodos_inicio = 'Informe o período inicial'
		} else if (parseInt(formData.periodos_inicio) < 1 || parseInt(formData.periodos_inicio) > 20) {
			novosErros.periodos_inicio = 'Período inicial deve estar entre 1 e 20'
		}

		if (!formData.periodos_fim) {
			novosErros.periodos_fim = 'Informe o período final'
		} else if (parseInt(formData.periodos_fim) < parseInt(formData.periodos_inicio)) {
			novosErros.periodos_fim = 'Período final deve ser >= período inicial'
		} else if (parseInt(formData.periodos_fim) > 20) {
			novosErros.periodos_fim = 'Período final deve estar entre 1 e 20'
		}

		if (!formData.status) {
			novosErros.status = 'Selecione o status'
		}

		// data_cadastro é opcional; se fornecida, deve ser válida
		if (formData.data_cadastro && isNaN(new Date(formData.data_cadastro).getTime())) {
			novosErros.data_cadastro = 'Data de cadastro inválida'
		}

		setErros(novosErros)
		return Object.keys(novosErros).length === 0
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (validarFormulario()) {
			const novoCurriculo = {
				id_curriculo: formData.id_curriculo ? parseInt(formData.id_curriculo) : undefined,
				id_curso: parseInt(formData.id_curso),
				nome_curriculo: formData.nome_curriculo.trim(),
				descricao: formData.descricao.trim(),
				versao: formData.versao.trim(),
				ano_vigencia: parseInt(formData.ano_vigencia),
				carga_horaria_total_estagio: parseInt(formData.carga_horaria_total_estagio),
				periodos_inicio: parseInt(formData.periodos_inicio),
				periodos_fim: parseInt(formData.periodos_fim),
				status: formData.status,
				data_cadastro: formData.data_cadastro
					? new Date(formData.data_cadastro).toISOString()
					: new Date().toISOString()
			}

			if (onSalvar) {
				onSalvar(novoCurriculo)
			}

			alert('Currículo cadastrado com sucesso!')

			if (onVoltar) {
				onVoltar()
			}
		}
	}

	const handleCancelar = () => {
		if (onVoltar) {
			onVoltar()
		}
	}

	return (
		<div className='space-y-6'>
			{/* Cabeçalho */}
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2'>
						<FiBook size={28} /> Cadastrar Novo Currículo de Estágio
					</h2>
					<p className='text-gray-600 mt-1'>Preencha os dados do currículo de internato</p>
				</div>
				<button onClick={handleCancelar} className='text-gray-500 hover:text-gray-700 transition-colors'>
					<FiX size={28} />
				</button>
			</div>

			{/* Formulário */}
			<form onSubmit={handleSubmit} className='bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6'>
				{/* Informações do Currículo */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
						<FiBook size={20} /> Informações do Currículo
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* ID do Curso (FK) */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								ID do Curso (FK) <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='id_curso'
								value={formData.id_curso}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.id_curso ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 1'
							/>
							{erros.id_curso && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.id_curso}
								</p>
							)}
						</div>

						{/* Nome do Currículo */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Nome do Currículo <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='nome_curriculo'
								value={formData.nome_curriculo}
								onChange={handleChange}
								maxLength='200'
								className={`w-full px-4 py-2 border ${erros.nome_curriculo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: Currículo Medicina 2024'
							/>
							{erros.nome_curriculo && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.nome_curriculo}
								</p>
							)}
						</div>

						{/* Versão */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Versão <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='versao'
								value={formData.versao}
								onChange={handleChange}
								maxLength='20'
								className={`w-full px-4 py-2 border ${erros.versao ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 2024.1'
							/>
							{erros.versao && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.versao}
								</p>
							)}
						</div>

						{/* Status */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Status <span className='text-red-500'>*</span>
							</label>
							<select
								name='status'
								value={formData.status}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.status ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
							>
								<option value='Ativo'>Ativo</option>
								<option value='Inativo'>Inativo</option>
								<option value='Descontinuado'>Descontinuado</option>
							</select>
							{erros.status && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.status}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Vigência e Períodos */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
						<FiCalendar size={20} /> Vigência e Períodos
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Ano de Vigência */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Ano de Início (Vigência) <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='ano_vigencia'
								value={formData.ano_vigencia}
								onChange={handleChange}
								min='2000'
								max='2100'
								className={`w-full px-4 py-2 border ${erros.ano_vigencia ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 2024'
							/>
							{erros.ano_vigencia && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.ano_vigencia}
								</p>
							)}
						</div>

						{/* Período Inicial */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Período Inicial <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='periodos_inicio'
								value={formData.periodos_inicio}
								onChange={handleChange}
								min='1'
								max='20'
								className={`w-full px-4 py-2 border ${erros.periodos_inicio ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 9'
							/>
							{erros.periodos_inicio && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.periodos_inicio}
								</p>
							)}
						</div>

						{/* Período Final */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Período Final <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='periodos_fim'
								value={formData.periodos_fim}
								onChange={handleChange}
								min='1'
								max='20'
								className={`w-full px-4 py-2 border ${erros.periodos_fim ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 12'
							/>
							{erros.periodos_fim && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.periodos_fim}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Carga Horária e Descrição */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
						<FiClock size={20} /> Carga Horária e Descrição
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Carga Horária Total do Internato */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Carga Horária Total do Internato <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='carga_horaria_total_estagio'
								value={formData.carga_horaria_total_estagio}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.carga_horaria_total_estagio ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 3600'
							/>
							{erros.carga_horaria_total_estagio && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.carga_horaria_total_estagio}
								</p>
							)}
						</div>

						{/* Descrição */}
						<div className='md:col-span-2'>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Descrição <span className='text-red-500'>*</span>
							</label>
							<textarea
								name='descricao'
								value={formData.descricao}
								onChange={handleChange}
								rows='4'
								className={`w-full px-4 py-2 border ${erros.descricao ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none resize-none`}
								placeholder='Ex: Internato do 9º ao 12º período'
							/>
							{erros.descricao && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.descricao}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Identificação e Cadastro */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Identificação e Cadastro</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* ID do Currículo (opcional) */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								ID do Currículo (opcional)
							</label>
							<input
								type='number'
								name='id_curriculo'
								value={formData.id_curriculo}
								onChange={handleChange}
								min='1'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none'
								placeholder='Ex: 1'
							/>
						</div>

						{/* Data de Cadastro */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Data/Hora do Cadastro
							</label>
							<input
								type='datetime-local'
								name='data_cadastro'
								value={formData.data_cadastro}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.data_cadastro ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
							/>
							{erros.data_cadastro && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.data_cadastro}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Info Box */}
				<div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
					<div className='flex gap-3'>
						<FiAlertCircle className='text-blue-600 shrink-0 mt-0.5' size={20} />
						<div className='space-y-2'>
							<p className='text-sm font-semibold text-blue-900'>Informações Importantes</p>
							<ul className='text-xs text-blue-800 space-y-1'>
								<li>• O ID do curso deve existir no cadastro de cursos</li>
								<li>• Use a versão para diferenciar atualizações do currículo</li>
								<li>• A carga horária total deve refletir toda a duração do internato</li>
								<li>• Os períodos inicial e final devem cobrir a jornada do aluno</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Botões de Ação */}
				<div className='flex flex-col md:flex-row gap-3 pt-4 border-t border-gray-200'>
					<button
						type='button'
						onClick={handleCancelar}
						className='flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2'
					>
						<FiX size={18} /> Cancelar
					</button>
					<button
						type='submit'
						className='flex-1 px-6 py-3 bg-gradient-to-r from-[#10E686] to-[#60E6D7] text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2'
					>
						<FiSave size={18} /> Cadastrar Currículo
					</button>
				</div>
			</form>
		</div>
	)
}

