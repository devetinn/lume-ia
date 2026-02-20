# Story 002: Global Refactor & Motion Design

**ID:** 002  
**Título:** Instalação do framer-motion e Refatoração Global para Padrão Human Academy  
**Tipo:** Technical Story (Refactoring)  
**Prioridade:** Alta  
**Estimativa:** 8 Story Points  
**Sprint:** Sprint 1  

**Criado por:** @sm (Scrum Master)  
**Aprovado por:** @pm, @architect  
**Data:** 2026-02-19

---

## 📋 Contexto de Negócio

### Problema Atual

O projeto foi inicializado com código genérico que **NÃO** segue o padrão estético definido para LUME IA. Especificamente:

1. ❌ **Emojis presentes** em várias partes do código (Landing Page, Dashboard)
2. ❌ **Sem framer-motion** instalado (animações estáticas)
3. ❌ **Cores genéricas** (não segue paleta Human Academy)
4. ❌ **Tipografia sem tracking-tight** (títulos sem impacto visual)
5. ❌ **Sem glassmorphism** nos componentes principais
6. ❌ **Layout global** não otimizado para dark mode premium

### Por Que Esta Refatoração É Crítica?

Conforme documentado no **DESIGN_SYSTEM.md**:

> "LUME IA segue o padrão estético 'Human Academy' - uma linguagem visual premium que transmite elite tecnológica através de fundos escuros profundos, efeitos de vidro translúcido, tipografia de alto impacto e layouts assimétricos."

**Se não aplicarmos o Human Academy AGORA:**
- Produto parecerá genérico e amador
- Médicos não perceberão como software premium
- Dívida técnica crescente (mais difícil refatorar depois)
- Identidade visual inconsistente

### Objetivo Emocional (do spec.md)

Para médicos: "Este é um software de elite, como os que hospitais top usam"  
Para investidores: "Produto premium digno de investimento"

---

## 🎯 Objetivos da Story

### Objetivos Principais

1. **Instalar framer-motion** e configurar motion variants globais
2. **Eliminar TODOS os emojis** do projeto (Landing Page, Dashboard, páginas internas)
3. **Aplicar paleta Human Academy** (zinc-950, glassmorphism, etc.)
4. **Refatorar layout global** (src/app/layout.tsx) para dark mode premium
5. **Atualizar globals.css** com glassmorphism utilities e scrollbar premium
6. **Criar arquivo de motion variants** reutilizáveis

### Objetivos Secundários

7. Adicionar meta tags SEO otimizadas (sem emojis)
8. Configurar fontes Inter com pesos corretos
9. Implementar navbar translúcida com backdrop-blur
10. Preparar base para Story 003 (Landing Page)

---

## 👤 Persona e User Story

**Persona:** Time de Desenvolvimento LUME IA

**Como** desenvolvedor do time LUME IA  
**Quero** ter uma base de código que siga 100% o padrão Human Academy  
**Para que** todas as features futuras herdem automaticamente a estética premium

---

## 📐 Requisitos Técnicos

### 1. Instalação de Dependências

#### framer-motion (OBRIGATÓRIO)

```bash
cd fiscal-saas
npm install framer-motion
```

**Versão:** `^11.0.0`

**Validação:**
```bash
npm list framer-motion
# Deve retornar: framer-motion@11.0.0 (ou superior)
```

---

### 2. Estrutura de Arquivos a Criar/Modificar

```
fiscal-saas/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # ✏️ MODIFICAR (dark mode, Inter font)
│   │   ├── globals.css                # ✏️ MODIFICAR (glass utilities, scrollbar)
│   │   └── page.tsx                   # ⚠️ NÃO TOCAR (será refatorado na Story 003)
│   │
│   ├── lib/
│   │   └── motion/
│   │       └── variants.ts            # ➕ CRIAR (motion variants globais)
│   │
│   └── components/
│       └── layout/
│           └── Navbar.tsx             # ✏️ MODIFICAR (remover emojis, glassmorphism)
│
└── tailwind.config.ts                 # ✅ JÁ CONFIGURADO (não modificar)
```

---

### 3. Especificação Detalhada por Arquivo

#### 📄 `src/lib/motion/variants.ts` (CRIAR)

**Objetivo:** Centralizar todos os motion variants reutilizáveis

**Referência:** DESIGN_SYSTEM.md > Motion Design > Configuração Global

