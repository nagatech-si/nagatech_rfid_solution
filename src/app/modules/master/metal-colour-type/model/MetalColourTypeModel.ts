export interface IMetalColourType {
  colour_type_code: string
  colour_type_name: string
  item_code?: string
}

export const SampleTypeInitValue: IMetalColourType = {
  item_code: '0',
  colour_type_code: 'Stone Type Code',
  colour_type_name: 'Stone Type Name',
}
