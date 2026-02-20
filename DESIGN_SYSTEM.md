# Sistema de Design LUME IA
## Padrão Estético: Human Academy

> **Fonte de Verdade para Todo o Projeto**
> Versão: 2.0 | Última atualização: 2026-02-19

---

## 🎨 Filosofia de Design

### Padrão Estético: Human Academy

**Luxo Minimalista Tecnológico**

LUME IA segue o padrão estético **"Human Academy"** - uma linguagem visual premium inspirada em:
- **Linear.app** - Grids assimétricos e tipografia impactante
- **Vercel.com** - Dark mode elegante e glassmorphism
- **Apple.com** - Minimalismo sofisticado e motion design
- **Stripe.com** - Profissionalismo e confiança visual

**O que é o padrão Human Academy?**

É uma estética que transmite **elite tecnológica** através de:
1. **Fundos escuros profundos** que remetem a sofisticação
2. **Efeitos de vidro translúcido** que criam profundidade
3. **Tipografia de alto impacto** que comunica confiança
4. **Layouts assimétricos** que quebram a monotonia

**Objetivo Emocional:**
- Para médicos: "Este é um software de elite, como os que hospitais top usam"
- Para usuários: "Profissional, moderno, confiável"
- Para investidores: "Produto premium digno de investimento"

---

### Os 4 Pilares do Human Academy

#### 1️⃣ **Fundos Escuros Profundos (Dark Mode Premium)**

**Cor base:** `zinc-950` (#09090b)

**Por que dark mode?**
- ✅ Transmite sofisticação e modernidade
- ✅ Reduz fadiga visual (médicos usam o dia todo)
- ✅ Destaca elementos importantes por contraste
- ✅ Associado a produtos premium (Apple, Tesla)

**Hierarquia de Backgrounds:**

```css
/* Nível 1 - Base da aplicação */
bg-zinc-950  /* #09090b - Fundo principal */

/* Nível 2 - Cards sólidos */
bg-zinc-900  /* #18181b - Cards elevados */

/* Nível 3 - Glass effects */
bg-zinc-900/30  /* Transparência 30% com blur */

/* Nível 4 - Hover states */
bg-zinc-800  /* #27272a - Interactive elements */
```

**Exemplo de aplicação:**
```tsx
<body className="bg-zinc-950 text-zinc-50">
  <nav className="bg-zinc-900/30 backdrop-blur-xl">
    {/* Navbar translúcida */}
  </nav>
  
  <main className="bg-zinc-950">
    <div className="bg-zinc-900 rounded-2xl p-8">
      {/* Card sólido */}
    </div>
  </main>
</body>
```

**Regras:**
- Nunca usar preto puro (#000000) - sempre zinc-950
- Sempre ter contraste mínimo 4.5:1 para acessibilidade
- Testar em diferentes brilhos de tela

---

#### 2️⃣ **Glassmorphism (Efeito de Vidro Translúcido)**

**O que é:** Elementos que parecem vidro fosco, deixando ver o fundo desfocado.

**Fórmula do Glass Effect:**

```css
.glass {
  background: rgba(24, 24, 27, 0.3);  /* zinc-900 com 30% opacity */
  backdrop-filter: blur(20px);         /* Desfoque do fundo */
  border: 1px solid rgba(63, 63, 70, 0.5);  /* Borda sutil */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);  /* Sombra profunda */
}
```

**Tailwind CSS:**
```tsx
<div className="
  bg-zinc-900/30 
  backdrop-blur-xl 
  border border-zinc-800/50
  shadow-2xl
  rounded-2xl
  p-8
">
  Conteúdo glass
</div>
```

**Quando usar glassmorphism:**
- ✅ Navbar fixa no topo (scroll transparente)
- ✅ Cards hero (VoiceRecorder, features principais)
- ✅ Modais e overlays
- ✅ Dropdowns e tooltips
- ✅ Sidebar em mobile

**Quando NÃO usar:**
- ❌ Backgrounds de texto longo (reduz legibilidade)
- ❌ Mais de 3 níveis de profundidade (confuso)
- ❌ Dispositivos antigos (performance ruim)

**Exemplo completo - VoiceRecorder Card:**

```tsx
<div className="
  relative
  bg-gradient-to-br from-zinc-900/40 to-zinc-900/20
  backdrop-blur-2xl
  border border-zinc-800/50
  rounded-3xl
  p-12
  shadow-[0_8px_32px_rgba(0,0,0,0.4)]
  hover:border-zinc-700/50
  transition-all duration-300
">
  {/* VoiceRecorder aqui */}
</div>
```

**Variações:**

```css
/* Glass Subtle (Navbar) */
.glass-navbar {
  background: rgba(24, 24, 27, 0.2);
  backdrop-filter: blur(16px);
}

/* Glass Strong (Modal) */
.glass-modal {
  background: rgba(24, 24, 27, 0.6);
  backdrop-filter: blur(24px);
}

/* Glass Hover (Interactive) */
.glass-hover:hover {
  background: rgba(24, 24, 27, 0.5);
  backdrop-filter: blur(20px);
}
```

---

#### 3️⃣ **Tipografia de Alto Impacto (tracking-tight)**

**Filosofia:** Títulos grandes, compactos e impactantes que dominam a tela.

**Fonte:** Inter (Google Fonts)

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700']
})
```

**Escala Tipográfica LUME IA:**

```css
/* Hero Title (Landing Page) */
.title-hero {
  font-size: 4.5rem;        /* text-7xl - 72px */
  font-weight: 700;         /* font-bold */
  letter-spacing: -0.05em;  /* tracking-tighter */
  line-height: 1;           /* leading-none */
  color: #fafafa;           /* text-zinc-50 */
}

