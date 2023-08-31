import axios from 'axios'
import {ICustomer, CustomerSuspendToJson} from '../model/CustomerActiveModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_CUSTOMER = `${API_URL}/customer/valid-v2`
export const GET_CUSTOMER_UNVALID = `${API_URL}/customer/unverified-v2`
export const DELETE_CUSTOMER = `${API_URL}/customer/v2/`
export const SUSPEND_CUSTOMER = `${API_URL}/customer/v2/non-active/`
export const UNSUSPEND_CUSTOMER = `${API_URL}/customer/v2/active/`

export function fetchAllCustomer() {
  return axios.get<ICustomer[]>(GET_CUSTOMER)
}
export function fetchAllCustomerUnVerified() {
  return axios.get<ICustomer[]>(GET_CUSTOMER_UNVALID)
}

export function deleteCustomer(payload: ICustomer) {
  return axios.delete(DELETE_CUSTOMER + payload.kode_customer)
}

export function suspendCustomer(payload: ICustomer) {
  return axios.put(SUSPEND_CUSTOMER + payload.kode_customer, CustomerSuspendToJson(payload))
}

export function unsuspendCustomer(payload: ICustomer) {
  return axios.put(UNSUSPEND_CUSTOMER + payload.kode_customer, CustomerSuspendToJson(payload))
}
