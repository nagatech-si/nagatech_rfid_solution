import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {ISampleCategory} from '../model/SampleCategoryModel'
import {
  deleteSampleCategory,
  fetchAllSampleCategory,
  putSampleCategory,
  sendSampleCategory,
} from './SampleCategoryCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {sampleCategoryIgnore} from '../../../../../setup/enc-ignore/sample-category-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllSampleCategory: '[SAMPLE CATEGORY] Fetch All Sample Category',
  fetchAllSampleCategorySuccess: '[SAMPLE CATEGORY] Fetch All Sample Category Success',
  fetchAllSampleCategoryFailure: '[SAMPLE CATEGORY] Fetch All Sample Category Faliled',
  postSampleCategory: '[SAMPLE CATEGORY] Post Sample Category',
  postSampleCategorySuccess: '[SAMPLE CATEGORY] Post Sample Category Success',
  postSampleCategoryFailed: '[SAMPLE CATEGORY] Post Sample Category Failed',
  storePrevSampleCategoryData: '[SAMPLE CATEGORY] Store Prev Data',
  storePrevSampleCategoryDataFinish: '[SAMPLE CATEGORY] Store Prev Data Finish',
  putSampleCategory: '[SAMPLE CATEGORY] Put Sample Category',
  putSampleCategorySuccess: '[SAMPLE CATEGORY] Put Sample Category Success',
  putSampleCategoryFailed: '[SAMPLE CATEGORY] Put Sample Category Failed',
  deleteSampleCategory: '[SAMPLE CATEGORY] Delete Sample Category',
  deleteSampleCategorySuccess: '[SAMPLE CATEGORY] Delete Sample Category Success',
  deleteSampleCategoryFailed: '[SAMPLE CATEGORY] Delete Sample Category Failed',
}

const initialSampleCategoryState: ISampleCategoryRedux = {
  data: [],
  payload: null,
}

export interface ISampleCategoryRedux {
  data: ISampleCategory[] | null | undefined
  payload: ISampleCategory | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-sample-type', whitelist: ['data']},
  (
    state: ISampleCategoryRedux = initialSampleCategoryState,
    action: ActionWithPayload<ISampleCategoryRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllSampleCategorySuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postSampleCategory: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putSampleCategory: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevSampleCategoryDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllSampleCategory: () => ({type: actionTypes.fetchAllSampleCategory}),
  postSampleCategory: (payload: ISampleCategory) => ({
    type: actionTypes.postSampleCategory,
    payload,
  }),
  deleteSampleCategory: (payload: ISampleCategory) => ({
    type: actionTypes.deleteSampleCategory,
    payload,
  }),
  editSampleCategory: (payload: ISampleCategory) => ({
    type: actionTypes.putSampleCategory,
    payload,
  }),
  setEditSampleCategory: (payload: ISampleCategory) => ({
    type: actionTypes.storePrevSampleCategoryData,
    payload,
  }),
}

function* fetchSampleCategory() {
  try {
    const response: {data: DefaultResponse<ISampleCategory[]>} = yield call(fetchAllSampleCategory)
    let data = encryptor.doDecrypt(response.data.data, sampleCategoryIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllSampleCategorySuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllSampleCategoryFailure, payload: {data: null}})
  }
}

function* postSampleCategory({payload: sampleType}: ActionWithPayload<ISampleCategory>) {
  try {
    yield call(() => sendSampleCategory(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Sample Category successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postSampleCategorySuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postSampleCategoryFailed, payload: {data: null}})
  }
}

function* deleteSampleCategorySaga({payload: sampleType}: ActionWithPayload<ISampleCategory>) {
  try {
    yield call(() => deleteSampleCategory(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Sample Category successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteSampleCategorySuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteSampleCategoryFailed, payload: {data: null}})
  }
}

function* editSampleCategorySaga({payload: sampleType}: ActionWithPayload<ISampleCategory>) {
  try {
    yield call(() => putSampleCategory(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Sample Category successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putSampleCategorySuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putSampleCategoryFailed, payload: {data: null}})
  }
}
function* setEditSampleCategorySaga({payload: sampleType}: ActionWithPayload<ISampleCategory>) {
  try {
    yield put({type: actionTypes.storePrevSampleCategoryDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putSampleCategoryFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllSampleCategory, fetchSampleCategory)
  yield takeLatest(actionTypes.postSampleCategorySuccess, fetchSampleCategory)
  yield takeLatest(actionTypes.postSampleCategory, postSampleCategory)
  yield takeLatest(actionTypes.storePrevSampleCategoryData, setEditSampleCategorySaga)
  yield takeLatest(actionTypes.putSampleCategory, editSampleCategorySaga)
  yield takeLatest(actionTypes.putSampleCategorySuccess, fetchSampleCategory)
  yield takeLatest(actionTypes.deleteSampleCategory, deleteSampleCategorySaga)
  yield takeLatest(actionTypes.deleteSampleCategorySuccess, fetchSampleCategory)
}
