/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {
  Finishtype,
  Gambar,
  IRequestUploadItem,
  Material,
  Plating,
  Stone,
} from '../../upload-new/model/UploadNewHelper'
import {KTSVG} from '../../../../../_metronic/helpers'
import {GlobalTable} from '../../../../component/GlobalTable'
import {Image360DetailWidget} from './360Widget'
import {useIntl} from 'react-intl'

type Props = {
  itemData: IRequestUploadItem
}

const ViewDetailWidget: FC<Props> = ({itemData}) => {
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'>Detail Items</h2>

        <div className='text-gray-400 fw-bold fs-6'>Check item specification</div>
      </div>
      <div className='row mb-5'>
        {itemData.gambar.map((value: Gambar) => {
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
      <Image360DetailWidget itemData={itemData} />
      {itemData.gambar360.length === 36 ? (
        <div className='row justify-content-start mb-5'>
          <div className='col-lg-3'>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target={`#kt_modal_image_360`}
            >
              Show 360 Image
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
              Basic Detail
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
                  <h5>Material Type</h5>
                  <p>{itemData.material_type_code}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>Quote Method</h5>
                  <p>-</p>
                </div>
              </div>
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5>Metal Colour</h5>
                  <p>{itemData.metalcolour.map((value) => value.colour_type_code).join(',')}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>Quote Currency</h5>
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
                  <h5>{intl.formatMessage({id: 'SAMPLE.TYPE'})}</h5>
                  <p>{itemData.sample_type_code}</p>
                </div>
                <div className='col-lg-4'>
                  <h5>Item Code</h5>
                  <p>{itemData.code_item}</p>
                </div>
                <div className='col-lg-4'>
                  <h5>Quantity Type</h5>
                  <p>{itemData.qty_code}</p>
                </div>
              </div>
              <div className='flex d-flex'>
                <div className='col-lg-4'>
                  <h5>Sample Category</h5>
                  <p>{itemData.category_code}</p>
                </div>
                <div className='col-lg-4'>
                  <h5>Item Name</h5>
                  <p>{itemData.item_name}</p>
                </div>
                <div className='col-lg-4'>
                  <h5>Item Hashtag</h5>
                  <p>{itemData.hashtag.join(',')}</p>
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
                  <h5>Item Width (mm)</h5>
                  <p>{itemData.width_item}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>Item Height (mm)</h5>
                  <p>{itemData.height_item}</p>
                </div>
              </div>
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5>Item Depth (mm)</h5>
                  <p>{itemData.depth_item}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>Item Gauge</h5>
                  <p>{itemData.gauge_item}</p>
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
              Finish
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_4'
            className='accordion-collapse '
            aria-labelledby='kt_accordion_1_header_4'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              {itemData.finishtype.map((value: Finishtype, index) => {
                return (
                  <div className='flex d-flex'>
                    <div className='col-lg-12'>
                      <h5>Finish Type {index + 1}</h5>
                      <p>{value.finish_type_code}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {itemData.stone.filter((value) => value.stone_type_code !== '').length > 0 ? (
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
                Stone Detail
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
                        text: 'Stone Type',
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
                        text: 'Colour',
                      },
                      {
                        dataField: 'stone_shape_code',
                        text: 'Shape',
                      },
                      {
                        dataField: 'stone_carat_weight',
                        text: 'Stone Carat',
                      },
                      {
                        dataField: 'stone_qty',
                        text: 'Quantity',
                      },
                      {
                        dataField: 'stone_carat_subtotal',
                        text: 'Carat Subtotal',
                      },
                      {
                        dataField: 'stone_price',
                        text: 'PPP, PPC',
                      },
                      {
                        dataField: 'stone_price_subtotal',
                        text: 'Cost Subtotal',
                        formatter: (value, _) => {
                          return `$${value}`
                        },
                      },
                    ]}
                    keyField='stone_category_code'
                    data={itemData.stone}
                  />
                  <div className='separator my-6'></div>
                  <div className='flex d-flex mt-5'>
                    <div className='col-lg-4 text-center'>
                      <span className='badge badge-light-primary fs-6 mb-4'>
                        Total Cost Subtotal
                      </span>

                      <h5>
                        {itemData.stone.reduce(
                          (a: Number, b: Stone) => Number(a) + Number(b.stone_price),
                          0
                        )}
                      </h5>
                    </div>
                    <div className='col-lg-4 text-center'>
                      <span className='badge badge-light-primary fs-6 mb-4'>Total Quantity</span>
                      <h5>
                        {itemData.stone.reduce(
                          (a: Number, b: Stone) => Number(a) + Number(b.stone_qty),
                          0
                        )}
                      </h5>
                    </div>
                    <div className='col-lg-4 text-center'>
                      <span className='badge badge-light-primary fs-6 mb-4'>Total Carat</span>
                      <h5>
                        {itemData.stone.reduce(
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
              Plating
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
                  <h5>Plating Method</h5>
                  <p>{itemData.plating_method_code}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>Guaranteed</h5>
                  <p>{itemData.guaranteed}</p>
                </div>
              </div>
              {itemData.plating.map((value: Plating, index) => {
                return (
                  <div className='flex d-flex'>
                    <div className='col-lg-12'>
                      <h5>Plating {index + 1}</h5>
                      <p>Plating Metal Code : {value.plating_metal_code}</p>
                      <p>Plating Colour Code : {value.plating_colour_code}</p>
                      <p>Micron (mm): {value.micron}</p>
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
              Material And Size
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_7'
            className='accordion-collapse '
            aria-labelledby='kt_accordion_1_header_7'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              {itemData.material.map((value: Material, i) => {
                return (
                  <div className='list-group-item'>
                    <h5 className='card-title mb-6'>Material {i + 1}</h5>
                    <div className='col-lg-12 mb-10'>
                      <div className='flex d-flex justify-content-evenly'>
                        <p className='fs-6'>
                          Unit Of Measure: <strong>{value.measure_name}</strong>
                        </p>
                        <p className='fs-6'>
                          Metal Title: <strong>{value.metal_title_code}</strong>
                        </p>
                        <p className='fs-6'>
                          Loss: <strong>{value.loss}</strong>
                        </p>
                      </div>
                      <div className='flex d-flex justify-content-start'>
                        <div className='col-lg-6 pe-5'>
                          <div className='fv-row '>
                            <label className='form-label '>Price (USD)</label>

                            <input
                              disabled
                              value={value.price}
                              className='form-control form-control-lg form-control-solid'
                            />
                          </div>
                        </div>
                        <div className='col-lg-6 ps-5'>
                          <div className='fv-row '>
                            <label className='form-label '>Exchange (%)</label>

                            <input
                              disabled
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
                            text: 'Item Size',
                          },
                          {
                            dataField: 'nett_weight',
                            text: 'Net Weight (g)',
                          },
                          {
                            dataField: 'gross_weight',
                            text: 'Gross Weight (g)',
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
              Dimension
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
                  <h5>Weight Tolerance</h5>
                  <p>{itemData.weight_tolerance}</p>
                </div>
              </div>
              {itemData.material.map((value: Material, index) => {
                return (
                  <div className='flex d-flex'>
                    <div className='col-lg-6'>
                      <h5>Minimum Order Qty</h5>
                      <p>
                        {itemData.weight_tolerance}, {value.metal_title_code},{' '}
                        {itemData.min_order_qty[0].units_quote_data} Units
                      </p>
                    </div>
                  </div>
                )
              })}
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5>Production Lead Time (days)</h5>
                  <p>{itemData.product_lead_time}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>Sample Lead Time (days)</h5>
                  <p>{itemData.sample_lead_time}</p>
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
              Privacy
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
                  <h5>Privacy Setting</h5>
                  <p>{itemData.privacy}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>Privacy Type</h5>
                  <p>{itemData.jenis_privacy}</p>
                </div>
              </div>
              <div className='flex d-flex'>
                <div className='col-lg-6'>
                  <h5>Selected Market</h5>
                  <p>{itemData.selected_market.join(',')}</p>
                </div>
                <div className='col-lg-6'>
                  <h5>Sample Lead Time (days)</h5>
                  <p>{itemData.selected_customer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ViewDetailWidget}
