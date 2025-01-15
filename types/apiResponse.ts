import { AxiosResponse } from "axios";

export interface ApiResponse extends AxiosResponse<any, any> {
    data : {
        sucesss: boolean,
        message: string;
        status: number;
        data: any;
        
    }
}

