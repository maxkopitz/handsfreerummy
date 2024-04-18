export const ENV = process.env.NODE_ENV || 'development';
export const API_URL: any = ENV === 'production' ? undefined : 'http://localhost:4000/api/v1'
export const SOCKET_URL: any = ENV === 'production' ? undefined : 'ws://localhost:4000/'

export const AZURE_TRANSCRIBE_SUBSCRIPTION_KEY : string = process.env.REACT_APP_AZURE_TRANSCRIBE_SUBSCRIPTION_KEY || '';
export const AZURE_TRANSCRIBE_REGION : string = process.env.REACT_APP_AZURE_TRANSCRIBE_REGION || '';

