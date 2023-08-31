import {DateIgnore} from './ignore-encryptor'

export const stoneGradeIgnore = [
  '_id',
  'stone_grade_code',
  'stone_code',
  'input_by',
  'edit_by',
  ...DateIgnore,
]
