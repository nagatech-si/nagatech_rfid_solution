/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {ErrorMessage, FormikProps} from 'formik'
import {IRequestUploadItem} from '../model/UploadNewHelper'
import FormikReactSelect from '../../../../../_metronic/helpers/FormikReactSelect'

import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import {ISampleType} from '../../../master/sample-type/model/SampleTypeModel'
import {ISampleCategory} from '../../../master/sample-category/model/SampleCategoryModel'
import {ISampleQuantityType} from '../../../master/sample-quantity-type/model/SampleQuantityTypeModel'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const SampleWidget: FC<Props> = ({formik}) => {
  const sampleTypeDatas: ISampleType[] = useSelector<RootState>(
    ({sampleType}) => sampleType.data
  ) as ISampleType[]
  const sampleCategoryData: ISampleCategory[] = useSelector<RootState>(
    ({sampleCategory}) => sampleCategory.data
  ) as ISampleCategory[]
  const sampleQuantityDatas: ISampleQuantityType[] = useSelector<RootState>(
    ({sampleQuantityType}) => sampleQuantityType.data
  ) as ISampleQuantityType[]
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.6'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.6-1'})}</div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'> {intl.formatMessage({id: 'SAMPLE.TYPE'})}</label>

        <FormikReactSelect
          name={`sample_type_code`}
          options={sampleTypeDatas.map((value: ISampleType) => {
            return {
              value: value.sample_type_code,
              label: value.sample_type_name,
            }
          })}
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='sample_type_code' />
        </div>
      </div>
      <div className='fv-row mb-10'>
        <label className='form-label required'>{intl.formatMessage({id: 'SAMPLE.CATEGORY'})}</label>

        <FormikReactSelect
          name={`category_code`}
          options={sampleCategoryData.map((value: ISampleCategory) => {
            return {
              value: value.category_name,
              label: value.category_name,
            }
          })}
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='category_code' />
        </div>
      </div>
      <div className='fv-row mb-10'>
        <label className='form-label required'>
          {intl.formatMessage({id: 'SAMPLE.QUANTITY_TYPE'})}
        </label>

        <FormikReactSelect
          name={`qty_code`}
          options={sampleQuantityDatas.map((value: ISampleQuantityType) => {
            return {
              value: value.qty_name,
              label: value.qty_name,
            }
          })}
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='qty_code' />
        </div>
      </div>
    </div>
  )
}

export {SampleWidget}
