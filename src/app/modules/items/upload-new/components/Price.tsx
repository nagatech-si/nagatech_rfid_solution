/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'

import {ErrorMessage, FieldArray, FormikProps} from 'formik'
import {IRequestUploadItem, Material, Size} from '../model/UploadNewHelper'
import {GlobalTable} from '../../../../component/GlobalTable'
import {SizeModal} from './modal/SizeModal'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const PriceWidget: FC<Props> = ({formik}) => {
  const [allMaterial, setAllMaterial] = useState(false)
  const [price, setPrice] = useState('0')
  const [exchange, setExchange] = useState('0')
  const intl = useIntl()
  return (
    <>
      <div className='w-100'>
        <div className='pb-5 pb-lg-10'>
          <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.15'})}</h2>

          <div className='text-gray-400 fw-bold fs-6'>
            {' '}
            {intl.formatMessage({id: 'UPLOAD.15-1'})}
          </div>
        </div>
        <div className='flex d-flex'>
          <div className='form-check form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              checked={allMaterial}
              id='flexCheckDefault'
              onClick={(e: any) => {
                setAllMaterial(!allMaterial)
                if (e.target.checked) {
                  for (let index = 0; index < formik.values.material.length; index++) {
                    formik.setFieldValue(`material.${index}.price`, price)
                    formik.setFieldValue(`material.${index}.kadar`, exchange)
                  }
                }
              }}
            />
            <div>
              <label className='form-check-label'>
                {intl.formatMessage({id: 'DISPLAY.ALL.MATERIAL'})}
              </label>
            </div>
          </div>
        </div>
        <div className='text-gray-400 fw-bold fs-8 mb-5 mt-2'>
          {intl.formatMessage({id: 'UNCHECK'})}
        </div>
        <div className='flex d-flex justify-content-start mb-5'>
          <div className='col-lg-6 pe-5'>
            <div className='fv-row '>
              <label className='form-label '>{intl.formatMessage({id: 'QUOTE.PRICE'})} (USD)</label>
              <input
                type='number'
                disabled={!allMaterial}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e)
                  if (e.target.value !== '') {
                    setPrice(e.target.value)
                    for (let index = 0; index < formik.values.material.length; index++) {
                      formik.setFieldValue(`material.${index}.price`, Number(e.target.value))
                    }
                  }
                }}
                value={formik.values.quote_price}
                name={`quote_price`}
                className='form-control form-control-lg form-control-solid'
              />
            </div>
          </div>
          <div className='col-lg-6 ps-5'>
            <div className='fv-row '>
              <label className='form-label '>
                {intl.formatMessage({id: 'QUOTE.EXCHANGE'})} (%)
              </label>

              <input
                type='number'
                disabled={!allMaterial}
                onChange={(e) => {
                  if (e.target.value !== '') {
                    setExchange(e.target.value)
                    for (let index = 0; index < formik.values.material.length; index++) {
                      formik.setFieldValue(`material.${index}.kadar`, Number(e.target.value))
                    }
                  }
                }}
                name={`quote_kadar`}
                className='form-control form-control-lg form-control-solid'
              />
            </div>
          </div>
        </div>
        <FieldArray
          name='material'
          render={(arrayHelper) => {
            return (
              <div>
                {formik.values.material.length > 0 &&
                  formik.values.material.map((stone: Material, i: number) => {
                    return (
                      <div key={i} className='rounded border px-5 py-6 mb-5'>
                        <div className='list-group-item'>
                          <h5 className='card-title mb-6'>Material {i + 1}</h5>
                          <div className='col-lg-12 mb-10'>
                            <div className='flex d-flex justify-content-evenly'>
                              <p className='fs-6'>
                                {intl.formatMessage({id: 'UNIT.OF.MEASURE'})}:{' '}
                                <strong>{stone.measure_name}</strong>
                              </p>
                              <p className='fs-6'>
                                {intl.formatMessage({id: 'METAL.TITLE'})}:{' '}
                                <strong>{stone.metal_title_code}</strong>
                              </p>
                              <p className='fs-6'>
                                {intl.formatMessage({id: 'LOSS'})}: <strong>{stone.loss}</strong>
                              </p>
                            </div>
                            <div className='flex d-flex justify-content-start'>
                              <div className='col-lg-6 pe-5'>
                                <div className='fv-row '>
                                  <label className='form-label '>
                                    {intl.formatMessage({id: 'PRICE'})} (USD)
                                  </label>

                                  <input
                                    type='number'
                                    disabled={allMaterial}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.material[i].price}
                                    name={`material.${i}.price`}
                                    className='form-control form-control-lg form-control-solid'
                                  />
                                  <div className='text-danger mt-2'>
                                    <ErrorMessage name={`material.${i}.price`} />
                                  </div>
                                </div>
                              </div>
                              <div className='col-lg-6 ps-5'>
                                <div className='fv-row '>
                                  <label className='form-label '>
                                    {intl.formatMessage({id: 'EXCHANGE'})} (%)
                                  </label>

                                  <input
                                    type='number'
                                    disabled={allMaterial}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.material[i].kadar}
                                    name={`material.${i}.kadar`}
                                    className='form-control form-control-lg form-control-solid'
                                  />
                                  <div className='text-danger mt-2'>
                                    <ErrorMessage name={`material.${i}.kadar`} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-lg-12 my-5'></div>
                            <GlobalTable
                              columns={[
                                {
                                  dataField: 'size',
                                  text: intl.formatMessage({id: 'ITEM.SIZE'}),
                                },
                                {
                                  dataField: 'nett_weight',
                                  text: intl.formatMessage({id: 'NET.WEIGHT'}),
                                },
                                {
                                  dataField: 'gross_weight',
                                  text: intl.formatMessage({id: 'GROSS.WEIGHT'}),
                                },
                                {
                                  dataField: 'action',
                                  text: intl.formatMessage({id: 'ACTION'}),
                                  formatter: (_, value: Size, indexSize) => {
                                    return (
                                      <div className='me-0'>
                                        <a
                                          href='#'
                                          data-bs-toggle='modal'
                                          data-bs-target={`#kt_modal_edit_size_${indexSize}`}
                                          className='btn  btn-sm btn-icon btn-light-instagram me-5'
                                          onClick={() => {
                                            console.log(value)
                                            console.log(indexSize)
                                          }}
                                        >
                                          <i className='bi bi-pencil-fill fs-4'></i>
                                        </a>
                                        <a
                                          href='#'
                                          className='btn  btn-sm btn-icon btn-light-facebook me-5'
                                          onClick={() => {
                                            formik.values.material[i].size.push(value)
                                          }}
                                        >
                                          <i className='bi bi-clipboard2-plus-fill fs-4'></i>
                                        </a>
                                        <a
                                          href='#'
                                          data-bs-toggle='modal'
                                          data-bs-target={`#2344`}
                                          className='btn  btn-sm btn-icon btn-light-google me-5'
                                          onClick={() => {}}
                                        >
                                          <i className='bi bi-x-octagon-fill'></i>
                                        </a>

                                        <SizeModal
                                          formikMaterial={formik}
                                          indexMaterial={i}
                                          indexSize={indexSize}
                                          prevSize={value}
                                        />
                                      </div>
                                    )
                                  },
                                },
                              ]}
                              keyField='no'
                              data={stone.size}
                            />
                            <div className='col-lg-12'>
                              <div className='separator me-5 my-5'></div>
                            </div>
                            <div className='flex d-flex justify-content-between mt-3'>
                              <button
                                type='button'
                                className='btn btn-primary me-5'
                                onClick={() => {
                                  arrayHelper.push(stone)
                                }}
                              >
                                <i className='bi bi-clipboard2-check-fill fs-3 me-3'></i>
                                {intl.formatMessage({id: 'DUPLICATE'}, {name: ''})}
                              </button>
                              <button className='btn btn-danger' type='button'>
                                <i className='bi bi-trash3-fill fs-3 me-3'></i>
                                {intl.formatMessage({id: 'DELETE'})}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )
          }}
        />
      </div>
    </>
  )
}

export {PriceWidget}
