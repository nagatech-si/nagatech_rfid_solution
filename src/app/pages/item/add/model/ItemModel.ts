export interface IItem {
  _id: string
  kode_group?: string
  kode_jenis?: string
  kode_toko?: string
  kode_dept?: string
  kode_baki?: string
  tag_id: string
  nama_barang: string
  berat: number
  berat_asli: number
  kadar: number
  kadar_cetak: string
  harga_jual: number
  kode_gudang: string
  stock_on_hand?: number
  kode_intern: string
  gambar_barang: string
  input_date?: Date
}

export type IRequestReportItem = {
  startDate: Date
  endDate: Date
  kode_jenis: string
  kode_baki: string
  kode_gudang: string
}

export type IResponseReportItem = {
  berat: number
  berat_asli: number
  input_by: string
  kadar: number
  kadar_cetak: string
  kode_barcode: string
  kode_group: string
  kode_gudang: string
  kode_gudang_asal?: string
  kode_gudang_tujuan?: string
  kode_intern: string
  kode_toko: string
  kode_baki?: string
  kode_baki_asal?: string
  kode_baki_tujuan?: string
  kode_dept: string
  nama_barang: string
  kondisi_barang?: string
  tag_id: string
  input_date?: string
  tanggal?: string
}

export const ItemInitValue: IItem = {
  _id: '123',
  tag_id: '',
  kode_baki: '',
  kode_group: '',
  kode_jenis: '',
  nama_barang: '',
  berat: 0,
  berat_asli: 0,
  kadar: 0,
  kadar_cetak: '',
  harga_jual: 0,
  kode_gudang: '',
  stock_on_hand: 0,
  kode_intern: 'LG',
  gambar_barang: '',
}
