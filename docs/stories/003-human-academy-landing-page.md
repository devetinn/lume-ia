# Story 003: Human Academy Landing Page

**ID:** 003  
**Título:** Recriação Completa da Landing Page com Padrão Human Academy  
**Tipo:** Feature  
**Prioridade:** Crítica  
**Estimativa:** 13 Story Points  
**Sprint:** Sprint 1  

**Criado por:** @sm (Scrum Master)  
**Aprovado por:** @pm, @ux-expert, @architect  
**Data:** 2026-02-19

---

## 📋 Contexto de Negócio

### O Problema

A Landing Page atual (`src/app/page.tsx`) é genérica e **NÃO transmite** o posicionamento premium de LUME IA.

**Problemas específicos:**
1. ❌ Copy técnico ("Sistema de emissão...") em vez de benefício emocional
2. ❌ Sem padrão Human Academy (glassmorphism, bento grid, tipografia impactante)
3. ❌ Emojis presentes
4. ❌ Sem animações fluidas (framer-motion)
5. ❌ Layout genérico que não diferencia do mercado

### Por Que Esta Landing Page É Crítica?

Conforme **spec.md**:

> "LUME IA comunica TRANSFORMAÇÃO, não funcionalidades."

**Benefícios Emocionais Prioritários:**
1. **Paz de Espírito** - "Nunca mais perca o sono com impostos"
2. **Ganho de Tempo** - "15 horas economizadas por mês"
3. **Faturamento 24/7** - "Seu consultório não para"
4. **Simplicidade** - "Tão fácil quanto WhatsApp"
5. **Profissionalismo** - "Tecnologia de hospital de elite"

### Objetivo Emocional

**Para médicos:** "Este é um software de elite, como os que hospitais top usam"

---

## 🎯 Objetivos da Story

1. Recriar **Hero Section** com copy emocional + VoiceRecorder em glass card
2. Implementar **Bento Grid** com 3 pilares (Voice, IA Tributária, Integração)
3. Aplicar **animações fluidas** com framer-motion (fade-in-up, stagger)
4. Usar **APENAS ícones lucide-react** (ZERO emojis)
5. Seguir 100% o **padrão Human Academy** (zinc-950, glassmorphism, tracking-tight)

---

## 👤 User Story

**Como** médico visitando o site pela primeira vez  
**Quero** entender em 10 segundos como LUME IA vai me ajudar  
**Para que** eu decida experimentar o produto

---

## 📐 Estrutura da Landing Page

### Seções (ordem vertical)

```
┌─────────────────────────────────────┐
│  1. NAVBAR (translúcida, fixa)      │
├─────────────────────────────────────┤
│  2. HERO SECTION (massiva)          │
│     - Badge "Voice-to-Invoice"      │
│     - Título emocional (72px)       │
│     - Subtítulo benefício           │
│     - VoiceRecorder (glass card)    │
│     - CTA primário                  │
├─────────────────────────────────────┤
│  3. FEATURES (Bento Grid 3 cards)   │
│     ┌───────────┬─────┐             │
│     │           │  2  │             │
│     │     1     ├─────┤             │
│     │  (Voice)  │  3  │             │
│     └───────────┴─────┘             │
├─────────────────────────────────────┤
│  4. FOOTER (simples)                │
└─────────────────────────────────────┘
```

---

## 🎨 Especificação Detalhada

### SEÇÃO 1: Hero Section

#### Copy (do spec.md)

**Badge:**
"Voice-to-Invoice Technology"

**Título (Transformação):**
"Emita notas fiscais por comando de voz enquanto atende seus pacientes"

**Subtítulo (Benefício mensurável):**
"Ganhe 15 horas por mês. Seu consultório funcionando 24/7."

**CTA Primário:**
"Ganhe 15 horas este mês"

**CTA Secundário:**
"Ver como funciona"

#### Design

- Background: `bg-zinc-950`
- Título: `text-7xl font-bold tracking-tighter` (72px)
- VoiceRecorder em glass card premium
- Animação: fadeInUp para título, glassEntrance para card

