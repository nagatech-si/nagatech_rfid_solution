import {DateIgnore} from './ignore-encryptor'

export const chainTypeIgnore = [
  '_id',
  'chain_type_code',
  'item_chains_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
