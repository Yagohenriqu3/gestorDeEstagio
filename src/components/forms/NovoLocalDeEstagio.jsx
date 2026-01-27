import { useState } from 'react'
import { FiSave, FiX, FiAlertCircle, FiMapPin, FiPhone, FiMail, FiCompass } from 'react-icons/fi'

export default function NovoLocalDeEstagio({ onVoltar, onSalvar, initialValues = {} }) {
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
		id_local: initialValues.id_local ?? '',
		id_unidade: initialValues.id_unidade ?? '',
		nome_local: initialValues.nome_local ?? '',
		tipo_local: initialValues.tipo_local ?? 'Hospital',
		tipo_gestao: initialValues.tipo_gestao ?? 'SUS',
		cnpj: initialValues.cnpj ?? '',
		endereco_completo: initialValues.endereco_completo ?? '',
		cidade: initialValues.cidade ?? '',
		uf: initialValues.uf ?? 'SP',
		cep: initialValues.cep ?? '',
		telefone: initialValues.telefone ?? '',
		email_contato: initialValues.email_contato ?? '',
		latitude: initialValues.latitude ?? '',
		longitude: initialValues.longitude ?? '',
		raio_tolerancia_metros: initialValues.raio_tolerancia_metros ?? '',
		horario_funcionamento: initialValues.horario_funcionamento ?? '',
		capacidade_alunos: initialValues.capacidade_alunos ?? '',
		observacoes: initialValues.observacoes ?? '',
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
		const positiveInt = (val) => Number.isInteger(Number(val)) && Number(val) > 0

		if (formData.id_local && !positiveInt(formData.id_local)) {
			novosErros.id_local = 'ID do local deve ser número positivo'
		}

		if (!positiveInt(formData.id_unidade)) {
			novosErros.id_unidade = 'Informe um ID de unidade válido (positivo)'
		}

		if (!formData.nome_local || formData.nome_local.trim().length < 3) {
			novosErros.nome_local = 'Nome do local deve ter ao menos 3 caracteres'
		}

		if (!formData.tipo_local) {
			novosErros.tipo_local = 'Selecione o tipo do local'
		}

		if (!formData.tipo_gestao) {
			novosErros.tipo_gestao = 'Selecione o tipo de gestão'
		}

		if (formData.cnpj && formData.cnpj.replace(/\D/g, '').length < 14) {
			novosErros.cnpj = 'CNPJ deve ter 14 dígitos'
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

		if (formData.latitude && isNaN(Number(formData.latitude))) {
			novosErros.latitude = 'Latitude deve ser numérica'
		}

		if (formData.longitude && isNaN(Number(formData.longitude))) {
			novosErros.longitude = 'Longitude deve ser numérica'
		}

		if (!formData.raio_tolerancia_metros || !positiveInt(formData.raio_tolerancia_metros)) {
			novosErros.raio_tolerancia_metros = 'Raio de tolerância deve ser número positivo'
		}

		if (!formData.horario_funcionamento || formData.horario_funcionamento.trim().length < 2) {
			novosErros.horario_funcionamento = 'Informe o horário de funcionamento'
		}

		if (!formData.capacidade_alunos || !positiveInt(formData.capacidade_alunos)) {
			novosErros.capacidade_alunos = 'Capacidade deve ser número inteiro positivo'
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
			const novoLocal = {
				id_local: formData.id_local ? parseInt(formData.id_local, 10) : undefined,
				id_unidade: parseInt(formData.id_unidade, 10),
				nome_local: formData.nome_local.trim(),
				tipo_local: formData.tipo_local,
				tipo_gestao: formData.tipo_gestao,
				cnpj: formData.cnpj ? formData.cnpj.trim() : '',
				endereco_completo: formData.endereco_completo.trim(),
				cidade: formData.cidade.trim(),
				uf: formData.uf.trim().toUpperCase(),
				cep: formData.cep.trim(),
				telefone: formData.telefone ? formData.telefone.trim() : '',
				email_contato: formData.email_contato ? formData.email_contato.trim() : '',
				latitude: formData.latitude ? parseFloat(formData.latitude) : null,
				longitude: formData.longitude ? parseFloat(formData.longitude) : null,
				raio_tolerancia_metros: parseInt(formData.raio_tolerancia_metros, 10),
				horario_funcionamento: formData.horario_funcionamento.trim(),
				capacidade_alunos: parseInt(formData.capacidade_alunos, 10),
				observacoes: formData.observacoes ? formData.observacoes.trim() : '',
				status: formData.status,
				data_cadastro: formData.data_cadastro
					? new Date(formData.data_cadastro).toISOString()
					: new Date().toISOString()
			}

			if (onSalvar) {
				onSalvar(novoLocal)
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
						<FiMapPin size={28} /> Cadastrar Local de Estágio
					</h2>
					<p className='text-gray-600 mt-1'>Preencha os dados do local</p>
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
						<FiCompass size={20} /> Identificação
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>ID do Local</label>
							<input
								type='number'
								name='id_local'
								value={formData.id_local}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.id_local ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Opcional'
							/>
							{erros.id_local && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.id_local}
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
					</div>
				</div>

				{/* Dados Principais */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Dados Principais</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Nome do Local <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='nome_local'
								value={formData.nome_local}
								onChange={handleChange}
								maxLength='200'
								className={`w-full px-4 py-2 border ${erros.nome_local ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: Hospital Universitário São Paulo'
							/>
							{erros.nome_local && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.nome_local}
								</p>
							)}
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									Tipo do Local <span className='text-red-500'>*</span>
								</label>
								<select
									name='tipo_local'
									value={formData.tipo_local}
									onChange={handleChange}
									className={`w-full px-4 py-2 border ${erros.tipo_local ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								>
									<option value='Hospital'>Hospital</option>
									<option value='UBS'>UBS</option>
									<option value='Clínica'>Clínica</option>
									<option value='Ambulatório'>Ambulatório</option>
									<option value='Outro'>Outro</option>
								</select>
								{erros.tipo_local && (
									<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
										<FiAlertCircle size={12} /> {erros.tipo_local}
									</p>
								)}
							</div>

							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									Tipo de Gestão <span className='text-red-500'>*</span>
								</label>
								<select
									name='tipo_gestao'
									value={formData.tipo_gestao}
									onChange={handleChange}
									className={`w-full px-4 py-2 border ${erros.tipo_gestao ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								>
									<option value='SUS'>SUS</option>
									<option value='Privado'>Privado</option>
									<option value='Misto'>Misto</option>
								</select>
								{erros.tipo_gestao && (
									<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
										<FiAlertCircle size={12} /> {erros.tipo_gestao}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Documentos e Capacidade */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Documentos e Capacidade</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>CNPJ</label>
							<input
								type='text'
								name='cnpj'
								value={formData.cnpj}
								onChange={handleChange}
								maxLength='18'
								className={`w-full px-4 py-2 border ${erros.cnpj ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 12.345.678/0003-52'
							/>
							{erros.cnpj && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.cnpj}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Capacidade de Alunos <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='capacidade_alunos'
								value={formData.capacidade_alunos}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.capacidade_alunos ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 50'
							/>
							{erros.capacidade_alunos && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.capacidade_alunos}
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
								<option value='Ativo'>Ativo</option>
								<option value='Inativo'>Inativo</option>
								<option value='Suspenso'>Suspenso</option>
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
								placeholder='Ex: Av. Prof. Lineu Prestes, 2565'
							/>
							{erros.endereco_completo && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.endereco_completo}
								</p>
							)}
						</div>

						<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
							<div className='md:col-span-2'>
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
									placeholder='Ex: 05508-000'
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

				{/* Contatos e Geolocalização */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Contatos e Geolocalização</h3>
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
									placeholder='Ex: (11) 3091-9200'
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
									placeholder='Ex: contato@hu.usp.br'
								/>
							</div>
							{erros.email_contato && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.email_contato}
								</p>
							)}
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>Latitude</label>
							<input
								type='text'
								name='latitude'
								value={formData.latitude}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.latitude ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: -23.5615940'
							/>
							{erros.latitude && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.latitude}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>Longitude</label>
							<input
								type='text'
								name='longitude'
								value={formData.longitude}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${erros.longitude ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: -46.7289900'
							/>
							{erros.longitude && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.longitude}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Raio de Tolerância (m) <span className='text-red-500'>*</span>
							</label>
							<input
								type='number'
								name='raio_tolerancia_metros'
								value={formData.raio_tolerancia_metros}
								onChange={handleChange}
								min='1'
								className={`w-full px-4 py-2 border ${erros.raio_tolerancia_metros ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 100'
							/>
							{erros.raio_tolerancia_metros && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.raio_tolerancia_metros}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Operação */}
				<div>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>Operação</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>
								Horário de Funcionamento <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='horario_funcionamento'
								value={formData.horario_funcionamento}
								onChange={handleChange}
								maxLength='100'
								className={`w-full px-4 py-2 border ${erros.horario_funcionamento ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none`}
								placeholder='Ex: 24 horas'
							/>
							{erros.horario_funcionamento && (
								<p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
									<FiAlertCircle size={12} /> {erros.horario_funcionamento}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>Observações</label>
							<textarea
								name='observacoes'
								value={formData.observacoes}
								onChange={handleChange}
								rows='3'
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#237EE6] focus:border-transparent outline-none resize-none'
								placeholder='Informações adicionais'
							/>
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
								<li>• ID da unidade deve existir no cadastro</li>
								<li>• CEP no formato 00000-000 e UF com 2 letras</li>
								<li>• Raio de tolerância define a área permitida para check-in</li>
								<li>• Capacidade é a quantidade máxima de alunos simultâneos</li>
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
						<FiSave size={18} /> Cadastrar Local
					</button>
				</div>
			</form>
		</div>
	)
}