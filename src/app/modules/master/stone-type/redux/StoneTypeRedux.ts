import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IStoneType} from '../model/StoneTypeModel'
import {deleteStoneType, fetchAllStoneType, putStoneType, sendStoneType} from './StoneTypeCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {stoneTypeIgnore} from '../../../../../setup/enc-ignore/stone-type-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllStoneType: '[STONE TYPE] Fetch All Stone Type',
  fetchAllStoneTypeSuccess: '[STONE TYPE] Fetch All Stone Type Success',
  fetchAllStoneTypeFailure: '[STONE TYPE] Fetch All Stone Type Faliled',
  postStoneType: '[STONE TYPE] Post Stone Type',
  postStoneTypeSuccess: '[STONE TYPE] Post Stone Type Success',
  postStoneTypeFailed: '[STONE TYPE] Post Stone Type Failed',
  storePrevStoneTypeData: '[STONE TYPE] Store Prev Data',
  storePrevStoneTypeDataFinish: '[STONE TYPE] Store Prev Data Finish',
  putStoneType: '[STONE TYPE] Put Stone Type',
  putStoneTypeSuccess: '[STONE TYPE] Put Stone Type Success',
  putStoneTypeFailed: '[STONE TYPE] Put Stone Type Failed',
  deleteStoneType: '[STONE TYPE] Delete Stone Type',
  deleteStoneTypeSuccess: '[STONE TYPE] Delete Stone Type Success',
  deleteStoneTypeFailed: '[STONE TYPE] Delete Stone Type Failed',
}

const initialStoneTypeState: IStoneTypeRedux = {
  data: [],
  payload: null,
}

export interface IStoneTypeRedux {
  data: IStoneType[] | null | undefined
  payload: IStoneType | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-stone-type', whitelist: ['data']},
  (state: IStoneTypeRedux = initialStoneTypeState, action: ActionWithPayload<IStoneTypeRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllStoneTypeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postStoneType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putStoneType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevStoneTypeDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllStoneType: () => ({type: actionTypes.fetchAllStoneType}),
  postStoneType: (payload: IStoneType) => ({type: actionTypes.postStoneType, payload}),
  deleteStoneType: (payload: IStoneType) => ({
    type: actionTypes.deleteStoneType,
    payload,
  }),
  editStoneType: (payload: IStoneType) => ({type: actionTypes.putStoneType, payload}),
  setEditStoneType: (payload: IStoneType) => ({
    type: actionTypes.storePrevStoneTypeData,
    payload,
  }),
}

function* fetchStoneType() {
  try {
    const response: {data: DefaultResponse<IStoneType[]>} = yield call(fetchAllStoneType)
    let data = encryptor.doDecrypt(response.data.data, stoneTypeIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllStoneTypeSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllStoneTypeFailure, payload: {data: null}})
  }
}

function* postStoneType({payload: sampleType}: ActionWithPayload<IStoneType>) {
  try {
    yield call(() => sendStoneType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Type successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postStoneTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postStoneTypeFailed, payload: {data: null}})
  }
}

function* deleteStoneTypeSaga({payload: sampleType}: ActionWithPayload<IStoneType>) {
  try {
    yield call(() => deleteStoneType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Type successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteStoneTypeSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteStoneTypeFailed, payload: {data: null}})
  }
}

function* editStoneTypeSaga({payload: sampleType}: ActionWithPayload<IStoneType>) {
  try {
    yield call(() => putStoneType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Type successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putStoneTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneTypeFailed, payload: {data: null}})
  }
}
function* setEditStoneTypeSaga({payload: sampleType}: ActionWithPayload<IStoneType>) {
  try {
    yield put({type: actionTypes.storePrevStoneTypeDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneTypeFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllStoneType, fetchStoneType)
  yield takeLatest(actionTypes.postStoneTypeSuccess, fetchStoneType)
  yield takeLatest(actionTypes.postStoneType, postStoneType)
  yield takeLatest(actionTypes.storePrevStoneTypeData, setEditStoneTypeSaga)
  yield takeLatest(actionTypes.putStoneType, editStoneTypeSaga)
  yield takeLatest(actionTypes.putStoneTypeSuccess, fetchStoneType)
  yield takeLatest(actionTypes.deleteStoneType, deleteStoneTypeSaga)
  yield takeLatest(actionTypes.deleteStoneTypeSuccess, fetchStoneType)
}
