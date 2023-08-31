import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IMaterialMetalTitle} from '../model/MaterialMetalTitleModel'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {
  deleteMaterialMetalTitle,
  fetchAllMaterialMetalTitle,
  putMaterialMetalTitle,
  sendMaterialMetalTitle,
} from './MaterialMetalTitleCRUD'

import {materialMetalTitleIgnore} from '../../../../../setup/enc-ignore/material-metal-title-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllMaterialMetalTitle: '[MATERIAL TITLE] Fetch All Material Metal Title',
  fetchAllMaterialMetalTitleSuccess: '[MATERIAL TITLE] Fetch All Material Metal Title Success',
  fetchAllMaterialMetalTitleFailure: '[MATERIAL TITLE] Fetch All Material Metal Title Faliled',
  postMaterialMetalTitle: '[MATERIAL TITLE] Post Material Metal Title',
  postMaterialMetalTitleSuccess: '[MATERIAL TITLE] Post Material Metal Title Success',
  postMaterialMetalTitleFailed: '[MATERIAL TITLE] Post Material Metal Title Failed',
  storePrevMaterialMetalTitleData: '[MATERIAL TITLE] Store Prev Data',
  storePrevMaterialMetalTitleDataFinish: '[MATERIAL TITLE] Store Prev Data Finish',
  putMaterialMetalTitle: '[MATERIAL TITLE] Put Material Metal Title',
  putMaterialMetalTitleSuccess: '[MATERIAL TITLE] Put Material Metal Title Success',
  putMaterialMetalTitleFailed: '[MATERIAL TITLE] Put Material Metal Title Failed',
  deleteMaterialMetalTitle: '[MATERIAL TITLE] Delete Material Metal Title',
  deleteMaterialMetalTitleSuccess: '[MATERIAL TITLE] Delete Material Metal Title Success',
  deleteMaterialMetalTitleFailed: '[MATERIAL TITLE] Delete Material Metal Title Failed',
}

const initialMaterialMetalTitleState: IMaterialMetalTitleRedux = {
  data: [],
  payload: null,
}

export interface IMaterialMetalTitleRedux {
  data: IMaterialMetalTitle[] | null | undefined
  payload: IMaterialMetalTitle | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-material-metal-title', whitelist: ['data']},
  (
    state: IMaterialMetalTitleRedux = initialMaterialMetalTitleState,
    action: ActionWithPayload<IMaterialMetalTitleRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllMaterialMetalTitleSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postMaterialMetalTitle: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putMaterialMetalTitle: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevMaterialMetalTitleDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllMaterialMetalTitle: () => ({type: actionTypes.fetchAllMaterialMetalTitle}),
  postMaterialMetalTitle: (payload: IMaterialMetalTitle) => ({
    type: actionTypes.postMaterialMetalTitle,
    payload,
  }),
  deleteMaterialMetalTitle: (payload: IMaterialMetalTitle) => ({
    type: actionTypes.deleteMaterialMetalTitle,
    payload,
  }),
  editMaterialMetalTitle: (payload: IMaterialMetalTitle) => ({
    type: actionTypes.putMaterialMetalTitle,
    payload,
  }),
  setEditMaterialMetalTitle: (payload: IMaterialMetalTitle) => ({
    type: actionTypes.storePrevMaterialMetalTitleData,
    payload,
  }),
}

function* fetchMaterialMetalTitle() {
  try {
    const response: {data: DefaultResponse<IMaterialMetalTitle[]>} = yield call(
      fetchAllMaterialMetalTitle
    )
    let data = encryptor.doDecrypt(response.data.data, materialMetalTitleIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllMaterialMetalTitleSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllMaterialMetalTitleFailure, payload: {data: null}})
  }
}

function* postMaterialMetalTitle({payload: sampleType}: ActionWithPayload<IMaterialMetalTitle>) {
  try {
    yield call(() => sendMaterialMetalTitle(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Material Metal Title successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postMaterialMetalTitleSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postMaterialMetalTitleFailed, payload: {data: null}})
  }
}

function* deleteMaterialMetalTitleSaga({
  payload: sampleType,
}: ActionWithPayload<IMaterialMetalTitle>) {
  try {
    yield call(() => deleteMaterialMetalTitle(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Material Metal Title successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteMaterialMetalTitleSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteMaterialMetalTitleFailed, payload: {data: null}})
  }
}

function* editMaterialMetalTitleSaga({
  payload: sampleType,
}: ActionWithPayload<IMaterialMetalTitle>) {
  try {
    yield call(() => putMaterialMetalTitle(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Material Metal Title successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putMaterialMetalTitleSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putMaterialMetalTitleFailed, payload: {data: null}})
  }
}
function* setEditMaterialMetalTitleSaga({
  payload: sampleType,
}: ActionWithPayload<IMaterialMetalTitle>) {
  try {
    yield put({
      type: actionTypes.storePrevMaterialMetalTitleDataFinish,
      payload: {payload: sampleType},
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putMaterialMetalTitleFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllMaterialMetalTitle, fetchMaterialMetalTitle)
  yield takeLatest(actionTypes.postMaterialMetalTitleSuccess, fetchMaterialMetalTitle)
  yield takeLatest(actionTypes.postMaterialMetalTitle, postMaterialMetalTitle)
  yield takeLatest(actionTypes.storePrevMaterialMetalTitleData, setEditMaterialMetalTitleSaga)
  yield takeLatest(actionTypes.putMaterialMetalTitle, editMaterialMetalTitleSaga)
  yield takeLatest(actionTypes.putMaterialMetalTitleSuccess, fetchMaterialMetalTitle)
  yield takeLatest(actionTypes.deleteMaterialMetalTitle, deleteMaterialMetalTitleSaga)
  yield takeLatest(actionTypes.deleteMaterialMetalTitleSuccess, fetchMaterialMetalTitle)
}
