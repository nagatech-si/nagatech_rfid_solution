export interface ISampleType {
  sample_type_code: string
  sample_type_name: string
  item_code?: string
}

export const SampleTypeInitValue: ISampleType = {
  item_code: '0',
  sample_type_code: 'Sample Type Code',
  sample_type_name: 'Sample Type Name',
}