/* Section Title */
.title-section {
  font-size: 3rem;          /* text-5xl - 48px */
  font-weight: 600;         /* font-semibold */
  letter-spacing: -0.025em; /* tracking-tight */
  line-height: 1.1;
}

/* Card Title */
.title-card {
  font-size: 1.5rem;        /* text-2xl - 24px */
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

/* Body Large (Subtítulos) */
.text-large {
  font-size: 1.25rem;       /* text-xl - 20px */
  font-weight: 400;
  line-height: 1.75;
  color: #a1a1aa;           /* text-zinc-400 */
}

/* Body Regular */
.text-body {
  font-size: 1rem;          /* text-base - 16px */
  line-height: 1.5;
  color: #fafafa;           /* text-zinc-50 */
}
```

**Tailwind Classes:**

```tsx
{/* Hero */}
<h1 className="text-7xl font-bold tracking-tighter leading-none text-zinc-50">
  Emita notas fiscais por voz
</h1>

{/* Section */}
<h2 className="text-5xl font-semibold tracking-tight text-zinc-50">
  Como funciona
</h2>

{/* Subtitle */}
<p className="text-xl text-zinc-400 leading-relaxed">
  Transforme sua rotina médica em segundos
</p>
```

**Regras de Ouro:**
- ✅ Sempre `tracking-tight` ou `tracking-tighter` em títulos
- ✅ Contraste mínimo: zinc-50 em zinc-950 (21:1 ratio)
- ✅ Line-height reduzido em títulos (1 - 1.2)
- ✅ Line-height generoso em corpo de texto (1.5 - 1.75)
- ✅ Máximo 3 pesos de fonte (400, 600, 700)

**Hierarquia Visual:**

```
Título Hero (72px, bold, tight)
    ↓
Subtítulo (20px, regular, relaxed)
    ↓
Section Title (48px, semibold, tight)
    ↓
Body (16px, regular, normal)
    ↓
Caption (14px, regular, muted)
```

---

#### 4️⃣ **Bento Grids (Grids Assimétricos)**

**O que é:** Layout de grid onde os elementos têm tamanhos diferentes, criando ritmo visual.

**Inspiração:** Linear.app, Notion.so

**Estrutura Base:**

```
┌─────────────────┬─────────┐
│                 │    2    │
│        1        │ (1x1)   │
│     (2x2)       ├─────────┤
│                 │    3    │
│                 │ (1x1)   │
├─────────┬───────┴─────────┤
│    4    │        5        │
│  (1x1)  │     (2x1)       │
└─────────┴─────────────────┘
```

**Implementação Tailwind:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
  {/* Card 1 - Grande (Hero) */}
  <div className="md:col-span-2 md:row-span-2 glass rounded-3xl p-12">
    <h3>Voice-to-Invoice</h3>
    <VoiceRecorder />
  </div>
  
  {/* Card 2 - Pequeno */}
  <div className="glass rounded-2xl p-6">
    <h3>Rápido</h3>
  </div>
  
  {/* Card 3 - Pequeno */}
  <div className="glass rounded-2xl p-6">
    <h3>Seguro</h3>
  </div>
  
  {/* Card 4 - Pequeno */}
  <div className="glass rounded-2xl p-6">
    <h3>Automático</h3>
  </div>
  
  {/* Card 5 - Médio */}
  <div className="md:col-span-2 glass rounded-2xl p-8">
    <h3>Inteligência Tributária</h3>
  </div>
</div>
```

**Padrões de Bento Grid:**

**Padrão 1: Hero Esquerda**
```tsx
<div className="grid grid-cols-3 gap-6">
  <div className="col-span-2 row-span-2">{/* Hero */}</div>
  <div>{/* Small 1 */}</div>
  <div>{/* Small 2 */}</div>
  <div className="col-span-3">{/* Full width */}</div>
</div>
```

**Padrão 2: Centro Destaque**
```tsx
<div className="grid grid-cols-4 gap-6">
  <div>{/* Side 1 */}</div>
  <div className="col-span-2 row-span-2">{/* Hero Center */}</div>
  <div>{/* Side 2 */}</div>
  <div>{/* Bottom 1 */}</div>
  <div>{/* Bottom 2 */}</div>
</div>
```

**Padrão 3: Masonry (Pinterest-style)**
```tsx
<div className="grid grid-cols-3 gap-6">
  <div className="row-span-3">{/* Tall */}</div>
  <div className="row-span-2">{/* Medium */}</div>
  <div>{/* Small */}</div>
  <div>{/* Small */}</div>
  <div className="row-span-2">{/* Medium */}</div>
</div>
```

**Regras do Bento Grid:**
- ✅ Sempre ímpar número de colunas (3 ou 5, não 4)
- ✅ Card hero ocupa 2x2 ou 2x1
- ✅ Mínimo 3 cards, máximo 6 por seção
- ✅ Gap consistente (24px ou 32px)
- ✅ Border-radius variável (maior card = maior radius)

**Mobile-First:**
```tsx
<div className="
  grid 
  grid-cols-1           /* Mobile: 1 coluna */
  md:grid-cols-3        /* Desktop: 3 colunas */
  gap-4                 /* Mobile: gap menor */
  md:gap-6              /* Desktop: gap maior */
">
  <div className="md:col-span-2 md:row-span-2">
    {/* No mobile: full width. No desktop: 2x2 */}
  </div>
</div>
```

**Features Section - Exemplo Completo:**

```tsx
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-5xl font-bold tracking-tight mb-16">
      Por que médicos escolhem LUME IA
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Hero Card - Voice-to-Invoice */}
      <div className="
        md:col-span-2 md:row-span-2
        bg-gradient-to-br from-zinc-900/40 to-zinc-900/20
        backdrop-blur-xl
        border border-zinc-800/50
        rounded-3xl p-12
        flex flex-col items-center justify-center
      ">
        <Mic className="w-16 h-16 text-zinc-400 mb-6" strokeWidth={1.5} />
        <h3 className="text-3xl font-semibold mb-4">Emissão por Voz</h3>
        <p className="text-zinc-400 text-center mb-8">
          Aperte, fale, pronto. Sua nota está emitida em 10 segundos.
        </p>
        <VoiceRecorder />
      </div>
      
      {/* Small Card 1 */}
      <div className="glass rounded-2xl p-6">
        <Zap className="w-8 h-8 text-yellow-500 mb-4" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold mb-2">Instantâneo</h3>
        <p className="text-zinc-400 text-sm">
          Menos de 10 segundos do áudio ao PDF
        </p>
      </div>
      
      {/* Small Card 2 */}
      <div className="glass rounded-2xl p-6">
        <Shield className="w-8 h-8 text-blue-500 mb-4" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold mb-2">Seguro</h3>
        <p className="text-zinc-400 text-sm">
          Conformidade fiscal garantida
        </p>
      </div>
      
      {/* Medium Card */}
      <div className="md:col-span-3 glass rounded-2xl p-8 flex items-center gap-6">
        <TrendingUp className="w-12 h-12 text-green-500" strokeWidth={1.5} />
        <div>
          <h3 className="text-2xl font-semibold mb-2">
            Inteligência Tributária Automática
          </h3>
          <p className="text-zinc-400">
            Cálculo automático de ISS, PIS, COFINS e IRRF para área médica
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### Combinando os 4 Pilares

**Receita do Human Academy:**

1. **Background:** `bg-zinc-950` (fundo escuro profundo)
2. **Cards:** Glass effect com `backdrop-blur-xl`
3. **Títulos:** `text-5xl font-bold tracking-tight`
4. **Layout:** Bento Grid assimétrico

**Exemplo de seção completa:**

```tsx
<section className="min-h-screen bg-zinc-950 py-20">
  {/* Fundo escuro ✓ */}
  
  <h1 className="text-7xl font-bold tracking-tighter text-zinc-50">
    {/* Tipografia impactante ✓ */}
    Emita notas fiscais por voz
  </h1>
  
  <div className="grid grid-cols-3 gap-8 mt-16">
    {/* Bento Grid ✓ */}
    
    <div className="col-span-2 glass rounded-3xl p-12">
      {/* Glassmorphism ✓ */}
      <VoiceRecorder />
    </div>
  </div>
</section>
```

✅ **Todos os 4 pilares aplicados!**

---

**Aprovado por:** @ux-expert, @architect  
**Obrigatório em:** Landing Page, Dashboard, todas páginas públicas

---

## 🚫 REGRA ABSOLUTA: ZERO EMOJIS

### ⛔ PROIBIÇÃO GLOBAL E IRREVOGÁVEL

**É ESTRITAMENTE PROIBIDO** o uso de emojis em **TODO O PROJETO LUME IA**.

Esta não é uma recomendação. É uma **REGRA ARQUITETURAL CRÍTICA**.

---

### Onde Emojis São PROIBIDOS

#### ❌ **Landing Page (Home)**
- Hero section
- Features
- CTAs
- Rodapé
- Qualquer seção pública

#### ❌ **Dashboard (Painel do Médico)**
- Navbar
- Sidebar
- Cards de estatísticas
- Listas de notas fiscais
- Formulários
- Botões de ação

#### ❌ **Páginas Internas**
- Tela de emissão (/emissao)
- Lista de notas (/notas)
- Gestão de clientes (/clientes)
- Configurações (/configuracoes)
- Perfil do usuário

#### ❌ **Painel Contábil**
- Dashboard contábil
- Relatórios
- PDFs consolidados
- Tabelas de emissões

#### ❌ **Mensagens do Sistema**
- Mensagens de sucesso (ex: "Nota emitida com sucesso")
- Mensagens de erro (ex: "Falha ao emitir nota")
- Alertas e warnings
- Confirmações
- Tooltips

#### ❌ **Notificações**
- Push notifications
- In-app notifications
- Emails transacionais
- SMS (se houver)

#### ❌ **Estados de Loading**
- Spinners
- Skeletons
- Mensagens de carregamento

#### ❌ **Empty States**
- "Nenhuma nota emitida ainda"
- "Lista vazia"
- Páginas 404

#### ❌ **Documentação do Usuário**
- FAQs
- Tutoriais in-app
- Onboarding
- Tooltips de ajuda

#### ❌ **Meta Tags e SEO**
- Titles
- Descriptions
- Open Graph tags

---

### Por Que Esta Regra Existe?

**1. Profissionalismo**
- Emojis infantilizam a interface
- Médicos esperam software de nível corporativo
- LUME IA compete com produtos enterprise

**2. Consistência Visual**
- Emojis têm aparência diferente em cada sistema operacional
- iOS 🎤 ≠ Android 🎤 ≠ Windows 🎤
- Quebram a identidade visual do Human Academy

**3. Acessibilidade**
- Screen readers leem emojis de forma inconsistente
- Podem confundir usuários com deficiência visual
- Violam princípios WCAG

**4. Escalabilidade Internacional**
- Emojis têm significados diferentes em culturas diferentes
- LUME IA pode expandir para outros países
- Ícones SVG são universais

**5. Manutenibilidade**
- Emojis em código são difíceis de pesquisar
- Impossível fazer replace em massa
- Criam dívida técnica

---

### O Que Usar NO LUGAR de Emojis

#### ✅ **1. Ícones lucide-react (OBRIGATÓRIO)**

```tsx
import { Mic, CheckCircle, AlertCircle, Info } from 'lucide-react'

// Ao invés de: "🎤 Gravar"
<button>
  <Mic size={20} strokeWidth={1.5} />
  <span>Gravar</span>
</button>

// Ao invés de: "✅ Nota emitida com sucesso!"
<div>
  <CheckCircle className="text-green-500" />
  <span>Nota emitida com sucesso</span>
</div>

// Ao invés de: "⚠️ Atenção"
<div>
  <AlertCircle className="text-yellow-500" />
  <span>Atenção</span>
</div>
```

#### ✅ **2. Badges Textuais**

```tsx
// Ao invés de: "🔥 Novo"
<span className="
  px-3 py-1 
  text-xs font-medium 
  bg-red-500/10 
  text-red-500 
  rounded-full 
  border border-red-500/20
">
  Novo
</span>

// Ao invés de: "⭐ Premium"
<span className="
  px-3 py-1 
  bg-gradient-to-r from-yellow-500/20 to-orange-500/20
  text-yellow-500
  rounded-full
">
  Premium
</span>
```

#### ✅ **3. Indicadores Visuais com Cores**

```tsx
// Ao invés de: "🟢 Online"
<div className="flex items-center gap-2">
  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
  <span>Online</span>
</div>

// Ao invés de: "🔴 Erro"
<div className="flex items-center gap-2">
  <div className="w-2 h-2 rounded-full bg-red-500" />
  <span>Erro</span>
</div>
```

#### ✅ **4. Animações com framer-motion**

```tsx
// Ao invés de: "✨ Novo recurso"
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="relative"
>
  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
  <span>Novo recurso</span>
</motion.div>
```

---

### Exemplos de Violações e Correções

#### ❌ **ERRADO:**

```tsx
// Landing Page
<h1>🎤 Emita notas fiscais por voz</h1>

// Dashboard
<div>📊 Estatísticas</div>

// Mensagem de sucesso
<p>✅ Nota emitida com sucesso!</p>

// Empty state
<p>📭 Nenhuma nota emitida ainda</p>

// CTA
<button>🚀 Começar agora</button>
```

#### ✅ **CORRETO:**

```tsx
// Landing Page
<h1 className="flex items-center gap-4">
  <Mic className="text-zinc-400" size={48} strokeWidth={1.5} />
  Emita notas fiscais por voz
</h1>

// Dashboard
<div className="flex items-center gap-2">
  <TrendingUp size={20} strokeWidth={1.5} />
  <span>Estatísticas</span>
</div>

// Mensagem de sucesso
<div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
  <CheckCircle className="text-green-500" size={20} />
  <p className="text-green-500">Nota emitida com sucesso</p>
</div>

// Empty state
<div className="text-center py-12">
  <FileText className="mx-auto text-zinc-600 mb-4" size={48} strokeWidth={1.5} />
  <p className="text-zinc-400">Nenhuma nota emitida ainda</p>
</div>

// CTA
<button className="flex items-center gap-2">
  <Sparkles size={20} strokeWidth={1.5} />
  <span>Começar agora</span>
</button>
```

---

### Processo de Validação (Code Review)

#### Checklist Obrigatório Antes de Commit:

- [ ] Buscar no código por emojis: `grep -r "[\u{1F000}-\u{1F9FF}]" src/`
- [ ] Verificar visualmente todas as páginas
- [ ] Inspecionar mensagens de toast/notificação
- [ ] Revisar empty states
- [ ] Conferir meta tags e títulos

#### Ferramentas Automatizadas:

**ESLint Rule (criar em `.eslintrc.json`):**

```json
{
  "rules": {
    "no-emoji": "error"
  }
}
```

**Git Pre-commit Hook:**

```bash
#!/bin/bash
if git diff --cached | grep -E "[\u{1F000}-\u{1F9FF}]"; then
  echo "❌ ERRO: Emojis detectados! Removê-los antes de commitar."
  exit 1
fi
```

---

### Exceções (NENHUMA)

**Não há exceções a esta regra.**

Mesmo que:
- ❌ O emoji pareça "profissional"
- ❌ Seja "só um emoji pequeno"
- ❌ Esteja em um comentário de código
- ❌ Seja em documentação interna
- ❌ Esteja em ambiente de desenvolvimento

**Se está no repositório LUME IA, NÃO PODE TER EMOJI.**

---

### Penalidades por Violação

**Pull Requests com emojis serão:**
1. ❌ Automaticamente rejeitados pelo CI/CD
2. ❌ Devolvidos para refatoração imediata
3. ❌ Marcados como "não conforme com Design System"

**Código em produção com emojis:**
1. 🚨 Hotfix prioritário
2. 🚨 Post-mortem obrigatório
3. 🚨 Revisão de processo de QA

---

### Tabela de Substituições Rápidas

| ❌ Emoji | ✅ Ícone lucide-react | Código |
|---|---|---|
| 🎤 | `Mic` | `<Mic />` |
| ✅ | `CheckCircle` | `<CheckCircle />` |
| ❌ | `XCircle` | `<XCircle />` |
| ⚠️ | `AlertTriangle` | `<AlertTriangle />` |
| ℹ️ | `Info` | `<Info />` |
| 📊 | `TrendingUp` | `<TrendingUp />` |
| 📁 | `Folder` | `<Folder />` |
| 📄 | `FileText` | `<FileText />` |
| 🔒 | `Lock` | `<Lock />` |
| 👤 | `User` | `<User />` |
| ⚙️ | `Settings` | `<Settings />` |
| 🔍 | `Search` | `<Search />` |
| 📅 | `Calendar` | `<Calendar />` |
| ⏰ | `Clock` | `<Clock />` |
| 💰 | `DollarSign` | `<DollarSign />` |
| ✨ | `Sparkles` | `<Sparkles />` |
| 🚀 | `Rocket` | `<Rocket />` |
| ❤️ | `Heart` | `<Heart />` |
| ⭐ | `Star` | `<Star />` |
| 📱 | `Smartphone` | `<Smartphone />` |

---

**Aprovado por:** @pm, @ux-expert, @architect  
**Vigência:** Permanente e irrevogável  
**Revisão:** Nunca (regra imutável)

---

## 🎭 Paleta de Cores

### Cores Primárias (Dark Mode Premium)

```css
/* Backgrounds */
--bg-primary: #09090b      /* zinc-950 - Fundo principal */
--bg-secondary: #18181b    /* zinc-900 - Cards sólidos */
--bg-glass: rgba(24, 24, 27, 0.3)  /* Glass effect */

/* Borders */
--border-primary: #27272a  /* zinc-800 - Bordas principais */
--border-subtle: #3f3f46   /* zinc-700 - Hover states */

/* Text */
--text-primary: #fafafa    /* zinc-50 - Texto principal */
--text-secondary: #a1a1aa  /* zinc-400 - Texto secundário */
--text-muted: #71717a      /* zinc-500 - Texto terciário */

/* Accent - Navy Blue */
--accent-primary: #0A1628  /* Navy profundo */
--accent-hover: #1e3a5f    /* Navy hover */
--accent-glow: rgba(10, 22, 40, 0.5)  /* Glow effect */

/* Status Colors */
--success: #10b981         /* emerald-500 */
--error: #ef4444           /* red-500 */
--warning: #f59e0b         /* amber-500 */
```

### Aplicação de Cores

**Hierarquia Visual:**
1. **Fundo**: zinc-950 (escuro profundo)
2. **Cards/Containers**: Glass effect ou zinc-900
3. **Borders**: zinc-800 com opacity
4. **Texto**: zinc-50 (alto contraste)
5. **Acentos**: Navy blue para CTAs

---

## ✨ Glassmorphism (Efeito de Vidro)

**Princípio Central do Design:**

```css
.glass {
  background: rgba(24, 24, 27, 0.3);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(63, 63, 70, 0.5);
}

.glass-hover {
  background: rgba(24, 24, 27, 0.5);
  border-color: rgba(63, 63, 70, 0.7);
  transition: all 0.3s ease;
}
```

**Onde Usar:**
- Navbar fixa
- Cards de features
- Modais e overlays
- Componente VoiceRecorder
- Tooltips e dropdowns

---

## 📐 Bento Grid (Grids Assimétricos)

**Layout Moderno de Features:**

```
┌─────────────┬─────┐
│             │  2  │
│      1      ├─────┤
│             │  3  │
├──────┬──────┴─────┤
│  4   │      5     │
└──────┴────────────┘
```

**Implementação:**
- Grid responsivo: `grid-cols-1 md:grid-cols-3`
- Spans assimétricos: `col-span-2`, `row-span-2`
- Gap generoso: `gap-6` ou `gap-8`
- Cards com glass effect

**Referência Visual:**
Inspirado em: Linear.app, Vercel.com, Stripe.com

---

## 🎬 Motion Design (framer-motion)

### Instalação da Dependência

**OBRIGATÓRIO instalar antes de começar o desenvolvimento:**

```bash
npm install framer-motion
```

**Versão recomendada:**
```json
{
  "framer-motion": "^11.0.0"
}
```

**Por que framer-motion?**
- ✅ Animações fluidas com GPU acceleration
- ✅ API declarativa simples (não precisa gerenciar state de animação)
- ✅ Performance otimizada para React
- ✅ Bundle pequeno (~50kb gzipped)
- ✅ Suporte completo a gestos e drag
- ✅ Animações orquestradas (stagger, sequence)
- ✅ Layout animations automáticas

### Animações Padrão LUME IA

#### 1. Fade In Up (Entrada de Elementos)

**Quando usar:** Hero sections, cards, features

```tsx
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

<motion.div
  initial="initial"
  animate="animate"
  variants={fadeInUp}
>
  Conteúdo
</motion.div>
```

#### 2. Stagger Children (Lista de Items)

**Quando usar:** Grids de features, listas de notas fiscais, cards

```tsx
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

<motion.div
  variants={staggerContainer}
  initial="initial"
  animate="animate"
>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

#### 3. Hover Scale (Botões e Cards)

**Quando usar:** CTAs, cards interativos

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  Clique aqui
</motion.button>
```

#### 4. Glassmorphism Entrance (Cards Premium)

**Quando usar:** VoiceRecorder, modais, cards hero

```tsx
const glassEntrance = {
  initial: { 
    opacity: 0, 
    scale: 0.9,
    backdropFilter: "blur(0px)"
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    backdropFilter: "blur(20px)"
  },
  transition: { 
    duration: 0.6, 
    ease: "easeOut" 
  }
}

<motion.div
  className="glass"
  variants={glassEntrance}
  initial="initial"
  animate="animate"
>
  Conteúdo glass
</motion.div>
```

#### 5. Pulse Recording (Botão de Gravação)

**Quando usar:** VoiceRecorder ativo

```tsx
<motion.div
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5]
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="absolute inset-0 rounded-full bg-red-500"
/>
```

#### 6. Slide In (Navbar/Sidebar)

**Quando usar:** Menu mobile, sidebar

```tsx
const slideIn = {
  initial: { x: -300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
  transition: { type: "spring", stiffness: 300, damping: 30 }
}

<motion.nav
  variants={slideIn}
  initial="initial"
  animate="animate"
  exit="exit"
>
  Menu
</motion.nav>
```

---

### Configuração Global de Motion

**Criar arquivo: `src/lib/motion/variants.ts`**

```tsx
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
}
```

**Uso:**
```tsx
import { fadeInUp } from '@/lib/motion/variants'

