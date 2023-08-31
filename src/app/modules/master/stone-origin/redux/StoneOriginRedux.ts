import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IStoneOrigin} from '../model/StoneOriginModel'
import {
  deleteStoneOrigin,
  fetchAllStoneOrigin,
  putStoneOrigin,
  sendStoneOrigin,
} from './StoneOriginCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {stoneOriginIgnore} from '../../../../../setup/enc-ignore/stone-origin-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllStoneOrigin: '[STONE ORIGIN] Fetch All Stone Origin',
  fetchAllStoneOriginSuccess: '[STONE ORIGIN] Fetch All Stone Origin Success',
  fetchAllStoneOriginFailure: '[STONE ORIGIN] Fetch All Stone Origin Faliled',
  postStoneOrigin: '[STONE ORIGIN] Post Stone Origin',
  postStoneOriginSuccess: '[STONE ORIGIN] Post Stone Origin Success',
  postStoneOriginFailed: '[STONE ORIGIN] Post Stone Origin Failed',
  storePrevStoneOriginData: '[STONE ORIGIN] Store Prev Data',
  storePrevStoneOriginDataFinish: '[STONE ORIGIN] Store Prev Data Finish',
  putStoneOrigin: '[STONE ORIGIN] Put Stone Origin',
  putStoneOriginSuccess: '[STONE ORIGIN] Put Stone Origin Success',
  putStoneOriginFailed: '[STONE ORIGIN] Put Stone Origin Failed',
  deleteStoneOrigin: '[STONE ORIGIN] Delete Stone Origin',
  deleteStoneOriginSuccess: '[STONE ORIGIN] Delete Stone Origin Success',
  deleteStoneOriginFailed: '[STONE ORIGIN] Delete Stone Origin Failed',
}

const initialStoneOriginState: IStoneOriginRedux = {
  data: [],
  payload: null,
}

export interface IStoneOriginRedux {
  data: IStoneOrigin[] | null | undefined
  payload: IStoneOrigin | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-stone-origin', whitelist: ['data']},
  (
    state: IStoneOriginRedux = initialStoneOriginState,
    action: ActionWithPayload<IStoneOriginRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllStoneOriginSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postStoneOrigin: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putStoneOrigin: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevStoneOriginDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllStoneOrigin: () => ({type: actionTypes.fetchAllStoneOrigin}),
  postStoneOrigin: (payload: IStoneOrigin) => ({type: actionTypes.postStoneOrigin, payload}),
  deleteStoneOrigin: (payload: IStoneOrigin) => ({
    type: actionTypes.deleteStoneOrigin,
    payload,
  }),
  editStoneOrigin: (payload: IStoneOrigin) => ({type: actionTypes.putStoneOrigin, payload}),
  setEditStoneOrigin: (payload: IStoneOrigin) => ({
    type: actionTypes.storePrevStoneOriginData,
    payload,
  }),
}

function* fetchStoneOrigin() {
  try {
    const response: {data: DefaultResponse<IStoneOrigin[]>} = yield call(fetchAllStoneOrigin)
    let data = encryptor.doDecrypt(response.data.data, stoneOriginIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllStoneOriginSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllStoneOriginFailure, payload: {data: null}})
  }
}

function* postStoneOrigin({payload: sampleType}: ActionWithPayload<IStoneOrigin>) {
  try {
    yield call(() => sendStoneOrigin(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Origin successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postStoneOriginSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postStoneOriginFailed, payload: {data: null}})
  }
}

function* deleteStoneOriginSaga({payload: sampleType}: ActionWithPayload<IStoneOrigin>) {
  try {
    yield call(() => deleteStoneOrigin(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Origin successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteStoneOriginSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteStoneOriginFailed, payload: {data: null}})
  }
}

function* editStoneOriginSaga({payload: sampleType}: ActionWithPayload<IStoneOrigin>) {
  try {
    yield call(() => putStoneOrigin(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Origin successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putStoneOriginSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneOriginFailed, payload: {data: null}})
  }
}
function* setEditStoneOriginSaga({payload: sampleType}: ActionWithPayload<IStoneOrigin>) {
  try {
    yield put({type: actionTypes.storePrevStoneOriginDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneOriginFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllStoneOrigin, fetchStoneOrigin)
  yield takeLatest(actionTypes.postStoneOriginSuccess, fetchStoneOrigin)
  yield takeLatest(actionTypes.postStoneOrigin, postStoneOrigin)
  yield takeLatest(actionTypes.storePrevStoneOriginData, setEditStoneOriginSaga)
  yield takeLatest(actionTypes.putStoneOrigin, editStoneOriginSaga)
  yield takeLatest(actionTypes.putStoneOriginSuccess, fetchStoneOrigin)
  yield takeLatest(actionTypes.deleteStoneOrigin, deleteStoneOriginSaga)
  yield takeLatest(actionTypes.deleteStoneOriginSuccess, fetchStoneOrigin)
}
