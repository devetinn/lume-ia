import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Bem-vindo ao seu painel de controle fiscal
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Notas Este Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary-500">24</div>
            <p className="text-sm text-success mt-1">+12% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Faturamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary-500">R$ 18.400</div>
            <p className="text-sm text-success mt-1">+8% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Impostos Retidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary-500">R$ 1.288</div>
            <p className="text-sm text-gray-500 mt-1">7% do faturamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary-500">18</div>
            <p className="text-sm text-success mt-1">+3 novos este mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Emitir Nova Nota</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Use o Voice-to-Invoice para emitir notas rapidamente através de áudio
            </p>
            <Link href="/emissao">
              <Button className="w-full">
                🎤 Emitir com Áudio
              </Button>
            </Link>
            <Link href="/emissao/manual">
              <Button variant="outline" className="w-full">
                ✏️ Emitir Manualmente
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas Notas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">NFS-e #{1234 + i}</p>
                    <p className="text-sm text-gray-500">Cliente {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">R$ {(300 * i).toFixed(2)}</p>
                    <p className="text-sm text-success">Emitida</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/notas">
              <Button variant="ghost" className="w-full mt-4">
                Ver Todas
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
