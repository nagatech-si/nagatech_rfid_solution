import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IProvince} from '../model/ProvinceModel'
import {deleteProvince, fetchAllProvince, putProvince, sendProvince} from './ProvinceCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {removeAllFocus} from '../../../../../_metronic/helpers'
import {provinsiIgnore} from '../../../../../setup/enc-ignore/region/provinsi-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllProvince: '[PROVINCE] Fetch All Province',
  fetchAllProvinceSuccess: '[PROVINCE] Fetch All Province Success',
  fetchAllProvinceFailure: '[PROVINCE] Fetch All Province Faliled',
  postProvince: '[PROVINCE] Post Province',
  postProvinceSuccess: '[PROVINCE] Post Province Success',
  postProvinceFailed: '[PROVINCE] Post Province Failed',
  storePrevProvinceData: '[PROVINCE] Store Prev Data',
  storePrevProvinceDataFinish: '[PROVINCE] Store Prev Data Finish',
  putProvince: '[PROVINCE] Put Province',
  putProvinceSuccess: '[PROVINCE] Put Province Success',
  putProvinceFailed: '[PROVINCE] Put Province Failed',
  deleteProvince: '[PROVINCE] Delete Province',
  deleteProvinceSuccess: '[PROVINCE] Delete Province Success',
  deleteProvinceFailed: '[PROVINCE] Delete Province Failed',
}

const initialProvinceState: IProvinceRedux = {
  data: [],
  payload: null,
}

export interface IProvinceRedux {
  data: IProvince[] | null | undefined
  payload: IProvince | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-province', whitelist: ['data']},
  (state: IProvinceRedux = initialProvinceState, action: ActionWithPayload<IProvinceRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllProvinceSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postProvince: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putProvince: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevProvinceDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllProvince: () => ({type: actionTypes.fetchAllProvince}),
  postProvince: (payload: IProvince) => ({type: actionTypes.postProvince, payload}),
  deleteProvince: (payload: IProvince) => ({type: actionTypes.deleteProvince, payload}),
  editProvince: (payload: IProvince) => ({type: actionTypes.putProvince, payload}),
  setEditProvince: (payload: IProvince) => ({
    type: actionTypes.storePrevProvinceData,
    payload,
  }),
}

function* fetchProvince() {
  try {
    const response: {data: DefaultResponse<IProvince[]>} = yield call(fetchAllProvince)
    let data = encryptor.doDecrypt(response.data.data, provinsiIgnore)

    yield put({
      type: actionTypes.fetchAllProvinceSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllProvinceFailure, payload: {data: null}})
  }
}

function* postProvince({payload: sampleType}: ActionWithPayload<IProvince>) {
  try {
    yield call(() => sendProvince(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Province successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postProvinceSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postProvinceFailed, payload: {data: null}})
  }
}

function* deleteProvinceSaga({payload: sampleType}: ActionWithPayload<IProvince>) {
  try {
    yield call(() => deleteProvince(sampleType!))
    removeAllFocus()
    Swal.fire({
      title: 'Success!',
      text: 'Province successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteProvinceSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteProvinceFailed, payload: {data: null}})
  }
}

function* editProvinceSaga({payload: sampleType}: ActionWithPayload<IProvince>) {
  try {
    yield call(() => putProvince(sampleType!))
    removeAllFocus()
    Swal.fire({
      title: 'Success!',
      text: 'Province successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
      showConfirmButton: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putProvinceSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putProvinceFailed, payload: {data: null}})
  }
}
function* setEditProvinceSaga({payload: sampleType}: ActionWithPayload<IProvince>) {
  try {
    yield put({type: actionTypes.storePrevProvinceDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putProvinceFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllProvince, fetchProvince)
  yield takeLatest(actionTypes.postProvinceSuccess, fetchProvince)
  yield takeLatest(actionTypes.postProvinceFailed, fetchProvince)
  yield takeLatest(actionTypes.postProvince, postProvince)
  yield takeLatest(actionTypes.storePrevProvinceData, setEditProvinceSaga)
  yield takeLatest(actionTypes.putProvince, editProvinceSaga)
  yield takeLatest(actionTypes.putProvinceSuccess, fetchProvince)
  yield takeLatest(actionTypes.deleteProvince, deleteProvinceSaga)
  yield takeLatest(actionTypes.deleteProvinceSuccess, fetchProvince)
}
