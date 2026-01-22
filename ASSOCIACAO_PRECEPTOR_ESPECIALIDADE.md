# Funcionalidade: Associação de Preceptor à Especialidade

## Resumo da Implementação

Foi implementada a funcionalidade de associar preceptores a especialidades em ambos os dashboards (Administrador e Coordenador) através do componente compartilhado `PreceptoresMultiplosAdm`.

## Alterações Realizadas

### 1. **PreceptoresMultiplosAdm.jsx** (Componente Compartilhado)

#### Imports Adicionados (Linha 2)
```javascript
import { FiX, FiCheck, FiStar } from 'react-icons/fi'
```
- `FiX`: Ícone para fechar o modal
- `FiCheck`: Ícone para indicar seleção
- `FiStar`: Ícone para o botão de especialidade

#### Estados Adicionados (Linhas 9-12)
```javascript
const [modalAssociarEspecialidade, setModalAssociarEspecialidade] = useState(false)
const [preceptorSelecionado, setPreceptorSelecionado] = useState(null)
const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('')
const [preceptoresComEspecialidade, setPreceptoresComEspecialidade] = useState({})
```

#### Mock de Especialidades (Linhas 14-27)
Array com 10 especialidades disponíveis:
- Clínica Médica
- Cirurgia Geral
- Pediatria
- Cardiologia
- Ginecologia
- Enfermagem Clínica
- Farmácia Clínica
- Urgência e Emergência
- Saúde Pública
- Ortopedia

#### Botão de Especialidade (Adicionado no card de preceptor)
- Botão verde com ícone de estrela
- Texto: "Especialidade"
- Ao clicar, abre o modal para associar uma especialidade
- Posicionado antes do botão "Ver Mais"

#### Seção de Especialidade Associada (Adicionada nos detalhes expandidos)
- **Se houver especialidade associada**: 
  - Card com fundo verde claro
  - Exibe o nome da especialidade
  - Status "Ativa"
  - Texto informativo: "Clique em 'Especialidade' para alterar"

- **Se não houver especialidade associada**:
  - Card com borda tracejada cinza
  - Mensagem: "Nenhuma especialidade associada"
  - Instruções para associar uma

#### Modal de Associação de Especialidade
**Estrutura:**
- **Header**: Gradient verde com título e nome do preceptor
  - Botão para fechar o modal
  
- **Conteúdo**:
  - Seção de status atual (mostra especialidade atualmente associada ou "Nenhuma")
  - Lista de especialidades com seleção por radio button
  - Efeitos visuais (destaque na seleção, ícone de check)
  - Scroll automático se houver muitas especialidades

- **Footer**: 
  - Botão "Cancelar" (estilos neutros)
  - Botão "Atualizar" (gradient verde, desabilitado até seleção)

### 2. Componentes Afetados

#### DashboardAdm.jsx
- Utiliza o `PreceptoresMultiplosAdm` diretamente
- Herda automaticamente a funcionalidade de especialidade

#### DashboardCoordenador.jsx
- Utiliza o `PreceptoresMultiplosAdm` compartilhado (linha 849)
- Herda automaticamente a funcionalidade de especialidade
- Usuários coordenadores podem agora associar especialidades aos preceptores

## Funcionalidades Implementadas

### ✅ Para o Dashboard Administrador
- Botão "Especialidade" em cada card de preceptor
- Modal para seleção de especialidade (single-select)
- Visualização de especialidade associada
- Alteração de especialidade associada

### ✅ Para o Dashboard Coordenador
- Mesmas funcionalidades que o Administrador
- Compartilhamento do código com o Admin (reutilização do componente)

## Fluxo de Uso

### Para Associar uma Especialidade:
1. Navegue até a aba "Preceptores"
2. Localize o preceptor desejado
3. Clique no botão verde "⭐ Especialidade"
4. Na janela do modal:
   - Visualize a especialidade atual (se houver)
   - Selecione uma das 10 especialidades disponíveis
   - Clique em "Atualizar" para confirmar
5. A especialidade será exibida no card do preceptor com status "Ativa"

### Para Visualizar a Especialidade:
1. Clique em "Ver Mais" no card do preceptor
2. Role até a seção "Especialidade Associada"
3. A especialidade será exibida com fundo verde se houver
4. Se não houver, será exibida mensagem de "Nenhuma especialidade associada"

## Estados e Dados

### Estrutura de Dados
```javascript
preceptoresComEspecialidade = {
  [preceptorId]: "Nome da Especialidade"
}
```

### Especialidades Disponíveis
```javascript
{
  id: número,
  nome: "string",
  codigo: "string (ex: CM001)"
}
```

## Validações

- ✅ Modal desabilitado até seleção de especialidade
- ✅ Visualização de especialidade atual no modal
- ✅ Confirmação de alteração via botão "Atualizar"
- ✅ Possibilidade de cancelar alterações

## Estilos Aplicados

### Cores
- **Verde/Turquesa**: `from-[#10E686] to-[#60E6D7]` - Novo, ativo
- **Azul**: `#237EE6` - Principal
- **Cinza**: Neutro, estados desabilitados

### Componentes Visuais
- Gradients lineares suavizados
- Shadows e transições suaves
- Responsividade mobile-first
- Ícones react-icons bem integrados

## Build Status

✅ **Build bem-sucedido**
- 70 modules transformados
- CSS: 45.83 kB (gzip: 7.78 kB)
- JS: 604.11 kB (gzip: 127.15 kB)

## Próximos Passos (Opcional)

1. **Integração com API**: Substituir mock de especialidades por dados da API
2. **Persistência**: Salvar associações no banco de dados
3. **Histórico**: Registrar mudanças de especialidade
4. **Validações**: Implementar regras de negócio adicionais
5. **Notificações**: Avisar sobre alterações de especialidade

## Arquivos Modificados

- [PreceptoresMultiplosAdm.jsx](src/pages/dashboard/DashboardAdm/components/PreceptoresMultiplosAdm.jsx)

## Observações Importantes

- O componente `PreceptoresMultiplosAdm` é compartilhado entre Admin e Coordenador
- Alterações no componente afetam ambos os dashboards automaticamente
- Dados de especialidades estão em mock (array local)
- Estado de especialidades associadas é mantido em memória (não persiste ao recarregar)
