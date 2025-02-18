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
import { IncidentStatusChart } from '@/components/dashboard/incidentStatus-chart'




const IncidentStatusChartdata = [
  { category: "Mpesa-dxl", Open: 3, Inprogress: 1, Closed: 7 },
  { category: "Bigdata", Open: 4, Inprogress: 1, Closed: 9 },
  { category: "Tibco", Open: 3, Inprogress: 1, Closed: 4 },
];


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
            <IncidentStatusChart data={IncidentStatusChartdata} />
            <SeverityChart data={data?.incidentsPerSeverity} loading = {loading}/>
          </div>
        </div>
      </main>
    </div>
    </MainLayout>
  )
}
