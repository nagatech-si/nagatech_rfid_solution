import * as Yup from 'yup'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'

export interface IRequestUploadItem {
  code_item: string
  item_name: string
  gambar: Gambar[]
  gambar360: Gambar[]
  material_type_code: string
  sell_method_name: string
  sell_currency_name: string
  metalcolour: Metalcolour[]
  sample_type_code: string
  category_code: string
  qty_code: string
  keywords: string
  width_item: number
  height_item: number
  depth_item: number
  gauge_item: number
  material: Material[]
  finishtype: Finishtype[]
  stone: Stone[]
  plating_method_code: string
  guaranteed: string
  plating: Plating[]
  finding: Finding[]
  chaintype: Chaintype[]
  quote_price: number
  weight_tolerance: number
  sample_lead_time: number
  product_lead_time: number
  min_order_qty: MinOrderQty[]
  hashtag: string[]
  privacy: string
  jenis_privacy: string
  selected_customer: string
  selected_market: string[]
}

export interface Chaintype {
  chain_id: string
  chain_type_code: string
  chain_length: number
  chain_weight: number
  chain_extra_detail: number
  chain_gauge: number
  chain_width: number
}

export interface Finding {
  finding_id: string
  specify_finding_code: string
}

export interface Finishtype {
  finish_id: string
  finish_type_code: string
}

export interface Gambar {
  gambar_id: string
  kode_gambar: string
  lokasi_gambar: string
}

export interface Material {
  material_id: string
  metal_title_code: string
  loss: number
  metal_loss: string
  measure_name: string
  type_kadar: string
  kadar: number
  price: number
  size: Size[]
  total_nett_weight: number
  total_gross_weight: number
}

export interface Size {
  size_id: string
  size: number
  nett_weight: number
  gross_weight: number
}

export interface Metalcolour {
  metal_id: string
  colour_type_code: string
  nickel_content_code: string
}

export interface MinOrderQty {
  min_order_qty_id: string
  units_quote_data: number
  grams_quote_data: number
  total_po_value: number
}

export interface Plating {
  plating_id: string
  plating_metal_code: string
  plating_colour_code: string
  micron: number
}

export interface Stone {
  stone_id: string
  stone_category_code: string
  stone_type_code: string
  stone_colour_code: string
  stone_certificate: string
  cut_stone_code: string
  stone_shape_code: string
  stone_size: string
  stone_grade_code: string
  stone_origin_code: string
  stone_calculation: string
  stone_carat_weight: number
  stone_price: number
  stone_qty: number
  treatment_stone: string
  stone_carat_subtotal: number
  stone_price_subtotal: number
}

const createUploadNew = [
  Yup.object({
    code_item: Yup.string().required().label('Sample Code'),
  }),
  Yup.object({
    gambar: Yup.array(
      Yup.object({
        gambar_id: Yup.string().required(),
        kode_gambar: Yup.string().required(),
        lokasi_gambar: Yup.string().required(),
      })
    )
      .min(4)
      .max(4),
  }),
  Yup.object({
    gambar360: Yup.array(
      Yup.object({
        gambar_id: Yup.string().required(),
        kode_gambar: Yup.string().required(),
        lokasi_gambar: Yup.string().required(),
      })
    ).max(36),
  }),
  Yup.object({
    material_type_code: Yup.string().required().label('Material Type'),
  }),
  Yup.object({
    metalcolour: Yup.array(
      Yup.object({
        metal_id: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        colour_type_code: Yup.string()
          .required()
          .nullable()
          .transform((_, value) => {
            return value === '-' ? null : value
          })
          .label('Metal Colour'),
        nickel_content_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
      })
    ).min(1),
  }),
  Yup.object({
    sample_type_code: Yup.string()
      .nullable()
      .transform(handleStrip)
      .required()
      .label('Sample Type Code'),
    category_code: Yup.string().nullable().transform(handleStrip).required().label('Category Code'),
    qty_code: Yup.string().nullable().transform(handleStrip).required().label('Quantity Code'),
  }),
  Yup.object({
    keywords: Yup.string().required().label('Item Name'),
    hashtag: Yup.array().min(1).max(5),
  }),
  Yup.object({
    width_item: Yup.number()
      .nullable(true)
      .transform((_, value) => {
        return value === '' ? '-' : value
      }),
    height_item: Yup.number()
      .nullable(true)
      .transform((_, value) => {
        return value === '' ? '-' : value
      }),
    depth_item: Yup.number()
      .nullable(true)
      .transform((_, value) => {
        return value === '' ? '-' : value
      }),
    gauge_item: Yup.number()
      .nullable(true)
      .transform((_, value) => {
        return value === '' ? '-' : value
      }),
  }).optional(),
  Yup.object({
    finishtype: Yup.array(
      Yup.object({
        finish_id: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? generateAlphanumeric(5) : value
          }),
        finish_type_code: Yup.string()
          .nullable(true)
          .required()
          .transform(handleStrip)
          .label('Finish Type'),
      })
    ).min(1),
  }),
  Yup.object({
    finishtype: Yup.array(
      Yup.object({
        chain_id: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? generateAlphanumeric(5) : value
          }),
        chain_type_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        chain_length: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
        chain_weight: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
        chain_extra_detail: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
        chain_gauge: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
        chain_width: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
      })
    ),
  }),
  Yup.object({
    finding: Yup.array(
      Yup.object({
        finding_id: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        specify_finding_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          })
          .label('Finding Type'),
      })
    ).min(1),
  }),
  Yup.object({
    stone: Yup.array(
      Yup.object({
        stone_id: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? generateAlphanumeric(5) : value
          }),
        stone_category_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        stone_type_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        stone_colour_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        stone_certificate: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        cut_stone_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        stone_shape_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        stone_size: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        stone_grade_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        stone_origin_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        stone_calculation: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        stone_carat_weight: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
        stone_price: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
        stone_qty: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
        treatment_stone: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        stone_carat_subtotal: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
        stone_price_subtotal: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
      })
    ),
  }),
  Yup.object({
    plating_method_code: Yup.string()
      .nullable(true)
      .transform((_, value) => {
        return value === '' ? '-' : value
      }),
    guaranteed: Yup.string()
      .nullable(true)
      .transform((_, value) => {
        return value === '' ? 'NO' : value
      }),
    plating: Yup.array(
      Yup.object({
        plating_id: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        plating_metal_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          })
          .label('Plating Metal'),
        plating_colour_code: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          })
          .label('Plating Colour'),
        micron: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          })
          .label('Micron'),
      })
    ).min(1),
  }),
  Yup.object({
    material: Yup.array(
      Yup.object({
        material_id: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? generateAlphanumeric(5) : value
          }),
        metal_title_code: Yup.string()
          .required()
          .nullable(true)
          .transform(handleStrip)
          .label('Plating Metal'),
        loss: Yup.number()
          .required()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          })
          .label('Loss'),
        metal_loss: Yup.string()
          .required()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : String(value)
          }),
        measure_name: Yup.string()
          .required()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          })
          .label('Unit Of Measure'),
        type_kadar: Yup.string()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? '-' : value
          }),
        kadar: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
        price: Yup.number()
          .nullable(true)
          .transform((_, value) => {
            return value === '' ? 0 : Number(value)
          }),
        size: Yup.array(
          Yup.object({
            size_id: Yup.string()
              .nullable(true)
              .transform((_, value) => {
                return value === '' ? generateAlphanumeric(5) : value
              }),
            size: Yup.number()
              .required()
              .nullable(true)
              .transform((_, value) => {
                return value === '' ? 0 : Number(value)
              })
              .label('Size'),
            nett_weight: Yup.number()
              .required()
              .nullable(true)
              .transform((_, value) => {
                return value === '' ? 0 : Number(value)
              })
              .label('Net Weight'),
            gross_weight: Yup.number()
              .required()
              .nullable(true)
              .transform((_, value) => {
                return value === '' ? 0 : Number(value)
              })
              .label('Gross Weight'),
          })
        )
          .required()
          .min(1),
      })
    )
      .required()
      .min(1),
  }),
]