#### Código Hero Section

```tsx
'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { VoiceRecorder } from '@/components/voice/VoiceRecorder'
import { fadeInUp, glassEntrance } from '@/lib/motion/variants'

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/30 border border-zinc-700/50 rounded-full mb-8"
            >
              <Sparkles size={16} className="text-blue-400" strokeWidth={1.5} />
              <span className="text-sm text-zinc-300 font-medium">
                Voice-to-Invoice Technology
              </span>
            </motion.div>

            {/* Título */}
            <motion.h1
              {...fadeInUp}
              className="text-7xl font-bold tracking-tighter leading-none text-zinc-50 mb-6 max-w-5xl mx-auto"
            >
              Emita notas fiscais por comando de voz enquanto atende seus pacientes
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-12"
            >
              Ganhe 15 horas por mês. Seu consultório funcionando 24/7.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-4"
            >
              <button className="
                px-8 py-4
                bg-gradient-to-br from-[#0A1628] to-[#1e3a5f]
                text-zinc-50 font-semibold text-base
                rounded-xl
                shadow-lg shadow-blue-500/25
                hover:shadow-xl hover:shadow-blue-500/40
                hover:scale-105
                transition-all duration-300
              ">
                Ganhe 15 horas este mês
              </button>

              <button className="
                px-8 py-4
                bg-zinc-800/50
                text-zinc-50 font-semibold text-base
                rounded-xl
                border border-zinc-700/50
                hover:bg-zinc-800
                hover:border-zinc-600
                transition-all duration-300
              ">
                Ver como funciona
              </button>
            </motion.div>
          </div>

          {/* VoiceRecorder Card */}
          <motion.div
            {...glassEntrance}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="
              max-w-2xl mx-auto
              bg-gradient-to-br from-zinc-900/40 to-zinc-900/20
              backdrop-blur-2xl
              border border-zinc-800/50
              rounded-3xl
              p-12
              shadow-[0_8px_32px_rgba(0,0,0,0.4)]
            "
          >
            <VoiceRecorder />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
```

---

### SEÇÃO 2: Features (Bento Grid)

#### 3 Pilares Emocionais (do spec.md)

**Pilar 1: Emissão por Voz (Hero Card 2x2)**
- Ícone: `Mic` (lucide-react)
- Título: "Emissão por Voz"
- Copy: "Aperte, fale, pronto. Sua nota está emitida em 10 segundos."
- Inclui: VoiceRecorder interativo

**Pilar 2: Instantâneo (Small Card)**
- Ícone: `Zap` (amarelo)
- Título: "Instantâneo"
- Copy: "Menos de 10 segundos do áudio ao PDF"

**Pilar 3: Conformidade Fiscal (Small Card)**
- Ícone: `Shield` (azul)
- Título: "Conformidade Garantida"
- Copy: "Cálculo automático de impostos para área médica"

#### Código Features Section

