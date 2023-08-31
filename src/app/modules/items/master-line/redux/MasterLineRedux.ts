import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IItem, IRequestItemLine} from '../model/MasterLineModel'
import {
  deleteMasterLine,
  fetchAllItemLine,
  postMoveMasterline,
  postMoveShowroom,
} from './MasterLineCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import {itemIgnore} from '../../../../../setup/enc-ignore/item-ignore-encryptor.js'

const encryptor = new Encryptor()
let lastQuery: IRequestItemLine = {
  item_name: '',
  category: 'ML',
  limit_finish_weight: 0,
  limit_from: 0,
  limit_item: 30,
  limit_start_weight: 0,
}
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllItem: '[MASTER LINE] Fetch All Master Line Item',
  fetchAllItemSuccess: '[MASTER LINE] Fetch All Master Line Item Success',
  fetchAllItemFailure: '[MASTER LINE] Fetch All Master Line Item Faliled',
  moveShowroom: '[MASTER LINE] Move Showroom Item',
  moveShowroomSuccess: '[MASTER LINE] Move Showroom Item Success',
  moveShowroomFailure: '[MASTER LINE] Move Showroom Item Faliled',
  moveMasterline: '[MASTER LINE] Move Masterline Item',
  moveMasterlineSuccess: '[MASTER LINE] Move Masterline Item Success',
  moveMasterlineFailure: '[MASTER LINE] Move Masterline Item Faliled',
  deleteMasterline: '[MASTER LINE] Delete Masterline Item',
  deleteMasterlineSuccess: '[MASTER LINE] Delete Masterline Item Success',
  deleteMasterlineFailure: '[MASTER LINE] Delete Masterline Item Faliled',
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
  {storage, key: 'v100-amg_catalogue-master-line', whitelist: ['data']},
  (state: IItemRedux = initialItemState, action: ActionWithPayload<IItemRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllItemSuccess: {
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
  fetchAllItem: (payload: IRequestItemLine) => ({type: actionTypes.fetchAllItem, payload}),
  moveShowroom: (payload: string) => ({type: actionTypes.moveShowroom, payload}),
  moveMasterline: (payload: string) => ({type: actionTypes.moveMasterline, payload}),
  deleteMasterline: (payload: string) => ({type: actionTypes.deleteMasterline, payload}),
}

function* fetchAllItemSaga({payload: requestItemLine}: ActionWithPayload<IRequestItemLine>) {
  try {
    if (requestItemLine === undefined) {
      requestItemLine = lastQuery
    }
    lastQuery = requestItemLine!
    const response: {data: DefaultResponse<IItem[]>} = yield call(() =>
      fetchAllItemLine(requestItemLine!)
    )
    let data = encryptor.doDecrypt(response.data.data, itemIgnore)

    yield put({
      type: actionTypes.fetchAllItemSuccess,
      payload: {data, totalData: response.data.count},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllItemFailure, payload: {data: null}})
  }
}

function* moveShowroomSaga({payload: code_item}: ActionWithPayload<string>) {
  try {
    yield call(() => postMoveShowroom(code_item!))

    const response: {data: DefaultResponse<IItem[]>} = yield call(() => fetchAllItemLine(lastQuery))
    let data = encryptor.doDecrypt(response.data.data, itemIgnore)

    yield put({
      type: actionTypes.fetchAllItemSuccess,
      payload: {data, totalData: response.data.count},
    })
  } catch (error) {
    yield put({type: actionTypes.moveShowroomFailure, payload: {data: null}})
  }
}

function* moveMasterlineSaga({payload: code_item}: ActionWithPayload<string>) {
  try {
    yield call(() => postMoveMasterline(code_item!))

    const response: {data: DefaultResponse<IItem[]>} = yield call(() => fetchAllItemLine(lastQuery))
    let data = encryptor.doDecrypt(response.data.data, itemIgnore)

    yield put({
      type: actionTypes.fetchAllItemSuccess,
      payload: {data, totalData: response.data.count},
    })
  } catch (error) {
    yield put({type: actionTypes.moveMasterlineFailure, payload: {data: null}})
  }
}

function* deleteMasterlineSaga({payload: code_item}: ActionWithPayload<string>) {
  try {
    yield call(() => deleteMasterLine(code_item!))

    const response: {data: DefaultResponse<IItem[]>} = yield call(() => fetchAllItemLine(lastQuery))
    let data = encryptor.doDecrypt(response.data.data, itemIgnore)

    yield put({
      type: actionTypes.fetchAllItemSuccess,
      payload: {data, totalData: response.data.count},
    })
  } catch (error) {
    yield put({type: actionTypes.deleteMasterlineFailure, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllItem, fetchAllItemSaga)
  yield takeLatest(actionTypes.moveMasterline, moveMasterlineSaga)
  yield takeLatest(actionTypes.moveShowroom, moveShowroomSaga)
  yield takeLatest(actionTypes.deleteMasterline, deleteMasterlineSaga)
}