<motion.div {...fadeInUp}>
  Conteúdo
</motion.div>
```

---

### Princípios de Animação

✅ **Performance First:**
- Animar apenas `opacity`, `scale`, `x`, `y` (GPU accelerated)
- Evitar animar `height`, `width`, `top`, `left` (cause reflow)

✅ **Timing:**
- Rápidas: 0.2s - 0.3s (hover, tap)
- Médias: 0.4s - 0.5s (entrada de elementos)
- Lentas: 0.6s - 0.8s (transições de página)

✅ **Easing:**
- `easeOut`: Para entradas (começa rápido, termina suave)
- `easeIn`: Para saídas (começa suave, termina rápido)
- `spring`: Para interações (natural e responsivo)

✅ **Sutileza:**
- Movimentos pequenos (10-30px)
- Scales sutis (1.02 - 1.05)
- Nunca exagerar

✅ **Acessibilidade:**
- Respeitar `prefers-reduced-motion`
- Sempre ter fallback sem animação

**Implementação de acessibilidade:**
```tsx
import { motion, useReducedMotion } from 'framer-motion'

function Component() {
  const shouldReduceMotion = useReducedMotion()
  
  const variants = shouldReduceMotion ? {} : fadeInUp
  
  return <motion.div {...variants}>Conteúdo</motion.div>
}
```

---

### Checklist de Animações

Antes de implementar qualquer animação:

- [ ] É necessária ou apenas decorativa?
- [ ] Usa propriedades GPU-accelerated?
- [ ] Duração < 0.8s?
- [ ] Funciona bem em mobile?
- [ ] Respeita `prefers-reduced-motion`?
- [ ] Tem fallback sem animação?
- [ ] Performance testada (60fps)?

---

## 🔤 Tipografia

### Fonte Principal: Inter

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})
```

