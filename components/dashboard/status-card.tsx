import { IncidentStatus } from "@/types/dashboard";
import { Card, CardBody } from "@nextui-org/react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: IncidentStatus[] | undefined;
  className?: string;
  loading?: boolean
}

export function StatusCard({ icon, label, value, className, loading }: StatsCardProps) {
  console.log("value", value);

  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {value?.map((status: IncidentStatus, index: number) => (
        <Card key={index} className="w-full">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="rounded-full p-2 bg-default-100">{icon}</div>
            <div>
              <p className="text-sm text-default-500">{status.ticketStatus}</p>
              <h3 className="text-2xl font-bold">{status.count}</h3> 
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
