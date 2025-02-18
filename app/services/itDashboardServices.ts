import { useState } from "react";
import { getRequest } from "@/utils/axiosHelper";
import { Incident } from "@/types/incident";
import { ApiResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";
import { getSession } from "next-auth/react";
import { setAuthtoken } from "@/utils/axiosInstance";
import { IncidentDepartment, IncidentSeverity, IncidentStatus } from "@/types/dashboard";

interface ApiErrorResponse {
  message: string;
  code?: number;
}

type AxiosErrorResponse = AxiosError<ApiErrorResponse>;

export const useIncidetTicketDashbaord = () => {
  const [data, setData] = useState<{
    incidentsPerStatus?: IncidentStatus[];
    incidentsPerDepartment?: IncidentDepartment[];
    incidentsPerSeverity?: IncidentSeverity[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    
    setError(null);
    try {
      const session: any = await getSession();
      const token = session?.accessToken;

      if (token) {
        setAuthtoken(token);
      } else {
        setAuthtoken(null);
      }

      // Define the endpoints to fetch
      const endpoints = [
        {
          key: "incidentsPerStatus",
          url: "/incidentTicket/allIncidentTicketStatus",
        },
        {
          key: "incidentsPerDepartment",
          url: "/incidentTicket/allIncidentTicketDepartment",
        },
        {
          key: "incidentsPerSeverity",
          url: "/incidentTicket/allIncidentTicketSeverity",
        },
      ];

      
      setLoading(true);
      const results = await Promise.allSettled(
        endpoints.map((endpoint) =>
          getRequest<ApiResponse<IncidentStatus[] | IncidentDepartment[] | IncidentSeverity[]>>({ url: endpoint.url })
        )
      );

     
      const dashboardData: {
        incidentsPerStatus?: IncidentStatus[];
        incidentsPerDepartment?: IncidentDepartment[];
        incidentsPerSeverity?: IncidentSeverity[];
      } | any = {} ;
      const errors: string[] = [];
      console.log('resultit', results)
      results.forEach((result, index) => {
        console.log('innerres', result)
        console.log('innerind', index)
        const { key} = endpoints[index];
        if (result.status === "fulfilled") {
          dashboardData[key] = result.value; 
          console.log('dashboard', dashboardData)
        } else {
          errors.push(`Failed to fetch ${key}: ${result.reason.message}`);
        }
      });

      if (errors.length > 0) {
        setError(errors.join(", ")); 
      }

      setData(dashboardData); 
      return dashboardData;
    } catch (err) {
      const axiosError = err as AxiosErrorResponse;
      setError(axiosError.response?.data?.message || axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchDashboardData };
};