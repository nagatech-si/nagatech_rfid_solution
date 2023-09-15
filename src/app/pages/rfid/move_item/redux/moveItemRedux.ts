import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import {BarangIgnore} from '../../../../../setup/enc-ignore/barang-ignore-encryptor'
import {IOpnameItem} from '../../opname/model/opnameModel'
import {IRequestReportMoveItem} from '../model/moveItemModel'
import {fetchReportMoveItem} from './moveItemCRUD'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  reportMoveItem: '[MOVE ITEM] Fetch Report Move Item',
  reportMoveItemSuccess: '[MOVE ITEM] Fetch Report Move Item Success',
  reportMoveItemFailure: '[MOVE ITEM] Fetch Report Move Item Faliled',
}

const initialOpnameState: IOpnameRedux = {
  data: [],
  payload: null,
  reportData: [],
}

export interface IOpnameRedux {
  data: IOpnameItem[] | null | undefined
  payload: IOpnameItem | null | undefined
  reportData: IOpnameItem[] | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-move-item', whitelist: ['data', 'payload']},
  (state: IOpnameRedux = initialOpnameState, action: ActionWithPayload<IOpnameRedux>) => {
    switch (action.type) {
      case actionTypes.reportMoveItemSuccess: {
        const data = action.payload?.data
        return {...state, reportData: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchReportMoveItem: (payload: IRequestReportMoveItem) => ({
    type: actionTypes.reportMoveItem,
    payload: payload,
  }),
}

function* reportMoveItemSaga({payload: params}: ActionWithPayload<IRequestReportMoveItem>) {
  try {
    const response: {data: DefaultResponse<IOpnameItem[]>} = yield call(() =>
      fetchReportMoveItem(params!)
    )
    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.reportMoveItemSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.reportMoveItemFailure, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.reportMoveItem, reportMoveItemSaga)
}
