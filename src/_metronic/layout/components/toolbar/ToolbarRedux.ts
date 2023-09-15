import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  SetModalName: '[Toolbar] Set Modal Name',
  SetFocusName: '[Toolbar] Set Focus Name',
  SetCreateMode: '[Toolbar] Set Create Mode',
}

const initialAuthState: IToolbarState = {
  modalName: null,
  createMode: true,
  focusName: null,
}

export interface IToolbarState {
  modalName?: string | null | undefined
  focusName?: string | null | undefined
  createMode: boolean | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-toolbar', whitelist: ['modalName', 'createMode', 'focusName']},
  (state: IToolbarState = initialAuthState, action: ActionWithPayload<IToolbarState>) => {
    switch (action.type) {
      case actionTypes.SetModalName: {
        return {...state, modalName: action.payload?.modalName}
      }

      case actionTypes.SetCreateMode: {
        return {...state, createMode: action.payload?.createMode ?? false}
      }

      case actionTypes.SetFocusName: {
        return {...state, focusName: action.payload?.focusName}
      }

      default:
        return state
    }
  }
)

export const actions = {
  SetModalToolbarName: (modalName: string) => ({
    type: actionTypes.SetModalName,
    payload: {modalName},
  }),
  SetFocusName: (focusName: string) => ({
    type: actionTypes.SetFocusName,
    payload: {focusName},
  }),
  SetCreateModalActive: (createMode: boolean) => ({
    type: actionTypes.SetCreateMode,
    payload: {createMode},
  }),
}

// export function* saga() {
//   yield takeLatest(actionTypes.SetModalName, function* setModalName(modalName :string) {
//     yield put(actions.SetModalToolbarName(modalName))
//   })
// }
