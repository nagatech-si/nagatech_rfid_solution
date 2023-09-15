export interface IPriceTag {
  _id: string
  berat_bandrol: number
  keterangan: string
}

export const TypeInitValue: IPriceTag = {
  _id: '123',
  berat_bandrol: 0.5,
  keterangan: 'Keterangan',
}
