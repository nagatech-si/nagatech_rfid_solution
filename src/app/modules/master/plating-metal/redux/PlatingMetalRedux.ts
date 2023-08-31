import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IPlatingMetal} from '../model/PlatingMetalModel'
import {
  deletePlatingMetal,
  fetchAllPlatingMetal,
  putPlatingMetal,
  sendPlatingMetal,
} from './PlatingMetalCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {platingMetalIgnore} from '../../../../../setup/enc-ignore/plating-metal-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllPlatingMetal: '[PLATING METAL] Fetch All Plating Metal',
  fetchAllPlatingMetalSuccess: '[PLATING METAL] Fetch All Plating Metal Success',
  fetchAllPlatingMetalFailure: '[PLATING METAL] Fetch All Plating Metal Faliled',
  postPlatingMetal: '[PLATING METAL] Post Plating Metal',
  postPlatingMetalSuccess: '[PLATING METAL] Post Plating Metal Success',
  postPlatingMetalFailed: '[PLATING METAL] Post Plating Metal Failed',
  storePrevPlatingMetalData: '[PLATING METAL] Store Prev Data',
  storePrevPlatingMetalDataFinish: '[PLATING METAL] Store Prev Data Finish',
  putPlatingMetal: '[PLATING METAL] Put Plating Metal',
  putPlatingMetalSuccess: '[PLATING METAL] Put Plating Metal Success',
  putPlatingMetalFailed: '[PLATING METAL] Put Plating Metal Failed',
  deletePlatingMetal: '[PLATING METAL] Delete Plating Metal',
  deletePlatingMetalSuccess: '[PLATING METAL] Delete Plating Metal Success',
  deletePlatingMetalFailed: '[PLATING METAL] Delete Plating Metal Failed',
}

const initialPlatingMetalState: IPlatingMetalRedux = {
  data: [],
  payload: null,
}

export interface IPlatingMetalRedux {
  data: IPlatingMetal[] | null | undefined
  payload: IPlatingMetal | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-plating-metal', whitelist: ['data']},
  (
    state: IPlatingMetalRedux = initialPlatingMetalState,
    action: ActionWithPayload<IPlatingMetalRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllPlatingMetalSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postPlatingMetal: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putPlatingMetal: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevPlatingMetalDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllPlatingMetal: () => ({type: actionTypes.fetchAllPlatingMetal}),
  postPlatingMetal: (payload: IPlatingMetal) => ({type: actionTypes.postPlatingMetal, payload}),
  deletePlatingMetal: (payload: IPlatingMetal) => ({
    type: actionTypes.deletePlatingMetal,
    payload,
  }),
  editPlatingMetal: (payload: IPlatingMetal) => ({type: actionTypes.putPlatingMetal, payload}),
  setEditPlatingMetal: (payload: IPlatingMetal) => ({
    type: actionTypes.storePrevPlatingMetalData,
    payload,
  }),
}

function* fetchPlatingMetal() {
  try {
    const response: {data: DefaultResponse<IPlatingMetal[]>} = yield call(fetchAllPlatingMetal)
    let data = encryptor.doDecrypt(response.data.data, platingMetalIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllPlatingMetalSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllPlatingMetalFailure, payload: {data: null}})
  }
}

function* postPlatingMetal({payload: sampleType}: ActionWithPayload<IPlatingMetal>) {
  try {
    yield call(() => sendPlatingMetal(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Plating Metal successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postPlatingMetalSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postPlatingMetalFailed, payload: {data: null}})
  }
}

function* deletePlatingMetalSaga({payload: sampleType}: ActionWithPayload<IPlatingMetal>) {
  try {
    yield call(() => deletePlatingMetal(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Plating Metal successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deletePlatingMetalSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deletePlatingMetalFailed, payload: {data: null}})
  }
}

function* editPlatingMetalSaga({payload: sampleType}: ActionWithPayload<IPlatingMetal>) {
  try {
    yield call(() => putPlatingMetal(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Plating Metal successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putPlatingMetalSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putPlatingMetalFailed, payload: {data: null}})
  }
}
function* setEditPlatingMetalSaga({payload: sampleType}: ActionWithPayload<IPlatingMetal>) {
  try {
    yield put({type: actionTypes.storePrevPlatingMetalDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putPlatingMetalFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllPlatingMetal, fetchPlatingMetal)
  yield takeLatest(actionTypes.postPlatingMetalSuccess, fetchPlatingMetal)
  yield takeLatest(actionTypes.postPlatingMetal, postPlatingMetal)
  yield takeLatest(actionTypes.storePrevPlatingMetalData, setEditPlatingMetalSaga)
  yield takeLatest(actionTypes.putPlatingMetal, editPlatingMetalSaga)
  yield takeLatest(actionTypes.putPlatingMetalSuccess, fetchPlatingMetal)
  yield takeLatest(actionTypes.deletePlatingMetal, deletePlatingMetalSaga)
  yield takeLatest(actionTypes.deletePlatingMetalSuccess, fetchPlatingMetal)
}
