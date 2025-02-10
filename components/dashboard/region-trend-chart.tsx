"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts"

interface TrendData {
  hour: string
  addisAbaba: number
  somali: number
  amhara: number
}

const trendData: TrendData[] = [
  { hour: "1hr", addisAbaba: 34, somali: 45, amhara: 30 },
  { hour: "2hr", addisAbaba: 45, somali: 35, amhara: 40 },
  { hour: "3hr", addisAbaba: 55, somali: 63, amhara: 45 },
  { hour: "4hr", addisAbaba: 48, somali: 52, amhara: 50 },
  { hour: "5h4", addisAbaba: 52, somali: 48, amhara: 55 },
  { hour: "6hr", addisAbaba: 58, somali: 55, amhara: 79 },
]

const CustomizedLabel = ({ x, y, value }: { x?: number; y?: number; value?: number }) => {
  if (value === 34 || value === 63 || value === 79) {
    return (
      <text x={x} y={y! - 10} fill="#666" textAnchor="middle" fontSize={12}>
        {value}%
      </text>
    )
  }
  return null
}

export function RegionTrendChart() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Regional Site Performance Trends</h3>
      </CardHeader>
      <CardBody>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis>
                <Label value="Performance (%)" angle={-90} position="insideLeft" style={{ textAnchor: "middle" }} />
              </YAxis>
              <Tooltip formatter={(value: number) => [`${value}%`]} labelStyle={{ color: "#666" }} />
              <Line
                type="monotone"
                dataKey="addisAbaba"
                stroke="#ff4d4f"
                strokeWidth={2}
                dot={{ r: 4 }}
                label={<CustomizedLabel />}
                name="Addis Ababa"
              />
              <Line
                type="monotone"
                dataKey="somali"
                stroke="#1890ff"
                strokeWidth={2}
                dot={{ r: 4 }}
                label={<CustomizedLabel />}
                name="Somali"
              />
              <Line
                type="monotone"
                dataKey="amhara"
                stroke="#faad14"
                strokeWidth={2}
                dot={{ r: 4 }}
                label={<CustomizedLabel />}
                name="Amhara"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff4d4f]" />
            <span className="text-sm">Addis Ababa</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1890ff]" />
            <span className="text-sm">Somali</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#faad14]" />
            <span className="text-sm">Amhara</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

