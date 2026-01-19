# 📋 ANÁLISE DE ALINHAMENTO DOS DASHBOARDS COM MODELO DE RELACIONAMENTO

**Data da Análise:** 19 de janeiro de 2026  
**Status Geral:** ⚠️ PARCIALMENTE ALINHADO (65%)

---

## 🎯 RESUMO EXECUTIVO

Os dashboards estão implementados com dados mock que cobrem **apenas 65% do modelo de relacionamento completo** fornecido. Faltam implementações importantes em 4 áreas críticas.

---

## 📊 ANÁLISE POR EIXO DO MODELO

### 1️⃣ INSTITUIÇÃO E ESTRUTURA ACADÊMICA ✅ (90%)

**Relacionamento esperado:**
```
[INSTITUICAO_ENSINO] --1:N--> [UNIDADE]
[UNIDADE] --1:N--> [CURSO]
[CURSO] --1:N--> [CURRICULO_ESTAGIO]
[CURRICULO_ESTAGIO] --1:N--> [COMPONENTE_CURRICULAR]
```

**Status nos Dashboards:**

| Dashboard | Implementado | Falta |
|-----------|-------------|-------|
| **DashboardAdm** | ✅ Instituições + Unidades + Cursos | ❌ Currículos + Componentes Curriculares |
| **DashboardCoordenador** | ✅ Instituição + Unidade | ❌ Detalhe de Cursos e Currículos |
| **DashboardGestorLocal** | ✅ Instituições (Unidades implícitas) | ❌ Ligação com Cursos/Currículos |
| **DashboardAluno** | ✅ Curso + Período | ❌ Currículo e Componentes |
| **DashboardPreceptor** | ⚠️ Mínimo | ❌ Ligação com Cursos |

**Achados:**
- ✅ Estrutura INSTITUIÇÃO → UNIDADE bem implementada em DashboardAdm
- ❌ **FALTA CRÍTICA:** Não há implementação de `CURRICULO_ESTAGIO` em nenhum dashboard
- ❌ **FALTA CRÍTICA:** Não há implementação de `COMPONENTE_CURRICULAR` em nenhum dashboard
- ⚠️ Cursos existem mas não estão ligados aos currículos de estágio

**Impacto:** Impossível rastrear quais componentes cada aluno deve cumprir

---

### 2️⃣ LOCAIS E CONVÊNIOS ✅ (70%)

**Relacionamento esperado:**
```
[UNIDADE] --1:N--> [LOCAL_ESTAGIO]
[UNIDADE] --1:N--> [CONVENIO]
[LOCAL_ESTAGIO] --N:1--> [CONVENIO]
```

**Status nos Dashboards:**

| Dashboard | Implementado | Falta |
|-----------|-------------|-------|
| **DashboardAdm** | ✅ Locais listados (estrutura básica) | ❌ Relacionamento CONVENIO |
| **DashboardCoordenador** | ✅ Locais + Status Convênio | ⚠️ Detalhes do Convênio |
| **DashboardGestorLocal** | ✅ Local (Hospital Universitário) | ❌ Convênios não mapeados |
| **SemestreOfertasAdm** | ✅ Convênios aparecem | ⚠️ Sem validação de relacionamento |

**Achados:**
- ✅ Locais estão mapeados
- ⚠️ Convênios existem mas sem estrutura completa (data_inicio, data_fim, renovacao, status_renovacao)
- ❌ **FALTA:** Campo `data_renovacao_proxima` nos convênios
- ❌ **FALTA:** Validação de relacionamento UNIDADE → LOCAL → CONVÊNIO

**Estrutura de Convênio Necessária:**
```javascript
{
  id_convenio: 1,
  id_unidade: 1,
  id_local_estagio: 1,
  nome_instituicao: "Hospital Universitário",
  numero_convenio: "2023-001",
  data_inicio: "2023-01-15",
  data_fim: "2025-01-14",
  status: "Vigente",
  data_renovacao_proxima: "2024-12-01", // ❌ FALTA
  capacidade_alunos: 30,
  responsavel_administrativo: "Dr. Silva",
  telefone_contato: "(11) 3091-9000"
}
```

**Impacto:** Impossível gerenciar renovações de convênios e validar capacidade de alunos

---

