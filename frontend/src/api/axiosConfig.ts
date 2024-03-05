import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../config';

export const axiosConfig: AxiosRequestConfig = {
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}

const axiosInstance = axios.create(axiosConfig);
export default axiosInstance;
