import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IStoneCut} from '../model/StoneCutModel'
import {deleteStoneCut, fetchAllStoneCut, putStoneCut, sendStoneCut} from './StoneCutCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {stoneCutIgnore} from '../../../../../setup/enc-ignore/stone-cut-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllStoneCut: '[STONE CUT] Fetch All Stone Cut',
  fetchAllStoneCutSuccess: '[STONE CUT] Fetch All Stone Cut Success',
  fetchAllStoneCutFailure: '[STONE CUT] Fetch All Stone Cut Faliled',
  postStoneCut: '[STONE CUT] Post Stone Cut',
  postStoneCutSuccess: '[STONE CUT] Post Stone Cut Success',
  postStoneCutFailed: '[STONE CUT] Post Stone Cut Failed',
  storePrevStoneCutData: '[STONE CUT] Store Prev Data',
  storePrevStoneCutDataFinish: '[STONE CUT] Store Prev Data Finish',
  putStoneCut: '[STONE CUT] Put Stone Cut',
  putStoneCutSuccess: '[STONE CUT] Put Stone Cut Success',
  putStoneCutFailed: '[STONE CUT] Put Stone Cut Failed',
  deleteStoneCut: '[STONE CUT] Delete Stone Cut',
  deleteStoneCutSuccess: '[STONE CUT] Delete Stone Cut Success',
  deleteStoneCutFailed: '[STONE CUT] Delete Stone Cut Failed',
}

const initialStoneCutState: IStoneCutRedux = {
  data: [],
  payload: null,
}

export interface IStoneCutRedux {
  data: IStoneCut[] | null | undefined
  payload: IStoneCut | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-stone-cut', whitelist: ['data']},
  (state: IStoneCutRedux = initialStoneCutState, action: ActionWithPayload<IStoneCutRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllStoneCutSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postStoneCut: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putStoneCut: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevStoneCutDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllStoneCut: () => ({type: actionTypes.fetchAllStoneCut}),
  postStoneCut: (payload: IStoneCut) => ({type: actionTypes.postStoneCut, payload}),
  deleteStoneCut: (payload: IStoneCut) => ({
    type: actionTypes.deleteStoneCut,
    payload,
  }),
  editStoneCut: (payload: IStoneCut) => ({type: actionTypes.putStoneCut, payload}),
  setEditStoneCut: (payload: IStoneCut) => ({
    type: actionTypes.storePrevStoneCutData,
    payload,
  }),
}

function* fetchStoneCut() {
  try {
    const response: {data: DefaultResponse<IStoneCut[]>} = yield call(fetchAllStoneCut)
    let data = encryptor.doDecrypt(response.data.data, stoneCutIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllStoneCutSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllStoneCutFailure, payload: {data: null}})
  }
}

function* postStoneCut({payload: sampleType}: ActionWithPayload<IStoneCut>) {
  try {
    yield call(() => sendStoneCut(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Cut successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postStoneCutSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postStoneCutFailed, payload: {data: null}})
  }
}

function* deleteStoneCutSaga({payload: sampleType}: ActionWithPayload<IStoneCut>) {
  try {
    yield call(() => deleteStoneCut(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Cut successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteStoneCutSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteStoneCutFailed, payload: {data: null}})
  }
}

function* editStoneCutSaga({payload: sampleType}: ActionWithPayload<IStoneCut>) {
  try {
    yield call(() => putStoneCut(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Cut successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putStoneCutSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneCutFailed, payload: {data: null}})
  }
}
function* setEditStoneCutSaga({payload: sampleType}: ActionWithPayload<IStoneCut>) {
  try {
    yield put({type: actionTypes.storePrevStoneCutDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneCutFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllStoneCut, fetchStoneCut)
  yield takeLatest(actionTypes.postStoneCutSuccess, fetchStoneCut)
  yield takeLatest(actionTypes.postStoneCut, postStoneCut)
  yield takeLatest(actionTypes.storePrevStoneCutData, setEditStoneCutSaga)
  yield takeLatest(actionTypes.putStoneCut, editStoneCutSaga)
  yield takeLatest(actionTypes.putStoneCutSuccess, fetchStoneCut)
  yield takeLatest(actionTypes.deleteStoneCut, deleteStoneCutSaga)
  yield takeLatest(actionTypes.deleteStoneCutSuccess, fetchStoneCut)
}
