import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import {BarangIgnore} from '../../../../../setup/enc-ignore/barang-ignore-encryptor'
import {IOpnameItem} from '../../opname/model/opnameModel'
import {fetchReportShatterItem} from './shatterItemCRUD'
import {IReqeustReportShatterItem} from '../../../report/shatter_item/model/shatterModel'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  reportShatterItem: '[SHATTER ITEM] Fetch Report Shatter Item',
  reportShatterItemSuccess: '[SHATTER ITEM] Fetch Report Shatter Item Success',
  reportShatterItemFailure: '[SHATTER ITEM] Fetch Report Shatter Item Faliled',
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
  {storage, key: 'v100-nagagold-rfid-solution-sold-item', whitelist: ['data', 'payload']},
  (state: IOpnameRedux = initialOpnameState, action: ActionWithPayload<IOpnameRedux>) => {
    switch (action.type) {
      case actionTypes.reportShatterItemSuccess: {
        const data = action.payload?.data
        return {...state, reportData: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchReportShatterItem: (payload: IReqeustReportShatterItem) => ({
    type: actionTypes.reportShatterItem,
    payload: payload,
  }),
}

function* reportShatterItemSaga({payload: params}: ActionWithPayload<IReqeustReportShatterItem>) {
  try {
    const response: {data: DefaultResponse<IOpnameItem[]>} = yield call(() =>
      fetchReportShatterItem(params!)
    )
    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.reportShatterItemSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.reportShatterItemFailure, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.reportShatterItem, reportShatterItemSaga)
}
