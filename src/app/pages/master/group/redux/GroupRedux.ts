import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {IGroup} from '../model/GroupModel'
import {deleteGroup, fetchAllGroup, putGroup, sendGroup} from './GroupCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {INotification} from '../../../../../setup/notification/Notification'
import {RootState} from '../../../../../setup'
import {
  startSubmittingAPI,
  stopSubmittingAPI,
} from '../../../../../setup/loading_status/LoadingRedux'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllGroup: '[MASTER GROUP] Fetch All Group',
  fetchAllGroupSuccess: '[MASTER GROUP] Fetch All Group Success',
  fetchAllGroupFailure: '[MASTER GROUP] Fetch All Group Faliled',
  postGroup: '[MASTER GROUP] Post Group',
  postGroupSuccess: '[MASTER GROUP] Post Group Success',
  postGroupFailed: '[MASTER GROUP] Post Group Failed',
  storePrevGroupData: '[MASTER GROUP] Store Prev Data',
  storePrevGroupDataFinish: '[MASTER GROUP] Store Prev Data Finish',
  putGroup: '[MASTER GROUP] Put Group',
  putGroupSuccess: '[MASTER GROUP] Put Group Success',
  putGroupFailed: '[MASTER GROUP] Put Group Failed',
  deleteGroup: '[MASTER GROUP] Delete Group',
  deleteGroupSuccess: '[MASTER GROUP] Delete Group Success',
  deleteGroupFailed: '[MASTER GROUP] Delete Group Failed',
  setNotifiation: '[MASTER GROUP] Set Notificaiton Message',
}

const initialGroupState: IGroupRedux = {
  data: [],
  payload: null,
  notification: {
    success: 'Success',
    failed: 'Failed',
    addSuccess: 'Data Succesfully Saved!',
    addFailed: 'Failed To Save Data, Try Again Later!',
    deleteFailed: '',
    deleteSuccess: '',
    updateFailed: '',
    updateSuccess: '',
  },
}

export interface IGroupRedux {
  data: IGroup[] | null | undefined
  payload: IGroup | null | undefined
  notification: INotification | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-group', whitelist: ['data', 'payload']},
  (state: IGroupRedux = initialGroupState, action: ActionWithPayload<IGroupRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllGroupSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postGroup: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putGroup: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevGroupDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.setNotifiation: {
        const data = action.payload?.notification
        return {...state, notification: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllGroup: () => ({type: actionTypes.fetchAllGroup}),
  postGroup: (payload: IGroup) => ({type: actionTypes.postGroup, payload}),
  deleteGroup: (payload: IGroup) => ({type: actionTypes.deleteGroup, payload}),
  editGroup: (payload: IGroup) => ({type: actionTypes.putGroup, payload}),
  setEditGroup: (payload: IGroup) => ({
    type: actionTypes.storePrevGroupData,
    payload,
  }),
  setNotification: (notification: INotification) => ({
    type: actionTypes.setNotifiation,
    payload: {
      notification,
    },
  }),
}

export const getNotification = (state: RootState) => state.group.notification

function* fetchGroup() {
  try {
    const response: {data: DefaultResponse<IGroup[]>} = yield call(fetchAllGroup)
    let data = encryptor.doDecrypt(response.data, ['kode_group', 'status', '_id'])

    yield put({
      type: actionTypes.fetchAllGroupSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllGroupFailure, payload: {data: null}})
  }
}

function* postGroup({payload: sampleType}: ActionWithPayload<IGroup>) {
  try {
    const notification: INotification = yield select(getNotification)
    yield put(startSubmittingAPI())
    yield call(() => sendGroup(sampleType!))
    yield put(stopSubmittingAPI())
    Swal.fire({
      title: notification.success,
      text: notification.addSuccess,
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postGroupSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postGroupFailed, payload: {data: null}})
  }
}

function* deleteGroupSaga({payload: sampleType}: ActionWithPayload<IGroup>) {
  try {
    yield put(startSubmittingAPI())
    yield call(() => deleteGroup(sampleType!))
    yield put(stopSubmittingAPI())
    const notification: INotification = yield select(getNotification)
    Swal.fire({
      title: notification.success,
      text: notification.deleteSuccess,
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteGroupSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteGroupFailed, payload: {data: null}})
  }
}

function* editGroupSaga({payload: sampleType}: ActionWithPayload<IGroup>) {
  try {
    yield put(startSubmittingAPI())
    yield call(() => putGroup(sampleType!))
    yield put(stopSubmittingAPI())
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
      type: actionTypes.putGroupSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putGroupFailed, payload: {data: null}})
  }
}
function* setEditGroupSaga({payload: sampleType}: ActionWithPayload<IGroup>) {
  try {
    yield put({type: actionTypes.storePrevGroupDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putGroupFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllGroup, fetchGroup)
  yield takeLatest(actionTypes.postGroupSuccess, fetchGroup)
  yield takeLatest(actionTypes.postGroupFailed, fetchGroup)
  yield takeLatest(actionTypes.postGroup, postGroup)
  yield takeLatest(actionTypes.storePrevGroupData, setEditGroupSaga)
  yield takeLatest(actionTypes.putGroup, editGroupSaga)
  yield takeLatest(actionTypes.putGroupSuccess, fetchGroup)
  yield takeLatest(actionTypes.deleteGroup, deleteGroupSaga)
  yield takeLatest(actionTypes.deleteGroupSuccess, fetchGroup)
}
