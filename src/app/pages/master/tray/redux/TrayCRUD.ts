import axios from 'axios'
import {ITray} from '../model/TrayModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_TRAY = `${API_URL}/v1/baki/open`
export const POST_TRAY = `${API_URL}/v1/baki`
export const PUT_TRAY = `${API_URL}/v1/baki/`
export const DELETE_TRAY = `${API_URL}/v1/baki/`

export function fetchAllTray() {
  return axios.get<ITray[]>(GET_TRAY)
}

export function sendTray(payload: ITray) {
  return axios.post(POST_TRAY, payload)
}

export function putTray(tray: ITray) {
  return axios.put(PUT_TRAY + tray._id, {
    nama_baki: tray.nama_baki,
    berat_baki: tray.berat_baki,
    berat_bandrol: tray.berat_bandrol,
  })
}

export function deleteTray(tray: ITray) {
  return axios.delete(DELETE_TRAY + tray._id)
}
