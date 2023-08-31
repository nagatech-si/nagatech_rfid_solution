import axios from 'axios'
import {ISampleQuantityType} from '../model/SampleQuantityTypeModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_SAMPLE_QUANTITY_TYPE = `${API_URL}/sample-quantity-type/v2`
export const POST_SAMPLE_QUANTITY_TYPE = `${API_URL}/sample-quantity-type/v2`
export const PUT_SAMPLE_QUANTITY_TYPE = `${API_URL}/sample-quantity-type/v2/`
export const DELETE_SAMPLE_QUANTITY_TYPE = `${API_URL}/sample-quantity-type/v2/`

export function fetchAllSampleQuantityType() {
  return axios.get<ISampleQuantityType[]>(GET_SAMPLE_QUANTITY_TYPE)
}

export function sendSampleQuantityType(sampleType: ISampleQuantityType) {
  return axios.post(POST_SAMPLE_QUANTITY_TYPE, {
    qty_code: sampleType.qty_code,
    qty_name: sampleType.qty_name,
  })
}

export function putSampleQuantityType(payload: ISampleQuantityType) {
  return axios.put(PUT_SAMPLE_QUANTITY_TYPE + payload.qty_code, {
    qty_name: payload.qty_name,
  })
}

export function deleteSampleQuantityType(payload: ISampleQuantityType) {
  return axios.delete(DELETE_SAMPLE_QUANTITY_TYPE + payload.qty_code)
}
