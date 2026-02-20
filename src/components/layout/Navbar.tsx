'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

export function Navbar() {
  const pathname = usePathname()
  
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/emissao', label: 'Emitir Nota' },
    { href: '/notas', label: 'Minhas Notas' },
    { href: '/clientes', label: 'Clientes' },
  ]
  
  const accountingLinks = [
    { href: '/contabilidade', label: 'Painel Contábil' },
    { href: '/contabilidade/clinicas', label: 'Clínicas' },
    { href: '/contabilidade/relatorios', label: 'Relatórios' },
  ]
  
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl mr-2">🎤</span>
              <span className="font-bold text-xl text-primary-500">Fiscal SaaS</span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium',
                    pathname === link.href
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
