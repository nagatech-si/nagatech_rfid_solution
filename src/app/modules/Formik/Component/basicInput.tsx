import {ErrorMessage, Field} from 'formik'
import {FC} from 'react'
import FormikReactSelect, {MyOption} from '../../../../_metronic/helpers/FormikReactSelect'
import {FormikDatePicker} from '../../../../_metronic/helpers/FormikDatePicker'

interface Props {
  label: string
  name: string
  disabled?: boolean
  type?: string
}

interface PropsSelect {
  label: string
  name: string
  options: any[]
  defaultValue?: string
  disabled?: boolean
  showAllOption?: boolean
  allValue?: string
  allLabel?: string
  handleChange?: (value: MyOption | string[], isMultiple: boolean) => void
}

export const BasicInputFormik: FC<Props> = ({label, name, disabled, type}) => {
  return (
    <div className='row mb-6'>
      <label className='col-lg-5 col-form-label required fw-bold fs-6'>{label}</label>
      <div className='col-lg-7 fv-row'>
        <Field
          type={type ?? 'text'}
          className='form-control form-control-lg form-control-solid'
          name={name}
          placeholder={label}
          disabled={disabled}
        />
        <ErrorMessage
          name={name}
          render={(msg) => {
            console.log(msg)
            return <div className='text-danger'>{msg}</div>
          }}
        />
      </div>
    </div>
  )
}
export const BasicInputVerticalFormik: FC<Props> = ({label, name, disabled, type}) => {
  return (
    <div className='mb-3'>
      <label className='col-lg-5 col-form-label required fw-bold fs-6 w-100'>{label}</label>
      <Field
        type={type ?? 'text'}
        className='form-control form-control-lg form-control-solid'
        name={name}
        placeholder={label}
        disabled={disabled}
      />
      <ErrorMessage
        name={name}
        render={(msg) => {
          console.log(msg)
          return <div className='text-danger'>{msg}</div>
        }}
      />
    </div>
  )
}

export const BasicSelectFormik: FC<PropsSelect> = ({
  label,
  name,
  options,
  defaultValue,
  disabled,
  handleChange,
  showAllOption,
  allLabel,
  allValue,
}) => {
  if (showAllOption !== null && showAllOption === true) {
    options = [
      {
        value: allValue,
        label: allLabel,
      },
      ...options,
    ]
  }
  return (
    <div className='row mb-6'>
      <label className='col-lg-5 col-form-label required fw-bold fs-6'>{label}</label>

      <div className='col-lg-7 fv-row'>
        <FormikReactSelect
          className='form-control form-control-lg form-control-solid'
          name={name}
          placeholder={label}
          options={options}
          defaultInputValue={defaultValue}
          isDisabled={disabled}
          handleChange={handleChange}
        />
        <ErrorMessage
          name={name}
          render={(msg) => {
            console.log(msg)
            return <div className='text-danger'>{msg}</div>
          }}
        />
      </div>
    </div>
  )
}

export const BasicSelectVerticalFormik: FC<PropsSelect> = ({
  label,
  name,
  options,
  defaultValue,
  disabled,
  handleChange,
  allLabel,
  allValue,
  showAllOption,
}) => {
  if (showAllOption !== null && showAllOption === true) {
    options = [
      {
        value: allValue,
        label: allLabel,
      },
      ...options,
    ]
  }
  return (
    <div className='mb-3'>
      <label className='col-lg-5 col-form-label required fw-bold fs-6 w-100'>{label}</label>
      <FormikReactSelect
        className='form-control form-control-lg form-control-solid'
        name={name}
        placeholder={label}
        options={options}
        defaultInputValue={defaultValue}
        isDisabled={disabled}
        handleChange={handleChange}
        isClearable
      />
      <ErrorMessage
        name={name}
        render={(msg) => {
          console.log(msg)
          return <div className='text-danger'>{msg}</div>
        }}
      />
    </div>
  )
}

export const BasicDateVerticalFormik: FC<Props> = ({label, name, disabled}) => {
  return (
    <div className='mb-3'>
      <label className='col-lg-5 col-form-label required fw-bold fs-6 w-100'>{label}</label>
      <div className='w-100'>
        <FormikDatePicker name={name} />
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => {
          console.log(msg)
          return <div className='text-danger'>{msg}</div>
        }}
      />
    </div>
  )
}
