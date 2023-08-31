import {DateIgnore} from './ignore-encryptor'

export const sellMethodIgnore = [
  '_id',
  'sell_method_code',
  'item_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
