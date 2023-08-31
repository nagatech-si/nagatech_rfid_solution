import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IStoneGrade} from '../model/StoneGradeModel'
import {deleteStoneGrade, fetchAllStoneGrade, putStoneGrade, sendStoneGrade} from './StoneGradeCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {stoneGradeIgnore} from '../../../../../setup/enc-ignore/stone-grade-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllStoneGrade: '[STONE GRADE] Fetch All Stone Grade',
  fetchAllStoneGradeSuccess: '[STONE GRADE] Fetch All Stone Grade Success',
  fetchAllStoneGradeFailure: '[STONE GRADE] Fetch All Stone Grade Faliled',
  postStoneGrade: '[STONE GRADE] Post Stone Grade',
  postStoneGradeSuccess: '[STONE GRADE] Post Stone Grade Success',
  postStoneGradeFailed: '[STONE GRADE] Post Stone Grade Failed',
  storePrevStoneGradeData: '[STONE GRADE] Store Prev Data',
  storePrevStoneGradeDataFinish: '[STONE GRADE] Store Prev Data Finish',
  putStoneGrade: '[STONE GRADE] Put Stone Grade',
  putStoneGradeSuccess: '[STONE GRADE] Put Stone Grade Success',
  putStoneGradeFailed: '[STONE GRADE] Put Stone Grade Failed',
  deleteStoneGrade: '[STONE GRADE] Delete Stone Grade',
  deleteStoneGradeSuccess: '[STONE GRADE] Delete Stone Grade Success',
  deleteStoneGradeFailed: '[STONE GRADE] Delete Stone Grade Failed',
}

const initialStoneGradeState: IStoneGradeRedux = {
  data: [],
  payload: null,
}

export interface IStoneGradeRedux {
  data: IStoneGrade[] | null | undefined
  payload: IStoneGrade | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-stone-grade', whitelist: ['data']},
  (
    state: IStoneGradeRedux = initialStoneGradeState,
    action: ActionWithPayload<IStoneGradeRedux>
  ) => {
    switch (action.type) {
      case actionTypes.fetchAllStoneGradeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postStoneGrade: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putStoneGrade: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevStoneGradeDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllStoneGrade: () => ({type: actionTypes.fetchAllStoneGrade}),
  postStoneGrade: (payload: IStoneGrade) => ({type: actionTypes.postStoneGrade, payload}),
  deleteStoneGrade: (payload: IStoneGrade) => ({
    type: actionTypes.deleteStoneGrade,
    payload,
  }),
  editStoneGrade: (payload: IStoneGrade) => ({type: actionTypes.putStoneGrade, payload}),
  setEditStoneGrade: (payload: IStoneGrade) => ({
    type: actionTypes.storePrevStoneGradeData,
    payload,
  }),
}

function* fetchStoneGrade() {
  try {
    const response: {data: DefaultResponse<IStoneGrade[]>} = yield call(fetchAllStoneGrade)
    let data = encryptor.doDecrypt(response.data.data, stoneGradeIgnore)
    console.log(data)

    yield put({
      type: actionTypes.fetchAllStoneGradeSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllStoneGradeFailure, payload: {data: null}})
  }
}

function* postStoneGrade({payload: sampleType}: ActionWithPayload<IStoneGrade>) {
  try {
    yield call(() => sendStoneGrade(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Grade successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postStoneGradeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postStoneGradeFailed, payload: {data: null}})
  }
}

function* deleteStoneGradeSaga({payload: sampleType}: ActionWithPayload<IStoneGrade>) {
  try {
    yield call(() => deleteStoneGrade(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Grade successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteStoneGradeSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteStoneGradeFailed, payload: {data: null}})
  }
}

function* editStoneGradeSaga({payload: sampleType}: ActionWithPayload<IStoneGrade>) {
  try {
    yield call(() => putStoneGrade(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Stone Grade successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putStoneGradeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneGradeFailed, payload: {data: null}})
  }
}
function* setEditStoneGradeSaga({payload: sampleType}: ActionWithPayload<IStoneGrade>) {
  try {
    yield put({type: actionTypes.storePrevStoneGradeDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putStoneGradeFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllStoneGrade, fetchStoneGrade)
  yield takeLatest(actionTypes.postStoneGradeSuccess, fetchStoneGrade)
  yield takeLatest(actionTypes.postStoneGrade, postStoneGrade)
  yield takeLatest(actionTypes.storePrevStoneGradeData, setEditStoneGradeSaga)
  yield takeLatest(actionTypes.putStoneGrade, editStoneGradeSaga)
  yield takeLatest(actionTypes.putStoneGradeSuccess, fetchStoneGrade)
  yield takeLatest(actionTypes.deleteStoneGrade, deleteStoneGradeSaga)
  yield takeLatest(actionTypes.deleteStoneGradeSuccess, fetchStoneGrade)
}
