import {DateIgnore} from './ignore-encryptor'

export const sampleTypeIgnore = [
  '_id',
  'sample_type_code',
  'item_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
