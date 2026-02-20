# 🎯 MANIFESTO DE DESENVOLVIMENTO - LUME IA

> **Fundação do Sistema | Diretrizes Inegociáveis | Protocolo AIOS**

---

## 🧬 DIRETRIZES DO LUME IA

### **1. Design System (Brad Frost - Atomic Design)**

**Hierarquia Obrigatória:**
```
Tokens (Variáveis CSS)
    ↓
Átomos (Button, Input, Badge)
    ↓
Moléculas (SearchBar, StatCard)
    ↓
Organismos (Navbar, ReviewCard)
    ↓
Templates (Layouts)
    ↓
Páginas (Dashboard, Emissão)
```

**Regras:**
- ✅ **Tokens primeiro:** Defina cores, espaçamentos e tipografia antes de criar componentes
- ✅ **Átomos reutilizáveis:** Componentes básicos devem ser genéricos e compostos
- ✅ **Organismos modulares:** Construa complexidade pela composição, não pela duplicação
- ❌ **PROIBIDO:** Criar páginas sem antes ter os átomos e moléculas prontos

**Estrutura de Pastas:**
```
src/
├── styles/
│   └── tokens.css           # Variáveis CSS (--color-*, --spacing-*)
├── components/
│   ├── atoms/               # Button, Input, Badge, Icon
│   ├── molecules/           # SearchBar, StatCard, FormField
│   ├── organisms/           # Navbar, Footer, ReviewCard, WizardStep
│   └── templates/           # DashboardLayout, AuthLayout
└── app/                     # Páginas (apenas composição)
```

---

### **2. Identidade Visual: Estética 'Human Academy'**

**Dark Mode como Padrão Absoluto:**
```css
/* SEMPRE use variáveis de tema */
background: bg-background      /* zinc-950 no dark */
text: text-foreground          /* zinc-50 no dark */
card: bg-card                  /* zinc-900 no dark */
border: border-border          /* zinc-800 no dark */
```

**Glassmorphism (Signature LUME IA):**
```tsx
// Padrão para TODOS os cards
className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-xl"
```

**Accent Colors:**
- Violet: `text-violet-400` / `bg-violet-600`
- Blue: `text-blue-400`
- Cyan: `text-cyan-400`
- Emerald: `text-emerald-400` (success)
- Red: `text-red-400` (error)

**🚫 ZERO EMOJIS:**
- ❌ **PROIBIDO:** Usar emojis na interface (🎉, 🚀, ✅, etc)
- ✅ **OBRIGATÓRIO:** Usar ícones do lucide-react com `strokeWidth={1.5}`
- ✅ **Exemplo:** `<CheckCircle className="w-5 h-5 text-emerald-400" />`

---

### **3. Engenharia Defensiva (Anti-Crash)**

**Optional Chaining Obrigatório:**
```tsx
// ❌ ERRADO (pode quebrar)
const name = data.customer.name

// ✅ CORRETO
const name = data?.customer?.name ?? 'Não informado'
```

**Nullish Coalescing em Formatações:**
```tsx
// ❌ ERRADO
{formatCurrency(invoice.amount)}

// ✅ CORRETO
{invoice?.amount ? formatCurrency(invoice.amount) : 'R$ 0,00'}
```

**Checklist de Blindagem:**
- [ ] Todo acesso a propriedades usa `?.`
- [ ] Todo valor renderizado tem fallback com `??`
- [ ] Funções de formatação verificam se o dado existe antes
- [ ] Arrays usam `Array.isArray()` antes de `.map()`

**Exemplo Completo:**
```tsx
interface Patient {
  id: string
  name?: string
  cpf?: string
  email?: string
}

function PatientCard({ patient }: { patient?: Patient }) {
  return (
    <div>
      <h3>{patient?.name ?? '---'}</h3>
      <p>{patient?.cpf ?? 'CPF não informado'}</p>
      <p>{patient?.email ?? 'Email não cadastrado'}</p>
    </div>
  )
}
```

---

### **4. Regra Anti-Pruning (Modularização Obrigatória)**

**Limite de Linhas por Arquivo:**
- ✅ **Átomos:** Máximo 50 linhas
- ✅ **Moléculas:** Máximo 80 linhas
- ✅ **Organismos:** Máximo 100 linhas
- ✅ **Páginas:** Máximo 120 linhas (apenas composição)

**Se ultrapassar o limite:**
1. Extraia lógica para hooks customizados (`usePatientSearch`, `useInvoiceForm`)
2. Quebre em sub-componentes (`WizardStep`, `AudioButton`, `ProgressBar`)
3. Mova constantes para arquivos separados (`constants.ts`)

**Exemplo de Fatiamento:**
```tsx
// ❌ ERRADO: 1 arquivo de 300 linhas
EmissaoPage.tsx (300 linhas)

// ✅ CORRETO: Modularizado
EmissaoPage.tsx (80 linhas - apenas composição)
  ├── AudioRecorder.tsx (60 linhas)
  ├── ProcessingState.tsx (40 linhas)
  ├── ReviewStep.tsx (50 linhas)
  └── SuccessState.tsx (30 linhas)
```

