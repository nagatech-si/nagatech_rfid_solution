export interface IProfile {
  kode_perusahaan: string
  nama_perusahaan: string
  email: string
  no_hp: string
  logo: string
  alamat: string
  lokasi: string
}

export interface IChangePassword {
  password: string
  new_password: string
  retype_password: string
}

export function profileJson(data: IProfile) {
  return {
    kode_perusahaan: data.kode_perusahaan,
    nama_perusahaan: data.nama_perusahaan,
    email: data.email,
    no_hp: data.no_hp,
    logo: data.logo,
    alamat: data.alamat,
    lokasi: data.lokasi,
  }
}

export function profileEditJson(data: IProfile) {
  return {
    kode_perusahaan: data.kode_perusahaan,
    nama_perusahaan: data.nama_perusahaan,
    email: data.email,
    no_hp: data.no_hp,
    logo: data.logo,
    alamat: data.alamat,
    lokasi: data.lokasi,
  }
}

export const SampleProfileDummy: IProfile = {
  email: 'email@gmail.com',
  kode_perusahaan: 'Kode Perusahaan',
  nama_perusahaan: 'Nama Perusahaan',
  alamat: 'Alamat',
  logo: 'logo',
  lokasi: 'Lokasi',
  no_hp: '123',
}
