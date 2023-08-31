export interface ICustomer {
  _id: string
  nama_customer: string
  kode_customer: string
  nama_owner: string
  negara: string
  provinsi: string
  kota: string
  area: string
  alamat: string
  kontak: string
  email?: string
  isactive: boolean
  user: IUser[]
  total?: number
}

interface IUser {
  user_id: string
  nama_user: string
  email?: string
  password?: string
  level?: string
}

export function CustomerToJson(data: ICustomer) {
  return {
    nama_customer: data.nama_customer,
    kode_customer: data.kode_customer,
    nama_owner: data.nama_owner,
    negara: data.negara,
    provinsi: data.provinsi,
    kota: data.kota,
    area: data.area,
    alamat: data.alamat,
  }
}

export function CustomerSuspendToJson(data: ICustomer) {
  return {
    nama_user: data.user[0].nama_user,
    alamat: data.alamat,
    kontak: data.kontak,
    email: data.user[0].email,
  }
}

export const SampleUser: ICustomer = {
  _id: '91234',
  alamat: 'alamat',
  area: 'area',
  kode_customer: 'kode_customer',
  kota: 'kota',
  nama_customer: 'nama_customer',
  nama_owner: 'nama_owner',
  negara: 'negara',
  provinsi: 'provinsi',
  kontak: '0298442354',
  email: 'nama@gmail.com',
  user: [
    {
      nama_user: 'nama_user',
      user_id: 'user_id',
      email: 'nama@gmail.com',
      level: 'level',
      password: 'password',
    },
  ],
  isactive: false,
}
