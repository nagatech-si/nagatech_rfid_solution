import {UserModel} from '../../app/modules/auth/models/UserModel'

export const getLocalUser = (): UserModel => {
  let rawUser = localStorage.getItem('USER')
  if (rawUser) {
    let userData: UserModel = JSON.parse(localStorage.getItem('USER') ?? '{}')
    return userData
  } else {
    return {
      level: 'DEFAULT',
      nama_user: 'DEFAULT',
      token: 'DEFAULT',
      user_id: 'DEFAULT',
    }
  }
}
