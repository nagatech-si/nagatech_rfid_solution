import {useField, useFormikContext} from 'formik'
import {FC} from 'react'
import ReactDatePicker from 'react-datepicker'

type Props = {
  name: string
}

export const FormikDatePicker: FC<Props> = (props) => {
  const {name, ...restProps} = props
  const [field] = useField(name)
  const {setFieldValue} = useFormikContext()
  return (
    <ReactDatePicker
      {...restProps}
      isClearable
      wrapperClassName='w-100'
      className='form-control form-control-lg form-control-solid'
      selected={field.value}
      onChange={(date) => {
        setFieldValue(name, date)
      }}
    />
  )
}
