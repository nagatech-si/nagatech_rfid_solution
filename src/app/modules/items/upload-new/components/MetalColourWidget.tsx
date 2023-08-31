/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'

import {Field, ErrorMessage, FieldArray, FormikProps} from 'formik'
import {IRequestUploadItem, Metalcolour} from '../model/UploadNewHelper'
import {IMetalColourType} from '../../../master/metal-colour-type/model/MetalColourTypeModel'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import FormikReactSelect, {MyOption} from '../../../../../_metronic/helpers/FormikReactSelect'
import {INickelContent} from '../../../master/nickel-content/model/NickelContentModel'
import {instanceOfA} from '../../../../../_metronic/helpers/InterfaceChecker'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const MetalColourWidget: FC<Props> = ({formik}) => {
  const metalColourDatas: IMetalColourType[] = useSelector<RootState>(
    ({metalColourType}) => metalColourType.data
  ) as IMetalColourType[]
  const nickleContentDatas: INickelContent[] = useSelector<RootState>(
    ({nickelContent}) => nickelContent.data
  ) as INickelContent[]
  const [listMetalColour, setListMetalColour] = useState<string[]>(
    formik.values.metalcolour.map((value) => value.colour_type_code)
  )
  // useEffect(() => {
  //   if (formik.values.metalcolour) {
  //     setListMetalColour(formik.values.metalcolour.map((value) => value.colour_type_code))
  //   }
  // }, [])
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.5'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.5-1'})}</div>
      </div>

      <FieldArray
        name='metalcolour'
        render={(arrayHelper) => {
          return (
            <div>
              {formik.values.metalcolour.length > 0 &&
                formik.values.metalcolour.map((metalColour: Metalcolour, i: number) => {
                  return (
                    <div key={i} className=''>
                      <div className='list-group-item'>
                        <h5 className='card-title mb-6'>
                          {intl.formatMessage({id: 'METAL.COLOUR_TYPE'})}
                        </h5>
                        <div className='form-group col-lg-12'>
                          <label className='form-label required'>
                            {intl.formatMessage(
                              {id: 'BASE.NAME'},
                              {name: intl.formatMessage({id: 'METAL.COLOUR_TYPE'})}
                            )}
                          </label>
                          <FormikReactSelect
                            name={`metalcolour.${i}.colour_type_code`}
                            options={metalColourDatas.map((value: IMetalColourType) => {
                              return {
                                value: value.colour_type_name,
                                label: value.colour_type_name,
                              }
                            })}
                            handleChange={(value: MyOption | string[]) => {
                              if (instanceOfA<MyOption>(value)) {
                                listMetalColour[i] = value.label
                                setListMetalColour(listMetalColour)
                                formik.setFieldValue(
                                  `metalcolour.${i}.metal_id`,
                                  generateAlphanumeric(5)
                                )
                                if (value.label !== 'WHITE') {
                                  formik.setFieldValue(
                                    `metalcolour.${i}.nickel_content_code`,
                                    generateAlphanumeric(5)
                                  )
                                }
                              }
                            }}
                          />
                          <div className='text-danger mt-2'>
                            <ErrorMessage name={`metalcolour.${i}.colour_type_code`} />
                          </div>
                        </div>
                        <div className='form-group col-lg-12 d-none'>
                          <label className='form-label required'>Email</label>
                          <Field
                            name={`metalcolour.${i}.metal_id`}
                            type='text'
                            className='form-control form-control-lg form-control-solid'
                          />
                          <div className='text-danger mt-2'>
                            <ErrorMessage name={`metalcolour.${i}.metal_id`} />
                          </div>
                        </div>
                        <div
                          className={
                            listMetalColour[i] === 'WHITE'
                              ? `form-group col-lg-12 mt-3 `
                              : `form-group col-lg-12 mt-3 d-none`
                          }
                        >
                          <label className='form-label required'>
                            {intl.formatMessage({id: 'METAL.NICKEL_CONTENT'})}
                          </label>
                          <FormikReactSelect
                            name={`metalcolour.${i}.nickel_content_code`}
                            options={nickleContentDatas.map((value: INickelContent) => {
                              return {
                                value: value.nickel_content_name,
                                label: value.nickel_content_name,
                              }
                            })}
                            handleChange={(value: MyOption | string[]) => {
                              console.log(value)
                            }}
                          />
                          <div className='text-danger mt-2'>
                            <ErrorMessage name={`metalcolour.${i}.nickel_content_code`} />
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
                                    colour_type_code: '',
                                    metal_id: generateAlphanumeric(5),
                                    nickel_content_code: '-',
                                  })
                                }}
                              >
                                <i className='bi bi-plus-square-fill'></i>
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
                                className='btn btn-icon btn-light-google me-5 '
                                onClick={() => {
                                  arrayHelper.remove(i)
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

export {MetalColourWidget}
