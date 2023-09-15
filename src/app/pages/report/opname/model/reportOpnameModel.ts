export type IRequestReportOpname = {
  kode_baki: string
  startDate: Date
  endDate: Date
}

export type IResponseReportOpname = {
  kode_toko: string
  qty_system: number
  berat_system: number
  qty_fisik: number
  berat_fisik: number
  qty_selisih: number
  berat_selisih: number
  tgl_opname: string
}
