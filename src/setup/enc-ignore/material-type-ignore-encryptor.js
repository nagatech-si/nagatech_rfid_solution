import {DateIgnore} from './ignore-encryptor'

export const materialTypeIgnore = [
  '_id',
  'material_type_code',
  'item_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
