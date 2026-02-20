# 📡 Documentação da API - Fiscal SaaS

## Endpoints Principais

### 🎤 Voice to Invoice

**POST** `/api/voice-to-invoice`

Processa áudio e extrai dados para nota fiscal.

**Request:**
```typescript
Content-Type: multipart/form-data

{
  audio: File (audio/webm, audio/mp3, audio/wav)
}
```

**Response:**
```typescript
{
  clientName: string
  cpfCnpj: string
  serviceValue: number
  description?: string
  taxes: {
    iss: { rate: number, value: number }
    irrf: { rate: number, value: number }
    total: number
  }
  netValue: number
  transcription: string
}
```

**Fluxo:**
1. Recebe arquivo de áudio
2. Transcreve com Whisper API
3. Extrai dados com GPT-4
4. Calcula impostos
5. Retorna dados estruturados

---

### 📄 Emitir Nota Fiscal

**POST** `/api/invoices`

Emite nota fiscal via Focus NFe e salva no banco.

**Request:**
```typescript
{
  clientName: string
  cpfCnpj: string
  serviceValue: number
  netValue: number
  description?: string
  taxes: object
}
```

**Response:**
```typescript
{
  id: string
  number: string
  pdfUrl: string
  status: 'issued'
  issuedAt: string
}
```

**Fluxo:**
1. Salva rascunho no Supabase
2. Emite nota via Focus NFe API
3. Atualiza registro com número e PDF
4. Retorna dados completos

---

### ❤️ Health Check

**GET** `/api/health`

Verifica status da API.

**Response:**
```typescript
{
  status: 'ok'
  timestamp: string
  version: string
}
```

---

## Modelos de Dados

### Invoice (Nota Fiscal)

```typescript
interface Invoice {
  id: string
  clinicId: string
  userId: string
  clientId?: string
  number?: string
  clientName: string
  cpfCnpj: string
  serviceValue: number
  netValue: number
  description?: string
  taxes: {
    iss: { rate: number, value: number }
    irrf: { rate: number, value: number }
    total: number
  }
  status: 'pending' | 'issued' | 'cancelled'
  pdfUrl?: string
  transcription?: string
  issuedAt?: string
  cancelledAt?: string
  createdAt: string
  updatedAt: string
}
```

### Client (Cliente/Paciente)

```typescript
interface Client {
  id: string
  clinicId: string
  name: string
  cpfCnpj: string
  email?: string
  phone?: string
  address?: {
    street: string
    number: string
    city: string
    state: string
    zipCode: string
  }
  createdAt: string
  updatedAt: string
}
```

### Clinic (Clínica)

```typescript
interface Clinic {
  id: string
  name: string
  cnpj: string
  email?: string
  phone?: string
  city: string
  state: 'CE' | 'SE' | 'RN'
  address?: object
  createdAt: string
  updatedAt: string
}
```

---

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Não autenticado |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

---

## Integrações Externas

### OpenAI API
- **Whisper**: Transcrição de áudio
- **GPT-4**: Extração de dados estruturados

### Focus NFe API
- **Emissão de NFS-e**: Nota fiscal de serviço eletrônica
- **Download de PDF**: URL do PDF da nota

### Supabase
- **Database**: PostgreSQL
- **Storage**: Armazenamento de PDFs (futuro)
- **Auth**: Autenticação de usuários (futuro)
