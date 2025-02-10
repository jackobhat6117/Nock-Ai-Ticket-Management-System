import MainLayout from '@/components/common/main'
import { IncidentTable } from '@/components/ui/tables/incident-table'
import React from 'react'

const incidents = [
    {
      incidentId: "INC-00000000001",
      severity: "p1",
      assignedPerson: "eyob teklu",
      incidentCreationTime: "2025-02-06T12:48:02.944Z",
      incidentCloseTime: null,
      alarmStartTime: "2025-02-06T12:48:02.944Z",
      alarmEndTime: null,
      alarmDescription: "mini-app-pod is down",
      RCA: null,
      Note: null,
      department: "mpesa-dxl",
      alarmStatus: "open",
    },
    {
      incidentId: "INC-00000000002",
      severity: "p2",
      assignedPerson: "eyobed feleke",
      incidentCreationTime: "2025-02-06T12:48:02.944Z",
      incidentCloseTime: "2025-02-06T13:48:02.944Z",
      alarmStartTime: "2025-02-06T12:48:02.944Z",
      alarmEndTime: "2025-02-06T13:48:02.944Z",
      alarmDescription: "airtime-advance-service has error logs",
      RCA: "Investigated logs, identified a timeout issue.",
      Note: "Resolved by restarting the service.",
      department: "bigdata",
      alarmStatus: "closed",
    },
    {
      incidentId: "INC-00000000003",
      severity: "p3",
      assignedPerson: "hawi kebebew",
      incidentCreationTime: "2025-02-06T09:48:02.944Z",
      incidentCloseTime: null,
      alarmStartTime: "2025-02-06T09:48:02.944Z",
      alarmEndTime: null,
      alarmDescription: "simbox service is not working",
      RCA: null,
      Note: null,
      department: "bigdata",
      alarmStatus: "open",
    },
    {
      incidentId: "INC-00000000004",
      severity: "p1",
      assignedPerson: "sara jones",
      incidentCreationTime: "2025-02-07T10:00:00.000Z",
      incidentCloseTime: null,
      alarmStartTime: "2025-02-07T10:00:00.000Z",
      alarmEndTime: null,
      alarmDescription: "router malfunction detected",
      RCA: null,
      Note: null,
      department: "network",
      alarmStatus: "open",
    },
    {
      incidentId: "INC-00000000005",
      severity: "p2",
      assignedPerson: "john doe",
      incidentCreationTime: "2025-02-07T11:30:00.000Z",
      incidentCloseTime: "2025-02-07T12:00:00.000Z",
      alarmStartTime: "2025-02-07T11:30:00.000Z",
      alarmEndTime: "2025-02-07T12:00:00.000Z",
      alarmDescription: "database connection timeout",
      RCA: "Network issues caused temporary downtime.",
      Note: "Increased database connection pool.",
      department: "database",
      alarmStatus: "closed",
    },
    {
      incidentId: "INC-00000000006",
      severity: "p3",
      assignedPerson: "lisa smith",
      incidentCreationTime: "2025-02-07T14:00:00.000Z",
      incidentCloseTime: null,
      alarmStartTime: "2025-02-07T14:00:00.000Z",
      alarmEndTime: null,
      alarmDescription: "payment gateway is down",
      RCA: null,
      Note: null,
      department: "mpesa-dxl",
      alarmStatus: "open",
    },
    {
      incidentId: "INC-00000000007",
      severity: "p1",
      assignedPerson: "mike brown",
      incidentCreationTime: "2025-02-07T15:00:00.000Z",
      incidentCloseTime: "2025-02-07T15:30:00.000Z",
      alarmStartTime: "2025-02-07T15:00:00.000Z",
      alarmEndTime: "2025-02-07T15:30:00.000Z",
      alarmDescription: "urgent support needed for client issue",
      RCA: "Client reported issues with service access.",
      Note: "Issue resolved by providing additional resources.",
      department: "support",
      alarmStatus: "closed",
    },
  ]

const page = () => {
  return (
   <MainLayout pageTitle="Dashboard">
         <div className="flex min-h-screen">
           <main className="flex-1 pl-64">
             <div className="container mx-auto p-6 space-y-8">
             <h1 className="text-2xl font-bold mb-4">NOC Site Dashboard</h1>
             <IncidentTable incidents={incidents} />
             </div>
           </main>
         </div>
       </MainLayout>
  )
}

export default page