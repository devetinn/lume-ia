# Story 007: Voice AI Integration - Motor de Inteligência Artificial

**Versão:** 1.0  
**Status:** Planejamento  
**Prioridade:** Crítica  
**Estimativa:** 12-16 horas

---

## [@pm] VISÃO: Fluxo de Valor Voice-to-Invoice

### Filosofia do Produto

O Motor de IA é o **coração tecnológico** do LUME IA. Ele transforma um áudio informal ("Consulta do João Silva, 300 reais") em dados estruturados prontos para emissão fiscal. Esta é a verdadeira "magia" do produto.

**Promessa ao Usuário:**
- Fale naturalmente, como se estivesse conversando
- O sistema entende contexto médico
- Dados extraídos com precisão cirúrgica
- Feedback imediato se algo não for compreendido

---

### Jornada do Dado (Data Journey)

#### **Input: Áudio do Médico**

**Exemplos de Fala Natural:**
```
✅ "Consulta do João Silva, CPF 123.456.789-00, trezentos reais"
✅ "Atendimento da Maria Santos, 350"
✅ "João, sessão de terapia, 400 reais"
✅ "Paciente Pedro Costa, duzentos e cinquenta"
```

**Características:**
- Linguagem coloquial
- Ordem flexível (nome pode vir antes ou depois do valor)
- Valores por extenso ou em número
- CPF opcional (será buscado no Smart Memory se ausente)

---

#### **Processamento: 2 Etapas de IA**

**Etapa 1: Transcrição (Speech-to-Text)**
- **Tecnologia:** OpenAI Whisper
- **Modelo:** `whisper-1`
- **Entrada:** Blob de áudio (WebM, MP3, WAV)
- **Saída:** Texto transcrito

**Exemplo:**
```
Áudio → "Consulta do João Silva, trezentos reais"
```

**Etapa 2: Extração de Entidades (NLP)**
- **Tecnologia:** OpenAI GPT-4o-mini
- **Entrada:** Texto transcrito
- **Saída:** JSON estruturado

**Exemplo:**
```json
{
  "customerName": "João Silva",
  "amount": 300.00,
  "description": "Consulta médica",
  "confidence": 0.95
}
```

---

#### **Output: Dados Estruturados**

**Interface TypeScript:**
```typescript
interface ExtractedInvoiceData {
  customerName: string
  cpf?: string
  amount: number
  description: string
  confidence: number
  transcription: string
}
```

**Validações Automáticas:**
- ✅ `customerName` não pode estar vazio
- ✅ `amount` deve ser > 0
- ✅ `confidence` deve ser >= 0.7 (70%)
- ✅ Se confidence < 0.7 → pedir repetição

---

### Cenários de Uso

#### **Cenário 1: Sucesso Total** ✅
```
Médico fala: "João Silva, 300 reais"
→ Transcrição: "João Silva, 300 reais"
→ Extração: { customerName: "João Silva", amount: 300, confidence: 0.98 }
→ Estado: REVIEW (dados completos)
```

#### **Cenário 2: Áudio Incompleto** ⚠️
```
Médico fala: "João Silva" (esqueceu o valor)
→ Transcrição: "João Silva"
→ Extração: { customerName: "João Silva", amount: null, confidence: 0.85 }
→ Estado: REVIEW com aviso "Valor não identificado. Por favor, informe."
```

#### **Cenário 3: Áudio Inaudível** ❌
```
Médico fala: [ruído incompreensível]
→ Transcrição: ""
→ Extração: { confidence: 0.2 }
→ Estado: ERROR com mensagem "Não consegui entender o áudio. Tente novamente."
```

#### **Cenário 4: Smart Memory** 🧠
```
Médico fala: "João Silva, 300"
→ Sistema busca no banco: João Silva já existe com CPF 123.456.789-00
→ Auto-completar CPF
→ Estado: REVIEW com dados completos
```

---

## [@architect] ARQUITETURA TÉCNICA

### Stack Tecnológica Definida

#### **1. Transcrição de Áudio**

**Provedor:** OpenAI Whisper API  
**Endpoint:** `https://api.openai.com/v1/audio/transcriptions`  
**Modelo:** `whisper-1`

**Por que Whisper?**
- ✅ Suporta português brasileiro
- ✅ Lida bem com sotaques e ruídos
- ✅ API estável e documentada
- ✅ Custo: $0.006 por minuto (~R$ 0.03/min)

**Formato de Entrada:**
- WebM (navegador)
- MP3, WAV (fallback)
- Tamanho máximo: 25MB
- Duração máxima: 2 minutos

---

#### **2. Extração de Entidades**

**Provedor:** OpenAI GPT-4o-mini  
**Endpoint:** `https://api.openai.com/v1/chat/completions`  
**Modelo:** `gpt-4o-mini`

