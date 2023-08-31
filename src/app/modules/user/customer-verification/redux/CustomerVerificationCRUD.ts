import axios from 'axios'
import {ICustomer} from '../../customer-active/model/CustomerActiveModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_CUSTOMER_UNVALID = `${API_URL}/customer/unverified-v2`
export const GET_CUSTOMER_ACTIVATE = `${API_URL}/customer/aktivasi-customer-v2/`

export function fetchAllCustomerUnVerified() {
  return axios.get<ICustomer[]>(GET_CUSTOMER_UNVALID)
}

export function activateCustomer(kode_customer: string) {
  return axios.post(GET_CUSTOMER_ACTIVATE + kode_customer)
}