---

### **5. Quality Gates (Aprovação Obrigatória)**

**Nenhuma feature é considerada "concluída" sem:**

#### **✅ Gate 1: Compilação Limpa**
```bash
npm run build  # Deve passar SEM erros
npm run lint   # Máximo 5 warnings (apenas 'any' types permitidos)
```

#### **✅ Gate 2: Contraste de UI (@qa)**
- Todos os textos legíveis em dark mode (mínimo WCAG AA)
- Cards com glassmorphism visível
- Accent colors aplicadas corretamente
- ZERO emojis encontrados

#### **✅ Gate 3: Responsividade**
- Teste em 3 breakpoints: Mobile (375px), Tablet (768px), Desktop (1440px)
- Sem scroll horizontal
- Textos não quebrados

#### **✅ Gate 4: Dados Blindados**
- Nenhum erro de `Cannot read property of undefined`
- Todos os dados externos com `?.` e `??`
- Loading states para chamadas assíncronas

**Checklist de Review:**
```markdown
- [ ] Compilação limpa (build + lint)
- [ ] UI com contraste perfeito
- [ ] Responsivo em 3 breakpoints
- [ ] Dados blindados (defensive coding)
- [ ] Componentes < 100 linhas
- [ ] Zero emojis
- [ ] Variáveis de tema (não hardcoded)
- [ ] Documentação atualizada
```

---

## 🚫 ANTI-PATTERNS (Proibido)

### **❌ Nunca Faça:**
1. **Hardcoded Colors:**
   ```tsx
   // ❌ ERRADO
   className="bg-white text-gray-900"
   
   // ✅ CORRETO
   className="bg-background text-foreground"
   ```

2. **Emojis na Interface:**
   ```tsx
   // ❌ ERRADO
   <h1>🎉 Bem-vindo!</h1>
   
   // ✅ CORRETO
   <h1><Sparkles /> Bem-vindo!</h1>
   ```

3. **Acesso Direto a Propriedades:**
   ```tsx
   // ❌ ERRADO
   const name = user.profile.name
   
   // ✅ CORRETO
   const name = user?.profile?.name ?? 'Usuário'
   ```

4. **Componentes Monolíticos:**
   ```tsx
   // ❌ ERRADO
   DashboardPage.tsx (500 linhas)
   
   // ✅ CORRETO
   DashboardPage.tsx (80 linhas)
     + StatCard.tsx (40 linhas)
     + QuickActions.tsx (50 linhas)
   ```

5. **Magic Numbers:**
   ```tsx
   // ❌ ERRADO
   const taxRate = 0.05
   
   // ✅ CORRETO
   const TAX_RATE_ISS = 0.05  // 5% ISS para Fortaleza
   ```

---

## 📋 WORKFLOW OBRIGATÓRIO

### **Para Cada Nova Feature:**

1. **[@pm]** Criar story detalhada em `docs/stories/`
2. **[@architect]** Definir componentes necessários (atoms → organisms)
3. **[@ux-expert]** Validar design system e acessibilidade
4. **[@dev]** Implementar seguindo regras anti-pruning
5. **[@qa]** Executar quality gates (build + UI + responsividade)
6. **[@devops]** Commit semântico + push para GitHub

### **Commits Semânticos:**
```bash
feat(wizard): Adicionar estado de processamento com animação
fix(ui): Corrigir contraste em cards de pacientes
docs(stories): Criar story 007 para portal do contador
refactor(auth): Modularizar componente de login
chore(deps): Atualizar next-themes para v0.4.7
```

---

## 🎯 MÉTRICAS DE SUCESSO

**Code Quality:**
- ✅ Build time < 30s
- ✅ Bundle size < 100kB (First Load JS)
- ✅ Zero erros de runtime
- ✅ Lighthouse Score > 90

**Design Consistency:**
- ✅ 100% das páginas em dark mode
- ✅ 100% dos ícones do lucide-react
- ✅ 0 emojis encontrados
- ✅ 100% variáveis de tema

**Developer Experience:**
- ✅ Componentes reutilizáveis
- ✅ Documentação atualizada
- ✅ Stories completas
- ✅ Código auto-explicativo

---

## 📚 REFERÊNCIAS

**Design:**
- Atomic Design: https://bradfrost.com/blog/post/atomic-web-design/
- Human Academy: Estética de referência (dark premium, glassmorphism)

**Desenvolvimento:**
- Next.js 14: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- lucide-react: https://lucide.dev

**Acessibilidade:**
- WCAG 2.1 AA: https://www.w3.org/WAI/WCAG21/quickref/

---

## ✅ APROVAÇÃO

**Este manifesto foi aprovado por:**
- [@architect] - Arquitetura técnica validada
- [@devops] - Workflow e quality gates estabelecidos
- [@ux-expert] - Design system e identidade visual confirmados
- [@pm] - Alinhado com visão de produto

**Data:** 2026-02-19  
**Versão:** 1.0  
**Status:** ✅ ATIVO

---

> **"Débito técnico é evitado na fundação, não na refatoração."**  
> **- Manifesto LUME IA**
