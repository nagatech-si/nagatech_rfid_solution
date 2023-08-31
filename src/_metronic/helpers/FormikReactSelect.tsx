import {useField, useFormikContext} from 'formik'
import React, {FC} from 'react'
import Select, {CSSObjectWithLabel} from 'react-select'
import {StateManagerProps} from 'react-select/dist/declarations/src/useStateManager'

export interface IMyOption {
  label: string
  value: string
}

export class MyOption implements IMyOption {
  constructor(public label: string, public value: string) {}
}

type GroupedOption = {
  label: string // group label
  options: MyOption[]
}

type Props = {
  name: string
  handleChange?: (value: MyOption | string[], isMultiple: boolean) => void
} & Omit<StateManagerProps<MyOption, false | true, GroupedOption>, 'value' | 'onChange'>

const FormikReactSelect: FC<Props> = (props) => {
  const {name, ...restProps} = props
  const [field] = useField(name)
  const {setFieldValue} = useFormikContext()

  //flatten the options so that it will be easier to find the value
  const flattenedOptions = props.options?.flatMap((o) => {
    const isNotGrouped = 'value' in o
    if (isNotGrouped) {
      return o
    } else {
      return o.options
    }
  })

  //get the value using flattenedOptions and field.value
  const value = flattenedOptions?.filter((o) => {
    const isArrayValue = Array.isArray(field.value)

    if (isArrayValue) {
      const values = field.value as Array<any>
      return values.includes(o.value)
    } else {
      return field.value === o.value
    }
  })

  return (
    <Select
      {...restProps}
      value={value}
      styles={{
        menu: (base: CSSObjectWithLabel) => ({...base, zIndex: 99999}),
        control: (base: CSSObjectWithLabel) => ({
          ...base,
          minHeight: '48px',
          backgroundColor: '#F5F8FA',
          border: '1px solid #F5F8FA',
          borderColor: '#F5F8FA',
          boxShadow: '1px solid #F5F8FA',
        }),
      }}
      defaultValue={props.defaultValue}
      className='basic-select fw-bold customeselect'
      classNamePrefix='form-select-solid'
      placeholder={`Please Select ...`}
      // onChange implementation
      onChange={(val) => {
        //here I used explicit typing but there maybe a better way to type the value.
        const _val = val as MyOption[] | MyOption
        const isArray = Array.isArray(_val)
        if (isArray) {
          const values = _val.map((o) => o.value)
          if (props.handleChange) {
            props.handleChange(values, true)
          }
          setFieldValue(name, values)
        } else {
          if (props.handleChange) {
            props.handleChange(_val, false)
          }
          setFieldValue(name, _val.value)
        }
      }}
    />
  )
}

export default FormikReactSelect
