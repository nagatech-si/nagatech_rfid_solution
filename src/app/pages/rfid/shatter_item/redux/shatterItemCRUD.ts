import axios from 'axios'
import {IOpnameItem} from '../../opname/model/opnameModel'
import {getStringDateOnly} from '../../../../../_metronic/helpers/dateHelper'
import {IReqeustReportShatterItem} from '../../../report/shatter_item/model/shatterModel'

const API_URL = process.env.REACT_APP_API_URL

export const SAVE_SHATTER_ITEM = `${API_URL}/v1/hancur-barang`
export const FETCH_SHATTER_ITEM = `${API_URL}/v1/hancur-barang`
export const CANCEL_SHATTER_ITEM = `${API_URL}/v1/hancur-barang/cancel`
export const FETCH_REPORT_SHATTER_ITEM = `${API_URL}/v1/barang-report/hancur-barang`

export function saveShatterItem(datas: IOpnameItem[], kondisi_barang: string) {
  return axios.post(SAVE_SHATTER_ITEM, {
    detail_item: datas,
    kondisi_barang,
  })
}

export function fetchShatterItem() {
  return axios.get<IOpnameItem[]>(SAVE_SHATTER_ITEM)
}
export function cancelShatterItem() {
  return axios.get<IOpnameItem[]>(CANCEL_SHATTER_ITEM)
}

export function fetchReportShatterItem(datas: IReqeustReportShatterItem) {
  return axios.get(FETCH_REPORT_SHATTER_ITEM, {
    params: {
      startDate: getStringDateOnly(datas.startDate, 'ENG'),
      endDate: getStringDateOnly(datas.endDate, 'ENG'),
      kode_barcode: datas.kode_barcode,
    },
  })
}
