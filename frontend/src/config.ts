export const ENV = process.env.NODE_ENV || 'development';
export const API_URL: any = ENV === 'production' ? undefined : 'http://localhost:4000/api/v1'
export const SOCKET_URL: any = ENV === 'production' ? undefined : 'http://localhost:4000/'

