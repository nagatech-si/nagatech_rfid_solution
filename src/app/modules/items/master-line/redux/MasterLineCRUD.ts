import axios from 'axios'
import {IItem, IRequestItemLine} from '../model/MasterLineModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_ITEM = `${API_URL}/item/v2/item_name`
export const DELETE_ITEM = `${API_URL}/item/v2/`
export const MOVE_SHOWOOM = `${API_URL}/item/v2/register/`
export const MOVE_MASTERLINE = `${API_URL}/item/v2/unregister/`

export function fetchAllItemLine(payload: IRequestItemLine) {
  return axios.get<IItem[]>(GET_ITEM, {
    params: {
      item_name: payload.item_name,
      category: payload.category,
      limit_start_weight: payload.limit_start_weight,
      limit_finish_weight: payload.limit_finish_weight,
      limit_from: payload.limit_from,
      limit_item: payload.limit_item,
    },
  })
}

export function postMoveShowroom(item_code: string) {
  return axios.put(MOVE_SHOWOOM + item_code)
}
export function postMoveMasterline(item_code: string) {
  return axios.put(MOVE_MASTERLINE + item_code)
}
export function deleteMasterLine(item_code: string) {
  return axios.delete(DELETE_ITEM + item_code)
}