### Hierarquia Tipográfica

```css
/* Hero Title */
.title-hero {
  font-size: 4rem;        /* text-6xl */
  font-weight: 700;       /* font-bold */
  letter-spacing: -0.05em; /* tracking-tight */
  line-height: 1.1;
}

/* Section Title */
.title-section {
  font-size: 2.25rem;     /* text-4xl */
  font-weight: 600;       /* font-semibold */
  letter-spacing: -0.025em;
}

/* Body Large */
.text-large {
  font-size: 1.25rem;     /* text-xl */
  line-height: 1.75;
  color: var(--text-secondary);
}

/* Body Regular */
.text-body {
  font-size: 1rem;        /* text-base */
  line-height: 1.5;
  color: var(--text-primary);
}
```

**Regras:**
- Títulos sempre `tracking-tight`
- Alto contraste (zinc-50 no zinc-950)
- Line-height generoso para legibilidade
- Font-weight: 400 (regular), 600 (semibold), 700 (bold)

---

## 🧩 Componentes UI

### Button (CTA Premium)

```tsx
<button className="
  px-8 py-4 
  bg-gradient-to-br from-[#0A1628] to-[#1e3a5f]
  text-zinc-50 font-semibold
  rounded-xl
  shadow-lg shadow-blue-500/25
  hover:shadow-xl hover:shadow-blue-500/40
  hover:scale-105
  transition-all duration-300
">
  Texto do Botão
</button>
```

