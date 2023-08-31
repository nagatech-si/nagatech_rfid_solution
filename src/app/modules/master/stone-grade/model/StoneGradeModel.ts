export interface IStoneGrade {
  stone_grade_code: string
  stone_grade_name: string
  stone_code?: string
}

export const SampleGradeInitValue: IStoneGrade = {
  stone_code: '0',
  stone_grade_code: 'Stone Grade Code',
  stone_grade_name: 'Stone Grade Name',
}
