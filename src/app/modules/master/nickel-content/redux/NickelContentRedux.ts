import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {INickelContent} from '../model/NickelContentModel'
import {
  deleteNickelContent,
  fetchAllNickelContent,
  putNickelContent,
  sendNickelContent,
} from './NickelContentCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {nickelContentIgnore} from '../../../../../setup/enc-ignore/nickel-contect-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllNickelContent: '[NICKEL CONTENT] Fetch All Nickel Content',
  fetchAllNickelContentSuccess: '[NICKEL CONTENT] Fetch All Nickel Content Success',
  fetchAllNickelContentFailure: '[NICKEL CONTENT] Fetch All Nickel Content Faliled',
  postNickelContent: '[NICKEL CONTENT] Post Nickel Content',
  postNickelContentSuccess: '[NICKEL CONTENT] Post Nickel Content Success',
  postNickelContentFailed: '[NICKEL CONTENT] Post Nickel Content Failed',
  storePrevNickelContentData: '[NICKEL CONTENT] Store Prev Data',
  storePrevNickelContentDataFinish: '[NICKEL CONTENT] Store Prev Data Finish',
  putNickelContent: '[NICKEL CONTENT] Put Nickel Content',
  putNickelContentSuccess: '[NICKEL CONTENT] Put Nickel Content Success',
  putNickelContentFailed: '[NICKEL CONTENT] Put Nickel Content Failed',
  deleteNickelContent: '[NICKEL CONTENT] Delete Nickel Content',
  deleteNickelContentSuccess: '[NICKEL CONTENT] Delete Nickel Content Success',
  deleteNickelContentFailed: '[NICKEL CONTENT] Delete Nickel Content Failed',
}

const initialNickelContentState: INickelContentRedux = {
  data: [],
  payload: null,
}

export interface INickelContentRedux {
  data: INickelContent[] | null | undefined
  payload: INickelContent | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-nickel-content', whitelist: ['data']},
  (
    state: INickelContentRedux = initialNickelContentState,
    action: ActionWithPayload<INickelContentRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllNickelContentSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postNickelContent: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putNickelContent: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevNickelContentDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllNickelContent: () => ({type: actionTypes.fetchAllNickelContent}),
  postNickelContent: (payload: INickelContent) => ({type: actionTypes.postNickelContent, payload}),
  deleteNickelContent: (payload: INickelContent) => ({
    type: actionTypes.deleteNickelContent,
    payload,
  }),
  editNickelContent: (payload: INickelContent) => ({type: actionTypes.putNickelContent, payload}),
  setEditNickelContent: (payload: INickelContent) => ({
    type: actionTypes.storePrevNickelContentData,
    payload,
  }),
}

function* fetchNickelContent() {
  try {
    const response: {data: DefaultResponse<INickelContent[]>} = yield call(fetchAllNickelContent)
    let data = encryptor.doDecrypt(response.data.data, nickelContentIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllNickelContentSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllNickelContentFailure, payload: {data: null}})
  }
}

function* postNickelContent({payload: sampleType}: ActionWithPayload<INickelContent>) {
  try {
    yield call(() => sendNickelContent(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Nickel Content successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postNickelContentSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postNickelContentFailed, payload: {data: null}})
  }
}

function* deleteNickelContentSaga({payload: sampleType}: ActionWithPayload<INickelContent>) {
  try {
    yield call(() => deleteNickelContent(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Nickel Content successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteNickelContentSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteNickelContentFailed, payload: {data: null}})
  }
}

function* editNickelContentSaga({payload: sampleType}: ActionWithPayload<INickelContent>) {
  try {
    yield call(() => putNickelContent(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Nickel Content successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putNickelContentSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putNickelContentFailed, payload: {data: null}})
  }
}
function* setEditNickelContentSaga({payload: sampleType}: ActionWithPayload<INickelContent>) {
  try {
    yield put({type: actionTypes.storePrevNickelContentDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putNickelContentFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllNickelContent, fetchNickelContent)
  yield takeLatest(actionTypes.postNickelContentSuccess, fetchNickelContent)
  yield takeLatest(actionTypes.postNickelContent, postNickelContent)
  yield takeLatest(actionTypes.storePrevNickelContentData, setEditNickelContentSaga)
  yield takeLatest(actionTypes.putNickelContent, editNickelContentSaga)
  yield takeLatest(actionTypes.putNickelContentSuccess, fetchNickelContent)
  yield takeLatest(actionTypes.deleteNickelContent, deleteNickelContentSaga)
  yield takeLatest(actionTypes.deleteNickelContentSuccess, fetchNickelContent)
}
