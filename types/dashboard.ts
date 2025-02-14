export interface OrderStats {
    todayOrders: number
    ordersPending: number
    ordersProcessing: number
    ordersDelivered: number
  }
  
  export interface IncidentStatus {
    ticketStatus: "opent" | "inprogress" | "closed"
    count: number
   
  }
  
  export interface IncidentDepartment {
    department: "mpesa-dxl" | "bigdata" | "tibco"
    open: number
    inprogress: number
    closed: number
  }
  
  export interface IncidentSeverity {
    severity: "p0" | "p1" | "p2" | "p3" | "p4"
    open: number
    inprogress: number
    closed: number
  }
  
  