import axios from 'axios'
import {IPlatingColour} from '../model/PlatingColourModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_PLATING_COLOUR = `${API_URL}/plating-colour/v2`
export const POST_PLATING_COLOUR = `${API_URL}/plating-colour/v2`
export const PUT_PLATING_COLOUR = `${API_URL}/plating-colour/v2/`
export const DELETE_PLATING_COLOUR = `${API_URL}/plating-colour/v2/`

export function fetchAllPlatingColour() {
  return axios.get<IPlatingColour[]>(GET_PLATING_COLOUR)
}

export function sendPlatingColour(sampleType: IPlatingColour) {
  return axios.post(POST_PLATING_COLOUR, {
    plating_colour_code: sampleType.plating_colour_code,
    plating_colour_name: sampleType.plating_colour_name,
  })
}

export function putPlatingColour(sampleType: IPlatingColour) {
  return axios.put(PUT_PLATING_COLOUR + sampleType.plating_colour_code, {
    plating_colour_name: sampleType.plating_colour_name,
  })
}

export function deletePlatingColour(sampleType: IPlatingColour) {
  return axios.delete(DELETE_PLATING_COLOUR + sampleType.plating_colour_code)
}
