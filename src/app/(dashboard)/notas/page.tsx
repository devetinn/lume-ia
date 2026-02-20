import { FileText, Download, CheckCircle, XCircle } from 'lucide-react'

export default function NotasPage() {
  const invoices = [
    { id: 1, number: '1234', client: 'João Silva', value: 300, net: 279, date: '2026-02-15', status: 'emitida' },
    { id: 2, number: '1235', client: 'Maria Santos', value: 450, net: 418.50, date: '2026-02-16', status: 'emitida' },
    { id: 3, number: '1236', client: 'Pedro Costa', value: 600, net: 558, date: '2026-02-17', status: 'cancelada' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Notas Fiscais</h1>
          <p className="mt-2 text-muted-foreground">Histórico completo de notas emitidas</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 flex items-center gap-2">
          <Download className="w-4 h-4" strokeWidth={1.5} />
          Exportar PDF
        </button>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-md border border-border/50 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Filtros</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Data Início</label>
            <input type="date" className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg text-foreground focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Data Fim</label>
            <input type="date" className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg text-foreground focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Cliente</label>
            <input type="text" placeholder="Nome do cliente..." className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground0 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Número NF</label>
            <input type="text" placeholder="1234..." className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-foreground0 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20" />
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-md border border-border/50 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Lista de Notas</h2>
          <span className="text-sm text-foreground0">{invoices.length} nota(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Número</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Data</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Cliente</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Valor Bruto</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Valor Líquido</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border hover:bg-zinc-800/30">
                  <td className="py-3 px-4 text-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-400" strokeWidth={1.5} />
                      #{inv.number}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-foreground">{new Date(inv.date).toLocaleDateString('pt-BR')}</td>
                  <td className="py-3 px-4 text-foreground">{inv.client}</td>
                  <td className="py-3 px-4 text-right text-foreground">R$ {inv.value.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-foreground font-semibold">R$ {inv.net.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      {inv.status === 'emitida' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle className="w-3 h-3" strokeWidth={2} />
                          Emitida
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                          <XCircle className="w-3 h-3" strokeWidth={2} />
                          Cancelada
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-zinc-800/50 rounded-lg">Ver PDF</button>
                      <button className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-zinc-800/50 rounded-lg">Detalhes</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
