import axios, { type InternalAxiosRequestConfig } from 'axios'

import { API_URL_WITH_PREFIX } from '@/constants/api-url'
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/constants/local-storage'

export const protectedApi = axios.create({
  baseURL: API_URL_WITH_PREFIX,
})

export const publicApi = axios.create({
  baseURL: API_URL_WITH_PREFIX,
})

protectedApi.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  if (!accessToken) return request
  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})
