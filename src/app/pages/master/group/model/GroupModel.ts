export interface IGroup {
  _id?: string
  kode_group: string
  nama_group: string
  harga: number
  harga_modal: number
}

export const GroupInitValue: IGroup = {
  kode_group: '',
  harga: 0,
  harga_modal: 0,
  nama_group: '',
}
