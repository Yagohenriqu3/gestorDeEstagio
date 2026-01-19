import { useState } from 'react'
import { FiHome, FiUsers, FiMapPin, FiClipboard, FiBarChart2, FiSettings, FiPlus, FiUpload, FiMenu, FiX, FiTarget, FiCalendar } from 'react-icons/fi'
import VicaoGeralAdm from './components/VicaoGeralAdm'
import InstituicoesUnidadesAdm from './components/InstituicoesUnidadesAdm'
import ImportacaoCSVAdm from './components/ImportacaoCSVAdm'
import PreceptoresMultiplosAdm from './components/PreceptoresMultiplosAdm'
import SemestreOfertasAdm from './components/SemestreOfertasAdm'
import AlunosNaoAlocadosAdm from './components/AlunosNaoAlocadosAdm'
import ListaAlunosAdm from './components/ListaAlunosAdm'

export default function DashboardAdm() {
  const [abaSelecionada, setAbaSelecionada] = useState('overview')
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)
  const [abaAlunos, setAbaAlunos] = useState('nao_alocados')
  const [abaInstituicoes, setAbaInstituicoes] = useState('unidades')
  const [abaCurriculos, setAbaCurriculos] = useState('lista')
  const [abaComponentes, setAbaComponentes] = useState('lista')
  const [abaDisponibilidade, setAbaDisponibilidade] = useState('lista')
  const [abaEspecialidades, setAbaEspecialidades] = useState('lista')
  const [abaCoordenadores, setAbaCoordenadores] = useState('lista')
  const [abaFrequencia, setAbaFrequencia] = useState('resumo')
  const [abaAvaliacoes, setAbaAvaliacoes] = useState('resumo')
  const [abaAusencias, setAbaAusencias] = useState('justificativas')
  const [abaVacinas, setAbaVacinas] = useState('obrigatorias')

  // Mock de instituições com unidades
  const instituicoes = [
    {
      id_instituicao: 1,
      nome_instituicao: 'UNIFESP',
      cnpj: '15.298.092/0001-04',
      tipo_instituicao: 'Universidade Federal',
      mantenedora: 'MEC',
      codigo_mec: '1234',
      site: 'www.unifesp.br',
      telefone: '(11) 3385-9000',
      email_contato: 'contato@unifesp.br',
      status: 'Ativa',
      data_cadastro: '2020-01-15',
      logo: 'https://via.placeholder.com/150',
      sigla: 'UNIFESP',
      total_unidades: 3,
      total_usuarios: 28,
      unidades: [
        { 
          id_unidade: 1, 
          id_instituicao: 1,
          nome_unidade: 'Campus São Paulo', 
          sigla: 'SP',
          cnpj_unidade: '15.298.092/0001-04',
          tipo_unidade: 'Campus',
          endereco_completo: 'Rua Silva Jardim, 136 - Vila Mariana',
          cidade: 'São Paulo', 
          uf: 'SP',
          cep: '01050-020',
          telefone: '(11) 3385-9000',
          email_contato: 'sp@unifesp.br',
          status: 'Ativa',
          data_cadastro: '2020-02-01',
          usuarios: 18, 
          cursos: ['Medicina', 'Enfermagem'], 
          locais: ['Hospital Universitário', 'HC'] 
        },
        { 
          id_unidade: 2, 
          id_instituicao: 1,
          nome_unidade: 'Campus Diadema', 
          sigla: 'DIA',
          cnpj_unidade: '15.298.092/0001-04',
          tipo_unidade: 'Campus',
          endereco_completo: 'Rua São Nicolau, 210 - Eldorado',
          cidade: 'Diadema', 
          uf: 'SP',
          cep: '09910-580',
          telefone: '(11) 4057-9000',
          email_contato: 'diadema@unifesp.br',
          status: 'Ativa',
          data_cadastro: '2020-03-01',
          usuarios: 7, 
          cursos: ['Farmácia'], 
          locais: ['Lab. Clínico'] 
        },
        { 
          id_unidade: 3, 
          id_instituicao: 1,
          nome_unidade: 'Campus Santos', 
          sigla: 'SAN',
          cnpj_unidade: '15.298.092/0001-04',
          tipo_unidade: 'Campus',
          endereco_completo: 'Avenida Almirante Tamandaré, 135 - Ponta da Praia',
          cidade: 'Santos', 
          uf: 'SP',
          cep: '11030-906',
          telefone: '(13) 3229-5000',
          email_contato: 'santos@unifesp.br',
          status: 'Ativa',
          data_cadastro: '2020-04-01',
          usuarios: 3, 
          cursos: ['Psicologia'], 
          locais: ['Clínica-Escola'] 
        }
      ]
    },
    {
      id_instituicao: 2,
      nome_instituicao: 'USP',
      cnpj: '63.025.530/0001-04',
      tipo_instituicao: 'Universidade Estadual',
      mantenedora: 'Secretaria de Educação do Estado de SP',
      codigo_mec: '5678',
      site: 'www.usp.br',
      telefone: '(11) 3091-3000',
      email_contato: 'contato@usp.br',
      status: 'Ativa',
      data_cadastro: '2019-05-10',
      logo: 'https://via.placeholder.com/150',
      sigla: 'USP',
      total_unidades: 5,
      total_usuarios: 42,
      unidades: [
        { 
          id_unidade: 4, 
          id_instituicao: 2,
          nome_unidade: 'Faculdade de Medicina', 
          sigla: 'FM',
          cnpj_unidade: '63.025.530/0001-04',
          tipo_unidade: 'Faculdade',
          endereco_completo: 'Avenida Dr. Arnaldo, 455 - Cerqueira César',
          cidade: 'São Paulo', 
          uf: 'SP',
          cep: '01246-903',
          telefone: '(11) 3061-7000',
          email_contato: 'fm@usp.br',
          status: 'Ativa',
          data_cadastro: '2019-06-01',
          usuarios: 22, 
          cursos: ['Medicina'], 
          locais: ['Hospital das Clínicas', 'InCor'] 
        },
        { 
          id_unidade: 5, 
          id_instituicao: 2,
          nome_unidade: 'Faculdade de Enfermagem', 
          sigla: 'FE',
          cnpj_unidade: '63.025.530/0001-04',
          tipo_unidade: 'Faculdade',
          endereco_completo: 'Avenida Dr. Enéas de Carvalho Aguiar, 419 - Cerqueira César',
          cidade: 'São Paulo', 
          uf: 'SP',
          cep: '05403-000',
          telefone: '(11) 3061-7600',
          email_contato: 'fe@usp.br',
          status: 'Ativa',
          data_cadastro: '2019-07-01',
          usuarios: 20, 
          cursos: ['Enfermagem'], 
          locais: ['HC', 'Instituto da Criança'] 
        }
      ]
    }
  ]

  // Mock de cursos por unidade
  const cursos = [
    {
      id_curso: 1,
      id_unidade: 1,
      nome_curso: 'Bacharelado em Medicina',
      grau: 'Bacharelado',
      modalidade: 'Presencial',
      duracao_semestres: 12,
      carga_horaria_total: 7920,
      codigo_mec: '12345',
      descricao: 'Curso de formação em medicina com ênfase em prática clínica',
      status: 'Ativo',
      area: 'Saúde'
    },
    {
      id_curso: 2,
      id_unidade: 1,
      nome_curso: 'Bacharelado em Enfermagem',
      grau: 'Bacharelado',
      modalidade: 'Presencial',
      duracao_semestres: 8,
      carga_horaria_total: 4000,
      codigo_mec: '12346',
      descricao: 'Curso de formação em enfermagem com foco em cuidados ao paciente',
      status: 'Ativo',
      area: 'Saúde'
    },
    {
      id_curso: 3,
      id_unidade: 2,
      nome_curso: 'Bacharelado em Farmácia',
      grau: 'Bacharelado',
      modalidade: 'Presencial',
      duracao_semestres: 10,
      carga_horaria_total: 5000,
      codigo_mec: '12347',
      descricao: 'Curso de formação em farmácia clínica e tecnologia farmacêutica',
      status: 'Ativo',
      area: 'Saúde'
    },
    {
      id_curso: 4,
      id_unidade: 3,
      nome_curso: 'Bacharelado em Psicologia',
      grau: 'Bacharelado',
      modalidade: 'Presencial',
      duracao_semestres: 8,
      carga_horaria_total: 4500,
      codigo_mec: '12348',
      descricao: 'Curso de formação em psicologia clínica e saúde mental',
      status: 'Ativo',
      area: 'Saúde'
    },
    {
      id_curso: 5,
      id_unidade: 4,
      nome_curso: 'Bacharelado em Medicina',
      grau: 'Bacharelado',
      modalidade: 'Presencial',
      duracao_semestres: 12,
      carga_horaria_total: 7920,
      codigo_mec: '12349',
      descricao: 'Curso de formação em medicina com currículo atualizado',
      status: 'Ativo',
      area: 'Saúde'
    },
    {
      id_curso: 6,
      id_unidade: 5,
      nome_curso: 'Bacharelado em Enfermagem',
      grau: 'Bacharelado',
      modalidade: 'Presencial',
      duracao_semestres: 8,
      carga_horaria_total: 4000,
      codigo_mec: '12350',
      descricao: 'Curso de formação em enfermagem com ênfase em saúde coletiva',
      status: 'Ativo',
      area: 'Saúde'
    }
  ]
  const preceptores = [
    {
      id: 1,
      nome: 'Dr. Carlos Silva',
      crm: '123456/SP',
      email: 'carlos.silva@unifesp.br',
      telefone: '(11) 98765-4321',
      instituicao: 'UNIFESP',
      unidade: 'Campus São Paulo',
      alocacoes: [
        { 
          id: 1,
          especialidade: 'Cardiologia', 
          local: 'Hospital Universitário', 
          status: 'Ativa',
          alunos: [
            { id: 101, nome: 'João Santos', matricula: 'MAT2024001', periodo: '6º' },
            { id: 103, nome: 'Pedro Oliveira', matricula: 'MAT2024003', periodo: '6º' },
            { id: 105, nome: 'Carlos Pereira', matricula: 'MAT2024005', periodo: '5º' }
          ]
        },
        { 
          id: 2,
          especialidade: 'Clínica Geral', 
          local: 'HC', 
          status: 'Ativa',
          alunos: [
            { id: 102, nome: 'Maria Silva', matricula: 'MAT2024002', periodo: '8º' },
            { id: 104, nome: 'Ana Souza', matricula: 'MAT2024004', periodo: '7º' }
          ]
        }
      ]
    },
    {
      id: 2,
      nome: 'Dra. Ana Costa',
      crm: '789012/SP',
      email: 'ana.costa@usp.br',
      telefone: '(11) 91234-5678',
      instituicao: 'USP',
      unidade: 'Faculdade de Medicina',
      alocacoes: [
        { 
          id: 3,
          especialidade: 'Pediatria', 
          local: 'Instituto da Criança', 
          status: 'Ativa',
          alunos: [
            { id: 102, nome: 'Maria Silva', matricula: 'MAT2024002', periodo: '8º' },
            { id: 104, nome: 'Ana Souza', matricula: 'MAT2024004', periodo: '7º' },
            { id: 106, nome: 'Luiza Santos', matricula: 'MAT2024006', periodo: '9º' },
            { id: 101, nome: 'João Santos', matricula: 'MAT2024001', periodo: '6º' }
          ]
        }
      ]
    },
    {
      id: 3,
      nome: 'Dr. Roberto Mendes',
      crm: '345678/SP',
      email: 'roberto.mendes@unifesp.br',
      telefone: '(11) 97654-3210',
      instituicao: 'UNIFESP',
      unidade: 'Campus Diadema',
      alocacoes: [
        { 
          id: 4,
          especialidade: 'Farmácia Clínica', 
          local: 'Lab. Clínico', 
          status: 'Ativa',
          alunos: [
            { id: 105, nome: 'Carlos Pereira', matricula: 'MAT2024005', periodo: '5º' }
          ]
        }
      ]
    }
  ]

  // Mock de CURRICULO_ESTAGIO
  const curriculos = [
    {
      id_curriculo: 1,
      id_curso: 1,
      id_unidade: 1,
      nome_curriculo: 'Medicina - Currículo 2025',
      ano_vigencia: 2025,
      periodo_obrigatorio_minimo: 9,
      carga_horaria_total: 3200,
      carga_horaria_minima: 3000,
      versao: '1.0',
      status: 'Vigente',
      data_criacao: '2024-08-15',
      descricao: 'Currículo de medicina com 9º ao 12º período dedicados a estágios'
    },
    {
      id_curriculo: 2,
      id_curso: 5,
      id_unidade: 4,
      nome_curriculo: 'Medicina - Currículo 2025 (USP)',
      ano_vigencia: 2025,
      periodo_obrigatorio_minimo: 9,
      carga_horaria_total: 3200,
      carga_horaria_minima: 3000,
      versao: '1.0',
      status: 'Vigente',
      data_criacao: '2024-08-20',
      descricao: 'Currículo de medicina USP com ênfase em pesquisa'
    },
    {
      id_curriculo: 3,
      id_curso: 2,
      id_unidade: 1,
      nome_curriculo: 'Enfermagem - Currículo 2025',
      ano_vigencia: 2025,
      periodo_obrigatorio_minimo: 7,
      carga_horaria_total: 2400,
      carga_horaria_minima: 2200,
      versao: '1.0',
      status: 'Vigente',
      data_criacao: '2024-08-18',
      descricao: 'Currículo de enfermagem com ênfase em saúde coletiva'
    }
  ]

  // Mock de COMPONENTE_CURRICULAR
  const componentes = [
    {
      id_componente: 101,
      id_curriculo: 1,
      nome_componente: 'Clínica Médica I',
      codigo_componente: 'MED-101',
      semestre_ideal: 9,
      carga_horaria: 160,
      creditos: 8,
      descricao: 'Introdução à clínica médica com pacientes internados',
      objetivo: 'Desenvolver habilidades de anamnese e exame físico',
      competencias: ['Avaliação clínica', 'Diagnóstico', 'Prescrição'],
      status: 'Ativo',
      tipo: 'Obrigatório',
      locais_recomendados: ['Hospital Universitário', 'Hospital das Clínicas']
    },
    {
      id_componente: 102,
      id_curriculo: 1,
      nome_componente: 'Urgência e Emergência',
      codigo_componente: 'MED-102',
      semestre_ideal: 9,
      carga_horaria: 160,
      creditos: 8,
      descricao: 'Atendimento em emergências e urgências',
      objetivo: 'Capacitar para triagem e atendimento inicial',
      competencias: ['Triagem', 'Suporte vital', 'Estabilização'],
      status: 'Ativo',
      tipo: 'Obrigatório',
      locais_recomendados: ['PS Hospital Universitário', 'Pronto-Socorro HC']
    },
    {
      id_componente: 103,
      id_curriculo: 1,
      nome_componente: 'Pediatria',
      codigo_componente: 'MED-103',
      semestre_ideal: 10,
      carga_horaria: 160,
      creditos: 8,
      descricao: 'Atendimento pediátrico em diversas especialidades',
      objetivo: 'Desenvolver habilidades em cuidado pediátrico',
      competencias: ['Pediatria geral', 'Comunicação com responsáveis', 'Cuidado sistêmico'],
      status: 'Ativo',
      tipo: 'Obrigatório',
      locais_recomendados: ['Instituto da Criança', 'Pediatria HC']
    },
    {
      id_componente: 104,
      id_curriculo: 1,
      nome_componente: 'Cirurgia Geral',
      codigo_componente: 'MED-104',
      semestre_ideal: 11,
      carga_horaria: 160,
      creditos: 8,
      descricao: 'Procedimentos cirúrgicos gerais e acompanhamento pré/pós-op',
      objetivo: 'Integrar conhecimentos de cirurgia em prática clínica',
      competencias: ['Técnica cirúrgica', 'Preparo pré-operatório', 'Cuidados pós-op'],
      status: 'Ativo',
      tipo: 'Obrigatório',
      locais_recomendados: ['Centro Cirúrgico HC', 'Centro Cirúrgico Hospital Universitário']
    },
    {
      id_componente: 201,
      id_curriculo: 3,
      nome_componente: 'Saúde Pública I',
      codigo_componente: 'ENF-201',
      semestre_ideal: 7,
      carga_horaria: 120,
      creditos: 6,
      descricao: 'Conceitos de epidemiologia e vigilância em saúde',
      objetivo: 'Aplicar conhecimentos em saúde coletiva',
      competencias: ['Epidemiologia', 'Vigilância', 'Gestão em saúde'],
      status: 'Ativo',
      tipo: 'Obrigatório',
      locais_recomendados: ['Secretaria de Saúde', 'UBS', 'Centro de Saúde Escola']
    }
  ]

  // Mock de DISPONIBILIDADE_PRECEPTOR
  const disponibilidades = [
    {
      id_disponibilidade: 1,
      id_preceptor: 1,
      id_local_estagio: 1,
      id_componente: 101,
      nome_componente: 'Clínica Médica I',
      nome_preceptor: 'Dr. Carlos Silva',
      nome_local: 'Hospital Universitário São Paulo',
      turno: 'Manhã',
      horario_inicio: '07:00',
      horario_fim: '13:00',
      dias_semana: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA'],
      capacidade_alunos: 5,
      alunos_alocados: 3,
      status: 'Ativa',
      data_inicio: '2025-02-03',
      data_fim: '2025-03-02'
    },
    {
      id_disponibilidade: 2,
      id_preceptor: 2,
      id_local_estagio: 2,
      id_componente: 102,
      nome_componente: 'Urgência e Emergência',
      nome_preceptor: 'Dra. Ana Costa',
      nome_local: 'PS Hospital das Clínicas',
      turno: 'Integral',
      horario_inicio: '07:00',
      horario_fim: '19:00',
      dias_semana: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'],
      capacidade_alunos: 6,
      alunos_alocados: 4,
      status: 'Ativa',
      data_inicio: '2025-02-03',
      data_fim: '2025-03-02'
    },
    {
      id_disponibilidade: 3,
      id_preceptor: 1,
      id_local_estagio: 1,
      id_componente: 103,
      nome_componente: 'Pediatria',
      nome_preceptor: 'Dr. Carlos Silva',
      nome_local: 'Hospital Universitário São Paulo',
      turno: 'Tarde',
      horario_inicio: '13:00',
      horario_fim: '19:00',
      dias_semana: ['SEGUNDA', 'TERÇA', 'QUARTA'],
      capacidade_alunos: 4,
      alunos_alocados: 2,
      status: 'Ativa',
      data_inicio: '2025-04-01',
      data_fim: '2025-05-31'
    },
    {
      id_disponibilidade: 4,
      id_preceptor: 3,
      id_local_estagio: 1,
      id_componente: 104,
      nome_componente: 'Cirurgia Geral',
      nome_preceptor: 'Dr. Roberto Mendes',
      nome_local: 'Hospital Universitário São Paulo',
      turno: 'Manhã',
      horario_inicio: '07:00',
      horario_fim: '13:00',
      dias_semana: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA'],
      capacidade_alunos: 5,
      alunos_alocados: 3,
      status: 'Ativa',
      data_inicio: '2025-05-01',
      data_fim: '2025-06-30'
    },
    {
      id_disponibilidade: 5,
      id_preceptor: 2,
      id_local_estagio: 3,
      id_componente: 201,
      nome_componente: 'Saúde Pública I',
      nome_preceptor: 'Dra. Ana Costa',
      nome_local: 'Centro de Saúde Escola',
      turno: 'Tarde',
      horario_inicio: '13:00',
      horario_fim: '17:00',
      dias_semana: ['SEGUNDA', 'QUARTA', 'SEXTA'],
      capacidade_alunos: 8,
      alunos_alocados: 6,
      status: 'Ativa',
      data_inicio: '2025-03-01',
      data_fim: '2025-04-30'
    }
  ]

  // Mock de ofertas de semestre (com rodízios, componentes, convênios e alocação)
  const ofertas = [
    {
      id_oferta_semestre: 1,
      id_curriculo: 1,
      id_unidade: 1,
      unidade: 'Campus São Paulo',
      curso: 'Medicina',
      ano_letivo: 2025,
      semestre: 1,
      descricao: '1º Semestre 2025',
      data_inicio: '2025-02-03',
      data_fim: '2025-06-30',
      total_alunos_previstos: 115,
      status: 'Andamento',
      observacoes: 'Semestre com 4 rodízios e reforço em urgência/emergência',
      data_cadastro: '2025-01-15 10:30:00',
      horas_praticas_exigidas: 1200,
      horas_praticas_ofertadas: 1320,
      alunos_alocados: 92,
      alunos_pendentes: 23,
      dias_sem_alocar_media: 18,
      proximos_formandos: [
        { id: 201, nome: 'Paula Ribeiro', periodo: '11º', faltam_horas: 120, dias_sem_alocacao: 25 },
        { id: 202, nome: 'Lucas Martins', periodo: '12º', faltam_horas: 80, dias_sem_alocacao: 12 },
        { id: 203, nome: 'Fernanda Lopes', periodo: '10º', faltam_horas: 200, dias_sem_alocacao: 34 }
      ],
      alunos_nao_alocados: [
        { id: 101, nome: 'João Santos', matricula: 'MAT2024001', periodo: '6º', dias_sem_alocacao: 45 },
        { id: 102, nome: 'Maria Silva', matricula: 'MAT2024002', periodo: '8º', dias_sem_alocacao: 32 },
        { id: 103, nome: 'Pedro Oliveira', matricula: 'MAT2024003', periodo: '6º', dias_sem_alocacao: 18 }
      ],
      rodizios: [
        {
          id_rodizio: 1,
          nome_rodizio: 'Rodízio A',
          codigo_rodizio: '2025.1-A',
          vagas_total: 30,
          vagas_ocupadas: 28,
          ordem_execucao: 1,
          cor_identificacao: '#FF6B6B',
          status: 'Ativo',
          observacoes: 'Rodízio matutino',
          data_inicio: '2025-02-03',
          data_fim: '2025-03-30',
          componentes: [
            {
              id_oferta_componente: 1,
              id_componente: 101,
              nome_componente: 'Clínica Médica I',
              ordem_no_rodizio: 1,
              data_inicio_componente: '2025-02-03',
              data_fim_componente: '2025-03-02',
              carga_horaria_semanal: 40,
              numero_semanas: 4,
              vagas_disponiveis: 30,
              status: 'Em Andamento',
              observacoes: 'Período inicial do rodízio'
            },
            {
              id_oferta_componente: 2,
              id_componente: 102,
              nome_componente: 'Urgência e Emergência',
              ordem_no_rodizio: 2,
              data_inicio_componente: '2025-03-03',
              data_fim_componente: '2025-03-30',
              carga_horaria_semanal: 40,
              numero_semanas: 4,
              vagas_disponiveis: 30,
              status: 'Planejado',
              observacoes: 'Requer visita técnica prévia'
            }
          ]
        },
        {
          id_rodizio: 2,
          nome_rodizio: 'Rodízio B',
          codigo_rodizio: '2025.1-B',
          vagas_total: 25,
          vagas_ocupadas: 20,
          ordem_execucao: 2,
          cor_identificacao: '#2ECC71',
          status: 'Ativo',
          observacoes: 'Rodízio noturno',
          data_inicio: '2025-04-01',
          data_fim: '2025-05-31',
          componentes: [
            {
              id_oferta_componente: 3,
              id_componente: 103,
              nome_componente: 'Clínica Cirúrgica',
              ordem_no_rodizio: 1,
              data_inicio_componente: '2025-04-01',
              data_fim_componente: '2025-05-15',
              carga_horaria_semanal: 32,
              numero_semanas: 7,
              vagas_disponiveis: 25,
              status: 'Planejado',
              observacoes: 'Necessita aprovação do conveniado'
            }
          ]
        }
      ],
      convenios: [
        {
          id_convenio: 1,
          id_unidade: 1,
          id_local: 1,
          numero_convenio: 'CONV-2025-001',
          tipo_convenio: 'Estágio',
          data_inicio_vigencia: '2025-01-01',
          data_fim_vigencia: '2027-12-31',
          renovacao_automatica: true,
          prazo_aviso_renovacao: 90,
          valor_mensal: 5000.0,
          forma_pagamento: 'Transferência bancária',
          objeto: 'Estágio curricular obrigatório',
          arquivo_convenio: '/docs/convenio_2025_001.pdf',
          status: 'Vigente',
          local: 'Hospital Universitário'
        }
      ]
    },
    {
      id_oferta_semestre: 2,
      id_curriculo: 2,
      id_unidade: 5,
      unidade: 'Faculdade de Enfermagem (USP)',
      curso: 'Enfermagem',
      ano_letivo: 2025,
      semestre: 2,
      descricao: '2º Semestre 2025',
      data_inicio: '2025-08-05',
      data_fim: '2025-12-10',
      total_alunos_previstos: 80,
      status: 'Planejamento',
      observacoes: 'Revisar oferta pediatria e intensivismo',
      data_cadastro: '2025-04-02 09:00:00',
      horas_praticas_exigidas: 900,
      horas_praticas_ofertadas: 760,
      alunos_alocados: 34,
      alunos_pendentes: 46,
      dias_sem_alocar_media: 27,
      proximos_formandos: [
        { id: 204, nome: 'Bruna Costa', periodo: '7º', faltam_horas: 160, dias_sem_alocacao: 40 },
        { id: 205, nome: 'Rafael Souza', periodo: '8º', faltam_horas: 90, dias_sem_alocacao: 10 }
      ],
      alunos_nao_alocados: [
        { id: 107, nome: 'Tatiane Lima', matricula: 'MAT2024010', periodo: '6º', dias_sem_alocacao: 52 },
        { id: 108, nome: 'Gustavo Nunes', matricula: 'MAT2024011', periodo: '7º', dias_sem_alocacao: 29 }
      ],
      rodizios: [
        {
          id_rodizio: 3,
          nome_rodizio: 'Rodízio Pediatria',
          codigo_rodizio: '2025.2-PED',
          vagas_total: 20,
          vagas_ocupadas: 14,
          ordem_execucao: 1,
          cor_identificacao: '#3498DB',
          status: 'Planejado',
          observacoes: 'Aguardando liberação do convênio',
          data_inicio: '2025-08-05',
          data_fim: '2025-10-01',
          componentes: [
            {
              id_oferta_componente: 4,
              id_componente: 201,
              nome_componente: 'Enfermagem Pediátrica I',
              ordem_no_rodizio: 1,
              data_inicio_componente: '2025-08-05',
              data_fim_componente: '2025-09-05',
              carga_horaria_semanal: 36,
              numero_semanas: 4,
              vagas_disponiveis: 20,
              status: 'Planejado',
              observacoes: 'Precisa de preceptor extra 2 semanas'
            }
          ]
        }
      ],
      convenios: [
        {
          id_convenio: 2,
          id_unidade: 5,
          id_local: 2,
          numero_convenio: 'CONV-2024-018',
          tipo_convenio: 'Estágio',
          data_inicio_vigencia: '2024-07-01',
          data_fim_vigencia: '2025-12-31',
          renovacao_automatica: false,
          prazo_aviso_renovacao: 60,
          valor_mensal: 3200.0,
          forma_pagamento: 'Transferência bancária',
          objeto: 'Estágio em enfermagem pediátrica',
          arquivo_convenio: '/docs/convenio_2024_018.pdf',
          status: 'Vigente',
          local: 'Instituto da Criança'
        }
      ]
    }
  ]

  // Mock de alunos não alocados
  const alunos_nao_alocados = [
    { id: 1, nome: 'João Santos', matricula: 'MAT2024001', periodo: '6º', dias_sem_alocacao: 45, data_cadastro: '2024-01-15' },
    { id: 2, nome: 'Maria Silva', matricula: 'MAT2024002', periodo: '8º', dias_sem_alocacao: 32, data_cadastro: '2024-02-01' },
    { id: 3, nome: 'Pedro Oliveira', matricula: 'MAT2024003', periodo: '6º', dias_sem_alocacao: 18, data_cadastro: '2024-02-10' }
  ]

  // Mock de alunos (lista geral)
  const alunos = [
    { id: 101, nome: 'João Santos', matricula: 'MAT2024001', periodo: '6º', instituicao: 'UNIFESP' },
    { id: 102, nome: 'Maria Silva', matricula: 'MAT2024002', periodo: '8º', instituicao: 'USP' },
    { id: 103, nome: 'Pedro Oliveira', matricula: 'MAT2024003', periodo: '6º', instituicao: 'UNIFESP' },
    { id: 104, nome: 'Ana Souza', matricula: 'MAT2024004', periodo: '7º', instituicao: 'USP' },
    { id: 105, nome: 'Carlos Pereira', matricula: 'MAT2024005', periodo: '5º', instituicao: 'UNIFESP' },
    { id: 106, nome: 'Luiza Santos', matricula: 'MAT2024006', periodo: '9º', instituicao: 'USP' }
  ]

  // Mock de ESPECIALIDADE
  const especialidades = [
    { id_especialidade: 1, nome_especialidade: 'Clínica Médica', codigo: 'CM001', descricao: 'Especialidade em clínica geral', area_conhecimento: 'Medicina', status: 'Ativa', data_cadastro: '2024-01-15' },
    { id_especialidade: 2, nome_especialidade: 'Cirurgia Geral', codigo: 'CG001', descricao: 'Especialidade cirúrgica', area_conhecimento: 'Medicina', status: 'Ativa', data_cadastro: '2024-01-15' },
    { id_especialidade: 3, nome_especialidade: 'Pediatria', codigo: 'PED001', descricao: 'Especialidade em pediatria', area_conhecimento: 'Medicina', status: 'Ativa', data_cadastro: '2024-01-15' },
    { id_especialidade: 4, nome_especialidade: 'Enfermagem Clínica', codigo: 'ENF001', descricao: 'Cuidados de enfermagem', area_conhecimento: 'Enfermagem', status: 'Ativa', data_cadastro: '2024-01-15' },
    { id_especialidade: 5, nome_especialidade: 'Farmácia Clínica', codigo: 'FAR001', descricao: 'Farmácia hospitalar', area_conhecimento: 'Farmácia', status: 'Ativa', data_cadastro: '2024-01-15' }
  ]

  // Mock de COORDENADOR_ESTAGIO
  const coordenadores = [
    { id_coordenador: 1, nome: 'Dr. Carlos Silva', email: 'carlos.silva@unifesp.br', unidade: 'Campus São Paulo', portaria: 'PORT-2024-001', data_inicio: '2024-01-01', data_fim: '2026-12-31', carga_horaria: 20, status: 'Ativo' },
    { id_coordenador: 2, nome: 'Dra. Marta Costa', email: 'marta.costa@usp.br', unidade: 'USP - Faculdade de Medicina', portaria: 'PORT-2024-002', data_inicio: '2024-01-01', data_fim: '2026-12-31', carga_horaria: 20, status: 'Ativo' },
    { id_coordenador: 3, nome: 'Prof. João Pereira', email: 'joao.pereira@unifesp.br', unidade: 'Campus Diadema', portaria: 'PORT-2024-003', data_inicio: '2023-06-01', data_fim: '2025-05-31', carga_horaria: 15, status: 'Ativo' }
  ]

  // Mock de REGISTRO_FREQUENCIA (resumo)
  const frequenciaResumo = [
    { id_aluno: 101, aluno: 'João Santos', total_registros: 45, presencas: 42, faltas: 3, frequencia_pct: 93.3, status: 'OK', instituicao: 'UNIFESP' },
    { id_aluno: 102, aluno: 'Maria Silva', total_registros: 48, presencas: 45, faltas: 3, frequencia_pct: 93.7, status: 'OK', instituicao: 'USP' },
    { id_aluno: 103, aluno: 'Pedro Oliveira', total_registros: 40, presencas: 32, faltas: 8, frequencia_pct: 80.0, status: 'Alerta', instituicao: 'UNIFESP' },
    { id_aluno: 104, aluno: 'Ana Souza', total_registros: 50, presencas: 48, faltas: 2, frequencia_pct: 96.0, status: 'OK', instituicao: 'USP' },
    { id_aluno: 105, aluno: 'Carlos Pereira', total_registros: 35, presencas: 28, faltas: 7, frequencia_pct: 80.0, status: 'Alerta', instituicao: 'UNIFESP' }
  ]

  // Mock de AVALIACAO_ALUNO
  const avaliacoes = [
    { id_avaliacao: 1, aluno: 'João Santos', matricula: 'MAT2024001', componente: 'Clínica Médica', nota: 8.5, situacao: 'Realizada', data_realizacao: '2025-03-15', avaliador: 'Dra. Maria Silva', feedback: 'Bom desempenho' },
    { id_avaliacao: 2, aluno: 'Maria Silva', matricula: 'MAT2024002', componente: 'Pediatria', nota: 9.0, situacao: 'Realizada', data_realizacao: '2025-03-20', avaliador: 'Dr. Paulo Costa', feedback: 'Excelente' },
    { id_avaliacao: 3, aluno: 'Pedro Oliveira', matricula: 'MAT2024003', componente: 'Cirurgia', nota: 7.8, situacao: 'Realizada', data_realizacao: '2025-03-18', avaliador: 'Prof. João Mendes', feedback: 'Satisfatório' },
    { id_avaliacao: 4, aluno: 'Ana Souza', matricula: 'MAT2024004', componente: 'Clínica', nota: null, situacao: 'Pendente', data_realizacao: null, avaliador: '-', feedback: '-' },
    { id_avaliacao: 5, aluno: 'Carlos Pereira', matricula: 'MAT2024005', componente: 'Pediatria', nota: 8.2, situacao: 'Realizada', data_realizacao: '2025-03-22', avaliador: 'Dra. Ana Costa', feedback: 'Bom' }
  ]

  // Mock de JUSTIFICATIVA_FALTA
  const justificativas = [
    { id_justificativa: 1, aluno: 'Pedro Oliveira', data_falta: '2025-02-05', tipo: 'Atestado Médico', descricao: 'Gripe', status: 'Aprovada', data_analise: '2025-02-06', analisado_por: 'Dra. Marta Costa', requer_reposicao: true, horas_reposicao: 4 },
    { id_justificativa: 2, aluno: 'Carlos Pereira', data_falta: '2025-02-10', tipo: 'Luto', descricao: 'Falecimento de avó', status: 'Aprovada', data_analise: '2025-02-10', analisado_por: 'Dr. Carlos Silva', requer_reposicao: false, horas_reposicao: 0 },
    { id_justificativa: 3, aluno: 'João Santos', data_falta: '2025-02-15', tipo: 'Comparecimento Judiciário', descricao: 'Audiência', status: 'Pendente', data_analise: null, analisado_por: '-', requer_reposicao: true, horas_reposicao: 8 }
  ]

  // Mock de VACINA_OBRIGATORIA e REGISTRO_VACINA_ALUNO
  const vacinasObrigatorias = [
    { id_vacina: 1, nome: 'Hepatite B', doses_necessarias: 3, intervalo_dias: 30, validade_anos: 10 },
    { id_vacina: 2, nome: 'Febre Amarela', doses_necessarias: 1, intervalo_dias: 0, validade_anos: 10 },
    { id_vacina: 3, nome: 'Tríplice Viral (SRC)', doses_necessarias: 1, intervalo_dias: 0, validade_anos: null },
    { id_vacina: 4, nome: 'Dupla Adulto (DT)', doses_necessarias: 3, intervalo_dias: 30, validade_anos: 10 },
    { id_vacina: 5, nome: 'Varicela', doses_necessarias: 2, intervalo_dias: 30, validade_anos: null },
    { id_vacina: 6, nome: 'COVID-19', doses_necessarias: 3, intervalo_dias: 30, validade_anos: 1 },
    { id_vacina: 7, nome: 'Influenza', doses_necessarias: 1, intervalo_dias: 0, validade_anos: 1 }
  ]

  const registroVacinas = [
    { id_aluno: 101, aluno: 'João Santos', vacina: 'Hepatite B', doses_aplicadas: 3, status: 'Completo', data_ultima_dose: '2024-08-15', validade: '2034-08-15', alerta_renovacao: false },
    { id_aluno: 101, aluno: 'João Santos', vacina: 'Febre Amarela', doses_aplicadas: 1, status: 'Completo', data_ultima_dose: '2024-06-20', validade: '2034-06-20', alerta_renovacao: false },
    { id_aluno: 102, aluno: 'Maria Silva', vacina: 'Hepatite B', doses_aplicadas: 3, status: 'Completo', data_ultima_dose: '2024-07-10', validade: '2034-07-10', alerta_renovacao: false },
    { id_aluno: 103, aluno: 'Pedro Oliveira', vacina: 'Hepatite B', doses_aplicadas: 2, status: 'Incompleto', data_ultima_dose: '2024-09-15', validade: '2027-09-15', alerta_renovacao: false },
    { id_aluno: 104, aluno: 'Ana Souza', vacina: 'COVID-19', doses_aplicadas: 3, status: 'Completo', data_ultima_dose: '2024-10-05', validade: '2025-10-05', alerta_renovacao: true }
  ]

  // Mock de AVALIACAO_ATITUDINAL e CRITERIO_ATITUDINAL
  const criteriosAtitudinais = [
    { id_criterio: 1, codigo: 'ASSIDUIDADE', nome: 'Assiduidade', descricao: 'Pontualidade e presença', peso: 1.0 },
    { id_criterio: 2, codigo: 'RESPONSABILIDADE', nome: 'Responsabilidade', descricao: 'Comprometimento com tarefas', peso: 1.0 },
    { id_criterio: 3, codigo: 'RELACIONAMENTO', nome: 'Relacionamento', descricao: 'Interação com equipe', peso: 0.8 },
    { id_criterio: 4, codigo: 'INICIATIVA', nome: 'Iniciativa', descricao: 'Capacidade de proposição', peso: 0.8 }
  ]

  const avaliacoesAtitudinais = [
    { id: 1, aluno: 'João Santos', criterio: 'Assiduidade', nota: 9.0, preceptor: 'Dra. Maria Silva', periodo: 'Fev-Mar/2025', data: '2025-04-01', observacoes: 'Sempre presente' },
    { id: 2, aluno: 'João Santos', criterio: 'Responsabilidade', nota: 8.5, preceptor: 'Dra. Maria Silva', periodo: 'Fev-Mar/2025', data: '2025-04-01', observacoes: 'Cumpre tarefas' },
    { id: 3, aluno: 'Maria Silva', criterio: 'Assiduidade', nota: 10.0, preceptor: 'Dr. Paulo Costa', periodo: 'Fev-Mar/2025', data: '2025-04-02', observacoes: 'Impecável' },
    { id: 4, aluno: 'Pedro Oliveira', criterio: 'Relacionamento', nota: 7.5, preceptor: 'Prof. João Mendes', periodo: 'Fev-Mar/2025', data: '2025-04-01', observacoes: 'Precisa melhorar comunicação' }
  ]

  const handleExportar = (dados, nome_arquivo) => {
    // Implementação de exportação CSV
    console.log('Exportando:', nome_arquivo)
  }

  const handleAdicionarAluno = () => {
    // Placeholder: abrir modal ou navegação
    alert('Ação: Adicionar Aluno (placeholder)')
  }

  const handleVerHistoricoAluno = (aluno) => {
    // Placeholder: abrir página de histórico
    alert(`Ver histórico de: ${aluno.nome} (${aluno.matricula})`)
  }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-[#F5F7FA] to-white'>
      {/* Header */}
      <div className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white px-6 lg:px-12 py-10'>
        <h1 className='text-4xl font-bold'>Dashboard Administrativo</h1>
        <p className='text-blue-100 mt-2'>Gestão completa de estágios e instituições</p>
      </div>

      {/* Tabs */}
      <div className='px-6 lg:px-12 py-6'>
        <div className='mb-6 border-b-2 border-gray-200 pb-4'>
          {/* Mobile: Botão Hambúrguer + Aba Atual */}
          <div className='md:hidden mb-4'>
            <button
              onClick={() => setMenuMobileAberto(!menuMobileAberto)}
              className='flex items-center gap-2 text-gray-900 font-semibold px-4 py-2 bg-gray-100 rounded-lg w-full justify-between'
            >
              <div className='flex items-center gap-2'>
                {menuMobileAberto ? <FiX size={20} /> : <FiMenu size={20} />}
                <span className='text-sm'>
                  {abaSelecionada === 'overview' && 'Visão Geral'}
                  {abaSelecionada === 'instituicoes' && 'Instituições'}
                  {abaSelecionada === 'preceptores' && 'Preceptores'}
                  {abaSelecionada === 'semestre' && 'Ofertas'}
                  {abaSelecionada === 'alunos' && 'Alunos'}
                  {abaSelecionada === 'curriculos' && 'Currículos'}
                  {abaSelecionada === 'componentes' && 'Componentes'}
                  {abaSelecionada === 'disponibilidade' && 'Disponibilidade'}
                  {abaSelecionada === 'especialidades' && 'Especialidades'}
                  {abaSelecionada === 'coordenadores' && 'Coordenadores'}
                  {abaSelecionada === 'frequencia' && 'Frequência'}
                  {abaSelecionada === 'avaliacoes' && 'Avaliações'}
                  {abaSelecionada === 'ausencias' && 'Ausências'}
                  {abaSelecionada === 'vacinas' && 'Vacinas'}
                </span>
              </div>
            </button>

            {/* Mobile: Menu Dropdown */}
            {menuMobileAberto && (
              <div className='mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden'>
                <button onClick={() => { setAbaSelecionada('overview'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'overview' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiHome size={18} /> Visão Geral</button>
                <button onClick={() => { setAbaSelecionada('instituicoes'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'instituicoes' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiBarChart2 size={18} /> Instituições</button>
                <button onClick={() => { setAbaSelecionada('preceptores'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'preceptores' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiClipboard size={18} /> Preceptores</button>
                <button onClick={() => { setAbaSelecionada('semestre'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'semestre' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiTarget size={18} /> Ofertas</button>
                <button onClick={() => { setAbaSelecionada('alunos'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'alunos' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiUsers size={18} /> Alunos</button>
                <button onClick={() => { setAbaSelecionada('curriculos'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'curriculos' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiClipboard size={18} /> Currículos</button>
                <button onClick={() => { setAbaSelecionada('componentes'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'componentes' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiClipboard size={18} /> Componentes</button>
                <button onClick={() => { setAbaSelecionada('disponibilidade'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'disponibilidade' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiCalendar size={18} /> Disponibilidade</button>
                <button onClick={() => { setAbaSelecionada('especialidades'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'especialidades' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiClipboard size={18} /> Especialidades</button>
                <button onClick={() => { setAbaSelecionada('coordenadores'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'coordenadores' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiUsers size={18} /> Coordenadores</button>
                <button onClick={() => { setAbaSelecionada('frequencia'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'frequencia' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiClipboard size={18} /> Frequência</button>
                <button onClick={() => { setAbaSelecionada('avaliacoes'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'avaliacoes' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiBarChart2 size={18} /> Avaliações</button>
                <button onClick={() => { setAbaSelecionada('ausencias'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'ausencias' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiClipboard size={18} /> Ausências</button>
                <button onClick={() => { setAbaSelecionada('vacinas'); setMenuMobileAberto(false) }} className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all flex items-center gap-2 ${abaSelecionada === 'vacinas' ? 'bg-blue-50 text-[#237EE6] border-l-4 border-[#237EE6]' : 'text-gray-700 hover:bg-gray-50'}`}><FiClipboard size={18} /> Vacinas</button>
              </div>
            )}
          </div>

          {/* Desktop: Abas Horizontais */}
          <div className='hidden md:block overflow-x-auto whitespace-nowrap -mx-2 px-2'>
            <div className='flex gap-2 md:flex-wrap'>
          <button
            onClick={() => setAbaSelecionada('overview')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'overview'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiHome size={18} /> Visão Geral
          </button>
          <button
            onClick={() => setAbaSelecionada('instituicoes')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'instituicoes'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiBarChart2 size={18} /> Instituições
          </button>
          
          <button
            onClick={() => setAbaSelecionada('preceptores')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'preceptores'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiClipboard size={18} /> Preceptores
          </button>
          <button
            onClick={() => setAbaSelecionada('semestre')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'semestre'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiUsers size={18} /> Ofertas
          </button>
          <button
            onClick={() => setAbaSelecionada('alunos')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'alunos'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiUsers size={18} /> Alunos
          </button>
          <button
            onClick={() => setAbaSelecionada('curriculos')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'curriculos'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiClipboard size={18} /> Currículos
          </button>
          <button
            onClick={() => setAbaSelecionada('componentes')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'componentes'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiClipboard size={18} /> Componentes
          </button>
          <button
            onClick={() => setAbaSelecionada('disponibilidade')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'disponibilidade'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiUsers size={18} /> Disponibilidade
          </button>
          <button
            onClick={() => setAbaSelecionada('especialidades')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'especialidades'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiClipboard size={18} /> Especialidades
          </button>
          <button
            onClick={() => setAbaSelecionada('coordenadores')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'coordenadores'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiUsers size={18} /> Coordenadores
          </button>
          <button
            onClick={() => setAbaSelecionada('frequencia')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'frequencia'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiClipboard size={18} /> Frequência
          </button>
          <button
            onClick={() => setAbaSelecionada('avaliacoes')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'avaliacoes'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiBarChart2 size={18} /> Avaliações
          </button>
          <button
            onClick={() => setAbaSelecionada('ausencias')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'ausencias'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiClipboard size={18} /> Ausências
          </button>
          <button
            onClick={() => setAbaSelecionada('vacinas')}
                className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
              abaSelecionada === 'vacinas'
                ? 'bg-[#237EE6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiClipboard size={18} /> Vacinas
          </button>
            </div>
          </div>
        </div>

        {/* Conteúdo das Abas */}
        <div className='space-y-6'>
          {/* VISÃO GERAL */}
          {abaSelecionada === 'overview' && (
            <VicaoGeralAdm admin={{ total_instituicoes: 8, total_unidades: 18, total_usuarios: 125, total_locais: 24, total_preceptores: 45, total_vagas: 89, total_alunos_ativos: 234 }} instituicoes={instituicoes} frequenciaLocal={[]} />
          )}

          {/* INSTITUIÇÕES */}
          {abaSelecionada === 'instituicoes' && (
            <InstituicoesUnidadesAdm instituicoes={instituicoes} handleExportar={handleExportar} cursos={cursos} abaInstituicoes={abaInstituicoes} setAbaInstituicoes={setAbaInstituicoes} />
          )}

          {/* PRECEPTORES */}
          {abaSelecionada === 'preceptores' && (
            <PreceptoresMultiplosAdm preceptores={preceptores} instituicoes={instituicoes} handleExportar={handleExportar} />
          )}

          {/* SEMESTRE E OFERTAS */}
          {abaSelecionada === 'semestre' && (
            <SemestreOfertasAdm ofertas={ofertas} />
          )}

          {/* ALUNOS (sub-menu) */}
          {abaSelecionada === 'alunos' && (
            <div className='space-y-6'>
              <div className='overflow-x-auto whitespace-nowrap -mx-2 px-2'>
                <div className='flex gap-2 md:flex-wrap'>
                <button
                  onClick={() => setAbaAlunos('nao_alocados')}
                    className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    abaAlunos === 'nao_alocados'
                      ? 'bg-[#237EE6] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiMapPin size={18} /> Não Alocados
                </button>
                <button
                  onClick={() => setAbaAlunos('importacao')}
                    className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    abaAlunos === 'importacao'
                      ? 'bg-[#237EE6] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiUpload size={18} /> Importar Alunos
                </button>
                <button
                  onClick={() => setAbaAlunos('lista')}
                    className={`shrink-0 px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    abaAlunos === 'lista'
                      ? 'bg-[#237EE6] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiUsers size={18} /> Lista de Alunos
                </button>
                </div>
              </div>

              {abaAlunos === 'nao_alocados' && (
                <AlunosNaoAlocadosAdm alunos_nao_alocados={alunos_nao_alocados} />
              )}
              {abaAlunos === 'importacao' && (
                <ImportacaoCSVAdm />
              )}
              {abaAlunos === 'lista' && (
                <ListaAlunosAdm
                  alunos={alunos}
                  instituicoes={instituicoes}
                  onAdicionarAluno={handleAdicionarAluno}
                  onVerHistorico={handleVerHistoricoAluno}
                />
              )}
            </div>
          )}

          {/* CURRÍCULOS DE ESTÁGIO */}
          {abaSelecionada === 'curriculos' && (
            <div className='space-y-6'>
              <div className='flex justify-between items-center'>
                <h2 className='text-3xl font-bold text-gray-900'>Currículos de Estágio</h2>
                <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                  <FiPlus size={18} /> Novo Currículo
                </button>
              </div>
              <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b-2 border-gray-200 bg-gray-50'>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Currículo</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Curso</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Período Mín.</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Carga Horária</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Versão</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {curriculos.map((curr) => {
                        const curso = cursos.find(c => c.id_curso === curr.id_curso)
                        return (
                          <tr key={curr.id_curriculo} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                            <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{curr.nome_curriculo}</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>{curso?.nome_curso || 'N/A'}</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>{curr.periodo_obrigatorio_minimo}º</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>{curr.carga_horaria_total}h</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>{curr.versao}</td>
                            <td className='px-6 py-4'>
                              <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>{curr.status}</span>
                            </td>
                            <td className='px-6 py-4 text-sm'>
                              <button className='text-[#237EE6] hover:text-[#154c8b] font-semibold'>Editar</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* COMPONENTES CURRICULARES */}
          {abaSelecionada === 'componentes' && (
            <div className='space-y-6'>
              <div className='flex justify-between items-center'>
                <h2 className='text-3xl font-bold text-gray-900'>Componentes Curriculares</h2>
                <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                  <FiPlus size={18} /> Novo Componente
                </button>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {componentes.map((comp) => (
                  <div key={comp.id_componente} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300'>
                    <div className='flex justify-between items-start mb-3'>
                      <div>
                        <p className='text-sm text-[#237EE6] font-semibold uppercase'>{comp.codigo_componente}</p>
                        <h3 className='text-lg font-bold text-gray-900 mt-1'>{comp.nome_componente}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        comp.tipo === 'Obrigatório' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {comp.tipo}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600 mb-3'>{comp.descricao}</p>
                    <div className='grid grid-cols-2 gap-3 mb-4 text-sm'>
                      <div>
                        <p className='text-gray-600 text-xs'>Carga Horária</p>
                        <p className='font-semibold text-gray-900'>{comp.carga_horaria}h</p>
                      </div>
                      <div>
                        <p className='text-gray-600 text-xs'>Créditos</p>
                        <p className='font-semibold text-gray-900'>{comp.creditos}</p>
                      </div>
                      <div>
                        <p className='text-gray-600 text-xs'>Semestre</p>
                        <p className='font-semibold text-gray-900'>{comp.semestre_ideal}º</p>
                      </div>
                      <div>
                        <p className='text-gray-600 text-xs'>Status</p>
                        <span className='text-xs font-semibold text-[#10E686]'>✓ Ativo</span>
                      </div>
                    </div>
                    <div className='mb-4'>
                      <p className='text-xs text-gray-600 mb-2'>Competências:</p>
                      <div className='flex flex-wrap gap-2'>
                        {comp.competencias.map((competencia, idx) => (
                          <span key={idx} className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'>
                            {competencia}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className='w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg transition-colors'>
                      Detalhes
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DISPONIBILIDADE DE PRECEPTORES */}
          {abaSelecionada === 'disponibilidade' && (
            <div className='space-y-6'>
              <div className='flex justify-between items-center'>
                <h2 className='text-3xl font-bold text-gray-900'>Disponibilidade de Preceptores</h2>
                <button className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2'>
                  <FiPlus size={18} /> Nova Disponibilidade
                </button>
              </div>
              <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b-2 border-gray-200 bg-gray-50'>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Preceptor</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Componente</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Local</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Turno</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Horário</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Capacidade</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Alocados</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {disponibilidades.map((disp) => (
                        <tr key={disp.id_disponibilidade} className='border-b border-gray-200 hover:bg-[#F5F7FA] transition-colors'>
                          <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{disp.nome_preceptor}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{disp.nome_componente}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{disp.nome_local}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{disp.turno}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{disp.horario_inicio} - {disp.horario_fim}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{disp.capacidade_alunos}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>
                            <div className='flex items-center gap-2'>
                              <div className='w-16 bg-gray-200 rounded-full h-2'>
                                <div
                                  className='bg-linear-to-r from-[#237EE6] to-[#60C9E6] h-2 rounded-full'
                                  style={{ width: `${(disp.alunos_alocados / disp.capacidade_alunos) * 100}%` }}
                                ></div>
                              </div>
                              <span className='font-semibold'>{disp.alunos_alocados}/{disp.capacidade_alunos}</span>
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>{disp.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ESPECIALIDADES */}
          {abaSelecionada === 'especialidades' && (
            <div className='space-y-6'>
              <h2 className='text-3xl font-bold text-gray-900'>Gerenciamento de Especialidades</h2>
              <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b-2 border-gray-200 bg-gray-50'>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Código</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Especialidade</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Descrição</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Área</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {especialidades.map((esp) => (
                        <tr key={esp.id_especialidade} className='border-b border-gray-200 hover:bg-[#F5F7FA]'>
                          <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{esp.codigo}</td>
                          <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{esp.nome_especialidade}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{esp.descricao}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{esp.area_conhecimento}</td>
                          <td className='px-6 py-4'><span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>{esp.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* COORDENADORES DE ESTÁGIO */}
          {abaSelecionada === 'coordenadores' && (
            <div className='space-y-6'>
              <h2 className='text-3xl font-bold text-gray-900'>Coordenadores de Estágio</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {coordenadores.map((coord) => (
                  <div key={coord.id_coordenador} className='bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all'>
                    <h3 className='text-lg font-bold text-gray-900 mb-4'>{coord.nome}</h3>
                    <div className='space-y-3 text-sm'>
                      <div><p className='text-gray-600'>Email</p><p className='font-semibold text-gray-900'>{coord.email}</p></div>
                      <div><p className='text-gray-600'>Unidade</p><p className='font-semibold text-gray-900'>{coord.unidade}</p></div>
                      <div><p className='text-gray-600'>Portaria</p><p className='font-semibold text-gray-900'>{coord.portaria}</p></div>
                      <div><p className='text-gray-600'>CH Coordenação</p><p className='font-semibold text-gray-900'>{coord.carga_horaria}h</p></div>
                      <div><p className='text-gray-600'>Gestão</p><p className='font-semibold text-gray-900'>{coord.data_inicio} a {coord.data_fim}</p></div>
                      <div><span className='px-3 py-1 rounded-lg text-xs font-semibold bg-[#10E686]/20 text-[#10E686]'>{coord.status}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FREQUÊNCIA - RESUMO */}
          {abaSelecionada === 'frequencia' && (
            <div className='space-y-6'>
              <h2 className='text-3xl font-bold text-gray-900'>Resumo de Frequência</h2>
              <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b-2 border-gray-200 bg-gray-50'>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Aluno</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Registros</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Presenças</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Faltas</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Frequência</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frequenciaResumo.map((freq) => (
                        <tr key={freq.id_aluno} className='border-b border-gray-200 hover:bg-[#F5F7FA]'>
                          <td className='px-6 py-4 text-sm font-semibold text-gray-900'>{freq.aluno}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{freq.total_registros}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{freq.presencas}</td>
                          <td className='px-6 py-4 text-sm text-gray-700'>{freq.faltas}</td>
                          <td className='px-6 py-4'>
                            <div className='flex items-center gap-2'>
                              <div className='w-16 bg-gray-200 rounded-full h-2'>
                                <div className='bg-linear-to-r from-[#10E686] to-[#60E6D7] h-2 rounded-full' style={{width: `${freq.frequencia_pct}%`}}></div>
                              </div>
                              <span className='text-sm font-semibold'>{freq.frequencia_pct.toFixed(1)}%</span>
                            </div>
                          </td>
                          <td className='px-6 py-4'><span className={`px-3 py-1 rounded-lg text-xs font-semibold ${freq.status === 'OK' ? 'bg-[#10E686]/20 text-[#10E686]' : 'bg-orange-100 text-orange-700'}`}>{freq.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* AVALIAÇÕES */}
          {abaSelecionada === 'avaliacoes' && (
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
          )}

          {/* AUSÊNCIAS E JUSTIFICATIVAS */}
          {abaSelecionada === 'ausencias' && (
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
          )}

          {/* VACINAS */}
          {abaSelecionada === 'vacinas' && (
            <div className='space-y-6'>
              <h2 className='text-3xl font-bold text-gray-900'>Gestão de Vacinas</h2>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold text-gray-900'>Vacinas Obrigatórias</h3>
                  <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                    <div className='overflow-x-auto'>
                      <table className='w-full'>
                        <thead>
                          <tr className='border-b-2 border-gray-200 bg-gray-50'>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-900'>Vacina</th>
                            <th className='px-4 py-3 text-left text-sm font-semibold text-gray-900'>Doses</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vacinasObrigatorias.map((vac) => (
                            <tr key={vac.id_vacina} className='border-b border-gray-200 hover:bg-[#F5F7FA]'>
                              <td className='px-4 py-3 text-sm font-semibold text-gray-900'>{vac.nome}</td>
                              <td className='px-4 py-3 text-sm text-gray-700'>{vac.doses_necessarias}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold text-gray-900'>Conformidade por Aluno</h3>
                  <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                    <div className='overflow-x-auto'>
                      <table className='w-full text-sm'>
                        <thead>
                          <tr className='border-b-2 border-gray-200 bg-gray-50'>
                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-900'>Aluno</th>
                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-900'>Vacina</th>
                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-900'>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registroVacinas.map((reg, idx) => (
                            <tr key={idx} className='border-b border-gray-200 hover:bg-[#F5F7FA]'>
                              <td className='px-4 py-3 text-xs font-semibold text-gray-900'>{reg.aluno}</td>
                              <td className='px-4 py-3 text-xs text-gray-700'>{reg.vacina}</td>
                              <td className='px-4 py-3'><span className={`px-2 py-1 rounded text-xs font-semibold ${reg.status === 'Completo' ? 'bg-[#10E686]/20 text-[#10E686]' : 'bg-orange-100 text-orange-700'}`}>{reg.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