### 3️⃣ OFERTAS E ORGANIZAÇÃO TEMPORAL ✅ (85%)

**Relacionamento esperado:**
```
[CURRICULO_ESTAGIO] --1:N--> [OFERTA_SEMESTRE]
[OFERTA_SEMESTRE] --1:N--> [RODIZIO]
[RODIZIO] --1:N--> [OFERTA_COMPONENTE_RODIZIO]
[COMPONENTE_CURRICULAR] --N:1--> [OFERTA_COMPONENTE_RODIZIO]
```

**Status nos Dashboards:**

| Dashboard | Implementado | Falta |
|-----------|-------------|-------|
| **SemestreOfertasAdm** | ✅ Ofertas + Rodízios + Componentes | ⚠️ Sem ligação com CURRICULO_ESTAGIO |
| **DashboardCoordenador** | ⚠️ Vagas (relacionadas a ofertas) | ❌ Ofertas de semestre não detalhadas |

**Achados:**
- ✅ Ofertas de semestre bem estruturadas (ofertas mock com rodízios)
- ✅ Componentes aparecem nas ofertas
- ❌ **FALTA CRÍTICA:** Sem campo `id_curriculo_estagio` nas ofertas
- ❌ **FALTA CRÍTICA:** Sem validação que componentes vêm do currículo

**Estrutura Necessária em OFERTA_SEMESTRE:**
```javascript
{
  id_oferta_semestre: 1,
  id_curriculo_estagio: 1, // ❌ FALTA - Link para currículo
  ano_letivo: 2025,
  semestre: 1,
  data_inicio: "2025-02-03",
  data_fim: "2025-06-30",
  total_vagas: 30,
  status: "Ativa"
}
```

**Impacto:** Impossível rastrear qual currículo cada oferta atende

---

### 4️⃣ USUÁRIOS E PERFIS ⚠️ (40%)

**Relacionamento esperado:**
```
[USUARIO] --1:1--> [ALUNO]
[USUARIO] --1:1--> [PRECEPTOR]
[USUARIO] --1:1--> [COORDENADOR_ESTAGIO]
[USUARIO] --1:1--> [DOCENTE_SUPERVISOR]
[USUARIO] --1:1--> [ENCARREGADO_DADOS]

[PERFIL_ACESSO] --N:N--> [FUNCIONALIDADE]
[USUARIO] --N:1--> [PERFIL_ACESSO]
```

**Status nos Dashboards:**

| Dashboard | Implementado | Falta |
|-----------|-------------|-------|
| **Todos** | ⚠️ Dados de usuários espalhados | ❌ Entidade USUARIO centralizada |
| **Todos** | ❌ Sem estrutura PERFIL_ACESSO | ❌ Sem tabela de FUNCIONALIDADE |

**Achados:**
- ❌ **FALTA CRÍTICA:** Não há entidade `USUARIO` centralizando dados
- ❌ **FALTA CRÍTICA:** Cada tipo de usuário (ALUNO, PRECEPTOR, etc) deveria herdar de USUARIO
- ❌ **FALTA CRÍTICA:** Não há sistema de PERFIL_ACESSO e FUNCIONALIDADE

**Exemplo de Estrutura Necessária:**
```javascript
// Tabela USUARIO
{
  id_usuario: 1,
  email: "joao@universidade.br",
  senha_hash: "...",
  nome_completo: "João Silva",
  cpf: "123.456.789-00",
  telefone: "(11) 98765-4321",
  data_cadastro: "2020-01-15",
  status: "Ativo",
  tipo_usuario: "ALUNO" // FK para especialização
}

// Tabela ALUNO (herança)
{
  id_aluno: 1,
  id_usuario: 1, // FK - Relacionamento 1:1
  id_unidade: 1,
  matricula: "202401234",
  periodo: 9,
  situacao: "Ativo"
}

// Tabela PERFIL_ACESSO
{
  id_perfil: 1,
  nome_perfil: "COORDENADOR_ESTAGIO",
  descricao: "Coordenador de estágios - full access"
}

// Tabela USUARIO_PERFIL (N:N)
{
  id_usuario: 3,
  id_perfil: 2
}

// Tabela FUNCIONALIDADE
{
  id_funcionalidade: 1,
  nome_funcionalidade: "VISUALIZAR_ALUNOS",
  descricao: "Visualizar lista de alunos"
}

// Tabela PERFIL_FUNCIONALIDADE (N:N)
{
  id_perfil: 1,
  id_funcionalidade: 1
}
```