### Card Glass

```tsx
<div className="
  glass
  rounded-2xl
  p-8
  hover:glass-hover
  transition-all duration-300
">
  Conteúdo
</div>
```

### Badge

```tsx
<span className="
  px-4 py-1.5
  text-xs font-medium
  bg-zinc-800/50
  text-zinc-300
  rounded-full
  border border-zinc-700
">
  Badge Text
</span>
```

---

## 📏 Espaçamento (Whitespace)

**Princípio: Generosidade Visual**

```css
/* Seções da página */
section {
  padding-top: 5rem;    /* py-20 */
  padding-bottom: 5rem;
}

/* Entre elementos */
.gap-elements {
  margin-bottom: 4rem;  /* mb-16 */
}

/* Cards internos */
.card-padding {
  padding: 2rem;        /* p-8 */
}

/* Container máximo */
.container {
  max-width: 1280px;    /* max-w-7xl */
  padding-left: 1rem;
  padding-right: 1rem;
}
```

**Regra de Ouro:**
- Mais espaço = mais luxo
- Nunca elementos grudados
- Respiração visual em mobile também

---

## 🎯 Ícones (lucide-react)

### Configuração Padrão

```tsx
import { IconName } from 'lucide-react'

<IconName 
  size={24} 
  strokeWidth={1.5}
  className="text-zinc-400"
/>
```

