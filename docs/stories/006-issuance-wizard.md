# Story 006: Assistente de Emissão Passo a Passo

**Versão:** 2.0  
**Status:** Documentação Aprovada  
**Prioridade:** Alta  
**Estimativa:** 8-12 horas

---

## [@pm] VISÃO: Experiência High-Ticket

### Filosofia do Produto

O Assistente de Emissão não é apenas uma ferramenta técnica - é um **diálogo elegante** entre o médico e o sistema. Cada estado deve transmitir confiança, clareza e sofisticação.

**Público-Alvo:**
- Médicos de elite (consultórios particulares)
- Profissionais ocupados que valorizam tempo
- Usuários que esperam experiências premium

**Objetivo Emocional:**
- Transmitir paz de espírito
- Eliminar fricção burocrática
- Criar um momento de "magia tecnológica"

---

### Jornada do Usuário (User Journey)

#### **Estado 1: IDLE (Aguardando Gravação)**

**Contexto Emocional:**
- Médico acabou de atender um paciente
- Precisa documentar rapidamente
- Busca simplicidade absoluta

**UX:**
- Card central translúcido (glassmorphism)
- Botão de microfone grande e convidativo (120x120px)
- Copy persuasivo: "Descreva a consulta. Nós cuidamos do resto."
- Ícone: Mic (lucide-react, violet-400)

**Interação:**
- Hover: Scale 1.05 + glow sutil
- Click: Transição suave para RECORDING

---

#### **Estado 2: RECORDING (Ouvindo)**

**Contexto Emocional:**
- Sistema está atento
- Médico sente que está sendo "ouvido"
- Feedback visual constante

**UX:**
- Botão vermelho pulsante (Recording)
- 4 barras de áudio animadas (onda sonora minimalista)
- Tempo de gravação (00:05)
- Botão "Parar" prominent

**Interação:**
- Animação: Ondas pulsam conforme médico fala
- Limite: 2 minutos (aviso aos 1:45)
- Click em "Parar": Transição para PROCESSING

---

#### **Estado 3: PROCESSING (Analisando)**

**Contexto Emocional:**
- Médico aguarda ansioso
- Necessidade de feedback que "algo está acontecendo"
- Confiança de que a IA está trabalhando

**UX:**
- Spinner elegante (estilo Apple/Stripe)
- Barra de progresso indeterminada
- Mensagem rotativa:
  - "Transcrevendo áudio..."
  - "Extraindo informações..."
  - "Calculando impostos..."
- Tempo estimado: 5-8 segundos

**Interação:**
- Sem interação do usuário
- Animação contínua
- Auto-transição para REVIEW

---

#### **Estado 4: REVIEW (Confirmação Inteligente)**

**Contexto Emocional:**
- **Momento crítico:** Médico valida antes de emitir
- Necessidade de confiança nos dados
- Possibilidade de correção sem refazer

**UX:**
- ReviewCard (Story 004) em destaque
- Dados extraídos formatados:
  - Nome do paciente
  - CPF/CNPJ
  - Valor bruto
  - Valor líquido (impostos deduzidos)
  - Descrição do serviço
- Indicadores visuais:
  - ✓ Campos preenchidos (verde)
  - ⚠ Campos incompletos (amarelo)

**Interação:**
- Botão "Editar" (ghost, secondary)
- Botão "Confirmar Emissão" (primary, violet)
- Click em "Confirmar": Transição para SUCCESS

---

#### **Estado 5: SUCCESS (Finalizado)**

**Contexto Emocional:**
- Alívio e satisfação
- Tarefa concluída com sucesso
- Pronto para próxima emissão

**UX:**
- Ícone CheckCircle (verde, 64px)
- Mensagem: "Nota fiscal emitida com sucesso!"
- Resumo:
  - Número da nota
  - Valor
  - Cliente
- Botão "Nova Emissão" (retorna para IDLE)
- Botão "Ver Nota" (abre PDF)

**Interação:**
- Auto-reset após 30s (opcional)
- Animação de fadeOut suave

---

## [@sm] QUALITY GATES OBRIGATÓRIOS

### ✅ Gate 1: Atomic Design (Modularização)

**Estrutura de Componentes (src/components/wizard/):**

```
wizard/
├── IssuanceWizard.tsx         (Orquestrador - max 80 linhas)
├── states/
│   ├── IdleState.tsx          (Estado inicial - max 60 linhas)
│   ├── RecordingState.tsx     (Gravação - max 70 linhas)
│   ├── ProcessingState.tsx    (Loading - max 50 linhas)
│   ├── ReviewState.tsx        (Confirmação - max 80 linhas)
│   └── SuccessState.tsx       (Sucesso - max 60 linhas)
├── atoms/
│   ├── MicButton.tsx          (Botão de microfone - max 40 linhas)
│   ├── AudioWave.tsx          (Ondas sonoras - max 50 linhas)
│   └── ProgressBar.tsx        (Barra de progresso - max 40 linhas)
└── types.ts                    (TypeScript interfaces)
```

**Orquestração (page.tsx):**
```tsx
// MÁXIMO 100 linhas
// Apenas gerencia estado e renderiza componente correto
export default function EmissaoPage() {
  const [wizardState, setWizardState] = useState<WizardState>('idle')
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  
  return <IssuanceWizard state={wizardState} data={invoiceData} />
}
```

**Critérios de Aprovação:**
- ✅ Nenhum arquivo > 100 linhas
- ✅ Responsabilidade única por componente
- ✅ Reutilização de átomos (MicButton, ProgressBar)
- ✅ TypeScript interfaces exportadas

