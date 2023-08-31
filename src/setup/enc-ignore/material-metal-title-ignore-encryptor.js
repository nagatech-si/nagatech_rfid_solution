import {DateIgnore} from './ignore-encryptor'

export const materialMetalTitleIgnore = [
  '_id',
  'metal_title_code',
  'quote_data_price_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
