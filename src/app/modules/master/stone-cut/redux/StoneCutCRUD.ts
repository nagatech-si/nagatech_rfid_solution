import axios from 'axios'
import {IStoneCut} from '../model/StoneCutModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_STONE_CUT = `${API_URL}/stone-cut/v2`
export const POST_STONE_CUT = `${API_URL}/stone-cut/v2`
export const PUT_STONE_CUT = `${API_URL}/stone-cut/v2/`
export const DELETE_STONE_CUT = `${API_URL}/stone-cut/v2/`

export function fetchAllStoneCut() {
  return axios.get<IStoneCut[]>(GET_STONE_CUT)
}

export function sendStoneCut(sampleCut: IStoneCut) {
  return axios.post(POST_STONE_CUT, {
    cut_stone_code: sampleCut.cut_stone_code,
    cut_stone_name: sampleCut.cut_stone_name,
    stone_code: sampleCut.stone_code === '' ? '-' : sampleCut.stone_code,
  })
}

export function putStoneCut(sampleCut: IStoneCut) {
  return axios.put(PUT_STONE_CUT + sampleCut.cut_stone_code, {
    cut_stone_name: sampleCut.cut_stone_name,
    stone_code: sampleCut.stone_code,
  })
}

export function deleteStoneCut(sampleCut: IStoneCut) {
  return axios.delete(DELETE_STONE_CUT + sampleCut.cut_stone_code)
}