```tsx
import { Mic, Zap, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion/variants'

{/* Features Section */}
<section className="py-20 px-4">
  <div className="max-w-7xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-5xl font-bold tracking-tight text-zinc-50 mb-16 text-center"
    >
      Por que médicos escolhem LUME IA
    </motion.h2>

    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Hero Card - Emissão por Voz */}
      <motion.div
        variants={staggerItem}
        className="
          md:col-span-2 md:row-span-2
          bg-gradient-to-br from-zinc-900/40 to-zinc-900/20
          backdrop-blur-xl
          border border-zinc-800/50
          rounded-3xl p-12
          flex flex-col items-center justify-center
          text-center
        "
      >
        <Mic className="w-16 h-16 text-zinc-400 mb-6" strokeWidth={1.5} />
        <h3 className="text-3xl font-semibold tracking-tight text-zinc-50 mb-4">
          Emissão por Voz
        </h3>
        <p className="text-zinc-400 text-lg mb-8 max-w-md">
          Aperte, fale, pronto. Sua nota está emitida em 10 segundos.
        </p>
        <VoiceRecorder />
      </motion.div>

      {/* Small Card 1 - Instantâneo */}
      <motion.div
        variants={staggerItem}
        className="
          bg-zinc-900/30
          backdrop-blur-xl
          border border-zinc-800/50
          rounded-2xl p-6
          hover:bg-zinc-900/50
          hover:border-zinc-700/50
          transition-all duration-300
        "
      >
        <Zap className="w-8 h-8 text-yellow-500 mb-4" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold tracking-tight text-zinc-50 mb-2">
          Instantâneo
        </h3>
        <p className="text-zinc-400 text-sm">
          Menos de 10 segundos do áudio ao PDF
        </p>
      </motion.div>

      {/* Small Card 2 - Conformidade */}
      <motion.div
        variants={staggerItem}
        className="
          bg-zinc-900/30
          backdrop-blur-xl
          border border-zinc-800/50
          rounded-2xl p-6
          hover:bg-zinc-900/50
          hover:border-zinc-700/50
          transition-all duration-300
        "
      >
        <Shield className="w-8 h-8 text-blue-500 mb-4" strokeWidth={1.5} />
        <h3 className="text-xl font-semibold tracking-tight text-zinc-50 mb-2">
          Conformidade Garantida
        </h3>
        <p className="text-zinc-400 text-sm">
          Cálculo automático de impostos para área médica
        </p>
      </motion.div>
    </motion.div>
  </div>
</section>
```

---

## ✅ Critérios de Aceitação

### Copy (spec.md)

- [ ] Título comunica TRANSFORMAÇÃO (não funcionalidade)
- [ ] Subtítulo tem benefício MENSURÁVEL ("15 horas")
- [ ] Features focam em EMOÇÃO (paz, tempo, simplicidade)
- [ ] CTA tem PROMESSA DE VALOR ("Ganhe 15 horas")
- [ ] ZERO jargões técnicos (API, LLM, etc.)

### Design (DESIGN_SYSTEM.md)

- [ ] Background zinc-950 em toda página
- [ ] Título com `tracking-tighter` e `text-7xl`
- [ ] Glassmorphism aplicado (backdrop-blur-xl, border-zinc-800/50)
- [ ] Bento Grid assimétrico (2x2 hero + 2 small)
- [ ] ZERO emojis (apenas ícones lucide-react com strokeWidth 1.5)

### Animações (framer-motion)

- [ ] Hero: fadeInUp para título
- [ ] VoiceRecorder: glassEntrance
- [ ] Features: staggerContainer + staggerItem
- [ ] Todos < 0.8s duration
- [ ] Respeita prefers-reduced-motion

### Responsividade

- [ ] Mobile: grid-cols-1 (cards empilhados)
- [ ] Desktop: grid-cols-3 (bento grid)
- [ ] Título legível em mobile (ajustar para text-5xl em sm)
- [ ] VoiceRecorder funcional em touch

---

## 🧪 Testes

**Teste 1: Teste do Elevador (spec.md)**
- Mostrar página para alguém por 10 segundos
- Pergunta: "O que este produto faz?"
- ✅ Resposta esperada: "Emite nota fiscal por voz"

**Teste 2: Teste da Avó (spec.md)**
- Mostrar para pessoa não-técnica
- ✅ Deve entender o benefício sem confusão

**Teste 3: Glassmorphism Visual**
- Navbar deve ter blur visível
- VoiceRecorder card deve ter efeito de vidro

**Teste 4: ZERO Emojis**
```bash
grep -r "[\u{1F000}-\u{1F9FF}]" src/app/page.tsx
# Esperado: 0 matches
```

---

## 📚 Referências

**spec.md:**
- Tom de Voz e Copywriting
- Benefícios Emocionais Prioritários
- Exemplos de Copy (Antes vs Depois)

**DESIGN_SYSTEM.md:**
- Os 4 Pilares do Human Academy
- Bento Grids
- Motion Design
- REGRA ABSOLUTA: ZERO EMOJIS

---

**Status:** Ready for Development  
**Depends on:** Story 002 (motion variants devem estar criados)  
**Assignee:** @dev