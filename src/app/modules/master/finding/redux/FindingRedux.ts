import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IFinding} from '../model/FindingModel'
import {deleteFinding, fetchAllFinding, putFinding, sendFinding} from './FindingCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {findingIgnore} from '../../../../../setup/enc-ignore/finding-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllFinding: '[FINDING] Fetch All Finding',
  fetchAllFindingSuccess: '[FINDING] Fetch All Finding Success',
  fetchAllFindingFailure: '[FINDING] Fetch All Finding Faliled',
  postFinding: '[FINDING] Post Finding',
  postFindingSuccess: '[FINDING] Post Finding Success',
  postFindingFailed: '[FINDING] Post Finding Failed',
  storePrevFindingData: '[FINDING] Store Prev Data',
  storePrevFindingDataFinish: '[FINDING] Store Prev Data Finish',
  putFinding: '[FINDING] Put Finding',
  putFindingSuccess: '[FINDING] Put Finding Success',
  putFindingFailed: '[FINDING] Put Finding Failed',
  deleteFinding: '[FINDING] Delete Finding',
  deleteFindingSuccess: '[FINDING] Delete Finding Success',
  deleteFindingFailed: '[FINDING] Delete Finding Failed',
}

const initialFindingState: IFindingRedux = {
  data: [],
  payload: null,
}

export interface IFindingRedux {
  data: IFinding[] | null | undefined
  payload: IFinding | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-finding', whitelist: ['data']},
  (state: IFindingRedux = initialFindingState, action: ActionWithPayload<IFindingRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllFindingSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postFinding: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putFinding: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevFindingDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllFinding: () => ({type: actionTypes.fetchAllFinding}),
  postFinding: (payload: IFinding) => ({type: actionTypes.postFinding, payload}),
  deleteFinding: (payload: IFinding) => ({type: actionTypes.deleteFinding, payload}),
  editFinding: (payload: IFinding) => ({type: actionTypes.putFinding, payload}),
  setEditFinding: (payload: IFinding) => ({
    type: actionTypes.storePrevFindingData,
    payload,
  }),
}

function* fetchFinding() {
  try {
    const response: {data: DefaultResponse<IFinding[]>} = yield call(fetchAllFinding)
    let data = encryptor.doDecrypt(response.data.data, findingIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllFindingSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllFindingFailure, payload: {data: null}})
  }
}

function* postFinding({payload: sampleType}: ActionWithPayload<IFinding>) {
  try {
    yield call(() => sendFinding(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Finding successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postFindingSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postFindingFailed, payload: {data: null}})
  }
}

function* deleteFindingSaga({payload: sampleType}: ActionWithPayload<IFinding>) {
  try {
    yield call(() => deleteFinding(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Finding successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteFindingSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteFindingFailed, payload: {data: null}})
  }
}

function* editFindingSaga({payload: sampleType}: ActionWithPayload<IFinding>) {
  try {
    yield call(() => putFinding(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Finding successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putFindingSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putFindingFailed, payload: {data: null}})
  }
}
function* setEditFindingSaga({payload: sampleType}: ActionWithPayload<IFinding>) {
  try {
    yield put({type: actionTypes.storePrevFindingDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putFindingFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllFinding, fetchFinding)
  yield takeLatest(actionTypes.postFindingSuccess, fetchFinding)
  yield takeLatest(actionTypes.postFinding, postFinding)
  yield takeLatest(actionTypes.storePrevFindingData, setEditFindingSaga)
  yield takeLatest(actionTypes.putFinding, editFindingSaga)
  yield takeLatest(actionTypes.putFindingSuccess, fetchFinding)
  yield takeLatest(actionTypes.deleteFinding, deleteFindingSaga)
  yield takeLatest(actionTypes.deleteFindingSuccess, fetchFinding)
}