**Por que GPT-4o-mini?**
- ✅ Custo-benefício ideal (60x mais barato que GPT-4)
- ✅ Velocidade (responde em ~1s)
- ✅ Suporta JSON mode (output estruturado)
- ✅ Contextualiza bem o domínio médico

**Custo:** $0.150 por 1M tokens de input (~R$ 0.75)

---

#### **3. Arquitetura da API Route**

**Arquivo:** `src/app/api/extract-invoice/route.ts`

**Fluxo:**
```
1. Receber áudio (FormData)
2. Validar formato e tamanho
3. Transcrever com Whisper
4. Extrair entidades com GPT
5. Validar dados extraídos
6. Retornar JSON estruturado
```

**Estrutura:**
```typescript
POST /api/extract-invoice

Request:
- Content-Type: multipart/form-data
- Body: { audio: File }

Response (Success):
{
  "success": true,
  "data": {
    "customerName": "João Silva",
    "cpf": "123.456.789-00",
    "amount": 300.00,
    "description": "Consulta médica",
    "confidence": 0.95,
    "transcription": "João Silva, 300 reais"
  }
}

Response (Error):
{
  "success": false,
  "error": {
    "code": "INAUDIBLE_AUDIO",
    "message": "Não consegui entender o áudio. Por favor, tente novamente.",
    "confidence": 0.2
  }
}
```

---

### Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                   RecordingState.tsx                    │
│                 (Frontend - Wizard)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ audioBlob (WebM)
                     ▼
┌─────────────────────────────────────────────────────────┐
│          POST /api/extract-invoice                      │
│              (API Route - Next.js)                      │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐    ┌──────────────────┐
│  Whisper API     │    │   GPT-4o-mini    │
│  (Transcrição)   │───▶│   (Extração)     │
└──────────────────┘    └──────────────────┘
        │                         │
        │ "João Silva, 300"       │ JSON
        └────────────┬────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│               Validação + Formatação                    │
│          (Defensive Coding + TypeScript)                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  ReviewState.tsx                        │
│            (Dados prontos para revisão)                 │
└─────────────────────────────────────────────────────────┘
```

---

### Segurança e Conformidade

**Variáveis de Ambiente:**
```env
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org-...
```

**Rate Limiting:**
- Máximo 10 requests por minuto por usuário
- Timeout de 30 segundos por request

**Privacidade:**
- Áudios não são armazenados
- Transcrições podem ser salvas para auditoria (opcional)
- LGPD compliance: dados processados apenas para emissão

---

## [@sm] QUALITY GATES OBRIGATÓRIOS

### ✅ Gate 1: TypeScript Estritamente Tipado

**Interfaces Obrigatórias:**

```typescript
// src/types/voice-ai.ts

export interface AudioTranscriptionRequest {
  audio: Blob
  language?: string
}

export interface AudioTranscriptionResponse {
  text: string
  duration: number
  language: string
}

export interface EntityExtractionRequest {
  transcription: string
  context?: string
}

export interface EntityExtractionResponse {
  customerName: string
  cpf?: string
  amount: number
  description: string
  confidence: number
  rawData?: Record<string, unknown>
}

export interface ExtractInvoiceRequest {
  audio: File | Blob
}

export interface ExtractInvoiceResponse {
  success: boolean
  data?: EntityExtractionResponse & {
    transcription: string
  }
  error?: {
    code: ErrorCode
    message: string
    confidence?: number
  }
}

export type ErrorCode = 
  | 'INAUDIBLE_AUDIO'
  | 'INCOMPLETE_DATA'
  | 'INVALID_FORMAT'
  | 'RATE_LIMIT'
  | 'API_ERROR'
```

**Critérios:**
- ✅ Todas as API responses tipadas
- ✅ Enums para error codes
- ✅ Opcionais (?) usados corretamente
- ✅ Sem uso de `any`

---

### ✅ Gate 2: Tratamento de Erros Elegante

**Mensagens ao Usuário (Tom Empático):**

```typescript
const ERROR_MESSAGES = {
  INAUDIBLE_AUDIO: {
    title: 'Não consegui entender',
    message: 'O áudio está um pouco confuso. Poderia repetir, por favor?',
    action: 'Tentar Novamente',
  },
  INCOMPLETE_DATA: {
    title: 'Faltam alguns dados',
    message: 'Identifiquei o paciente, mas não ouvi o valor. Pode completar?',
    action: 'Gravar Novamente',
  },
  INVALID_FORMAT: {
    title: 'Formato não suportado',
    message: 'Este formato de áudio não é compatível. Tente gravar novamente.',
    action: 'Ok',
  },
  RATE_LIMIT: {
    title: 'Muitas tentativas',
    message: 'Aguarde alguns segundos antes de tentar novamente.',
    action: 'Aguardar',
  },
  API_ERROR: {
    title: 'Erro temporário',
    message: 'Estamos com dificuldades técnicas. Tente novamente em instantes.',
    action: 'Tentar Novamente',
  },
}
```

**UI de Erro (Estado ERROR no Wizard):**
```tsx
<ErrorState
  icon={<AlertCircle className="w-16 h-16 text-yellow-400" />}
  title={error.title}
  message={error.message}
  actionLabel={error.action}
  onAction={() => setState('idle')}
