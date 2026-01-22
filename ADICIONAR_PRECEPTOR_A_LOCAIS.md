# Funcionalidade: Adicionar Preceptores Existentes a Locais de Estágio

## 📋 Objetivo
Permitir que o Coordenador adicione preceptores existentes a um ou mais locais de estágio através de uma interface intuitiva modal.

---

## ✅ Implementação Realizada

### 1. **Estados Adicionados**
```javascript
const [modalAdicionarPreceptor, setModalAdicionarPreceptor] = useState(false)
const [localSelecionadoParaPreceptor, setLocalSelecionadoParaPreceptor] = useState(null)
const [preceptoresSelecionados, setPreceptoresSelecionados] = useState([])
const [preceptoresAdicionadosPorLocal, setPreceptoresAdicionadosPorLocal] = useState({})
```

### 2. **Imports Adicionados**
- `FiCheck` - Ícone para confirmar ação
- `FiTrash2` - Ícone para remover preceptor

---

## 🎯 Fluxo de Uso

### **Passo 1: Acessar a Aba Locais**
1. Navegar para a aba "Locais" no Dashboard Coordenador
2. Visualizar tabela com todos os locais

### **Passo 2: Iniciar Adição de Preceptor**
1. Na coluna "Ações", clicar em botão verde "+ Preceptor"
2. Modal se abre automaticamente com o local pré-selecionado

### **Passo 3: Selecionar Preceptores**
1. Modal exibe lista de todos os preceptores disponíveis
2. Cada preceptor mostra:
   - Nome completo
   - CRM (Conselho Regional de Medicina)
   - Email
   - Instituição e Unidade
   - Quantidade de alocações existentes
3. Selecionar um ou mais preceptores usando checkboxes
4. Resumo mostra quantos preceptores foram selecionados

### **Passo 4: Confirmar Adição**
1. Clicar em "Adicionar X" (onde X é a quantidade)
2. Preceptores são adicionados à seção "Preceptores Alocados por Local"
3. Modal fecha automaticamente

---

## 🖼️ Interface Visual

### **Tabela de Locais - Nova Coluna de Ações**
```
Ações:
├── [+ Preceptor] (botão verde)
└── [Editar] (botão azul)
```

### **Modal de Adição**
```
┌─────────────────────────────────────────┐
│ Adicionar Preceptor                  [X]│
│ Local: Hospital Universitário São Paulo │
├─────────────────────────────────────────┤
│ ☑ Dr. Carlos Silva (CRM: 123456/SP)    │
│   carlos.silva@unifesp.br               │
│   UNIFESP • Campus São Paulo            │
│   1 alocação existente                  │
│                                         │
│ ☐ Dra. Ana Costa (CRM: 789012/SP)      │
│   ana.costa@usp.br                      │
│   USP • Faculdade de Medicina           │
│   1 alocação existente                  │
│                                         │
│ ☐ Dr. Roberto Mendes (CRM: 345678/SP)  │
│   roberto.mendes@unifesp.br             │
│   UNIFESP • Campus Diadema              │
│   1 alocação existente                  │
│                                         │
│ Resumo: 1 preceptor selecionado         │
├─────────────────────────────────────────┤
│                      [Cancelar] [Adicionar 1] │
└─────────────────────────────────────────┘
```

### **Seção: Preceptores Alocados por Local**
```
┌────────────────────────────────────────┐
│ 👥 Preceptores Alocados por Local      │
├────────────────────────────────────────┤
│ ┌────────────────────┐ ┌──────────────┐│
│ │Hospital Universitário │              ││
│ │1 preceptor│                          ││
│ │                    │                 ││
│ │Dr. Carlos Silva    │ [🗑]            ││
│ │CRM: 123456/SP      │                 ││
│ │                    │                 ││
│ └────────────────────┘ └──────────────┘│
│ ┌────────────────────┐                  │
│ │Hospital das Clínicas │                │
│ │2 preceptores│                         │
│ │                    │                  │
│ │Dr. Roberto Mendes  │ [🗑]             │
│ │CRM: 345678/SP      │                  │
│ │                    │                  │
│ │Dra. Ana Costa      │ [🗑]             │
│ │CRM: 789012/SP      │                  │
│ └────────────────────┘                  │
└────────────────────────────────────────┘
```

