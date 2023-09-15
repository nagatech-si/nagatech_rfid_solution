import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {ITray} from '../model/TrayModel'
import {deleteTray, fetchAllTray, putTray, sendTray} from './TrayCRUD'
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
  fetchAllTray: '[MASTER TRAY] Fetch All Tray',
  fetchAllTraySuccess: '[MASTER TRAY] Fetch All Tray Success',
  fetchAllTrayFailure: '[MASTER TRAY] Fetch All Tray Faliled',
  postTray: '[MASTER TRAY] Post Tray',
  postTraySuccess: '[MASTER TRAY] Post Tray Success',
  postTrayFailed: '[MASTER TRAY] Post Tray Failed',
  storePrevTrayData: '[MASTER TRAY] Store Prev Data',
  storePrevTrayDataFinish: '[MASTER TRAY] Store Prev Data Finish',
  putTray: '[MASTER TRAY] Put Tray',
  putTraySuccess: '[MASTER TRAY] Put Tray Success',
  putTrayFailed: '[MASTER TRAY] Put Tray Failed',
  deleteTray: '[MASTER TRAY] Delete Tray',
  deleteTraySuccess: '[MASTER TRAY] Delete Tray Success',
  deleteTrayFailed: '[MASTER TRAY] Delete Tray Failed',
}

const initialTrayState: ITrayRedux = {
  data: [],
  payload: null,
}

export interface ITrayRedux {
  data: ITray[] | null | undefined
  payload: ITray | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-tray', whitelist: ['data', 'payload']},
  (state: ITrayRedux = initialTrayState, action: ActionWithPayload<ITrayRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllTraySuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postTray: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putTray: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevTrayDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllTray: () => ({type: actionTypes.fetchAllTray}),
  postTray: (payload: ITray) => ({type: actionTypes.postTray, payload}),
  deleteTray: (payload: ITray) => ({type: actionTypes.deleteTray, payload}),
  editTray: (payload: ITray) => ({type: actionTypes.putTray, payload}),
  setEditTray: (payload: ITray) => ({
    type: actionTypes.storePrevTrayData,
    payload,
  }),
}

function* fetchTray() {
  try {
    const response: {data: DefaultResponse<ITray[]>} = yield call(fetchAllTray)
    let data = encryptor.doDecrypt(response.data, [
      'kode_group',
      'status',
      '_id',
      'kode_jenis',
      'kode_baki',
      'kode_gudang',
    ])

    yield put({
      type: actionTypes.fetchAllTraySuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllTrayFailure, payload: {data: null}})
  }
}

function* postTray({payload: sampleTray}: ActionWithPayload<ITray>) {
  try {
    yield call(() => sendTray(sampleTray!))
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
      type: actionTypes.postTraySuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postTrayFailed, payload: {data: null}})
  }
}

function* deleteTraySaga({payload: sampleTray}: ActionWithPayload<ITray>) {
  try {
    yield call(() => deleteTray(sampleTray!))
    const notification: INotification = yield select(getNotification)
    Swal.fire({
      title: notification.success,
      text: notification.deleteSuccess,
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    yield put({
      type: actionTypes.deleteTraySuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteTrayFailed, payload: {data: null}})
  }
}

function* editTraySaga({payload: sampleTray}: ActionWithPayload<ITray>) {
  try {
    yield call(() => putTray(sampleTray!))
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
      type: actionTypes.putTraySuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putTrayFailed, payload: {data: null}})
  }
}
function* setEditTraySaga({payload: sampleTray}: ActionWithPayload<ITray>) {
  try {
    yield put({type: actionTypes.storePrevTrayDataFinish, payload: {payload: sampleTray}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putTrayFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllTray, fetchTray)
  yield takeLatest(actionTypes.postTraySuccess, fetchTray)
  yield takeLatest(actionTypes.postTrayFailed, fetchTray)
  yield takeLatest(actionTypes.postTray, postTray)
  yield takeLatest(actionTypes.storePrevTrayData, setEditTraySaga)
  yield takeLatest(actionTypes.putTray, editTraySaga)
  yield takeLatest(actionTypes.putTraySuccess, fetchTray)
  yield takeLatest(actionTypes.deleteTray, deleteTraySaga)
  yield takeLatest(actionTypes.deleteTraySuccess, fetchTray)
}
