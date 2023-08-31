/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {IClosingPO, IReqeustConfirmPO, Itemdetail} from '../model/ClosingPOModel'
import * as ClosingPoRedux from '../redux/ClosingPORedux'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'

const ConfirmPOModal: FC = () => {
  const dispatch = useDispatch()
  const closePODatas: IClosingPO = useSelector<RootState>(
    ({closePO}) => closePO.payload
  ) as IClosingPO
  const [selectedItem, setSelectedItem] = useState<IReqeustConfirmPO[]>([])

  const confirmPO = () => {
    const datas: IReqeustConfirmPO[] = closePODatas.itemdetail.map((value) => {
      let index = selectedItem.findIndex((f) => f.code_id === value._id)
      return {
        code_id: value._id,
        code_item: value.code_item,
        status: index !== -1 ? 'CLOSED' : 'CANCEL',
      }
    })
    dispatch(ClosingPoRedux.actions.putCofirmPO(closePODatas.no_po, datas))
    setSelectedItem([])
  }
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_confirm_po' aria-hidden='true'>
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
              <h1 className='mb-3'>{intl.formatMessage(
                {id: 'DETAIL.ITEM.PO'})}</h1>

              <div className='text-muted fw-bold fs-5'>
                {intl.formatMessage(
                  {id: 'DETAIL.ITEM.PO.SUB'})}
              </div>
            </div>
            {closePODatas?.itemdetail.map((value: Itemdetail, index) => {
              return (
                <div className={`col-lg-4`} key={`ITEMDETAIL_${index}`}>
                  <div className='card border border-2 ribbon ribbon-top ribbon-vertical'>
                    <div
                      className={
                        selectedItem.filter((x) => x.code_id === value._id).length > 0
                          ? 'ribbon-label bg-primary'
                          : 'ribbon-label bg-danger'
                      }
                    >
                      {selectedItem.filter((x) => x.code_id === value._id).length > 0
                        ? 'SELECTED'
                        : 'NOT SELECTED'}
                    </div>
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
                          <i className='bi bi-qr-code-scan  me-2'></i>
                          Kadar: {value.metal_title_code}
                        </h6>
                        <h6 className=''>
                          <i className='bi bi-tag-fill  me-2'></i>
                          Nett Weight :{value.total_nett_weight}
                        </h6>
                        <h6 className=''>
                          <i className='bi bi-tag-fill  me-2'></i>
                          Quantity :{value.qty_po}
                        </h6>
                        <h6 className=''>
                          <i className='bi bi-tag-fill  me-2'></i>
                          Total Tukaran / Price :{value.sub_total_price}
                        </h6>
                        <div className='form-check form-check-custom form-check-solid mb-5 mt-5'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            value='checked'
                            onClick={() => {
                              let index = selectedItem.findIndex((f) => f.code_id === value._id)
                              if (index === -1) {
                                setSelectedItem([
                                  ...selectedItem,
                                  {
                                    code_id: value._id,
                                    code_item: value.code_item,
                                    status: 'CLOSED',
                                  },
                                ])
                              } else {
                                setSelectedItem(selectedItem.filter((_, i) => i !== index))
                              }
                            }}
                          />
                          <label className='form-check-label'>Click Box To Select Item</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
              Close
            </button>
            <button type='button' className='btn btn-primary' onClick={confirmPO}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ConfirmPOModal}
