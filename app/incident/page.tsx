'use client'
import MainLayout from '@/components/common/main'
import { IncidentTable } from '@/components/ui/tables/incident-table'
import React, { useEffect, useState } from 'react'
import { useIncidentServices } from '../services/incidentServices'
import { Incident } from '@/types/incident'
import { ApiResponse } from '@/types/apiResponse'

const Page = () => {
  const { loading, error, getIncidents } = useIncidentServices()
  const [incidents, setIncidents] = useState<Incident[]>([])

  const getIncidentData = async () => {
    try {
      const response:any = await getIncidents()
      setIncidents(response)
    } catch (err) {
      console.error('Failed to fetch incidents:', err)
    }
  }

  useEffect(() => {
    getIncidentData()
  }, [])

  return (
    <MainLayout pageTitle="Dashboard">
      <div className="flex min-h-screen">
        <main className="flex-1 pl-64">
          <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold mb-4">Incident Tickets</h1>
            <IncidentTable incidents={incidents} loading={loading} error={error} />
          </div>
        </main>
      </div>
    </MainLayout>
  )
}

export default Page