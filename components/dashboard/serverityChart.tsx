"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Card, CardBody, CardHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react"
import { IncidentSeverity } from "@/types/dashboard"



interface ChartData {
  name: string
  value: number
  color: string
}

const severityColors = {
  open: "#8884d8",
  inprogress: "#82ca9d",
  closed: "#ff8042"
}

interface SeverityChartProps {
  data: IncidentSeverity[] | undefined,
  loading?: boolean
}

export function SeverityChart({ data, loading }: SeverityChartProps) {
  const [selectedSeverity, setSelectedSeverity] = useState("p0")

  // Transform data for the selected severity
  const selectedData = data?.find(item => item.severity === selectedSeverity)
  const chartData: ChartData[] = selectedData ? [
    { name: "Open", value: selectedData.open, color: severityColors.open },
    { name: "In Progress", value: selectedData.inprogress, color: severityColors.inprogress },
    { name: "Closed", value: selectedData.closed, color: severityColors.closed }
  ] : []

  const noIssues = selectedData && selectedData.open === 0 && selectedData.inprogress === 0 && selectedData.closed === 0

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <span className="font-bold text-lg">Issue Severity Distribution</span>
        <Dropdown>
          <DropdownTrigger>
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-28">
              {selectedSeverity.toUpperCase()}
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Severity Selection"
            onAction={(key) => setSelectedSeverity(key as string)}
          >
            {(data || []).map(item => (
              <DropdownItem key={item.severity}>
                {item.severity.toUpperCase()}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody>
        <div className="h-[300px]">
          {noIssues ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No issues for {selectedSeverity.toUpperCase()}</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Display percentage instead of raw values
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip /> 
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

