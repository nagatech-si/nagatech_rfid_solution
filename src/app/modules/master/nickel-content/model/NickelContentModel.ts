export interface INickelContent {
  nickel_content_code: string
  nickel_content_name: string
  colour_type_code?: string
}

export const SampleTypeInitValue: INickelContent = {
  colour_type_code: '0',
  nickel_content_code: 'Stone Type Code',
  nickel_content_name: 'Stone Type Name',
}
