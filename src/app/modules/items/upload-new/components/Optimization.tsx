/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'

import {Field, ErrorMessage, FormikProps} from 'formik'
import {IRequestUploadItem} from '../model/UploadNewHelper'
import {Toast} from '../../../../../_metronic/helpers/Sweetalert'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const OptimizationWidget: FC<Props> = ({formik}) => {
  const [message, setMessage] = useState('')
  const [hashtag, setHashtag] = useState<string[]>(formik.values.hashtag)
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.7'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.7-1'})}</div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Name / Keyword</label>

        <Field name='item_name' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='item_name' />
        </div>
      </div>
      <div className='fv-row mb-10 d-none'>
        <label className='form-label required'>Name / Keyword</label>

        <Field name='hashtag' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='hashtag' />
        </div>
      </div>
      <div className='fv-row mb-10'>
        <label className='form-label required'>Hashtag</label>

        <input
          type='text'
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          value={message}
          className='form-control form-control-lg form-control-solid'
          name='hashtag'
          onKeyPress={(e) => {
            if (e.which === 13) {
              console.log(message)

              if (message !== '') {
                let prevIndex = hashtag.indexOf(message)
                if (prevIndex !== -1) {
                  Toast.fire({
                    icon: 'warning',
                    title: 'Hashtag Already Added',
                  })
                }
                let data = new Set([...hashtag, message])
                setHashtag(Array.from(data))
                formik.setFieldValue('hashtag', Array.from(data))
                setMessage('')
              }
              e.preventDefault()
            }
          }}
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='hashtag' />
        </div>
        <p className='mt-5 fw-bolder'>Stored Hashtag:</p>
        <div className='d-flex flex-wrap mt-2'>
          {hashtag.map((value: string, index) => {
            return (
              <span key={value} className='badge badge-light-primary me-5 fs-6'>
                #{value}
                <i
                  className='bi bi-x-lg text-primary ms-3'
                  onClick={() => {
                    formik.setFieldValue(
                      'hashtag',
                      hashtag.filter((value, i) => i !== index)
                    )
                    setHashtag(hashtag.filter((value, i) => i !== index))
                  }}
                ></i>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export {OptimizationWidget}
