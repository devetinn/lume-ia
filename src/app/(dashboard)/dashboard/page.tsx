'use client'

import { motion } from 'framer-motion'
import { Mic, FileText, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Notas Emitidas', value: '24', icon: FileText, trend: '+12% vs mês anterior' },
  { label: 'Faturamento', value: 'R$ 12.500', icon: TrendingUp, trend: '+8% vs mês anterior' },
  { label: 'Tempo Economizado', value: '4.2h', icon: Clock, trend: 'Esta semana' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      <motion.div {...fadeInUp}>
        <h1 className="text-4xl font-bold tracking-tight">Bem-vindo de volta</h1>
        <p className="text-zinc-400 mt-2 text-lg">Seu consultório funcionando 24/7</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="glass glass-hover p-6 rounded-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-400">{stat.label}</p>
                <p className="text-3xl font-bold tracking-tight mt-2">{stat.value}</p>
                <p className="text-xs text-zinc-500 mt-2">{stat.trend}</p>
              </div>
              <div className="p-3 bg-navy/20 rounded-xl">
                <stat.icon className="w-6 h-6 text-navy" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div {...fadeInUp} className="glass p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Emissão Rápida</h2>
            <p className="text-zinc-400 mt-1">Fale e pronto. Nota emitida em segundos.</p>
          </div>
        </div>
        
        <Link 
          href="/emissao"
          className="inline-flex items-center gap-3 px-8 py-4 bg-navy hover:bg-navy-light rounded-xl font-medium transition-all hover:scale-105"
        >
          <Mic className="w-5 h-5" strokeWidth={1.5} />
          Emitir por Voz Agora
        </Link>
      </motion.div>
    </div>
  )
}
