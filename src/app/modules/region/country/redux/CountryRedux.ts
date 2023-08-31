import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {ICountry} from '../model/CountryModel'
import {deleteCountry, fetchAllCountry, putCountry, sendCountry} from './CountryCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {negaraIgnore} from '../../../../../setup/enc-ignore/region/negara-ignore-encryptor'
import {removeAllFocus} from '../../../../../_metronic/helpers'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllCountry: '[COUNTRY] Fetch All Country',
  fetchAllCountrySuccess: '[COUNTRY] Fetch All Country Success',
  fetchAllCountryFailure: '[COUNTRY] Fetch All Country Faliled',
  postCountry: '[COUNTRY] Post Country',
  postCountrySuccess: '[COUNTRY] Post Country Success',
  postCountryFailed: '[COUNTRY] Post Country Failed',
  storePrevCountryData: '[COUNTRY] Store Prev Data',
  storePrevCountryDataFinish: '[COUNTRY] Store Prev Data Finish',
  putCountry: '[COUNTRY] Put Country',
  putCountrySuccess: '[COUNTRY] Put Country Success',
  putCountryFailed: '[COUNTRY] Put Country Failed',
  deleteCountry: '[COUNTRY] Delete Country',
  deleteCountrySuccess: '[COUNTRY] Delete Country Success',
  deleteCountryFailed: '[COUNTRY] Delete Country Failed',
}

const initialCountryState: ICountryRedux = {
  data: [],
  payload: null,
}

export interface ICountryRedux {
  data: ICountry[] | null | undefined
  payload: ICountry | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-country', whitelist: ['data']},
  (state: ICountryRedux = initialCountryState, action: ActionWithPayload<ICountryRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllCountrySuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postCountry: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putCountry: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevCountryDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllCountry: () => ({type: actionTypes.fetchAllCountry}),
  postCountry: (payload: ICountry) => ({type: actionTypes.postCountry, payload}),
  deleteCountry: (payload: ICountry) => ({type: actionTypes.deleteCountry, payload}),
  editCountry: (payload: ICountry) => ({type: actionTypes.putCountry, payload}),
  setEditCountry: (payload: ICountry) => ({
    type: actionTypes.storePrevCountryData,
    payload,
  }),
}

function* fetchCountry() {
  try {
    const response: {data: DefaultResponse<ICountry[]>} = yield call(fetchAllCountry)
    let data = encryptor.doDecrypt(response.data.data, negaraIgnore)

    yield put({
      type: actionTypes.fetchAllCountrySuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllCountryFailure, payload: {data: null}})
  }
}

function* postCountry({payload: sampleType}: ActionWithPayload<ICountry>) {
  try {
    yield call(() => sendCountry(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Country successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postCountrySuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postCountryFailed, payload: {data: null}})
  }
}

function* deleteCountrySaga({payload: sampleType}: ActionWithPayload<ICountry>) {
  try {
    yield call(() => deleteCountry(sampleType!))
    removeAllFocus()
    Swal.fire({
      title: 'Success!',
      text: 'Country successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteCountrySuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteCountryFailed, payload: {data: null}})
  }
}

function* editCountrySaga({payload: sampleType}: ActionWithPayload<ICountry>) {
  try {
    yield call(() => putCountry(sampleType!))
    removeAllFocus()
    Swal.fire({
      title: 'Success!',
      text: 'Country successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
      showConfirmButton: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putCountrySuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putCountryFailed, payload: {data: null}})
  }
}
function* setEditCountrySaga({payload: sampleType}: ActionWithPayload<ICountry>) {
  try {
    yield put({type: actionTypes.storePrevCountryDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putCountryFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllCountry, fetchCountry)
  yield takeLatest(actionTypes.postCountrySuccess, fetchCountry)
  yield takeLatest(actionTypes.postCountryFailed, fetchCountry)
  yield takeLatest(actionTypes.postCountry, postCountry)
  yield takeLatest(actionTypes.storePrevCountryData, setEditCountrySaga)
  yield takeLatest(actionTypes.putCountry, editCountrySaga)
  yield takeLatest(actionTypes.putCountrySuccess, fetchCountry)
  yield takeLatest(actionTypes.deleteCountry, deleteCountrySaga)
  yield takeLatest(actionTypes.deleteCountrySuccess, fetchCountry)
}
