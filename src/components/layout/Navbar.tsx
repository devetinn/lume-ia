'use client'

import Link from 'next/link'
import { Sparkles, LayoutDashboard } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Sparkles className="w-5 h-5 text-navy" strokeWidth={1.5} />
            <span className="text-xl font-bold tracking-tight">LUME IA</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-800/50 transition-colors text-sm"
            >
              <LayoutDashboard className="w-4 h-4" strokeWidth={1.5} />
              Painel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
