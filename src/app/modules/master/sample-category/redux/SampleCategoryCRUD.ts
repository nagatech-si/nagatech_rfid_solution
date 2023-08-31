import axios from 'axios'
import {ISampleCategory} from '../model/SampleCategoryModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_SAMPLE_CATEGORY = `${API_URL}/sample-category/v2`
export const POST_SAMPLE_CATEGORY = `${API_URL}/sample-category/v2`
export const PUT_SAMPLE_CATEGORY = `${API_URL}/sample-category/v2/`
export const DELETE_SAMPLE_CATEGORY = `${API_URL}/sample-category/v2/`

export function fetchAllSampleCategory() {
  return axios.get<ISampleCategory[]>(GET_SAMPLE_CATEGORY)
}

export function sendSampleCategory(sampleType: ISampleCategory) {
  return axios.post(POST_SAMPLE_CATEGORY, {
    category_code: sampleType.category_code,
    category_name: sampleType.category_name,
  })
}

export function putSampleCategory(sampleType: ISampleCategory) {
  return axios.put(PUT_SAMPLE_CATEGORY + sampleType.category_code, {
    category_name: sampleType.category_name,
  })
}

export function deleteSampleCategory(sampleType: ISampleCategory) {
  return axios.delete(DELETE_SAMPLE_CATEGORY + sampleType.category_code)
}
