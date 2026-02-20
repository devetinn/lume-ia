// Core Types
export type UserRole = 'doctor' | 'admin' | 'accountant'

export type InvoiceStatus = 'issued' | 'cancelled' | 'error' | 'pending'

export type TaxRegime = 'simples_nacional' | 'lucro_presumido' | 'lucro_real'

export type State = 'CE' | 'SE' | 'RN'

// Database Models
export interface Organization {
  id: string
  name: string
  document: string // CPF or CNPJ
  municipal_registration?: string
  address: Address
  tax_config: TaxConfig
  accounting_office_id?: string
  created_at: string
  updated_at: string
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: State
  zip_code: string
}

export interface TaxConfig {
  municipality: string
  state: State
  iss_rate: number // 2-5%
  tax_regime: TaxRegime
  service_code: string // LC 116/2003
  cnae_code?: string
}

export interface User {
  id: string
  organization_id: string
  role: UserRole
  name: string
  email: string
  created_at: string
}

export interface Invoice {
  id: string
  organization_id: string
  issued_by_user_id: string
  invoice_number?: string
  customer_name: string
  customer_document: string
  customer_email?: string
  service_description: string
  service_code: string
  gross_amount: number
  iss_amount: number
  pis_amount: number
  cofins_amount: number
  net_amount: number
  status: InvoiceStatus
  focus_nfe_id?: string
  pdf_url?: string
  audio_url?: string
  transcript?: string
  error_message?: string
  created_at: string
  issued_at?: string
  cancelled_at?: string
}

export interface AccountingOffice {
  id: string
  name: string
  document: string
  contact_email: string
  logo_url?: string
  created_at: string
}

// Voice-to-Invoice Types
export interface VoiceTranscription {
  text: string
  duration: number
  language: string
}

export interface ExtractedInvoiceData {
  customer_name: string
  customer_document: string
  gross_amount: number
  service_description?: string
  confidence: number
}

// Tax Calculation
export interface TaxBreakdown {
  gross_amount: number
  iss_amount: number
  iss_rate: number
  pis_amount: number
  pis_rate: number
  cofins_amount: number
  cofins_rate: number
  net_amount: number
}

// API Responses
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Focus NFe Types
export interface FocusNFeRequest {
  natureza_operacao: string
  prestador: FocusNFePrestador
  tomador: FocusNFeTomador
  servico: FocusNFeServico
}

export interface FocusNFePrestador {
  cnpj: string
  inscricao_municipal: string
  codigo_municipio: string
}

export interface FocusNFeTomador {
  cnpj?: string
  cpf?: string
  razao_social: string
  email?: string
}

export interface FocusNFeServico {
  discriminacao: string
  cnae: string
  codigo_tributario_municipio: string
  iss_retido: boolean
  valor_servicos: number
  valor_iss: number
  valor_pis: number
  valor_cofins: number
  aliquota: number
}

export interface FocusNFeResponse {
  id: string
  status: string
  numero: string
  codigo_verificacao: string
  url: string
  caminho_xml_nota_fiscal?: string
  erros?: Array<{ codigo: string; mensagem: string }>
}
