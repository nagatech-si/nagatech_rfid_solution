import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {ISlider} from '../model/SliderModal'
import {deleteSlider, fetchAllSlider, putSlider, sendSlider} from './SliderCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllSlider: '[Slider] Fetch All Slider',
  fetchAllSliderSuccess: '[Slider] Fetch All Slider Success',
  fetchAllSliderFailure: '[Slider] Fetch All Slider Faliled',
  postSlider: '[Slider] Post Slider',
  postSliderSuccess: '[Slider] Post Slider Success',
  postSliderFailed: '[Slider] Post Slider Failed',
  storePrevSliderData: '[Slider] Store Prev Data',
  storePrevSliderDataFinish: '[Slider] Store Prev Data Finish',
  putSlider: '[Slider] Put Slider',
  putSliderSuccess: '[Slider] Put Slider Success',
  putSliderFailed: '[Slider] Put Slider Failed',
  deleteSlider: '[Slider] Delete Slider',
  deleteSliderSuccess: '[Slider] Delete Slider Success',
  deleteSliderFailed: '[Slider] Delete Slider Failed',
}

const initialSliderState: ISliderRedux = {
  data: [],
  payload: null,
}

export interface ISliderRedux {
  data: ISlider[] | null | undefined
  payload: ISlider | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-sample-type', whitelist: ['data']},
  (state: ISliderRedux = initialSliderState, action: ActionWithPayload<ISliderRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllSliderSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postSlider: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putSlider: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevSliderDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllSlider: () => ({type: actionTypes.fetchAllSlider}),
  postSlider: (payload: ISlider) => ({type: actionTypes.postSlider, payload}),
  deleteSlider: (payload: ISlider) => ({type: actionTypes.deleteSlider, payload}),
  editSlider: (payload: ISlider) => ({type: actionTypes.putSlider, payload}),
  setEditSlider: (payload: ISlider) => ({
    type: actionTypes.storePrevSliderData,
    payload,
  }),
}

function* fetchSlider() {
  try {
    const response: {data: DefaultResponse<ISlider[]>} = yield call(fetchAllSlider)
    let data = response.data.data

    yield put({
      type: actionTypes.fetchAllSliderSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllSliderFailure, payload: {data: null}})
  }
}

function* postSlider({payload: sampleType}: ActionWithPayload<ISlider>) {
  try {
    yield call(() => sendSlider(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Slider successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postSliderSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postSliderFailed, payload: {data: null}})
  }
}

function* deleteSliderSaga({payload: sampleType}: ActionWithPayload<ISlider>) {
  try {
    yield call(() => deleteSlider(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Slider successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteSliderSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteSliderFailed, payload: {data: null}})
  }
}

function* editSliderSaga({payload: sampleType}: ActionWithPayload<ISlider>) {
  try {
    yield call(() => putSlider(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Slider successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putSliderSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putSliderFailed, payload: {data: null}})
  }
}
function* setEditSliderSaga({payload: sampleType}: ActionWithPayload<ISlider>) {
  try {
    yield put({type: actionTypes.storePrevSliderDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putSliderFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllSlider, fetchSlider)
  yield takeLatest(actionTypes.postSliderSuccess, fetchSlider)
  yield takeLatest(actionTypes.postSliderFailed, fetchSlider)
  yield takeLatest(actionTypes.postSlider, postSlider)
  yield takeLatest(actionTypes.storePrevSliderData, setEditSliderSaga)
  yield takeLatest(actionTypes.putSlider, editSliderSaga)
  yield takeLatest(actionTypes.putSliderSuccess, fetchSlider)
  yield takeLatest(actionTypes.deleteSlider, deleteSliderSaga)
  yield takeLatest(actionTypes.deleteSliderSuccess, fetchSlider)
}
