import { ApiResponse } from "@/types/apiResponse";
import AxiosInstance from "./axiosInstance";
import { AxiosErrorResponse } from "@/types/apiError";

interface RequestParams {
    url: string,
    params?: Record<string, any>
}

interface DataParams {
    data?: Record<string, any> | FormData
}

export const getRequest = async <T>({url, params = {}}:RequestParams): Promise<ApiResponse | AxiosErrorResponse > => {
    try {
        const res = await AxiosInstance.get<ApiResponse>(url, {params})
        return res.data
    }catch(error){
        throw error
    }

}

export const postRequest = async<T>({url, data={}, params = {}}:RequestParams & DataParams): Promise<ApiResponse | AxiosErrorResponse > => {
     console.log('url',url)
     console.log('data',data)
    try {
       
        const res = await AxiosInstance.post(url, data, {params})
        console.log('res', res)
        return res
    } catch(error){
        throw error
    }
}
export const postFormDataRequest = async ({ url, data = {}, params = {} }:any ): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const res = await AxiosInstance.post(url, data, {
        params,
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      return res;
    } catch (err) {
      throw err;
    };
  };
  
  export const patchRequest = async <T>({ url, data = {}, params = {} }: any): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const res = await AxiosInstance.patch(url, data, { params });
      return res;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || err.message);
    }
  };
  
  export const patchFormDataRequest = async <T>({ url, data = {}, params = {} }: any): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const res = await AxiosInstance.patch(url, data, {
        params,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || err.message);
    }
  };

  export const putRequest = async <T>({ url, data = {}, params = {} }: any): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const res = await AxiosInstance.put(url, data, { params });
      return res;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || err.message);
    }
  };
  
  export const deleteRequest = async <T>({ url, params = {} }: any): Promise<ApiResponse | AxiosErrorResponse> => {
    try {
      const res = await AxiosInstance.delete(url, { params });
      return res;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || err.message);
    }
  };
  