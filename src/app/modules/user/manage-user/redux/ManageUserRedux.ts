import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IManageUser} from '../model/ManageUserModel'
import {deleteManageUser, fetchAllManageUser, putManageUser, sendManageUser} from './ManageUserCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {userIgnore} from '../../../../../setup/enc-ignore/user-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllManageUser: '[MANAGE USER] Fetch All ManageUser',
  fetchAllManageUserSuccess: '[MANAGE USER] Fetch All ManageUser Success',
  fetchAllManageUserFailure: '[MANAGE USER] Fetch All ManageUser Faliled',
  postManageUser: '[MANAGE USER] Post ManageUser',
  postManageUserSuccess: '[MANAGE USER] Post ManageUser Success',
  postManageUserFailed: '[MANAGE USER] Post ManageUser Failed',
  storePrevManageUserData: '[MANAGE USER] Store Prev Data',
  storePrevManageUserDataFinish: '[MANAGE USER] Store Prev Data Finish',
  putManageUser: '[MANAGE USER] Put ManageUser',
  putManageUserSuccess: '[MANAGE USER] Put ManageUser Success',
  putManageUserFailed: '[MANAGE USER] Put ManageUser Failed',
  deleteManageUser: '[MANAGE USER] Delete ManageUser',
  deleteManageUserSuccess: '[MANAGE USER] Delete ManageUser Success',
  deleteManageUserFailed: '[MANAGE USER] Delete ManageUser Failed',
}

const initialManageUserState: IManageUserRedux = {
  data: [],
  payload: null,
}

export interface IManageUserRedux {
  data: IManageUser[] | null | undefined
  payload: IManageUser | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-manage-user', whitelist: ['data']},
  (
    state: IManageUserRedux = initialManageUserState,
    action: ActionWithPayload<IManageUserRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllManageUserSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postManageUser: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putManageUser: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevManageUserDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllManageUser: () => ({type: actionTypes.fetchAllManageUser}),
  postManageUser: (payload: IManageUser) => ({type: actionTypes.postManageUser, payload}),
  deleteManageUser: (payload: IManageUser) => ({type: actionTypes.deleteManageUser, payload}),
  editManageUser: (payload: IManageUser) => ({type: actionTypes.putManageUser, payload}),
  setEditManageUser: (payload: IManageUser) => ({
    type: actionTypes.storePrevManageUserData,
    payload,
  }),
}

function* fetchManageUser() {
  try {
    const response: {data: DefaultResponse<IManageUser[]>} = yield call(fetchAllManageUser)
    let data = encryptor.doDecrypt(response.data.data, userIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllManageUserSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllManageUserFailure, payload: {data: null}})
  }
}

function* postManageUser({payload: sampleType}: ActionWithPayload<IManageUser>) {
  try {
    yield call(() => sendManageUser(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'ManageUser successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postManageUserSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postManageUserFailed, payload: {data: null}})
  }
}

function* deleteManageUserSaga({payload: sampleType}: ActionWithPayload<IManageUser>) {
  try {
    yield call(() => deleteManageUser(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'ManageUser successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteManageUserSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteManageUserFailed, payload: {data: null}})
  }
}

function* editManageUserSaga({payload: sampleType}: ActionWithPayload<IManageUser>) {
  try {
    yield call(() => putManageUser(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'ManageUser successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putManageUserSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putManageUserFailed, payload: {data: null}})
  }
}
function* setEditManageUserSaga({payload: sampleType}: ActionWithPayload<IManageUser>) {
  try {
    yield put({type: actionTypes.storePrevManageUserDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putManageUserFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllManageUser, fetchManageUser)
  yield takeLatest(actionTypes.postManageUserSuccess, fetchManageUser)
  yield takeLatest(actionTypes.postManageUser, postManageUser)
  yield takeLatest(actionTypes.storePrevManageUserData, setEditManageUserSaga)
  yield takeLatest(actionTypes.putManageUser, editManageUserSaga)
  yield takeLatest(actionTypes.putManageUserSuccess, fetchManageUser)
  yield takeLatest(actionTypes.deleteManageUser, deleteManageUserSaga)
  yield takeLatest(actionTypes.deleteManageUserSuccess, fetchManageUser)
}
