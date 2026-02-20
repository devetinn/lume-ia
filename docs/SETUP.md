# 🚀 Guia de Configuração - Fiscal SaaS

## Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Chave de API da OpenAI
- Conta no Focus NFe (homologação ou produção)

## Passo 1: Instalar Dependências

```bash
cd fiscal-saas
npm install
```

## Passo 2: Configurar Supabase

1. Crie um novo projeto em [supabase.com](https://supabase.com)
2. No painel do Supabase, vá em **SQL Editor**
3. Execute o script `supabase/schema.sql` para criar as tabelas
4. Copie as credenciais em **Project Settings > API**

## Passo 3: Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite `.env` e preencha as variáveis:

```env
# Supabase (copie do painel do Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

# OpenAI (obtenha em platform.openai.com)
OPENAI_API_KEY=sk-...

# Focus NFe (obtenha em focusnfe.com.br)
FOCUS_NFE_API_KEY=sua_api_key
FOCUS_NFE_ENVIRONMENT=homologacao

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Passo 4: Executar em Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## Passo 5: Testar o Voice-to-Invoice

1. Acesse `/emissao`
2. Clique em "Iniciar Gravação"
3. Diga: "Nota de trezentos reais para João Silva, CPF 123.456.789-00"
4. Clique em "Parar Gravação"
5. Verifique os dados extraídos
6. Clique em "Emitir Nota Fiscal"

## Estrutura de Pastas

```
fiscal-saas/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (dashboard)/       # Rotas do médico
│   │   ├── (accounting)/      # Rotas do contador
│   │   └── api/               # API Routes
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes de UI
│   │   ├── voice/            # Componentes de voz
│   │   └── layout/           # Layouts
│   ├── lib/                  # Bibliotecas e utilitários
│   │   ├── supabase/        # Cliente Supabase
│   │   ├── openai/          # Cliente OpenAI
│   │   ├── focus-nfe/       # Cliente Focus NFe
│   │   └── utils/           # Funções utilitárias
│   ├── types/               # TypeScript types
│   └── config/              # Configurações
└── supabase/                # Schemas SQL
```

## Troubleshooting

### Erro: "Missing API key"
Verifique se todas as variáveis de ambiente estão configuradas em `.env`

### Erro ao gravar áudio
Permita acesso ao microfone no navegador

### Erro ao emitir nota
Verifique suas credenciais do Focus NFe e se está em modo homologação

## Próximos Passos

- Configure autenticação de usuários
- Personalize os cálculos de impostos por município
- Configure webhooks do Focus NFe
- Implante em produção (Vercel recomendado)
