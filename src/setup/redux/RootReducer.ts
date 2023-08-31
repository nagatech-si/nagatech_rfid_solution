import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as dashbord from '../../app/pages/dashboard/redux/dashboardRexux'

import * as auth from '../../app/modules/auth'
//profile
import * as profile from '../../app/modules/accounts/redux/ProfileRedux'

import * as toolbar from '../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as groupRedux from '../../app/pages/master/group/redux/GroupRedux'
import * as typeRedux from '../../app/pages/master/type/redux/TypeRedux'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  toolbar: toolbar.reducer,
  group: groupRedux.reducer,
  type: typeRedux.reducer,

  profile: profile.reducer,
  dashbord: dashbord.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([dashbord.saga(), auth.saga(), groupRedux.saga(), typeRedux.saga()])
}
