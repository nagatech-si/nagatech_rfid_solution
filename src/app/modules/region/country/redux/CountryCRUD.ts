import axios from 'axios'
import {ICountry} from '../model/CountryModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_COUNTRY = `${API_URL}/negara/v2`
export const POST_COUNTRY = `${API_URL}/negara/v2`
export const PUT_COUNTRY = `${API_URL}/negara/v2/`
export const DELETE_COUNTRY = `${API_URL}/negara/v2/`

export function fetchAllCountry() {
  return axios.get<ICountry[]>(GET_COUNTRY)
}

export function sendCountry(country: ICountry) {
  return axios.post(POST_COUNTRY, {
    nama_negara: country.nama_negara,
  })
}

export function putCountry(country: ICountry) {
  return axios.put(PUT_COUNTRY + country._id, {
    nama_negara: country.nama_negara,
  })
}

export function deleteCountry(country: ICountry) {
  return axios.delete(DELETE_COUNTRY + country._id)
}
