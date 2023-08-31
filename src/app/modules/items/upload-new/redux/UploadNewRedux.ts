import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import {editNewItem, fetchAllOpenedSampleCode, postNewItem} from './UploadNewCRUD'
import {IRequestSampleCode} from '../model/RequestSampleCode'
import {IResponseSampleCode} from '../model/SampleCode'
import {Toast} from '../../../../../_metronic/helpers/Sweetalert'
import {IRequestUploadItem} from '../model/UploadNewHelper'
import Swal from 'sweetalert2'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllSampleCode: '[SAMPLE CODE] Fetch All Sample Code',
  fetchAllSampleCodeSuccess: '[SAMPLE CODE] Fetch All Sample Code Success',
  fetchAllSampleCodeFailure: '[SAMPLE CODE] Fetch All Sample Code Faliled',
  postUploadNew: '[UPLOAD NEW] Upload New',
  postUploadNewSuccess: '[UPLOAD NEW] Upload New Success',
  postUploadNewFailure: '[UPLOAD NEW] Upload New Faliled',
  editUploadNew: '[UPLOAD NEW] Edit Upload New',
  editUploadNewSuccess: '[UPLOAD NEW] Edit Upload New Success',
  editUploadNewFailure: '[UPLOAD NEW] Edit Upload New Faliled',
  setEditItem: '[UPLOAD NEW] SET Edit Item',
  removeEditItem: '[UPLOAD NEW] REMOVE Edit Item',
  setDuplicateItem: '[UPLOAD NEW] SET Duplicate Item',
  removeDuplicateItem: '[UPLOAD NEW] REMOVE Duplicate Item',
}

const initialItemState: IUploadNewState = {
  data: [],
  payload: null,
  statusUpload: null,
  edit: false,
  duplicate: false,
}

export interface IUploadNewState {
  data: IResponseSampleCode[] | null | undefined
  payload: IRequestUploadItem | null | undefined
  statusUpload: string | null | undefined
  edit: boolean | null | undefined
  duplicate: boolean | null | undefined
}

export const reducer = persistReducer(
  {
    storage,
    key: 'v100-amg_catalogue-upload_new',
    whitelist: ['data', 'payload', 'edit', 'duplicate'],
  },
  (state: IUploadNewState = initialItemState, action: ActionWithPayload<IUploadNewState>) => {
    switch (action.type) {
      case actionTypes.fetchAllSampleCodeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.setEditItem: {
        const edit = action.payload?.edit
        return {...state, edit}
      }
      case actionTypes.removeEditItem: {
        const edit = action.payload?.edit
        return {...state, edit}
      }
      case actionTypes.setDuplicateItem: {
        const duplicate = action.payload?.duplicate
        return {...state, duplicate}
      }
      case actionTypes.removeDuplicateItem: {
        const duplicate = action.payload?.duplicate
        return {...state, duplicate}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllSampleCode: (payload: IRequestSampleCode) => ({
    type: actionTypes.fetchAllSampleCode,
    payload,
  }),
  setEditItem: () => ({
    type: actionTypes.setEditItem,
    payload: {
      edit: true,
    },
  }),
  removeEditItem: () => ({
    type: actionTypes.setEditItem,
    payload: {
      edit: false,
    },
  }),
  setDuplicateItem: () => ({
    type: actionTypes.setDuplicateItem,
    payload: {
      duplicate: true,
    },
  }),
  removeDuplicateItem: () => ({
    type: actionTypes.setDuplicateItem,
    payload: {
      duplicate: false,
    },
  }),
  postUploadNew: (payload: IRequestUploadItem) => ({type: actionTypes.postUploadNew, payload}),
  editUploadNew: (payload: IRequestUploadItem) => ({type: actionTypes.editUploadNew, payload}),
}

function* postUploadNewSaga({payload: data}: ActionWithPayload<IRequestUploadItem>) {
  try {
    yield call(() => postNewItem(data!))
    Swal.fire({
      title: 'Success!',
      text: 'Item successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    localStorage.removeItem('prevUpload')
    localStorage.removeItem('prevUploadPosition')
    localStorage.removeItem('uploadType')
    yield put({
      type: actionTypes.postUploadNewSuccess,
      data: {
        status: 'success',
      },
    })
  } catch (error: any) {
    yield put({type: actionTypes.postUploadNewFailure, payload: {data: null}})
  }
}

function* editUploadNewSaga({payload: data}: ActionWithPayload<IRequestUploadItem>) {
  try {
    yield call(() => editNewItem(data!))
    Swal.fire({
      title: 'Success!',
      text: 'Edit Item successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    localStorage.removeItem('prevUpload')
    localStorage.removeItem('prevUploadPosition')
    localStorage.removeItem('uploadType')
    yield put({
      type: actionTypes.editUploadNewSuccess,
      data: {
        status: 'success',
      },
    })
  } catch (error: any) {
    yield put({type: actionTypes.editUploadNewFailure, payload: {data: null}})
  }
}

function* fetchAllSampleCodeSaga({
  payload: requestItemLine,
}: ActionWithPayload<IRequestSampleCode>) {
  try {
    const response: {data: DefaultResponse<IResponseSampleCode[]>} = yield call(() =>
      fetchAllOpenedSampleCode(requestItemLine!)
    )

    if (response.data.data.length < 1) {
      Toast.fire({
        icon: 'error',
        title: 'Sample Code Not Found',
      })
      return
    }
    let data = encryptor.doDecrypt(response.data.data, ['item_name', 'code_item', '_id', 'status'])

    Toast.fire({
      icon: 'success',
      title: 'Sample Code Founded',
    })
    yield put({
      type: actionTypes.fetchAllSampleCodeSuccess,
      payload: {data},
    })
  } catch (error) {
    Toast.fire({
      icon: 'error',
      title: 'Sample Code Not Found',
    })
    yield put({type: actionTypes.fetchAllSampleCodeFailure, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllSampleCode, fetchAllSampleCodeSaga)
  yield takeLatest(actionTypes.postUploadNew, postUploadNewSaga)
  yield takeLatest(actionTypes.editUploadNew, editUploadNewSaga)
}