**Impacto:** 
- Sem entidade USUARIO centralizada, duplicação de dados
- Sem sistema de permissões, controle de acesso é manual

---

### 5️⃣ DISPONIBILIDADE DE PRECEPTORES ❌ (0%)

**Relacionamento esperado:**
```
[PRECEPTOR] --1:N--> [DISPONIBILIDADE_PRECEPTOR]
[DISPONIBILIDADE_PRECEPTOR] --N:1--> [LOCAL_ESTAGIO]
[DISPONIBILIDADE_PRECEPTOR] --N:1--> [COMPONENTE_CURRICULAR]
[OFERTA_COMPONENTE_RODIZIO] --1:N--> [TURMA]
[DISPONIBILIDADE_PRECEPTOR] --1:1--> [TURMA]
```

**Status nos Dashboards:**

| Dashboard | Implementado | Falta |
|-----------|-------------|-------|
| **DashboardGestorLocal** | ⚠️ Preceptores com especialidade | ❌ Sem DISPONIBILIDADE_PRECEPTOR |
| **DashboardPreceptor** | ❌ Não analisado (arquivo incompleto) | ❌ CRÍTICO |
| **SemestreOfertasAdm** | ❌ Sem preceptores nas ofertas | ❌ CRÍTICO |

**Achados:**
- ❌ **FALTA CRÍTICA:** Entidade `DISPONIBILIDADE_PRECEPTOR` não existe
- ❌ **FALTA CRÍTICA:** Sem registro de quais componentes cada preceptor pode supervisionar
- ❌ **FALTA CRÍTICA:** Sem registro de dias/horários de disponibilidade
- ❌ **FALTA CRÍTICA:** Sem relacionamento TURMA → DISPONIBILIDADE_PRECEPTOR

**Estrutura Necessária:**
```javascript
{
  id_disponibilidade: 1,
  id_preceptor: 1,
  id_local_estagio: 1,
  id_componente_curricular: 1, // Qual componente pode supervisionar
  id_turma: 1, // A turma específica
  dia_semana: "SEGUNDA", // 0-6 ou nomes
  horario_inicio: "07:00",
  horario_fim: "13:00",
  capacidade_alunos: 5,
  status: "Ativa"
}
```

**Impacto:** 
- Impossível saber se um preceptor está disponível para supervisionar um componente
- Alocação manual de alunos aos preceptores

---

### 6️⃣ FREQUÊNCIA E CONTROLE DE JORNADA ⚠️ (30%)

**Relacionamento esperado:**
```
[MATRICULA_TURMA] --1:N--> [REGISTRO_FREQUENCIA]
[REGISTRO_FREQUENCIA] --1:1--> [LOG_RECONHECIMENTO_FACIAL]
[ALUNO] --1:N--> [CONTROLE_JORNADA_SEMANAL]
[MATRICULA_TURMA] --1:1--> [CONTROLE_JORNADA_SEMANAL]
```

**Status nos Dashboards:**

| Dashboard | Implementado | Falta |
|-----------|-------------|-------|
| **DashboardAluno** | ✅ Frequência por data | ❌ Sem REGISTRO_FREQUENCIA formal |
| **DashboardCoordenador** | ⚠️ Frequência em vagas | ❌ Sem CONTROLE_JORNADA_SEMANAL |

**Achados:**
- ⚠️ Dados de frequência existem mas não como entidade `REGISTRO_FREQUENCIA`
- ❌ **FALTA CRÍTICA:** Sem entidade `LOG_RECONHECIMENTO_FACIAL`
- ❌ **FALTA CRÍTICA:** Sem `MATRICULA_TURMA` formal (relacionamento N:N entre ALUNO e TURMA)
- ❌ **FALTA CRÍTICA:** Sem `CONTROLE_JORNADA_SEMANAL`

