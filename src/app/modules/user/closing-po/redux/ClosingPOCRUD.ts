import axios from 'axios'
import {IClosingPO, IReqeustConfirmPO} from '../model/ClosingPOModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_CLOSE_PO_OPENED = `${API_URL}/customer-po/all/open/v2`
export const GET_CLOSE_PO_CLOSED = `${API_URL}/customer-po/all/close-tgl/v2`
export const GET_FINISH_PO_CLOSED = `${API_URL}/customer-po/finish/all/finish-tgl/v2`
export const CONFIRM_CLOSE_PO = `${API_URL}/customer-po/confirm/v2/`
export const FINISH_CLOSE_PO = `${API_URL}/customer-po/finish/v2/`
export const DELETE_CLOSE_PO = `${API_URL}/customer-po/all-open/v2/`
export const CANCEL_CLOSE_PO = `${API_URL}/customer-po/batal/v2/`

export function fetchAllOpenPO() {
  return axios.get<IClosingPO[]>(GET_CLOSE_PO_OPENED)
}

export function fetchAllPOClosed(startDate: string, endDate: string) {
  return axios.get<IClosingPO[]>(GET_CLOSE_PO_CLOSED, {
    params: {
      limit_from: 0,
      limit_item: 10000,
      startDate,
      endDate,
    },
  })
}
export function fetchAllPOFinished(startDate: string, endDate: string) {
  return axios.get<IClosingPO[]>(GET_FINISH_PO_CLOSED, {
    params: {
      limit_from: 0,
      limit_item: 10000,
      startDate,
      endDate,
    },
  })
}

export function confirmPO(no_po: string, datas: IReqeustConfirmPO[]) {
  return axios.put<IClosingPO[]>(CONFIRM_CLOSE_PO + no_po, {
    item: datas,
  })
}
export function finishPO(no_po: string) {
  return axios.put<IClosingPO[]>(FINISH_CLOSE_PO + no_po)
}

export function deletePO(no_po: string) {
  return axios.delete<IClosingPO[]>(DELETE_CLOSE_PO + no_po)
}
export function cancelPO(no_po: string) {
  return axios.put<IClosingPO[]>(CANCEL_CLOSE_PO + no_po)
}
