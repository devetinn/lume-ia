'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { VoiceRecorder } from '@/components/voice/VoiceRecorder'
import { Button } from '@/components/ui/Button'

export default function EmissaoPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsProcessing(true)
    setError(null)
    
    try {
      // Create form data with audio
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')
      
      // Send to API for processing
      const response = await fetch('/api/voice-to-invoice', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Erro ao processar áudio')
      }
      
      const data = await response.json()
      setExtractedData(data)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      console.error('Error processing audio:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleIssueInvoice = async () => {
    if (!extractedData) return
    
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(extractedData),
      })
      
      if (!response.ok) {
        throw new Error('Erro ao emitir nota fiscal')
      }
      
      const invoice = await response.json()
      alert(`Nota fiscal emitida com sucesso! Número: ${invoice.number}`)
      
      // Reset form
      setExtractedData(null)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Emitir Nota Fiscal</h1>
        <p className="mt-2 text-gray-600">
          Use o Voice-to-Invoice para emitir notas através de áudio
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>🎤 Gravação de Áudio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <VoiceRecorder 
              onRecordingComplete={handleRecordingComplete}
              onError={setError}
            />
            
            {isProcessing && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <p className="mt-2 text-sm text-gray-600">Processando áudio...</p>
              </div>
            )}
            
            {error && (
              <div className="bg-error-light/10 border border-error-light rounded-lg p-4">
                <p className="text-error text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📋 Dados Extraídos</CardTitle>
          </CardHeader>
          <CardContent>
            {extractedData ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Cliente</label>
                  <p className="text-lg font-semibold">{extractedData.clientName}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">CPF/CNPJ</label>
                  <p className="text-lg font-semibold">{extractedData.cpfCnpj}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Valor do Serviço</label>
                  <p className="text-lg font-semibold">R$ {extractedData.serviceValue.toFixed(2)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Descrição</label>
                  <p className="text-gray-700">{extractedData.description || 'Serviços médicos'}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Impostos Calculados</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>ISS ({extractedData.taxes.iss.rate}%):</span>
                      <span>R$ {extractedData.taxes.iss.value.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IRRF ({extractedData.taxes.irrf.rate}%):</span>
                      <span>R$ {extractedData.taxes.irrf.value.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total de Impostos:</span>
                      <span>R$ {extractedData.taxes.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-primary-500 border-t pt-2">
                      <span>Valor Líquido:</span>
                      <span>R$ {extractedData.netValue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleIssueInvoice} className="w-full" size="lg">
                    Emitir Nota Fiscal
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Grave um áudio para extrair os dados da nota fiscal</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>💡 Dicas para Melhor Reconhecimento</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">✓</span>
              <span>Fale de forma clara e pausada</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">✓</span>
              <span>Mencione o valor, nome completo do cliente e CPF/CNPJ</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">✓</span>
              <span>Exemplo: "Nota de trezentos reais para João da Silva, CPF 123.456.789-00"</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 mr-2">✓</span>
              <span>Grave em ambiente silencioso para melhor qualidade</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
