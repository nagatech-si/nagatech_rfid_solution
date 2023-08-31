/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useRef, useState} from 'react'

import {ErrorMessage, Field, FieldArray, FormikProps} from 'formik'
import {IRequestUploadItem, Size} from '../model/UploadNewHelper'
import FormikReactSelect, {MyOption} from '../../../../../_metronic/helpers/FormikReactSelect'

import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'

import {IMaterialMetalTitle} from '../../../master/material-meta-title/model/MaterialMetalTitleModel'
import {getNumberFromString} from '../../../../../_metronic/helpers/InterfaceChecker'
import scrollToElement from '../../../../../_metronic/helpers/ElementHelper'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const MaterialAndSizeWidget: FC<Props> = ({formik}) => {
  const metalTitleDatas: IMaterialMetalTitle[] = useSelector<RootState>(
    ({materialMetalTitle}) => materialMetalTitle.data
  ) as IMaterialMetalTitle[]
  const [metalTitleNumber, setMetalTitleNumber] = useState<string>('0')
  const bottomRef = useRef<null | HTMLDivElement>(null)
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.14'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.14-1'})}</div>
      </div>

      <FieldArray
        name='material'
        render={(arrayHelper) => {
          return (
            <div>
              {formik.values.material.length > 0 &&
                formik.values.material.map((finishType: any, i: number) => {
                  return (
                    <div
                      key={i}
                      id={`material-element-${i}`}
                      className='rounded border px-5 py-5 mb-5'
                    >
                      <div className='list-group-item'>
                        <h2 className='fw-bolder text-dark'>Material {i + 1}</h2>

                        <div className='col-lg-12 row'>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'METAL.TITLE'})}
                              </label>
                              <FormikReactSelect
                                name={`material.${i}.metal_title_code`}
                                options={metalTitleDatas.map((value: IMaterialMetalTitle) => {
                                  return {
                                    value: value.metal_title_name,
                                    label: value.metal_title_name,
                                  }
                                })}
                                handleChange={(value: MyOption | string[], isMultiple) => {
                                  if (!isMultiple) {
                                    let result = value as MyOption
                                    setMetalTitleNumber(getNumberFromString(result.value) ?? '0')
                                    formik.setFieldValue(
                                      `material.${i}.metal_loss`,
                                      getNumberFromString(result.value)
                                    )
                                  } else {
                                  }
                                }}
                              />

                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`material.${i}.metal_title_code`} />
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <label className='form-label '>
                                {' '}
                                {intl.formatMessage({id: 'LOSS'})} ( % to 2 decimal )
                              </label>
                              <input
                                type='number'
                                onChange={(e) => {
                                  if (e.target.value !== '') {
                                    var percentage = Number(e.target.value) / 100
                                    var totalInvoice =
                                      Number(metalTitleNumber) +
                                      Number(percentage * Number(metalTitleNumber))
                                    formik.setFieldValue(
                                      `material.${i}.metal_loss`,
                                      totalInvoice.toFixed(3)
                                    )
                                  }
                                  formik.handleChange(e)
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.material[i].loss}
                                name={`material.${i}.loss`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`material.${i}.loss`} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5'>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'INVOICED.METAL.TITLE'})}
                              </label>
                              <Field
                                name={`material.${i}.metal_loss`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`material.${i}.metal_loss`} />
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <div className='fv-row'>
                                <label className='form-label '>
                                  {intl.formatMessage({id: 'UNIT.OF.MEASURE'})}
                                </label>
                                <FormikReactSelect
                                  name={`material.${i}.measure_name`}
                                  options={[
                                    {
                                      value: 'Internal Diameter',
                                      label: 'Internal Diameter',
                                    },
                                    {
                                      value: 'External Diameter',
                                      label: 'External Diameter',
                                    },
                                  ]}
                                />
                                <ErrorMessage
                                  name={`material.${i}.measure_name`}
                                  component='div'
                                  className='invalid-feedback'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12'>
                          <div className='separator me-5 my-5'></div>
                        </div>
                        <FieldArray
                          name={`material.${i}.size`}
                          render={(arrayHelperSize) => {
                            return (
                              <div>
                                {formik.values.material[i].size.length > 0 &&
                                  formik.values.material[i].size.map(
                                    (size: Size, sizeIndex: number) => {
                                      return (
                                        <div
                                          key={`Size${sizeIndex}`}
                                          id={`size-element-${sizeIndex}`}
                                          className='mt-5'
                                        >
                                          <h3 ref={bottomRef} className='fw-bolder text-dark'>
                                            {intl.formatMessage({id: 'SIZE'})} {sizeIndex + 1}
                                          </h3>
                                          <div className='list-group-item'>
                                            <div className='col-lg-12 row'>
                                              <div className='col-lg-6'>
                                                <div className='fv-row'>
                                                  <label className='form-label '>
                                                    {intl.formatMessage({id: 'SIZE'})} ( mm to 2
                                                    decimal)
                                                  </label>
                                                  <Field
                                                    type='number'
                                                    name={`material.${i}.size.${sizeIndex}.size`}
                                                    className='form-control form-control-lg form-control-solid'
                                                  />
                                                  <div className='text-danger mt-2'>
                                                    <ErrorMessage
                                                      name={`material.${i}.size.${sizeIndex}.size`}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className='col-lg-6'>
                                                <div className='fv-row'>
                                                  <label className='form-label '>
                                                    {intl.formatMessage({id: 'NET.WEIGHT'})} ( mm to
                                                    2 decimal)
                                                  </label>
                                                  <Field
                                                    type='number'
                                                    name={`material.${i}.size.${sizeIndex}.nett_weight`}
                                                    className='form-control form-control-lg form-control-solid'
                                                  />
                                                  <div className='text-danger mt-2'>
                                                    <ErrorMessage
                                                      name={`material.${i}.size.${sizeIndex}.nett_weight`}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className='col-lg-12 row'>
                                              <div className='col-lg-6'>
                                                <div className='fv-row'>
                                                  <label className='form-label '>
                                                    {intl.formatMessage({id: 'GROSS.WEIGHT'})} ( mm
                                                    to 2 decimal)
                                                  </label>
                                                  <Field
                                                    type='number'
                                                    name={`material.${i}.size.${sizeIndex}.gross_weight`}
                                                    className='form-control form-control-lg form-control-solid'
                                                  />
                                                  <div className='text-danger mt-2'>
                                                    <ErrorMessage
                                                      name={`material.${i}.size.${sizeIndex}.gross_weight`}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className='col-lg-6'></div>
                                            </div>

                                            <div className='col-lg-12 mb-6 mt-6'>
                                              <div className='d-flex flex-row flex-column-fluid'>
                                                <div className='d-flex flex-row-fluid flex-start'>
                                                  <button
                                                    type='button'
                                                    className='btn btn-light-facebook me-5 '
                                                    onClick={() => {
                                                      arrayHelperSize.push({
                                                        size_id: generateAlphanumeric(5),
                                                        size: 0,
                                                        nett_weight: 0,
                                                        gross_weight: 0,
                                                      })
                                                      scrollToElement(
                                                        `size-element-${sizeIndex + 1}`,
                                                        'smooth'
                                                      )
                                                    }}
                                                  >
                                                    <i className='bi bi-plus-square-fill me-3'></i>
                                                    {intl.formatMessage(
                                                      {id: 'MORE'},
                                                      {name: intl.formatMessage({id: 'SIZE'})}
                                                    )}
                                                  </button>
                                                  <button
                                                    type='button'
                                                    className='btn btn-light-linkedin me-5'
                                                    onClick={() => {
                                                      arrayHelperSize.push({
                                                        size_id: generateAlphanumeric(5),
                                                        size: formik.values.material[i].size[
                                                          sizeIndex
                                                        ].size,
                                                        nett_weight:
                                                          formik.values.material[i].size[sizeIndex]
                                                            .nett_weight,
                                                        gross_weight:
                                                          formik.values.material[i].size[sizeIndex]
                                                            .gross_weight,
                                                      })
                                                      scrollToElement(
                                                        `size-element-${sizeIndex + 1}`,
                                                        'smooth'
                                                      )
                                                    }}
                                                  >
                                                    <i className='bi bi-clipboard2-check-fill me-3'></i>
                                                    {intl.formatMessage(
                                                      {id: 'DUPLICATE'},
                                                      {name: intl.formatMessage({id: 'SIZE'})}
                                                    )}{' '}
                                                    {sizeIndex + 1}
                                                  </button>
                                                </div>

                                                <div
                                                  className={
                                                    sizeIndex !== 0
                                                      ? 'd-flex flex-row-fluid justify-content-end'
                                                      : 'd-flex flex-row-fluid justify-content-end d-none'
                                                  }
                                                >
                                                  <button
                                                    type='button'
                                                    className='btn btn-light-google me-5 '
                                                    onClick={() => {
                                                      arrayHelperSize.remove(sizeIndex)
                                                      scrollToElement(
                                                        `size-element-${sizeIndex - 1}`,
                                                        'auto'
                                                      )
                                                    }}
                                                  >
                                                    <i className='bi bi-dash-square-fill me-3'></i>
                                                    Remove Size {sizeIndex + 1}
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    }
                                  )}
                              </div>
                            )
                          }}
                        />
                        <div className='col-lg-12 mb-6 mt-6'>
                          <div className='d-flex flex-row flex-column-fluid'>
                            <div className='d-flex flex-row-fluid flex-start'>
                              <button
                                type='button'
                                className='btn btn-light-facebook me-5 '
                                onClick={() => {
                                  arrayHelper.push({
                                    material_id: generateAlphanumeric(5),
                                    metal_title_code: '',
                                    loss: 0,
                                    metal_loss: 0,
                                    measure_name: '',
                                    type_kadar: '-',
                                    kadar: 0,
                                    price: 0,
                                    size: [
                                      {
                                        size_id: generateAlphanumeric(5),
                                        size: 0,
                                        nett_weight: 0,
                                        gross_weight: 0,
                                      },
                                    ],
                                    total_nett_weight: 0,
                                    total_gross_weight: 0,
                                  })
                                  scrollToElement(`material-element-${i + 1}`, 'auto')
                                }}
                              >
                                <i className='bi bi-plus-square-fill'></i>
                                {intl.formatMessage(
                                  {id: 'MORE'},
                                  {name: intl.formatMessage({id: 'MATERIAL'})}
                                )}
                              </button>
                              <button
                                type='button'
                                className='btn btn-light-linkedin me-5 '
                                onClick={() => {
                                  arrayHelper.push({
                                    material_id: generateAlphanumeric(5),
                                    metal_title_code: formik.values.material[i].metal_title_code,
                                    loss: formik.values.material[i].loss,
                                    metal_loss: formik.values.material[i].metal_loss,
                                    measure_name: formik.values.material[i].measure_name,
                                    type_kadar: '-',
                                    kadar: formik.values.material[i].kadar,
                                    price: formik.values.material[i].price,
                                    size: formik.values.material[i].size,
                                    total_nett_weight: formik.values.material[i].total_nett_weight,
                                    total_gross_weight:
                                      formik.values.material[i].total_gross_weight,
                                  })
                                  scrollToElement(`material-element-${i + 1}`, 'smooth')
                                }}
                              >
                                <i className='bi bi-plus-square-fill'></i>
                                {intl.formatMessage(
                                  {id: 'DUPLICATE'},
                                  {name: intl.formatMessage({id: 'MATERIAL'})}
                                )}
                                {i + 1}
                              </button>
                            </div>
                            <div
                              className={
                                i !== 0
                                  ? 'd-flex flex-row-fluid justify-content-end'
                                  : 'd-flex flex-row-fluid justify-content-end d-none'
                              }
                            >
                              <button
                                type='button'
                                className='btn btn-light-google me-5 '
                                onClick={() => {
                                  arrayHelper.remove(i)
                                  setTimeout(() => {
                                    scrollToElement(`material-element-${i + 1}`, 'smooth')
                                  }, 1)
                                }}
                              >
                                <i className='bi bi-dash-square-fill'></i>
                                Remove Material
                              </button>
                            </div>
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
  )
}

export {MaterialAndSizeWidget}
