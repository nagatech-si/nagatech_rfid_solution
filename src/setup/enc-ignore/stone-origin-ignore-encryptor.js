import {DateIgnore} from './ignore-encryptor'

export const stoneOriginIgnore = [
  '_id',
  'stone_origin_code',
  'stone_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
