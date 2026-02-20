import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ClientesPage() {
  // Mock data
  const clients = [
    {
      id: 1,
      name: 'João Silva',
      cpfCnpj: '123.456.789-00',
      email: 'joao@email.com',
      phone: '(85) 98765-4321',
      totalInvoices: 5,
      totalAmount: 1500,
    },
    {
      id: 2,
      name: 'Maria Santos',
      cpfCnpj: '987.654.321-00',
      email: 'maria@email.com',
      phone: '(85) 91234-5678',
      totalInvoices: 3,
      totalAmount: 900,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="mt-2 text-gray-600">
            Gerencie seus clientes e histórico de atendimentos
          </p>
        </div>
        <Button>+ Novo Cliente</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <Input 
            type="text" 
            placeholder="Digite o nome ou CPF/CNPJ do cliente..." 
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardHeader>
              <CardTitle className="text-lg">{client.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">CPF/CNPJ</p>
                <p className="font-medium">{client.cpfCnpj}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{client.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefone</p>
                <p className="font-medium">{client.phone}</p>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Notas</p>
                    <p className="text-xl font-bold text-primary-500">{client.totalInvoices}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xl font-bold text-primary-500">R$ {client.totalAmount}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Histórico
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
