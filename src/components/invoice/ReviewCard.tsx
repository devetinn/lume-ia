'use client'

import { CheckCircle, Edit, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface ReviewCardProps {
  data: any
  onEdit: () => void
  onConfirm: () => void
}

export function ReviewCard({ data, onEdit, onConfirm }: ReviewCardProps) {
  const customerName = data?.clientName || data?.customerName || '---'
  const cpf = data?.cpfCnpj || data?.cpf || '---'
  const amount = data?.serviceValue || data?.amount || 0
  const description = data?.description || '---'
  
  const hasErrors = !cpf || cpf === '---' || !customerName || customerName === '---'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/40 backdrop-blur-xl border border-border p-8 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">Revisar Nota Fiscal</h3>
        {hasErrors && (
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm">Dados incompletos</span>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm text-muted-foreground">Cliente</label>
          <p className="text-lg text-foreground font-medium">{customerName}</p>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">CPF/CNPJ</label>
          <p className="text-lg text-foreground">{cpf}</p>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Valor</label>
          <p className="text-2xl text-foreground font-bold">
            {amount > 0 
              ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
              : 'R$ 0,00'
            }
          </p>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Descrição</label>
          <p className="text-foreground">{description}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onEdit}
          className="flex-1 px-6 py-3 rounded-xl border border-border bg-card hover:bg-accent transition-colors flex items-center justify-center gap-2"
        >
          <Edit className="w-5 h-5" strokeWidth={1.5} />
          <span>Editar</span>
        </button>

        <button
          onClick={onConfirm}
          disabled={hasErrors}
          className="flex-1 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" strokeWidth={1.5} />
          <span>Confirmar Emissão</span>
        </button>
      </div>
    </motion.div>
  )
}
