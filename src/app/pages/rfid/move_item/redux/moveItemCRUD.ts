import axios from 'axios'
import {IOpnameItem} from '../../opname/model/opnameModel'
import {IRequestReportMoveItem} from '../model/moveItemModel'
import {getStringDateOnly} from '../../../../../_metronic/helpers/dateHelper'

const API_URL = process.env.REACT_APP_API_URL

export const SAVE_MOVE_ITEM = `${API_URL}/v1/pindah-barang`
export const GET_MOVE_ITEM = `${API_URL}/v1/pindah-barang`
export const CANCEL_MOVE_ITEM = `${API_URL}/v1/pindah-barang/cancel`
export const FETCH_REPORT_MOVE_ITEM = `${API_URL}/v1/barang-report/pindah-barang`

export function saveMoveItem(datas: IOpnameItem[], kode_baki: string) {
  return axios.post(SAVE_MOVE_ITEM, {
    detail_item: datas,
    kode_baki,
  })
}
export function fetchAllMoveItem() {
  return axios.get<IOpnameItem[]>(GET_MOVE_ITEM)
}
export function cancelMoveItem() {
  return axios.get<IOpnameItem[]>(CANCEL_MOVE_ITEM)
}
export function fetchReportMoveItem(params: IRequestReportMoveItem) {
  return axios.get(FETCH_REPORT_MOVE_ITEM, {
    params: {
      startDate: getStringDateOnly(params.startDate, 'ENG'),
      endDate: getStringDateOnly(params.endDate, 'ENG'),
      kode_group: params.kode_group,
      kode_baki_asal: params.kode_baki_asal,
      kode_baki_tujuan: params.kode_baki_tujuan,
    },
  })
}
