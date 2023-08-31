import {DateIgnore} from './ignore-encryptor'

export const metalColourIgnore = [
  '_id',
  'colour_type_code',
  'item_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
