import { IncidentDepartment } from "@/types/dashboard";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";

interface DepartmentCardProps {
  value: IncidentDepartment[] | undefined;
  loading?: boolean;
}

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function DepartmentCard({ value = [], loading }: DepartmentCardProps) {
  console.log("values", value);

  const cardContent = (department?: IncidentDepartment) => (
    <Card className="w-full">
      <CardHeader className="font-bold text-lg">
        {loading ? <Skeleton className="h-6 w-3/4 rounded-lg" /> : capitalizeFirstLetter(department?.department || "N/A")}
      </CardHeader>
      <CardBody>
        <div className="text-2xl font-bold mb-4">
          {loading ? <Skeleton className="h-8 w-1/2 rounded-lg" /> : 8}
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          {["Open", "Inprogress", "Closed"].map((status, i) => (
            <div key={i}>
              <p className="text-sm text-default-500">{status}</p>
              {loading ? (
                <Skeleton className="h-6 w-1/2 rounded-lg mt-2" />
              ) : (
                <p className="text-xl font-bold">
                  {status === "Open" ? department?.open || 0 : 
                   status === "Inprogress" ? department?.inprogress || 0 : 
                   department?.closed || 0}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {(loading || value.length === 0)
        ? Array.from({ length: 3 }).map((_, index) => <div key={index}>{cardContent()}</div>)
        : value.map((department, index) => <div key={index}>{cardContent(department)}</div>)}
    </div>
  );
}
