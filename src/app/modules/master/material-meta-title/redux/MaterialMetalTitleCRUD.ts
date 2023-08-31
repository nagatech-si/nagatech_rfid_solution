import axios from 'axios'
import {IMaterialMetalTitle} from '../model/MaterialMetalTitleModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_MATERIAL_METAL_TITLE = `${API_URL}/material-metal-title/v2`
export const POST_MATERIAL_METAL_TITLE = `${API_URL}/material-metal-title/v2`
export const PUT_MATERIAL_METAL_TITLE = `${API_URL}/material-metal-title/v2/`
export const DELETE_MATERIAL_METAL_TITLE = `${API_URL}/material-metal-title/v2/`

export function fetchAllMaterialMetalTitle() {
  return axios.get<IMaterialMetalTitle[]>(GET_MATERIAL_METAL_TITLE)
}

export function sendMaterialMetalTitle(payload: IMaterialMetalTitle) {
  return axios.post(POST_MATERIAL_METAL_TITLE, {
    metal_title_code: payload.metal_title_code,
    metal_title_name: payload.metal_title_name,
    quote_data_price_code:
      payload.quote_data_price_code === '' ? '-' : payload.quote_data_price_code,
  })
}

export function putMaterialMetalTitle(payload: IMaterialMetalTitle) {
  return axios.put(PUT_MATERIAL_METAL_TITLE + payload.metal_title_code, {
    metal_title_name: payload.metal_title_name,
    quote_data_price_code: payload.quote_data_price_code,
  })
}

export function deleteMaterialMetalTitle(payload: IMaterialMetalTitle) {
  return axios.delete(DELETE_MATERIAL_METAL_TITLE + payload.metal_title_code)
}