```tsx
/**
 * Motion Variants Globais - LUME IA
 * Baseado no Design System Human Academy
 * 
 * Uso:
 * import { fadeInUp } from '@/lib/motion/variants'
 * <motion.div {...fadeInUp}>Conteúdo</motion.div>
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

export const staggerContainer = {
  initial: {},
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

export const glassEntrance = {
  initial: { 
    opacity: 0, 
    scale: 0.9,
  },
  animate: { 
    opacity: 1, 
    scale: 1,
  },
  transition: { 
    duration: 0.6, 
    ease: "easeOut" 
  }
}

export const slideInLeft = {
  initial: { x: -300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
  transition: { type: "spring", stiffness: 300, damping: 30 }
}

export const slideInRight = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 300, opacity: 0 },
  transition: { type: "spring", stiffness: 300, damping: 30 }
}
```

**Critérios de Aceitação:**
- [ ] Arquivo criado em `src/lib/motion/variants.ts`
- [ ] 8 variants exportados (fadeInUp, fadeInDown, stagger, scale, glass, slide)
- [ ] Todos seguem princípios do DESIGN_SYSTEM.md (duração < 0.8s, GPU-accelerated)
- [ ] TypeScript sem erros
- [ ] Comentários JSDoc explicativos

---

#### 📄 `src/app/globals.css` (MODIFICAR)

**Objetivo:** Aplicar dark mode premium, glassmorphism utilities, scrollbar customizada

**Referência:** DESIGN_SYSTEM.md > Fundos Escuros Profundos + Glassmorphism

**Código Completo:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-zinc-800;
  }
  
  body {
    @apply bg-zinc-950 text-zinc-50 antialiased;
    font-feature-settings: 'rlig' 1, 'calt' 1, 'ss01' 1;
  }
  
  html {
    scroll-behavior: smooth;
  }

  /* Scrollbar Premium (Dark Mode) */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-zinc-950;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-zinc-800 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-zinc-700;
  }

  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: theme('colors.zinc.800') theme('colors.zinc.950');
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  /* Glassmorphism Utilities */
  .glass {
    @apply bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 shadow-2xl;
  }

  .glass-hover {
    @apply hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300;
  }

  .glass-navbar {
    @apply bg-zinc-900/20 backdrop-blur-md border-b border-zinc-800/30;
  }

  .glass-card {
    @apply bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 backdrop-blur-2xl border border-zinc-800/50;
  }

  /* Typography Helpers */
  .title-hero {
    @apply text-7xl font-bold tracking-tighter leading-none text-zinc-50;
  }

  .title-section {
    @apply text-5xl font-semibold tracking-tight text-zinc-50;
  }

  .title-card {
    @apply text-2xl font-semibold tracking-tight text-zinc-50;
  }
}
```

**Critérios de Aceitação:**
- [ ] Dark mode aplicado (bg-zinc-950, text-zinc-50)
- [ ] 4 glass utilities criadas (glass, glass-hover, glass-navbar, glass-card)
- [ ] Scrollbar customizada (dark theme)
- [ ] 3 title helpers criados (hero, section, card)
- [ ] Sem erros no build do Tailwind

---

#### 📄 `src/app/layout.tsx` (MODIFICAR)

**Objetivo:** Aplicar Inter font, dark mode, meta tags SEO sem emojis

**Referência:** DESIGN_SYSTEM.md > Tipografia de Alto Impacto

**Código Completo:**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700']
})

export const metadata: Metadata = {
  title: 'LUME IA - Emissão Fiscal por Voz para Médicos',
  description: 'Emita notas fiscais por comando de voz em 10 segundos. Ganhe 15 horas por mês. Para clínicas e profissionais de saúde.',
  keywords: 'emissão fiscal, nota fiscal médico, voice-to-invoice, automação fiscal, saúde',
  authors: [{ name: 'LUME IA' }],
  openGraph: {
    title: 'LUME IA - Emissão Fiscal por Voz',
    description: 'Emita notas fiscais por comando de voz em 10 segundos',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUME IA - Emissão Fiscal por Voz',
    description: 'Ganhe 15 horas por mês com emissão fiscal automatizada',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

**Critérios de Aceitação:**
- [ ] Inter font configurada com pesos 400, 600, 700
- [ ] Meta tags SEO otimizadas (ZERO emojis)
- [ ] Open Graph tags configuradas
- [ ] Twitter cards configuradas
- [ ] html com lang="pt-BR" e className="dark"
- [ ] body com Inter className aplicada

---

#### 📄 `src/components/layout/Navbar.tsx` (MODIFICAR)

**Objetivo:** Remover emojis, aplicar glassmorphism, logo tipográfico LUME IA

**Referência:** DESIGN_SYSTEM.md > Glassmorphism + ZERO Emojis

**Código Completo:**

```tsx
'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles 
              className="text-zinc-400 group-hover:text-zinc-50 transition-colors" 
              size={24} 
              strokeWidth={1.5} 
            />
            <span className="text-xl font-bold tracking-tight text-zinc-50">
              LUME IA
            </span>
          </Link>

          {/* CTA */}
          <Link
            href="/dashboard"
            className="
              px-6 py-2.5
              bg-gradient-to-br from-[#0A1628] to-[#1e3a5f]
              text-zinc-50 font-semibold text-sm
              rounded-xl
              shadow-lg shadow-blue-500/25
              hover:shadow-xl hover:shadow-blue-500/40
              hover:scale-105
              transition-all duration-300
            "
          >
            Acessar Painel
          </Link>
        </div>
      </div>
    </nav>
  )
}
```

**Critérios de Aceitação:**
- [ ] ZERO emojis (usa ícone Sparkles do lucide-react)
- [ ] Glassmorphism aplicado (glass-navbar utility)
- [ ] Logo tipográfico "LUME IA" com tracking-tight
- [ ] CTA com gradiente Navy + shadow blue
- [ ] Hover states suaves (scale + shadow)
- [ ] Fixed positioning com z-50

---

### 4. Dashboard Refactor (Remover Emojis)

#### 📄 `src/app/(dashboard)/dashboard/page.tsx` (MODIFICAR)

**Objetivo:** Remover TODOS os emojis, aplicar ícones lucide-react

**Antes (ERRADO - com emojis):**
```tsx
<h1>📊 Dashboard</h1>
<p>🎤 Emitir Nota</p>
<p>✅ Nota emitida com sucesso!</p>
```

**Depois (CORRETO - sem emojis):**
```tsx
import { TrendingUp, Mic, CheckCircle } from 'lucide-react'

