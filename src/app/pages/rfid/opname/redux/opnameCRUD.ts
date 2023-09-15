import axios from 'axios'
import {
  IOpnameItem,
  IOpnameRequest,
  IOpnameResponse,
  IRequestOpnameBarang,
  ISaveOpname,
} from '../model/opnameModel'
import {ISearch} from '../../../item/show_data/model/searchModel'
import {getStringDateOnly} from '../../../../../_metronic/helpers/dateHelper'
import {IRequestReportOpname} from '../../../report/opname/model/reportOpnameModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_OPNAME = `${API_URL}/v1/stock-opname`
export const GET_OPNAME_FILTER = `${API_URL}/v1/barang/filter-barang`
export const GET_BARANG_BY_BAKI = `${API_URL}/v1/stock-opname/find-barang`
export const GET_REPORT_STOCK_OPNAME = `${API_URL}/v1/stock-opname-report/barang`
export const SAVE_ITEM = `${API_URL}/v1/stock-opname`
export const CANCEL_ITEM = `${API_URL}/v1/stock-opname/cancel`

export function fetchAll(params: IOpnameRequest) {
  return axios.get<IOpnameResponse>(GET_OPNAME, {params})
}

export function fetchAllItemFiltered(params: ISearch) {
  return axios.get<IOpnameItem[]>(GET_OPNAME_FILTER, {params})
}
export function fetchAllItemForOpname(params: IRequestOpnameBarang) {
  return axios.get<IOpnameItem[]>(GET_BARANG_BY_BAKI, {params})
}

export function fetchReportOpname(params: IRequestReportOpname) {
  return axios.get<IOpnameItem[]>(GET_REPORT_STOCK_OPNAME, {
    params: {
      startDate: getStringDateOnly(params.startDate, 'ENG'),
      endDate: getStringDateOnly(params.endDate, 'ENG'),
      kode_baki: params.kode_baki,
    },
  })
}

export function cancelOpname() {
  return axios.post(CANCEL_ITEM)
}

export function saveOpname(params: ISaveOpname) {
  return axios.post(SAVE_ITEM, {...params})
}
