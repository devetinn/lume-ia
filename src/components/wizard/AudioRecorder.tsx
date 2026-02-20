'use client'

import { Mic, Square } from 'lucide-react'
import { motion } from 'framer-motion'

interface AudioRecorderProps {
  isRecording: boolean
  onStartRecording: () => void
  onStopRecording: () => void
}

export function AudioRecorder({ isRecording, onStartRecording, onStopRecording }: AudioRecorderProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      {!isRecording ? (
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={onStartRecording}
          className="w-24 h-24 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors flex items-center justify-center shadow-lg shadow-violet-500/25"
        >
          <Mic className="w-12 h-12 text-white" strokeWidth={1.5} />
        </motion.button>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-2 items-end h-16">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-2 bg-violet-400 rounded-full"
                animate={{
                  height: ['20px', '60px', '20px'],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          
          <motion.button
            onClick={onStopRecording}
            className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 transition-colors flex items-center justify-center"
          >
            <Square className="w-10 h-10 text-white" strokeWidth={1.5} fill="currentColor" />
          </motion.button>
          
          <p className="text-sm text-muted-foreground">Gravando...</p>
        </div>
      )}
      
      {!isRecording && (
        <p className="text-sm text-muted-foreground max-w-md text-center">
          Clique no microfone e descreva a consulta
        </p>
      )}
    </div>
  )
}
