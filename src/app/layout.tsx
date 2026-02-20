import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'LUME IA - Emissão Fiscal por Voz para Médicos',
  description: 'Transforme sua consulta em nota fiscal com um comando de voz. Paz de espírito e ganho de tempo para médicos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-zinc-950 text-zinc-50`}>
        {children}
      </body>
    </html>
  )
}
