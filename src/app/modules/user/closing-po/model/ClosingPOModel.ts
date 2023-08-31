export interface IClosingPO {
  tgl_po: string
  input_date: string
  _id: string
  kode_customer: string
  nama_customer: string
  itemdetail: Itemdetail[]
  total_kadar: number
  total_price: number
  status_po: string
  no_po: string
  input_by: string
  __v: number
}

export interface IReqeustConfirmPO {
  code_id: string
  code_item: string
  status: string
}

export interface Itemdetail {
  _id: string
  code_item: string
  item_name: string
  lokasi_gambar: string
  metal_title_code: string
  type_kadar: string
  kadar: number
  price: number
  total_nett_weight: number
  total_gross_weight: number
  qty_po: number
  sub_total_kadar: number
  sub_total_price: number
  notes: string
  status: string
}
