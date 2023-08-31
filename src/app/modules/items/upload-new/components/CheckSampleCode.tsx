/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {ErrorMessage, FormikProps} from 'formik'
import {IRequestUploadItem} from '../model/UploadNewHelper'
import * as uploadNewRedux from '../redux/UploadNewRedux'
import {useDispatch} from 'react-redux'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const CheckSampleCode: FC<Props> = ({formik}) => {
  const dispatch = useDispatch()
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'>{intl.formatMessage(
          {id: 'UPLOAD.1'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'>
          {intl.formatMessage(
            {id: 'UPLOAD.1-1'})}
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'> {intl.formatMessage(
          {id: 'SAMPLE.CODE'})}</label>

        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code_item}
          onKeyDown={(e) => {
            if (e.which === 13) {
              dispatch(
                uploadNewRedux.actions.fetchAllSampleCode({
                  code: formik.values.code_item,
                  limit_from: 0,
                  limit_item: 100,
                })
              )
              e.preventDefault()
            }
          }}
          name='code_item'
          className='form-control form-control-lg form-control-solid'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='code_item' />
        </div>
      </div>
    </div>
  )
}

export {CheckSampleCode}
