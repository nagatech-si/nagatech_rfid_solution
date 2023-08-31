/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {ErrorMessage, Field, FieldArray, FormikProps} from 'formik'
import {Chaintype, IRequestUploadItem} from '../model/UploadNewHelper'
import FormikReactSelect from '../../../../../_metronic/helpers/FormikReactSelect'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'
import {IChainType} from '../../../master/chain-type/model/ChainTypeModel'
import scrollToElement from '../../../../../_metronic/helpers/ElementHelper'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const ChainWidget: FC<Props> = ({formik}) => {
  const chainTypeData: IChainType[] = useSelector<RootState>(
    ({chainType}) => chainType.data
  ) as IChainType[]
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.10'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.10-1'})}</div>
      </div>
      <FieldArray
        name='chaintype'
        render={(arrayHelper) => {
          return (
            <div>
              {formik.values.chaintype.length > 0 &&
                formik.values.chaintype.map((chainType: Chaintype, i: number) => {
                  return (
                    <div key={i} className='' id={`chain-element-${i}`}>
                      <div className='list-group-item'>
                        <h5 className='card-title mb-6'>
                          {intl.formatMessage({id: 'CHAIN'})} {i + 1}
                        </h5>
                        <div className='form-group col-lg-12'>
                          <label className='form-label '>
                            {intl.formatMessage({id: 'CHAIN.TYPE'})}
                          </label>
                          <FormikReactSelect
                            name={`chaintype.${i}.chain_type_code`}
                            options={chainTypeData.map((value: IChainType) => {
                              return {
                                value: value.chain_type_name,
                                label: value.chain_type_name,
                              }
                            })}
                          />
                          <div className='text-danger mt-2'>
                            <ErrorMessage name={`chaintype.${i}.chain_type_code`} />
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5'>
                          <div className='col-lg-6'>
                            <div className='fv-row '>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'CHAIN.LENGTH'})}
                              </label>

                              <Field
                                type='number'
                                name={`chaintype.${i}.chain_length`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`chaintype.${i}.chain_length`} />
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6 row'>
                            <div className='fv-row '>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'CHAIN.WEIGHT'})}
                              </label>

                              <Field
                                type='number'
                                name={`chaintype.${i}.chain_weight`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`chaintype.${i}.chain_weight`} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5'>
                          <div className='col-lg-6'>
                            <div className='fv-row '>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'CHAIN.EXTRA.DETAIL'})}
                              </label>

                              <Field
                                name={`chaintype.${i}.chain_extra_detail`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`chaintype.${i}.chain_extra_detail`} />
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='fv-row '>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'CHAIN.GAUGE'})}
                              </label>

                              <Field
                                type='number'
                                name={`chaintype.${i}.chain_gauge`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`chaintype.${i}.chain_gauge`} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5'>
                          <div className='col-lg-6'>
                            <div className='fv-row '>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'CHAIN.WIDTH'})}
                              </label>

                              <Field
                                type='number'
                                name={`chaintype.${i}.chain_width`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`chaintype.${i}.chain_width`} />
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
                                    chain_id: generateAlphanumeric(5),
                                    chain_type_code: '',
                                    chain_length: 0,
                                    chain_weight: 0,
                                    chain_extra_detail: 0,
                                    chain_gauge: 0,
                                    chain_width: 0,
                                  })
                                  scrollToElement(`chain-element-${i + 1}`, 'smooth')
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
                                  scrollToElement(`chain-element-${i - 1}`, 'smooth')
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
              <div className='fv-row mb-10'>{intl.formatMessage({id: 'SKIP.NOTES'})}</div>
            </div>
          )
        }}
      />
    </div>
  )
}

export {ChainWidget}
