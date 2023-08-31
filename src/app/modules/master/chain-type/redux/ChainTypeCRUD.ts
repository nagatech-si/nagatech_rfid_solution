import axios from 'axios'
import {IChainType} from '../model/ChainTypeModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_CHAIN_TYPE = `${API_URL}/chain-type/v2`
export const POST_CHAIN_TYPE = `${API_URL}/chain-type/v2`
export const PUT_CHAIN_TYPE = `${API_URL}/chain-type/v2/`
export const DELETE_CHAIN_TYPE = `${API_URL}/chain-type/v2/`

export function fetchAllChainType() {
  return axios.get<IChainType[]>(GET_CHAIN_TYPE)
}

export function sendChainType(chainType: IChainType) {
  return axios.post(POST_CHAIN_TYPE, {
    chain_type_code: chainType.chain_type_code,
    chain_type_name: chainType.chain_type_name,
    item_chains_code: '-',
  })
}

export function putChainType(chainType: IChainType) {
  return axios.put(PUT_CHAIN_TYPE + chainType.chain_type_code, {
    chain_type_name: chainType.chain_type_name,
    item_chains_code: chainType.item_code,
  })
}

export function deleteChainType(chainType: IChainType) {
  return axios.delete(DELETE_CHAIN_TYPE + chainType.chain_type_code)
}
