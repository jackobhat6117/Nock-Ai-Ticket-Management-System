'use client'
import MainLayout from '@/components/common/main'
import { IncidentTable } from '@/components/ui/tables/incident-table'
import React, { useEffect, useState } from 'react'
import { useIncidentServices } from '../services/incidentServices'
import { Incident } from '@/types/incident'
import { ApiResponse } from '@/types/apiResponse'
import { Alarm } from '@/types/alarm'
import { AlarmTable } from '@/components/ui/tables/alarm-table'
import { useAlarmService } from '../services/alarmServices'

const Page = () => {
  const { loading, error, getAlarm } = useAlarmService()
  const [alarms, setAlarms] = useState<Alarm[]>([])

  console.log('alarmsPage', alarms.flat())

  const getAlarmData = async () => {
    try {
      const response:any = await getAlarm()
      setAlarms(response.flat())
    } catch (err) {
      console.error('Failed to fetch incidents:', err)
    }
  }

  useEffect(() => {
    getAlarmData()
  }, [])

  return (
    <MainLayout pageTitle="Dashboard">
      <div className="flex min-h-screen">
        <main className="flex-1 pl-64">
          <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold mb-4">NOC Site Dashboard</h1>
            <AlarmTable alarms={alarms} loading={loading} error={error} />
          </div>
        </main>
      </div>
    </MainLayout>
  )
}

export default Page