import { useState } from 'react'
import { FiSave, FiX, FiAlertCircle, FiBook, FiClock } from 'react-icons/fi'

export default function NovoComponente({ onVoltar, onSalvar, initialValues = {} }) {
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
		id_componente: initialValues.id_componente ?? '',
		id_curriculo: initialValues.id_curriculo ?? '',
		codigo_componente: initialValues.codigo_componente ?? '',
		nome_componente: initialValues.nome_componente ?? '',
		descricao: initialValues.descricao ?? '',
		tipo_componente: initialValues.tipo_componente ?? 'Obrigatório',
		area_conhecimento: initialValues.area_conhecimento ?? '',
		periodo_sugerido: initialValues.periodo_sugerido ?? '',
		carga_horaria_total: initialValues.carga_horaria_total ?? '',
		carga_horaria_pratica: initialValues.carga_horaria_pratica ?? '',
		carga_horaria_teorica: initialValues.carga_horaria_teorica ?? '',
		duracao_semanas: initialValues.duracao_semanas ?? '',
		ch_semanal_esperada: initialValues.ch_semanal_esperada ?? '',
		pre_requisitos: Array.isArray(initialValues.pre_requisitos)
			? initialValues.pre_requisitos.join(', ')
			: (initialValues.pre_requisitos ?? ''),
		competencias_dcn: Array.isArray(initialValues.competencias_dcn)
			? initialValues.competencias_dcn.join(', ')
			: (initialValues.competencias_dcn ?? ''),
		obrigatorio_sus: initialValues.obrigatorio_sus ?? false,
		status: initialValues.status ?? 'Ativo',
		data_cadastro: initialValues.data_cadastro ? initialValues.data_cadastro : nowDateTimeLocal()
	})

	const [erros, setErros] = useState({})

	const handleChange = (e) => {
		const { name, type } = e.target
		const value = type === 'checkbox' ? e.target.checked : e.target.value
		setFormData((prev) => ({ ...prev, [name]: value }))

		if (erros[name]) {
			setErros((prev) => ({ ...prev, [name]: '' }))
		}
	}

	const parseList = (value) => {
		if (!value) return []
		const trimmed = value.trim()
		// Tenta interpretar como JSON
		try {
			const parsed = JSON.parse(trimmed)
			return Array.isArray(parsed) ? parsed : [String(parsed)]
		} catch {
			// Fallback: separa por vírgula
			return trimmed.split(',').map((s) => s.trim()).filter(Boolean)
		}
	}

	const validarFormulario = () => {
		const novosErros = {}

		if (!formData.id_curriculo) {
			novosErros.id_curriculo = 'Informe o ID do currículo (FK)'
		} else if (parseInt(formData.id_curriculo) <= 0) {
			novosErros.id_curriculo = 'ID do currículo deve ser positivo'
		}

		if (!formData.codigo_componente || formData.codigo_componente.trim().length < 2) {
			novosErros.codigo_componente = 'Código deve ter no mínimo 2 caracteres'
		} else if (formData.codigo_componente.trim().length > 20) {
			novosErros.codigo_componente = 'Código deve ter no máximo 20 caracteres'
		}

		if (!formData.nome_componente || formData.nome_componente.trim().length < 3) {
			novosErros.nome_componente = 'Nome deve ter no mínimo 3 caracteres'
		}

		if (!formData.descricao || formData.descricao.trim().length < 5) {
			novosErros.descricao = 'Descrição deve ter no mínimo 5 caracteres'
		}

		if (!formData.tipo_componente) {
			novosErros.tipo_componente = 'Selecione o tipo (Obrigatório/Optativo)'
		}

		if (!formData.area_conhecimento || formData.area_conhecimento.trim().length < 2) {
			novosErros.area_conhecimento = 'Informe a área de conhecimento'
		}

		const periodo = parseInt(formData.periodo_sugerido)
		if (!formData.periodo_sugerido) {
			novosErros.periodo_sugerido = 'Informe o período sugerido'
		} else if (periodo < 1 || periodo > 20) {
			novosErros.periodo_sugerido = 'Período deve estar entre 1 e 20'
		}

		const chTotal = parseInt(formData.carga_horaria_total)
		const chPratica = parseInt(formData.carga_horaria_pratica)
		const chTeorica = parseInt(formData.carga_horaria_teorica)

		if (!formData.carga_horaria_total || chTotal <= 0) {
			novosErros.carga_horaria_total = 'CH total deve ser maior que 0'
		}
		if (!formData.carga_horaria_pratica || chPratica < 0) {
			novosErros.carga_horaria_pratica = 'CH prática deve ser >= 0'
		}
		if (!formData.carga_horaria_teorica || chTeorica < 0) {
			novosErros.carga_horaria_teorica = 'CH teórica deve ser >= 0'
		}
		if (!novosErros.carga_horaria_total && !novosErros.carga_horaria_pratica && !novosErros.carga_horaria_teorica) {
			if (chPratica + chTeorica !== chTotal) {
				novosErros.carga_horaria_total = 'CH prática + CH teórica deve igualar CH total'
			}
		}

		const dur = parseInt(formData.duracao_semanas)
		if (!formData.duracao_semanas || dur <= 0) {
			novosErros.duracao_semanas = 'Duração em semanas deve ser > 0'
		}

		const chSem = parseInt(formData.ch_semanal_esperada)
		if (!formData.ch_semanal_esperada || chSem <= 0) {
			novosErros.ch_semanal_esperada = 'CH semanal esperada deve ser > 0'
		}

		const preReqs = parseList(formData.pre_requisitos)
		const compDcn = parseList(formData.competencias_dcn)
		if (!preReqs || preReqs.length === 0) {
			novosErros.pre_requisitos = 'Informe pelo menos um pré-requisito (lista ou JSON)'
		}
		if (!compDcn || compDcn.length === 0) {
			novosErros.competencias_dcn = 'Informe pelo menos uma competência DCN (lista ou JSON)'
		}

		if (!formData.status) {
			novosErros.status = 'Selecione o status'
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
			const novoComponente = {
				id_componente: formData.id_componente ? parseInt(formData.id_componente) : undefined,
				id_curriculo: parseInt(formData.id_curriculo),
				codigo_componente: formData.codigo_componente.trim(),
				nome_componente: formData.nome_componente.trim(),
				descricao: formData.descricao.trim(),
				tipo_componente: formData.tipo_componente,
				area_conhecimento: formData.area_conhecimento.trim(),
				periodo_sugerido: parseInt(formData.periodo_sugerido),
				carga_horaria_total: parseInt(formData.carga_horaria_total),
				carga_horaria_pratica: parseInt(formData.carga_horaria_pratica),
				carga_horaria_teorica: parseInt(formData.carga_horaria_teorica),
				duracao_semanas: parseInt(formData.duracao_semanas),
				ch_semanal_esperada: parseInt(formData.ch_semanal_esperada),
				pre_requisitos: parseList(formData.pre_requisitos),
				competencias_dcn: parseList(formData.competencias_dcn),
				obrigatorio_sus: Boolean(formData.obrigatorio_sus),
				status: formData.status,
				data_cadastro: formData.data_cadastro
					? new Date(formData.data_cadastro).toISOString()
					: new Date().toISOString()
			}

			if (onSalvar) {
				onSalvar(novoComponente)
			}

			alert('Componente curricular cadastrado com sucesso!')

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
						<FiBook size={28} /> Cadastrar Novo Componente Curricular
					</h2>
					<p className='text-gray-600 mt-1'>Preencha os dados do componente curricular</p>
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
						{/* ID Currículo (FK) */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								ID do Currículo (FK) <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='id_curriculo'
								value={formData.id_curriculo}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.id_curriculo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 1'
							/>
							{erros.id_curriculo && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.id_curriculo}
								</p>
							)}
						</div>

						{/* Código */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Código do Componente <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='codigo_componente'
								value={formData.codigo_componente}
								onChange={handleChange}
								maxLength='20'
								className={`w-full px-4 py-2 border ${erros.codigo_componente ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: INT01'
							/>
							{erros.codigo_componente && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.codigo_componente}
								</p>
							)}
						</div>

						{/* Nome */}
						<div className='md:col-span-2'>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Nome do Componente <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='nome_componente'
								value={formData.nome_componente}
								onChange={handleChange}
								maxLength='200'
								className={`w-full px-4 py-2 border ${erros.nome_componente ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: Clínica Médica'
							/>
							{erros.nome_componente && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.nome_componente}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Classificação e Cargas */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
						<FiClock size={20} /> Classificação e Cargas
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Tipo do Componente */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Tipo do Componente <span className='text-red-500'>*</span>
							</label>
							<select
								name='tipo_componente'
								value={formData.tipo_componente}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.tipo_componente ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
							>
								<option value='Obrigatório'>Obrigatório</option>
								<option value='Optativo'>Optativo</option>
							</select>
							{erros.tipo_componente && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.tipo_componente}
								</p>
							)}
						</div>

						{/* Área de Conhecimento */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Área de Conhecimento <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='area_conhecimento'
								value={formData.area_conhecimento}
								onChange={handleChange}
								maxLength='100'
								className={`w-full px-4 py-2 border ${erros.area_conhecimento ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: Clínica Médica'
							/>
							{erros.area_conhecimento && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.area_conhecimento}
								</p>
							)}
						</div>

						{/* Período Sugerido */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Período Sugerido <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='periodo_sugerido'
								value={formData.periodo_sugerido}
								onChange={handleChange}
								min='1'
								max='20'
								className={`w-full px-4 py-2 border ${erros.periodo_sugerido ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 9'
							/>
							{erros.periodo_sugerido && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.periodo_sugerido}
								</p>
							)}
						</div>
					</div>

					{/* Cargas Horárias */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
						{/* CH Total */}
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
								placeholder='Ex: 360'
							/>
							{erros.carga_horaria_total && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.carga_horaria_total}
								</p>
							)}
						</div>

						{/* CH Prática */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Carga Horária Prática <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='carga_horaria_pratica'
								value={formData.carga_horaria_pratica}
								onChange={handleChange}
								min='0'
								className={`w-full px-4 py-2 border ${erros.carga_horaria_pratica ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 340'
							/>
							{erros.carga_horaria_pratica && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.carga_horaria_pratica}
								</p>
							)}
						</div>

						{/* CH Teórica */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Carga Horária Teórica <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='carga_horaria_teorica'
								value={formData.carga_horaria_teorica}
								onChange={handleChange}
								min='0'
								className={`w-full px-4 py-2 border ${erros.carga_horaria_teorica ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 20'
							/>
							{erros.carga_horaria_teorica && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.carga_horaria_teorica}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Estrutura e Competências */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Estrutura e Competências</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Duração em Semanas */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Duração (semanas) <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='duracao_semanas'
								value={formData.duracao_semanas}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.duracao_semanas ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 8'
							/>
							{erros.duracao_semanas && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.duracao_semanas}
								</p>
							)}
						</div>

						{/* CH Semanal Esperada */}
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								CH Semanal Esperada <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='ch_semanal_esperada'
								value={formData.ch_semanal_esperada}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.ch_semanal_esperada ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 40'
							/>
							{erros.ch_semanal_esperada && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.ch_semanal_esperada}
								</p>
							)}
						</div>

						{/* Obrigatório SUS? */}
						<div className='flex items-end'>
							<label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
								<input
									type='checkbox'
									name='obrigatorio_sus'
									checked={formData.obrigatorio_sus}
									onChange={handleChange}
									className='w-4 h-4 rounded border-gray-300'
								/>
								Exige cenário SUS?
							</label>
						</div>
					</div>

					{/* Pré-requisitos e Competências */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Pré-requisitos (lista separada por vírgula ou JSON) <span className='text-red-500'>*</span>
							</label>
							<textarea
								name='pre_requisitos'
								value={formData.pre_requisitos}
								onChange={handleChange}
								rows='3'
								className={`w-full px-4 py-2 border ${erros.pre_requisitos ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none resize-none`}
								placeholder='Ex: MED401, MED402'
							/>
							{erros.pre_requisitos && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.pre_requisitos}
								</p>
							)}
						</div>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Competências DCN (lista separada por vírgula ou JSON) <span className='text-red-500'>*</span>
							</label>
							<textarea
								name='competencias_dcn'
								value={formData.competencias_dcn}
								onChange={handleChange}
								rows='3'
								className={`w-full px-4 py-2 border ${erros.competencias_dcn ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none resize-none`}
								placeholder='Ex: Anamnese, Exame físico'
							/>
							{erros.competencias_dcn && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.competencias_dcn}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Status e Cadastro */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Status e Cadastro</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
							</select>
							{erros.status && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.status}
								</p>
							)}
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
								<li>• O ID de currículo deve existir no cadastro de currículos</li>
								<li>• CH prática + CH teórica deve igualar a CH total</li>
								<li>• Use vírgulas ou JSON para listas de pré-requisitos e competências</li>
								<li>• Marque “Exige cenário SUS?” se obrigatório conforme DCN</li>
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
						<FiSave size={18} /> Cadastrar Componente
					</button>
				</div>
			</form>
		</div>
	)
}

