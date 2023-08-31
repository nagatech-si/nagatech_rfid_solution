import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IMaterialType} from '../model/MaterialTypeModel'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {
  deleteMaterialType,
  fetchAllMaterialType,
  putMaterialType,
  sendMaterialType,
} from './MaterialTypeCRUD'
import {materialTypeIgnore} from '../../../../../setup/enc-ignore/material-type-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllMaterialType: '[MATERIAL TYPE] Fetch All Material Types',
  fetchAllMaterialTypeSuccess: '[MATERIAL TYPE] Fetch All Material Types Success',
  fetchAllMaterialTypeFailure: '[MATERIAL TYPE] Fetch All Material Types Faliled',
  postMaterialType: '[MATERIAL TYPE] Post Material Type',
  postMaterialTypeSuccess: '[MATERIAL TYPE] Post Material Type Success',
  postMaterialTypeFailed: '[MATERIAL TYPE] Post Material Type Failed',
  storePrevMaterialTypeData: '[MATERIAL TYPE] Store Prev Data',
  storePrevMaterialTypeDataFinish: '[MATERIAL TYPE] Store Prev Data Finish',
  putMaterialType: '[MATERIAL TYPE] Put Material Type',
  putMaterialTypeSuccess: '[MATERIAL TYPE] Put Material Type Success',
  putMaterialTypeFailed: '[MATERIAL TYPE] Put Material Type Failed',
  deleteMaterialType: '[MATERIAL TYPE] Delete Material Type',
  deleteMaterialTypeSuccess: '[MATERIAL TYPE] Delete Material Type Success',
  deleteMaterialTypeFailed: '[MATERIAL TYPE] Delete Material Type Failed',
}

const initialMaterialTypeState: IMaterialTypeRedux = {
  data: [],
  payload: null,
}

export interface IMaterialTypeRedux {
  data: IMaterialType[] | null | undefined
  payload: IMaterialType | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-material-type', whitelist: ['data']},
  (
    state: IMaterialTypeRedux = initialMaterialTypeState,
    action: ActionWithPayload<IMaterialTypeRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllMaterialTypeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postMaterialType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putMaterialType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevMaterialTypeDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllMaterialType: () => ({type: actionTypes.fetchAllMaterialType}),
  postMaterialType: (payload: IMaterialType) => ({type: actionTypes.postMaterialType, payload}),
  deleteMaterialType: (payload: IMaterialType) => ({type: actionTypes.deleteMaterialType, payload}),
  editMaterialType: (payload: IMaterialType) => ({type: actionTypes.putMaterialType, payload}),
  setEditMaterialType: (payload: IMaterialType) => ({
    type: actionTypes.storePrevMaterialTypeData,
    payload,
  }),
}

function* fetchMaterialType() {
  try {
    const response: {data: DefaultResponse<IMaterialType[]>} = yield call(fetchAllMaterialType)
    let data = encryptor.doDecrypt(response.data.data, materialTypeIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllMaterialTypeSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllMaterialTypeFailure, payload: {data: null}})
  }
}

function* postMaterialType({payload: sampleType}: ActionWithPayload<IMaterialType>) {
  try {
    yield call(() => sendMaterialType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Material Type successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postMaterialTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postMaterialTypeFailed, payload: {data: null}})
  }
}

function* deleteMaterialTypeSaga({payload: sampleType}: ActionWithPayload<IMaterialType>) {
  try {
    yield call(() => deleteMaterialType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Material Type successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteMaterialTypeSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteMaterialTypeFailed, payload: {data: null}})
  }
}

function* editMaterialTypeSaga({payload: sampleType}: ActionWithPayload<IMaterialType>) {
  try {
    yield call(() => putMaterialType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Material Type successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putMaterialTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putMaterialTypeFailed, payload: {data: null}})
  }
}
function* setEditMaterialTypeSaga({payload: sampleType}: ActionWithPayload<IMaterialType>) {
  try {
    yield put({type: actionTypes.storePrevMaterialTypeDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putMaterialTypeFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllMaterialType, fetchMaterialType)
  yield takeLatest(actionTypes.postMaterialTypeSuccess, fetchMaterialType)
  yield takeLatest(actionTypes.postMaterialType, postMaterialType)
  yield takeLatest(actionTypes.storePrevMaterialTypeData, setEditMaterialTypeSaga)
  yield takeLatest(actionTypes.putMaterialType, editMaterialTypeSaga)
  yield takeLatest(actionTypes.putMaterialTypeSuccess, fetchMaterialType)
  yield takeLatest(actionTypes.deleteMaterialType, deleteMaterialTypeSaga)
  yield takeLatest(actionTypes.deleteMaterialTypeSuccess, fetchMaterialType)
}