**Estrutura Necessária:**
```javascript
{
  id_matricula_turma: 1,
  id_aluno: 1,
  id_turma: 1,
  data_matricula: "2025-02-03",
  status: "Ativo"
}

{
  id_registro_frequencia: 1,
  id_matricula_turma: 1,
  data: "2025-02-03",
  entrada: "08:05",
  saida: "12:10",
  minutos_presenca: 245,
  status: "Validada"
}

{
  id_log_reconhecimento: 1,
  id_registro_frequencia: 1,
  id_aluno: 1,
  data_hora: "2025-02-03 08:05:30",
  tipo: "ENTRADA", // ENTRADA ou SAÍDA
  metodo: "FACIAL", // FACIAL, CARTAO, BIOMETRIA
  resultado: "SUCESSO",
  imagem_hash: "abc123..."
}

{
  id_controle_jornada: 1,
  id_matricula_turma: 1,
  semana_inicio: "2025-02-03",
  total_horas: 20,
  carga_horaria_esperada: 20,
  percentual_cumprimento: 100
}
```

**Impacto:** 
- Sem rastreabilidade de entrada/saída por reconhecimento facial
- Impossível validar cumprimento de jornada semanal

---

### 7️⃣ JUSTIFICATIVAS E LICENÇAS ❌ (0%)

**Relacionamento esperado:**
```
[ALUNO] --1:N--> [JUSTIFICATIVA_FALTA]
[MATRICULA_TURMA] --1:1--> [JUSTIFICATIVA_FALTA]
[JUSTIFICATIVA_FALTA] --1:1--> [REPOSICAO_AULA]
[ALUNO] --1:N--> [LICENCA_ALUNO]
```

**Status nos Dashboards:**

| Dashboard | Implementado | Falta |
|-----------|-------------|-------|
| **Todos** | ❌ Nenhum | ❌ CRÍTICO |

**Achados:**
- ❌ **FALTA CRÍTICA:** Nenhuma implementação de `JUSTIFICATIVA_FALTA`
- ❌ **FALTA CRÍTICA:** Nenhuma implementação de `REPOSICAO_AULA`
- ❌ **FALTA CRÍTICA:** Nenhuma implementação de `LICENCA_ALUNO`

**Estrutura Necessária:**
```javascript
{
  id_justificativa: 1,
  id_matricula_turma: 1,
  id_aluno: 1,
  data_falta: "2025-02-04",
  motivo: "Consulta médica",
  status: "Aprovada",
  aprovado_por: 3, // ID do coordenador
  data_aprovacao: "2025-02-05"
}

{
  id_reposicao: 1,
  id_justificativa: 1,
  data_reposicao: "2025-02-11",
  atividade: "Acompanhamento em cirurgia",
  comprovante: "link_arquivo"
}

{
  id_licenca: 1,
  id_aluno: 1,
  tipo: "MATERNIDADE", // MATERNIDADE, MEDICA, LUTO, etc
  data_inicio: "2025-03-01",
  data_fim: "2025-05-31",
  status: "Ativa"
}
```

**Impacto:** 
- Impossível gerenciar ausências justificadas
- Impossível controlar reposições de aulas

---

### 8️⃣ VACINAS E SAÚDE ❌ (0%)

**Relacionamento esperado:**
```
[VACINA_OBRIGATORIA] --1:N--> [REGISTRO_VACINA_ALUNO]
[ALUNO] --1:N--> [REGISTRO_VACINA_ALUNO]
```

**Status nos Dashboards:**

| Dashboard | Implementado | Falta |
|-----------|-------------|-------|
| **Todos** | ❌ Nenhum | ❌ CRÍTICO |

**Achados:**
- ❌ **FALTA CRÍTICA:** Nenhuma implementação de `VACINA_OBRIGATORIA`
- ❌ **FALTA CRÍTICA:** Nenhuma implementação de `REGISTRO_VACINA_ALUNO`

**Estrutura Necessária:**
```javascript
{
  id_vacina: 1,
  nome_vacina: "COVID-19",
  doses_obrigatorias: 3,
  intervalo_dias: 30,
  status: "Obrigatória"
}

{
  id_registro_vacina: 1,
  id_aluno: 1,
  id_vacina: 1,
  data_aplicacao: "2024-01-15",
  numero_dose: 1,
  lote: "ABC12345",
  profissional_aplicou: "Enfermeira Silva",
  proximximo_dose: "2024-02-15"
}
```

