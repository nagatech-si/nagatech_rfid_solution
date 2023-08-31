import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import {itemIgnore} from '../../../../../setup/enc-ignore/item-ignore-encryptor'
import {IItem, IRequestItemLine} from '../../master-line/model/MasterLineModel'
import {fetchAllItemShowroom} from './ShowroomCRUD'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllItemShowroom: '[SHOWROOM] Fetch All Showroom',
  fetchAllItemShowroomSuccess: '[SHOWROOM] Fetch All Showroom Success',
  fetchAllItemShowroomFailure: '[SHOWROOM] Fetch All Showroom Faliled',
}

const initialItemState: IItemRedux = {
  data: [],
  payload: null,
  totalData: 0,
}

export interface IItemRedux {
  data: IItem[] | null | undefined
  payload: IItem | null | undefined
  totalData: number
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-showroom', whitelist: ['data']},
  (state: IItemRedux = initialItemState, action: ActionWithPayload<IItemRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllItemShowroomSuccess: {
        const data = action.payload?.data
        const totalData = action.payload?.totalData ?? 0
        return {...state, data: data, totalData}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllItemShowroom: (payload: IRequestItemLine) => ({
    type: actionTypes.fetchAllItemShowroom,
    payload,
  }),
}

function* fetchAllItemShowroomSaga({
  payload: requestItemLine,
}: ActionWithPayload<IRequestItemLine>) {
  try {
    const response: {data: DefaultResponse<IItem[]>} = yield call(() =>
      fetchAllItemShowroom(requestItemLine!)
    )
    let data = encryptor.doDecrypt(response.data.data, itemIgnore)

    yield put({
      type: actionTypes.fetchAllItemShowroomSuccess,
      payload: {data, totalData: response.data.count},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllItemShowroomFailure, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllItemShowroom, fetchAllItemShowroomSaga)
}
