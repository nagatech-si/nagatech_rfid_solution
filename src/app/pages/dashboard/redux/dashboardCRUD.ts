import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const GET_ALL_REGISTERED = `${API_URL}/item/v2/item_name?item_name=&category=ML&limit_start_weight=0&limit_finish_weight=0&limit_from=0&limit_item=4`
export const GET_ALL_SHOWROOM = `${API_URL}/item/v2/item_name?item_name=&category=SR&limit_start_weight=0&limit_finish_weight=0&limit_from=0&limit_item=4`
export const GET_LAST_SHOWROOM = `${API_URL}/item/v2/item_name?item_name=&category=SR&limit_start_weight=0&limit_finish_weight=0&limit_from=0&limit_item=4`
export const GET_ALL_CUSTOMER_VALID = `${API_URL}/customer/verifikasi-v2`
export const GET_ALL_CLOSING_PO = `${API_URL}/customer-po/customer-po/all/open`
export const GET_TOP_CUSTOMER_ACTIVE = `${API_URL}/customer/aktif-v2?limit_from=0&limit_item=10`

export function fetchAllRegisteredCRUD() {
  return axios.get<any>(GET_ALL_REGISTERED)
}

export function fetchAllShowroomCRUD() {
  return axios.get<any>(GET_ALL_SHOWROOM)
}

export function fetchAllValidCustomerCRUD() {
  return axios.get<any>(GET_ALL_CUSTOMER_VALID)
}
export function fetchTopCustomer() {
  return axios.get<any>(GET_TOP_CUSTOMER_ACTIVE)
}
export function fetchLastShowroom() {
  return axios.get<any>(GET_LAST_SHOWROOM)
}
