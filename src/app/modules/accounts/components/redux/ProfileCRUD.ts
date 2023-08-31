import axios from 'axios'
import {IProfile, profileJson} from '../../model/ProfileModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_PROFILE = `${API_URL}/system-perusahaan/v2`
export const POST_PROFILE = `${API_URL}/system-perusahaan/v2`
export const PUT_PROFILE = `${API_URL}/system-perusahaan/v2/`
export const DELETE_PROFILE = `${API_URL}/system-perusahaan/v2/`

export function fetchAllProfile() {
  return axios.get<IProfile[]>(GET_PROFILE)
}

export function sendProfile(data: IProfile) {
  return axios.post(POST_PROFILE, profileJson(data))
}
