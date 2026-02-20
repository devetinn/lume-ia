'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export function ProcessingState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6"
    >
      <Loader2 className="w-12 h-12 text-violet-400 animate-spin" strokeWidth={1.5} />
      
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          Processando sua nota
        </h3>
        <p className="text-muted-foreground">
          Analisando áudio e extraindo dados...
        </p>
      </div>
      
      <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-600 to-blue-600"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  )
}
