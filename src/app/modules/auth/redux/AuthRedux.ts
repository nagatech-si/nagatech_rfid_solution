import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {UserModel} from '../models/UserModel'
import {getUserLoginStatus, logout} from './AuthCRUD'
import {RootState} from '../../../../setup'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] Auth API',
  SetUser: '[Set User] Action',
}

const initialAuthState: IAuthState = {
  user: undefined,
  accessToken: undefined,
}

export interface IAuthState {
  user?: UserModel
  accessToken?: string
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-auth', whitelist: ['user', 'accessToken']},
  (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>) => {
    switch (action.type) {
      case actionTypes.Login: {
        const accessToken = action.payload?.accessToken
        return {accessToken, user: undefined}
      }

      case actionTypes.Register: {
        const accessToken = action.payload?.accessToken
        return {accessToken, user: undefined}
      }

      case actionTypes.Logout: {
        return initialAuthState
      }

      case actionTypes.UserRequested: {
        return {...state, user: undefined}
      }

      case actionTypes.UserLoaded: {
        const accessToken = action.payload?.accessToken
        return {...state, accessToken}
      }

      case actionTypes.SetUser: {
        const user = action.payload?.user
        return {...state, user}
      }

      default:
        return state
    }
  }
)

export const actions = {
  login: (accessToken: string) => ({type: actionTypes.Login, payload: {accessToken}}),
  register: (accessToken: string) => ({
    type: actionTypes.Register,
    payload: {accessToken},
  }),
  logout: () => ({type: actionTypes.Logout}),
  requestUser: () => ({
    type: actionTypes.UserRequested,
  }),
  fulfillToken: (token: string) => ({type: actionTypes.UserLoaded, payload: {accessToken: token}}),
  setUser: (user: UserModel) => ({type: actionTypes.SetUser, payload: {user}}),
}

export function* saga() {
  yield takeLatest(actionTypes.SetUser, function* setUserSaga() {
    const userID = yield select((state: RootState) => state.auth.user)
    localStorage.setItem('USER', JSON.stringify(userID))
  })

  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.Logout, function* logoutSaga() {
    const userID: UserModel = JSON.parse(localStorage.getItem('USER') ?? '{}')

    yield call(() => logout(userID.user_id))
    localStorage.removeItem('token')
    localStorage.removeItem('isLogin')
    yield
  })

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const {isLogin, token} = yield getUserLoginStatus()
    if (isLogin) {
      yield put(actions.fulfillToken(token))
    }
  })
}
