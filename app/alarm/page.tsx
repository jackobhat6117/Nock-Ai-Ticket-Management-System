'use client'
import MainLayout from '@/components/common/main'
import React, { useEffect, useState } from 'react'
import { Alarm } from '@/types/alarm'
import { AlarmTable } from '@/components/ui/tables/alarm-table'
import { useAlarmService } from '../services/alarmServices'

const Page = () => {
  const { loading, error, getAlarm } = useAlarmService()
  const [alarms, setAlarms] = useState<Alarm[] | any>([] )

  console.log('alarmsPage', alarms.flat())

  const getAlarmData = async () => {
    try {
      const response = await getAlarm()
      setAlarms(response)
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
            <h1 className="text-2xl font-bold mb-4">Alarm Tickets</h1>
            <AlarmTable alarms={alarms} loading={loading} error={error} />
          </div>
        </main>
      </div>
    </MainLayout>
  )
}

export default Page