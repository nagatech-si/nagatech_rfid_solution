export interface IFinishType {
  finish_type_code: string
  finish_type_name: string
  item_code?: string
}

export const SampleTypeInitValue: IFinishType = {
  item_code: '0',
  finish_type_code: 'Sample Type Code',
  finish_type_name: 'Sample Type Name',
}
