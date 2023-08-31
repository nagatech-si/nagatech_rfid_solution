import axios from 'axios'
import {IGroup} from '../model/GroupModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_GROUP = `${API_URL}/v1/group/open`
export const POST_GROUP = `${API_URL}/v1/group`
export const PUT_GROUP = `${API_URL}/v1/group/`
export const DELETE_GROUP = `${API_URL}/v1/group/`

export function fetchAllGroup() {
  return axios.get<IGroup[]>(GET_GROUP)
}

export function sendGroup(payload: IGroup) {
  return axios.post(POST_GROUP, payload)
}

export function putGroup(group: IGroup) {
  return axios.put(PUT_GROUP + group._id, {
    kode_group: group.kode_group,
    nama_group: group.nama_group,
    harga: group.harga,
    harga_modal: group.harga_modal,
  })
}

export function deleteGroup(group: IGroup) {
  return axios.delete(DELETE_GROUP + group._id)
}