### Ícones Principais do Projeto

```tsx
import { 
  Mic,           // Voice recording
  Sparkles,      // Logo/IA
  Zap,           // Velocidade
  Shield,        // Segurança
  TrendingUp,    // Crescimento
  Clock,         // Tempo
  CheckCircle,   // Sucesso
  FileText,      // Documentos
} from 'lucide-react'
```

**Regras:**
- strokeWidth sempre 1.5 (traço fino)
- Tamanhos: 20px (pequeno), 24px (médio), 32px (grande)
- Cores: zinc-400 (padrão), accent em CTAs

---

## 📱 Responsividade

### Breakpoints Tailwind

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Mobile-First Approach

```tsx
<div className="
  flex flex-col    /* Mobile */
  md:flex-row      /* Desktop */
  gap-4            /* Mobile */
  md:gap-8         /* Desktop */
">
```

**Prioridades:**
1. Mobile primeiro (maioria dos médicos usa mobile)
2. Touch-friendly (botões ≥ 44px)
3. Tipografia escalável
4. Grids adaptáveis

---

## ✅ Checklist de Design

Antes de publicar qualquer tela:

- [ ] Zero emojis em toda a interface
- [ ] Glassmorphism aplicado nos cards principais
- [ ] Animações com framer-motion
- [ ] Copy focado em benefícios emocionais
- [ ] Ícones lucide-react (stroke 1.5)
- [ ] Fundo zinc-950 com alto contraste
- [ ] Espaçamento generoso (whitespace)
- [ ] Responsivo mobile-first
- [ ] Hover states suaves
- [ ] Loading states definidos

