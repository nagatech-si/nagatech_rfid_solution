import {DateIgnore} from './ignore-encryptor'

export const stoneTypeIgnore = [
  '_id',
  'stone_type_code',
  'stone_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
