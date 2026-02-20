'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, TrendingUp, Users, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { label: 'Notas Emitidas', value: '24', icon: FileText, color: 'text-violet-400', link: '/notas' },
    { label: 'Faturamento Total', value: 'R$ 12.500', icon: TrendingUp, color: 'text-blue-400' },
    { label: 'Pacientes Ativos', value: '18', icon: Users, color: 'text-cyan-400' },
  ]

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do seu consultório
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-zinc-900/40 backdrop-blur-md border border-border/50 p-6 rounded-2xl hover:bg-zinc-900/60 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-foreground0 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                {stat.link && (
                  <Link 
                    href={stat.link}
                    className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 mt-3 transition-colors"
                  >
                    Ver todas as notas
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
              <stat.icon className={`w-6 h-6 ${stat.color}`} strokeWidth={1.5} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-zinc-900/40 backdrop-blur-md border border-border/50 p-8 rounded-2xl"
      >
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Ação Rápida
        </h2>
        <Link
          href="/emissao"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all hover:scale-105"
        >
          <FileText className="w-5 h-5" strokeWidth={1.5} />
          Nova Emissão por Voz
        </Link>
      </motion.div>
    </div>
  )
}
