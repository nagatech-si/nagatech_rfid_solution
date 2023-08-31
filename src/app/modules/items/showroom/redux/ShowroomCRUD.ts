import axios from 'axios'
import {IItem, IRequestItemLine} from '../../master-line/model/MasterLineModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_ITEM = `${API_URL}/item/v2/item_name`

export function fetchAllItemShowroom(payload: IRequestItemLine) {
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
