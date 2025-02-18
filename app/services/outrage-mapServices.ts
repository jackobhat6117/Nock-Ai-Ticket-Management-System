import { useState } from "react";
import { getRequest, postRequest } from "@/utils/axiosHelper";
import { Incident } from "@/types/incident";
import { ApiResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";
import { getSession } from "next-auth/react";
import { setAuthtoken } from "@/utils/axiosInstance";
import { SiteMap, TotalSiteStatusMap,  TotalStatusTable } from "@/types/siteData";

interface ApiErrorResponse {
  message: string;
  code?: number;
}

type AxiosErrorResponse = AxiosError<ApiErrorResponse>;

export const useSiteMapService = () => {
const [data, setData] = useState<{
  totalSiteStatusMap?: TotalSiteStatusMap[],
  totalStatusMapTable?: TotalStatusTable[]
  
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  
const getSiteMapData = async () => {
    
    setError(null);
    try {
      const session: any = await getSession();
    
      const token = session?.accessToken;
    
  
      if (token) {
        setAuthtoken(token);
      } else {
        setAuthtoken(null);
      }

      const endpoints = [
        {
          key: "totalSitesStatusMap",
          url: "/alarm/totalSitesStatusMap",
        },
        
        {
          key: "getSiteTotalStatusTable",
          url: "/alarm/getSiteTotalStatusTable",
        },
      ];

      setLoading(true);
      const response:any = await Promise.allSettled(
        endpoints.map((endpoint) => 
        getRequest<ApiResponse<TotalSiteStatusMap[] | TotalStatusTable[]>>({url: endpoint.url})
        )
      )
      console.log('sitedataserv', response)
      
      const mapsiteData : {
        totalSiteStatusMap?: TotalSiteStatusMap[],
        totalStatusMapTable?: TotalStatusTable[]
      } | any = {}
      const errors: string[] = [];
      response.forEach((result:any, index:number) => {
        const { key} = endpoints[index];
        if (result.status === "fulfilled"){
          mapsiteData[key] = result.value
        }
        else{
          errors.push(`Failed to fetch ${key}: ${result.reason.message}`);
        }
      })
      if (errors.length > 0) {
        setError(errors.join(", ")); 
      }
      console.log("API Response: site", response); 
  
      setData(mapsiteData);
      return mapsiteData;
    } catch (err) {
      const axiosError = err as AxiosErrorResponse;
      setError(axiosError.response?.data?.message || axiosError.message);
    } finally {
      setLoading(false);
    }
  };
 

 
  return { data, loading, error, getSiteMapData };
};