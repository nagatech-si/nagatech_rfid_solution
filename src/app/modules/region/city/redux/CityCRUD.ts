import axios from 'axios'
import {ICity} from '../model/CityModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_CITY = `${API_URL}/kota/v2`
export const POST_CITY = `${API_URL}/kota/v2`
export const PUT_CITY = `${API_URL}/kota/v2/`
export const DELETE_CITY = `${API_URL}/kota/v2/`

export function fetchAllCity() {
  return axios.get<ICity[]>(GET_CITY)
}

export function sendCity(city: ICity) {
  return axios.post(POST_CITY, {
    id_provinsi: city.id_provinsi,
    nama_kota: city.nama_kota,
    nama_provinsi: city.nama_provinsi,
  })
}

export function putCity(city: ICity) {
  return axios.put(PUT_CITY + city._id, {
    nama_kota: city.nama_kota,
  })
}

export function deleteCity(city: ICity) {
  return axios.delete(DELETE_CITY + city._id)
}
