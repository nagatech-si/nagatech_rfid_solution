import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeEvery} from 'redux-saga/effects'
import {DefaultResponse} from '../../../../setup/axios/SetupAxios'
import {
  fetchAllRegisteredCRUD,
  fetchAllShowroomCRUD,
  fetchAllValidCustomerCRUD,
  fetchLastShowroom,
  fetchTopCustomer,
} from './dashboardCRUD'

import {Encryptor} from '../../../../_metronic/helpers/Encryptor'
import {customerIgnore} from '../../../../setup/enc-ignore/customer-ignore-encryptor'

const encyptor = new Encryptor()

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllRegistered: '[DASHBOARD] Fetch Registered',
  fetchAllRegisteredSuccess: '[DASHBOARD] Fetch Registered Success',
  fetchAllRegisteredFailure: '[DASHBOARD] Fetch Registered Faliled',
  fetchAllShowroom: '[DASHBOARD] Fetch Showroom',
  fetchAllShowroomSuccess: '[DASHBOARD] Fetch Showroom Success',
  fetchAllShowroomFailure: '[DASHBOARD] Fetch Showroom Faliled',
  fetchLastShowroom: '[DASHBOARD] Fetch Last Showroom',
  fetchLastShowroomSuccess: '[DASHBOARD] Fetch last Showroom Success',
  fetchLastShowroomFailure: '[DASHBOARD] Fetch last Showroom Faliled',
  fetchAllCustomerActive: '[DASHBOARD] Fetch CustomerActive',
  fetchAllCustomerActiveSuccess: '[DASHBOARD] Fetch CustomerActive Success',
  fetchAllCustomerActiveFailure: '[DASHBOARD] Fetch CustomerActive Faliled',
  fetchAllTopCustomer: '[DASHBOARD] Fetch TopCustomer',
  fetchAllTopCustomerSuccess: '[DASHBOARD] Fetch TopCustomer Success',
  fetchAllTopCustomerFailure: '[DASHBOARD] Fetch TopCustomer Faliled',
}

const initialDashboard: IDashboardRedux = {
  totalCustomerActive: 0,
  totalRegistered: 0,
  totalShowroom: 0,
}

export interface IDashboardRedux {
  totalRegistered: number | null | undefined
  totalShowroom: number | null | undefined
  totalCustomerActive: number | null | undefined
}

export const reducer = persistReducer(
  {
    storage,
    key: 'v100-amg_catalogue-dashboard',
    whitelist: ['totalRegistered', 'totalShowroom', 'totalCustomerAcive'],
  },
  (state: IDashboardRedux = initialDashboard, action: ActionWithPayload<IDashboardRedux>) => {
    switch (action.type) {
      default:
        return state
    }
  }
)

export const actions = {}

function* fetchRegisteredSaga() {
  try {
    const response: {data: DefaultResponse<any>} = yield call(fetchAllRegisteredCRUD)

    yield put({
      type: actionTypes.fetchAllRegisteredSuccess,
      payload: {totalRegistered: response.data.count, masterLine: response.data.data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllRegisteredFailure, payload: {data: null}})
  }
}

function* fetchShowroomSaga() {
  try {
    const response: {data: DefaultResponse<any>} = yield call(fetchAllShowroomCRUD)
    yield put({
      type: actionTypes.fetchAllShowroomSuccess,
      payload: {totalShowroom: response.data.count},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllShowroomFailure, payload: {data: null}})
  }
}

function* fetchLastShowroomSaga() {
  try {
    const response: {data: DefaultResponse<any>} = yield call(fetchLastShowroom)
    yield put({
      type: actionTypes.fetchLastShowroomSuccess,
      payload: {showroom: response.data.data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchLastShowroomFailure, payload: {data: null}})
  }
}

function* fetchCustomerActiveSaga() {
  try {
    const response: {data: DefaultResponse<any>} = yield call(fetchAllValidCustomerCRUD)

    yield put({
      type: actionTypes.fetchAllCustomerActiveSuccess,
      payload: {totalCustomerActive: response.data.data.length},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllCustomerActiveFailure, payload: {data: null}})
  }
}
function* fetchTopCustomerSaga() {
  try {
    const response: {data: DefaultResponse<any>} = yield call(fetchTopCustomer)
    const data = encyptor.doDecrypt(response.data.data, customerIgnore)

    yield put({
      type: actionTypes.fetchAllTopCustomerSuccess,
      payload: {customerData: data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllTopCustomerFailure, payload: {data: null}})
  }
}

export function* saga() {
  yield takeEvery(actionTypes.fetchAllRegistered, fetchRegisteredSaga)
  yield takeEvery(actionTypes.fetchAllCustomerActive, fetchCustomerActiveSaga)
  yield takeEvery(actionTypes.fetchAllShowroom, fetchShowroomSaga)
  yield takeEvery(actionTypes.fetchLastShowroom, fetchLastShowroomSaga)
  yield takeEvery(actionTypes.fetchAllTopCustomer, fetchTopCustomerSaga)
}
