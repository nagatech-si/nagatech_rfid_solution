import axios from 'axios'
import {IProvince} from '../model/ProvinceModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_PROVINCE = `${API_URL}/provinsi/v2`
export const POST_PROVINCE = `${API_URL}/provinsi/v2`
export const PUT_PROVINCE = `${API_URL}/provinsi/v2/`
export const DELETE_PROVINCE = `${API_URL}/provinsi/v2/`

export function fetchAllProvince() {
  return axios.get<IProvince[]>(GET_PROVINCE)
}

export function sendProvince(province: IProvince) {
  return axios.post(POST_PROVINCE, {
    id_negara: province.id_negara,
    nama_provinsi: province.nama_provinsi,
    nama_negara: province.nama_negara,
  })
}

export function putProvince(province: IProvince) {
  return axios.put(PUT_PROVINCE + province._id, {
    nama_provinsi: province.nama_provinsi,
  })
}

export function deleteProvince(province: IProvince) {
  return axios.delete(DELETE_PROVINCE + province._id)
}
