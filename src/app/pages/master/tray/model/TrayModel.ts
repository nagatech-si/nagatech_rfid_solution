export interface ITray {
  _id: string
  kode_baki: string
  nama_baki: string
  kode_gudang: string
  berat_baki: number
  berat_bandrol: number
}

export const TrayInitValue: ITray = {
  _id: '123',
  kode_gudang: 'KDGRP',
  kode_baki: 'KDJNS',
  nama_baki: 'NMJNS',
  berat_baki: 0.05,
  berat_bandrol: 0.05,
}