<div className="flex items-center gap-3">
  <TrendingUp className="text-zinc-400" size={32} strokeWidth={1.5} />
  <h1 className="title-section">Dashboard</h1>
</div>

<button className="flex items-center gap-2">
  <Mic size={20} strokeWidth={1.5} />
  <span>Emitir Nota</span>
</button>

<div className="flex items-center gap-3 p-4 glass rounded-xl">
  <CheckCircle className="text-green-500" size={20} />
  <p className="text-green-500">Nota emitida com sucesso</p>
</div>
```

**Ícones a usar (do lucide-react):**
- `Mic` - Gravação de voz
- `CheckCircle` - Sucesso
- `XCircle` - Erro
- `AlertTriangle` - Warning
- `TrendingUp` - Estatísticas
- `FileText` - Documentos
- `User` - Perfil
- `Settings` - Configurações

**Critérios de Aceitação:**
- [ ] ZERO emojis em toda a página
- [ ] Todos os ícones do lucide-react com strokeWidth={1.5}
- [ ] Mensagens de sucesso/erro com ícones + badges coloridos
- [ ] Títulos usando utilities (title-section, title-card)

---

## 🎨 Validação Visual

### Checklist de Design System

Após implementação, validar:

- [ ] **Fundos:** bg-zinc-950 em todo o body
- [ ] **Textos:** text-zinc-50 (primário), text-zinc-400 (secundário)
- [ ] **Glassmorphism:** Navbar translúcida com backdrop-blur visível
- [ ] **Tipografia:** Títulos com tracking-tight aplicado
- [ ] **Scrollbar:** Dark theme customizada
- [ ] **Ícones:** Apenas lucide-react, ZERO emojis
- [ ] **Animações:** framer-motion instalado e variants acessíveis

---

## ✅ Critérios de Aceitação (Definition of Done)

### Técnicos

1. **Dependências:**
   - [ ] framer-motion@^11.0.0 instalado
   - [ ] `npm list framer-motion` retorna versão correta

2. **Arquivos Criados:**
   - [ ] `src/lib/motion/variants.ts` existe e exporta 8 variants

3. **Arquivos Modificados:**
   - [ ] `src/app/globals.css` - dark mode + glass utilities
   - [ ] `src/app/layout.tsx` - Inter font + meta tags
   - [ ] `src/components/layout/Navbar.tsx` - glassmorphism + zero emojis
   - [ ] `src/app/(dashboard)/dashboard/page.tsx` - zero emojis

4. **Validação de ZERO Emojis:**
   - [ ] Executar: `grep -r "[\u{1F000}-\u{1F9FF}]" src/` retorna 0 resultados
   - [ ] Inspeção visual: Landing Page sem emojis
   - [ ] Inspeção visual: Dashboard sem emojis
   - [ ] Inspeção visual: Navbar sem emojis

5. **Build sem Erros:**
   - [ ] `npm run build` completa com sucesso
   - [ ] Zero erros TypeScript
   - [ ] Zero warnings de Tailwind CSS

### Funcionais

6. **Navbar:**
   - [ ] Fixa no topo com glassmorphism
   - [ ] Logo LUME IA visível com ícone Sparkles
   - [ ] Botão "Acessar Painel" com gradiente Navy
   - [ ] Hover states funcionando

7. **Layout Global:**
   - [ ] Fundo zinc-950 em toda aplicação
   - [ ] Scrollbar customizada visível
   - [ ] Fonte Inter aplicada em todo texto

8. **Motion Variants:**
   - [ ] Arquivo importável: `import { fadeInUp } from '@/lib/motion/variants'`
   - [ ] Sem erros ao usar variants em componentes

---

## 🧪 Testes

### Testes Manuais

**Teste 1: Validação de Emojis**
```bash
# No terminal
cd fiscal-saas
grep -r "🎤\|📊\|✅\|❌\|🚀\|⚡\|📱\|💰" src/

