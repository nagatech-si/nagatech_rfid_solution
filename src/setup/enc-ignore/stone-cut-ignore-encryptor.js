import {DateIgnore} from './ignore-encryptor'

export const stoneCutIgnore = [
  '_id',
  'cut_stone_code',
  'stone_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
