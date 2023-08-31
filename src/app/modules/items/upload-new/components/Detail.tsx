/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {Field, ErrorMessage, FormikProps} from 'formik'
import {IRequestUploadItem} from '../model/UploadNewHelper'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const DetailWidget: FC<Props> = ({formik}) => {
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.16'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.16-1'})}</div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>
          {intl.formatMessage({id: 'WEIGHT.TOLERANCE'})} (%)
        </label>

        <Field
          type='number'
          name='weight_tolerance'
          className='form-control form-control-lg form-control-solid'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='weight_tolerance' />
        </div>
      </div>
      <div className='fv-row mb-10'>
        <label className='form-label required'>
          {intl.formatMessage({id: 'SAMPLE.LEAD.TIME'})} ({intl.formatMessage({id: 'DAYS'})})
        </label>

        <Field
          type='number'
          name='sample_lead_time'
          className='form-control form-control-lg form-control-solid'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='sample_lead_time' />
        </div>
      </div>
      <div className='fv-row mb-10'>
        <label className='form-label required'>
          {intl.formatMessage({id: 'PRODUCTION.LEAD.TIME'})} ({intl.formatMessage({id: 'DAYS'})})
        </label>

        <Field
          type='number'
          name='product_lead_time'
          className='form-control form-control-lg form-control-solid'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='product_lead_time' />
        </div>
      </div>
    </div>
  )
}

export {DetailWidget}
