import { useState } from 'react'
import { FiSave, FiX, FiAlertCircle, FiMapPin, FiHome, FiPhone, FiMail } from 'react-icons/fi'

export default function NovaUnidade({ onVoltar, onSalvar, initialValues = {} }) {
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
		id_unidade: initialValues.id_unidade ?? '',
		id_instituicao: initialValues.id_instituicao ?? '',
		nome_unidade: initialValues.nome_unidade ?? '',
		sigla: initialValues.sigla ?? '',
		cnpj_unidade: initialValues.cnpj_unidade ?? '',
		tipo_unidade: initialValues.tipo_unidade ?? 'Campus',
		endereco_completo: initialValues.endereco_completo ?? '',
		cidade: initialValues.cidade ?? '',
		uf: initialValues.uf ?? 'SP',
		cep: initialValues.cep ?? '',
		telefone: initialValues.telefone ?? '',
		email_contato: initialValues.email_contato ?? '',
		status: initialValues.status ?? 'Ativa',
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

		const positiveInt = (val) => Number.isInteger(Number(val)) && Number(val) > 0

		if (!positiveInt(formData.id_instituicao)) {
			novosErros.id_instituicao = 'Informe um ID de instituição válido (positivo)'
		}

		if (formData.id_unidade && !positiveInt(formData.id_unidade)) {
			novosErros.id_unidade = 'ID da unidade deve ser um número positivo'
		}

		if (!formData.nome_unidade || formData.nome_unidade.trim().length < 3) {
			novosErros.nome_unidade = 'Nome da unidade deve ter ao menos 3 caracteres'
		}

		if (!formData.sigla || formData.sigla.trim().length < 2 || formData.sigla.trim().length > 20) {
			novosErros.sigla = 'Sigla deve ter entre 2 e 20 caracteres'
		}

		if (formData.cnpj_unidade && formData.cnpj_unidade.replace(/\D/g, '').length < 14) {
			novosErros.cnpj_unidade = 'CNPJ deve ter 14 dígitos'
		}

		if (!formData.tipo_unidade) {
			novosErros.tipo_unidade = 'Selecione o tipo de unidade'
		}

		if (!formData.endereco_completo || formData.endereco_completo.trim().length < 5) {
			novosErros.endereco_completo = 'Endereço deve ter ao menos 5 caracteres'
		}

		if (!formData.cidade || formData.cidade.trim().length < 2) {
			novosErros.cidade = 'Cidade deve ter ao menos 2 caracteres'
		}

		if (!formData.uf || formData.uf.trim().length !== 2) {
			novosErros.uf = 'UF deve ter 2 caracteres'
		}

		if (!formData.cep || !/^\d{5}-?\d{3}$/.test(formData.cep)) {
			novosErros.cep = 'CEP deve estar no formato 00000-000'
		}

		if (formData.telefone && formData.telefone.replace(/\D/g, '').length < 8) {
			novosErros.telefone = 'Telefone deve ter ao menos 8 dígitos'
		}

		if (formData.email_contato && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_contato)) {
			novosErros.email_contato = 'E-mail inválido'
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
			const novaUnidade = {
				id_unidade: formData.id_unidade ? parseInt(formData.id_unidade, 10) : undefined,
				id_instituicao: parseInt(formData.id_instituicao, 10),
				nome_unidade: formData.nome_unidade.trim(),
				sigla: formData.sigla.trim(),
				cnpj_unidade: formData.cnpj_unidade ? formData.cnpj_unidade.trim() : '',
				tipo_unidade: formData.tipo_unidade,
				endereco_completo: formData.endereco_completo.trim(),
				cidade: formData.cidade.trim(),
				uf: formData.uf.trim().toUpperCase(),
				cep: formData.cep.trim(),
				telefone: formData.telefone ? formData.telefone.trim() : '',
				email_contato: formData.email_contato ? formData.email_contato.trim() : '',
				status: formData.status,
				data_cadastro: formData.data_cadastro
					? new Date(formData.data_cadastro).toISOString()
					: new Date().toISOString()
			}

			if (onSalvar) {
				onSalvar(novaUnidade)
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
						<FiHome size={28} /> Cadastrar Nova Unidade
					</h2>
					<p className='text-gray-600 mt-1'>Preencha os dados da unidade</p>
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
						<FiMapPin size={20} /> Identificação
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>ID da Unidade</label>
							<input
								type='number'
								name='id_unidade'
								value={formData.id_unidade}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.id_unidade ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Opcional'
							/>
							{erros.id_unidade && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.id_unidade}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								ID da Instituição (FK) <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='id_instituicao'
								value={formData.id_instituicao}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.id_instituicao ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 1'
							/>
							{erros.id_instituicao && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.id_instituicao}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Dados Principais */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Dados Principais</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Nome da Unidade <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='nome_unidade'
								value={formData.nome_unidade}
								onChange={handleChange}
								maxLength='200'
								className={`w-full px-4 py-2 border ${erros.nome_unidade ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: Campus São Paulo'
							/>
							{erros.nome_unidade && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.nome_unidade}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Sigla <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='sigla'
								value={formData.sigla}
								onChange={handleChange}
								maxLength='20'
								className={`w-full px-4 py-2 border ${erros.sigla ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: CSP'
							/>
							{erros.sigla && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.sigla}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Documentos e Tipo */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Documentos e Tipo</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>CNPJ</label>
							<input
								type='text'
								name='cnpj_unidade'
								value={formData.cnpj_unidade}
								onChange={handleChange}
								maxLength='18'
								className={`w-full px-4 py-2 border ${erros.cnpj_unidade ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 12.345.678/0002-71'
							/>
							{erros.cnpj_unidade && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.cnpj_unidade}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Tipo de Unidade <span className='text-red-500'>*</span>
							</label>
							<select
								name='tipo_unidade'
								value={formData.tipo_unidade}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.tipo_unidade ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
							>
								<option value='Campus'>Campus</option>
								<option value='Polo'>Polo</option>
								<option value='Extensão'>Extensão</option>
								<option value='Sede'>Sede</option>
							</select>
							{erros.tipo_unidade && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.tipo_unidade}
								</p>
							)}
						</div>

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
								<option value='Ativa'>Ativa</option>
								<option value='Inativa'>Inativa</option>
							</select>
							{erros.status && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.status}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Localização */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Localização</h3>
					<div className='space-y-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Endereço Completo <span className='text-red-500'>*</span>
							</label>
							<textarea
								name='endereco_completo'
								value={formData.endereco_completo}
								onChange={handleChange}
								rows='3'
								className={`w-full px-4 py-2 border ${erros.endereco_completo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none resize-none`}
								placeholder='Ex: Rua Botucatu, 740 - Vila Clementino'
							/>
							{erros.endereco_completo && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.endereco_completo}
								</p>
							)}
						</div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									Cidade <span className='text-red-500'>*</span>
								</label>
								<input
									type='text'
									name='cidade'
									value={formData.cidade}
									onChange={handleChange}
									maxLength='100'
									className={`w-full px-4 py-2 border ${erros.cidade ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
									placeholder='Ex: São Paulo'
								/>
								{erros.cidade && (
									<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
										<FiAlertCircle size={12} /> {erros.cidade}
									</p>
								)}
							</div>

							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									UF <span className='text-red-500'>*</span>
								</label>
								<select
									name='uf'
									value={formData.uf}
									onChange={handleChange}
									className={`w-full px-4 py-2 border ${erros.uf ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								>
									{[
										'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
									].map((estado) => (
										<option key={estado} value={estado}>{estado}</option>
									))}
								</select>
								{erros.uf && (
									<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
										<FiAlertCircle size={12} /> {erros.uf}
									</p>
								)}
							</div>

							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									CEP <span className='text-red-500'>*</span>
								</label>
								<input
									type='text'
									name='cep'
									value={formData.cep}
									onChange={handleChange}
									maxLength='9'
									className={`w-full px-4 py-2 border ${erros.cep ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
									placeholder='Ex: 04023-062'
								/>
								{erros.cep && (
									<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
										<FiAlertCircle size={12} /> {erros.cep}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Contatos */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Contatos</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>Telefone</label>
							<div className='relative'>
								<FiPhone className='absolute left-3 top-3 text-gray-400' size={16} />
								<input
									type='text'
									name='telefone'
									value={formData.telefone}
									onChange={handleChange}
									className={`w-full pl-9 pr-4 py-2 border ${erros.telefone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
									placeholder='Ex: (11) 5576-4000'
								/>
							</div>
							{erros.telefone && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.telefone}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>E-mail de Contato</label>
							<div className='relative'>
								<FiMail className='absolute left-3 top-3 text-gray-400' size={16} />
								<input
									type='email'
									name='email_contato'
									value={formData.email_contato}
									onChange={handleChange}
									maxLength='100'
									className={`w-full pl-9 pr-4 py-2 border ${erros.email_contato ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
									placeholder='Ex: campus.sp@unifesp.br'
								/>
							</div>
							{erros.email_contato && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.email_contato}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Data de Cadastro */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Registro</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
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
								<li>• O ID da instituição deve existir no cadastro</li>
								<li>• CEP no formato 00000-000</li>
								<li>• UF com 2 letras (ex: SP)</li>
								<li>• CNPJ é opcional, mas valide a numeração</li>
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
						<FiSave size={18} /> Cadastrar Unidade
					</button>
				</div>
			</form>
		</div>
	)
}