# Resultado esperado: 0 matches
```

**Teste 2: Build Production**
```bash
npm run build

# Deve completar sem erros
# Verificar output: "Compiled successfully"
```

**Teste 3: Glassmorphism Visual**
1. Rodar `npm run dev`
2. Abrir http://localhost:3000
3. Scroll down na página
4. **Validar:** Navbar deve ter efeito de blur no background

**Teste 4: Motion Variants**
```tsx
// Criar componente de teste
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion/variants'

<motion.div {...fadeInUp}>
  Teste
</motion.div>

// Deve animar corretamente (fade in + move up)
```

---

## 📚 Referências

### Documentos Obrigatórios

1. **spec.md**
   - Seção: "Tom de Voz e Copywriting"
   - PROIBIÇÃO: Emojis em qualquer parte do sistema

2. **DESIGN_SYSTEM.md**
   - Seção: "Os 4 Pilares do Human Academy"
   - Seção: "REGRA ABSOLUTA: ZERO EMOJIS"
   - Seção: "Motion Design (framer-motion)"
   - Seção: "Glassmorphism"

### Links Externos

- framer-motion docs: https://www.framer.com/motion/
- lucide-react icons: https://lucide.dev
- Tailwind backdrop-filter: https://tailwindcss.com/docs/backdrop-filter

---

## 🚧 Impedimentos e Riscos

### Riscos Conhecidos

1. **Risco:** framer-motion aumenta bundle size
   - **Mitigação:** Tree-shaking automático, apenas variants usados são incluídos

2. **Risco:** backdrop-filter não funciona em navegadores antigos
   - **Mitigação:** Tailwind aplica fallback automático (bg sólido)

3. **Risco:** Desenvolvedores podem acidentalmente adicionar emojis no futuro
   - **Mitigação:** Criar Git pre-commit hook (especificado no DESIGN_SYSTEM.md)

### Dependências

- **Bloqueia:** Story 003 (Landing Page precisa de motion variants prontos)
- **Bloqueado por:** Nenhuma (pode iniciar imediatamente)

---

## 📝 Notas para @dev

### Ordem de Implementação Recomendada

1. **Instalar framer-motion** (5 min)
2. **Criar motion/variants.ts** (15 min)
3. **Atualizar globals.css** (20 min)
4. **Modificar layout.tsx** (15 min)
5. **Refatorar Navbar.tsx** (30 min)
6. **Refatorar Dashboard** (45 min)
7. **Validação e testes** (30 min)

**Total estimado:** 3 horas

### Dicas Importantes

- ⚠️ **NÃO modificar** `src/app/page.tsx` (será refatorado na Story 003)
- ⚠️ **Use find & replace** para buscar emojis: Regex `[\u{1F000}-\u{1F9FF}]`
- ✅ **Sempre usar strokeWidth={1.5}** nos ícones lucide-react
- ✅ **Testar glassmorphism** em fundo com imagem/gradiente para ver blur

---

**Status:** Ready for Development  
**Assignee:** @dev  
**Labels:** refactoring, design-system, high-priority