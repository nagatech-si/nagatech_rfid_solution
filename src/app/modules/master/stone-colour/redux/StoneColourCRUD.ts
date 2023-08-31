import axios from 'axios'
import {IStoneColour} from '../model/StoneColourModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_STONE_COLOUR = `${API_URL}/stone-colour/v2`
export const POST_STONE_COLOUR = `${API_URL}/stone-colour/v2`
export const PUT_STONE_COLOUR = `${API_URL}/stone-colour/v2/`
export const DELETE_STONE_COLOUR = `${API_URL}/stone-colour/v2/`

export function fetchAllStoneColour() {
  return axios.get<IStoneColour[]>(GET_STONE_COLOUR)
}

export function sendStoneColour(sampleColour: IStoneColour) {
  return axios.post(POST_STONE_COLOUR, {
    stone_colour_code: sampleColour.stone_colour_code,
    stone_colour_name: sampleColour.stone_colour_name,
    stone_code: sampleColour.stone_code === '' ? '-' : sampleColour.stone_code,
  })
}

export function putStoneColour(sampleColour: IStoneColour) {
  return axios.put(PUT_STONE_COLOUR + sampleColour.stone_colour_code, {
    stone_colour_name: sampleColour.stone_colour_name,
    stone_code: sampleColour.stone_code,
  })
}

export function deleteStoneColour(sampleColour: IStoneColour) {
  return axios.delete(DELETE_STONE_COLOUR + sampleColour.stone_colour_code)
}
