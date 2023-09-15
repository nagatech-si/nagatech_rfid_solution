import axios from 'axios'
import {IOpnameItem} from '../../opname/model/opnameModel'
import {IRequestReportSoldItem} from '../../../report/sold_item/model/soldItemModel'
import {getStringDateOnly} from '../../../../../_metronic/helpers/dateHelper'

const API_URL = process.env.REACT_APP_API_URL

export const SAVE_ITEM = `${API_URL}/v1/sold-item`
export const GET_SOLD_ITEM = `${API_URL}/v1/sold-item`
export const CANCEL_SOLD_ITEM = `${API_URL}/v1/sold-item/cancel`
export const REPORT_SOLD_ITEM = `${API_URL}/v1/barang-report/stock-terjual`

export function saveSoldItem(datas: IOpnameItem[]) {
  return axios.post(SAVE_ITEM, {
    detail_item: datas,
  })
}
export function fetchAllSoldItem() {
  return axios.get<IOpnameItem[]>(GET_SOLD_ITEM)
}
export function cancelSoldItem() {
  return axios.get<IOpnameItem[]>(CANCEL_SOLD_ITEM)
}

export function reportSoldItem(datas: IRequestReportSoldItem) {
  let params: any = {
    startDate: getStringDateOnly(datas.startDate, 'ENG'),
    endDate: getStringDateOnly(datas.endDate, 'ENG'),
    kode_barcode: datas.kode_barcode,
    kode_baki: datas.kode_baki,
  }
  if (datas.kode_barcode === '') {
    params = {
      startDate: getStringDateOnly(datas.startDate, 'ENG'),
      endDate: getStringDateOnly(datas.endDate, 'ENG'),
      kode_baki: datas.kode_baki,
    }
  }
  return axios.get(REPORT_SOLD_ITEM, {
    params: params,
  })
}
