import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IChangePassword, IProfile} from '../model/ProfileModel'
import {fetchAllProfile, sendChangePassword, sendProfile} from './ProfileCRUD'

import Swal from 'sweetalert2'

import {DefaultResponse} from '../../../../setup/axios/SetupAxios'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllProfile: '[PROFILE] Fetch All Profile',
  fetchAllProfileSuccess: '[PROFILE] Fetch All Profile Success',
  fetchAllProfileFailure: '[PROFILE] Fetch All Profile Faliled',
  postProfile: '[PROFILE] Post Profile',
  postProfileSuccess: '[PROFILE] Post Profile Success',
  postProfileFailed: '[PROFILE] Post Profile Failed',
  postChangePassword: '[PROFILE] Post Change Password',
  postChangePasswordSuccess: '[PROFILE] Post Change Password Success',
  postChangePasswordFailed: '[PROFILE] Post Change Password Failed',
}

const initialProfileState: IProfileRedux = {
  data: [],
  payload: null,
  changePassword: null,
}

export interface IProfileRedux {
  data: IProfile[] | null | undefined
  payload: IProfile | null | undefined
  changePassword: IChangePassword | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-profile', whitelist: ['data']},
  (state: IProfileRedux = initialProfileState, action: ActionWithPayload<IProfileRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllProfileSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postProfile: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.postChangePassword: {
        const data = action.payload?.changePassword
        console.log(action.payload)

        return {...state, changePassword: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllProfile: () => ({type: actionTypes.fetchAllProfile}),
  postProfile: (payload: IProfile) => ({type: actionTypes.postProfile, payload}),
  postChangePassword: (payload: IChangePassword) => ({
    type: actionTypes.postChangePassword,
    payload,
  }),
}

function* fetchProfile() {
  try {
    const response: {data: DefaultResponse<IProfile[]>} = yield call(fetchAllProfile)
    let data = response.data.data

    yield put({
      type: actionTypes.fetchAllProfileSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllProfileFailure, payload: {data: null}})
  }
}

function* postProfile({payload: sampleType}: ActionWithPayload<IProfile>) {
  try {
    yield call(() => sendProfile(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Profile successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
  } catch (error: any) {
    yield put({type: actionTypes.postProfileFailed, payload: {data: null}})
  }
}

function* postChangePasswordSaga({payload: changePassword}: ActionWithPayload<IChangePassword>) {
  try {
    yield call(() => sendChangePassword(changePassword!))
    Swal.fire({
      title: 'Success!',
      text: 'Change Password successfully',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    yield put({
      type: actionTypes.postProfileSuccess,
    })
  } catch (error: any) {
    console.log(error)

    yield put({type: actionTypes.postProfileFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllProfile, fetchProfile)
  yield takeLatest(actionTypes.postProfileSuccess, fetchProfile)
  yield takeLatest(actionTypes.postProfileFailed, fetchProfile)
  yield takeLatest(actionTypes.postProfile, postProfile)
  yield takeLatest(actionTypes.postChangePassword, postChangePasswordSaga)
}
