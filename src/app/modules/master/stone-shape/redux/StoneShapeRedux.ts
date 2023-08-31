import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IStoneShape} from '../model/StoneShapeModel'
import {deleteStoneShape, fetchAllStoneShape, putStoneShape, sendStoneShape} from './StoneShapeCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {stoneShapeIgnore} from '../../../../../setup/enc-ignore/stone-shape-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllStoneShape: '[STONE SHAPE] Fetch All Stone Shape',
  fetchAllStoneShapeSuccess: '[STONE SHAPE] Fetch All Stone Shape Success',
  fetchAllStoneShapeFailure: '[STONE SHAPE] Fetch All Stone Shape Faliled',
  postStoneShape: '[STONE SHAPE] Post Stone Shape',
  postStoneShapeSuccess: '[STONE SHAPE] Post Stone Shape Success',
  postStoneShapeFailed: '[STONE SHAPE] Post Stone Shape Failed',
  storePrevStoneShapeData: '[STONE SHAPE] Store Prev Data',
  storePrevStoneShapeDataFinish: '[STONE SHAPE] Store Prev Data Finish',
  putStoneShape: '[STONE SHAPE] Put Stone Shape',
  putStoneShapeSuccess: '[STONE SHAPE] Put Stone Shape Success',
  putStoneShapeFailed: '[STONE SHAPE] Put Stone Shape Failed',
  deleteStoneShape: '[STONE SHAPE] Delete Stone Shape',
  deleteStoneShapeSuccess: '[STONE SHAPE] Delete Stone Shape Success',
  deleteStoneShapeFailed: '[STONE SHAPE] Delete Stone Shape Failed',
}

const initialStoneShapeState: IStoneShapeRedux = {
  data: [],
  payload: null,
}

export interface IStoneShapeRedux {
  data: IStoneShape[] | null | undefined
  payload: IStoneShape | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-stone-shape', whitelist: ['data']},
  (
    state: IStoneShapeRedux = initialStoneShapeState,
    action: ActionWithPayload<IStoneShapeRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllStoneShapeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postStoneShape: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putStoneShape: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevStoneShapeDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllStoneShape: () => ({type: actionTypes.fetchAllStoneShape}),
  postStoneShape: (payload: IStoneShape) => ({type: actionTypes.postStoneShape, payload}),
  deleteStoneShape: (payload: IStoneShape) => ({
    type: actionTypes.deleteStoneShape,
    payload,
  }),
  editStoneShape: (payload: IStoneShape) => ({type: actionTypes.putStoneShape, payload}),
  setEditStoneShape: (payload: IStoneShape) => ({
    type: actionTypes.storePrevStoneShapeData,
    payload,
  }),
}

function* fetchStoneShape() {
  try {
    const response: {data: DefaultResponse<IStoneShape[]>} = yield call(fetchAllStoneShape)
    let data = encryptor.doDecrypt(response.data.data, stoneShapeIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllStoneShapeSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllStoneShapeFailure, payload: {data: null}})
  }
}

function* postStoneShape({payload: sampleType}: ActionWithPayload<IStoneShape>) {
  try {
    yield call(() => sendStoneShape(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Shape successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postStoneShapeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postStoneShapeFailed, payload: {data: null}})
  }
}

function* deleteStoneShapeSaga({payload: sampleType}: ActionWithPayload<IStoneShape>) {
  try {
    yield call(() => deleteStoneShape(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Shape successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteStoneShapeSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteStoneShapeFailed, payload: {data: null}})
  }
}

function* editStoneShapeSaga({payload: sampleType}: ActionWithPayload<IStoneShape>) {
  try {
    yield call(() => putStoneShape(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Shape successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putStoneShapeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneShapeFailed, payload: {data: null}})
  }
}
function* setEditStoneShapeSaga({payload: sampleType}: ActionWithPayload<IStoneShape>) {
  try {
    yield put({type: actionTypes.storePrevStoneShapeDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneShapeFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllStoneShape, fetchStoneShape)
  yield takeLatest(actionTypes.postStoneShapeSuccess, fetchStoneShape)
  yield takeLatest(actionTypes.postStoneShape, postStoneShape)
  yield takeLatest(actionTypes.storePrevStoneShapeData, setEditStoneShapeSaga)
  yield takeLatest(actionTypes.putStoneShape, editStoneShapeSaga)
  yield takeLatest(actionTypes.putStoneShapeSuccess, fetchStoneShape)
  yield takeLatest(actionTypes.deleteStoneShape, deleteStoneShapeSaga)
  yield takeLatest(actionTypes.deleteStoneShapeSuccess, fetchStoneShape)
}
