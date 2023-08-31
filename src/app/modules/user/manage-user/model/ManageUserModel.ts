export interface IManageUser {
  user_id: string
  nama_lkp: string
  type?: typeUser
  password?: string
  input_by: string
  input_date: string
  retype_password?: string
}

export function ManageUserToJson(data: IManageUser) {
  return {
    user_id: data.user_id,
    nama_lkp: data.nama_lkp,
    type: data.type,
    password: data.password,
    retype_password: data.retype_password,
  }
}

export enum typeUser {
  admin = 'ADMIN',
  marketing = 'MARKETING',
  supervisor = 'SUPERVISOR',
  owner = 'OWNER',
  manager = 'MANAGER',
}

export const SampleUser: IManageUser = {
  type: typeUser.owner,
  password: '0',
  retype_password: '0',
  user_id: 'admin',
  nama_lkp: 'John Doe',
  input_by: 'john',
  input_date: '2023',
}
