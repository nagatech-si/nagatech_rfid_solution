import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IStoneColour} from '../model/StoneColourModel'
import {
  deleteStoneColour,
  fetchAllStoneColour,
  putStoneColour,
  sendStoneColour,
} from './StoneColourCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {stoneColourIgnore} from '../../../../../setup/enc-ignore/stone-colour-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllStoneColour: '[STONE COLOUR] Fetch All Stone Colour',
  fetchAllStoneColourSuccess: '[STONE COLOUR] Fetch All Stone Colour Success',
  fetchAllStoneColourFailure: '[STONE COLOUR] Fetch All Stone Colour Faliled',
  postStoneColour: '[STONE COLOUR] Post Stone Colour',
  postStoneColourSuccess: '[STONE COLOUR] Post Stone Colour Success',
  postStoneColourFailed: '[STONE COLOUR] Post Stone Colour Failed',
  storePrevStoneColourData: '[STONE COLOUR] Store Prev Data',
  storePrevStoneColourDataFinish: '[STONE COLOUR] Store Prev Data Finish',
  putStoneColour: '[STONE COLOUR] Put Stone Colour',
  putStoneColourSuccess: '[STONE COLOUR] Put Stone Colour Success',
  putStoneColourFailed: '[STONE COLOUR] Put Stone Colour Failed',
  deleteStoneColour: '[STONE COLOUR] Delete Stone Colour',
  deleteStoneColourSuccess: '[STONE COLOUR] Delete Stone Colour Success',
  deleteStoneColourFailed: '[STONE COLOUR] Delete Stone Colour Failed',
}

const initialStoneColourState: IStoneColourRedux = {
  data: [],
  payload: null,
}

export interface IStoneColourRedux {
  data: IStoneColour[] | null | undefined
  payload: IStoneColour | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-stone-colour', whitelist: ['data']},
  (
    state: IStoneColourRedux = initialStoneColourState,
    action: ActionWithPayload<IStoneColourRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllStoneColourSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postStoneColour: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putStoneColour: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevStoneColourDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllStoneColour: () => ({type: actionTypes.fetchAllStoneColour}),
  postStoneColour: (payload: IStoneColour) => ({type: actionTypes.postStoneColour, payload}),
  deleteStoneColour: (payload: IStoneColour) => ({
    type: actionTypes.deleteStoneColour,
    payload,
  }),
  editStoneColour: (payload: IStoneColour) => ({type: actionTypes.putStoneColour, payload}),
  setEditStoneColour: (payload: IStoneColour) => ({
    type: actionTypes.storePrevStoneColourData,
    payload,
  }),
}

function* fetchStoneColour() {
  try {
    const response: {data: DefaultResponse<IStoneColour[]>} = yield call(fetchAllStoneColour)
    let data = encryptor.doDecrypt(response.data.data, stoneColourIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllStoneColourSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllStoneColourFailure, payload: {data: null}})
  }
}

function* postStoneColour({payload: sampleType}: ActionWithPayload<IStoneColour>) {
  try {
    yield call(() => sendStoneColour(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Colour successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postStoneColourSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postStoneColourFailed, payload: {data: null}})
  }
}

function* deleteStoneColourSaga({payload: sampleType}: ActionWithPayload<IStoneColour>) {
  try {
    yield call(() => deleteStoneColour(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Colour successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteStoneColourSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteStoneColourFailed, payload: {data: null}})
  }
}

function* editStoneColourSaga({payload: sampleType}: ActionWithPayload<IStoneColour>) {
  try {
    yield call(() => putStoneColour(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Colour successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putStoneColourSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneColourFailed, payload: {data: null}})
  }
}
function* setEditStoneColourSaga({payload: sampleType}: ActionWithPayload<IStoneColour>) {
  try {
    yield put({type: actionTypes.storePrevStoneColourDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneColourFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllStoneColour, fetchStoneColour)
  yield takeLatest(actionTypes.postStoneColourSuccess, fetchStoneColour)
  yield takeLatest(actionTypes.postStoneColour, postStoneColour)
  yield takeLatest(actionTypes.storePrevStoneColourData, setEditStoneColourSaga)
  yield takeLatest(actionTypes.putStoneColour, editStoneColourSaga)
  yield takeLatest(actionTypes.putStoneColourSuccess, fetchStoneColour)
  yield takeLatest(actionTypes.deleteStoneColour, deleteStoneColourSaga)
  yield takeLatest(actionTypes.deleteStoneColourSuccess, fetchStoneColour)
}
