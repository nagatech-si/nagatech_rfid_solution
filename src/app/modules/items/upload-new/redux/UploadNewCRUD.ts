import axios from 'axios'
import {IItem} from '../../master-line/model/MasterLineModel'
import {IRequestSampleCode} from '../model/RequestSampleCode'
import {IRequestUploadItem} from '../model/UploadNewHelper'

const API_URL = process.env.REACT_APP_API_URL

export const GET_SAMPLE_CODE = `${API_URL}/item-code/v2/all-open`
export const POST_UPLOAD_NEW = `${API_URL}/item/v2`
export const EDIT_UPLOAD_NEW = `${API_URL}/item/v2/`

export function fetchAllOpenedSampleCode(payload: IRequestSampleCode) {
  return axios.get<IItem[]>(
    GET_SAMPLE_CODE,

    {
      params: {
        code: payload.code,
        limit_from: payload.limit_from,
        limit_item: payload.limit_item,
      },
    }
  )
}
export function postNewItem(payload: IRequestUploadItem) {
  return axios.post<IRequestUploadItem>(POST_UPLOAD_NEW, payload)
}
export function editNewItem(payload: IRequestUploadItem) {
  return axios.put<IRequestUploadItem>(EDIT_UPLOAD_NEW + payload.code_item, payload)
}
