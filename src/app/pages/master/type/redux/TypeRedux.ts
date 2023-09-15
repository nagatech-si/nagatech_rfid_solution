import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {IType} from '../model/TypeModel'
import {deleteType, fetchAllType, putType, sendType} from './TypeCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {INotification} from '../../../../../setup/notification/Notification'
import {getNotification} from '../../group/redux/GroupRedux'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllType: '[MASTER GROUP] Fetch All Type',
  fetchAllTypeSuccess: '[MASTER GROUP] Fetch All Type Success',
  fetchAllTypeFailure: '[MASTER GROUP] Fetch All Type Faliled',
  postType: '[MASTER GROUP] Post Type',
  postTypeSuccess: '[MASTER GROUP] Post Type Success',
  postTypeFailed: '[MASTER GROUP] Post Type Failed',
  storePrevTypeData: '[MASTER GROUP] Store Prev Data',
  storePrevTypeDataFinish: '[MASTER GROUP] Store Prev Data Finish',
  putType: '[MASTER GROUP] Put Type',
  putTypeSuccess: '[MASTER GROUP] Put Type Success',
  putTypeFailed: '[MASTER GROUP] Put Type Failed',
  deleteType: '[MASTER GROUP] Delete Type',
  deleteTypeSuccess: '[MASTER GROUP] Delete Type Success',
  deleteTypeFailed: '[MASTER GROUP] Delete Type Failed',
}

const initialTypeState: ITypeRedux = {
  data: [],
  payload: null,
}

export interface ITypeRedux {
  data: IType[] | null | undefined
  payload: IType | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-type', whitelist: ['data', 'payload']},
  (state: ITypeRedux = initialTypeState, action: ActionWithPayload<ITypeRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllTypeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevTypeDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllType: () => ({type: actionTypes.fetchAllType}),
  postType: (payload: IType) => ({type: actionTypes.postType, payload}),
  deleteType: (payload: IType) => ({type: actionTypes.deleteType, payload}),
  editType: (payload: IType) => ({type: actionTypes.putType, payload}),
  setEditType: (payload: IType) => ({
    type: actionTypes.storePrevTypeData,
    payload,
  }),
}

function* fetchType() {
  try {
    const response: {data: DefaultResponse<IType[]>} = yield call(fetchAllType)
    let data = encryptor.doDecrypt(response.data, ['kode_group', 'status', '_id', 'kode_jenis'])

    yield put({
      type: actionTypes.fetchAllTypeSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllTypeFailure, payload: {data: null}})
  }
}

function* postType({payload: sampleType}: ActionWithPayload<IType>) {
  try {
    yield call(() => sendType(sampleType!))
    const notification: INotification = yield select(getNotification)
    Swal.fire({
      title: notification.success,
      text: notification.addSuccess,
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postTypeFailed, payload: {data: null}})
  }
}

function* deleteTypeSaga({payload: sampleType}: ActionWithPayload<IType>) {
  try {
    yield call(() => deleteType(sampleType!))
    const notification: INotification = yield select(getNotification)
    Swal.fire({
      title: notification.success,
      text: notification.deleteSuccess,
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteTypeSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteTypeFailed, payload: {data: null}})
  }
}

function* editTypeSaga({payload: sampleType}: ActionWithPayload<IType>) {
  try {
    yield call(() => putType(sampleType!))
    const notification: INotification = yield select(getNotification)
    Swal.fire({
      title: notification.success,
      text: notification.updateSuccess,
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putTypeFailed, payload: {data: null}})
  }
}
function* setEditTypeSaga({payload: sampleType}: ActionWithPayload<IType>) {
  try {
    yield put({type: actionTypes.storePrevTypeDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putTypeFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllType, fetchType)
  yield takeLatest(actionTypes.postTypeSuccess, fetchType)
  yield takeLatest(actionTypes.postTypeFailed, fetchType)
  yield takeLatest(actionTypes.postType, postType)
  yield takeLatest(actionTypes.storePrevTypeData, setEditTypeSaga)
  yield takeLatest(actionTypes.putType, editTypeSaga)
  yield takeLatest(actionTypes.putTypeSuccess, fetchType)
  yield takeLatest(actionTypes.deleteType, deleteTypeSaga)
  yield takeLatest(actionTypes.deleteTypeSuccess, fetchType)
}
