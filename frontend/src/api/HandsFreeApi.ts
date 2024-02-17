import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_URL } from '../config';

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> { }
}

abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });

        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _handleResponse = ({ data }: AxiosResponse) => data;

    protected _handleError = (error: any) => Promise.reject(error);
}

export class MainApi extends HttpClient {
    private static classInstance?: MainApi;

    private constructor() {
        super(API_URL);
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new MainApi();
        }

        return this.classInstance;
    }

    public getApi = () => this.instance.get<any>(`/api/`);
}
