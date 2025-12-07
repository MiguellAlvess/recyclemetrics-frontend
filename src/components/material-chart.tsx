import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

type MaterialChartData = {
  materialLabel: string
  quantity: number
}

const chartConfig = {
  quantity: {
    label: 'Quantidade de produtos',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig

interface MaterialChartProps {
  data: MaterialChartData[]
  className?: string
}

const MaterialChart = ({ data, className }: MaterialChartProps) => {
  const hasData = data && data.length > 0

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Tipos de materiais</CardTitle>
        <CardDescription>
          Comparativo dos materiais das compras dos últimos 30 dias
        </CardDescription>
      </CardHeader>
      <CardContent className="py-3">
        {hasData ? (
          <ChartContainer config={chartConfig} className="h-[260px] w-full">
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="materialLabel"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="quantity"
                fill="hsl(var(--primary))"
                radius={8}
                className="transition-all hover:opacity-80"
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[260px] flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Nenhuma compra registrada nos últimos 30 dias.
            </p>
            <p className="text-xs text-muted-foreground">
              Assim que você cadastrar uma compra, o gráfico será exibido aqui.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 pb-3 pt-5 text-xs">
        <div className="flex items-center gap-2 font-medium leading-none">
          Panorama dos materiais comprados
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <div className="leading-none text-muted-foreground">
          Quantidade de produtos por tipo de material nas compras registradas
          nos últimos 30 dias.
        </div>
      </CardFooter>
    </Card>
  )
}

export default MaterialChart
