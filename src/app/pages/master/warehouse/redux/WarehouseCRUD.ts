import axios from 'axios'
import {IWarehouse} from '../model/WarehouseModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_WAREHOUSE = `${API_URL}/v1/gudang/open`
export const POST_WAREHOUSE = `${API_URL}/v1/gudang`
export const PUT_WAREHOUSE = `${API_URL}/v1/gudang/`
export const DELETE_WAREHOUSE = `${API_URL}/v1/gudang/`

export function fetchAllWarehouse() {
  return axios.get<IWarehouse[]>(GET_WAREHOUSE)
}

export function sendWarehouse(payload: IWarehouse) {
  return axios.post(POST_WAREHOUSE, payload)
}

export function putWarehouse(payload: IWarehouse) {
  return axios.put(PUT_WAREHOUSE + payload._id, {
    nama_gudang: payload.nama_gudang,
  })
}

export function deleteWarehouse(payload: IWarehouse) {
  return axios.delete(DELETE_WAREHOUSE + payload._id)
}
