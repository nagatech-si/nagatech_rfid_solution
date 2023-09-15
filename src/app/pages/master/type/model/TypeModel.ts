export interface IType {
  _id: string
  kode_jenis: string
  nama_jenis: string
  kode_group: string
}

export const TypeInitValue: IType = {
  _id: '123',
  kode_group: 'KDGRP',
  kode_jenis: 'KDJNS',
  nama_jenis: 'NMJNS',
}
