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

export const description =
  'Bar chart comparando os tipos de materiais das compras nos últimos 30 dias'

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
}

const MaterialChart = ({ data }: MaterialChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipos de materiais</CardTitle>
        <CardDescription>
          Comparativo dos materiais das compras dos últimos 30 dias
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
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
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
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
