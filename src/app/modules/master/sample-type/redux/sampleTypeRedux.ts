import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {ISampleType} from '../model/SampleTypeModel'
import {deleteSampleType, fetchAllSampleType, putSampleType, sendSampleType} from './SampleTypeCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import {sampleTypeIgnore} from '../../../../../setup/enc-ignore/sample-type-ignore-encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllSampleType: '[SAMPLE TYPE] Fetch All Sample Types',
  fetchAllSampleTypeSuccess: '[SAMPLE TYPE] Fetch All Sample Types Success',
  fetchAllSampleTypeFailure: '[SAMPLE TYPE] Fetch All Sample Types Faliled',
  postSampleType: '[SAMPLE TYPE] Post Sample Type',
  postSampleTypeSuccess: '[SAMPLE TYPE] Post Sample Type Success',
  postSampleTypeFailed: '[SAMPLE TYPE] Post Sample Type Failed',
  storePrevSampleTypeData: '[SAMPLE TYPE] Store Prev Data',
  storePrevSampleTypeDataFinish: '[SAMPLE TYPE] Store Prev Data Finish',
  putSampleType: '[SAMPLE TYPE] Put Sample Type',
  putSampleTypeSuccess: '[SAMPLE TYPE] Put Sample Type Success',
  putSampleTypeFailed: '[SAMPLE TYPE] Put Sample Type Failed',
  deleteSampleType: '[SAMPLE TYPE] Delete Sample Type',
  deleteSampleTypeSuccess: '[SAMPLE TYPE] Delete Sample Type Success',
  deleteSampleTypeFailed: '[SAMPLE TYPE] Delete Sample Type Failed',
}

const initialSampleTypeState: ISampleTypeRedux = {
  data: [],
  payload: null,
}

export interface ISampleTypeRedux {
  data: ISampleType[] | null | undefined
  payload: ISampleType | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-sample-type', whitelist: ['data']},
  (
    state: ISampleTypeRedux = initialSampleTypeState,
    action: ActionWithPayload<ISampleTypeRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllSampleTypeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postSampleType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putSampleType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevSampleTypeDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllSampleType: () => ({type: actionTypes.fetchAllSampleType}),
  postSampleType: (payload: ISampleType) => ({type: actionTypes.postSampleType, payload}),
  deleteSampleType: (payload: ISampleType) => ({type: actionTypes.deleteSampleType, payload}),
  editSampleType: (payload: ISampleType) => ({type: actionTypes.putSampleType, payload}),
  setEditSampleType: (payload: ISampleType) => ({
    type: actionTypes.storePrevSampleTypeData,
    payload,
  }),
}

function* fetchSampleType() {
  try {
    const response: {data: DefaultResponse<ISampleType[]>} = yield call(fetchAllSampleType)
    let data = encryptor.doDecrypt(response.data.data, sampleTypeIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllSampleTypeSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllSampleTypeFailure, payload: {data: null}})
  }
}

function* postSampleType({payload: sampleType}: ActionWithPayload<ISampleType>) {
  try {
    yield call(() => sendSampleType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Sample Type successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postSampleTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postSampleTypeFailed, payload: {data: null}})
  }
}

function* deleteSampleTypeSaga({payload: sampleType}: ActionWithPayload<ISampleType>) {
  try {
    yield call(() => deleteSampleType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Sample Type successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteSampleTypeSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteSampleTypeFailed, payload: {data: null}})
  }
}

function* editSampleTypeSaga({payload: sampleType}: ActionWithPayload<ISampleType>) {
  try {
    yield call(() => putSampleType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Sample Type successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putSampleTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putSampleTypeFailed, payload: {data: null}})
  }
}
function* setEditSampleTypeSaga({payload: sampleType}: ActionWithPayload<ISampleType>) {
  try {
    yield put({type: actionTypes.storePrevSampleTypeDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putSampleTypeFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllSampleType, fetchSampleType)
  yield takeLatest(actionTypes.postSampleTypeSuccess, fetchSampleType)
  yield takeLatest(actionTypes.postSampleType, postSampleType)
  yield takeLatest(actionTypes.storePrevSampleTypeData, setEditSampleTypeSaga)
  yield takeLatest(actionTypes.putSampleType, editSampleTypeSaga)
  yield takeLatest(actionTypes.putSampleTypeSuccess, fetchSampleType)
  yield takeLatest(actionTypes.deleteSampleType, deleteSampleTypeSaga)
  yield takeLatest(actionTypes.deleteSampleTypeSuccess, fetchSampleType)
}
