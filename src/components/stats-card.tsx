import { Archive, MapPinHouse, Recycle, ShoppingBasket } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatsCardsProps {
  totalPurchase: number | null
  totalDisposals: number
  recyclingPercentage: number
  mostUsedDestination: string
}

const StatsCards = ({
  totalPurchase,
  totalDisposals,
  recyclingPercentage,
  mostUsedDestination,
}: StatsCardsProps) => {
  const stats = [
    {
      title: 'Total de compras',
      value: totalPurchase,
      icon: ShoppingBasket,
    },
    {
      title: 'Total de descartes',
      value: totalDisposals.toString(),
      icon: Archive,
    },
    {
      title: 'Porcentagem de reciclagem',
      value: recyclingPercentage.toString(),
      icon: Recycle,
    },
    {
      title: 'Destino mais usado',
      value: mostUsedDestination,
      icon: MapPinHouse,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="gap-2">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-medium">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default StatsCards
