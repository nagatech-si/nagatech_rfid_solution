import axios from 'axios'
import {IOpnameItem} from '../../opname/model/opnameModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_ITEM_BY_BARCODE = `${API_URL}/v1/barang/by-kode/`
export const SET_ITEM_LOCATOR = `${API_URL}/v1/item-locator/`

export function fetchItemByBarcode(kode_barcode: string) {
  return axios.get<IOpnameItem>(GET_ITEM_BY_BARCODE + kode_barcode)
}

export function setItemLocator(kode_barcode: string) {
  return axios.post<string>(SET_ITEM_LOCATOR, {kode_barcode})
}
