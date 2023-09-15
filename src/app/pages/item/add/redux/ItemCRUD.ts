import axios from 'axios'
import {IItem, IRequestReportItem, IResponseReportItem} from '../model/ItemModel'
import {ISearch} from '../../show_data/model/searchModel'
import {getStringDateOnly} from '../../../../../_metronic/helpers/dateHelper'

const API_URL = process.env.REACT_APP_API_URL

export const GET_ITEM = `${API_URL}/v1/barang`
export const GET_ITEM_FILTER = `${API_URL}/v1/barang/filter-barang`
export const GET_REPORT_ITEM = `${API_URL}/v1/barang-report/barang`
export const POST_ITEM = `${API_URL}/v1/barang`
export const PUT_ITEM = `${API_URL}/v1/barang/`
export const DELETE_ITEM = `${API_URL}/v1/barang/`

export function fetchAllItem() {
  return axios.get<IItem[]>(GET_ITEM)
}

export function fetchAllItemFiltered(params: ISearch) {
  return axios.get<IItem[]>(GET_ITEM_FILTER, {params})
}
export function fetchReportItem(params: IRequestReportItem) {
  return axios.get<IResponseReportItem[]>(GET_REPORT_ITEM, {
    params: {
      startDate: getStringDateOnly(params.startDate, 'ENG'),
      endDate: getStringDateOnly(params.endDate, 'ENG'),
      kode_jenis: params.kode_jenis,
      kode_baki: params.kode_baki,
      kode_gudang: params.kode_gudang,
    },
  })
}

export function sendItem(payload: IItem) {
  return axios.post(POST_ITEM, payload)
}

export function putItem(payload: IItem) {
  return axios.put(PUT_ITEM + payload._id, {
    nama_barang: payload.nama_barang,
    kadar: payload.kadar,
    kadar_cetak: payload.kadar_cetak,
    kode_intern: payload.kode_intern,
    gambar_barang: payload.gambar_barang,
  })
}

export function deleteItem(payload: IItem) {
  return axios.delete(DELETE_ITEM + payload._id)
}
