import {DateIgnore} from './ignore-encryptor'

export const stoneCategoryIgnore = [
  '_id',
  'stone_category_code',
  'stone_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
