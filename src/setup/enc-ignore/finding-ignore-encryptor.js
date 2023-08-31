import {DateIgnore} from './ignore-encryptor'

export const findingIgnore = [
  '_id',
  'specify_finding_code',
  'item_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
