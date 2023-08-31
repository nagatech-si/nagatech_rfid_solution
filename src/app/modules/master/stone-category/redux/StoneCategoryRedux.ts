import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IStoneCategory} from '../model/StoneCategoryModel'
import {
  deleteStoneCategory,
  fetchAllStoneCategory,
  putStoneCategory,
  sendStoneCategory,
} from './StoneCategoryCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {stoneCategoryIgnore} from '../../../../../setup/enc-ignore/stone-category-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllStoneCategory: '[STONE CATEGORY] Fetch All Stone Category',
  fetchAllStoneCategorySuccess: '[STONE CATEGORY] Fetch All Stone Category Success',
  fetchAllStoneCategoryFailure: '[STONE CATEGORY] Fetch All Stone Category Faliled',
  postStoneCategory: '[STONE CATEGORY] Post Stone Category',
  postStoneCategorySuccess: '[STONE CATEGORY] Post Stone Category Success',
  postStoneCategoryFailed: '[STONE CATEGORY] Post Stone Category Failed',
  storePrevStoneCategoryData: '[STONE CATEGORY] Store Prev Data',
  storePrevStoneCategoryDataFinish: '[STONE CATEGORY] Store Prev Data Finish',
  putStoneCategory: '[STONE CATEGORY] Put Stone Category',
  putStoneCategorySuccess: '[STONE CATEGORY] Put Stone Category Success',
  putStoneCategoryFailed: '[STONE CATEGORY] Put Stone Category Failed',
  deleteStoneCategory: '[STONE CATEGORY] Delete Stone Category',
  deleteStoneCategorySuccess: '[STONE CATEGORY] Delete Stone Category Success',
  deleteStoneCategoryFailed: '[STONE CATEGORY] Delete Stone Category Failed',
}

const initialStoneCategoryState: IStoneCategoryRedux = {
  data: [],
  payload: null,
}

export interface IStoneCategoryRedux {
  data: IStoneCategory[] | null | undefined
  payload: IStoneCategory | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-stone-category', whitelist: ['data']},
  (
    state: IStoneCategoryRedux = initialStoneCategoryState,
    action: ActionWithPayload<IStoneCategoryRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllStoneCategorySuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postStoneCategory: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putStoneCategory: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevStoneCategoryDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllStoneCategory: () => ({type: actionTypes.fetchAllStoneCategory}),
  postStoneCategory: (payload: IStoneCategory) => ({type: actionTypes.postStoneCategory, payload}),
  deleteStoneCategory: (payload: IStoneCategory) => ({
    type: actionTypes.deleteStoneCategory,
    payload,
  }),
  editStoneCategory: (payload: IStoneCategory) => ({type: actionTypes.putStoneCategory, payload}),
  setEditStoneCategory: (payload: IStoneCategory) => ({
    type: actionTypes.storePrevStoneCategoryData,
    payload,
  }),
}

function* fetchStoneCategory() {
  try {
    const response: {data: DefaultResponse<IStoneCategory[]>} = yield call(fetchAllStoneCategory)
    let data = encryptor.doDecrypt(response.data.data, stoneCategoryIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllStoneCategorySuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllStoneCategoryFailure, payload: {data: null}})
  }
}

function* postStoneCategory({payload: sampleType}: ActionWithPayload<IStoneCategory>) {
  try {
    yield call(() => sendStoneCategory(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Category successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postStoneCategorySuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postStoneCategoryFailed, payload: {data: null}})
  }
}

function* deleteStoneCategorySaga({payload: sampleType}: ActionWithPayload<IStoneCategory>) {
  try {
    yield call(() => deleteStoneCategory(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Category successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteStoneCategorySuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteStoneCategoryFailed, payload: {data: null}})
  }
}

function* editStoneCategorySaga({payload: sampleType}: ActionWithPayload<IStoneCategory>) {
  try {
    yield call(() => putStoneCategory(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Category successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putStoneCategorySuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneCategoryFailed, payload: {data: null}})
  }
}
function* setEditStoneCategorySaga({payload: sampleType}: ActionWithPayload<IStoneCategory>) {
  try {
    yield put({type: actionTypes.storePrevStoneCategoryDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneCategoryFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllStoneCategory, fetchStoneCategory)
  yield takeLatest(actionTypes.postStoneCategorySuccess, fetchStoneCategory)
  yield takeLatest(actionTypes.postStoneCategory, postStoneCategory)
  yield takeLatest(actionTypes.storePrevStoneCategoryData, setEditStoneCategorySaga)
  yield takeLatest(actionTypes.putStoneCategory, editStoneCategorySaga)
  yield takeLatest(actionTypes.putStoneCategorySuccess, fetchStoneCategory)
  yield takeLatest(actionTypes.deleteStoneCategory, deleteStoneCategorySaga)
  yield takeLatest(actionTypes.deleteStoneCategorySuccess, fetchStoneCategory)
}
