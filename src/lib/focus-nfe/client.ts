import axios from 'axios'
import { FocusNFeRequest, FocusNFeResponse } from '@/types'

const FOCUS_API_URL = 'https://api.focusnfe.com.br'

/**
 * Focus NFe API Client
 */
export class FocusNFeClient {
  private apiKey: string
  private environment: 'homologacao' | 'producao'

  constructor(apiKey?: string, environment?: string) {
    this.apiKey = apiKey || process.env.FOCUS_NFE_API_KEY || ''
    this.environment = (environment || process.env.FOCUS_NFE_ENVIRONMENT || 'homologacao') as 'homologacao' | 'producao'
  }

  private getHeaders() {
    return {
      'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    }
  }

  /**
   * Issue a service invoice (NFS-e)
   */
  async issueInvoice(data: FocusNFeRequest): Promise<FocusNFeResponse> {
    const endpoint = this.environment === 'homologacao' 
      ? '/v2/nfse?ref=test' 
      : '/v2/nfse'

    try {
      const response = await axios.post(
        `${FOCUS_API_URL}${endpoint}`,
        data,
        { headers: this.getHeaders() }
      )

      return response.data
    } catch (error: any) {
      console.error('Focus NFe API Error:', error.response?.data)
      throw new Error(
        error.response?.data?.mensagem || 
        'Erro ao emitir nota fiscal'
      )
    }
  }

  /**
   * Get invoice status
   */
  async getInvoiceStatus(ref: string): Promise<FocusNFeResponse> {
    try {
      const response = await axios.get(
        `${FOCUS_API_URL}/v2/nfse/${ref}`,
        { headers: this.getHeaders() }
      )

      return response.data
    } catch (error: any) {
      console.error('Focus NFe API Error:', error.response?.data)
      throw new Error('Erro ao consultar nota fiscal')
    }
  }

  /**
   * Cancel an invoice
   */
  async cancelInvoice(ref: string, reason: string): Promise<FocusNFeResponse> {
    try {
      const response = await axios.delete(
        `${FOCUS_API_URL}/v2/nfse/${ref}`,
        {
          headers: this.getHeaders(),
          data: { justificativa: reason }
        }
      )

      return response.data
    } catch (error: any) {
      console.error('Focus NFe API Error:', error.response?.data)
      throw new Error('Erro ao cancelar nota fiscal')
    }
  }

  /**
   * Download invoice PDF
   */
  async downloadPDF(ref: string): Promise<Buffer> {
    try {
      const response = await axios.get(
        `${FOCUS_API_URL}/v2/nfse/${ref}.pdf`,
        {
          headers: this.getHeaders(),
          responseType: 'arraybuffer'
        }
      )

      return Buffer.from(response.data)
    } catch (error: any) {
      console.error('Focus NFe API Error:', error.response?.data)
      throw new Error('Erro ao baixar PDF da nota fiscal')
    }
  }
}

/**
 * Get singleton instance
 */
export const focusNFe = new FocusNFeClient()

/**
 * Helper function to issue invoice
 */
export const issueInvoice = (data: FocusNFeRequest) => focusNFe.issueInvoice(data)
