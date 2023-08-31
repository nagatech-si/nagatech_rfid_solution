import axios from 'axios'
import {IArea} from '../model/AreaModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_AREA = `${API_URL}/area/v2`
export const POST_AREA = `${API_URL}/area/v2`
export const PUT_AREA = `${API_URL}/area/v2/`
export const DELETE_AREA = `${API_URL}/area/v2/`

export function fetchAllArea() {
  return axios.get<IArea[]>(GET_AREA)
}

export function sendArea(city: IArea) {
  return axios.post(POST_AREA, {
    id_kota: city.id_kota,
    nama_kota: city.nama_kota,
    nama_area: city.nama_area,
  })
}

export function putArea(city: IArea) {
  return axios.put(PUT_AREA + city._id, {
    nama_area: city.nama_area,
  })
}

export function deleteArea(city: IArea) {
  return axios.delete(DELETE_AREA + city._id)
}
