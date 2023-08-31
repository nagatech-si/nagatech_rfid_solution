/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {ErrorMessage, Field, FieldArray, FormikProps} from 'formik'
import {IRequestUploadItem, Stone} from '../model/UploadNewHelper'
import FormikReactSelect, {MyOption} from '../../../../../_metronic/helpers/FormikReactSelect'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'
import {IStoneCategory} from '../../../master/stone-category/model/StoneCategoryModel'
import {IStoneType} from '../../../master/stone-type/model/StoneTypeModel'
import {IStoneColour} from '../../../master/stone-colour/model/StoneColourModel'
import {IStoneCut} from '../../../master/stone-cut/model/StoneCutModel'
import {IStoneShape} from '../../../master/stone-shape/model/StoneShapeModel'
import {IStoneGrade} from '../../../master/stone-grade/model/StoneGradeModel'
import {IStoneOrigin} from '../../../master/stone-origin/model/StoneOriginModel'
import {GlobalTable} from '../../../../component/GlobalTable'
import scrollToElement from '../../../../../_metronic/helpers/ElementHelper'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const StoneWidget: FC<Props> = ({formik}) => {
  const stoneCategoryData: IStoneCategory[] = useSelector<RootState>(
    ({stoneCategory}) => stoneCategory.data
  ) as IStoneCategory[]
  const stoneTypeData: IStoneType[] = useSelector<RootState>(
    ({stoneType}) => stoneType.data
  ) as IStoneType[]
  const stoneColourData: IStoneColour[] = useSelector<RootState>(
    ({stoneColour}) => stoneColour.data
  ) as IStoneColour[]
  const stoneCutData: IStoneCut[] = useSelector<RootState>(
    ({stoneCut}) => stoneCut.data
  ) as IStoneCut[]
  const stoneShapeData: IStoneShape[] = useSelector<RootState>(
    ({stoneShape}) => stoneShape.data
  ) as IStoneShape[]
  const stoneGradeData: IStoneGrade[] = useSelector<RootState>(
    ({stoneGrade}) => stoneGrade.data
  ) as IStoneGrade[]
  const stoneOriginData: IStoneOrigin[] = useSelector<RootState>(
    ({stoneOrigin}) => stoneOrigin.data
  ) as IStoneOrigin[]
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.12'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.12-1'})}</div>
      </div>

      <div className='col-lg-12 mb-10'>
        <GlobalTable
          columns={[
            {
              dataField: 'title',
              text: intl.formatMessage({id: 'STONE.TYPE'}),
              formatter: (_, value: Stone) => {
                return (
                  <div>
                    <p className='lh-1'>{value.stone_type_code}</p>
                    <p className='lh-1'>{value.stone_category_code}</p>
                    <p className='text-primary lh-1'>{value.stone_certificate}</p>
                    <p className='lh-1'>{value.cut_stone_code}</p>
                    <p className='lh-1'>{value.stone_size}</p>
                    <p className='lh-1'>{value.stone_origin_code}</p>
                  </div>
                )
              },
            },
            {
              dataField: 'stone_colour_code',
              text: intl.formatMessage({id: 'COLOUR'}),
            },
            {
              dataField: 'stone_shape_code',
              text: intl.formatMessage({id: 'SHAPE'}),
            },
            {
              dataField: 'stone_carat_weight',
              text: intl.formatMessage({id: 'STONE.CARAT'}),
            },
            {
              dataField: 'stone_qty',
              text: intl.formatMessage({id: 'QUANTITY'}),
            },
            {
              dataField: 'stone_carat_subtotal',
              text: intl.formatMessage({id: 'CARAT.SUBTOTAL'}),
            },
            {
              dataField: 'stone_price',
              text: intl.formatMessage({id: 'PPP.PPC'}),
            },
            {
              dataField: 'stone_price_subtotal',
              text: intl.formatMessage({id: 'COST.SUBTOTAL'}),
              formatter: (value, _) => {
                return `$${value}`
              },
            },
          ]}
          keyField='stone_category_code'
          data={formik.values.stone.filter((value) => value.stone_type_code !== '-')}
        />
      </div>
      <FieldArray
        name='stone'
        render={(arrayHelper) => {
          return (
            <div>
              {formik.values.stone.length > 0 &&
                formik.values.stone.map((stone: Stone, i: number) => {
                  return (
                    <div key={i} className='' id={`stone-element-${i}`}>
                      <div className='list-group-item'>
                        <h5 className='card-title mb-6'>
                          {intl.formatMessage({id: 'STONE'})} {i + 1}
                        </h5>
                        <div className='col-lg-12 row'>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <div className='form-group col-lg-12'>
                                <label className='form-label '>
                                  {intl.formatMessage({id: 'STONE.CATEGORY'})}
                                </label>
                                <FormikReactSelect
                                  name={`stone.${i}.stone_category_code`}
                                  options={stoneCategoryData.map((value: IStoneCategory) => {
                                    return {
                                      value: value.stone_category_name,
                                      label: value.stone_category_name,
                                    }
                                  })}
                                  handleChange={(e) => {
                                    if (e instanceof MyOption) {
                                      if (e.value === 'AMBER') {
                                        formik.setFieldValue(`stone.${i}.stone_carat_weight`, 0)
                                        formik.setFieldValue(`stone.${i}.stone_grade_code`, 0)
                                      } else if (e.value === 'CRYSTAL') {
                                        formik.setFieldValue(`stone.${i}.treatment_stone`, '-')
                                        formik.setFieldValue(`stone.${i}.stone_carat_subtotal`, 0)
                                      }
                                    }
                                  }}
                                />
                                <div className='text-danger mt-2'>
                                  <ErrorMessage name={`stone.${i}.stone_category_code`} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <div className='form-group col-lg-12'>
                                <label className='form-label '>
                                  {intl.formatMessage({id: 'STONE.TYPE'})}
                                </label>
                                <FormikReactSelect
                                  name={`stone.${i}.stone_type_code`}
                                  options={stoneTypeData.map((value: IStoneType) => {
                                    return {
                                      value: value.stone_type_name,
                                      label: value.stone_type_name,
                                    }
                                  })}
                                />
                                <div className='text-danger mt-2'>
                                  <ErrorMessage name={`stone.${i}.stone_type_code`} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5'>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <div className='form-group col-lg-12'>
                                <label className='form-label '>
                                  {' '}
                                  {intl.formatMessage({id: 'STONE.COLOUR'})}
                                </label>
                                <FormikReactSelect
                                  name={`stone.${i}.stone_colour_code`}
                                  options={stoneColourData.map((value: IStoneColour) => {
                                    return {
                                      value: value.stone_colour_name,
                                      label: value.stone_colour_name,
                                    }
                                  })}
                                />
                                <div className='text-danger mt-2'>
                                  <ErrorMessage name={`stone.${i}.stone_colour_code`} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='fv-row '>
                              <label className='form-label '>
                                {' '}
                                {intl.formatMessage({id: 'STONE.REFERENCE'})}
                              </label>

                              <Field
                                name={`stone.${i}.stone_certificate`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`stone.${i}.stone_certificate`} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5'>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <div className='form-group col-lg-12'>
                                <label className='form-label '>
                                  {' '}
                                  {intl.formatMessage({id: 'STONE.CUT'})}
                                </label>
                                <FormikReactSelect
                                  name={`stone.${i}.cut_stone_code`}
                                  options={stoneCutData.map((value: IStoneCut) => {
                                    return {
                                      value: value.cut_stone_name,
                                      label: value.cut_stone_name,
                                    }
                                  })}
                                />
                                <div className='text-danger mt-2'>
                                  <ErrorMessage name={`stone.${i}.cut_stone_code`} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <div className='form-group col-lg-12'>
                                <label className='form-label '>
                                  {' '}
                                  {intl.formatMessage({id: 'STONE.SHAPE'})}
                                </label>
                                <FormikReactSelect
                                  name={`stone.${i}.stone_shape_code`}
                                  options={stoneShapeData.map((value: IStoneShape) => {
                                    return {
                                      value: value.stone_shape_name,
                                      label: value.stone_shape_name,
                                    }
                                  })}
                                />
                                <div className='text-danger mt-2'>
                                  <ErrorMessage name={`stone.${i}.stone_shape_code`} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5'>
                          <div className='col-lg-6'>
                            <div className='fv-row '>
                              <label className='form-label '>Stone Size (mm)</label>

                              <Field
                                name={`stone.${i}.stone_size`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`stone.${i}.stone_size`} />
                              </div>
                            </div>
                          </div>
                          <div
                            className={
                              formik.values.stone[i].stone_category_code === 'AMBER' ||
                              formik.values.stone[i].stone_category_code === 'CRYSTAL'
                                ? 'col-lg-6 d-none'
                                : 'col-lg-6'
                            }
                          >
                            <div className='fv-row'>
                              <div className='form-group col-lg-12'>
                                <label className='form-label '>
                                  {intl.formatMessage({id: 'STONE.GRADE'})}
                                </label>
                                <FormikReactSelect
                                  name={`stone.${i}.stone_grade_code`}
                                  options={stoneGradeData.map((value: IStoneGrade) => {
                                    return {
                                      value: value.stone_grade_name,
                                      label: value.stone_grade_name,
                                    }
                                  })}
                                />
                                <div className='text-danger mt-2'>
                                  <ErrorMessage name={`stone.${i}.stone_grade_code`} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5'>
                          <div
                            className={
                              formik.values.stone[i].stone_category_code === 'CRYSTAL'
                                ? 'col-lg-6 d-none'
                                : 'col-lg-6'
                            }
                          >
                            <div className='fv-row'>
                              <div className='form-group col-lg-12'>
                                <label className='form-label '>
                                  {intl.formatMessage({id: 'STONE.TREATMENT'})}
                                </label>
                                <FormikReactSelect
                                  name={`stone.${i}.treatment_stone`}
                                  options={[
                                    {
                                      value: 'NONE',
                                      label: 'NONE',
                                    },
                                    {
                                      label: 'NATURAL',
                                      value: 'NATURAL',
                                    },
                                    {
                                      value: 'DYED',
                                      label: 'DYED',
                                    },
                                    {
                                      value: 'HEATED',
                                      label: 'HEATED',
                                    },
                                  ]}
                                />
                                <div className='text-danger mt-2'>
                                  <ErrorMessage name={`stone.${i}.treatment_stone`} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              formik.values.stone[i].stone_category_code === 'AMBER' ||
                              formik.values.stone[i].stone_category_code === 'CRYSTAL'
                                ? 'col-lg-6 d-none'
                                : 'col-lg-6'
                            }
                          >
                            <div className='fv-row '>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'CARAT.WEIGHT'})}
                              </label>

                              <Field
                                name={`stone.${i}.stone_carat_weight`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`stone.${i}.stone_carat_weight`} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5'>
                          <div className='col-lg-6'>
                            <div className='fv-row'>
                              <div className='form-group col-lg-12'>
                                <label className='form-label '>
                                  {intl.formatMessage({id: 'STONE.ORIGIN'})}
                                </label>
                                <FormikReactSelect
                                  name={`stone.${i}.stone_origin_code`}
                                  options={stoneOriginData.map((value: IStoneOrigin) => {
                                    return {
                                      value: value.stone_origin_name,
                                      label: value.stone_origin_name,
                                    }
                                  })}
                                />
                                <ErrorMessage
                                  name={`stone.${i}.stone_origin_code`}
                                  component='div'
                                  className='invalid-feedback'
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className={
                              formik.values.stone[i].stone_category_code === 'CRYSTAL'
                                ? 'col-lg-6 d-none'
                                : 'col-lg-6'
                            }
                          >
                            <div className='fv-row '>
                              <label className='form-label '>
                                {' '}
                                {intl.formatMessage({id: 'CALCULATION'})}
                              </label>

                              <Field
                                type='number'
                                name={`stone.${i}.stone_carat_subtotal`}
                                className='form-control form-control-lg form-control-solid'
                                disabled
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`stone.${i}.stone_carat_subtotal`} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 row mt-5 justify-content-evenly	'>
                          <div className='col-lg-6'>
                            <div className='fv-row '>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'PRICE.IN.USD'})}
                              </label>

                              <Field
                                type='number'
                                name={`stone.${i}.stone_price`}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`stone.${i}.stone_price`} />
                              </div>
                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <div className='fv-row '>
                              <label className='form-label '>
                                {intl.formatMessage({id: 'QUANTITY'})}
                              </label>

                              <input
                                type='number'
                                name={`stone.${i}.stone_qty`}
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  const totalCarat =
                                    Number(e.target.value) * stone.stone_carat_weight
                                  const totalPrice = Number(e.target.value) * stone.stone_price
                                  formik.setFieldValue(
                                    `stone.${i}.stone_carat_subtotal`,
                                    totalCarat
                                  )
                                  formik.setFieldValue(
                                    `stone.${i}.stone_price_subtotal`,
                                    totalPrice
                                  )
                                  formik.handleChange(e)
                                }}
                                value={stone.stone_qty}
                                className='form-control form-control-lg form-control-solid'
                              />
                              <div className='text-danger mt-2'>
                                <ErrorMessage name={`stone.${i}.stone_qty`} />
                              </div>
                            </div>
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
                                    chain_id: generateAlphanumeric(5),
                                    stone_category_code: '',
                                    chain_length: 0,
                                    chain_weight: 0,
                                    chain_extra_detail: 0,
                                    chain_gauge: 0,
                                    chain_width: 0,
                                  })
                                  scrollToElement(`stone-element-${i + 1}`, 'smooth')
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
                                  scrollToElement(`stone-element-${i - 1}`, 'smooth')
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

export {StoneWidget}
