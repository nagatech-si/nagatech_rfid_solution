import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, put, takeLatest} from 'redux-saga/effects'
import {IBanner, IDetailBanner, IHashtag, IRequestDetailBanner} from '../model/BannerModal'
import {
  deleteBanner,
  fetchAllBanner,
  fetchAllDetailBanner,
  fetchAllHashtag,
  putBanner,
  sendBanner,
} from './BannerCRUD'
import {DefaultResponse} from '../../../../../setup/axios/SetupAxios'

import Swal from 'sweetalert2'
import hideModal from '../../../../../_metronic/helpers/ModalHandler'
import {Encryptor} from '../../../../../_metronic/helpers/Encryptor'
import {bannerIgnore} from '../../../../../setup/enc-ignore/banner-ignore-encryptor'

const encryptor = new Encryptor()
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  fetchAllBanner: '[Banner] Fetch All Banner',
  fetchAllBannerSuccess: '[Banner] Fetch All Banner Success',
  fetchAllBannerFailure: '[Banner] Fetch All Banner Faliled',
  fetchAllHashtag: '[Hashtag] Fetch All Hashtag',
  fetchAllHashtagSuccess: '[Hashtag] Fetch All Hashtag Success',
  fetchAllHashtagFailure: '[Hashtag] Fetch All Hashtag Faliled',
  fetchBannerDetail: '[Banner] Fetch Banner Detail',
  fetchBannerDetailSuccess: '[Banner] Fetch Banner Detail Failed',
  fetchBannerDetailFailure: '[Banner] Fetch Banner Detail Success',
  postBanner: '[Banner] Post Banner',
  postBannerSuccess: '[Banner] Post Banner Success',
  postBannerFailed: '[Banner] Post Banner Failed',
  storePrevBannerData: '[Banner] Store Prev Data',
  storePrevBannerDataFinish: '[Banner] Store Prev Data Finish',
  putBanner: '[Banner] Put Banner',
  putBannerSuccess: '[Banner] Put Banner Success',
  putBannerFailed: '[Banner] Put Banner Failed',
  deleteBanner: '[Banner] Delete Banner',
  deleteBannerSuccess: '[Banner] Delete Banner Success',
  deleteBannerFailed: '[Banner] Delete Banner Failed',
}

const initialBannerState: IBannerRedux = {
  data: [],
  payload: null,
  detailBanner: null,
  dataDetailBanner: [],
  hashtag: [],
}

export interface IBannerRedux {
  data: IBanner[] | null | undefined
  dataDetailBanner: IDetailBanner[] | null | undefined
  payload: IBanner | null | undefined
  detailBanner: IRequestDetailBanner | null | undefined
  hashtag: IHashtag[] | null | undefined
}

export const reducer = persistReducer(
  {storage, key: 'v100-amg_catalogue-banner', whitelist: ['data']},
  (state: IBannerRedux = initialBannerState, action: ActionWithPayload<IBannerRedux>) => {
    switch (action.type) {
      case actionTypes.fetchAllBannerSuccess: {
        const data = action.payload?.data
        return {...state, data: data}
      }
      case actionTypes.fetchBannerDetailSuccess: {
        const data = action.payload?.dataDetailBanner
        return {...state, dataDetailBanner: data}
      }
      case actionTypes.postBanner: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.putBanner: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.storePrevBannerDataFinish: {
        const data = action.payload?.payload
        return {...state, payload: data}
      }
      case actionTypes.fetchBannerDetail: {
        const data = action.payload?.detailBanner

        return {...state, detailBanner: data}
      }
      case actionTypes.fetchAllHashtagSuccess: {
        const data = action.payload?.hashtag

        return {...state, hashtag: data}
      }
      default:
        return state
    }
  }
)

