export interface IItem {
  hashtag: string[]
  selected_market: string[]
  deskripsi_banner?: string[]
  input_date?: string
  edit_date?: string
  code_item: string
  item_name: string
  gambar: IGambar[]
  gambar360: IGambar360[]
  material_type_code: string
  sell_method_name: string
  sell_currency_name: string
  metalcolour: IMetalcolour[]
  sample_type_code: string
  category_code: string
  qty_code: string
  keywords: string
  width_item: number
  height_item: number
  depth_item: number
  gauge_item: number
  material: IMaterial[]
  finishtype: IFinishtype[]
  stone: Stone[]
  plating_method_code: string
  guaranteed: string
  plating: IPlating[]
  finding: IFinding[]
  chaintype: IChaintype[]
  quote_price: number
  weight_tolerance: number
  sample_lead_time: number
  product_lead_time: number
  min_order_qty: IMinOrderQty[]
  privacy: string
  jenis_privacy: string
  selected_customer: string
  status_active?: string
  status_show?: string
  input_by?: string
  edit_by?: string
  __v?: number
  tgl_show?: string
  active_date?: string
  sample_type_name?: string
  total_material_weight?: number
}

interface IGambar {
  gambar_id: string
  kode_gambar: string
  lokasi_gambar: string
}

interface IGambar360 {
  gambar_id: string
  kode_gambar: string
  lokasi_gambar: string
}

interface IMetalcolour {
  metal_id: string
  colour_type_code: string
  nickel_content_code: string
}

interface IMaterial {
  size: Size[]

  material_id: string
  metal_title_code: string
  loss: number
  metal_loss: string
  measure_name: string
  type_kadar: string
  kadar: number
  price: number
  total_nett_weight: number
  total_gross_weight: number
}

interface Size {
  size_id: string
  size: number
  nett_weight: number
  gross_weight: number
}

interface IFinishtype {
  finish_id: string
  finish_type_code: string
}

interface Stone {
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

interface IPlating {
  plating_id: string
  plating_metal_code: string
  plating_colour_code: string
  micron: number
}

interface IFinding {
  finding_id: string
  specify_finding_code: string
}

interface IChaintype {
  chain_id: string
  chain_type_code: string
  chain_length: number
  chain_weight: number
  chain_extra_detail: number
  chain_gauge: number
  chain_width: number
}

interface IMinOrderQty {
  min_order_qty_id: string
  units_quote_data: number
  grams_quote_data: number
  total_po_value: number
}

export interface IRequestItemLine {
  category: string
  item_name: string
  limit_start_weight: number
  limit_finish_weight: number
  limit_from: number
  limit_item: number
}
