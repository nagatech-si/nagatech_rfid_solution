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
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // console.error(`[request error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const isIncluded = excludeEmptyListFromAxios.some((exclusion) =>
    response.config.url?.includes(exclusion)
  )

  if (isIncluded && Array.isArray(response.data) && response.data.length === 0) {
    Swal.fire({
      title: 'Oops!',
      text: `Looks like we've got an empty list here. 🤷‍♂️`,
      icon: 'error',
      heightAuto: false,
    })
  }
  return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`)
  if (error.response) {
    switch (error.response.status) {
      case 404:
        Swal.fire({
          title: 'Lost in Space!',
          text: `Looks like this page took a day off. Wanna try another link? 🚧`,
          icon: 'error',
          heightAuto: false,
        })
        break
      default:
        Swal.fire({
          title: 'Server Hiccup!',
          text:
            error?.response?.data?.message ||
            `Ah, our server seems to be in a mood today. 🙁\n[${generateErrorCode('ER')}] `,
          icon: 'error',
          heightAuto: false,
        })
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and
    // an instance of http.ClientRequest in node.js
    console.error('No response received:', error.request)
    Swal.fire({
      title: 'No Response!',
      text: `Dang, our server isn't responding. Could you check your connection and give it another go? 🌐\n[${generateErrorCode(
        'NR'
      )}]`,
      icon: 'error',
      heightAuto: false,
    })
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message)
    Swal.fire({
      title: 'Connection Trouble!',
      text: `Hmm, something hiccuped while we were trying to reach our server. Fancy trying again? 🔄\n[${generateErrorCode(
        'RP'
      )}]`,
      icon: 'error',
      heightAuto: false,
    })
  }
  if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
    // Jika error disebabkan oleh timeout
    Swal.fire({
      title: 'Taking Its Time!',
      text: `Whoa, it's taking a while to connect to our server. Maybe the internet's having a lazy day? 🐢`,
      icon: 'error',
      heightAuto: false,
    })
  }
  return Promise.reject(error)
}

function generateErrorCode(prefix: string) {
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = prefix

  for (let i = 0; i < 2; i++) {
    code += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length))
  }

  return code
}

const excludeEmptyListFromAxios = ['barang-report', 'stock-opname-report']
