export interface IFinding {
  specify_finding_code: string
  specify_finding_name: string
  item_code?: string
}

export const SampleTypeInitValue: IFinding = {
  item_code: '0',
  specify_finding_code: 'Sample Type Code',
  specify_finding_name: 'Sample Type Name',
}
