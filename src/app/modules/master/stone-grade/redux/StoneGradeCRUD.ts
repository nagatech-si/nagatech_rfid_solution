import axios from 'axios'
import {IStoneGrade} from '../model/StoneGradeModel'

const API_URL = process.env.REACT_APP_API_URL

export const GET_STONE_GRADE = `${API_URL}/stone-grade/v2`
export const POST_STONE_GRADE = `${API_URL}/stone-grade/v2`
export const PUT_STONE_GRADE = `${API_URL}/stone-grade/v2/`
export const DELETE_STONE_GRADE = `${API_URL}/stone-grade/v2/`

export function fetchAllStoneGrade() {
  return axios.get<IStoneGrade[]>(GET_STONE_GRADE)
}

export function sendStoneGrade(sampleType: IStoneGrade) {
  return axios.post(POST_STONE_GRADE, {
    stone_grade_code: sampleType.stone_grade_code,
    stone_grade_name: sampleType.stone_grade_name,
    stone_code: sampleType.stone_code === '' ? '-' : sampleType.stone_code,
  })
}

export function putStoneGrade(sampleType: IStoneGrade) {
  return axios.put(PUT_STONE_GRADE + sampleType.stone_grade_code, {
    stone_grade_name: sampleType.stone_grade_name,
    stone_code: sampleType.stone_code,
  })
}

export function deleteStoneGrade(sampleType: IStoneGrade) {
  return axios.delete(DELETE_STONE_GRADE + sampleType.stone_grade_code)
}
