import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {IItemCondition} from '../model/ItemConditionModel'
import {
  deleteItemCondition,
  fetchAllItemCondition,
  putItemCondition,
  sendItemCondition,
} from './ItemConditionCRUD'
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
  fetchAllItemCondition: '[MASTER ITEM CONDITION] Fetch All ItemCondition',
  fetchAllItemConditionSuccess: '[MASTER ITEM CONDITION] Fetch All ItemCondition Success',
  fetchAllItemConditionFailure: '[MASTER ITEM CONDITION] Fetch All ItemCondition Faliled',
  postItemCondition: '[MASTER ITEM CONDITION] Post ItemCondition',
  postItemConditionSuccess: '[MASTER ITEM CONDITION] Post ItemCondition Success',
  postItemConditionFailed: '[MASTER ITEM CONDITION] Post ItemCondition Failed',
  storePrevItemConditionData: '[MASTER ITEM CONDITION] Store Prev Data',
  storePrevItemConditionDataFinish: '[MASTER ITEM CONDITION] Store Prev Data Finish',
  putItemCondition: '[MASTER ITEM CONDITION] Put ItemCondition',
  putItemConditionSuccess: '[MASTER ITEM CONDITION] Put ItemCondition Success',
  putItemConditionFailed: '[MASTER ITEM CONDITION] Put ItemCondition Failed',
  deleteItemCondition: '[MASTER ITEM CONDITION] Delete ItemCondition',
  deleteItemConditionSuccess: '[MASTER ITEM CONDITION] Delete ItemCondition Success',
  deleteItemConditionFailed: '[MASTER ITEM CONDITION] Delete ItemCondition Failed',
}

const initialItemConditionState: IItemConditionRedux = {
  data: [],
  payload: null,
}

export interface IItemConditionRedux {
  data: IItemCondition[] | null | undefined
  payload: IItemCondition | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-warehouse', whitelist: ['data', 'payload']},
  (
    state: IItemConditionRedux = initialItemConditionState,
    action: ActionWithPayload<IItemConditionRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllItemConditionSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postItemCondition: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putItemCondition: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevItemConditionDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllItemCondition: () => ({type: actionTypes.fetchAllItemCondition}),
  postItemCondition: (payload: IItemCondition) => ({type: actionTypes.postItemCondition, payload}),
  deleteItemCondition: (payload: IItemCondition) => ({
    type: actionTypes.deleteItemCondition,
    payload,
  }),
  editItemCondition: (payload: IItemCondition) => ({type: actionTypes.putItemCondition, payload}),
  setEditItemCondition: (payload: IItemCondition) => ({
    type: actionTypes.storePrevItemConditionData,
    payload,
  }),
}

function* fetchItemCondition() {
  try {
    const response: {data: DefaultResponse<IItemCondition[]>} = yield call(fetchAllItemCondition)
    let data = encryptor.doDecrypt(response.data, [
      'kondisi_barang',
      'status',
      '_id',
      'input_by',
      'input_date',
    ])

    yield put({
      type: actionTypes.fetchAllItemConditionSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllItemConditionFailure, payload: {data: null}})
  }
}

function* postItemCondition({payload: sampleItemCondition}: ActionWithPayload<IItemCondition>) {
  try {
    yield call(() => sendItemCondition(sampleItemCondition!))
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
      type: actionTypes.postItemConditionSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postItemConditionFailed, payload: {data: null}})
  }
}

function* deleteItemConditionSaga({
  payload: sampleItemCondition,
}: ActionWithPayload<IItemCondition>) {
  try {
    yield call(() => deleteItemCondition(sampleItemCondition!))
    const notification: INotification = yield select(getNotification)
    Swal.fire({
      title: notification.success,
      text: notification.deleteSuccess,
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteItemConditionSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteItemConditionFailed, payload: {data: null}})
  }
}

function* editItemConditionSaga({payload: sampleItemCondition}: ActionWithPayload<IItemCondition>) {
  try {
    yield call(() => putItemCondition(sampleItemCondition!))
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
      type: actionTypes.putItemConditionSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putItemConditionFailed, payload: {data: null}})
  }
}
function* setEditItemConditionSaga({
  payload: sampleItemCondition,
}: ActionWithPayload<IItemCondition>) {
  try {
    yield put({
      type: actionTypes.storePrevItemConditionDataFinish,
      payload: {payload: sampleItemCondition},
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putItemConditionFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllItemCondition, fetchItemCondition)
  yield takeLatest(actionTypes.postItemConditionSuccess, fetchItemCondition)
  yield takeLatest(actionTypes.postItemConditionFailed, fetchItemCondition)
  yield takeLatest(actionTypes.postItemCondition, postItemCondition)
  yield takeLatest(actionTypes.storePrevItemConditionData, setEditItemConditionSaga)
  yield takeLatest(actionTypes.putItemCondition, editItemConditionSaga)
  yield takeLatest(actionTypes.putItemConditionSuccess, fetchItemCondition)
  yield takeLatest(actionTypes.deleteItemCondition, deleteItemConditionSaga)
  yield takeLatest(actionTypes.deleteItemConditionSuccess, fetchItemCondition)
}
