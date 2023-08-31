export interface IStoneCut {
  cut_stone_code: string
  cut_stone_name: string
  stone_code?: string
}

export const SampleTypeInitValue: IStoneCut = {
  stone_code: '0',
  cut_stone_code: 'Stone Type Code',
  cut_stone_name: 'Stone Type Name',
}
