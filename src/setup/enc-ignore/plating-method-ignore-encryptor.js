import {DateIgnore} from './ignore-encryptor'

export const platingMethodIgnore = [
  '_id',
  'plating_method_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
