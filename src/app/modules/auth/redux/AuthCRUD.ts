import axios from 'axios'
import {AuthModel} from '../models/AuthModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/user/login-user-v2`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(user_id: string, password: string) {
  return axios.post(LOGIN_URL, {
    user_id: user_id,
    password: password,
  })
}

// Server should return AuthModel
export function register(email: string, firstname: string, lastname: string, password: string) {
  return axios.post<AuthModel>(REGISTER_URL, {
    email,
    firstname,
    lastname,
    password,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.get<{result: boolean}>(REQUEST_PASSWORD_URL, {
    params: {
      email: email,
    },
  })
}

export function getUserLoginStatus() {
  var isLogin = localStorage.getItem('isLogin')
  var token = localStorage.getItem('token')
  if (isLogin) {
    return {isLogin, token}
  } else {
    return {isLogin, token}
  }
}
