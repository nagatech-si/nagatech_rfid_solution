import axios from 'axios'
import {IBanner, IDetailBanner, IHashtag, IRequestDetailBanner} from '../model/BannerModal'

const API_URL = process.env.REACT_APP_API_URL

export const GET_BANNER = `${API_URL}/banner/v2`
export const GET_DETAIL_BANNER = `${API_URL}/banner/v2/detail-admin`
export const POST_BANNER = `${API_URL}/banner/v2`
export const PUT_BANNER = `${API_URL}/banner/v2/`
export const DELETE_BANNER = `${API_URL}/banner/v2/`
export const GET_ALL_HASHTAG = `${API_URL}/item/v2/showroom/list-hashtag`

export function fetchAllBanner() {
  return axios.get<IBanner[]>(GET_BANNER)
}

export function fetchAllHashtag() {
  return axios.post<IHashtag[]>(GET_ALL_HASHTAG, {
    hashtag: '-',
    limit_from: 0,
    limit_item: 100000,
  })
}

export function fetchAllDetailBanner(data: IRequestDetailBanner) {
  return axios.get<IDetailBanner[]>(GET_DETAIL_BANNER, {
    params: {
      kode_banner: data.kode_banner,
      limit_from: data.limit_from,
      limit_item: data.limit_item,
    },
  })
}

export function sendBanner(payload: IBanner) {
  return axios.post(POST_BANNER, {
    kode_banner: payload.kode_banner,
    deskripsi: payload.deskripsi,
    kode_gambar: payload.kode_gambar,
    lokasi_gambar: payload.lokasi_gambar,
    category: payload.category,
    detail_code: payload.detail_code,
    detail_hashtag: payload.detail_hashtag,
  })
}

export function putBanner(payload: IBanner) {
  return axios.put(PUT_BANNER + payload.kode_banner, {
    deskripsi: payload.deskripsi,
    kode_banner: payload.kode_banner,
    kode_gambar: payload.kode_gambar,
    lokasi_gambar: payload.lokasi_gambar,
    category: payload.category,
    detail_code: payload.detail_code,
    detail_hashtag: payload.detail_hashtag,
  })
}

export function deleteBanner(payload: IBanner) {
  return axios.delete(DELETE_BANNER + payload.kode_banner)
}
