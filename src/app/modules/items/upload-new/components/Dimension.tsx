/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {Field, ErrorMessage, FormikProps} from 'formik'
import {IRequestUploadItem} from '../model/UploadNewHelper'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const DimensionWidget: FC<Props> = ({formik}) => {
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.8'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.8-1'})}</div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>
          {' '}
          {intl.formatMessage({id: 'SUFFIX.ITEM'}, {name: intl.formatMessage({id: 'WIDTH'})})} (mm)
        </label>

        <Field
          name='width_item'
          className='form-control form-control-lg form-control-solid'
          type='number'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='width_item' />
        </div>
      </div>
      <div className='fv-row mb-10'>
        <label className='form-label required'>
          {intl.formatMessage({id: 'SUFFIX.ITEM'}, {name: intl.formatMessage({id: 'HEIGHT'})})} (mm)
        </label>

        <Field
          name='height_item'
          className='form-control form-control-lg form-control-solid'
          type='number'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='height_item' />
        </div>
      </div>
      <div className='fv-row mb-10'>
        <label className='form-label required'>
          {' '}
          {intl.formatMessage({id: 'SUFFIX.ITEM'}, {name: intl.formatMessage({id: 'DEPTH'})})} (mm)
        </label>

        <Field
          name='depth_item'
          className='form-control form-control-lg form-control-solid'
          type='number'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='depth_item' />
        </div>
      </div>
      <div className='fv-row mb-10'>
        <label className='form-label required'> {intl.formatMessage({id: 'GAUGE'})}</label>

        <Field
          name='gauge_item'
          className='form-control form-control-lg form-control-solid'
          type='number'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='gauge_item' />
        </div>
      </div>
      <div className='fv-row mb-10'> {intl.formatMessage({id: 'SKIP.NOTES'})}</div>
    </div>
  )
}

export {DimensionWidget}
