export interface IMaterialType {
  material_type_code: string
  material_type_name: string
  item_code?: string
}

export const MaterialTypeInitValue: IMaterialType = {
  item_code: '0',
  material_type_code: 'Material Type Code',
  material_type_name: 'Material Type Name',
}
