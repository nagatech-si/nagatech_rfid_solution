const {DateIgnore} = require('./ignore-encryptor')

export const customerPoIgnore = [
  '_id',
  'tgl_po',
  'no_po',
  'kode_customer',
  'code_item',
  'item_name',
  'lokasi_gambar',
  'metal_title_code',
  'type_kadar',
  'status',
  'status_po',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
