import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

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

type DestinationChartData = {
  destinationLabel: string
  quantity: number
}

const chartConfig = {
  quantity: {
    label: 'Quantidade de descartes',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig

interface DestinationChartProps {
  data: DestinationChartData[]
  className?: string
}

const DestinationChart = ({ data, className }: DestinationChartProps) => {
  const hasData = data && data.length > 0

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Destinos de descarte</CardTitle>
        <CardDescription>
          Comparativo dos destinos mais utilizados nos últimos 30 dias
        </CardDescription>
      </CardHeader>
      <CardContent className="py-1">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="mt-3 h-[260px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              barCategoryGap={12}
              margin={{
                left: 15,
                right: 16,
                top: 4,
                bottom: 4,
              }}
            >
              <XAxis type="number" dataKey="quantity" hide />
              <YAxis
                dataKey="destinationLabel"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={90}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
                formatter={(value) => [
                  'Quantidade de descartes: ',
                  ` ${value}`,
                ]}
              />
              <Bar
                dataKey="quantity"
                fill="hsl(var(--primary))"
                radius={5}
                className="transition-all hover:opacity-80"
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[220px] flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Nenhum descarte registrado nos últimos 30 dias.
            </p>
            <p className="text-xs text-muted-foreground">
              Assim que você cadastrar um descarte, os destinos aparecerão neste
              gráfico.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-1 flex-col items-start gap-1 pb-3 pt-5 text-xs">
        <div className="flex items-center gap-2 font-medium leading-none">
          Panorama dos destinos de descarte
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <div className="leading-none text-muted-foreground">
          Quantidade de descartes por destino nas últimas movimentações.
        </div>
      </CardFooter>
    </Card>
  )
}

export default DestinationChart
