import { ApiResponse } from "./apiResponse"


export interface Alarm extends ApiResponse {
    
           alarmName:string,
           severity:"p1" | "p2" | "p3"
           department:string
           assignedPerson:string
           ticketId:string
           alarmStatus:"open" | "closed"
           alarmDescription:string
           alarmStartDate:string
           alarmEndDate:string | null
}