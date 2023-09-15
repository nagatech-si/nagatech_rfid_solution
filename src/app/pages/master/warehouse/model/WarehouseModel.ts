export interface IWarehouse {
  _id: string
  kode_gudang: string
  nama_gudang: string
}

export const WarehouseInitValue: IWarehouse = {
  _id: '123',
  nama_gudang: 'KDGRP',
  kode_gudang: 'NMJNS',
}
