import axios from 'axios'
import {IMetalColourType} from '../model/MetalColourTypeModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_METAL_COLOUR_TYPE = `${API_URL}/metal-colour/v2`
export const POST_METAL_COLOUR_TYPE = `${API_URL}/metal-colour/v2`
export const PUT_METAL_COLOUR_TYPE = `${API_URL}/metal-colour/v2/`
export const DELETE_METAL_COLOUR_TYPE = `${API_URL}/metal-colour/v2/`

export function fetchAllMetalColourType() {
  return axios.get<IMetalColourType[]>(GET_METAL_COLOUR_TYPE)
}

export function sendMetalColourType(sampleType: IMetalColourType) {
  return axios.post(POST_METAL_COLOUR_TYPE, {
    colour_type_code: sampleType.colour_type_code,
    colour_type_name: sampleType.colour_type_name,
    item_code: sampleType.item_code === '' ? '-' : sampleType.item_code,
  })
}

export function putMetalColourType(sampleType: IMetalColourType) {
  return axios.put(PUT_METAL_COLOUR_TYPE + sampleType.colour_type_code, {
    colour_type_name: sampleType.colour_type_name,
    item_code: sampleType.item_code,
  })
}

export function deleteMetalColourType(sampleType: IMetalColourType) {
  return axios.delete(DELETE_METAL_COLOUR_TYPE + sampleType.colour_type_code)
}
