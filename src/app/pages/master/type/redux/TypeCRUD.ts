import axios from 'axios'
import {IType} from '../model/TypeModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_TYPE = `${API_URL}/v1/jenis/open`
export const POST_TYPE = `${API_URL}/v1/jenis`
export const PUT_TYPE = `${API_URL}/v1/jenis/`
export const DELETE_TYPE = `${API_URL}/v1/jenis/`

export function fetchAllType() {
  return axios.get<IType[]>(GET_TYPE)
}

export function sendType(payload: IType) {
  return axios.post(POST_TYPE, payload)
}

export function putType(type: IType) {
  return axios.put(PUT_TYPE + type._id, {
    nama_jenis: type.nama_jenis,
  })
}

export function deleteType(group: IType) {
  return axios.delete(DELETE_TYPE + group._id)
}
