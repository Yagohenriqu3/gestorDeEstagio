# 🎯 Guia de Elementos Interativos - Dashboards


## 1 DashboardAdm (Administrador)

### **Elementos Interativos:**

#### 🔵 Aba "Instituições" - Sub-menu (2 opções):
- **Unidades** → Troca visualização
- **Cursos** → Troca visualização




## 2 DashboardCoordenador (Coordenador)

#### 🔵 Filtros Funcionais:
- **Aba "Alunos":**
  - Select dropdown de filtro (Todos/Ativos/Inativos) → Filtra lista em tempo real
- **Aba "Ofertas":**
  - Select dropdown de status → Filtra ofertas
- **Aba "Locais":**
  - Select dropdown de tipo de local → Filtra locais




## 3 DashboardGestorLocal (Gestor de Local/Docente)

### **Elementos Interativos:**

#### 🔵 Modal de Seleção de Instituição (ao carregar):
- **2 cards de instituições** (UNIFESP, USP-FM) → Clicável, define filtro global
- Botão **"Ver todas as instituições"** → Remove filtro, mostra todos os dados
- Modal abre automaticamente ao carregar a página


#### 🔵 Filtros Funcionais:
- **Aba "Vagas":**
  - Select dropdown (Todas/Disponíveis/Completas) → Filtra cards de vagas
- **Aba "Alunos":**
  - Select dropdown (Todos/Ativos/Inativos) → Filtra tabela de alunos




## 4 DashboardPreceptor (Preceptor)

### **Elementos Interativos:**

#### 🔵 Navegação Principal (4 abas):
- **Mobile:** Menu hambúrguer → 4 opções clicáveis
- **Desktop:** 4 botões horizontais (Visão Geral, Alunos, Frequência, Avaliações)

#### 🔵 Filtros Funcionais - Aba "Frequência":
- **Select "Status"** (Pendentes/Validadas/Todas) → Filtra lista de frequências
- **Input "Data"** (date picker) → Filtra por data específica
- **Select "Local"** (Hospital Universitário/Hospital das Clínicas/Todos) → Filtra por local
- **Botão "Limpar filtros"** → Aparece quando há filtros ativos, reseta todos os filtros

#### 🔵 Mensagem de Estado Vazio:
- Quando filtros não retornam resultados → Mostra mensagem "Nenhuma frequência encontrada"



