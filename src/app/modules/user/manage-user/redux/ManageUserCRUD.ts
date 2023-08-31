import axios from 'axios'
import {IManageUser, ManageUserToJson} from '../model/ManageUserModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_MANAGE_USER = `${API_URL}/user/v2`
export const POST_MANAGE_USER = `${API_URL}/user/v2`
export const PUT_MANAGE_USER = `${API_URL}/user/v2/`
export const DELETE_MANAGE_USER = `${API_URL}/user/v2/`

export function fetchAllManageUser() {
  return axios.get<IManageUser[]>(GET_MANAGE_USER)
}

export function sendManageUser(payload: IManageUser) {
  return axios.post(POST_MANAGE_USER, ManageUserToJson(payload))
}

export function putManageUser(payload: IManageUser) {
  return axios.put(PUT_MANAGE_USER + payload.user_id, {
    nama_lkp: payload.nama_lkp,
    type: payload.type,
  })
}

export function deleteManageUser(payload: IManageUser) {
  return axios.delete(DELETE_MANAGE_USER + payload.user_id)
}
