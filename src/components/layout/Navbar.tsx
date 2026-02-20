'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navbar() {
  const pathname = usePathname()
  
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/notas', label: 'Notas Fiscais' },
    { href: '/clientes', label: 'Pacientes' },
    { href: '/emissao', label: 'Emitir Nota' },
  ]
  
  return (
    <nav className="sticky top-0 z-50 bg-zinc-900/30 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" strokeWidth={1.5} />
            <span className="font-bold text-xl text-foreground">LUME IA</span>
          </Link>
          
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
