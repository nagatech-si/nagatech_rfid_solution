import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import Swal from 'sweetalert2'

export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(onRequest, onRequestError)
  axios.interceptors.response.use(onResponse, onResponseError)
  axios.default.timeout = 10000
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: {accessToken},
      } = store.getState()

      if (accessToken) {
        config.headers['x-auth-token'] = accessToken
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export interface DefaultResponse<T> {
  status: string
  pesan: string
  data: T
  count: number
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // console.info(`[request] [${JSON.stringify(config)}]`)
  console.info(`[request] [${config.url}]`)
  console.info(`[request] [${config.method}]`)
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // console.error(`[request error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.info(`[response] [${JSON.stringify(response)}]`)
  return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`)
  if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
    // Jika error disebabkan oleh timeout
    Swal.fire({
      title: 'Timeout!',
      text: 'Request took too long! Please try again.',
      icon: 'error',
      heightAuto: false,
    })
  } else {
    Swal.fire({
      title: 'Failed!',
      text: error?.response?.data?.message || 'Error From Server',
      icon: 'error',
      heightAuto: false,
    })
  }
  return Promise.reject(error)
}
