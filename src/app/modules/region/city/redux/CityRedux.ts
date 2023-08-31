import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {ICity} from '../model/CityModel'
import {deleteCity, fetchAllCity, putCity, sendCity} from './CityCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {removeAllFocus} from '../../../../../_metronic/helpers'

import {kotaIgnore} from '../../../../../setup/enc-ignore/region/kota-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllCity: '[CITY] Fetch All City',
  fetchAllCitySuccess: '[CITY] Fetch All City Success',
  fetchAllCityFailure: '[CITY] Fetch All City Faliled',
  postCity: '[CITY] Post City',
  postCitySuccess: '[CITY] Post City Success',
  postCityFailed: '[CITY] Post City Failed',
  storePrevCityData: '[CITY] Store Prev Data',
  storePrevCityDataFinish: '[CITY] Store Prev Data Finish',
  putCity: '[CITY] Put City',
  putCitySuccess: '[CITY] Put City Success',
  putCityFailed: '[CITY] Put City Failed',
  deleteCity: '[CITY] Delete City',
  deleteCitySuccess: '[CITY] Delete City Success',
  deleteCityFailed: '[CITY] Delete City Failed',
}

const initialCityState: ICityRedux = {
  data: [],
  payload: null,
}

export interface ICityRedux {
  data: ICity[] | null | undefined
  payload: ICity | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-city', whitelist: ['data']},
  (state: ICityRedux = initialCityState, action: ActionWithPayload<ICityRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllCitySuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postCity: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putCity: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevCityDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllCity: () => ({type: actionTypes.fetchAllCity}),
  postCity: (payload: ICity) => ({type: actionTypes.postCity, payload}),
  deleteCity: (payload: ICity) => ({type: actionTypes.deleteCity, payload}),
  editCity: (payload: ICity) => ({type: actionTypes.putCity, payload}),
  setEditCity: (payload: ICity) => ({
    type: actionTypes.storePrevCityData,
    payload,
  }),
}

function* fetchCity() {
  try {
    const response: {data: DefaultResponse<ICity[]>} = yield call(fetchAllCity)
    let data = encryptor.doDecrypt(response.data.data, kotaIgnore)

    yield put({
      type: actionTypes.fetchAllCitySuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllCityFailure, payload: {data: null}})
  }
}

function* postCity({payload: sampleType}: ActionWithPayload<ICity>) {
  try {
    yield call(() => sendCity(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'City successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postCitySuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postCityFailed, payload: {data: null}})
  }
}

function* deleteCitySaga({payload: sampleType}: ActionWithPayload<ICity>) {
  try {
    yield call(() => deleteCity(sampleType!))
    removeAllFocus()
    Swal.fire({
      title: 'Success!',
      text: 'City successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteCitySuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteCityFailed, payload: {data: null}})
  }
}

function* editCitySaga({payload: sampleType}: ActionWithPayload<ICity>) {
  try {
    yield call(() => putCity(sampleType!))
    removeAllFocus()
    Swal.fire({
      title: 'Success!',
      text: 'City successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
      showConfirmButton: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putCitySuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putCityFailed, payload: {data: null}})
  }
}
function* setEditCitySaga({payload: sampleType}: ActionWithPayload<ICity>) {
  try {
    yield put({type: actionTypes.storePrevCityDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putCityFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllCity, fetchCity)
  yield takeLatest(actionTypes.postCitySuccess, fetchCity)
  yield takeLatest(actionTypes.postCityFailed, fetchCity)
  yield takeLatest(actionTypes.postCity, postCity)
  yield takeLatest(actionTypes.storePrevCityData, setEditCitySaga)
  yield takeLatest(actionTypes.putCity, editCitySaga)
  yield takeLatest(actionTypes.putCitySuccess, fetchCity)
  yield takeLatest(actionTypes.deleteCity, deleteCitySaga)
  yield takeLatest(actionTypes.deleteCitySuccess, fetchCity)
}
