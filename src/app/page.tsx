import { VoiceRecorder } from '@/components/voice/VoiceRecorder'
import { Mic, Brain, FileText, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Navbar Premium */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-400" strokeWidth={1.5} />
              <span className="text-2xl font-bold tracking-tight">LUME IA</span>
            </div>
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/50 px-5 py-2.5 text-sm font-medium transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
            >
              Acessar Painel
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section Massiva */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Título de Impacto */}
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
              Voice-to-Invoice Technology
            </div>
            
            <h1 className="mb-6 text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Emissão fiscal por <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                comando de voz
              </span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-xl text-zinc-400 leading-relaxed">
              Médicos emitem notas fiscais em segundos. A IA transcreve, calcula impostos e integra com sua contabilidade.
            </p>
          </div>

          {/* Voice Recorder Premium Card */}
          <div className="mx-auto max-w-2xl mb-20">
            <div className="relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl p-8 shadow-2xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
              
              <div className="relative">
                <div className="mb-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Experimente agora</h3>
                  <p className="text-sm text-zinc-500">
                    Clique no microfone e diga: &ldquo;Nota de 300 reais para João Silva, CPF 123...&rdquo;
                  </p>
                </div>
                
                <VoiceRecorder />
                
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-600">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500/50" />
                    <span>OpenAI Whisper</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500/50" />
                    <span>GPT-4 Turbo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Feature 1 - Maior destaque */}
            <div className="md:col-span-2 group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl p-8 hover:border-zinc-700/50 transition-all">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Mic className="h-6 w-6" strokeWidth={1.5} />
                </div>
                
                <h3 className="mb-2 text-2xl font-bold tracking-tight">Emissão por Voz</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Grave um áudio de 10 segundos e receba sua nota fiscal pronta. Sem digitação, sem complicação.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl p-8 hover:border-zinc-700/50 transition-all">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Brain className="h-6 w-6" strokeWidth={1.5} />
                </div>
                
                <h3 className="mb-2 text-xl font-bold tracking-tight">IA Tributária</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Cálculo automático de impostos específicos da área médica (ISS, INSS, IR).
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl p-8 hover:border-zinc-700/50 transition-all">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <FileText className="h-6 w-6" strokeWidth={1.5} />
                </div>
                
                <h3 className="mb-2 text-xl font-bold tracking-tight">Integração Total</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Seu escritório contábil visualiza tudo em tempo real. Relatórios consolidados mensais.
                </p>
              </div>
            </div>

            {/* Feature 4 - Span 2 colunas */}
            <div className="md:col-span-2 group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-xl p-8 hover:border-zinc-700/50 transition-all">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="mb-2 text-2xl font-bold tracking-tight">Focado em CE, SE e RN</h3>
                  <p className="text-zinc-400 leading-relaxed max-w-xl">
                    Compliance total com legislação municipal de Fortaleza, Aracaju e Natal. Pronto para usar.
                  </p>
                </div>
                
                <div className="hidden md:block text-6xl font-bold text-zinc-800">
                  3
                </div>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="mt-16 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
            >
              Começar Agora
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </Link>
            
            <p className="mt-4 text-sm text-zinc-500">
              Grátis para testar • Sem cartão de crédito
            </p>
          </div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="border-t border-zinc-800/50 py-8 px-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between text-sm text-zinc-500">
          <p>© 2025 LUME IA. Tecnologia fiscal inteligente.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-zinc-300 transition-colors">Termos</Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">Contato</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
