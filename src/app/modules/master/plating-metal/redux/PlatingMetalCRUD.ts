import axios from 'axios'
import {IPlatingMetal} from '../model/PlatingMetalModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_PLATING_METAL = `${API_URL}/plating-metal/v2`
export const POST_PLATING_METAL = `${API_URL}/plating-metal/v2`
export const PUT_PLATING_METAL = `${API_URL}/plating-metal/v2/`
export const DELETE_PLATING_METAL = `${API_URL}/plating-metal/v2/`

export function fetchAllPlatingMetal() {
  return axios.get<IPlatingMetal[]>(GET_PLATING_METAL)
}

export function sendPlatingMetal(sampleType: IPlatingMetal) {
  return axios.post(POST_PLATING_METAL, {
    plating_metal_code: sampleType.plating_metal_code,
    plating_metal_name: sampleType.plating_metal_name,
  })
}

export function putPlatingMetal(sampleType: IPlatingMetal) {
  return axios.put(PUT_PLATING_METAL + sampleType.plating_metal_code, {
    plating_metal_name: sampleType.plating_metal_name,
  })
}

export function deletePlatingMetal(sampleType: IPlatingMetal) {
  return axios.delete(DELETE_PLATING_METAL + sampleType.plating_metal_code)
}