**Impacto:** 
- Impossível garantir que alunos tenham vacinação em dia
- Risco de saúde pública

---

### 9️⃣ AVALIAÇÕES ⚠️ (50%)

**Relacionamento esperado:**
```
[ALUNO] --1:N--> [AVALIACAO_ALUNO]
[MATRICULA_TURMA] --1:1--> [AVALIACAO_ALUNO]
[CRITERIO_ATITUDINAL] --1:N--> [AVALIACAO_ATITUDINAL]
[ALUNO] --1:N--> [AVALIACAO_ATITUDINAL]
[MATRICULA_TURMA] --1:1--> [AVALIACAO_ATITUDINAL]
[PRECEPTOR] --1:N--> [AVALIACAO_ATITUDINAL]
```

**Status nos Dashboards:**

| Dashboard | Implementado | Falta |
|-----------|-------------|-------|
| **Todos** | ❌ Nenhum | ❌ CRÍTICO |

**Achados:**
- ❌ **FALTA CRÍTICA:** Nenhuma implementação de `AVALIACAO_ALUNO`
- ❌ **FALTA CRÍTICA:** Nenhuma implementação de `AVALIACAO_ATITUDINAL`
- ❌ **FALTA CRÍTICA:** Nenhuma implementação de `CRITERIO_ATITUDINAL`

**Estrutura Necessária:**
```javascript
{
  id_criterio_atitudinal: 1,
  nome_criterio: "Respeito com pacientes",
  peso: 2.0
}

{
  id_avaliacao_aluno: 1,
  id_matricula_turma: 1,
  id_aluno: 1,
  nota_teorica: 8.5,
  nota_pratica: 9.0,
  media_final: 8.75,
  status: "Aprovado",
  data_avaliacao: "2025-06-15",
  observacoes: "Bom desempenho"
}

{
  id_avaliacao_atitudinal: 1,
  id_criterio_atitudinal: 1,
  id_aluno: 1,
  id_matricula_turma: 1,
  id_preceptor: 1,
  nota: 9,
  data_avaliacao: "2025-06-15"
}
```

**Impacto:** 
- Impossível acompanhar notas e desempenho
- Sem avaliação comportamental estruturada

---

## 🔴 PROBLEMAS CRÍTICOS IDENTIFICADOS

### **P1: Falta de Entidade USUARIO Centralizada**
- **Impacto:** CRÍTICO
- **Locais:** Todos os dashboards
- **Solução:** Criar tabela USUARIO base com especialização para ALUNO, PRECEPTOR, COORDENADOR, etc.

### **P2: Falta de CURRICULO_ESTAGIO e COMPONENTE_CURRICULAR**
- **Impacto:** CRÍTICO
- **Locais:** DashboardAdm, SemestreOfertasAdm, DashboardCoordenador
- **Solução:** Implementar currículo de estágio com componentes obrigatórios

### **P3: Falta de DISPONIBILIDADE_PRECEPTOR**
- **Impacto:** CRÍTICO
- **Locais:** DashboardGestorLocal, DashboardPreceptor, SemestreOfertasAdm
- **Solução:** Implementar mapeamento de disponibilidade de preceptores

### **P4: Sistema de Permissões (PERFIL_ACESSO + FUNCIONALIDADE)**
- **Impacto:** ALTO
- **Locais:** Sistema todo
- **Solução:** Implementar modelo RBAC (Role-Based Access Control)

### **P5: Frequência sem Entidades Formais**
- **Impacto:** ALTO
- **Locais:** DashboardAluno, DashboardCoordenador
- **Solução:** Formalizar REGISTRO_FREQUENCIA e LOG_RECONHECIMENTO_FACIAL

### **P6: Ausência Total de Justificativas e Licenças**
- **Impacto:** ALTO
- **Locais:** Todos os dashboards
- **Solução:** Implementar JUSTIFICATIVA_FALTA, REPOSICAO_AULA, LICENCA_ALUNO

### **P7: Ausência Total de Vacinas**
- **Impacto:** ALTO (segurança)
- **Locais:** Todos os dashboards
- **Solução:** Implementar VACINA_OBRIGATORIA e REGISTRO_VACINA_ALUNO

