# Padronização de Perfis de Acesso - Resumo das Mudanças

## 📋 Objetivo
Estabelecer 5 perfis de acesso padrão com controle de permissões baseado em roles em ambos os dashboards (Admin e Coordenador).

---

## ✅ Perfis Definidos

| ID | Nome | Descrição | Total Usuários | Permissões |
|----|------|-----------|-----------------|-----------|
| 1 | **Administrador** | Acesso total ao sistema | 3 | criar, editar, excluir, visualizar, gerenciar_usuarios, gerenciar_estagios, gerenciar_alunos, validar_frequencia, avaliar_alunos, gerenciar_turmas, upload_documentos, gerenciar_lgpd, exportar_dados, configurar_sistema |
| 2 | **Coordenador** | Gerenciar estágios, turmas e alunos da instituição | 12 | criar, editar, visualizar, gerenciar_estagios, gerenciar_alunos, validar_frequencia, avaliar_alunos, gerenciar_turmas, upload_documentos, exportar_dados |
| 3 | **Gestor Local** | Gerenciar estágios em um local específico | 8 | visualizar, gerenciar_estagios, gerenciar_alunos, validar_frequencia, avaliar_alunos, upload_documentos, exportar_dados |
| 4 | **Preceptor** | Supervisionar alunos e validar frequências | 45/28 | visualizar, validar_frequencia, avaliar_alunos, upload_documentos |
| 5 | **Aluno** | Registrar frequência e acessar documentos | 234/115 | visualizar, registrar_frequencia, upload_documentos |

---

## 🔐 Controle de Acesso

### Dashboard Admin
- ✅ Pode atribuir **qualquer um** dos 5 perfis
- Seletor mostra todos os 5 perfis sem restrições
- Interface: Grid 6 colunas com botões para selecionar perfil

### Dashboard Coordenador
- ✅ Pode atribuir **apenas**: Aluno (5), Preceptor (4), Gestor Local (3)
- ❌ **NÃO pode** atribuir: Administrador (1), Coordenador (2)
- Seletor filtrado: `.filter(p => [5, 4, 3].includes(p.id_perfil))`
- Nota informativa: "Como Coordenador, você pode atribuir apenas: Aluno, Preceptor e Gestor Local"
- Resumo visual mostra todos os 5 perfis com indicadores de restrição (opacidade 60% + borda cinza para [1,2])

---

## 📝 Arquivos Modificados

### 1. **DashboardAdm.jsx**
**Linhas:** 30-75 (Perfis) | 77-230 (Usuários)

**Alterações:**
- ✅ Perfis array atualizado: 6 perfis → 5 perfis
- ✅ ID_perfil mapeado: 1=Admin, 2=Coordenador, 3=Gestor Local, 4=Preceptor, 5=Aluno
- ✅ Usuários 1-10 com id_perfil corretos:
  - Usuario 1: id_perfil 1 (Admin)
  - Usuario 2: id_perfil 2 (Coordenador)
  - Usuario 3: id_perfil 4 (Preceptor) ← Alterado de 3
  - Usuario 4: id_perfil 3 (Gestor Local) ← Novo usuario com este perfil
  - Usuario 5: id_perfil 5 (Aluno)
  - Usuario 6: id_perfil 3 (Gestor Local) ← Alterado de 6 (LGPD removido)
  - Usuario 7: id_perfil 2 (Coordenador)
  - Usuario 8: id_perfil 4 (Preceptor) ← Alterado de 3
  - Usuario 9: id_perfil 5 (Aluno)
  - Usuario 10: id_perfil 4 (Preceptor) ← Alterado de 3
- ✅ Aba "Atribuir Funções": Mostra todos os 5 perfis (sem filtro)

### 2. **DashboardCoordenador.jsx**
**Linhas:** 478-517 (Perfis)

**Alterações:**
- ✅ Perfis array alinhado com DashboardAdm (5 perfis com mesmas descrições)
- ✅ Aba "Atribuir Funções": Filtro aplicado
  - Seletor de perfis: `.filter(p => [5, 4, 3].includes(p.id_perfil))`
  - Resumo com restrições visuais:
    - Perfis [1,2]: Opacidade 60%, borda cinza, label "Restrito"
    - Perfis [3,4,5]: Normais, selecionáveis
  - Nota informativa para usuário: "Nota: Como Coordenador, você pode atribuir apenas: Aluno, Preceptor e Gestor Local"

---

## 🎯 Funcionalidades Implementadas

### Admin Dashboard
```jsx
// Seletor exibe todos os 5 perfis
{perfis.map((perfil) => (
  <button key={perfil.id_perfil} ...>
    {perfil.nome_perfil}
  </button>
))}
```

### Coordenador Dashboard
```jsx
// Seletor filtra apenas [5, 4, 3]
{perfis
  .filter(p => [5, 4, 3].includes(p.id_perfil))
  .map((perfil) => (
    <button key={perfil.id_perfil} ...>
      {perfil.nome_perfil}
    </button>
  ))
}

// Resumo com indicadores visuais
{perfis.map((perfil) => {
  const podeAtribuir = [5, 4, 3].includes(perfil.id_perfil)
  return (
    <div className={podeAtribuir ? 'normal' : 'opacity-60 border-gray-300'}>
      {!podeAtribuir && (
        <span className='text-xs text-red-600 font-semibold'>Restrito</span>
      )}
    </div>
  )
})}
```

---

## ✨ Resultado Final

### Dashboard Admin
- Grid com 5 botões de perfil (Admin, Coordenador, Gestor Local, Preceptor, Aluno)
- Todos selecionáveis sem restrições
- Poder atribuir qualquer perfil a qualquer usuário

### Dashboard Coordenador
- Grid com **3 botões** de perfil (Aluno, Preceptor, Gestor Local)
- Perfis [Admin, Coordenador] não aparecem no seletor
- Resumo visual mostra os 5 perfis com indicadores:
  - [Aluno, Preceptor, Gestor Local] = Selecionáveis (normal)
  - [Admin, Coordenador] = Restrito (opacidade 60%, label "Restrito")
- Mensagem informativa clara

---

## 🚀 Status de Compilação

✅ **Build bem-sucedido** - Sem erros de compilação
- Módulos transformados: 70
- Assets gerados: CSS 44.46 kB (gzip: 7.60 kB), JS 594.01 kB (gzip: 124.91 kB)
- Aviso: Alguns chunks > 500 kB (considerado para otimização futura)

---

## 📌 Próximas Etapas (Opcional)

1. **Code Splitting** - Reduzir tamanho dos chunks (594 kB → <300 kB)
2. **Testes E2E** - Validar fluxo de atribuição de perfis em ambos dashboards
3. **Integração Backend** - Conectar com API real para persistência
4. **Auditoria** - Log de mudanças de perfis para compliance LGPD
