export interface IStoneOrigin {
  stone_origin_code: string
  stone_origin_name: string
  stone_code?: string
}

export const SampleOriginInitValue: IStoneOrigin = {
  stone_code: '0',
  stone_origin_code: 'Stone Origin Code',
  stone_origin_name: 'Stone Origin Name',
}
