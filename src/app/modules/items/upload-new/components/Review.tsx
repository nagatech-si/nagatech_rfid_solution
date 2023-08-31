/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {FormikProps} from 'formik'
import {
  Finishtype,
  Gambar,
  IRequestUploadItem,
  Material,
  Plating,
  Stone,
} from '../model/UploadNewHelper'
import {KTSVG} from '../../../../../_metronic/helpers'
import {GlobalTable} from '../../../../component/GlobalTable'
import {Image360Widget} from './modal/360Widget'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const ReviewWidget: FC<Props> = ({formik}) => {
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.18'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.18-1'})}</div>
      </div>
      <div className='row mb-5'>
        {formik.values.gambar.map((value: Gambar) => {
          return (
            <div className='col-lg-3'>
              <div className='card card-custom overlay overflow-hidden border'>
                <div className='card-body p-0'>
                  <div className='overlay-wrapper'>
                    <img src={value.lokasi_gambar} alt='' className='w-100 rounded' />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Image360Widget formik={formik} />
      {formik.values.gambar360.length === 36 ? (
        <div className='row justify-content-start mb-5'>
          <div className='col-lg-3'>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target={`#kt_modal_image_360`}
            >
              {intl.formatMessage({id: 'SHOW.360.IMAGE'})}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className='accordion accordion-icon-toggle' id='kt_accordion_1'>
        <div className='accordion-item mb-4 rounded'>
          <h2 className='accordion-header' id='kt_accordion_1_header_1'>
            <button
              className='accordion-button fs-4 fw-bold '
              type='button'
              data-bs-toggle=''
              data-bs-target='#kt_accordion_1_body_1'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_1'
            >
              <span className='accordion-icon me-5'>
                <KTSVG
                  className='svg-icon svg-icon-4'
                  path='/media/icons/duotune/arrows/arr064.svg'
                />
              </span>
              {intl.formatMessage({id: 'BASIC.DETAIL'})}
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_1'
            className='accordion-collapse '
            aria-labelledby='kt_accordion_1_header_1'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'MATERIAL.TYPE'})}</h5>
                  <p>{formik.values.material_type_code}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'QUOTE.METHOD'})}</h5>
                  <p>-</p>
                </div>
              </div>
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'METAL.COLOUR_TYPE'})}</h5>
                  <p>
                    {formik.values.metalcolour.map((value) => value.colour_type_code).join(',')}
                  </p>
                </div>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'QUOTE.CURRENCY'})}</h5>
                  <p>-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='accordion-item mb-4 rounded'>
          <h2 className='accordion-header' id='kt_accordion_1_header_2'>
            <button
              className='accordion-button fs-4 fw-bold '
              type='button'
              data-bs-toggle=''
              data-bs-target='#kt_accordion_1_body_2'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_2'
            >
              <span className='accordion-icon me-5'>
                <KTSVG
                  className='svg-icon svg-icon-4'
                  path='/media/icons/duotune/arrows/arr064.svg'
                />
              </span>
              {intl.formatMessage({id: 'SAMPLE.TYPE'})}
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_2'
            className='accordion-collapse '
            aria-labelledby='kt_accordion_1_header_1'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <div className='flex d-flex'>
                <div className='col-lg-4'>
                  <h5> {intl.formatMessage({id: 'SAMPLE.TYPE'})}</h5>
                  <p>{formik.values.sample_type_code}</p>
                </div>
                <div className='col-lg-4'>
                  <h5>{intl.formatMessage({id: 'ITEM.CODE'})}</h5>
                  <p>{formik.values.code_item}</p>
                </div>
                <div className='col-lg-4'>
                  <h5>{intl.formatMessage({id: 'SAMPLE.QUANTITY_TYPE'})}</h5>
                  <p>{formik.values.qty_code}</p>
                </div>
              </div>
              <div className='flex d-flex'>
                <div className='col-lg-4'>
                  <h5> {intl.formatMessage({id: 'SAMPLE.CATEGORY'})}</h5>
                  <p>{formik.values.category_code}</p>
                </div>
                <div className='col-lg-4'>
                  <h5>{intl.formatMessage({id: 'ITEM.NAME'})}</h5>
                  <p>{formik.values.item_name}</p>
                </div>
                <div className='col-lg-4'>
                  <h5>{intl.formatMessage({id: 'ITEM.HASHTAG'})}</h5>
                  <p>{formik.values.hashtag.join(',')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='accordion-item mb-4 rounded'>
          <h2 className='accordion-header' id='kt_accordion_1_header_3'>
            <button
              className='accordion-button fs-4 fw-bold '
              type='button'
              data-bs-toggle=''
              data-bs-target='#kt_accordion_1_body_3'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_3'
            >
              <span className='accordion-icon me-5'>
                <KTSVG
                  className='svg-icon svg-icon-4'
                  path='/media/icons/duotune/arrows/arr064.svg'
                />
              </span>
              Dimension
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_3'
            className='accordion-collapse '
            aria-labelledby='kt_accordion_1_header_3'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'ITEM.WIDTH'})} (mm)</h5>
                  <p>{formik.values.width_item}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'ITEM.HEIGHT'})} (mm)</h5>
                  <p>{formik.values.height_item}</p>
                </div>
              </div>
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'ITEM.DEPTH'})} (mm)</h5>
                  <p>{formik.values.depth_item}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'ITEM.GAUGE'})}</h5>
                  <p>{formik.values.gauge_item}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='accordion-item mb-4 rounded'>
          <h2 className='accordion-header' id='kt_accordion_1_header_4'>
            <button
              className='accordion-button fs-4 fw-bold '
              type='button'
              data-bs-toggle=''
              data-bs-target='#kt_accordion_1_body_4'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_4'
            >
              <span className='accordion-icon me-5'>
                <KTSVG
                  className='svg-icon svg-icon-4'
                  path='/media/icons/duotune/arrows/arr064.svg'
                />
              </span>
              {intl.formatMessage({id: 'SAMPLE.QUANTITY_TYPE'})}
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_4'
            className='accordion-collapse '
            aria-labelledby='kt_accordion_1_header_4'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              {formik.values.finishtype.map((value: Finishtype, index) => {
                return (
                  <div className='flex d-flex'>
                    <div className='col-lg-12'>
                      <h5>
                        {' '}
                        {intl.formatMessage({id: 'FINISH.TYPE'})} {index + 1}
                      </h5>
                      <p>{value.finish_type_code}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {formik.values.stone.filter((value) => value.stone_type_code !== '').length > 0 ? (
          <div className='accordion-item mb-4 rounded'>
            <h2 className='accordion-header' id='kt_accordion_1_header_5'>
              <button
                className='accordion-button fs-4 fw-bold '
                type='button'
                data-bs-toggle=''
                data-bs-target='#kt_accordion_1_body_5'
                aria-expanded='false'
                aria-controls='kt_accordion_1_body_5'
              >
                <span className='accordion-icon me-5'>
                  <KTSVG
                    className='svg-icon svg-icon-4'
                    path='/media/icons/duotune/arrows/arr064.svg'
                  />
                </span>
                {intl.formatMessage({id: 'STONE.DETAIL'})}
              </button>
            </h2>
            <div
              id='kt_accordion_1_body_5'
              className='accordion-collapse '
              aria-labelledby='kt_accordion_1_header_5'
              data-bs-parent='#kt_accordion_1'
            >
              <div className='accordion-body'>
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
                    data={formik.values.stone}
                  />
                  <div className='separator my-6'></div>
                  <div className='flex d-flex mt-5'>
                    <div className='col-lg-4 text-center'>
                      <span className='badge badge-light-primary fs-6 mb-4'>
                        {intl.formatMessage({id: 'TOTAL.COST'})}
                      </span>

                      <h5>
                        {formik.values.stone.reduce(
                          (a: Number, b: Stone) => Number(a) + Number(b.stone_price),
                          0
                        )}
                      </h5>
                    </div>
                    <div className='col-lg-4 text-center'>
                      <span className='badge badge-light-primary fs-6 mb-4'>
                        {intl.formatMessage({id: 'TOTAL.QUANTITY'})}
                      </span>
                      <h5>
                        {formik.values.stone.reduce(
                          (a: Number, b: Stone) => Number(a) + Number(b.stone_qty),
                          0
                        )}
                      </h5>
                    </div>
                    <div className='col-lg-4 text-center'>
                      <span className='badge badge-light-primary fs-6 mb-4'>
                        {intl.formatMessage({id: 'TOTAL.CARAT'})}
                      </span>
                      <h5>
                        {formik.values.stone.reduce(
                          (a: Number, b: Stone) => Number(a) + Number(b.stone_carat_weight),
                          0
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className='accordion-item mb-4 rounded'>
          <h2 className='accordion-header' id='kt_accordion_1_header_6'>
            <button
              className='accordion-button fs-4 fw-bold '
              type='button'
              data-bs-toggle=''
              data-bs-target='#kt_accordion_1_body_6'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_6'
            >
              <span className='accordion-icon me-5'>
                <KTSVG
                  className='svg-icon svg-icon-4'
                  path='/media/icons/duotune/arrows/arr064.svg'
                />
              </span>
              {intl.formatMessage({id: 'PLATING'})}
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_6'
            className='accordion-collapse '
            aria-labelledby='kt_accordion_1_header_6'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <div className='flex d-flex mb-3'>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'PLATING.METHOD'})}</h5>
                  <p>{formik.values.plating_method_code}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'PLATING.GUARANTEED'})}</h5>
                  <p>{formik.values.guaranteed}</p>
                </div>
              </div>
              {formik.values.plating.map((value: Plating, index) => {
                return (
                  <div className='flex d-flex'>
                    <div className='col-lg-12'>
                      <h5>
                        {intl.formatMessage({id: 'PLATING'})} {index + 1}
                      </h5>
                      <p>
                        {intl.formatMessage(
                          {id: 'BASE.CODE'},
                          {name: intl.formatMessage({id: 'PLATING.METAL'})}
                        )}
                        : {value.plating_metal_code}
                      </p>
                      <p>
                        {intl.formatMessage(
                          {id: 'BASE.CODE'},
                          {name: intl.formatMessage({id: 'PLATING.COLOUR'})}
                        )}{' '}
                        : {value.plating_colour_code}
                      </p>
                      <p>
                        {intl.formatMessage({id: 'MICRON'})} (mm): {value.micron}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='accordion-item mb-4 rounded'>
          <h2 className='accordion-header' id='kt_accordion_1_header_7'>
            <button
              className='accordion-button fs-4 fw-bold '
              type='button'
              data-bs-toggle=''
              data-bs-target='#kt_accordion_1_body_7'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_7'
            >
              <span className='accordion-icon me-5'>
                <KTSVG
                  className='svg-icon svg-icon-4'
                  path='/media/icons/duotune/arrows/arr064.svg'
                />
              </span>
              {intl.formatMessage({id: 'MATERIAL.AND.SIZE'})}
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_7'
            className='accordion-collapse '
            aria-labelledby='kt_accordion_1_header_7'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              {formik.values.material.map((value: Material, i) => {
                return (
                  <div className='list-group-item'>
                    <h5 className='card-title mb-6'>
                      {' '}
                      {intl.formatMessage({id: 'MATERIAL'})} {i + 1}
                    </h5>
                    <div className='col-lg-12 mb-10'>
                      <div className='flex d-flex justify-content-evenly'>
                        <p className='fs-6'>
                          {intl.formatMessage({id: 'UNIT.OF.MEASURE'})}:{' '}
                          <strong>{value.measure_name}</strong>
                        </p>
                        <p className='fs-6'>
                          {intl.formatMessage({id: 'METAL.TITLE'})}:{' '}
                          <strong>{value.metal_title_code}</strong>
                        </p>
                        <p className='fs-6'>
                          {intl.formatMessage({id: 'LOSS'})}: <strong>{value.loss}</strong>
                        </p>
                      </div>
                      <div className='flex d-flex justify-content-start'>
                        <div className='col-lg-6 pe-5'>
                          <div className='fv-row '>
                            <label className='form-label '>
                              {intl.formatMessage({id: 'PRICE'})} (USD)
                            </label>

                            <input
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={value.price}
                              className='form-control form-control-lg form-control-solid'
                            />
                          </div>
                        </div>
                        <div className='col-lg-6 ps-5'>
                          <div className='fv-row '>
                            <label className='form-label '>
                              {intl.formatMessage({id: 'EXCHANGE'})} (%)
                            </label>

                            <input
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={value.kadar}
                              className='form-control form-control-lg form-control-solid'
                            />
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
                            text: intl.formatMessage({id: 'NET.WEIGHT'}) + '(g)',
                          },
                          {
                            dataField: 'gross_weight',
                            text: intl.formatMessage({id: 'GROSS.WEIGHT'}) + '(g)',
                          },
                        ]}
                        keyField='no'
                        data={value.size}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='accordion-item mb-4 rounded'>
          <h2 className='accordion-header' id='kt_accordion_1_header_8'>
            <button
              className='accordion-button fs-4 fw-bold '
              type='button'
              data-bs-toggle=''
              data-bs-target='#kt_accordion_1_body_8'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_8'
            >
              <span className='accordion-icon me-5'>
                <KTSVG
                  className='svg-icon svg-icon-4'
                  path='/media/icons/duotune/arrows/arr064.svg'
                />
              </span>
              {intl.formatMessage({id: 'DIMENSION'})}
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_8'
            className='accordion-collapse '
            aria-labelledby='kt_accordion_1_header_8'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5>{intl.formatMessage({id: 'WEIGHT.TOLERANCE'})}</h5>
                  <p>{formik.values.weight_tolerance}</p>
                </div>
              </div>
              {formik.values.material.map((value: Material, index) => {
                return (
                  <div className='flex d-flex'>
                    <div className='col-lg-6'>
                      <h5>{intl.formatMessage({id: 'MIN.ORDER.QTY'})}</h5>
                      <p>
                        {formik.values.weight_tolerance}, {value.metal_title_code},{' '}
                        {formik.values.min_order_qty[0].units_quote_data} Units
                      </p>
                    </div>
                  </div>
                )
              })}
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5>
                    {intl.formatMessage({id: 'PRODUCTION.LEAD.TIME'})} (
                    {intl.formatMessage({id: 'DAYS'})})
                  </h5>
                  <p>{formik.values.product_lead_time}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>
                    {intl.formatMessage({id: 'SAMPLE.LEAD.TIME'})} (
                    {intl.formatMessage({id: 'DAYS'})})
                  </h5>
                  <p>{formik.values.sample_lead_time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='accordion-item mb-4 rounded'>
          <h2 className='accordion-header' id='kt_accordion_1_header_9'>
            <button
              className='accordion-button fs-4 fw-bold '
              type='button'
              data-bs-toggle=''
              data-bs-target='#kt_accordion_1_body_9'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_9'
            >
              <span className='accordion-icon me-5'>
                <KTSVG
                  className='svg-icon svg-icon-4'
                  path='/media/icons/duotune/arrows/arr064.svg'
                />
              </span>
              {intl.formatMessage({id: 'PRIVACY'})}
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_9'
            className='accordion-collapse '
            aria-labelledby='kt_accordion_1_header_9'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5> {intl.formatMessage({id: 'PRIVACY.SETTING'})}</h5>
                  <p>{formik.values.privacy}</p>
                </div>
                <div className='col-lg-6'>
                  <h5> {intl.formatMessage({id: 'PRIVACY.TYPE'})}</h5>
                  <p>{formik.values.jenis_privacy}</p>
                </div>
              </div>
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5> {intl.formatMessage({id: 'SELECTED.MARKET'})}</h5>
                  <p>{formik.values.selected_market.join(',')}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>
                    {intl.formatMessage({id: 'SAMPLE.LEAD.TIME'})} (
                    {intl.formatMessage({id: 'DAYS'})})
                  </h5>
                  <p>{formik.values.selected_customer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ReviewWidget}
