import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {IPriceTag} from '../model/PriceTagModel'
import {deletePriceTag, fetchAllPriceTag, putPriceTag, sendPriceTag} from './PriceTagCRUD'
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

export const actionsTypes = {
  fetchAllPriceTag: '[MASTER PRICETAG] Fetch All PriceTag',
  fetchAllPriceTagSuccess: '[MASTER PRICETAG] Fetch All PriceTag Success',
  fetchAllPriceTagFailure: '[MASTER PRICETAG] Fetch All PriceTag Faliled',
  postPriceTag: '[MASTER PRICETAG] Post PriceTag',
  postPriceTagSuccess: '[MASTER PRICETAG] Post PriceTag Success',
  postPriceTagFailed: '[MASTER PRICETAG] Post PriceTag Failed',
  storePrevPriceTagData: '[MASTER PRICETAG] Store Prev Data',
  storePrevPriceTagDataFinish: '[MASTER PRICETAG] Store Prev Data Finish',
  putPriceTag: '[MASTER PRICETAG] Put PriceTag',
  putPriceTagSuccess: '[MASTER PRICETAG] Put PriceTag Success',
  putPriceTagFailed: '[MASTER PRICETAG] Put PriceTag Failed',
  deletePriceTag: '[MASTER PRICETAG] Delete PriceTag',
  deletePriceTagSuccess: '[MASTER PRICETAG] Delete PriceTag Success',
  deletePriceTagFailed: '[MASTER PRICETAG] Delete PriceTag Failed',
}

const initialPriceTagState: IPriceTagRedux = {
  data: [],
  payload: null,
}

export interface IPriceTagRedux {
  data: IPriceTag[] | null | undefined
  payload: IPriceTag | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-type', whitelist: ['data', 'payload']},
  (state: IPriceTagRedux = initialPriceTagState, action: ActionWithPayload<IPriceTagRedux>) => {
    switch (action.type) {
      case actionsTypes.fetchAllPriceTagSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionsTypes.postPriceTag: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionsTypes.putPriceTag: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionsTypes.storePrevPriceTagDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllPriceTag: () => ({type: actionsTypes.fetchAllPriceTag}),
  postPriceTag: (payload: IPriceTag) => ({type: actionsTypes.postPriceTag, payload}),
  deletePriceTag: (payload: IPriceTag) => ({type: actionsTypes.deletePriceTag, payload}),
  editPriceTag: (payload: IPriceTag) => ({type: actionsTypes.putPriceTag, payload}),
  setEditPriceTag: (payload: IPriceTag) => ({
    type: actionsTypes.storePrevPriceTagData,
    payload,
  }),
}

function* fetchPriceTag() {
  try {
    const response: {data: DefaultResponse<IPriceTag[]>} = yield call(fetchAllPriceTag)
    let data = encryptor.doDecrypt(response.data, [
      'kode_group',
      'status',
      '_id',
      'kode_jenis',
      'keterangan',
    ])

    yield put({
      type: actionsTypes.fetchAllPriceTagSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionsTypes.fetchAllPriceTagFailure, payload: {data: null}})
  }
}

function* postPriceTag({payload: samplePriceTag}: ActionWithPayload<IPriceTag>) {
  try {
    yield call(() => sendPriceTag(samplePriceTag!))
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
      type: actionsTypes.postPriceTagSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionsTypes.postPriceTagFailed, payload: {data: null}})
  }
}

function* deletePriceTagSaga({payload: samplePriceTag}: ActionWithPayload<IPriceTag>) {
  try {
    yield call(() => deletePriceTag(samplePriceTag!))
    const notification: INotification = yield select(getNotification)
    Swal.fire({
      title: notification.success,
      text: notification.deleteSuccess,
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionsTypes.deletePriceTagSuccess,
    })
  } catch (error: any) {
    yield put({type: actionsTypes.deletePriceTagFailed, payload: {data: null}})
  }
}

function* editPriceTagSaga({payload: samplePriceTag}: ActionWithPayload<IPriceTag>) {
  try {
    yield call(() => putPriceTag(samplePriceTag!))
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
      type: actionsTypes.putPriceTagSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionsTypes.putPriceTagFailed, payload: {data: null}})
  }
}
function* setEditPriceTagSaga({payload: samplePriceTag}: ActionWithPayload<IPriceTag>) {
  try {
    yield put({type: actionsTypes.storePrevPriceTagDataFinish, payload: {payload: samplePriceTag}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionsTypes.putPriceTagFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionsTypes.fetchAllPriceTag, fetchPriceTag)
  yield takeLatest(actionsTypes.postPriceTagSuccess, fetchPriceTag)
  yield takeLatest(actionsTypes.postPriceTagFailed, fetchPriceTag)
  yield takeLatest(actionsTypes.postPriceTag, postPriceTag)
  yield takeLatest(actionsTypes.storePrevPriceTagData, setEditPriceTagSaga)
  yield takeLatest(actionsTypes.putPriceTag, editPriceTagSaga)
  yield takeLatest(actionsTypes.putPriceTagSuccess, fetchPriceTag)
  yield takeLatest(actionsTypes.deletePriceTag, deletePriceTagSaga)
  yield takeLatest(actionsTypes.deletePriceTagSuccess, fetchPriceTag)
}
