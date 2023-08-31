/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {IClosingPO, Itemdetail} from '../model/ClosingPOModel'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import {getDataUri, printPDF} from './printPDF'
import * as accountRedux from '../../../accounts/redux/ProfileRedux'

import {IProfile} from '../../../accounts/model/ProfileModel'
import {createExcel} from './printExcel'
import {useIntl} from 'react-intl'

const ReviewItemPOModal: FC = () => {
  const dispatch = useDispatch()
  const closePODatas: IClosingPO = useSelector<RootState>(
    ({closePO}) => closePO.payload
  ) as IClosingPO
  const profileDatas = useSelector<RootState>(({profile}) => profile.data) as IProfile[]

  useEffect(() => {
    dispatch(accountRedux.actions.fetchAllProfile())
  }, [dispatch])

  const handlePrintPDF = async () => {
    var listImage: string[] = []
    for (let item of closePODatas.itemdetail) {
      getDataUri(item.lokasi_gambar, (dataUri) => {
        listImage.push(dataUri)
      })
    }
    getDataUri(profileDatas[0].logo, (dataUri) => {
      printPDF(dataUri, profileDatas[0], closePODatas, listImage)
    })
  }
  const handlePrintExcel = async () => {
    createExcel(closePODatas, profileDatas[0])
  }
  const intl = useIntl()

  return (
    <div className='modal fade' id='kt_modal_review_item_po' aria-hidden='true'>
      <div className='modal-dialog mw-1000px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div
              className='btn btn-sm btn-icon btn-active-color-primary'
              id='close-modal'
              data-bs-dismiss='modal'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>
          <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-13'>
              <h1 className='mb-3'>{intl.formatMessage({id: 'DETAIL.ITEM.PO'})}</h1>

              <div className='text-muted fw-bold fs-5'>
                {intl.formatMessage({id: 'DETAIL.ITEM.PO.SUB2'})}
              </div>
            </div>
            <div className='row gy-3 justify-content-center'>
              {closePODatas?.itemdetail.map((value: Itemdetail, index) => {
                return (
                  <div className={`col-lg-4`} key={`ITEMDETAIL_${index}`}>
                    <div className='card border border-2 ribbon ribbon-top ribbon-vertical'>
                      <img
                        src={value.lokasi_gambar?.length > 0 ? value.lokasi_gambar : '-'}
                        alt={value.code_item}
                        onError={({currentTarget}) => {
                          currentTarget.onerror = null // prevents looping
                          currentTarget.src = toAbsoluteUrl('/media/svg/unitedpalms/Image.svg')
                        }}
                        className='w-100 card-rounded card-img-top'
                      />
                      <div className='card-body'>
                        <h5 className='card-title'>{value.item_name}</h5>
                        <div className='col-lg-12 mt-10'>
                          <h6 className=''>
                            <i className='bi bi-circle-fill me-2'></i>
                            Kadar: {value.metal_title_code}
                          </h6>
                          <h6 className=''>
                            <i className='bi bi-circle-fill me-2'></i>
                            Nett Weight : {value.total_nett_weight}
                          </h6>
                          <h6 className=''>
                            <i className='bi bi-circle-fill me-2'></i>
                            Quantity : {value.qty_po}
                          </h6>
                          <h6 className=''>
                            <i className='bi bi-circle-fill me-2'></i>
                            Total Tukaran / Price : {value.sub_total_price}
                          </h6>
                          <h6 className=''>
                            <i className='bi bi-circle-fill me-2'></i>Status :
                            <span
                              className={
                                value.status === 'CLOSED'
                                  ? 'badge badge-light-danger ms-1'
                                  : 'badge badge-light-success ms-1'
                              }
                            >
                              {' '}
                              {value.status}
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-danger' onClick={handlePrintPDF}>
              Print PDF
            </button>
            <button type='button' className='btn btn-success' onClick={handlePrintExcel}>
              Print Excel
            </button>
            <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ReviewItemPOModal}
