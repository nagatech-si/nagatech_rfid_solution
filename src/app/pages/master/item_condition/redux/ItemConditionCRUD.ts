import axios from 'axios'
import {IItemCondition} from '../model/ItemConditionModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_ITEM_CONDITION = `${API_URL}/v1/kondisi-barang/open`
export const POST_ITEM_CONDITION = `${API_URL}/v1/kondisi-barang`
export const PUT_ITEM_CONDITION = `${API_URL}/v1/kondisi-barang/`
export const DELETE_ITEM_CONDITION = `${API_URL}/v1/kondisi-barang/`

export function fetchAllItemCondition() {
  return axios.get<IItemCondition[]>(GET_ITEM_CONDITION)
}

export function sendItemCondition(payload: IItemCondition) {
  return axios.post(POST_ITEM_CONDITION, payload)
}

export function putItemCondition(payload: IItemCondition) {
  return axios.put(PUT_ITEM_CONDITION + payload._id, {
    kondisi_barang: payload.kondisi_barang,
  })
}

export function deleteItemCondition(payload: IItemCondition) {
  return axios.delete(DELETE_ITEM_CONDITION + payload._id)
}
