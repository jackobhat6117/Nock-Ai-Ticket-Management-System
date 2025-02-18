import { useState } from "react";
import { getRequest, postRequest } from "@/utils/axiosHelper";
import { Incident } from "@/types/incident";
import { ApiResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";
import { getSession } from "next-auth/react";
import { setAuthtoken } from "@/utils/axiosInstance";

interface ApiErrorResponse {
  message: string;
  code?: number;
}

type AxiosErrorResponse = AxiosError<ApiErrorResponse>;

export const useIncidentServices = () => {
  const [data, setData] = useState<Incident[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // incidentService.ts
const getIncidents = async () => {
    setLoading(true);
    setError(null);
    try {
      const session: any = await getSession();
    
      const token = session?.accessToken;
    
  
      if (token) {
        setAuthtoken(token);
      } else {
        setAuthtoken(null);
      }
  
      const response = await getRequest<ApiResponse<Incident[]>>({
        url: "/incidentTicket/allIncidentTicket",
      });
      console.log("API Response:", response); // Log the API response
  
      setData(response.data);
      return response;
    } catch (err) {
      const axiosError = err as AxiosErrorResponse;
      setError(axiosError.response?.data?.message || axiosError.message);
    } finally {
      setLoading(false);
    }
  };
  const createIncidents = async (incidentData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postRequest<ApiResponse<Incident[]>>({
        url: "/incidentTicket/addIncidentTicket",
        data: incidentData,
      });
      setData(response.data);
      return response;
    } catch (error) {
      const axiosError = error as AxiosErrorResponse;
      setError(axiosError.response?.data?.message || axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getIncidents, createIncidents };
};
