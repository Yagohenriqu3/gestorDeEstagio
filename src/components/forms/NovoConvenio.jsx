import { useState } from 'react'
import { FiSave, FiX, FiAlertCircle, FiFileText, FiCalendar, FiDollarSign } from 'react-icons/fi'

export default function NovoConvenio({ onVoltar, onSalvar, initialValues = {} }) {
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
		id_convenio: initialValues.id_convenio ?? '',
		id_unidade: initialValues.id_unidade ?? '',
		id_local: initialValues.id_local ?? '',
		numero_convenio: initialValues.numero_convenio ?? '',
		tipo_convenio: initialValues.tipo_convenio ?? 'Estágio',
		data_inicio_vigencia: initialValues.data_inicio_vigencia ?? '',
		data_fim_vigencia: initialValues.data_fim_vigencia ?? '',
		renovacao_automatica: initialValues.renovacao_automatica ?? false,
		prazo_aviso_renovacao: initialValues.prazo_aviso_renovacao ?? '',
		valor_mensal: initialValues.valor_mensal ?? '',
		forma_pagamento: initialValues.forma_pagamento ?? '',
		objeto: initialValues.objeto ?? '',
		arquivo_convenio: initialValues.arquivo_convenio ?? '',
		status: initialValues.status ?? 'Vigente',
		data_cadastro: initialValues.data_cadastro ? initialValues.data_cadastro : nowDateTimeLocal()
	})

	const [erros, setErros] = useState({})

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		const val = type === 'checkbox' ? checked : value
		setFormData((prev) => ({ ...prev, [name]: val }))

		if (erros[name]) {
			setErros((prev) => ({ ...prev, [name]: '' }))
		}
	}

	const validarFormulario = () => {
		const novosErros = {}
		const positiveInt = (val) => Number.isInteger(Number(val)) && Number(val) > 0
		const positiveNumber = (val) => !isNaN(Number(val)) && Number(val) > 0

		if (formData.id_convenio && !positiveInt(formData.id_convenio)) {
			novosErros.id_convenio = 'ID do convênio deve ser número positivo'
		}

		if (!positiveInt(formData.id_unidade)) {
			novosErros.id_unidade = 'Informe um ID de unidade válido (positivo)'
		}

		if (!positiveInt(formData.id_local)) {
			novosErros.id_local = 'Informe um ID de local válido (positivo)'
		}

		if (!formData.numero_convenio || formData.numero_convenio.trim().length < 3) {
			novosErros.numero_convenio = 'Número do convênio deve ter ao menos 3 caracteres'
		}

		if (!formData.tipo_convenio) {
			novosErros.tipo_convenio = 'Selecione o tipo de convênio'
		}

		if (!formData.data_inicio_vigencia) {
			novosErros.data_inicio_vigencia = 'Informe a data de início'
		}

		if (!formData.data_fim_vigencia) {
			novosErros.data_fim_vigencia = 'Informe a data de fim'
		}

		if (formData.data_inicio_vigencia && formData.data_fim_vigencia) {
			const ini = new Date(formData.data_inicio_vigencia)
			const fim = new Date(formData.data_fim_vigencia)
			if (ini > fim) {
				novosErros.data_fim_vigencia = 'Data de fim deve ser após a data de início'
			}
		}

		if (formData.prazo_aviso_renovacao && !positiveInt(formData.prazo_aviso_renovacao)) {
			novosErros.prazo_aviso_renovacao = 'Prazo de aviso deve ser inteiro positivo'
		}

		if (formData.valor_mensal && !positiveNumber(formData.valor_mensal)) {
			novosErros.valor_mensal = 'Valor mensal deve ser numérico e positivo'
		}

		if (!formData.forma_pagamento || formData.forma_pagamento.trim().length < 3) {
			novosErros.forma_pagamento = 'Informe a forma de pagamento'
		}

		if (!formData.objeto || formData.objeto.trim().length < 5) {
			novosErros.objeto = 'Objeto deve ter ao menos 5 caracteres'
		}

		if (formData.arquivo_convenio && formData.arquivo_convenio.trim().length > 500) {
			novosErros.arquivo_convenio = 'Caminho do arquivo deve ter no máximo 500 caracteres'
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
			const novoConvenio = {
				id_convenio: formData.id_convenio ? parseInt(formData.id_convenio, 10) : undefined,
				id_unidade: parseInt(formData.id_unidade, 10),
				id_local: parseInt(formData.id_local, 10),
				numero_convenio: formData.numero_convenio.trim(),
				tipo_convenio: formData.tipo_convenio,
				data_inicio_vigencia: formData.data_inicio_vigencia,
				data_fim_vigencia: formData.data_fim_vigencia,
				renovacao_automatica: Boolean(formData.renovacao_automatica),
				prazo_aviso_renovacao: formData.prazo_aviso_renovacao ? parseInt(formData.prazo_aviso_renovacao, 10) : null,
				valor_mensal: formData.valor_mensal ? Number(formData.valor_mensal) : null,
				forma_pagamento: formData.forma_pagamento.trim(),
				objeto: formData.objeto.trim(),
				arquivo_convenio: formData.arquivo_convenio ? formData.arquivo_convenio.trim() : '',
				status: formData.status,
				data_cadastro: formData.data_cadastro
					? new Date(formData.data_cadastro).toISOString()
					: new Date().toISOString()
			}

			if (onSalvar) {
				onSalvar(novoConvenio)
			}

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
		<div className='space-y-6 max-h-[75vh] overflow-y-auto pr-1'>
			{/* Cabeçalho */}
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2'>
						<FiFileText size={28} /> Cadastrar Convênio
					</h2>
					<p className='text-gray-600 mt-1'>Preencha os dados do convênio</p>
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
						<FiFileText size={20} /> Identificação
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>ID do Convênio</label>
							<input
								type='number'
								name='id_convenio'
								value={formData.id_convenio}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.id_convenio ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Opcional'
							/>
							{erros.id_convenio && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.id_convenio}
								</p>
							)}
						</div>

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

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								ID do Local (FK) <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='id_local'
								value={formData.id_local}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.id_local ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 1'
							/>
							{erros.id_local && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.id_local}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Detalhes do Convênio */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Detalhes do Convênio</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div className='md:col-span-2'>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Número do Convênio <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='numero_convenio'
								value={formData.numero_convenio}
								onChange={handleChange}
								maxLength='50'
								className={`w-full px-4 py-2 border ${erros.numero_convenio ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: CONV-2025-001'
							/>
							{erros.numero_convenio && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.numero_convenio}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Tipo de Convênio <span className='text-red-500'>*</span>
							</label>
							<select
								name='tipo_convenio'
								value={formData.tipo_convenio}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.tipo_convenio ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
							>
								<option value='Estágio'>Estágio</option>
								<option value='Cooperação'>Cooperação</option>
								<option value='Ambos'>Ambos</option>
							</select>
							{erros.tipo_convenio && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.tipo_convenio}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Vigência */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
						<FiCalendar size={20} /> Vigência
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Início da Vigência <span className='text-red-500'>*</span>
							</label>
							<input
								type='date'
								name='data_inicio_vigencia'
								value={formData.data_inicio_vigencia}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.data_inicio_vigencia ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
							/>
							{erros.data_inicio_vigencia && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.data_inicio_vigencia}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Fim da Vigência <span className='text-red-500'>*</span>
							</label>
							<input
								type='date'
								name='data_fim_vigencia'
								value={formData.data_fim_vigencia}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.data_fim_vigencia ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
							/>
							{erros.data_fim_vigencia && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.data_fim_vigencia}
								</p>
							)}
						</div>

						<div className='flex items-center gap-3 mt-2 md:mt-8'>
							<input
								type='checkbox'
								name='renovacao_automatica'
								checked={formData.renovacao_automatica}
								onChange={handleChange}
								className='w-5 h-5 text-[#237EE6] border-gray-300 rounded'
							/>
							<label className='text-sm font-semibold text-gray-700'>Renovação automática</label>
						</div>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>Prazo de Aviso (dias)</label>
							<input
								type='number'
								name='prazo_aviso_renovacao'
								value={formData.prazo_aviso_renovacao}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.prazo_aviso_renovacao ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 90'
							/>
							{erros.prazo_aviso_renovacao && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.prazo_aviso_renovacao}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Financeiro e Arquivo */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
						<FiDollarSign size={20} /> Financeiro e Arquivo
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>Valor Mensal</label>
							<input
								type='number'
								step='0.01'
								name='valor_mensal'
								value={formData.valor_mensal}
								onChange={handleChange}
								min='0'
								className={`w-full px-4 py-2 border ${erros.valor_mensal ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 5000.00'
							/>
							{erros.valor_mensal && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.valor_mensal}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Forma de Pagamento <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='forma_pagamento'
								value={formData.forma_pagamento}
								onChange={handleChange}
								maxLength='100'
								className={`w-full px-4 py-2 border ${erros.forma_pagamento ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: Transferência bancária'
							/>
							{erros.forma_pagamento && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.forma_pagamento}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Arquivo do Convênio
							</label>
							<input
								type='text'
								name='arquivo_convenio'
								value={formData.arquivo_convenio}
								onChange={handleChange}
								maxLength='500'
								className={`w-full px-4 py-2 border ${erros.arquivo_convenio ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: /docs/convenio_2025_001.pdf'
							/>
							{erros.arquivo_convenio && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.arquivo_convenio}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Objeto */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Objeto</h3>
					<textarea
						name='objeto'
						value={formData.objeto}
						onChange={handleChange}
						rows='4'
						className={`w-full px-4 py-2 border ${erros.objeto ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none resize-none`}
						placeholder='Ex: Estágio curricular obrigatório'
					/>
					{erros.objeto && (
						<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
							<FiAlertCircle size={12} /> {erros.objeto}
						</p>
					)}
				</div>

				{/* Status e Data */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Status e Registro</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>Status <span className='text-red-500'>*</span></label>
							<select
								name='status'
								value={formData.status}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.status ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
							>
								<option value='Vigente'>Vigente</option>
								<option value='Vencido'>Vencido</option>
								<option value='Cancelado'>Cancelado</option>
							</select>
							{erros.status && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.status}
								</p>
							)}
						</div>

						<div className='md:col-span-2'>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Data de Cadastro <span className='text-red-500'>*</span>
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
								<li>• IDs de unidade e local devem existir</li>
								<li>• Datas de vigência: fim deve ser após o início</li>
								<li>• Valor mensal é opcional, mas deve ser positivo se informado</li>
								<li>• Prazo de aviso é em dias e opcional</li>
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
						<FiSave size={18} /> Cadastrar Convênio
					</button>
				</div>
			</form>
		</div>
	)
}