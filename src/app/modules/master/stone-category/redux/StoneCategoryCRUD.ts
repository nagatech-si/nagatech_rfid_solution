import axios from 'axios'
import {IStoneCategory} from '../model/StoneCategoryModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_STONE_CATEGORY = `${API_URL}/stone-category/v2`
export const POST_STONE_CATEGORY = `${API_URL}/stone-category/v2`
export const PUT_STONE_CATEGORY = `${API_URL}/stone-category/v2/`
export const DELETE_STONE_CATEGORY = `${API_URL}/stone-category/v2/`

export function fetchAllStoneCategory() {
  return axios.get<IStoneCategory[]>(GET_STONE_CATEGORY)
}

export function sendStoneCategory(sampleType: IStoneCategory) {
  return axios.post(POST_STONE_CATEGORY, {
    stone_category_code: sampleType.stone_category_code,
    stone_category_name: sampleType.stone_category_name,
    stone_code: sampleType.stone_code === '' ? '-' : sampleType.stone_code,
  })
}

export function putStoneCategory(sampleType: IStoneCategory) {
  return axios.put(PUT_STONE_CATEGORY + sampleType.stone_category_code, {
    stone_category_name: sampleType.stone_category_name,
    stone_code: sampleType.stone_code,
  })
}

export function deleteStoneCategory(sampleType: IStoneCategory) {
  return axios.delete(DELETE_STONE_CATEGORY + sampleType.stone_category_code)
}
