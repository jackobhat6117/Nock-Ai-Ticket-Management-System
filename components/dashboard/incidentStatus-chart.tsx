// "use client";

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
// import { Card, CardBody, CardHeader } from "@nextui-org/react";

// export function WeeklyChart({ data }: any) {
//   return (
//     <Card>
//       <CardHeader className="font-bold text-lg">Weekly Metrics</CardHeader>
//       <CardBody>
//         <div className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="Open" fill="#10b981" />
//               <Bar dataKey="Inprogress" fill="#3b82f6" />
//               <Bar dataKey="Closed" fill="#ef4444" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardBody>
//     </Card>
//   );
// }

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export function IncidentStatusChart({ data  }: any) {
  return (
    <Card>
      <CardHeader className="font-bold text-lg">Incident Status Overview</CardHeader>
      <CardBody>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Open" stackId="a" fill="#10b981"  />
              <Bar dataKey="Inprogress" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Closed" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}
