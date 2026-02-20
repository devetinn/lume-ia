import { NextRequest, NextResponse } from 'next/server'
import { transcribeAudio } from '@/lib/openai/client'
import { extractInvoiceData } from '@/lib/openai/extract-invoice-data'
import { calculateTaxes } from '@/lib/utils/tax-calculator'

export async function POST(request: NextRequest) {
  try {
    // Get audio file from form data
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    // Step 1: Transcribe audio using Whisper API
    const transcription = await transcribeAudio(audioFile)
    
    // Step 2: Extract invoice data from transcription using GPT
    const extractedData = await extractInvoiceData(transcription)
    
    // Step 3: Calculate taxes
    const taxConfig = {
      municipality: 'Fortaleza',
      state: 'CE' as const,
      iss_rate: 5,
      tax_regime: 'simples_nacional' as const,
      service_code: '4.01',
    }
    const taxes = calculateTaxes(extractedData.serviceValue, taxConfig)
    
    // Step 4: Prepare response with all data
    const invoiceData = {
      ...extractedData,
      taxes,
      netValue: taxes.net_amount,
      transcription, // Include for debugging/validation
    }
    
    return NextResponse.json(invoiceData)
    
  } catch (error) {
    console.error('Error processing voice-to-invoice:', error)
    return NextResponse.json(
      { error: 'Failed to process audio' },
      { status: 500 }
    )
  }
}
