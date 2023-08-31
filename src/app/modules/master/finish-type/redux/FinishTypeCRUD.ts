import axios from 'axios'
import {IFinishType} from '../model/FinishTypeModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_FINISH_TYPE = `${API_URL}/finish-type/v2`
export const POST_FINISH_TYPE = `${API_URL}/finish-type/v2`
export const PUT_FINISH_TYPE = `${API_URL}/finish-type/v2/`
export const DELETE_FINISH_TYPE = `${API_URL}/finish-type/v2/`

export function fetchAllFinishType() {
  return axios.get<IFinishType[]>(GET_FINISH_TYPE)
}

export function sendFinishType(sampleType: IFinishType) {
  return axios.post(POST_FINISH_TYPE, {
    finish_type_code: sampleType.finish_type_code,
    finish_type_name: sampleType.finish_type_name,
    item_code: sampleType.item_code === '' ? '-' : sampleType.item_code,
  })
}

export function putFinishType(sampleType: IFinishType) {
  return axios.put(PUT_FINISH_TYPE + sampleType.finish_type_code, {
    finish_type_name: sampleType.finish_type_name,
    item_code: sampleType.item_code,
  })
}

export function deleteFinishType(sampleType: IFinishType) {
  return axios.delete(DELETE_FINISH_TYPE + sampleType.finish_type_code)
}
