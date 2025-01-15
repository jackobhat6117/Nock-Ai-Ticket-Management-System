import { SalesStats } from "@/types/dashboard"
import { Card, CardBody, CardHeader } from "@nextui-org/react"


interface SalesCardProps {
  title: string
  stats: SalesStats
}

export function SalesCard({ title, stats }: SalesCardProps) {
  return (
    <Card>
      <CardHeader className="font-bold text-lg">{title}</CardHeader>
      <CardBody>
        <div className="text-2xl font-bold mb-4">€{stats.amount.toFixed(2)}</div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-default-500">Cash:</p>
            <p>€{stats.cash.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-default-500">Card:</p>
            <p>€{stats.card.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-default-500">Credit:</p>
            <p>€{stats.credit.toFixed(2)}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

