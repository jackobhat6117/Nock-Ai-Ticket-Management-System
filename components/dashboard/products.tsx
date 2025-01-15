"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { ProductSale } from "@/types/dashboard"

interface ProductsChartProps {
  data: ProductSale[]
}

export function ProductsChart({ data }: ProductsChartProps) {
  return (
    <Card>
      <CardHeader className="font-bold text-lg">Best Selling Products</CardHeader>
      <CardBody>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}

