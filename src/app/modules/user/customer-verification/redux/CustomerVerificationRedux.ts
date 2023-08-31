import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'

import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import {customerIgnore} from '../../../../../setup/enc-ignore/customer-ignore-encryptor'
import {ICustomer} from '../../customer-active/model/CustomerActiveModel'
import {activateCustomer, fetchAllCustomerUnVerified} from './CustomerVerificationCRUD'
import Swal from 'sweetalert2'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllCustomer: '[CUSTOMER VERIFICATION] Fetch All Customer Unverified',
  fetchAllCustomerSuccess: '[CUSTOMER VERIFICATION] Fetch All Customer Unverified Success',
  fetchAllCustomerFailure: '[CUSTOMER VERIFICATION] Fetch All Customer Unverified Faliled',
  activateCustomer: '[CUSTOMER VERIFICATION] Activate Customer',
  activateCustomerSuccess: '[CUSTOMER VERIFICATION] Activate Customer Success',
  activateCustomerFailure: '[CUSTOMER VERIFICATION] Activate Customer Faliled',
}

const initialCustomerState: ICustomerRedux = {
  data: [],
  payload: null,
}

export interface ICustomerRedux {
  data: ICustomer[] | null | undefined
  payload: string | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-customer-validation', whitelist: ['data']},
  (state: ICustomerRedux = initialCustomerState, action: ActionWithPayload<ICustomerRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllCustomerSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }

      default:
        return state
    }
  }
)

export const actions = {
  fetchAllCustomer: () => ({type: actionTypes.fetchAllCustomer}),
  activateCustomer: (payload: string) => ({type: actionTypes.activateCustomer, payload}),
}

function* fetchCustomer() {
  try {
    const response: {data: DefaultResponse<ICustomer[]>} = yield call(fetchAllCustomerUnVerified)
    let data = encryptor.doDecrypt(response.data.data, customerIgnore)

    yield put({
      type: actionTypes.fetchAllCustomerSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllCustomerFailure, payload: {data: null}})
  }
}

function* activateCustomerSaga({payload: data}: ActionWithPayload<string>) {
  try {
    console.log(data)

    yield call(() => activateCustomer(data!))
    Swal.fire({
      title: 'Success!',
      text: 'Activate customer successfully',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.activateCustomerSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.activateCustomerFailure, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllCustomer, fetchCustomer)
  yield takeLatest(actionTypes.activateCustomer, activateCustomerSaga)
  yield takeLatest(actionTypes.activateCustomerSuccess, fetchCustomer)
}
