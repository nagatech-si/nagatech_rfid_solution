import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {IItem, IRequestReportItem, IResponseReportItem} from '../model/ItemModel'
import {
  deleteItem,
  fetchAllItem,
  fetchAllItemFiltered,
  fetchReportItem,
  putItem,
  sendItem,
} from './ItemCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {INotification} from '../../../../../setup/notification/Notification'
import {getNotification} from '../../../master/group/redux/GroupRedux'
import {BarangIgnore} from '../../../../../setup/enc-ignore/barang-ignore-encryptor'
import {ISearch} from '../../show_data/model/searchModel'
import {IRequestOpnameBarang} from '../../../rfid/opname/model/opnameModel'
import {fetchAllItemForOpname} from '../../../rfid/opname/redux/opnameCRUD'
import {
  startSubmittingAPI,
  stopSubmittingAPI,
} from '../../../../../setup/loading_status/LoadingRedux'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllItem: '[MASTER ITEM] Fetch All Item',
  fetchAllItemFiltered: '[MASTER ITEM] Fetch All Item Filtered',
  fetchAllItemSuccess: '[MASTER ITEM] Fetch All Item Success',
  fetchAllItemFailure: '[MASTER ITEM] Fetch All Item Faliled',
  fetchItemOpname: '[MASTER ITEM] Fetch Item Opname',
  fetchItemOpnameSuccess: '[MASTER ITEM] Fetch Item Opname Success',
  fetchItemOpnameFailure: '[MASTER ITEM] Fetch Item Opname Faliled',
  fetchReportItem: '[MASTER ITEM] Fetch Report Item',
  fetchReportItemSuccess: '[MASTER ITEM] Fetch Report Item Success',
  fetchReportItemFailure: '[MASTER ITEM] Fetch Report Item Faliled',
  postItem: '[MASTER ITEM] Post Item',
  postItemSuccess: '[MASTER ITEM] Post Item Success',
  postItemFailed: '[MASTER ITEM] Post Item Failed',
  storePrevItemData: '[MASTER ITEM] Store Prev Data',
  storePrevItemDataFinish: '[MASTER ITEM] Store Prev Data Finish',
  putItem: '[MASTER ITEM] Put Item',
  putItemSuccess: '[MASTER ITEM] Put Item Success',
  putItemFailed: '[MASTER ITEM] Put Item Failed',
  deleteItem: '[MASTER ITEM] Delete Item',
  deleteItemSuccess: '[MASTER ITEM] Delete Item Success',
  deleteItemFailed: '[MASTER ITEM] Delete Item Failed',
}

const initialItemState: IItemRedux = {
  data: [],
  payload: null,
  reportData: [],
}

export interface IItemRedux {
  data: IItem[] | null | undefined
  payload: IItem | null | undefined
  reportData: IResponseReportItem[] | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-item', whitelist: ['data', 'payload']},
  (state: IItemRedux = initialItemState, action: ActionWithPayload<IItemRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllItemSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postItem: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putItem: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevItemDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.fetchReportItemSuccess: {
        const data = action.payload?.data as any
        return {...state, reportData: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllItem: () => ({type: actionTypes.fetchAllItem}),
  fetchReportItem: (payload: IRequestReportItem) => ({type: actionTypes.fetchReportItem, payload}),
  fetchAllItemFiltered: (payload: ISearch) => ({type: actionTypes.fetchAllItemFiltered, payload}),
  fetchAllItemOpname: (payload: IRequestOpnameBarang) => ({
    type: actionTypes.fetchItemOpname,
    payload,
  }),
  saveItem: (payload: IItem[]) => ({
    type: actionTypes.fetchAllItemSuccess,
    payload: {
      data: payload,
    },
  }),
  clearItem: () => ({
    type: actionTypes.fetchAllItemSuccess,
    payload: {
      data: [],
    },
  }),
  postItem: (payload: IItem) => ({type: actionTypes.postItem, payload}),
  deleteItem: (payload: IItem) => ({type: actionTypes.deleteItem, payload}),
  editItem: (payload: IItem) => ({type: actionTypes.putItem, payload}),
  setEditItem: (payload: IItem) => ({
    type: actionTypes.storePrevItemData,
    payload,
  }),
}

function* fetchItem() {
  try {
    const response: {data: DefaultResponse<IItem[]>} = yield call(fetchAllItem)
    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.fetchAllItemSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllItemFailure, payload: {data: null}})
  }
}
function* fetchItemFiltered({payload: params}: ActionWithPayload<ISearch>) {
  try {
    console.log(params)

    var response = yield call(() => fetchAllItemFiltered(params!))
    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.fetchAllItemSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllItemFailure, payload: {data: null}})
  }
}

function* fetchItemOpnameBarangSaga({payload: params}: ActionWithPayload<IRequestOpnameBarang>) {
  try {
    console.log(params)

    var response = yield call(() => fetchAllItemForOpname(params!))
    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.fetchAllItemSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllItemFailure, payload: {data: null}})
  }
}

function* fetchReportItemSaga({payload: params}: ActionWithPayload<IRequestReportItem>) {
  try {
    var response = yield call(() => fetchReportItem(params!))

    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.fetchReportItemSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllItemFailure, payload: {data: null}})
  }
}

function* postItem({payload: sampleItem}: ActionWithPayload<IItem>) {
  try {
    yield put(startSubmittingAPI())
    var response = yield call(() => sendItem(sampleItem!))
    yield put(stopSubmittingAPI())
    console.log(response)

    let data = encryptor.doDecrypt(response.data, BarangIgnore)

    yield put({
      type: actionTypes.fetchAllItemSuccess,
      payload: {data},
    })
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
      type: actionTypes.postItemSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postItemFailed, payload: {data: null}})
  }
}

function* deleteItemSaga({payload: sampleItem}: ActionWithPayload<IItem>) {
  try {
    yield put(startSubmittingAPI())
    yield call(() => deleteItem(sampleItem!))
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
      type: actionTypes.deleteItemSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteItemFailed, payload: {data: null}})
  }
}

function* editItemSaga({payload: sampleItem}: ActionWithPayload<IItem>) {
  try {
    yield put(startSubmittingAPI())
    yield call(() => putItem(sampleItem!))
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
    yield put(stopSubmittingAPI())
    yield put({
      type: actionTypes.putItemSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putItemFailed, payload: {data: null}})
  }
}

function* setEditItemSaga({payload: sampleItem}: ActionWithPayload<IItem>) {
  try {
    yield put({type: actionTypes.storePrevItemDataFinish, payload: {payload: sampleItem}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putItemFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllItem, fetchItem)
  yield takeLatest(actionTypes.postItemSuccess, fetchItem)
  yield takeLatest(actionTypes.postItemFailed, fetchItem)
  yield takeLatest(actionTypes.postItem, postItem)
  yield takeLatest(actionTypes.storePrevItemData, setEditItemSaga)
  yield takeLatest(actionTypes.putItem, editItemSaga)
  yield takeLatest(actionTypes.putItemSuccess, fetchItem)
  yield takeLatest(actionTypes.deleteItem, deleteItemSaga)
  yield takeLatest(actionTypes.deleteItemSuccess, fetchItem)
  yield takeLatest(actionTypes.fetchAllItemFiltered, fetchItemFiltered)
  yield takeLatest(actionTypes.fetchReportItem, fetchReportItemSaga)
  yield takeLatest(actionTypes.fetchItemOpname, fetchItemOpnameBarangSaga)
}
