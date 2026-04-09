'use client'

import { useEffect, useRef, useState } from 'react'
import type { Pedido } from '@/types/pedido'

// ─── ToastRealtime via polling autenticado ──────────────────────────────────
// Versão anterior usava Supabase Realtime com anon key (pública), o que expunha
// dados de clientes a qualquer pessoa com a chave. O polling bate em /api/pedidos
// que exige cookie de admin — seguro por design.
// Intervalo: 30s (balanceia UX vs carga de API).

interface Toast {
  id: string
  pedido: Pedido
}

interface Props {
  onNovoPedido: (pedido: Pedido) => void
}

const INTERVALO_MS = 30_000

export default function ToastRealtime({ onNovoPedido }: Props) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const ultimoIdRef = useRef<string | null>(null)

  useEffect(() => {
    async function checar() {
      try {
        const res = await fetch('/api/pedidos', { credentials: 'include' })
        if (!res.ok) return
        const pedidos: Pedido[] = await res.json()
        if (!Array.isArray(pedidos) || pedidos.length === 0) return

        const maisRecente = pedidos[0]

        // Inicializa o cursor sem disparar toast na primeira carga
        if (ultimoIdRef.current === null) {
          ultimoIdRef.current = maisRecente.id
          return
        }

        // Novo pedido detectado
        if (maisRecente.id !== ultimoIdRef.current) {
          ultimoIdRef.current = maisRecente.id
          const toast: Toast = { id: `${Date.now()}`, pedido: maisRecente }
          setToasts(prev => [...prev, toast])
          onNovoPedido(maisRecente)
          setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== toast.id))
          }, 6000)
        }
      } catch {
        // falha silenciosa — não quebra o painel
      }
    }

    checar()
    const intervalo = setInterval(checar, INTERVALO_MS)
    return () => clearInterval(intervalo)
  }, [onNovoPedido])

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="bg-onix-800 text-ivoire-100 border border-onix-600 shadow-lg px-5 py-4 w-72 pointer-events-auto"
          style={{ animation: 'slide-in 0.3s ease-out' }}
        >
          <div className="flex items-start gap-3">
            <span className="text-ouro-400 text-lg flex-shrink-0">◆</span>
            <div>
              <p className="text-xs tracking-widest uppercase font-sans text-ouro-300 mb-1">
                Novo pedido!
              </p>
              <p className="text-sm font-sans font-medium">{toast.pedido.nome}</p>
              <p className="text-xs text-ivoire-400 font-sans mt-0.5">
                R$ {Number(toast.pedido.total).toFixed(2).replace('.', ',')} · {toast.pedido.whatsapp}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