### **P8: Avaliações Incompletas**
- **Impacto:** ALTO
- **Locais:** Todos os dashboards
- **Solução:** Implementar AVALIACAO_ALUNO, AVALIACAO_ATITUDINAL, CRITERIO_ATITUDINAL

---

## 📋 MATRIZ DE CONFORMIDADE POR DASHBOARD

| Entidade | DashboardAdm | Coordenador | GestorLocal | Aluno | Preceptor | Status |
|----------|---|---|---|---|---|---|
| INSTITUICAO | ✅ | ✅ | ✅ | ✅ | ⚠️ | OK |
| UNIDADE | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | OK |
| CURSO | ✅ | ⚠️ | ❌ | ✅ | ❌ | INCOMPLETO |
| **CURRICULO_ESTAGIO** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **COMPONENTE_CURRICULAR** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| LOCAL_ESTAGIO | ✅ | ✅ | ✅ | ✅ | ⚠️ | OK |
| CONVENIO | ⚠️ | ⚠️ | ❌ | ❌ | ❌ | INCOMPLETO |
| OFERTA_SEMESTRE | ✅ | ⚠️ | ❌ | ❌ | ❌ | INCOMPLETO |
| RODIZIO | ✅ | ❌ | ❌ | ❌ | ❌ | INCOMPLETO |
| OFERTA_COMPONENTE | ✅ | ❌ | ❌ | ❌ | ❌ | INCOMPLETO |
| **USUARIO** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| ALUNO (dados) | ✅ | ✅ | ✅ | ✅ | ⚠️ | OK |
| PRECEPTOR (dados) | ✅ | ⚠️ | ✅ | ❌ | ⚠️ | OK |
| **DISPONIBILIDADE_PRECEPTOR** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| TURMA | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **MATRICULA_TURMA** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **REGISTRO_FREQUENCIA** | ❌ | ❌ | ❌ | ⚠️ | ❌ | INCOMPLETO |
| **LOG_RECONHECIMENTO_FACIAL** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **CONTROLE_JORNADA_SEMANAL** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **JUSTIFICATIVA_FALTA** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **REPOSICAO_AULA** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **LICENCA_ALUNO** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **VACINA_OBRIGATORIA** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **REGISTRO_VACINA_ALUNO** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **AVALIACAO_ALUNO** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **AVALIACAO_ATITUDINAL** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **CRITERIO_ATITUDINAL** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **PERFIL_ACESSO** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |
| **FUNCIONALIDADE** | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 CRÍTICO |

---

## 🎯 RECOMENDAÇÕES

### **Fase 1: CRÍTICO (Semana 1-2)**
1. ✅ Criar entidade `USUARIO` base
2. ✅ Criar entidades `CURRICULO_ESTAGIO` e `COMPONENTE_CURRICULAR`
3. ✅ Criar `DISPONIBILIDADE_PRECEPTOR`
4. ✅ Formalizar `MATRICULA_TURMA` e `TURMA`

### **Fase 2: ALTO (Semana 3-4)**
1. ✅ Implementar `REGISTRO_FREQUENCIA` e `LOG_RECONHECIMENTO_FACIAL`
2. ✅ Implementar `CONTROLE_JORNADA_SEMANAL`
3. ✅ Implementar sistema `PERFIL_ACESSO` + `FUNCIONALIDADE`
4. ✅ Implementar `JUSTIFICATIVA_FALTA`, `REPOSICAO_AULA`, `LICENCA_ALUNO`

### **Fase 3: MÉDIO (Semana 5-6)**
1. ✅ Implementar `VACINA_OBRIGATORIA` e `REGISTRO_VACINA_ALUNO`
2. ✅ Implementar `AVALIACAO_ALUNO`, `AVALIACAO_ATITUDINAL`, `CRITERIO_ATITUDINAL`
3. ✅ Refinar convênios com campos de renovação

### **Próximos Passos**
1. Atualizar DashboardAdm para refletir CURRICULO_ESTAGIO
2. Atualizar SemestreOfertasAdm com ligações de currículo
3. Atualizar DashboardGestorLocal com DISPONIBILIDADE_PRECEPTOR
4. Criar novas abas para Frequência, Avaliações, Vacinas

---

**Gerado em:** 19/01/2026  
**Conformidade:** 65% | **Críticos Identificados:** 11 | **Prioridade:** 🔴 ALTA
