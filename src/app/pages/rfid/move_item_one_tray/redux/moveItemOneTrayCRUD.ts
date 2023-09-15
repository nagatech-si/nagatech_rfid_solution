import axios from 'axios'
import {IOpnameItem} from '../../opname/model/opnameModel'

const API_URL = process.env.REACT_APP_API_URL

export const SAVE_MOVE_ITEM = `${API_URL}/v1/pindah-barang`
export const FETCH_REPORT_MOVE_ITEM = `${API_URL}/v1/barang-report/pindah-barang`

export function saveMoveItem(datas: IOpnameItem[], kode_baki: string) {
  return axios.post(SAVE_MOVE_ITEM, {
    detail_item: datas,
    kode_baki,
  })
}
