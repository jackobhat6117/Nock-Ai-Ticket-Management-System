import { useState } from "react";
import { getRequest, postRequest } from "@/utils/axiosHelper";
import { Incident } from "@/types/incident";
import { ApiResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
  code?: number;
}

type AxiosErrorResponse = AxiosError<ApiErrorResponse>;

export const useIncidentServices = () => {
    const [data, setData] = useState<Incident[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

        const getIncidents = async () => {
            setLoading(true);
            setError(null);
            try {
            const response = await getRequest<ApiResponse<Incident[]>>({ url: "/incidents" });
            setData(response.data)
            } catch (err) {
            const axiosError = err as AxiosErrorResponse;
            setError(axiosError.response?.data?.message || axiosError.message);
            } finally {
            setLoading(false);
            }
        };

        const createIncidents = async(incidentData:any) => {
                setLoading(true)
                setError(null);
                try {
                    const response  = await postRequest<ApiResponse<Incident[]>>({url: "/createIncident",data: incidentData})
                    setData(response.data)
                    return response

                }catch(error){
                    const axiosError = error as AxiosErrorResponse;
                    setError(axiosError.response?.data?.message || axiosError.message);
                }finally{
                    setLoading(false)
                }

        }

  return { data, loading, error, getIncidents, createIncidents };
};