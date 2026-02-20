'use client'

import { useState } from 'react'
import { Mic, Square } from 'lucide-react'

interface VoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => void
  onError?: (error: string) => void
}

export function VoiceRecorder({ onRecordingComplete: _onRecordingComplete, onError: _onError }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)

  const handleToggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Botão Premium de Gravação */}
      <button
        onClick={handleToggleRecording}
        className={`
          group relative h-24 w-24 rounded-full transition-all duration-300
          ${isRecording 
            ? 'bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/50 scale-110' 
            : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105'
          }
        `}
        aria-label={isRecording ? 'Parar gravação' : 'Iniciar gravação'}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
        
        {isRecording ? (
          <Square className="relative z-10 h-10 w-10 mx-auto text-white" strokeWidth={2} fill="white" />
        ) : (
          <Mic className="relative z-10 h-10 w-10 mx-auto text-white" strokeWidth={2} />
        )}
      </button>

      {/* Status Indicator */}
      {isRecording && (
        <div className="flex items-center gap-2 animate-pulse">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm font-medium text-zinc-400">Gravando...</span>
        </div>
      )}

      {!isRecording && (
        <p className="text-sm text-zinc-500">Clique para gravar</p>
      )}
    </div>
  )
}
