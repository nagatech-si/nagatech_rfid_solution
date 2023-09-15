export type IRequestSaveMoveItem = {
  kode_baki: string
}

export type IRequestReportMoveItem = {
  startDate: Date
  endDate: Date
  kode_group: string
  kode_baki_asal: string
  kode_baki_tujuan: string
}
