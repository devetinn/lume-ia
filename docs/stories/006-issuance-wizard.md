# Story 006: Assistente de Emissão Passo a Passo

**Tipo:** Feature  
**Prioridade:** Alta  
**Sprint:** v2.0  
**Personas:** @pm (Visão) + @sm (Quality Gates)

---

## [@pm] VISÃO: Experiência High-Ticket

### Objetivo
Transformar a emissão em um **diálogo elegante** onde o médico se sente acompanhado por um assistente inteligente.

### Fluxo da Experiência

```
IDLE → RECORDING → PROCESSING → REVIEW → SUCCESS
```

#### **Estado 1: IDLE (Aguardando Gravação)**
**Mensagem:** "Descreva a consulta realizada"  
**Visual:** Botão de microfone grande, centralizado, com glassmorphism  
**Tom:** Convidativo, sem pressão

#### **Estado 2: RECORDING (Ouvindo)**
**Mensagem:** "Ouvindo atentamente..."  
**Visual:** Ondas sonoras animadas (4 barras pulsantes)  
**Feedback:** Visual minimalista, elegante  
**Ação:** Botão "Parar" discreto

#### **Estado 3: PROCESSING (Analisando)**
**Mensagem:** "Analisando sua descrição..."  
**Visual:** Barra de progresso indeterminada + spinner sutil  
**Duração:** 2-4 segundos (tempo de IA)  
**Tom:** Profissional, tecnológico

#### **Estado 4: REVIEW (Confirmação Inteligente)**
**Mensagem:** "Verifique os dados antes de emitir"  
**Visual:** Card translúcido com todos os dados  
**Smart Validation:** Campos faltantes destacados em amarelo  
**Ações:** "Editar Dados" ou "Confirmar Emissão"

#### **Estado 5: SUCCESS (Finalizado)**
**Mensagem:** "Nota fiscal emitida com sucesso"  
**Visual:** Ícone de sucesso + número da nota  
**Ação:** "Nova Emissão" ou "Ver Nota"

### Princípios de UX High-Ticket
1. **Feedback Constante:** Usuário sempre sabe o que está acontecendo
2. **Confiança:** Mostrar dados antes de emitir (zero surpresas)
3. **Elegância:** Transições suaves, sem jumps ou recarregamentos
4. **Simplicidade:** Um passo de cada vez, sem sobrecarga cognitiva

---

## [@sm] QUALITY GATES OBRIGATÓRIOS

### ✅ Gate 1: Atomic Design (Modularização)

**Estrutura de Componentes:**
```
src/components/wizard/
├── IssuanceWizard.tsx          (Orquestrador - max 80 linhas)
├── states/
│   ├── IdleState.tsx           (Botão microfone)
│   ├── RecordingState.tsx      (Ondas sonoras)
│   ├── ProcessingState.tsx     (Loading)
│   ├── ReviewState.tsx         (ReviewCard)
│   └── SuccessState.tsx        (Confirmação)
└── shared/
    ├── WizardContainer.tsx     (Layout glass)
    └── StateTransition.tsx     (framer-motion wrapper)
```

**page.tsx responsabilidade:**
- Apenas importar `<IssuanceWizard />`
- Gerenciar estado global (se necessário)
- Max 50 linhas

**Critério de Aceitação:**
- [ ] Nenhum arquivo com mais de 100 linhas
- [ ] Componentes reutilizáveis fora do wizard
- [ ] Separação clara de responsabilidades

---

### ✅ Gate 2: Engenharia Defensiva (Anti-Crash)

**Checklist Obrigatório:**

**Dados da API (Voice-to-Invoice):**
```typescript
// ✅ CORRETO
const customerName = response?.data?.customerName ?? '---'
const amount = response?.data?.amount ?? 0
const description = response?.data?.description ?? 'Sem descrição'

// ❌ ERRADO
const customerName = response.data.customerName
```

