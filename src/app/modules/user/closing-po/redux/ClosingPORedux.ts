import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IClosingPO, IReqeustConfirmPO} from '../model/ClosingPOModel'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'

import {
  cancelPO,
  confirmPO,
  deletePO,
  fetchAllOpenPO,
  fetchAllPOClosed,
  fetchAllPOFinished,
  finishPO,
} from './ClosingPOCRUD'
import {customerPoIgnore} from '../../../../../setup/enc-ignore/customer-po-ignore-encryptor copy'
import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchOpenPO: '[MANAGE PO] Fetch All Open PO',
  fetchOpenPOSuccess: '[MANAGE PO] Fetch All Open PO Success',
  fetchOpenPOFailure: '[MANAGE PO] Fetch All Open PO Faliled',
  fetchClosePO: '[MANAGE PO] Fetch All Closed PO',
  fetchClosePOSuccess: '[MANAGE PO] Fetch All Closed PO Success',
  fetchClosePOFailure: '[MANAGE PO] Fetch All Closed PO Faliled',
  fetchfinishPO: '[MANAGE PO] Fetch All Finish PO',
  fetchfinishPOSuccess: '[MANAGE PO] Fetch All Finish PO Success',
  fetchfinishPOFailure: '[MANAGE PO] Fetch All Finish PO Faliled',
  confirmPO: '[MANAGE PO] Fetch All Confirm PO',
  confirmPOSuccess: '[MANAGE PO] Fetch All Confirm PO Success',
  confirmPOFailure: '[MANAGE PO] Fetch All Confirm PO Faliled',
  finishPO: '[MANAGE PO] Send Finish PO',
  finishPOSuccess: '[MANAGE PO] Send Finish PO Success',
  finishPOFailure: '[MANAGE PO] Send Finish PO Faliled',
  deletePO: '[MANAGE PO] Send Delete PO',
  deletePOSuccess: '[MANAGE PO] Send Delete PO Success',
  deletePOFailure: '[MANAGE PO] Send Delete PO Faliled',
  cancelPO: '[MANAGE PO] Send Cancel PO',
  cancelPOSuccess: '[MANAGE PO] Send Cancel PO Success',
  cancelPOFailure: '[MANAGE PO] Send Cancel PO Faliled',
  storePrevManageUserData: '[MANAGE PO] Store Prev Data',
  storePrevManageUserDataFinish: '[MANAGE PO] Store Prev Data Finish',
}

const initialManageUserState: IClosingPORedux = {
  data: [],
  closedData: [],
  finishData: [],
  payload: null,
}

