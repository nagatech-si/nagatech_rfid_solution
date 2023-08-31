import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IMetalColourType} from '../model/MetalColourTypeModel'
import {
  deleteMetalColourType,
  fetchAllMetalColourType,
  putMetalColourType,
  sendMetalColourType,
} from './MetalColourTypeCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {metalColourIgnore} from '../../../../../setup/enc-ignore/metal-colour-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllMetalColourType: '[MATERIAL COLOUR] Fetch All Metal Colour Type',
  fetchAllMetalColourTypeSuccess: '[MATERIAL COLOUR] Fetch All Metal Colour Type Success',
  fetchAllMetalColourTypeFailure: '[MATERIAL COLOUR] Fetch All Metal Colour Type Faliled',
  postMetalColourType: '[MATERIAL COLOUR] Post Metal Colour Type',
  postMetalColourTypeSuccess: '[MATERIAL COLOUR] Post Metal Colour Type Success',
  postMetalColourTypeFailed: '[MATERIAL COLOUR] Post Metal Colour Type Failed',
  storePrevMetalColourTypeData: '[MATERIAL COLOUR] Store Prev Data',
  storePrevMetalColourTypeDataFinish: '[MATERIAL COLOUR] Store Prev Data Finish',
  putMetalColourType: '[MATERIAL COLOUR] Put Metal Colour Type',
  putMetalColourTypeSuccess: '[MATERIAL COLOUR] Put Metal Colour Type Success',
  putMetalColourTypeFailed: '[MATERIAL COLOUR] Put Metal Colour Type Failed',
  deleteMetalColourType: '[MATERIAL COLOUR] Delete Metal Colour Type',
  deleteMetalColourTypeSuccess: '[MATERIAL COLOUR] Delete Metal Colour Type Success',
  deleteMetalColourTypeFailed: '[MATERIAL COLOUR] Delete Metal Colour Type Failed',
}

const initialMetalColourTypeState: IMetalColourTypeRedux = {
  data: [],
  payload: null,
}

export interface IMetalColourTypeRedux {
  data: IMetalColourType[] | null | undefined
  payload: IMetalColourType | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-metal-colour-type', whitelist: ['data']},
  (
    state: IMetalColourTypeRedux = initialMetalColourTypeState,
    action: ActionWithPayload<IMetalColourTypeRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllMetalColourTypeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postMetalColourType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putMetalColourType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevMetalColourTypeDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllMetalColourType: () => ({type: actionTypes.fetchAllMetalColourType}),
  postMetalColourType: (payload: IMetalColourType) => ({
    type: actionTypes.postMetalColourType,
    payload,
  }),
  deleteMetalColourType: (payload: IMetalColourType) => ({
    type: actionTypes.deleteMetalColourType,
    payload,
  }),
  editMetalColourType: (payload: IMetalColourType) => ({
    type: actionTypes.putMetalColourType,
    payload,
  }),
  setEditMetalColourType: (payload: IMetalColourType) => ({
    type: actionTypes.storePrevMetalColourTypeData,
    payload,
  }),
}

function* fetchMetalColourType() {
  try {
    const response: {data: DefaultResponse<IMetalColourType[]>} = yield call(
      fetchAllMetalColourType
    )
    let data = encryptor.doDecrypt(response.data.data, metalColourIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllMetalColourTypeSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllMetalColourTypeFailure, payload: {data: null}})
  }
}

function* postMetalColourType({payload: sampleType}: ActionWithPayload<IMetalColourType>) {
  try {
    yield call(() => sendMetalColourType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Metal Colour Type successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postMetalColourTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postMetalColourTypeFailed, payload: {data: null}})
  }
}

function* deleteMetalColourTypeSaga({payload: sampleType}: ActionWithPayload<IMetalColourType>) {
  try {
    yield call(() => deleteMetalColourType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Metal Colour Type successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteMetalColourTypeSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteMetalColourTypeFailed, payload: {data: null}})
  }
}

function* editMetalColourTypeSaga({payload: sampleType}: ActionWithPayload<IMetalColourType>) {
  try {
    yield call(() => putMetalColourType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Metal Colour Type successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putMetalColourTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putMetalColourTypeFailed, payload: {data: null}})
  }
}
function* setEditMetalColourTypeSaga({payload: sampleType}: ActionWithPayload<IMetalColourType>) {
  try {
    yield put({
      type: actionTypes.storePrevMetalColourTypeDataFinish,
      payload: {payload: sampleType},
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putMetalColourTypeFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllMetalColourType, fetchMetalColourType)
  yield takeLatest(actionTypes.postMetalColourTypeSuccess, fetchMetalColourType)
  yield takeLatest(actionTypes.postMetalColourType, postMetalColourType)
  yield takeLatest(actionTypes.storePrevMetalColourTypeData, setEditMetalColourTypeSaga)
  yield takeLatest(actionTypes.putMetalColourType, editMetalColourTypeSaga)
  yield takeLatest(actionTypes.putMetalColourTypeSuccess, fetchMetalColourType)
  yield takeLatest(actionTypes.deleteMetalColourType, deleteMetalColourTypeSaga)
  yield takeLatest(actionTypes.deleteMetalColourTypeSuccess, fetchMetalColourType)
}
