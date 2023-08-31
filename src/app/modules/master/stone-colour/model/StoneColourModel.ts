export interface IStoneColour {
  stone_colour_code: string
  stone_colour_name: string
  stone_code?: string
}

export const SampleTypeInitValue: IStoneColour = {
  stone_code: '0',
  stone_colour_code: 'Stone Colour Code',
  stone_colour_name: 'Stone Colour Name',
}
