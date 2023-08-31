/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {ErrorMessage, Field, FieldArray, FormikProps} from 'formik'
import {IRequestUploadItem} from '../model/UploadNewHelper'
import FormikReactSelect from '../../../../../_metronic/helpers/FormikReactSelect'

import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'

import {IPlatingMethod} from '../../../master/plating-method/model/PlatingMethodModel'
import {IPlatingMetal} from '../../../master/plating-metal/model/PlatingMetalModel'
import {IPlatingColour} from '../../../master/plating-colour/model/PlatingColourModel'
import scrollToElement from '../../../../../_metronic/helpers/ElementHelper'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const PlatingWidget: FC<Props> = ({formik}) => {
  const platingMethodData: IPlatingMethod[] = useSelector<RootState>(
    ({platingMethod}) => platingMethod.data
  ) as IPlatingMethod[]
  const platingMetalData: IPlatingMetal[] = useSelector<RootState>(
    ({platingMetal}) => platingMetal.data
  ) as IPlatingMetal[]
  const platingColourData: IPlatingColour[] = useSelector<RootState>(
    ({platingColour}) => platingColour.data
  ) as IPlatingColour[]
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.13'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.13-1'})}</div>
      </div>
      <div className='col-lg-12 row mb-5'>
        <div className='col-lg-6'>
          <div className='fv-row'>
            <div className='form-group col-lg-12'>
              <label className='form-label '>{intl.formatMessage({id: 'PLATING.METHOD'})}</label>
              <FormikReactSelect
                name={`plating_method_code`}
                options={platingMethodData.map((value: IPlatingMethod) => {
                  return {
                    value: value.plating_method_name,
                    label: value.plating_method_name,
                  }
                })}
              />
              <ErrorMessage
                name={`plating_method_code`}
                component='div'
                className='invalid-feedback'
              />
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='fv-row'>
            <div className='form-group col-lg-12'>
              <label className='form-label '>
                {intl.formatMessage({id: 'PLATING.GUARANTEED'})}
              </label>
              <FormikReactSelect
                name={`guaranteed`}
                options={[
                  {
                    value: 'YES',
                    label: 'YES`',
                  },
                  {
                    value: 'NO',
                    label: 'NO',
                  },
                ]}
              />
              <ErrorMessage name={`guaranteed`} component='div' className='invalid-feedback' />
            </div>
          </div>
        </div>
      </div>
      <FieldArray
        name='plating'
        render={(arrayHelper) => {
          return (
            <div>
              {formik.values.plating.length > 0 &&
                formik.values.plating.map((finishType: any, i: number) => {
                  return (
                    <div key={i} className='' id={`plating-element-${i}`}>
                      <div className='list-group-item'>
                        <div className='col-lg-12 row'>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'PLATING.METAL'})}
                              </label>
                              <FormikReactSelect
                                name={`plating.${i}.plating_metal_code`}
                                options={platingMetalData.map((value: IPlatingMetal) => {
                                  return {
                                    value: value.plating_metal_name,
                                    label: value.plating_metal_name,
                                  }
                                })}
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`plating.${i}.plating_metal_code`} />
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <div className='fv-row'>
                                <label className='form-label '>
                                  {intl.formatMessage({id: 'PLATING.COLOUR'})}
                                </label>
                                <FormikReactSelect
                                  name={`plating.${i}.plating_colour_code`}
                                  options={platingColourData.map((value: IPlatingColour) => {
                                    return {
                                      value: value.plating_colour_name,
                                      label: value.plating_colour_name,
                                    }
                                  })}
                                />
                                <div className='text-danger mt-2'>
                                  <ErrorMessage name={`plating.${i}.plating_colour_code`} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5'>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'MICRON'})}
                              </label>
                              <Field
                                type='number'
                                name={`plating.${i}.micron`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`plating.${i}.micron`} />
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
                                className='btn btn-icon btn-light-facebook me-5 '
                                onClick={() => {
                                  arrayHelper.push({
                                    plating_id: generateAlphanumeric(5),
                                    plating_metal_code: '',
                                    plating_colour_code: '-',
                                    micron: 0,
                                  })
                                  scrollToElement(`plating-element-${i + 1}`, 'smooth')
                                }}
                              >
                                <i className='bi bi-plus-square-fill'></i>
                              </button>
                            </div>
                            <div className='d-flex flex-row-fluid justify-content-end'>
                              <button
                                type='button'
                                className='btn btn-icon btn-light-google me-5 '
                                onClick={() => {
                                  arrayHelper.remove(i)
                                  scrollToElement(`plating-element-${i - 1}`, 'smooth')
                                }}
                              >
                                <i className='bi bi-dash-square-fill'></i>
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
      <div className='fv-row mb-10'> {intl.formatMessage({id: 'SKIP.NOTES'})}</div>
    </div>
  )
}

export {PlatingWidget}