---

### ✅ Gate 2: Engenharia Defensiva (Anti-Crash)

**Blindagem Obrigatória:**

```tsx
// ❌ PROIBIDO
const name = data.customer.name
const amount = invoice.amount

// ✅ CORRETO
const name = data?.customer?.name ?? 'Cliente não informado'
const amount = invoice?.amount ?? 0
```

**Estados de Loading:**

```tsx
// Todos os estados devem ter loading states
if (isLoading) {
  return <Skeleton className="h-32 w-full" />
}

if (error) {
  return <ErrorMessage message={error?.message ?? 'Erro desconhecido'} />
}
```

**Validação de Dados:**

```tsx
// Antes de renderizar ReviewCard
const isDataValid = invoiceData?.customerName && 
                    invoiceData?.amount > 0 &&
                    invoiceData?.cpf

if (!isDataValid) {
  return <WarningState message="Dados incompletos" />
}
```

**Critérios de Aprovação:**
- ✅ 100% dos acessos a props usam `?.`
- ✅ 100% dos valores padrão usam `??`
- ✅ Loading states em todas as async operations
- ✅ Error boundaries implementados
- ✅ Validação antes de transição de estado

---

### ✅ Gate 3: UI/UX (Estética Human Academy)

**Glassmorphism Obrigatório:**

```tsx
// Container principal do Wizard
className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-12"

// Cards internos
className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/50"
```

**Tipografia:**

```tsx
// Títulos
className="text-4xl font-bold text-zinc-100 tracking-tight"

// Subtítulos
className="text-lg text-zinc-400"

// Labels
className="text-sm text-zinc-500"
```

**Animações (framer-motion):**

```tsx
// Transição entre estados
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
```

**Ícones (lucide-react APENAS):**

```tsx
import { Mic, Square, CheckCircle, AlertCircle } from 'lucide-react'

// Uso
<Mic className="w-8 h-8 text-violet-400" strokeWidth={1.5} />
```

**Critérios de Aprovação:**
- ✅ ZERO emojis no código e UI
- ✅ Apenas lucide-react para ícones
- ✅ Glassmorphism em todos os cards
- ✅ framer-motion em transições
- ✅ Accent colors: violet-400, blue-400, cyan-400
- ✅ Sem recarregamento de página
- ✅ Animações suaves (0.3s - 0.5s)

---

## 📋 Checklist de Implementação

### **Preparação:**
- [ ] Criar pasta `src/components/wizard/`
- [ ] Criar subpastas `states/` e `atoms/`
- [ ] Criar `types.ts` com interfaces TypeScript

### **Átomos (1-2h):**
- [ ] MicButton.tsx (botão de microfone)
- [ ] AudioWave.tsx (ondas sonoras)
- [ ] ProgressBar.tsx (barra de progresso)

### **Estados (4-6h):**
- [ ] IdleState.tsx
- [ ] RecordingState.tsx
- [ ] ProcessingState.tsx
- [ ] ReviewState.tsx (integrar Story 004)
- [ ] SuccessState.tsx

### **Orquestração (1-2h):**
- [ ] IssuanceWizard.tsx (máquina de estados)
- [ ] Atualizar `emissao/page.tsx`

### **Quality Gates (2-3h):**
- [ ] Gate 1: Validar modularização
- [ ] Gate 2: Adicionar defensive coding
- [ ] Gate 3: Aplicar glassmorphism + animações

### **Testes (@qa):**
- [ ] Testar todos os 5 estados
- [ ] Validar transições suaves
- [ ] Verificar contraste de cores
- [ ] Testar com dados incompletos
- [ ] Validar loading states

---

## 🎯 Critérios de Aceitação (@qa)

### **Funcional:**
1. ✅ Todos os 5 estados renderizam corretamente
2. ✅ Transições suaves entre estados (sem flicker)
3. ✅ Gravação de áudio funcional
4. ✅ ReviewCard integrado no estado REVIEW
5. ✅ Success state exibe dados corretos

### **Técnico:**
6. ✅ Nenhum arquivo > 100 linhas
7. ✅ 100% dos acessos usam `?.` e `??`
8. ✅ Build sem erros TypeScript
9. ✅ Lighthouse Performance > 90

### **Visual:**
10. ✅ ZERO emojis
11. ✅ Glassmorphism aplicado
12. ✅ Animações suaves (framer-motion)
13. ✅ Contraste WCAG AA aprovado
14. ✅ Ícones lucide-react (strokeWidth 1.5)

---

## 📚 Dependências

- Story 004: Smart Validation UI (ReviewCard.tsx)
- Story 005: Smart Memory Database (autocomplete de pacientes)
- CLAUDE.md: Manifesto de desenvolvimento
- DESIGN_SYSTEM.md: Padrão Human Academy

---

## 🚀 Estimativa

**Total:** 8-12 horas

**Breakdown:**
- Átomos: 1-2h
- Estados: 4-6h
- Orquestração: 1-2h
- Quality Gates: 2-3h
- Testes: 1h

---

## ⚠️ Riscos e Mitigações

**Risco 1:** Componentes muito grandes  
**Mitigação:** Review a cada 50 linhas, fatie se necessário

**Risco 2:** Dados undefined causando crashes  
**Mitigação:** Gate 2 obrigatório, code review rigoroso

**Risco 3:** Animações travando  
**Mitigação:** Usar `will-change`, testar em mobile

**Risco 4:** Emojis acidentais  
**Mitigação:** Lint rule customizada, code review

---

**[@pm + @sm]** Aprovado para desenvolvimento ✅

