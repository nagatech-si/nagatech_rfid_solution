import axios from 'axios'
import {IFinding} from '../model/FindingModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_FINDING = `${API_URL}/finding/v2`
export const POST_FINDING = `${API_URL}/finding/v2`
export const PUT_FINDING = `${API_URL}/finding/v2/`
export const DELETE_FINDING = `${API_URL}/finding/v2/`

export function fetchAllFinding() {
  return axios.get<IFinding[]>(GET_FINDING)
}

export function sendFinding(payload: IFinding) {
  return axios.post(POST_FINDING, {
    specify_finding_code: payload.specify_finding_code,
    specify_finding_name: payload.specify_finding_name,
    item_code: payload.item_code === '' ? '-' : payload.item_code,
  })
}

export function putFinding(payload: IFinding) {
  return axios.put(PUT_FINDING + payload.specify_finding_code, {
    specify_finding_name: payload.specify_finding_name,
    item_code: payload.item_code,
  })
}

export function deleteFinding(payload: IFinding) {
  return axios.delete(DELETE_FINDING + payload.specify_finding_code)
}
