import axios from 'axios'
import {ISampleType} from '../model/SampleTypeModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_SAMPLE_TYPE = `${API_URL}/sample-type/v2`
export const POST_SAMPLE_TYPE = `${API_URL}/sample-type/v2`
export const PUT_SAMPLE_TYPE = `${API_URL}/sample-type/v2/`
export const DELETE_SAMPLE_TYPE = `${API_URL}/sample-type/v2/`

export function fetchAllSampleType() {
  return axios.get<ISampleType[]>(GET_SAMPLE_TYPE)
}

export function sendSampleType(sampleType: ISampleType) {
  return axios.post(POST_SAMPLE_TYPE, {
    sample_type_code: sampleType.sample_type_code,
    sample_type_name: sampleType.sample_type_name,
    item_code: sampleType.item_code === '' ? '-' : sampleType.item_code,
  })
}

export function putSampleType(sampleType: ISampleType) {
  return axios.put(PUT_SAMPLE_TYPE + sampleType.sample_type_code, {
    sample_type_name: sampleType.sample_type_name,
    item_code: sampleType.item_code,
  })
}

export function deleteSampleType(sampleType: ISampleType) {
  return axios.delete(DELETE_SAMPLE_TYPE + sampleType.sample_type_code)
}
