import {DateIgnore} from './ignore-encryptor'

export const userIgnore = [
  '_id',
  'user_id',
  'type',
  'password',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
