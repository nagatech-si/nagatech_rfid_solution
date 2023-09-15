export interface ISearch {
  kode_barcode: string
  nama_barang: string
  kode_group: string
  kode_baki: string | Boolean
  kode_jenis: string
  tag_id: string
  berat_dari: number
  berat_sampai: number
}

export const initSearchValue: ISearch = {
  berat_dari: 0,
  berat_sampai: 0,
  kode_baki: '',
  kode_barcode: '',
  kode_group: '',
  kode_jenis: '',
  nama_barang: '',
  tag_id: '',
}
