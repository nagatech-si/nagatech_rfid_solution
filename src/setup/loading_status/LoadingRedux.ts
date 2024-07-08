import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  startSumbittingAPI: '[LOADING STATUS] START SUBMITTING API',
  stopSumbittingAPI: '[LOADING STATUS] STOP SUBMITTING API',
}

const initialItemState: ILoadingStatus = {
  isSubmittingAPI: false,
}

export interface ILoadingStatus {
  isSubmittingAPI: boolean
}

export const reducer = persistReducer(
  {storage, key: 'v100-nagagold-rfid-solution-loading', whitelist: ['isSubmittingAPI']},
  (state: ILoadingStatus = initialItemState, action: ActionWithPayload<ILoadingStatus>) => {
    switch (action.type) {
      case actionTypes.startSumbittingAPI: {
        return {...state, isSubmittingAPI: true}
      }
      case actionTypes.stopSumbittingAPI: {
        return {...state, isSubmittingAPI: false}
      }

      default:
        return state
    }
  }
)

export const actions = {
  startSubmittingAPI: () => ({type: actionTypes.startSumbittingAPI}),
  stopSubmittingAPI: () => ({type: actionTypes.stopSumbittingAPI}),
}

export const startSubmittingAPI = actions.startSubmittingAPI
export const stopSubmittingAPI = actions.stopSubmittingAPI
