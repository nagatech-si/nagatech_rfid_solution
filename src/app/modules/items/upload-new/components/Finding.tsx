/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {ErrorMessage, FieldArray, FormikProps} from 'formik'
import {IRequestUploadItem} from '../model/UploadNewHelper'
import FormikReactSelect from '../../../../../_metronic/helpers/FormikReactSelect'

import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'

import {IFinding} from '../../../master/finding/model/FindingModel'
import scrollToElement from '../../../../../_metronic/helpers/ElementHelper'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const FindingWidget: FC<Props> = ({formik}) => {
  const findingData: IFinding[] = useSelector<RootState>(({finding}) => finding.data) as IFinding[]
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.11'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.11-1'})}</div>
      </div>
      <FieldArray
        name='finding'
        render={(arrayHelper) => {
          return (
            <div>
              {formik.values.finding.length > 0 &&
                formik.values.finding.map((finishType: any, i: number) => {
                  return (
                    <div key={i} className='' id={`finding-element-${i}`}>
                      <div className='list-group-item'>
                        <h5 className='card-title mb-6'>{intl.formatMessage({id: 'FINDING'})}</h5>
                        <div className='form-group col-lg-12'>
                          <label className='form-label required'>
                            {' '}
                            {intl.formatMessage(
                              {id: 'BASE.NAME'},
                              {name: intl.formatMessage({id: 'FINDING'})}
                            )}
                          </label>
                          <FormikReactSelect
                            name={`finding.${i}.specify_finding_code`}
                            options={findingData.map((value: IFinding) => {
                              return {
                                value: value.specify_finding_name,
                                label: value.specify_finding_name,
                              }
                            })}
                          />
                          <div className='text-danger mt-2'>
                            <ErrorMessage name={`finding.${i}.specify_finding_code`} />
                          </div>
                        </div>

                        <div className='col-lg-12 mb-6 mt-6'>
                          <div className='d-flex flex-row flex-column-fluid'>
                            <div className='d-flex flex-row-fluid flex-start'>
                              <button
                                type='button'
                                className='btn btn-icon btn-light-facebook me-5 '
                                onClick={() => {
                                  arrayHelper.push({
                                    finding_id: generateAlphanumeric(5),
                                    specify_finding_code: '',
                                  })
                                  scrollToElement(`finding-element-${i + 1}`, 'smooth')
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
                                  scrollToElement(`finding-element-${i - 1}`, 'smooth')
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

export {FindingWidget}
