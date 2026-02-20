import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function ContabilidadePage() {
  // Mock data
  const clinics = [
    { id: 1, name: 'Clínica Dr. Silva', invoices: 24, total: 18400, month: 'Fevereiro 2026' },
    { id: 2, name: 'Consultório Dra. Maria', invoices: 18, total: 12600, month: 'Fevereiro 2026' },
    { id: 3, name: 'Centro Médico São José', invoices: 32, total: 25800, month: 'Fevereiro 2026' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel Contábil</h1>
          <p className="mt-2 text-gray-600">
            Visão consolidada de todas as clínicas gerenciadas
          </p>
        </div>
        <Button>Exportar Relatório Geral</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Clínicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary-500">{clinics.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Notas Emitidas (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary-500">
              {clinics.reduce((acc, c) => acc + c.invoices, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Faturamento Total (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary-500">
              R$ {clinics.reduce((acc, c) => acc + c.total, 0).toLocaleString('pt-BR')}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clínicas Gerenciadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clinics.map((clinic) => (
              <div key={clinic.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{clinic.name}</h3>
                    <p className="text-sm text-gray-500">{clinic.month}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                    <Button variant="primary" size="sm">
                      Gerar PDF Mensal
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Notas Emitidas</p>
                    <p className="text-xl font-bold text-primary-500">{clinic.invoices}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Faturamento</p>
                    <p className="text-xl font-bold text-primary-500">
                      R$ {clinic.total.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Impostos</p>
                    <p className="text-xl font-bold text-primary-500">
                      R$ {(clinic.total * 0.07).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
