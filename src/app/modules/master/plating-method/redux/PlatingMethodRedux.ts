import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IPlatingMethod} from '../model/PlatingMethodModel'
import {
  deletePlatingMethod,
  fetchAllPlatingMethod,
  putPlatingMethod,
  sendPlatingMethod,
} from './PlatingMethodCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {platingMethodIgnore} from '../../../../../setup/enc-ignore/plating-method-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllPlatingMethod: '[PLATING METHOD] Fetch All Plating Method',
  fetchAllPlatingMethodSuccess: '[PLATING METHOD] Fetch All Plating Method Success',
  fetchAllPlatingMethodFailure: '[PLATING METHOD] Fetch All Plating Method Faliled',
  postPlatingMethod: '[PLATING METHOD] Post Plating Method',
  postPlatingMethodSuccess: '[PLATING METHOD] Post Plating Method Success',
  postPlatingMethodFailed: '[PLATING METHOD] Post Plating Method Failed',
  storePrevPlatingMethodData: '[PLATING METHOD] Store Prev Data',
  storePrevPlatingMethodDataFinish: '[PLATING METHOD] Store Prev Data Finish',
  putPlatingMethod: '[PLATING METHOD] Put Plating Method',
  putPlatingMethodSuccess: '[PLATING METHOD] Put Plating Method Success',
  putPlatingMethodFailed: '[PLATING METHOD] Put Plating Method Failed',
  deletePlatingMethod: '[PLATING METHOD] Delete Plating Method',
  deletePlatingMethodSuccess: '[PLATING METHOD] Delete Plating Method Success',
  deletePlatingMethodFailed: '[PLATING METHOD] Delete Plating Method Failed',
}

const initialPlatingMethodState: IPlatingMethodRedux = {
  data: [],
  payload: null,
}

export interface IPlatingMethodRedux {
  data: IPlatingMethod[] | null | undefined
  payload: IPlatingMethod | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-plating-metal', whitelist: ['data']},
  (
    state: IPlatingMethodRedux = initialPlatingMethodState,
    action: ActionWithPayload<IPlatingMethodRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllPlatingMethodSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postPlatingMethod: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putPlatingMethod: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevPlatingMethodDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllPlatingMethod: () => ({type: actionTypes.fetchAllPlatingMethod}),
  postPlatingMethod: (payload: IPlatingMethod) => ({type: actionTypes.postPlatingMethod, payload}),
  deletePlatingMethod: (payload: IPlatingMethod) => ({
    type: actionTypes.deletePlatingMethod,
    payload,
  }),
  editPlatingMethod: (payload: IPlatingMethod) => ({type: actionTypes.putPlatingMethod, payload}),
  setEditPlatingMethod: (payload: IPlatingMethod) => ({
    type: actionTypes.storePrevPlatingMethodData,
    payload,
  }),
}

function* fetchPlatingMethod() {
  try {
    const response: {data: DefaultResponse<IPlatingMethod[]>} = yield call(fetchAllPlatingMethod)
    let data = encryptor.doDecrypt(response.data.data, platingMethodIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllPlatingMethodSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllPlatingMethodFailure, payload: {data: null}})
  }
}

function* postPlatingMethod({payload: sampleType}: ActionWithPayload<IPlatingMethod>) {
  try {
    yield call(() => sendPlatingMethod(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Plating Method successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postPlatingMethodSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postPlatingMethodFailed, payload: {data: null}})
  }
}

function* deletePlatingMethodSaga({payload: sampleType}: ActionWithPayload<IPlatingMethod>) {
  try {
    yield call(() => deletePlatingMethod(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Plating Method successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deletePlatingMethodSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deletePlatingMethodFailed, payload: {data: null}})
  }
}

function* editPlatingMethodSaga({payload: sampleType}: ActionWithPayload<IPlatingMethod>) {
  try {
    yield call(() => putPlatingMethod(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Plating Method successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putPlatingMethodSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putPlatingMethodFailed, payload: {data: null}})
  }
}
function* setEditPlatingMethodSaga({payload: sampleType}: ActionWithPayload<IPlatingMethod>) {
  try {
    yield put({type: actionTypes.storePrevPlatingMethodDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putPlatingMethodFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllPlatingMethod, fetchPlatingMethod)
  yield takeLatest(actionTypes.postPlatingMethodSuccess, fetchPlatingMethod)
  yield takeLatest(actionTypes.postPlatingMethod, postPlatingMethod)
  yield takeLatest(actionTypes.storePrevPlatingMethodData, setEditPlatingMethodSaga)
  yield takeLatest(actionTypes.putPlatingMethod, editPlatingMethodSaga)
  yield takeLatest(actionTypes.putPlatingMethodSuccess, fetchPlatingMethod)
  yield takeLatest(actionTypes.deletePlatingMethod, deletePlatingMethodSaga)
  yield takeLatest(actionTypes.deletePlatingMethodSuccess, fetchPlatingMethod)
}
