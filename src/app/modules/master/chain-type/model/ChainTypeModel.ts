export interface IChainType {
  chain_type_code: string
  chain_type_name: string
  item_code?: string
}

export const SampleTypeInitValue: IChainType = {
  item_code: '0',
  chain_type_code: 'Chain Type Code',
  chain_type_name: 'Chain Type Name',
}
