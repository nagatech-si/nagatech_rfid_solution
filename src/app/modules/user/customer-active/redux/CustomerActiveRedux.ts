import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {ICustomer} from '../model/CustomerActiveModel'
import {
  deleteCustomer,
  fetchAllCustomer,
  suspendCustomer,
  unsuspendCustomer,
} from './CustomerActiveCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import {customerIgnore} from '../../../../../setup/enc-ignore/customer-ignore-encryptor'
import Swal from 'sweetalert2'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllCustomer: '[MANAGE USER] Fetch All Customer',
  fetchAllCustomerSuccess: '[MANAGE USER] Fetch All Customer Success',
  fetchAllCustomerFailure: '[MANAGE USER] Fetch All Customer Faliled',
  suspendCustomer: '[MANAGE USER] Suspend Customer',
  suspendCustomerSuccess: '[MANAGE USER] Suspend Customer Success',
  suspendCustomerFailed: '[MANAGE USER] Suspend Customer Failed',
  unSuspendCustomer: '[MANAGE USER] UnSuspend Customer',
  unSpendCustomerSuccess: '[MANAGE USER] UnSuspend Customer Success',
  unSpendCustomerFailed: '[MANAGE USER] UnSuspend Customer Failed',
  deleteCustomer: '[MANAGE USER] Delete Customer',
  deleteCustomerSuccess: '[MANAGE USER] Delete Customer Success',
  deleteCustomerFailed: '[MANAGE USER] Delete Customer Failed',
}

const initialCustomerState: ICustomerRedux = {
  data: [],
  payload: null,
}

export interface ICustomerRedux {
  data: ICustomer[] | null | undefined
  payload: ICustomer | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-customer', whitelist: ['data']},
  (state: ICustomerRedux = initialCustomerState, action: ActionWithPayload<ICustomerRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllCustomerSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.suspendCustomer: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.unSuspendCustomer: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.deleteCustomer: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllCustomer: () => ({type: actionTypes.fetchAllCustomer}),
  deleteCustomer: (payload: ICustomer) => ({type: actionTypes.deleteCustomer, payload}),
  suspendCustomer: (payload: ICustomer) => ({type: actionTypes.suspendCustomer, payload}),
  unSuspendCustomer: (payload: ICustomer) => ({type: actionTypes.unSuspendCustomer, payload}),
}

function* fetchCustomer() {
  try {
    const response: {data: DefaultResponse<ICustomer[]>} = yield call(fetchAllCustomer)
    let data = encryptor.doDecrypt(response.data.data, customerIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllCustomerSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllCustomerFailure, payload: {data: null}})
  }
}

function* deleteCustomerSaga({payload: data}: ActionWithPayload<ICustomer>) {
  try {
    yield call(() => deleteCustomer(data!))
    Swal.fire({
      title: 'Success!',
      text: 'Delete Customer successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteCustomerSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteCustomerFailed, payload: {data: null}})
  }
}

function* suspendCustomerSaga({payload: data}: ActionWithPayload<ICustomer>) {
  try {
    yield call(() => suspendCustomer(data!))
    Swal.fire({
      title: 'Success!',
      text: 'Customer successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.suspendCustomerSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.suspendCustomerFailed, payload: {data: null}})
  }
}

function* unSuspendCustomerSaga({payload: data}: ActionWithPayload<ICustomer>) {
  try {
    console.log(data)

    yield call(() => unsuspendCustomer(data!))
    Swal.fire({
      title: 'Success!',
      text: 'UnSuspend Customer successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.unSpendCustomerSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.unSpendCustomerFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllCustomer, fetchCustomer)
  yield takeLatest(actionTypes.deleteCustomer, deleteCustomerSaga)
  yield takeLatest(actionTypes.deleteCustomerSuccess, fetchCustomer)
  yield takeLatest(actionTypes.suspendCustomer, suspendCustomerSaga)
  yield takeLatest(actionTypes.suspendCustomerSuccess, fetchCustomer)
  yield takeLatest(actionTypes.unSuspendCustomer, unSuspendCustomerSaga)
  yield takeLatest(actionTypes.unSpendCustomerSuccess, fetchCustomer)
}
