# 🚀 Guia de Deploy - Fiscal SaaS

## Deploy na Vercel (Recomendado)

### Passo 1: Preparar o Projeto

```bash
# Instale a CLI da Vercel
npm install -g vercel

# Faça login
vercel login
```

### Passo 2: Configurar Variáveis de Ambiente

No painel da Vercel (ou via CLI):

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add OPENAI_API_KEY
vercel env add FOCUS_NFE_API_KEY
vercel env add FOCUS_NFE_ENVIRONMENT
```

### Passo 3: Deploy

```bash
# Deploy de produção
vercel --prod
```

Sua aplicação estará disponível em: `https://fiscal-saas.vercel.app`

---

## Deploy Manual (Outras Plataformas)

### Build de Produção

```bash
npm run build
npm start
```

### Variáveis de Ambiente Necessárias

Certifique-se de configurar todas as variáveis em `.env.example`

---

## Configuração do Supabase para Produção

### 1. Row Level Security (RLS)

Execute no SQL Editor do Supabase:

```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (exemplo)
CREATE POLICY "Users can view their clinic data"
  ON clinics FOR SELECT
  USING (id = (SELECT clinic_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view their invoices"
  ON invoices FOR SELECT
  USING (user_id = auth.uid());
```

### 2. Configurar CORS

No painel do Supabase:
- Settings > API > CORS
- Adicione seu domínio de produção

---

## Checklist Pré-Deploy

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Banco de dados Supabase com schema aplicado
- [ ] Row Level Security habilitado
- [ ] Focus NFe em modo produção (não homologação)
- [ ] Domínio customizado configurado (opcional)
- [ ] SSL/HTTPS ativado
- [ ] Monitoramento configurado

---

## Monitoramento e Logs

### Vercel Analytics
Adicione ao projeto:

```bash
npm install @vercel/analytics
```

Em `src/app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Sentry (Erro Tracking)

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

## Performance

### Otimizações Aplicadas

- ✅ Next.js App Router com Server Components
- ✅ Tailwind CSS com purge automático
- ✅ Imagens otimizadas com next/image
- ✅ API Routes com edge runtime (futuro)
- ✅ Lazy loading de componentes

### Métricas Alvo

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

---

## Backup e Segurança

### Backup do Banco de Dados
O Supabase faz backup automático. Configure também:

```bash
# Backup manual via CLI do Supabase
supabase db dump > backup.sql
```

### Variáveis Sensíveis
- ❌ NUNCA commite `.env` no Git
- ✅ Use secrets do GitHub Actions
- ✅ Rotacione API keys periodicamente

---

## Custos Estimados (MVP)

| Serviço | Plano | Custo Mensal |
|---------|-------|--------------|
| Vercel | Hobby | $0 (até 100GB) |
| Supabase | Free | $0 (até 500MB) |
| OpenAI | Pay-as-you-go | ~$10-50 |
| Focus NFe | Básico | ~$50-100 |
| **TOTAL** | | **$60-150/mês** |

---

## Escalabilidade

### Quando Escalar?

- Mais de 1000 notas/mês → Considere Supabase Pro
- Mais de 10 clínicas → Otimize queries e adicione cache
- Alta latência → Use Edge Functions

### Próximos Passos

1. Implementar cache com Redis
2. CDN para PDFs gerados
3. Processamento assíncrono com queues
4. Multi-tenancy com isolamento de dados
