import axios from 'axios'
import {IMaterialType} from '../model/MaterialTypeModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_MATERIAL_TYPE = `${API_URL}/material/v2`
export const POST_MATERIAL_TYPE = `${API_URL}/material/v2`
export const PUT_MATERIAL_TYPE = `${API_URL}/material/v2/`
export const DELETE_MATERIAL_TYPE = `${API_URL}/material/v2/`

export function fetchAllMaterialType() {
  return axios.get<IMaterialType[]>(GET_MATERIAL_TYPE)
}

export function sendMaterialType(sampleType: IMaterialType) {
  return axios.post(POST_MATERIAL_TYPE, {
    material_type_code: sampleType.material_type_code,
    material_type_name: sampleType.material_type_name,
    item_code: sampleType.item_code === '' ? '-' : sampleType.item_code,
  })
}

export function putMaterialType(sampleType: IMaterialType) {
  return axios.put(PUT_MATERIAL_TYPE + sampleType.material_type_code, {
    material_type_name: sampleType.material_type_name,
    item_code: sampleType.item_code,
  })
}

export function deleteMaterialType(sampleType: IMaterialType) {
  return axios.delete(DELETE_MATERIAL_TYPE + sampleType.material_type_code)
}
