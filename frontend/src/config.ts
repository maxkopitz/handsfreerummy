export const ENV = process.env.NODE_ENV || 'development';
export const API_URL: any = ENV === 'production' ? undefined : '/api'

