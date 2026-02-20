# 📐 Regras de Desenvolvimento - LUME IA

> **Versão:** 1.0  
> **Data:** 2026-02-19  
> **Objetivo:** Garantir qualidade, consistência e prevenir erros de desenvolvimento

---

## 🎯 Regras Fundamentais

### 1. Modularização Obrigatória

**Regra:** Nunca escreva componentes de interface inteiros em um único arquivo se eles ultrapassarem 100 linhas.

**Como Aplicar:**
- ✅ Sempre fatie em sub-componentes (ex: `WizardStep`, `AudioButton`)
- ✅ Crie pastas temáticas em `src/components/` (ex: `wizard/`, `invoice/`)
- ✅ Um componente = uma responsabilidade

**Exemplo Correto:**
```tsx
// ❌ ERRADO: EmissaoPage.tsx com 500 linhas

// ✅ CORRETO: Modularizado
// src/app/(dashboard)/emissao/page.tsx (80 linhas)
// src/components/wizard/AudioRecorder.tsx (60 linhas)
// src/components/wizard/ProcessingState.tsx (40 linhas)
```

**Benefícios:**
- Evita erros de "pruning" (corte de memória)
- Código mais legível e manutenível
- Reutilização de componentes
- Testes mais fáceis

---

### 2. Blindagem de Dados (Defensive Coding)

**Regra:** Todo acesso a propriedades de objetos vindos de APIs ou estados deve usar Optional Chaining (`?.`) e Nullish Coalescing (`??`).

**Como Aplicar:**
```tsx
// ❌ ERRADO: Acesso direto sem proteção
const name = data.customer.name

// ✅ CORRETO: Com optional chaining
const name = data?.customer?.name ?? '---'

// ❌ ERRADO: Formatação sem verificação
const price = data.amount.toFixed(2)

// ✅ CORRETO: Verificação antes de formatar
const price = data?.amount > 0 
  ? data.amount.toFixed(2) 
  : 'R$ 0,00'
```

**Quando Aplicar:**
- ✅ Dados vindos de APIs externas
- ✅ Props de componentes
- ✅ Estados que podem ser null/undefined
- ✅ LocalStorage e SessionStorage
- ✅ Parâmetros de URL (searchParams)

**Benefícios:**
- Zero runtime errors de `undefined`
- Interface sempre funcional
- Melhor experiência do usuário
- Código mais robusto

---

### 3. Verificação de Saída

**Regra:** Antes de salvar qualquer arquivo, verifique se o conteúdo é código TypeScript/React válido e se não contém logs de erro do sistema.

**Checklist Antes de Salvar:**
- [ ] O arquivo contém código TypeScript/React válido?
- [ ] Não há textos como "Tool call argument..." ou "pruned from message history"?
- [ ] Todos os imports estão corretos?
- [ ] As chaves `{}` e parênteses `()` estão balanceados?
- [ ] Não há syntax errors (vírgulas, pontos-e-vírgulas)?

**Como Validar:**
```bash
# Rodar build para verificar erros
npm run build

# Ou apenas compilação TypeScript
npx tsc --noEmit
```

**Se Encontrar Arquivo Corrompido:**
1. ⚠️ PARE imediatamente
2. 🔍 Identifique o arquivo com problema
3. 🔧 Reescreva do zero de forma modular
4. ✅ Valide a compilação

---

### 4. Estilo Human Academy

**Regra:** Mantenha o padrão Dark Glassmorphism, use variáveis de tema do Tailwind e nunca utilize emojis no código ou na interface.

#### 4.1. Dark Glassmorphism

**Classes Padrão:**
```tsx
// Cards e containers
className="bg-card/40 backdrop-blur-xl border border-border"

// Fundos de página
className="bg-background"

// Textos principais
className="text-foreground"

// Textos secundários
className="text-muted-foreground"
```

#### 4.2. Variáveis de Tema (Tailwind)

**✅ CORRETO: Usar variáveis**
```tsx
<div className="bg-background text-foreground border-border">
  <p className="text-muted-foreground">Subtítulo</p>
</div>
```

**❌ ERRADO: Cores hardcoded**
```tsx
<div className="bg-zinc-950 text-zinc-50 border-zinc-800">
  <p className="text-zinc-400">Subtítulo</p>
</div>
```

**Por Quê?**
- As variáveis mudam automaticamente com o tema (dark/light)
- Manutenção centralizada no `globals.css`
- Consistência visual

#### 4.3. Proibição Absoluta de Emojis

**❌ NUNCA:**
```tsx
<h1>🎤 Emissão por Voz</h1>
<button>✅ Confirmar</button>
<p>📊 Dashboard</p>
```

**✅ SEMPRE: Usar lucide-react**
```tsx
import { Mic, CheckCircle, BarChart } from 'lucide-react'

<h1><Mic className="w-6 h-6" /> Emissão por Voz</h1>
<button><CheckCircle className="w-5 h-5" /> Confirmar</button>
<p><BarChart className="w-5 h-5" /> Dashboard</p>
```

**Accent Colors (Ícones):**
- `text-violet-400` - Ações principais
- `text-blue-400` - Informações
- `text-emerald-400` - Sucesso
- `text-red-400` - Erros/Alertas
- `text-cyan-400` - Dados secundários

**StrokeWidth Padrão:**
```tsx
<Icon className="w-5 h-5" strokeWidth={1.5} />
```

---

## 🔧 Ferramentas e Práticas

### TypeScript Strict Mode

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### ESLint Rules

**.eslintrc.json:**
```json
{
  "rules": {
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### Commits Semânticos

```bash
feat: Nova funcionalidade
fix: Correção de bug
docs: Documentação
refactor: Refatoração de código
style: Formatação
test: Testes
chore: Tarefas gerais
```

---

## 📚 Referências

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Sistema de design completo
- [spec.md](../spec.md) - Especificação do produto
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Decisões arquiteturais

---

## ✅ Checklist de Code Review

Antes de fazer commit:

- [ ] Código modularizado (< 100 linhas por arquivo)
- [ ] Defensive coding aplicado (`?.` e `??`)
- [ ] Arquivo verificado (sem logs de sistema)
- [ ] Variáveis de tema usadas (não hardcoded)
- [ ] Zero emojis no código
- [ ] Ícones lucide-react com strokeWidth 1.5
- [ ] Build compila sem erros (`npm run build`)
- [ ] TypeScript sem warnings
- [ ] Commit semântico

---

**Última atualização:** 2026-02-19  
**Mantenedor:** LUME IA Dev Team
