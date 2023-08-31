import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {ISampleQuantityType} from '../model/SampleQuantityTypeModel'
import {
  deleteSampleQuantityType,
  fetchAllSampleQuantityType,
  putSampleQuantityType,
  sendSampleQuantityType,
} from './SampleQuantityTypeCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {sampleQuantityTypeIgnore} from '../../../../../setup/enc-ignore/sample-quantity-type-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllSampleQuantityType: '[SAMPEL QUANTITY TYPE] Fetch All Sample Quantity Types',
  fetchAllSampleQuantityTypeSuccess:
    '[SAMPEL QUANTITY TYPE] Fetch All Sample Quantity Types Success',
  fetchAllSampleQuantityTypeFailure:
    '[SAMPEL QUANTITY TYPE] Fetch All Sample Quantity Types Faliled',
  postSampleQuantityType: '[SAMPEL QUANTITY TYPE] Post Sample Quantity Type',
  postSampleQuantityTypeSuccess: '[SAMPEL QUANTITY TYPE] Post Sample Quantity Type Success',
  postSampleQuantityTypeFailed: '[SAMPEL QUANTITY TYPE] Post Sample Quantity Type Failed',
  storePrevSampleQuantityTypeData: '[SAMPEL QUANTITY TYPE] Store Prev Data',
  storePrevSampleQuantityTypeDataFinish: '[SAMPEL QUANTITY TYPE] Store Prev Data Finish',
  putSampleQuantityType: '[SAMPEL QUANTITY TYPE] Put Sample Quantity Type',
  putSampleQuantityTypeSuccess: '[SAMPEL QUANTITY TYPE] Put Sample Quantity Type Success',
  putSampleQuantityTypeFailed: '[SAMPEL QUANTITY TYPE] Put Sample Quantity Type Failed',
  deleteSampleQuantityType: '[SAMPEL QUANTITY TYPE] Delete Sample Quantity Type',
  deleteSampleQuantityTypeSuccess: '[SAMPEL QUANTITY TYPE] Delete Sample Quantity Type Success',
  deleteSampleQuantityTypeFailed: '[SAMPEL QUANTITY TYPE] Delete Sample Quantity Type Failed',
}

const initialSampleQuantityTypeState: ISampleQuantityTypeRedux = {
  data: [],
  payload: null,
}

export interface ISampleQuantityTypeRedux {
  data: ISampleQuantityType[] | null | undefined
  payload: ISampleQuantityType | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-sample-quantity-type', whitelist: ['data']},
  (
    state: ISampleQuantityTypeRedux = initialSampleQuantityTypeState,
    action: ActionWithPayload<ISampleQuantityTypeRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllSampleQuantityTypeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postSampleQuantityType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putSampleQuantityType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevSampleQuantityTypeDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllSampleQuantityType: () => ({type: actionTypes.fetchAllSampleQuantityType}),
  postSampleQuantityType: (payload: ISampleQuantityType) => ({
    type: actionTypes.postSampleQuantityType,
    payload,
  }),
  deleteSampleQuantityType: (payload: ISampleQuantityType) => ({
    type: actionTypes.deleteSampleQuantityType,
    payload,
  }),
  editSampleQuantityType: (payload: ISampleQuantityType) => ({
    type: actionTypes.putSampleQuantityType,
    payload,
  }),
  setEditSampleQuantityType: (payload: ISampleQuantityType) => ({
    type: actionTypes.storePrevSampleQuantityTypeData,
    payload,
  }),
}

function* fetchSampleQuantityType() {
  try {
    const response: {data: DefaultResponse<ISampleQuantityType[]>} = yield call(
      fetchAllSampleQuantityType
    )
    let data = encryptor.doDecrypt(response.data.data, sampleQuantityTypeIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllSampleQuantityTypeSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllSampleQuantityTypeFailure, payload: {data: null}})
  }
}

function* postSampleQuantityType({payload: sampleType}: ActionWithPayload<ISampleQuantityType>) {
  try {
    yield call(() => sendSampleQuantityType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Sample Quantity type successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postSampleQuantityTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postSampleQuantityTypeFailed, payload: {data: null}})
  }
}

function* deleteSampleQuantityTypeSaga({
  payload: sampleType,
}: ActionWithPayload<ISampleQuantityType>) {
  try {
    yield call(() => deleteSampleQuantityType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Sample Quantity type successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteSampleQuantityTypeSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteSampleQuantityTypeFailed, payload: {data: null}})
  }
}

function* editSampleQuantityTypeSaga({
  payload: sampleType,
}: ActionWithPayload<ISampleQuantityType>) {
  try {
    yield call(() => putSampleQuantityType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Sample Quantity type successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putSampleQuantityTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putSampleQuantityTypeFailed, payload: {data: null}})
  }
}
function* setEditSampleQuantityTypeSaga({
  payload: sampleType,
}: ActionWithPayload<ISampleQuantityType>) {
  try {
    yield put({
      type: actionTypes.storePrevSampleQuantityTypeDataFinish,
      payload: {payload: sampleType},
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putSampleQuantityTypeFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllSampleQuantityType, fetchSampleQuantityType)
  yield takeLatest(actionTypes.postSampleQuantityTypeSuccess, fetchSampleQuantityType)
  yield takeLatest(actionTypes.postSampleQuantityType, postSampleQuantityType)
  yield takeLatest(actionTypes.storePrevSampleQuantityTypeData, setEditSampleQuantityTypeSaga)
  yield takeLatest(actionTypes.putSampleQuantityType, editSampleQuantityTypeSaga)
  yield takeLatest(actionTypes.putSampleQuantityTypeSuccess, fetchSampleQuantityType)
  yield takeLatest(actionTypes.deleteSampleQuantityType, deleteSampleQuantityTypeSaga)
  yield takeLatest(actionTypes.deleteSampleQuantityTypeSuccess, fetchSampleQuantityType)
}
