import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IPlatingColour} from '../model/PlatingColourModel'
import {
  deletePlatingColour,
  fetchAllPlatingColour,
  putPlatingColour,
  sendPlatingColour,
} from './PlatingColourCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {platingColourIgnore} from '../../../../../setup/enc-ignore/plating-colour-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllPlatingColour: '[PLATING COLOUR] Fetch All Plating Colour',
  fetchAllPlatingColourSuccess: '[PLATING COLOUR] Fetch All Plating Colour Success',
  fetchAllPlatingColourFailure: '[PLATING COLOUR] Fetch All Plating Colour Faliled',
  postPlatingColour: '[PLATING COLOUR] Post Plating Colour',
  postPlatingColourSuccess: '[PLATING COLOUR] Post Plating Colour Success',
  postPlatingColourFailed: '[PLATING COLOUR] Post Plating Colour Failed',
  storePrevPlatingColourData: '[PLATING COLOUR] Store Prev Data',
  storePrevPlatingColourDataFinish: '[PLATING COLOUR] Store Prev Data Finish',
  putPlatingColour: '[PLATING COLOUR] Put Plating Colour',
  putPlatingColourSuccess: '[PLATING COLOUR] Put Plating Colour Success',
  putPlatingColourFailed: '[PLATING COLOUR] Put Plating Colour Failed',
  deletePlatingColour: '[PLATING COLOUR] Delete Plating Colour',
  deletePlatingColourSuccess: '[PLATING COLOUR] Delete Plating Colour Success',
  deletePlatingColourFailed: '[PLATING COLOUR] Delete Plating Colour Failed',
}

const initialPlatingColourState: IPlatingColourRedux = {
  data: [],
  payload: null,
}

export interface IPlatingColourRedux {
  data: IPlatingColour[] | null | undefined
  payload: IPlatingColour | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-plating-colour', whitelist: ['data']},
  (
    state: IPlatingColourRedux = initialPlatingColourState,
    action: ActionWithPayload<IPlatingColourRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllPlatingColourSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postPlatingColour: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putPlatingColour: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevPlatingColourDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllPlatingColour: () => ({type: actionTypes.fetchAllPlatingColour}),
  postPlatingColour: (payload: IPlatingColour) => ({type: actionTypes.postPlatingColour, payload}),
  deletePlatingColour: (payload: IPlatingColour) => ({
    type: actionTypes.deletePlatingColour,
    payload,
  }),
  editPlatingColour: (payload: IPlatingColour) => ({type: actionTypes.putPlatingColour, payload}),
  setEditPlatingColour: (payload: IPlatingColour) => ({
    type: actionTypes.storePrevPlatingColourData,
    payload,
  }),
}

function* fetchPlatingColour() {
  try {
    const response: {data: DefaultResponse<IPlatingColour[]>} = yield call(fetchAllPlatingColour)
    let data = encryptor.doDecrypt(response.data.data, platingColourIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllPlatingColourSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllPlatingColourFailure, payload: {data: null}})
  }
}

function* postPlatingColour({payload: sampleType}: ActionWithPayload<IPlatingColour>) {
  try {
    yield call(() => sendPlatingColour(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Plating Colour successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postPlatingColourSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postPlatingColourFailed, payload: {data: null}})
  }
}

function* deletePlatingColourSaga({payload: sampleType}: ActionWithPayload<IPlatingColour>) {
  try {
    yield call(() => deletePlatingColour(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Plating Colour successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deletePlatingColourSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deletePlatingColourFailed, payload: {data: null}})
  }
}

function* editPlatingColourSaga({payload: sampleType}: ActionWithPayload<IPlatingColour>) {
  try {
    yield call(() => putPlatingColour(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Plating Colour successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putPlatingColourSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putPlatingColourFailed, payload: {data: null}})
  }
}
function* setEditPlatingColourSaga({payload: sampleType}: ActionWithPayload<IPlatingColour>) {
  try {
    yield put({type: actionTypes.storePrevPlatingColourDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putPlatingColourFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllPlatingColour, fetchPlatingColour)
  yield takeLatest(actionTypes.postPlatingColourSuccess, fetchPlatingColour)
  yield takeLatest(actionTypes.postPlatingColour, postPlatingColour)
  yield takeLatest(actionTypes.storePrevPlatingColourData, setEditPlatingColourSaga)
  yield takeLatest(actionTypes.putPlatingColour, editPlatingColourSaga)
  yield takeLatest(actionTypes.putPlatingColourSuccess, fetchPlatingColour)
  yield takeLatest(actionTypes.deletePlatingColour, deletePlatingColourSaga)
  yield takeLatest(actionTypes.deletePlatingColourSuccess, fetchPlatingColour)
}
