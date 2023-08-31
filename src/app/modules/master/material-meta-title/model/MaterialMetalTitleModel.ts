export interface IMaterialMetalTitle {
  metal_title_code: string
  metal_title_name: string
  quote_data_price_code?: string
}

export const MaterialTypeInitValue: IMaterialMetalTitle = {
  quote_data_price_code: '0',
  metal_title_code: 'Material Type Code',
  metal_title_name: 'Material Type Name',
}
