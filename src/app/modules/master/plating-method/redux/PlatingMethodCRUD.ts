import axios from 'axios'
import {IPlatingMethod} from '../model/PlatingMethodModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_PLATING_METHOD = `${API_URL}/plating-method/v2`
export const POST_PLATING_METHOD = `${API_URL}/plating-method/v2`
export const PUT_PLATING_METHOD = `${API_URL}/plating-method/v2/`
export const DELETE_PLATING_METHOD = `${API_URL}/plating-method/v2/`

export function fetchAllPlatingMethod() {
  return axios.get<IPlatingMethod[]>(GET_PLATING_METHOD)
}

export function sendPlatingMethod(sampleType: IPlatingMethod) {
  return axios.post(POST_PLATING_METHOD, {
    plating_method_code: sampleType.plating_method_code,
    plating_method_name: sampleType.plating_method_name,
  })
}

export function putPlatingMethod(sampleType: IPlatingMethod) {
  return axios.put(PUT_PLATING_METHOD + sampleType.plating_method_code, {
    plating_method_name: sampleType.plating_method_name,
  })
}

export function deletePlatingMethod(sampleType: IPlatingMethod) {
  return axios.delete(DELETE_PLATING_METHOD + sampleType.plating_method_code)
}
