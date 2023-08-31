import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IFinishType} from '../model/FinishTypeModel'
import {deleteFinishType, fetchAllFinishType, putFinishType, sendFinishType} from './FinishTypeCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {finishTypeIgnore} from '../../../../../setup/enc-ignore/finish-type-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllFinishType: '[FINISH TYPE] Fetch All Finish Types',
  fetchAllFinishTypeSuccess: '[FINISH TYPE] Fetch All Finish Types Success',
  fetchAllFinishTypeFailure: '[FINISH TYPE] Fetch All Finish Types Faliled',
  postFinishType: '[FINISH TYPE] Post Finish Type',
  postFinishTypeSuccess: '[FINISH TYPE] Post Finish Type Success',
  postFinishTypeFailed: '[FINISH TYPE] Post Finish Type Failed',
  storePrevFinishTypeData: '[FINISH TYPE] Store Prev Data',
  storePrevFinishTypeDataFinish: '[FINISH TYPE] Store Prev Data Finish',
  putFinishType: '[FINISH TYPE] Put Finish Type',
  putFinishTypeSuccess: '[FINISH TYPE] Put Finish Type Success',
  putFinishTypeFailed: '[FINISH TYPE] Put Finish Type Failed',
  deleteFinishType: '[FINISH TYPE] Delete Finish Type',
  deleteFinishTypeSuccess: '[FINISH TYPE] Delete Finish Type Success',
  deleteFinishTypeFailed: '[FINISH TYPE] Delete Finish Type Failed',
}

const initialFinishTypeState: IFinishTypeRedux = {
  data: [],
  payload: null,
}

export interface IFinishTypeRedux {
  data: IFinishType[] | null | undefined
  payload: IFinishType | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-finish-type', whitelist: ['data']},
  (
    state: IFinishTypeRedux = initialFinishTypeState,
    action: ActionWithPayload<IFinishTypeRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllFinishTypeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postFinishType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putFinishType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevFinishTypeDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllFinishType: () => ({type: actionTypes.fetchAllFinishType}),
  postFinishType: (payload: IFinishType) => ({type: actionTypes.postFinishType, payload}),
  deleteFinishType: (payload: IFinishType) => ({type: actionTypes.deleteFinishType, payload}),
  editFinishType: (payload: IFinishType) => ({type: actionTypes.putFinishType, payload}),
  setEditFinishType: (payload: IFinishType) => ({
    type: actionTypes.storePrevFinishTypeData,
    payload,
  }),
}

function* fetchFinishType() {
  try {
    console.log('Fetch finish type')

    const response: {data: DefaultResponse<IFinishType[]>} = yield call(fetchAllFinishType)
    let data = encryptor.doDecrypt(response.data.data, finishTypeIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllFinishTypeSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllFinishTypeFailure, payload: {data: null}})
  }
}

function* postFinishType({payload: sampleType}: ActionWithPayload<IFinishType>) {
  try {
    yield call(() => sendFinishType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Finish Type successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postFinishTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postFinishTypeFailed, payload: {data: null}})
  }
}

function* deleteFinishTypeSaga({payload: sampleType}: ActionWithPayload<IFinishType>) {
  try {
    yield call(() => deleteFinishType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Finish Type successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteFinishTypeSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteFinishTypeFailed, payload: {data: null}})
  }
}

function* editFinishTypeSaga({payload: sampleType}: ActionWithPayload<IFinishType>) {
  try {
    yield call(() => putFinishType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Finish Type successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putFinishTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putFinishTypeFailed, payload: {data: null}})
  }
}
function* setEditFinishTypeSaga({payload: sampleType}: ActionWithPayload<IFinishType>) {
  try {
    yield put({type: actionTypes.storePrevFinishTypeDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putFinishTypeFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllFinishType, fetchFinishType)
  yield takeLatest(actionTypes.postFinishTypeSuccess, fetchFinishType)
  yield takeLatest(actionTypes.postFinishType, postFinishType)
  yield takeLatest(actionTypes.storePrevFinishTypeData, setEditFinishTypeSaga)
  yield takeLatest(actionTypes.putFinishType, editFinishTypeSaga)
  yield takeLatest(actionTypes.putFinishTypeSuccess, fetchFinishType)
  yield takeLatest(actionTypes.deleteFinishType, deleteFinishTypeSaga)
  yield takeLatest(actionTypes.deleteFinishTypeSuccess, fetchFinishType)
}