export const actions = {
  fetchAllBanner: () => ({type: actionTypes.fetchAllBanner}),
  fetchAllHashtag: () => ({type: actionTypes.fetchAllHashtag}),
  fetchBannerDetail: (detailBanner: IRequestDetailBanner) => ({
    type: actionTypes.fetchBannerDetail,
    payload: {
      detailBanner,
    },
  }),
  postBanner: (payload: IBanner) => ({type: actionTypes.postBanner, payload}),
  deleteBanner: (payload: IBanner) => ({type: actionTypes.deleteBanner, payload}),
  editBanner: (payload: IBanner) => ({type: actionTypes.putBanner, payload}),
  setEditBanner: (payload: IBanner) => ({
    type: actionTypes.storePrevBannerData,
    payload,
  }),
}

function* fetchBanner() {
  try {
    const response: {data: DefaultResponse<IBanner[]>} = yield call(fetchAllBanner)
    let data = encryptor.doDecrypt(response.data.data, bannerIgnore)

    yield put({
      type: actionTypes.fetchAllBannerSuccess,
      payload: {data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllBannerFailure, payload: {data: null}})
  }
}

function* fetchHashtagSaga() {
  try {
    const response: {data: DefaultResponse<IBanner[]>} = yield call(fetchAllHashtag)
    let hashtag = response.data.data

    yield put({
      type: actionTypes.fetchAllHashtagSuccess,
      payload: {hashtag},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchAllHashtagFailure, payload: {data: null}})
  }
}

function* fetchBannerDetail({payload: detailBanner}: ActionWithPayload<any>) {
  try {
    const response: {data: DefaultResponse<IDetailBanner[]>} = yield call(() =>
      fetchAllDetailBanner(detailBanner.detailBanner)
    )
    let data = response.data.data

    yield put({
      type: actionTypes.fetchBannerDetailSuccess,
      payload: {dataDetailBanner: data},
    })
  } catch (error) {
    yield put({type: actionTypes.fetchBannerDetailFailure, payload: {detailBanner: null}})
  }
}

function* postBanner({payload: sampleType}: ActionWithPayload<IBanner>) {
  try {
    yield call(() => sendBanner(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Banner successfully sent to the server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.postBannerSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.postBannerFailed, payload: {data: null}})
  }
}

function* deleteBannerSaga({payload: sampleType}: ActionWithPayload<IBanner>) {
  try {
    yield call(() => deleteBanner(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Banner successfully deleted from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })

    yield put({
      type: actionTypes.deleteBannerSuccess,
    })
  } catch (error: any) {
    yield put({type: actionTypes.deleteBannerFailed, payload: {data: null}})
  }
}

function* editBannerSaga({payload: sampleType}: ActionWithPayload<IBanner>) {
  try {
    yield call(() => putBanner(sampleType!))
    Swal.fire({
      title: 'Success!',
      text: 'Banner successfully updated from server',
      icon: 'success',
      heightAuto: false,
      focusConfirm: true,
    })
    hideModal()
    yield put({
      type: actionTypes.putBannerSuccess,
    })
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putBannerFailed, payload: {data: null}})
  }
}
function* setEditBannerSaga({payload: sampleType}: ActionWithPayload<IBanner>) {
  try {
    yield put({type: actionTypes.storePrevBannerDataFinish, payload: {payload: sampleType}})
  } catch (error: any) {
    hideModal()
    yield put({type: actionTypes.putBannerFailed, payload: {data: null}})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.fetchAllBanner, fetchBanner)
  yield takeLatest(actionTypes.fetchAllHashtag, fetchHashtagSaga)
  yield takeLatest(actionTypes.fetchBannerDetail, fetchBannerDetail)
  yield takeLatest(actionTypes.postBannerSuccess, fetchBanner)
  yield takeLatest(actionTypes.postBannerFailed, fetchBanner)
  yield takeLatest(actionTypes.postBanner, postBanner)
  yield takeLatest(actionTypes.storePrevBannerData, setEditBannerSaga)
  yield takeLatest(actionTypes.putBanner, editBannerSaga)
  yield takeLatest(actionTypes.putBannerSuccess, fetchBanner)
  yield takeLatest(actionTypes.deleteBanner, deleteBannerSaga)
  yield takeLatest(actionTypes.deleteBannerSuccess, fetchBanner)
}
