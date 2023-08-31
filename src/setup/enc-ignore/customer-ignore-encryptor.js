import {DateIgnore} from './ignore-encryptor'

export const customerIgnore = [
  '_id',
  'kode_customer',
  'negara',
  'provinsi',
  'kota',
  'area',
  'negara',
  'user_id',
  'level',
  'password',
  'input_by',
  'edit_by',
  'code_item',
  ...DateIgnore,
]
