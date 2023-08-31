export interface IBanner {
  _id: string
  kode_banner: string
  deskripsi: string
  kode_gambar: string
  lokasi_gambar: string
  category: string
  detail_code: IDetailCode[]
  detail_hashtag: IDetailHashtag[]
  code_item?: string[]
  hashtag?: string[]
}

export interface IHashtag {
  _id: string
  hashtag: string
}

export interface IRequestDetailBanner {
  kode_banner: string
  limit_from: number
  limit_item: number
}

export interface IDetailBanner {
  code_item: string
  item_name: string
  gambar: IGambar[]
  gambar360: IGambar[]
}

interface IGambar {
  lokasi_gambar: string
  kode_gambar: string
  gambar_id: string
}

export interface IDetailCode {
  code_item: string
}

export interface IDetailHashtag {
  hashtag: string
}

export const SampleTypeInitValue: IBanner = {
  _id: '1',
  kode_banner: '235524',
  deskripsi: '235524',
  kode_gambar: '235524',
  lokasi_gambar: '235524',
  category: '235524',
  detail_code: [],
  detail_hashtag: [],
  code_item: [],
  hashtag: [],
}
