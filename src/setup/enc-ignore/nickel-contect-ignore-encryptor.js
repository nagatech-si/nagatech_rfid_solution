import {DateIgnore} from './ignore-encryptor'

export const nickelContentIgnore = [
  '_id',
  'nickel_content_code',
  'colour_type_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
