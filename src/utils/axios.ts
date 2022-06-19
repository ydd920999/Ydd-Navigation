import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
const service = axios.create();

// Request interceptors
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // do something
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
);

// Response interceptors
service.interceptors.response.use(
    async (response: AxiosResponse) => {
        console.log(response);

        // do something
    },
    (error: any) => {
        // do something
        return Promise.reject(error);
    }
);
const downFile = axios.create({
    // baseURL: process.env.VUE_APP_API_PREFIX,
    withCredentials: false,
    responseType: 'blob',
    headers: {
        'Content-Type': 'application/json'
        // clientId: 'saas_hr'
    }
});
export const downloader = async (
    url: string,
    resOpts: AxiosRequestConfig
): Promise<AxiosResponse<any>> => {
    const { method = 'get', data = '' } = resOpts;
    const queryArgs = {
        url,
        method,
        data
        // headers: {
        //     [userStore.tokenHeader]: userStore.token
        // }
    };
    return downFile.request(queryArgs);
};

export default service;
