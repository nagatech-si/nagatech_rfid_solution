/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'

import {ErrorMessage, Field, FormikProps} from 'formik'
import {IRequestUploadItem} from '../model/UploadNewHelper'
import {ICustomer} from '../../../user/customer-active/model/CustomerActiveModel'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import FormikReactSelect from '../../../../../_metronic/helpers/FormikReactSelect'
import {ICountry} from '../../../region/country/model/CountryModel'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const PrivacyWidget: FC<Props> = ({formik}) => {
  const customerActive: ICustomer[] = useSelector<RootState>(
    ({customerActive}) => customerActive.data
  ) as ICustomer[]
  const countryData: ICountry[] = useSelector<RootState>(({country}) => country.data) as ICountry[]
  const [exclusive, setExclusive] = useState<boolean>(formik.values.privacy === 'Exclusive')
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.17'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.17-1'})}</div>
      </div>
      <div className='mb-10'>
        <div className='form-check form-check-custom form-check-solid mb-5'>
          <Field
            className='form-check-input'
            type='radio'
            name='privacy'
            value='PUBLIC'
            onChange={(e) => {
              formik.handleChange(e)
              formik.setFieldValue('selected_customer', '-')
              formik.setFieldValue('selected_market', [])
              setExclusive(false)
            }}
          />
          <label className='form-check-label'>Public</label>
        </div>
        <div className='form-check form-check-custom form-check-solid'>
          <Field
            className='form-check-input'
            type='radio'
            name='privacy'
            value='EXCLUSIVE'
            onChange={(e) => {
              formik.handleChange(e)
              setExclusive(true)
            }}
          />
          <label className='form-check-label'>Exclusive</label>
        </div>
      </div>
      <div className={exclusive ? '' : 'd-none'}>
        <div className='fv-row mb-10'>
          <label className='form-label required'>Exclusive To Customer</label>

          <FormikReactSelect
            options={customerActive.map((value: ICustomer) => {
              return {
                value: value.kode_customer,
                label: value.nama_customer,
              }
            })}
            name='selected_customer'
            className='form-control form-control-lg form-control-solid'
            handleChange={() => {
              formik.setFieldValue('jenis_privacy', 'CUSTOMER')
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='selected_customer' />
          </div>
        </div>
        <div className='fv-row mb-10'>
          <label className='form-label required'>Exclusive To Country</label>

          <FormikReactSelect
            options={countryData.map((value: ICountry) => {
              return {
                value: value.nama_negara,
                label: value.nama_negara,
              }
            })}
            isMulti
            name='selected_market'
            className='form-control form-control-lg form-control-solid'
            handleChange={() => {
              formik.setFieldValue('jenis_privacy', 'NEGARA')
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='sample_lead_time' />
          </div>
        </div>
      </div>
    </div>
  )
}

export {PrivacyWidget}
