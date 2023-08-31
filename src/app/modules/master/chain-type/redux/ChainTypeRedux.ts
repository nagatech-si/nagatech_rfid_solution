import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IChainType} from '../model/ChainTypeModel'
import {deleteChainType, fetchAllChainType, putChainType, sendChainType} from './ChainTypeCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {chainTypeIgnore} from '../../../../../setup/enc-ignore/chain-type-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllChainType: '[CHAIN TYPE] Fetch All Chain Types',
  fetchAllChainTypeSuccess: '[CHAIN TYPE] Fetch All Chain Types Success',
  fetchAllChainTypeFailure: '[CHAIN TYPE] Fetch All Chain Types Faliled',
  postChainType: '[CHAIN TYPE] Post Chain Type',
  postChainTypeSuccess: '[CHAIN TYPE] Post Chain Type Success',
  postChainTypeFailed: '[CHAIN TYPE] Post Chain Type Failed',
  storePrevChainTypeData: '[CHAIN TYPE] Store Prev Data',
  storePrevChainTypeDataFinish: '[CHAIN TYPE] Store Prev Data Finish',
  putChainType: '[CHAIN TYPE] Put Chain Type',
  putChainTypeSuccess: '[CHAIN TYPE] Put Chain Type Success',
  putChainTypeFailed: '[CHAIN TYPE] Put Chain Type Failed',
  deleteChainType: '[CHAIN TYPE] Delete Chain Type',
  deleteChainTypeSuccess: '[CHAIN TYPE] Delete Chain Type Success',
  deleteChainTypeFailed: '[CHAIN TYPE] Delete Chain Type Failed',
}

const initialChainTypeState: IChainTypeRedux = {
  data: [],
  payload: null,
}

export interface IChainTypeRedux {
  data: IChainType[] | null | undefined
  payload: IChainType | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-sample-type', whitelist: ['data']},
  (state: IChainTypeRedux = initialChainTypeState, action: ActionWithPayload<IChainTypeRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllChainTypeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.postChainType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putChainType: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevChainTypeDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllChainType: () => ({type: actionTypes.fetchAllChainType}),
  postChainType: (payload: IChainType) => ({type: actionTypes.postChainType, payload}),
  deleteChainType: (payload: IChainType) => ({type: actionTypes.deleteChainType, payload}),
  editChainType: (payload: IChainType) => ({type: actionTypes.putChainType, payload}),
  setEditChainType: (payload: IChainType) => ({
    type: actionTypes.storePrevChainTypeData,
    payload,
  }),
}

function* fetchChainType() {
  try {
    const response: {data: DefaultResponse<IChainType[]>} = yield call(fetchAllChainType)
    let data = encryptor.doDecrypt(response.data.data, chainTypeIgnore)

    yield put({
      type: actionTypes.fetchAllChainTypeSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllChainTypeFailure, payload: {data: null}})
  }
}

function* postChainType({payload: sampleType}: ActionWithPayload<IChainType>) {
  try {
    yield call(() => sendChainType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Chain Type successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postChainTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postChainTypeFailed, payload: {data: null}})
  }
}

function* deleteChainTypeSaga({payload: sampleType}: ActionWithPayload<IChainType>) {
  try {
    yield call(() => deleteChainType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Chain Type successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteChainTypeSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteChainTypeFailed, payload: {data: null}})
  }
}

function* editChainTypeSaga({payload: sampleType}: ActionWithPayload<IChainType>) {
  try {
    yield call(() => putChainType(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Chain Type successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putChainTypeSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putChainTypeFailed, payload: {data: null}})
  }
}
function* setEditChainTypeSaga({payload: sampleType}: ActionWithPayload<IChainType>) {
  try {
    yield put({type: actionTypes.storePrevChainTypeDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putChainTypeFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllChainType, fetchChainType)
  yield takeLatest(actionTypes.postChainTypeSuccess, fetchChainType)
  yield takeLatest(actionTypes.postChainTypeFailed, fetchChainType)
  yield takeLatest(actionTypes.postChainType, postChainType)
  yield takeLatest(actionTypes.storePrevChainTypeData, setEditChainTypeSaga)
  yield takeLatest(actionTypes.putChainType, editChainTypeSaga)
  yield takeLatest(actionTypes.putChainTypeSuccess, fetchChainType)
  yield takeLatest(actionTypes.deleteChainType, deleteChainTypeSaga)
  yield takeLatest(actionTypes.deleteChainTypeSuccess, fetchChainType)
}
