import OpenAI from 'openai'

/**
 * OpenAI client for Whisper and GPT-4
 */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'placeholder-openai-key',
})

/**
 * Transcribe audio using Whisper API
 */
export async function transcribeAudio(audioFile: File): Promise<string> {
  const transcription = await openai.audio.transcriptions.create({
    file: audioFile,
    model: 'whisper-1',
    language: 'pt',
  })

  return transcription.text
}

/**
 * Extract invoice data from transcript using GPT-4
 */
export async function extractInvoiceData(transcript: string) {
  const systemPrompt = `Você é um assistente especializado em extrair dados de notas fiscais de serviços médicos a partir de transcrições de áudio.

Extraia as seguintes informações do texto fornecido:
- Nome completo do paciente
- CPF ou CNPJ do paciente (apenas números)
- Valor da consulta/serviço (em reais)
- Descrição do serviço (se mencionado)

Retorne APENAS um objeto JSON válido com a seguinte estrutura:
{
  "customer_name": "Nome completo",
  "customer_document": "12345678900",
  "gross_amount": 300.00,
  "service_description": "Consulta médica",
  "confidence": 0.95
}

Se algum campo não puder ser identificado com certeza, use null.
O campo "confidence" deve indicar o nível de confiança na extração (0 a 1).`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Transcrição: "${transcript}"` },
    ],
    temperature: 0.1,
    response_format: { type: 'json_object' },
  })

  const content = completion.choices[0].message.content
  if (!content) {
    throw new Error('No response from GPT-4')
  }

  return JSON.parse(content)
}
