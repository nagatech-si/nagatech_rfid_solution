/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {ErrorMessage, FieldArray, FormikProps} from 'formik'
import {Finishtype, IRequestUploadItem} from '../model/UploadNewHelper'
import FormikReactSelect from '../../../../../_metronic/helpers/FormikReactSelect'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import {IFinishType} from '../../../master/finish-type/model/FinishTypeModel'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'
import scrollToElement from '../../../../../_metronic/helpers/ElementHelper'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const FinishWidget: FC<Props> = ({formik}) => {
  const finishData: IFinishType[] = useSelector<RootState>(
    ({finishType}) => finishType.data
  ) as IFinishType[]
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.9'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.9-1'})}</div>
      </div>
      <FieldArray
        name='finishtype'
        render={(arrayHelper) => {
          return (
            <div>
              {formik.values.finishtype.length > 0 &&
                formik.values.finishtype.map((finishType: Finishtype, i: number) => {
                  return (
                    <div key={i} className='' id={`finish-element-${i}`}>
                      <div className='list-group-item'>
                        <h5 className='card-title mb-6'>
                          {intl.formatMessage({id: 'FINISH.TYPE'})}
                        </h5>
                        <div className='form-group col-lg-12'>
                          <label className='form-label required'>
                            {intl.formatMessage(
                              {id: 'BASE.NAME'},
                              {name: intl.formatMessage({id: 'FINISH.TYPE'})}
                            )}
                          </label>
                          <FormikReactSelect
                            name={`finishtype.${i}.finish_type_code`}
                            options={finishData.map((value: IFinishType) => {
                              return {
                                value: value.finish_type_name,
                                label: value.finish_type_name,
                              }
                            })}
                          />
                          <div className='text-danger mt-2'>
                            <ErrorMessage name={`finishtype.${i}.finish_type_code`} />
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
                                    finish_id: generateAlphanumeric(5),
                                    finish_type_code: '',
                                  })
                                  scrollToElement(`finish-element-${i + 1}`, 'smooth')
                                }}
                              >
                                <i className='bi bi-plus-square-fill'></i>
                              </button>
                            </div>
                            <div className='d-flex flex-row-fluid justify-content-end'>
                              <button
                                type='button'
                                className={
                                  i !== 0
                                    ? 'btn btn-icon btn-light-google me-5 '
                                    : 'btn btn-icon btn-light-google me-5 d-none'
                                }
                                onClick={() => {
                                  arrayHelper.remove(i)
                                  scrollToElement(`finish-element-${i - 1}`, 'smooth')
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
    </div>
  )
}

export {FinishWidget}
