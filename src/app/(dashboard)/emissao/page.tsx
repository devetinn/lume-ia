'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AudioRecorder } from '@/components/wizard/AudioRecorder'
import { ProcessingState } from '@/components/wizard/ProcessingState'
import { ReviewCard } from '@/components/invoice/ReviewCard'
import { CheckCircle } from 'lucide-react'

type WizardStep = 'IDLE' | 'RECORDING' | 'PROCESSING' | 'REVIEW' | 'SUCCESS'

export default function EmissaoPage() {
  const [step, setStep] = useState<WizardStep>('IDLE')
  const [invoiceData, setInvoiceData] = useState<any>({
    clientName: 'João Silva',
    cpfCnpj: '123.456.789-00',
    serviceValue: 350.00,
    netValue: 332.50,
    description: 'Consulta médica',
  })

  const handleStartRecording = () => {
    setStep('RECORDING')
  }

  const handleStopRecording = () => {
    setStep('PROCESSING')
    
    // Simular processamento de IA
    setTimeout(() => {
      setInvoiceData({
        clientName: 'João Silva',
        cpfCnpj: '123.456.789-00',
        serviceValue: 300,
        description: 'Consulta médica',
        netValue: 270,
        taxes: {
          iss: 15,
          total_deductions: 30,
        }
      })
      setStep('REVIEW')
    }, 3000)
  }

  const handleEdit = () => {
    // Implementar edição
  }

  const handleConfirm = () => {
    setStep('SUCCESS')
  }

  const handleNewIssuance = () => {
    setStep('IDLE')
    setInvoiceData(null)
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            Emissão por Voz
          </h1>
          <p className="text-muted-foreground">
            Transforme sua consulta em nota fiscal com um comando de voz
          </p>
        </motion.div>

        <div className="bg-card/40 backdrop-blur-xl border border-border rounded-3xl p-12 shadow-xl">
          <AnimatePresence mode="wait">
            {step === 'IDLE' || step === 'RECORDING' ? (
              <motion.div key="recording" exit={{ opacity: 0, scale: 0.95 }}>
                <AudioRecorder
                  isRecording={step === 'RECORDING'}
                  onStartRecording={handleStartRecording}
                  onStopRecording={handleStopRecording}
                />
              </motion.div>
            ) : step === 'PROCESSING' ? (
              <motion.div key="processing" exit={{ opacity: 0, scale: 0.95 }}>
                <ProcessingState />
              </motion.div>
            ) : step === 'REVIEW' && invoiceData ? (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <ReviewCard
                  data={invoiceData}
                  onEdit={handleEdit}
                  onConfirm={handleConfirm}
                />
              </motion.div>
            ) : step === 'SUCCESS' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" strokeWidth={1.5} />
                <h3 className="text-3xl font-bold text-foreground mb-3">
                  Nota emitida com sucesso!
                </h3>
                <p className="text-muted-foreground mb-8">
                  A nota fiscal foi gerada e enviada
                </p>
                <button
                  onClick={handleNewIssuance}
                  className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-colors"
                >
                  Nova Emissão
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
