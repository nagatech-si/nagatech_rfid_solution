import axios from 'axios'
import {INickelContent} from '../model/NickelContentModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_NICKEL_CONTENT = `${API_URL}/nickel-content/v2`
export const POST_NICKEL_CONTENT = `${API_URL}/nickel-content/v2`
export const PUT_NICKEL_CONTENT = `${API_URL}/nickel-content/v2/`
export const DELETE_NICKEL_CONTENT = `${API_URL}/nickel-content/v2/`

export function fetchAllNickelContent() {
  return axios.get<INickelContent[]>(GET_NICKEL_CONTENT)
}

export function sendNickelContent(sampleType: INickelContent) {
  return axios.post(POST_NICKEL_CONTENT, {
    nickel_content_code: sampleType.nickel_content_code,
    nickel_content_name: sampleType.nickel_content_name,
    colour_type_code: sampleType.colour_type_code === '' ? '-' : sampleType.colour_type_code,
  })
}

export function putNickelContent(sampleType: INickelContent) {
  return axios.put(PUT_NICKEL_CONTENT + sampleType.nickel_content_code, {
    nickel_content_name: sampleType.nickel_content_name,
    colour_type_code: sampleType.colour_type_code,
  })
}

export function deleteNickelContent(sampleType: INickelContent) {
  return axios.delete(DELETE_NICKEL_CONTENT + sampleType.nickel_content_code)
}
