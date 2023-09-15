export type IOpname = {
  kode_toko: string
}

export type IOpnameItem = {
  tag_id: string
  kode_intern: string
  nama_barang: string
  berat: number
  berat_asli: number
  kadar: number
  kode_barcode: string
  kode_dept: string
  kode_gudang: string
  kode_toko: string
}

export type IOpnameRequest = {
  prev_barang_ketemu: number
  prev_barang_miss: number
  prev_barang_salah_baki: number
}

export type IOpnameResponse = {
  itemMatch: IOpnameItem[]
  itemMiss: IOpnameItem[]
  itemWrongTray: IOpnameItem[]
  matchLength: number
  missLength: number
  wrongTrayLength: number
}

export type ISaveOpname = {
  kode_toko: string
  qty_system: number
  berat_system: number
  qty_fisik: number
  berat_fisik: number
  qty_selisih: number
  berat_selisih: number
}

export type IRequestOpnameBarang = {
  kode_toko: string
  prev_barang: number
}