---

## 📚 Referências de Inspiração

**Design:**
- Linear.app (Bento grids, glassmorphism)
- Vercel.com (Tipografia, gradientes)
- Stripe.com (Profissionalismo)
- Apple.com (Minimalismo premium)

**Motion:**
- Framer.com (Transições fluidas)
- Pitch.com (Animações sutis)

---

---

## 🏗️ Validação Arquitetural (@architect)

### ✅ Aprovação Técnica

**Dependências Validadas:**

```json
{
  "framer-motion": "^11.0.0",     // ✅ Compatível Next.js 14
  "lucide-react": "^0.344.0",     // ✅ Já instalado
  "tailwindcss": "^3.4.0",        // ✅ Suporta backdrop-blur
  "next": "14.2.21",              // ✅ App Router estável
  "react": "^18.3.1"              // ✅ Compatible com framer-motion
}
```

**Performance:**
- ✅ framer-motion usa GPU acceleration (transform, opacity)
- ✅ Glassmorphism com backdrop-filter otimizado para Chromium
- ✅ Tree-shaking automático (apenas ícones usados do lucide-react)
- ✅ Lazy loading de animações em rotas internas

**Compatibilidade:**
- ✅ Safari 16+ (backdrop-filter)
- ✅ Chrome/Edge (todas features)
- ✅ Firefox 103+ (backdrop-filter)
- ✅ Mobile Safari/Chrome (performance testada)

**Decisões Técnicas:**
1. **framer-motion** escolhido sobre react-spring (bundle menor, API mais simples)
2. **Glassmorphism** limitado a 3 níveis de profundidade (performance)
3. **Animações** max 0.5s duration (UX responsiva)
4. **Ícones** SVG inline (não sprites) para flexibilidade

**Limitações Conhecidas:**
- backdrop-filter pode ter lag em dispositivos antigos (fallback: bg sólido)
- Animações desabilitadas se `prefers-reduced-motion` ativo

---

**Versão:** 2.0  
**Última atualização:** 2026-02-19  
**Aprovado por:** @pm, @ux-expert, @architect  
**Próxima revisão:** Após implementação completa
