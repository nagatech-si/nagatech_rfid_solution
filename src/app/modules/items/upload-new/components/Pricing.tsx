/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {ErrorMessage, FormikProps} from 'formik'
import {IRequestUploadItem} from '../model/UploadNewHelper'
import FormikReactSelect from '../../../../../_metronic/helpers/FormikReactSelect'
import {IMaterialType} from '../../../master/material-type/model/MaterialTypeModel'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const PricingWidget: FC<Props> = ({formik}) => {
  const materialTypeData: IMaterialType[] = useSelector<RootState>(
    ({materialType}) => materialType.data
  ) as IMaterialType[]
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'>{intl.formatMessage({id: 'UPLOAD.4'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.4-1'})}</div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>{intl.formatMessage({id: 'MATERIAL.TYPE'})}</label>

        <FormikReactSelect
          name={`material_type_code`}
          options={materialTypeData.map((value: IMaterialType) => {
            return {
              value: value.material_type_name,
              label: value.material_type_name,
            }
          })}
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='material_type_code' />
        </div>
      </div>
    </div>
  )
}

export {PricingWidget}
