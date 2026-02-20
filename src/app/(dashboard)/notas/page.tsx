import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function NotasPage() {
  // Mock data - will be replaced with real data from Supabase
  const invoices = [
    {
      id: 1,
      number: '1234',
      clientName: 'João Silva',
      serviceValue: 300,
      netValue: 279,
      issuedAt: '2026-02-15',
      status: 'emitida',
    },
    {
      id: 2,
      number: '1235',
      clientName: 'Maria Santos',
      serviceValue: 450,
      netValue: 418.50,
      issuedAt: '2026-02-16',
      status: 'emitida',
    },
    {
      id: 3,
      number: '1236',
      clientName: 'Pedro Costa',
      serviceValue: 600,
      netValue: 558,
      issuedAt: '2026-02-17',
      status: 'cancelada',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Notas Fiscais</h1>
          <p className="mt-2 text-gray-600">
            Histórico completo de notas emitidas
          </p>
        </div>
        <Button>Exportar PDF</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Input type="date" label="Data Início" />
            <Input type="date" label="Data Fim" />
            <Input type="text" label="Cliente" placeholder="Nome do cliente..." />
            <Input type="text" label="Número NF" placeholder="1234..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Notas</CardTitle>
            <span className="text-sm text-gray-500">{invoices.length} nota(s) encontrada(s)</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Número</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Cliente</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-600">Valor Bruto</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-600">Valor Líquido</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">NFS-e #{invoice.number}</td>
                    <td className="py-3 px-4">{new Date(invoice.issuedAt).toLocaleDateString('pt-BR')}</td>
                    <td className="py-3 px-4">{invoice.clientName}</td>
                    <td className="py-3 px-4 text-right">R$ {invoice.serviceValue.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-semibold">R$ {invoice.netValue.toFixed(2)}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status === 'emitida' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-error/10 text-error'
                      }`}>
                        {invoice.status === 'emitida' ? '✓ Emitida' : '✗ Cancelada'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm">
                          Ver PDF
                        </Button>
                        <Button variant="ghost" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
