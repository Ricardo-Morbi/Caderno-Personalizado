'use client'

// Error Boundary global — captura erros React em runtime.
// Previne que stack traces técnicos sejam exibidos ao usuário final.
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log interno — nunca expõe ao usuário
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ErrorBoundary]', error)
  }

  return (
    <div className="min-h-screen bg-ivoire-100 flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-10 h-px bg-ouro-400 mx-auto mb-8" />
        <h2 className="text-lg font-serif text-onix-700 mb-2">
          Algo deu errado
        </h2>
        <p className="text-sm text-onix-300 mb-8 leading-relaxed">
          Não foi possível carregar o configurador. Tente recarregar a página.
        </p>
        <button
          onClick={reset}
          className="text-xs tracking-widest uppercase font-sans border border-onix-300 px-6 py-3 text-onix-600 hover:border-onix-600 transition-colors duration-200"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
