import axios from 'axios'
import {ISlider} from '../model/SliderModal'

const API_URL = process.env.REACT_APP_API_URL

export const GET_SLIDER = `${API_URL}/slider/v2`
export const POST_SLIDER = `${API_URL}/slider/v2`
export const PUT_SLIDER = `${API_URL}/slider/v2/`
export const DELETE_SLIDER = `${API_URL}/slider/v2/`

export function fetchAllSlider() {
  return axios.get<ISlider[]>(GET_SLIDER)
}

export function sendSlider(payload: ISlider) {
  return axios.post(POST_SLIDER, {
    lokasi_gambar: payload.lokasi_gambar,
  })
}

export function putSlider(payload: ISlider) {
  return axios.put(PUT_SLIDER + payload._id, {
    lokasi_gambar: payload.lokasi_gambar,
  })
}

export function deleteSlider(payload: ISlider) {
  return axios.delete(DELETE_SLIDER + payload._id)
}
