import axios from 'axios'
import {IStoneType} from '../model/StoneTypeModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_STONE_TYPE = `${API_URL}/stone-type/v2`
export const POST_STONE_TYPE = `${API_URL}/stone-type/v2`
export const PUT_STONE_TYPE = `${API_URL}/stone-type/v2/`
export const DELETE_STONE_TYPE = `${API_URL}/stone-type/v2/`

export function fetchAllStoneType() {
  return axios.get<IStoneType[]>(GET_STONE_TYPE)
}

export function sendStoneType(sampleType: IStoneType) {
  return axios.post(POST_STONE_TYPE, {
    stone_type_code: sampleType.stone_type_code,
    stone_type_name: sampleType.stone_type_name,
    stone_code: sampleType.stone_code === '' ? '-' : sampleType.stone_code,
  })
}

export function putStoneType(sampleType: IStoneType) {
  return axios.put(PUT_STONE_TYPE + sampleType.stone_type_code, {
    stone_type_name: sampleType.stone_type_name,
    stone_code: sampleType.stone_code,
  })
}

export function deleteStoneType(sampleType: IStoneType) {
  return axios.delete(DELETE_STONE_TYPE + sampleType.stone_type_code)
}
