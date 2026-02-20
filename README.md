# 🎤 Fiscal SaaS - Emissor Fiscal Autônomo

Sistema SaaS de emissão de notas fiscais com **Voice-to-Invoice** para clínicas e profissionais de saúde (CE, SE, RN).

## 🚀 Stack Tecnológico

- **Frontend:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **APIs:** OpenAI (Whisper + GPT-4), Focus NFe

## 📁 Estrutura do Projeto

```
fiscal-saas/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Rotas de autenticação
│   │   ├── (dashboard)/       # Rotas protegidas
│   │   ├── api/               # API Routes
│   │   └── layout.tsx
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes base (shadcn-style)
│   │   ├── voice/            # Componentes de Voice-to-Invoice
│   │   ├── invoices/         # Componentes de notas fiscais
│   │   └── accounting/       # Componentes do painel contábil
│   ├── lib/                   # Utilitários e configurações
│   │   ├── supabase/         # Cliente Supabase
│   │   ├── openai/           # Cliente OpenAI
│   │   ├── focus-nfe/        # Cliente Focus NFe
│   │   └── utils/            # Funções auxiliares
│   ├── types/                 # TypeScript types
│   └── config/               # Configurações da aplicação
├── supabase/
│   ├── migrations/           # Migrations do banco
│   └── seed.sql             # Dados iniciais
└── public/                   # Arquivos estáticos
```

## 🛠️ Setup de Desenvolvimento

### 1. Instalar Dependências

```bash
cd fiscal-saas
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Preencha as variáveis no arquivo `.env`:
- Supabase: criar projeto em [supabase.com](https://supabase.com)
- OpenAI: obter API key em [platform.openai.com](https://platform.openai.com)
- Focus NFe: cadastrar em [focusnfe.com.br](https://focusnfe.com.br)

### 3. Executar o Projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📊 Banco de Dados

### Setup Inicial

```bash
# Executar migrations (após configurar Supabase)
npx supabase db push
```

### Principais Tabelas

- `organizations` - Clínicas e médicos
- `users` - Usuários do sistema
- `invoices` - Notas fiscais emitidas
- `accounting_offices` - Escritórios contábeis

Veja detalhes em `supabase/migrations/`.

## 🎯 Funcionalidades Principais

### 1. Voice-to-Invoice
- Gravação de áudio via navegador
- Transcrição com Whisper API
- Extração de dados com GPT-4
- Cálculo automático de impostos
- Emissão via Focus NFe

### 2. Emissão Manual
- Formulário tradicional
- Preview antes de emitir
- Validações em tempo real

### 3. Histórico de Notas
- Listagem com filtros
- Busca por paciente/número
- Download de PDFs
- Cancelamento de notas

### 4. Painel Contábil
- Visão consolidada por clínica
- Geração de relatório PDF mensal
- Exportação CSV

## 🧪 Testes

```bash
# Verificação de tipos
npm run type-check

# Lint
npm run lint

# Build de produção
npm run build
```

## 📚 Documentação

- [Especificação Completa](../spec.md)
- [Arquitetura](./docs/architecture.md)
- [API Reference](./docs/api.md)

## 🔐 Segurança

- Multi-tenancy com Row Level Security (Supabase)
- Autenticação via Supabase Auth
- HTTPS obrigatório para produção
- Validações de CPF/CNPJ
- Logs de auditoria

## 📝 Licença

Proprietary - Todos os direitos reservados

## 👥 Equipe

- **Product Manager:** @pm
- **Arquiteto:** @architect
- **Desenvolvedor:** @dev
