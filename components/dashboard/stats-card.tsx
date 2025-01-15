import { Card, CardBody } from "@nextui-org/react"

interface StatsCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  className?: string
}

export function StatsCard({ icon, label, value, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardBody className="flex flex-row items-center gap-4">
        <div className="rounded-full p-2 bg-default-100">{icon}</div>
        <div>
          <p className="text-sm text-default-500">{label}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardBody>
    </Card>
  )
}

