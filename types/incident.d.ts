export interface Incident {
    incidentId: string
    severity: "p1" | "p2" | "p3" 
    assignedPerson: string
    incidentCreationTime: string
    incidentCloseTime: string | null
    alarmStartTime: string
    alarmEndTime: string | null
    alarmDescription: string
    RCA: string | null
    Note: string | null
    department: string
    alarmStatus: "open" | "closed"
  }
  
  