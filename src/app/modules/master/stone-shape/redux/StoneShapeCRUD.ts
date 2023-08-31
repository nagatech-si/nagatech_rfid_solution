import axios from 'axios'
import {IStoneShape} from '../model/StoneShapeModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_STONE_SHAPE = `${API_URL}/stone-shape/v2`
export const POST_STONE_SHAPE = `${API_URL}/stone-shape/v2`
export const PUT_STONE_SHAPE = `${API_URL}/stone-shape/v2/`
export const DELETE_STONE_SHAPE = `${API_URL}/stone-shape/v2/`

export function fetchAllStoneShape() {
  return axios.get<IStoneShape[]>(GET_STONE_SHAPE)
}

export function sendStoneShape(sampleType: IStoneShape) {
  return axios.post(POST_STONE_SHAPE, {
    stone_shape_code: sampleType.stone_shape_code,
    stone_shape_name: sampleType.stone_shape_name,
  })
}

export function putStoneShape(sampleType: IStoneShape) {
  return axios.put(PUT_STONE_SHAPE + sampleType.stone_shape_code, {
    stone_shape_name: sampleType.stone_shape_name,
  })
}

export function deleteStoneShape(sampleType: IStoneShape) {
  return axios.delete(DELETE_STONE_SHAPE + sampleType.stone_shape_code)
}