export interface IClosingPORedux {
  data: IClosingPO[] | null | undefined
  closedData: IClosingPO[] | null | undefined
  finishData: IClosingPO[] | null | undefined
  payload: IClosingPO | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-customer-po', whitelist: ['data']},
  (state: IClosingPORedux = initialManageUserState, action: ActionWithPayload<IClosingPORedux>) => {
    switch (action.type) {
      case actionTypes.fetchOpenPOSuccess: {
        const data = action.payload?.data
        return {...state, data}
      }
      case actionTypes.fetchClosePOSuccess: {
        const closedData = action.payload?.closedData
        return {...state, closedData}
      }

      case actionTypes.fetchfinishPOSuccess: {
        const finishData = action.payload?.finishData
        return {...state, finishData}
      }

      case actionTypes.storePrevManageUserDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllOpenPO: () => ({type: actionTypes.fetchOpenPO}),
  fetchAllClosedPO: (start_date: string, end_date: string) => ({
    type: actionTypes.fetchClosePO,
    payload: {
      end_date,
      start_date,
    },
  }),
  fetchAllFinishedPO: (start_date: string, end_date: string) => ({
    type: actionTypes.fetchfinishPO,
    payload: {
      end_date,
      start_date,
    },
  }),
  setEditManageUser: (payload: IClosingPO) => ({
    type: actionTypes.storePrevManageUserData,
    payload,
  }),
  putCofirmPO: (no_po: string, datas: IReqeustConfirmPO[]) => ({
    type: actionTypes.confirmPO,
    payload: {
      no_po,
      datas,
    },
  }),
  putFinishPO: (payload: string) => ({
    type: actionTypes.finishPO,
    payload,
  }),
  putDeletePO: (payload: string) => ({
    type: actionTypes.deletePO,
    payload,
  }),
  putCancelPO: (payload: string) => ({
    type: actionTypes.cancelPO,
    payload,
  }),
}

function* confirmPOSaga({payload: sampleType}: ActionWithPayload<any>) {
  try {
    yield call(() => confirmPO(sampleType.no_po, sampleType.datas))
    Swal.fire({
      title: 'Success!',
      text: 'Confirm PO successfully sended to server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()

    yield put({
      type: actionTypes.confirmPOSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.confirmPOFailure, payload: {data: null}})
    hideModal()
  }
}

function* finishPOSaga({payload: sampleType}: ActionWithPayload<string>) {
  try {
    yield call(() => finishPO(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Finish PO successfully sended to server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.finishPOSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.finishPOFailure, payload: {data: null}})
  }
}

function* deletePOSaga({payload: sampleType}: ActionWithPayload<string>) {
  try {
    yield call(() => deletePO(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Delete PO successfully ',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deletePOSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deletePOFailure, payload: {data: null}})
  }
}

function* cancelPOSaga({payload: sampleType}: ActionWithPayload<string>) {
  try {
    yield call(() => cancelPO(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Cancel PO successfully',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.cancelPOSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.cancelPOFailure, payload: {data: null}})
  }
}

function* fetchOpenPOSaga() {
  try {
    const response: {data: DefaultResponse<IClosingPO[]>} = yield call(fetchAllOpenPO)
    let data = encryptor.doDecrypt(response.data.data, customerPoIgnore)

    yield put({
      type: actionTypes.fetchOpenPOSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchOpenPOFailure, payload: {data: null}})
  }
}
function* fetchAllClosedPOSaga({payload: sampleType}: ActionWithPayload<any>) {
  try {
    if (sampleType === undefined) {
      sampleType = {
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
      }
    }

    const response: {data: DefaultResponse<IClosingPO[]>} = yield call(() =>
      fetchAllPOClosed(sampleType.start_date, sampleType.end_date)
    )
    let closedData = encryptor.doDecrypt(response.data.data, customerPoIgnore)

    yield put({
      type: actionTypes.fetchClosePOSuccess,
      payload: {
        closedData,
      },
    })
  } catch (error) {
    console.log(error)

    yield put({type: actionTypes.fetchClosePOFailure, payload: {data: null}})
  }
}

function* fetchAllFinishPOSaga({payload: sampleType}: ActionWithPayload<any>) {
  try {
    if (sampleType === undefined) {
      sampleType = {
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
      }
    }
    const response: {data: DefaultResponse<IClosingPO[]>} = yield call(() =>
      fetchAllPOFinished(sampleType.start_date, sampleType.end_date)
    )
    let finishData = encryptor.doDecrypt(response.data.data, customerPoIgnore)

    yield put({
      type: actionTypes.fetchfinishPOSuccess,
      payload: {
        finishData,
      },
    })
  } catch (error) {
    yield put({type: actionTypes.fetchfinishPOSuccess, payload: {data: null}})
  }
}

function* setEditManageUserSaga({payload: sampleType}: ActionWithPayload<IClosingPO>) {
  try {
    yield put({type: actionTypes.storePrevManageUserDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {}
}

export function* saga() {
  yield takeLatest(actionTypes.fetchOpenPO, fetchOpenPOSaga)
  yield takeLatest(actionTypes.fetchClosePO, fetchAllClosedPOSaga)
  yield takeLatest(actionTypes.fetchfinishPO, fetchAllFinishPOSaga)
  yield takeLatest(actionTypes.confirmPO, confirmPOSaga)
  yield takeLatest(actionTypes.confirmPOSuccess, fetchOpenPOSaga)
  yield takeLatest(actionTypes.confirmPOSuccess, fetchAllClosedPOSaga)
  yield takeLatest(actionTypes.finishPO, finishPOSaga)
  yield takeLatest(actionTypes.finishPOSuccess, fetchAllClosedPOSaga)
  yield takeLatest(actionTypes.finishPOSuccess, fetchAllFinishPOSaga)
  yield takeLatest(actionTypes.deletePO, deletePOSaga)
  yield takeLatest(actionTypes.deletePOSuccess, fetchOpenPOSaga)
  yield takeLatest(actionTypes.cancelPO, cancelPOSaga)
  yield takeLatest(actionTypes.cancelPOSuccess, fetchAllFinishPOSaga)
  yield takeLatest(actionTypes.storePrevManageUserData, setEditManageUserSaga)
}
