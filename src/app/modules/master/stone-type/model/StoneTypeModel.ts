export interface IStoneType {
  stone_type_code: string
  stone_type_name: string
  stone_code?: string
}

export const SampleTypeInitValue: IStoneType = {
  stone_code: '0',
  stone_type_code: 'Stone Type Code',
  stone_type_name: 'Stone Type Name',
}
