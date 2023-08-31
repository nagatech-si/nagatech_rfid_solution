export interface IStoneCategory {
  stone_category_code: string
  stone_category_name: string
  stone_code?: string
}

export const SampleTypeInitValue: IStoneCategory = {
  stone_code: '0',
  stone_category_code: 'Sample Type Code',
  stone_category_name: 'Sample Type Name',
}
