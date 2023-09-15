import axios from 'axios'
import {IPriceTag} from '../model/PriceTagModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_PRICE_TAG = `${API_URL}/v1/bandrol/open`
export const POST_PRICE_TAG = `${API_URL}/v1/bandrol`
export const PUT_PRICE_TAG = `${API_URL}/v1/bandrol/`
export const DELETE_PRICE_TAG = `${API_URL}/v1/bandrol/`

export function fetchAllPriceTag() {
  return axios.get<IPriceTag[]>(GET_PRICE_TAG)
}

export function sendPriceTag(payload: IPriceTag) {
  return axios.post(POST_PRICE_TAG, payload)
}

export function putPriceTag(payload: IPriceTag) {
  return axios.put(PUT_PRICE_TAG + payload._id, {
    berat_bandrol: payload.berat_bandrol,
  })
}

export function deletePriceTag(payload: IPriceTag) {
  return axios.delete(DELETE_PRICE_TAG + payload._id)
}
