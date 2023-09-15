import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {reportSoldItem} from './soldItemCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import {BarangIgnore} from '../../../../../setup/enc-ignore/barang-ignore-encryptor'
import {IOpnameItem} from '../../opname/model/opnameModel'
import {IRequestReportSoldItem} from '../../../report/sold_item/model/soldItemModel'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  reportSoldItem: '[SOLD ITEM] Fetch Report Sold Item',
  reportSoldItemSuccess: '[SOLD ITEM] Fetch Report Sold Item Success',
  reportSoldItemFailure: '[SOLD ITEM] Fetch Report Sold Item Faliled',
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
      case actionTypes.reportSoldItemSuccess: {
        const data = action.payload?.data
        return {...state, reportData: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchReportSoldItem: (payload: IRequestReportSoldItem) => ({
    type: actionTypes.reportSoldItem,
    payload: payload,
  }),
}

function* reportSoldItemSaga({payload: params}: ActionWithPayload<IRequestReportSoldItem>) {
  try {
    const response: {data: DefaultResponse<IOpnameItem[]>} = yield call(() =>
      reportSoldItem(params!)
    )
    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.reportSoldItemSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.reportSoldItemFailure, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.reportSoldItem, reportSoldItemSaga)
}