/>
```

**Critérios:**
- ✅ Todos os erros têm mensagens amigáveis
- ✅ Sem jargões técnicos para o usuário
- ✅ Ações claras (tentar novamente, editar, cancelar)
- ✅ Logs técnicos apenas no console/server

---

### ✅ Gate 3: Confidence Score Validation

**Regras de Confiança:**

```typescript
// Muito confiante → Prosseguir
if (confidence >= 0.85) {
  return { status: 'REVIEW', data }
}

// Médio → Aviso
if (confidence >= 0.70) {
  return { 
    status: 'REVIEW', 
    data,
    warning: 'Verifique se os dados estão corretos'
  }
}

// Baixo → Pedir repetição
if (confidence < 0.70) {
  return {
    status: 'ERROR',
    error: 'INAUDIBLE_AUDIO'
  }
}
```

**Critérios:**
- ✅ Sempre retornar confidence score
- ✅ Validação antes de ir para REVIEW
- ✅ Avisos visuais se confidence < 0.85

---

## 📋 Checklist de Implementação

### **Preparação (1-2h):**
- [ ] Criar `src/types/voice-ai.ts`
- [ ] Configurar variáveis de ambiente (OPENAI_API_KEY)
- [ ] Instalar `openai` SDK (`npm install openai`)

### **API Route (4-6h):**
- [ ] Criar `src/app/api/extract-invoice/route.ts`
- [ ] Implementar upload de áudio (FormData)
- [ ] Integrar Whisper (transcrição)
- [ ] Integrar GPT-4o-mini (extração)
- [ ] Validação de dados extraídos
- [ ] Tratamento de erros

### **Integração Frontend (3-4h):**
- [ ] Atualizar `RecordingState.tsx` para enviar áudio
- [ ] Criar `ErrorState.tsx` para exibir erros
- [ ] Atualizar `IssuanceWizard.tsx` com lógica de erro
- [ ] Loading state durante processamento

### **Testes (@qa) (2-3h):**
- [ ] Testar com áudios claros
- [ ] Testar com áudios confusos
- [ ] Testar com dados incompletos
- [ ] Validar mensagens de erro
- [ ] Verificar confidence scores

---

## 🎯 Critérios de Aceitação (@qa)

### **Funcional:**
1. ✅ Áudio é transcrito corretamente (>90% precisão)
2. ✅ Entidades são extraídas (nome e valor)
3. ✅ CPF opcional (busca no Smart Memory se ausente)
4. ✅ Confidence score calculado
5. ✅ Erros tratados elegantemente

### **Técnico:**
6. ✅ TypeScript 100% tipado
7. ✅ Sem uso de `any`
8. ✅ API response time < 10s
9. ✅ Error handling robusto
10. ✅ Logs estruturados

### **UX:**
11. ✅ Mensagens de erro amigáveis
12. ✅ Loading states claros
13. ✅ Feedback de confiança visual
14. ✅ Possibilidade de repetir gravação

---

## 📚 Dependências

- Story 006: Assistente de Emissão (Wizard)
- Story 005: Smart Memory (autocomplete de CPF)
- OpenAI Account: API key configurada
- CLAUDE.md: Defensive coding + Quality gates

---

## 🚀 Estimativa Detalhada

**Total:** 12-16 horas

**Breakdown:**
- Preparação e tipos: 1-2h
- API Route (Whisper + GPT): 4-6h
- Integração frontend: 3-4h
- Tratamento de erros: 2-3h
- Testes e refinamento: 2-3h

---

## ⚠️ Riscos e Mitigações

**Risco 1:** Custo alto de API  
**Mitigação:** Usar GPT-4o-mini (~60x mais barato), limitar áudio a 2min

**Risco 2:** Latência alta (>10s)  
**Mitigação:** Processar em paralelo (Whisper + GPT), adicionar timeout

**Risco 3:** Baixa precisão com sotaques  
**Mitigação:** Whisper lida bem, adicionar fallback para edição manual

**Risco 4:** Dados sensíveis (LGPD)  
**Mitigação:** Não armazenar áudios, criptografar transcrições

---

**[@pm + @architect + @sm]** Aprovado para desenvolvimento ✅

