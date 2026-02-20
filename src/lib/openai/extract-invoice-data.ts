import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface InvoiceData {
  clientName: string
  cpfCnpj: string
  serviceValue: number
  description?: string
}

export async function extractInvoiceData(transcription: string): Promise<InvoiceData> {
  const prompt = `
Você é um assistente especializado em extrair dados de notas fiscais de serviços médicos.

Analise a seguinte transcrição de áudio e extraia as informações necessárias para emissão de nota fiscal:

Transcrição: "${transcription}"

Retorne APENAS um JSON válido com os seguintes campos:
{
  "clientName": "nome completo do cliente",
  "cpfCnpj": "CPF ou CNPJ formatado",
  "serviceValue": valor numérico em reais,
  "description": "descrição do serviço (se mencionado, senão use 'Serviços médicos')"
}

Regras importantes:
- Normalize números por extenso para valores numéricos (ex: "trezentos" → 300)
- Formate CPF/CNPJ corretamente com pontos, traços e barras
- Se faltar alguma informação crítica, retorne null para esse campo
- Retorne APENAS o JSON, sem texto adicional
`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Você é um assistente especializado em extração de dados fiscais.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    })

    const content = response.choices[0].message.content
    if (!content) {
      throw new Error('No content in OpenAI response')
    }

    const data = JSON.parse(content) as InvoiceData
    
    // Validate required fields
    if (!data.clientName || !data.cpfCnpj || !data.serviceValue) {
      throw new Error('Missing required invoice data')
    }

    return data
    
  } catch (error) {
    console.error('Error extracting invoice data:', error)
    throw new Error('Failed to extract invoice data from transcription')
  }
}
