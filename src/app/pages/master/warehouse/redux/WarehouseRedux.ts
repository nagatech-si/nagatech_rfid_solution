import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {IWarehouse} from '../model/WarehouseModel'
import {deleteWarehouse, fetchAllWarehouse, putWarehouse, sendWarehouse} from './WarehouseCRUD'
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
  fetchAllWarehouse: '[MASTER GROUP] Fetch All Warehouse',
  fetchAllWarehouseSuccess: '[MASTER GROUP] Fetch All Warehouse Success',
  fetchAllWarehouseFailure: '[MASTER GROUP] Fetch All Warehouse Faliled',
  postWarehouse: '[MASTER GROUP] Post Warehouse',
  postWarehouseSuccess: '[MASTER GROUP] Post Warehouse Success',
  postWarehouseFailed: '[MASTER GROUP] Post Warehouse Failed',
  storePrevWarehouseData: '[MASTER GROUP] Store Prev Data',
  storePrevWarehouseDataFinish: '[MASTER GROUP] Store Prev Data Finish',
  putWarehouse: '[MASTER GROUP] Put Warehouse',
  putWarehouseSuccess: '[MASTER GROUP] Put Warehouse Success',
  putWarehouseFailed: '[MASTER GROUP] Put Warehouse Failed',
  deleteWarehouse: '[MASTER GROUP] Delete Warehouse',
  deleteWarehouseSuccess: '[MASTER GROUP] Delete Warehouse Success',
  deleteWarehouseFailed: '[MASTER GROUP] Delete Warehouse Failed',
}

const initialWarehouseState: IWarehouseRedux = {
  data: [],
  payload: null,
}

export interface IWarehouseRedux {
  data: IWarehouse[] | null | undefined
  payload: IWarehouse | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-warehouse', whitelist: ['data', 'payload']},
  (state: IWarehouseRedux = initialWarehouseState, action: ActionWithPayload<IWarehouseRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllWarehouseSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postWarehouse: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putWarehouse: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevWarehouseDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllWarehouse: () => ({type: actionTypes.fetchAllWarehouse}),
  postWarehouse: (payload: IWarehouse) => ({type: actionTypes.postWarehouse, payload}),
  deleteWarehouse: (payload: IWarehouse) => ({type: actionTypes.deleteWarehouse, payload}),
  editWarehouse: (payload: IWarehouse) => ({type: actionTypes.putWarehouse, payload}),
  setEditWarehouse: (payload: IWarehouse) => ({
    type: actionTypes.storePrevWarehouseData,
    payload,
  }),
}

function* fetchWarehouse() {
  try {
    const response: {data: DefaultResponse<IWarehouse[]>} = yield call(fetchAllWarehouse)
    let data = encryptor.doDecrypt(response.data, ['kode_gudang', 'status', '_id'])

    yield put({
      type: actionTypes.fetchAllWarehouseSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllWarehouseFailure, payload: {data: null}})
  }
}

function* postWarehouse({payload: sampleWarehouse}: ActionWithPayload<IWarehouse>) {
  try {
    yield call(() => sendWarehouse(sampleWarehouse!))
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
      type: actionTypes.postWarehouseSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postWarehouseFailed, payload: {data: null}})
  }
}

function* deleteWarehouseSaga({payload: sampleWarehouse}: ActionWithPayload<IWarehouse>) {
  try {
    yield call(() => deleteWarehouse(sampleWarehouse!))
    const notification: INotification = yield select(getNotification)
    Swal.fire({
      title: notification.success,
      text: notification.deleteSuccess,
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteWarehouseSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteWarehouseFailed, payload: {data: null}})
  }
}

function* editWarehouseSaga({payload: sampleWarehouse}: ActionWithPayload<IWarehouse>) {
  try {
    yield call(() => putWarehouse(sampleWarehouse!))
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
      type: actionTypes.putWarehouseSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putWarehouseFailed, payload: {data: null}})
  }
}
function* setEditWarehouseSaga({payload: sampleWarehouse}: ActionWithPayload<IWarehouse>) {
  try {
    yield put({type: actionTypes.storePrevWarehouseDataFinish, payload: {payload: sampleWarehouse}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putWarehouseFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllWarehouse, fetchWarehouse)
  yield takeLatest(actionTypes.postWarehouseSuccess, fetchWarehouse)
  yield takeLatest(actionTypes.postWarehouseFailed, fetchWarehouse)
  yield takeLatest(actionTypes.postWarehouse, postWarehouse)
  yield takeLatest(actionTypes.storePrevWarehouseData, setEditWarehouseSaga)
  yield takeLatest(actionTypes.putWarehouse, editWarehouseSaga)
  yield takeLatest(actionTypes.putWarehouseSuccess, fetchWarehouse)
  yield takeLatest(actionTypes.deleteWarehouse, deleteWarehouseSaga)
  yield takeLatest(actionTypes.deleteWarehouseSuccess, fetchWarehouse)
}
