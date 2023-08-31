import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IArea} from '../model/AreaModel'
import {deleteArea, fetchAllArea, putArea, sendArea} from './AreaCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {removeAllFocus} from '../../../../../_metronic/helpers'

import {areaIgnore} from '../../../../../setup/enc-ignore/region/area-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllArea: '[CITY] Fetch All Area',
  fetchAllAreaSuccess: '[CITY] Fetch All Area Success',
  fetchAllAreaFailure: '[CITY] Fetch All Area Faliled',
  postArea: '[CITY] Post Area',
  postAreaSuccess: '[CITY] Post Area Success',
  postAreaFailed: '[CITY] Post Area Failed',
  storePrevAreaData: '[CITY] Store Prev Data',
  storePrevAreaDataFinish: '[CITY] Store Prev Data Finish',
  putArea: '[CITY] Put Area',
  putAreaSuccess: '[CITY] Put Area Success',
  putAreaFailed: '[CITY] Put Area Failed',
  deleteArea: '[CITY] Delete Area',
  deleteAreaSuccess: '[CITY] Delete Area Success',
  deleteAreaFailed: '[CITY] Delete Area Failed',
}

const initialAreaState: IAreaRedux = {
  data: [],
  payload: null,
}

export interface IAreaRedux {
  data: IArea[] | null | undefined
  payload: IArea | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-area', whitelist: ['data']},
  (state: IAreaRedux = initialAreaState, action: ActionWithPayload<IAreaRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllAreaSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postArea: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putArea: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevAreaDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllArea: () => ({type: actionTypes.fetchAllArea}),
  postArea: (payload: IArea) => ({type: actionTypes.postArea, payload}),
  deleteArea: (payload: IArea) => ({type: actionTypes.deleteArea, payload}),
  editArea: (payload: IArea) => ({type: actionTypes.putArea, payload}),
  setEditArea: (payload: IArea) => ({
    type: actionTypes.storePrevAreaData,
    payload,
  }),
}

function* fetchArea() {
  try {
    const response: {data: DefaultResponse<IArea[]>} = yield call(fetchAllArea)
    let data = encryptor.doDecrypt(response.data.data, areaIgnore)

    yield put({
      type: actionTypes.fetchAllAreaSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllAreaFailure, payload: {data: null}})
  }
}

function* postArea({payload: sampleType}: ActionWithPayload<IArea>) {
  try {
    yield call(() => sendArea(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Area successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postAreaSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postAreaFailed, payload: {data: null}})
  }
}

function* deleteAreaSaga({payload: sampleType}: ActionWithPayload<IArea>) {
  try {
    yield call(() => deleteArea(sampleType!))
    removeAllFocus()
    Swal.fire({
      title: 'Success!',
      text: 'Area successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteAreaSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteAreaFailed, payload: {data: null}})
  }
}

function* editAreaSaga({payload: sampleType}: ActionWithPayload<IArea>) {
  try {
    yield call(() => putArea(sampleType!))
    removeAllFocus()
    Swal.fire({
      title: 'Success!',
      text: 'Area successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
      showConfirmButton: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putAreaSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putAreaFailed, payload: {data: null}})
  }
}
function* setEditAreaSaga({payload: sampleType}: ActionWithPayload<IArea>) {
  try {
    yield put({type: actionTypes.storePrevAreaDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putAreaFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllArea, fetchArea)
  yield takeLatest(actionTypes.postAreaSuccess, fetchArea)
  yield takeLatest(actionTypes.postAreaFailed, fetchArea)
  yield takeLatest(actionTypes.postArea, postArea)
  yield takeLatest(actionTypes.storePrevAreaData, setEditAreaSaga)
  yield takeLatest(actionTypes.putArea, editAreaSaga)
  yield takeLatest(actionTypes.putAreaSuccess, fetchArea)
  yield takeLatest(actionTypes.deleteArea, deleteAreaSaga)
  yield takeLatest(actionTypes.deleteAreaSuccess, fetchArea)
}
