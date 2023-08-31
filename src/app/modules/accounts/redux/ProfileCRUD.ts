import axios from 'axios'
import {IChangePassword, IProfile, profileJson} from '../model/ProfileModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_PROFILE = `${API_URL}/system-perusahaan/v2`
export const POST_PROFILE = `${API_URL}/system-perusahaan/v2`
export const POST_CHANGE_PASSWORD = `${API_URL}/user/password-v2`

export function fetchAllProfile() {
  return axios.get<IProfile[]>(GET_PROFILE)
}

export function sendProfile(data: IProfile) {
  return axios.post(POST_PROFILE, profileJson(data))
}

export function sendChangePassword(data: IChangePassword) {
  return axios.put(POST_CHANGE_PASSWORD, {
    password: data.password,
    new_password: data.new_password,
    retype_password: data.retype_password,
  })
}
