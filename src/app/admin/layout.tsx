'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const LINKS = [
  { href: '/admin/pedidos',     label: 'Pedidos' },
  { href: '/admin/contatos',    label: 'Contatos' },
  { href: '/admin/materiais',   label: 'Materiais' },
  { href: '/admin/calculadora', label: 'Calculadora' },
  { href: '/admin/dashboard',   label: 'Dashboard' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuAberto, setMenuAberto] = useState(false)

  if (pathname === '/admin/login') return <>{children}</>

  async function sair() {
    await fetch('/api/auth/admin', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-ivoire-100 flex flex-col">
      <header className="bg-onix-800 text-ivoire-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-5">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Image
              src="/logo-dmo.webp"
              alt="DMO Papelaria"
              width={100}
              height={34}
              className="mix-blend-screen flex-shrink-0"
            />

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-4 py-1.5 text-xs tracking-widest uppercase font-sans rounded-sm transition-colors ${
                    pathname === l.href
                      ? 'bg-white/10 text-ivoire-100'
                      : 'text-ivoire-300 hover:text-ivoire-100'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Direita: sair (desktop) + hamburger (mobile) */}
            <div className="flex items-center gap-3">
              <button
                onClick={sair}
                className="hidden md:block text-xs text-ivoire-400 hover:text-ivoire-100 tracking-widest uppercase font-sans transition-colors"
              >
                Sair
              </button>
              {/* Hamburger */}
              <button
                onClick={() => setMenuAberto(v => !v)}
                className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
                aria-label="Menu"
              >
                <span className={`block h-px bg-ivoire-200 transition-all duration-200 ${menuAberto ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-px bg-ivoire-200 transition-all duration-200 ${menuAberto ? 'opacity-0' : ''}`} />
                <span className={`block h-px bg-ivoire-200 transition-all duration-200 ${menuAberto ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Nav mobile — dropdown */}
          {menuAberto && (
            <nav className="md:hidden border-t border-white/10 py-2 flex flex-col gap-0.5">
              {LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuAberto(false)}
                  className={`px-3 py-2.5 text-xs tracking-widest uppercase font-sans transition-colors ${
                    pathname === l.href
                      ? 'bg-white/10 text-ivoire-100'
                      : 'text-ivoire-300 hover:text-ivoire-100'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <button
                onClick={() => { setMenuAberto(false); sair() }}
                className="text-left px-3 py-2.5 text-xs text-ivoire-400 hover:text-ivoire-100 tracking-widest uppercase font-sans transition-colors border-t border-white/10 mt-1"
              >
                Sair
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-5 py-6">
        {children}
      </main>
    </div>
  )
}
