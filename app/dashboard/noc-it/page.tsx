"use client"
import { useIncidetTicketDashbaord } from '@/app/services/itDashboardServices'
import MainLayout from '@/components/common/main'
import { SeverityChart } from '@/components/dashboard/serverityChart'
import { DepartmentCard } from '@/components/dashboard/department-card'
import { StatusCard } from '@/components/dashboard/status-card'

import { ShoppingCart, Clock, Package, Check } from 'lucide-react'
import { getSession, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { WeeklyChart } from '@/components/dashboard/weekly-chart'



const weeklySalesData = [
  { date: "Mon", sales: 1459.5, orders: 4 },
  { date: "Tue", sales: 1459.6, orders: 3 },
  { date: "Wed", sales: 1460.0, orders: 5 },
  { date: "Thu", sales: 1460.2, orders: 4 },
  { date: "Fri", sales: 1460.5, orders: 6 },
]

const productSalesData = [
  { name: "Green Leaf Lettuce", value: 45, color: "#10b981" },
  { name: "Huggies Diaper-Reg.Small", value: 25, color: "#3b82f6" },
  { name: "Clementine", value: 20, color: "#f97316" },
  { name: "Blueberry", value: 10, color: "#6366f1" },
]

export default function page() {
  const {data: session} = useSession()
 
  console.log('session', session)

  const { data, loading, error, fetchDashboardData } = useIncidetTicketDashbaord();

  
 

  useEffect(() => {
    fetchDashboardData()
  },[])

  console.log('dashboarddata', data)
  
  return (
    <MainLayout pageTitle='Dashboard' >

    <div className="flex min-h-screen">
      <main className="flex-1 pl-64">
        <div className="container mx-auto p-6 space-y-8">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          
         
            <StatusCard
              icon={<ShoppingCart className="h-5 w-5" />}
              label="Opened Task"
              value={data?.incidentsPerStatus}
              loading = {loading}
            />
          
            <DepartmentCard 
            value={data?.incidentsPerDepartment} 
            loading = {loading}/>
           

          <div className="grid gap-6 md:grid-cols-2">
            <WeeklyChart data={weeklySalesData} />
            <SeverityChart data={data?.incidentsPerSeverity} loading = {loading}/>
          </div>
        </div>
      </main>
    </div>
    </MainLayout>
  )
}