---

## 🔄 Funcionalidades Principais

### **1. Seleção Múltipla**
- ✅ Adicionar 1 ou mais preceptores por local
- ✅ Um preceptor pode ser adicionado a vários locais diferentes
- ✅ Evita duplicatas (mesmo preceptor não é adicionado 2x no mesmo local)

### **2. Visualização de Preceptores**
- ✅ Exibe informações completas do preceptor (nome, CRM, email)
- ✅ Mostra alocações existentes
- ✅ Destacar preceptor com cores (estado selecionado/não-selecionado)

### **3. Gerenciamento de Alocações**
- ✅ Adicionar preceptores via modal
- ✅ Remover preceptor de um local com botão 🗑️
- ✅ Visualizar todos os preceptores por local em cards

### **4. Feedback Visual**
- ✅ Resumo em tempo real dos preceptores selecionados
- ✅ Badge mostrando quantidade de preceptores por local
- ✅ Estado do botão "Adicionar" (desabilitado se nenhum selecionado)
- ✅ Cores visuais para diferenciar ações (verde para adicionar, vermelho para remover)

---

## 🏗️ Estrutura de Dados

### **Preceptores por Local**
```javascript
preceptoresAdicionadosPorLocal = {
  "1": [ // ID do local
    { id: 1, nome: "Dr. Carlos Silva", crm: "123456/SP", ... },
    { id: 2, nome: "Dra. Ana Costa", crm: "789012/SP", ... }
  ],
  "2": [ // Outro local
    { id: 3, nome: "Dr. Roberto Mendes", crm: "345678/SP", ... }
  ]
}
```

---

## 📝 Código Modificado

### **Arquivo: DashboardCoordenador.jsx**

**Seções Alteradas:**
1. **Imports** (Linha 2)
   - Adicionados: `FiCheck`, `FiTrash2`

2. **States** (Linhas 22-25)
   - Estados para controlar modal e seleção de preceptores

3. **Tabela de Locais** (Linhas ~1130)
   - Novo botão "Adicionar Preceptor" na coluna de Ações
   - Trigger para abrir modal

4. **Seção Preceptores Alocados** (Linhas ~1160)
   - Cards mostrando preceptores por local
   - Botão para remover preceptor

5. **Modal** (Linhas ~1200)
   - Interface para selecionar preceptores
   - Resumo de seleção
   - Confirmação de adição

---

## ✨ Benefícios

✅ **Coordenador tem controle total** - Pode adicionar/remover preceptores em qualquer local
✅ **Interface amigável** - Modal intuitivo com preview das informações
✅ **Reutilização de preceptores** - Um preceptor pode estar alocado em múltiplos locais
✅ **Feedback visual claro** - Usuário sempre sabe quantos preceptores foram adicionados
✅ **Sem duplicatas** - Sistema evita adicionar o mesmo preceptor 2x no mesmo local
✅ **Fácil manutenção** - Remover preceptor com um clique no ícone 🗑️

---

## 🚀 Status de Compilação

✅ **Build bem-sucedido** - Sem erros
- Módulos transformados: 70
- CSS: 44.73 kB (gzip: 7.65 kB)
- JS: 599.21 kB (gzip: 126.11 kB)

---

## 💡 Funcionalidades Futuras

1. **Editar Alocação** - Modificar especialidade/turno de um preceptor em um local
2. **Importação em Lote** - CSV com preceptores + locais
3. **Filtro na Modal** - Buscar preceptores por nome/CRM/instituição
4. **Histórico** - Registrar quando preceptor foi adicionado/removido
5. **Validação** - Checar disponibilidade de preceptor para esse período
