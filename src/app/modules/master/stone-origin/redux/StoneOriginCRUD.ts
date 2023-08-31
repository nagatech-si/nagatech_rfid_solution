import axios from 'axios'
import {IStoneOrigin} from '../model/StoneOriginModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_STONE_ORIGIN = `${API_URL}/stone-origin/v2`
export const POST_STONE_ORIGIN = `${API_URL}/stone-origin/v2`
export const PUT_STONE_ORIGIN = `${API_URL}/stone-origin/v2/`
export const DELETE_STONE_ORIGIN = `${API_URL}/stone-origin/v2/`

export function fetchAllStoneOrigin() {
  return axios.get<IStoneOrigin[]>(GET_STONE_ORIGIN)
}

export function sendStoneOrigin(stoneOrigin: IStoneOrigin) {
  return axios.post(POST_STONE_ORIGIN, {
    stone_origin_code: stoneOrigin.stone_origin_code,
    stone_origin_name: stoneOrigin.stone_origin_name,
    stone_code: stoneOrigin.stone_code === '' ? '-' : stoneOrigin.stone_code,
  })
}

export function putStoneOrigin(stoneOrigin: IStoneOrigin) {
  return axios.put(PUT_STONE_ORIGIN + stoneOrigin.stone_origin_code, {
    stone_origin_name: stoneOrigin.stone_origin_name,
    stone_code: stoneOrigin.stone_code,
  })
}

export function deleteStoneOrigin(stoneOrigin: IStoneOrigin) {
  return axios.delete(DELETE_STONE_ORIGIN + stoneOrigin.stone_origin_code)
}
