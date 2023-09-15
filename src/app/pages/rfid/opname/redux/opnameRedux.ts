import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {fetchAllItemFiltered, fetchAll, fetchReportOpname} from './opnameCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import {BarangIgnore} from '../../../../../setup/enc-ignore/barang-ignore-encryptor'
import {IOpnameItem, IOpnameRequest} from '../model/opnameModel'
import {ISearch} from '../../../item/show_data/model/searchModel'
import {
  IRequestReportOpname,
  IResponseReportOpname,
} from '../../../report/opname/model/reportOpnameModel'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllOpname: '[MASTER OPNAME] Fetch All Opname',
  fetchAllOpnameFiltered: '[MASTER OPNAME] Fetch All Opname Filtered',
  fetchAllOpnameSuccess: '[MASTER OPNAME] Fetch All Opname Success',
  fetchAllOpnameFailure: '[MASTER OPNAME] Fetch All Opname Faliled',
  fetchReportOpname: '[MASTER OPNAME] Fetch Report Opname Filtered',
  fetchReportOpnameSuccess: '[MASTER OPNAME] Fetch Report Opname Success',
  fetchReportOpnameFailure: '[MASTER OPNAME] Fetch Report Opname Faliled',
}

const initialOpnameState: IOpnameRedux = {
  data: [],
  payload: null,
  reportOpname: [],
}

export interface IOpnameRedux {
  data: IOpnameItem[] | null | undefined
  payload: IOpnameItem | null | undefined
  reportOpname: IResponseReportOpname[] | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-item', whitelist: ['data', 'payload']},
  (state: IOpnameRedux = initialOpnameState, action: ActionWithPayload<IOpnameRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllOpnameSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.fetchReportOpnameSuccess: {
        const data = action.payload?.data as any
        return {...state, reportOpname: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllOpname: (payload: IOpnameRequest) => ({type: actionTypes.fetchAllOpname, payload}),
  fetchReportOpname: (payload: IRequestReportOpname) => ({
    type: actionTypes.fetchReportOpname,
    payload,
  }),
  fetchAllOpnameFiltered: (payload: ISearch) => ({
    type: actionTypes.fetchAllOpnameFiltered,
    payload,
  }),
  saveOpname: (payload: IOpnameItem[]) => ({
    type: actionTypes.fetchAllOpnameSuccess,
    payload: {
      data: payload,
    },
  }),
  clearOpname: () => ({
    type: actionTypes.fetchAllOpnameSuccess,
    payload: {
      data: [],
    },
  }),
}

function* fetchOpname({payload: params}: ActionWithPayload<IOpnameRequest>) {
  try {
    const response: {data: DefaultResponse<IOpnameItem[]>} = yield call(() => fetchAll(params!))
    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.fetchAllOpnameSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllOpnameFailure, payload: {data: null}})
  }
}
function* fetchReportOpnameSaga({payload: params}: ActionWithPayload<IRequestReportOpname>) {
  try {
    const response: {data: DefaultResponse<IOpnameItem[]>} = yield call(() =>
      fetchReportOpname(params!)
    )
    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.fetchReportOpnameSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllOpnameFailure, payload: {data: null}})
  }
}
function* fetchOpnameFiltered({payload: params}: ActionWithPayload<ISearch>) {
  try {
    var response = yield call(() => fetchAllItemFiltered(params!))
    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.fetchAllOpnameSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllOpnameFailure, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllOpname, fetchOpname)
  yield takeLatest(actionTypes.fetchReportOpname, fetchReportOpnameSaga)
  yield takeLatest(actionTypes.fetchAllOpnameFiltered, fetchOpnameFiltered)
}
