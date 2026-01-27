import { useState } from 'react'
import { FiSave, FiX, FiAlertCircle, FiBook, FiMapPin, FiClock } from 'react-icons/fi'

export default function NovoCurso({ onVoltar, onSalvar, initialValues = {} }) {
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
		id_curso: initialValues.id_curso ?? '',
		id_unidade: initialValues.id_unidade ?? '',
		nome_curso: initialValues.nome_curso ?? '',
		grau: initialValues.grau ?? 'Bacharelado',
		modalidade: initialValues.modalidade ?? 'Presencial',
		duracao_semestres: initialValues.duracao_semestres ?? '',
		carga_horaria_total: initialValues.carga_horaria_total ?? '',
		codigo_mec: initialValues.codigo_mec ?? '',
		descricao: initialValues.descricao ?? '',
		status: initialValues.status ?? 'Ativo',
		data_cadastro: initialValues.data_cadastro ? initialValues.data_cadastro : nowDateTimeLocal()
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

		if (!formData.id_unidade) {
			novosErros.id_unidade = 'Informe o ID da unidade (FK)'
		} else if (parseInt(formData.id_unidade) <= 0) {
			novosErros.id_unidade = 'ID da unidade deve ser positivo'
		}

		if (!formData.nome_curso || formData.nome_curso.trim().length < 3) {
			novosErros.nome_curso = 'Nome do curso deve ter no mínimo 3 caracteres'
		}

		if (!formData.grau) {
			novosErros.grau = 'Selecione o grau do curso'
		}

		if (!formData.modalidade) {
			novosErros.modalidade = 'Selecione a modalidade do curso'
		}

		const dur = parseInt(formData.duracao_semestres)
		if (!formData.duracao_semestres || dur <= 0) {
			novosErros.duracao_semestres = 'Duração deve ser maior que 0'
		}

		const chTotal = parseInt(formData.carga_horaria_total)
		if (!formData.carga_horaria_total || chTotal <= 0) {
			novosErros.carga_horaria_total = 'Carga horária total deve ser maior que 0'
		}

		if (!formData.codigo_mec || formData.codigo_mec.trim().length < 2) {
			novosErros.codigo_mec = 'Código e-MEC é obrigatório'
		} else if (formData.codigo_mec.trim().length > 20) {
			novosErros.codigo_mec = 'Código e-MEC deve ter no máximo 20 caracteres'
		}

		if (!formData.descricao || formData.descricao.trim().length < 5) {
			novosErros.descricao = 'Descrição deve ter no mínimo 5 caracteres'
		}

		if (!formData.status) {
			novosErros.status = 'Selecione o status do curso'
		}

		if (formData.data_cadastro && isNaN(new Date(formData.data_cadastro).getTime())) {
			novosErros.data_cadastro = 'Data de cadastro inválida'
		}

		setErros(novosErros)
		return Object.keys(novosErros).length === 0
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (validarFormulario()) {
			const novoCurso = {
				id_curso: formData.id_curso ? parseInt(formData.id_curso) : undefined,
				id_unidade: parseInt(formData.id_unidade),
				nome_curso: formData.nome_curso.trim(),
				grau: formData.grau,
				modalidade: formData.modalidade,
				duracao_semestres: parseInt(formData.duracao_semestres),
				carga_horaria_total: parseInt(formData.carga_horaria_total),
				codigo_mec: formData.codigo_mec.trim(),
				descricao: formData.descricao.trim(),
				status: formData.status,
				data_cadastro: formData.data_cadastro
					? new Date(formData.data_cadastro).toISOString()
					: new Date().toISOString()
			}

			if (onSalvar) {
				onSalvar(novoCurso)
			}

			alert('Curso cadastrado com sucesso!')

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
		<div className='space-y-6 max-h-[70vh] md:max-h-[75vh] overflow-y-auto pr-1'>
			{/* Cabeçalho */}
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2'>
						<FiBook size={28} /> Cadastrar Novo Curso
					</h2>
					<p className='text-gray-600 mt-1'>Preencha os dados do curso</p>
				</div>
				<button onClick={handleCancelar} className='text-gray-500 hover:text-gray-700 transition-colors'>
					<FiX size={28} />
				</button>
			</div>

			{/* Formulário */}
			<form onSubmit={handleSubmit} className='bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6'>
				{/* Identificação */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
						<FiBook size={20} /> Identificação
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* ID Unidade (FK) */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								ID da Unidade (FK) <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='id_unidade'
								value={formData.id_unidade}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.id_unidade ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 1'
							/>
							{erros.id_unidade && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.id_unidade}
								</p>
							)}
						</div>

						{/* Nome do Curso */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Nome do Curso <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='nome_curso'
								value={formData.nome_curso}
								onChange={handleChange}
								maxLength='200'
								className={`w-full px-4 py-2 border ${erros.nome_curso ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: Medicina'
							/>
							{erros.nome_curso && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.nome_curso}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Classificação e Estrutura */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Classificação e Estrutura</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Grau */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Grau <span className='text-red-500'>*</span>
							</label>
							<select
								name='grau'
								value={formData.grau}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.grau ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
							>
								<option value='Bacharelado'>Bacharelado</option>
								<option value='Licenciatura'>Licenciatura</option>
								<option value='Tecnólogo'>Tecnólogo</option>
							</select>
							{erros.grau && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.grau}
								</p>
							)}
						</div>

						{/* Modalidade */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Modalidade <span className='text-red-500'>*</span>
							</label>
							<select
								name='modalidade'
								value={formData.modalidade}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.modalidade ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
							>
								<option value='Presencial'>Presencial</option>
								<option value='EAD'>EAD</option>
								<option value='Híbrido'>Híbrido</option>
							</select>
							{erros.modalidade && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.modalidade}
								</p>
							)}
						</div>

						{/* Duração em Semestres */}
						<div>
							<label className='block text sm font-semibold text-gray-700 mb-2'>
								Duração (semestres) <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='duracao_semestres'
								value={formData.duracao_semestres}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.duracao_semestres ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 12'
							/>
							{erros.duracao_semestres && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.duracao_semestres}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Carga Horária e Código MEC */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
						<FiClock size={20} /> Carga Horária e Código MEC
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Carga Horária Total */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Carga Horária Total <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='carga_horaria_total'
								value={formData.carga_horaria_total}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.carga_horaria_total ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 7200'
							/>
							{erros.carga_horaria_total && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.carga_horaria_total}
								</p>
							)}
						</div>

						{/* Código MEC */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Código e-MEC <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='codigo_mec'
								value={formData.codigo_mec}
								onChange={handleChange}
								maxLength='20'
								className={`w-full px-4 py-2 border ${erros.codigo_mec ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: MED2024'
							/>
							{erros.codigo_mec && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.codigo_mec}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Descrição e Status */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Descrição e Status</h3>
					<div className='space-y-4'>
						{/* Descrição */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Descrição do Curso <span className='text-red-500'>*</span>
							</label>
							<textarea
								name='descricao'
								value={formData.descricao}
								onChange={handleChange}
								rows='4'
								className={`w-full px-4 py-2 border ${erros.descricao ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none resize-none`}
								placeholder='Ex: Curso de Medicina com ênfase em...'
							/>
							{erros.descricao && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.descricao}
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
								<option value='Em Implantação'>Em Implantação</option>
							</select>
							{erros.status && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.status}
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
								<li>• O ID da unidade deve existir no cadastro de unidades</li>
								<li>• A carga horária total deve refletir toda a duração do curso</li>
								<li>• O código e-MEC deve ser válido e até 20 caracteres</li>
								<li>• Defina o grau e modalidade conforme a oferta do curso</li>
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
						className='flex-1 px-6 py-3 bg-linear-to-r from-[#10E686] to-[#60E6D7] text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2'
					>
						<FiSave size={18} /> Cadastrar Curso
					</button>
				</div>
			</form>
		</div>
	)
}