const initUploadNew: IRequestUploadItem = {
  code_item: '',
  item_name: '',
  gambar: [],
  gambar360: [],
  material_type_code: '',
  sell_method_name: '-',
  sell_currency_name: '-',
  metalcolour: [
    {
      metal_id: generateAlphanumeric(5),
      colour_type_code: '-',
      nickel_content_code: '-',
    },
  ],
  sample_type_code: '',
  category_code: '',
  qty_code: '',
  keywords: '',
  width_item: 0,
  height_item: 0,
  depth_item: 0,
  gauge_item: 0,
  material: [
    {
      material_id: generateAlphanumeric(5),
      metal_title_code: '-',
      loss: 0,
      metal_loss: '0',
      measure_name: '-',
      type_kadar: '-',
      kadar: 0,
      price: 0,
      size: [
        {
          size_id: generateAlphanumeric(5),
          size: 0,
          nett_weight: 0,
          gross_weight: 0,
        },
      ],
      total_nett_weight: 0,
      total_gross_weight: 0,
    },
  ],
  finishtype: [
    {
      finish_id: generateAlphanumeric(5),
      finish_type_code: '-',
    },
  ],
  stone: [
    {
      stone_id: generateAlphanumeric(5),
      stone_category_code: '-',
      stone_type_code: '-',
      stone_colour_code: '-',
      stone_certificate: '-',
      cut_stone_code: '-',
      stone_shape_code: '-',
      stone_size: '-',
      stone_grade_code: '-',
      stone_origin_code: '-',
      stone_calculation: '-',
      stone_carat_weight: 0,
      stone_price: 0,
      stone_qty: 0,
      treatment_stone: '-',
      stone_carat_subtotal: 0,
      stone_price_subtotal: 0,
    },
  ],
  plating_method_code: '-',
  guaranteed: 'NO',
  plating: [
    {
      plating_id: generateAlphanumeric(5),
      plating_metal_code: '-',
      plating_colour_code: '-',
      micron: 2,
    },
  ],
  finding: [
    {
      finding_id: 'findingid1',
      specify_finding_code: '-',
    },
  ],
  chaintype: [
    {
      chain_id: generateAlphanumeric(5),
      chain_type_code: '-',
      chain_length: 0,
      chain_weight: 0,
      chain_extra_detail: 0,
      chain_gauge: 0,
      chain_width: 0,
    },
  ],
  quote_price: 1,
  weight_tolerance: 0,
  sample_lead_time: 0,
  product_lead_time: 0,
  min_order_qty: [
    {
      min_order_qty_id: 'minorderqtyid1',
      units_quote_data: 1,
      grams_quote_data: 0,
      total_po_value: 0,
    },
  ],
  hashtag: ['coba'],
  privacy: 'Exclusive',
  jenis_privacy: 'CUSTOMER',
  selected_customer: 'RONI',
  selected_market: ['-'],
}

export {createUploadNew, initUploadNew}

function handleStrip(_: any, value: any) {
  return value === '-' ? null : value
}
