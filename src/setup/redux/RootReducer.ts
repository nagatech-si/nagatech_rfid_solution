import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as dashbord from '../../app/pages/dashboard/redux/dashboardRexux'

import * as auth from '../../app/modules/auth'
//profile
import * as profile from '../../app/modules/accounts/redux/ProfileRedux'

import * as toolbar from '../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as groupRedux from '../../app/pages/master/group/redux/GroupRedux'
import * as typeRedux from '../../app/pages/master/type/redux/TypeRedux'
import * as warehouseRedux from '../../app/pages/master/warehouse/redux/WarehouseRedux'
import * as priceTagRedux from '../../app/pages/master/price_tag/redux/PriceTagRedux'
import * as trayRedux from '../../app/pages/master/tray/redux/TrayRedux'
import * as itemConditionRedux from '../../app/pages/master/item_condition/redux/ItemConditionRedux'

//item
import * as itemRedux from '../../app/pages/item/add/redux/ItemRedux'

//rfid
import * as opnameRedux from '../../app/pages/rfid/opname/redux/opnameRedux'
import * as locatorRedux from '../../app/pages/rfid/locator/redux/locatorRedux'
import * as soldItemRedux from '../../app/pages/rfid/sold_item/redux/soldItemRedux'
import * as shatterItemRedux from '../../app/pages/rfid/shatter_item/redux/shatterItemRedux'
import * as moveItemRedux from '../../app/pages/rfid/move_item/redux/moveItemRedux'

//loading
import * as loadingStatusRedux from '../loading_status/LoadingRedux'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  toolbar: toolbar.reducer,
  loading: loadingStatusRedux.reducer,
  group: groupRedux.reducer,
  type: typeRedux.reducer,
  profile: profile.reducer,
  warehouse: warehouseRedux.reducer,
  priceTag: priceTagRedux.reducer,
  tray: trayRedux.reducer,
  items: itemRedux.reducer,
  dashbord: dashbord.reducer,
  opname: opnameRedux.reducer,
  locator: locatorRedux.reducer,
  soldItem: soldItemRedux.reducer,
  itemCondition: itemConditionRedux.reducer,
  shatterItem: shatterItemRedux.reducer,
  moveItem: moveItemRedux.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([
    dashbord.saga(),
    auth.saga(),
    groupRedux.saga(),
    typeRedux.saga(),
    priceTagRedux.saga(),
    trayRedux.saga(),
    warehouseRedux.saga(),
    itemRedux.saga(),
    opnameRedux.saga(),
    locatorRedux.saga(),
    soldItemRedux.saga(),
    itemConditionRedux.saga(),
    shatterItemRedux.saga(),
    moveItemRedux.saga(),
  ])
}
