import { TaxBreakdown, TaxConfig } from '@/types'

/**
 * Calculate taxes for medical services
 */
export function calculateTaxes(
  grossAmount: number,
  taxConfig: TaxConfig
): TaxBreakdown {
  // ISS (Imposto Sobre Serviços) - 2% to 5% depending on municipality
  const issRate = taxConfig.iss_rate / 100
  const issAmount = grossAmount * issRate

  // PIS (Programa de Integração Social) - 0.65%
  const pisRate = 0.0065
  const pisAmount = grossAmount * pisRate

  // COFINS (Contribuição para Financiamento da Seguridade Social) - 3%
  const cofinsRate = 0.03
  const cofinsAmount = grossAmount * cofinsRate

  // Net amount (gross - taxes)
  const netAmount = grossAmount - issAmount - pisAmount - cofinsAmount

  return {
    gross_amount: grossAmount,
    iss_amount: Number(issAmount.toFixed(2)),
    iss_rate: issRate,
    pis_amount: Number(pisAmount.toFixed(2)),
    pis_rate: pisRate,
    cofins_amount: Number(cofinsAmount.toFixed(2)),
    cofins_rate: cofinsRate,
    net_amount: Number(netAmount.toFixed(2)),
  }
}

/**
 * Get ISS rate by municipality
 * This is a simplified version - in production, this should come from a database
 */
export function getISSRateByMunicipality(municipality: string, state: string): number {
  // Default rates for MVP
  const defaultRates: Record<string, number> = {
    // Ceará
    'Fortaleza-CE': 5,
    'Caucaia-CE': 5,
    'Juazeiro do Norte-CE': 5,
    
    // Sergipe
    'Aracaju-SE': 5,
    'Nossa Senhora do Socorro-SE': 5,
    
    // Rio Grande do Norte
    'Natal-RN': 5,
    'Mossoró-RN': 5,
    'Parnamirim-RN': 5,
  }

  const key = `${municipality}-${state}`
  return defaultRates[key] || 5 // Default 5% if not found
}

/**
 * Get default service code for medical services (LC 116/2003)
 * Item 4.01 - Medicina e biomedicina
 */
export const DEFAULT_MEDICAL_SERVICE_CODE = '4.01'

/**
 * Get default CNAE for medical clinics
 * 8630-5/01 - Atividade médica ambulatorial com recursos para realização de procedimentos cirúrgicos
 */
export const DEFAULT_MEDICAL_CNAE = '8630-5/01'