**Estados de Loading:**
- [ ] Loading state para cada transição
- [ ] Skeleton ou spinner em Processing
- [ ] Mensagens de erro amigáveis

**Validação de Dados:**
```typescript
// ReviewState deve verificar:
if (!data?.customerName) {
  // Exibir campo em amarelo + tooltip
}
```

**Critério de Aceitação:**
- [ ] Zero erros de `undefined` no console
- [ ] Todos os acessos a objetos usam `?.`
- [ ] Valores padrão com `??`
- [ ] Try/catch em chamadas de API

---

### ✅ Gate 3: UI/UX (Glassmorphism + Motion)

**Estética Human Academy:**

**Container Principal:**
```tsx
<div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-8">
```

**Cores:**
- Textos primários: `text-zinc-100`
- Textos secundários: `text-zinc-400`
- Accent (sucesso): `text-emerald-400`
- Accent (atenção): `text-amber-400`
- Accent (ação): `text-violet-400`

**Animações (framer-motion):**

**Transição entre Estados:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
```

**Ondas Sonoras (Recording):**
```tsx
<motion.div
  animate={{ scaleY: [1, 1.5, 1] }}
  transition={{ repeat: Infinity, duration: 0.8 }}
/>
```

**Critério de Aceitação:**
- [ ] ZERO emojis na interface
- [ ] Apenas ícones lucide-react
- [ ] Transições suaves entre estados
- [ ] Sem flash ou jumps visuais
- [ ] Glassmorphism em todos os cards

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Estrutura
- [ ] Criar pasta `src/components/wizard/`
- [ ] Criar `IssuanceWizard.tsx` (orquestrador)
- [ ] Criar 5 componentes de estado

### Fase 2: Estados Individuais
- [ ] IdleState: Botão microfone
- [ ] RecordingState: Ondas sonoras
- [ ] ProcessingState: Loading bar
- [ ] ReviewState: Integrar ReviewCard existente
- [ ] SuccessState: Feedback de sucesso

### Fase 3: Integrações
- [ ] Integrar com `/api/voice-to-invoice`
- [ ] Integrar com ReviewCard (Story 004)
- [ ] Adicionar validação de campos

### Fase 4: Quality Gates
- [ ] @qa validar modularização (Gate 1)
- [ ] @qa validar defensive coding (Gate 2)
- [ ] @qa validar UI/UX (Gate 3)

---

## 🎯 CRITÉRIOS DE ACEITAÇÃO FINAL

**Funcional:**
- [ ] Fluxo completo IDLE → SUCCESS funciona
- [ ] Dados são capturados e validados
- [ ] Erros são tratados graciosamente

**Técnico:**
- [ ] Build do Next.js sem erros
- [ ] Zero warnings de console
- [ ] Todos os Quality Gates aprovados

**Visual:**
- [ ] Estética Human Academy aplicada
- [ ] Transições suaves
- [ ] Responsivo mobile

**Usuário:**
- [ ] Médico consegue emitir nota em 30 segundos
- [ ] Interface intuitiva (zero treinamento)
- [ ] Feedback claro em cada etapa

---

## 🚫 RESTRIÇÕES

- **PROIBIDO:** Emojis na interface
- **PROIBIDO:** Componentes monolíticos (>100 linhas)
- **PROIBIDO:** Acessar propriedades sem `?.`
- **PROIBIDO:** Hardcoded colors (usar variáveis)
- **PROIBIDO:** Pular Quality Gates

---

## 📚 REFERÊNCIAS

- Manifesto: `.claude/CLAUDE.md`
- Design System: `docs/DESIGN_SYSTEM.md`
- Story 004: Smart Validation (ReviewCard)
- Story 005: Smart Memory (Pacientes)

---

**Aprovação necessária de:** @pm, @architect, @ux-expert, @qa  
**Estimativa:** 8-12 horas de desenvolvimento  
**Dependências:** Stories 004, 005
