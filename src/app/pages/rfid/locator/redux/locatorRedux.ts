import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {IOpnameItem} from '../../opname/model/opnameModel'
import {RootState} from '../../../../../setup'
import {setItemLocator} from './locatorCRUD'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchItemByBarcode: '[ITEM LOCATOR] Fetch Item By Barcode',
  fetchItemByBarcodeSuccess: '[ITEM LOCATOR] Fetch Item By Barcode Success',
  fetchItemByBarcodeFailure: '[ITEM LOCATOR] Fetch Item By Barcode Faliled',
  setItemLocator: '[ITEM LOCATOR] set Item Locator',
  setItemLocatorFounded: '[ITEM LOCATOR] item founded',
  setItemLocatorError: '[ITEM LOCATOR] item error',
}

const initialOpnameState: IOpnameRedux = {
  data: [],
  payload: null,
}

export interface IOpnameRedux {
  data: IOpnameItem[] | null | undefined
  payload: IOpnameItem | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-stock-locator', whitelist: ['data', 'payload']},
  (state: IOpnameRedux = initialOpnameState, action: ActionWithPayload<IOpnameRedux>) => {
    switch (action.type) {
      case actionTypes.fetchItemByBarcodeSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  saveItemFounded: (item: IOpnameItem) => ({
    type: actionTypes.fetchItemByBarcode,
    item,
  }),
  setItemLocator: (payload: string) => ({type: actionTypes.setItemLocator, payload}),
  clearItemFounded: () => ({
    type: actionTypes.fetchItemByBarcodeSuccess,
    payload: {
      data: [],
    },
  }),
}

function* saveItemFoundedSaga(payload: any) {
  try {
    const prevData = yield select((state: RootState) => state.locator.data)

    yield put({
      type: actionTypes.fetchItemByBarcodeSuccess,
      payload: {
        data: [...prevData, payload.item],
      },
    })
  } catch (error) {
    yield put({type: actionTypes.fetchItemByBarcodeFailure, payload: {data: null}})
  }
}
function* setItemLocatorSaga(payload: any) {
  try {
    yield call(() => setItemLocator(payload))

    yield put({
      type: actionTypes.setItemLocatorFounded,
    })
  } catch (error) {
    yield put({
      type: actionTypes.setItemLocatorError,
    })
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchItemByBarcode, saveItemFoundedSaga)
  yield takeLatest(actionTypes.setItemLocator, setItemLocatorSaga)
}
