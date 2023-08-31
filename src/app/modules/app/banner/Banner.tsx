/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as bannerRedux from './redux/BannerRedux'
import {RootState} from '../../../../setup'
import {IBanner, IDetailBanner} from './model/BannerModal'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import Swal from 'sweetalert2'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const BannerWidget: React.FC<Props> = ({className}) => {
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const [SelectdBanner, setSelectdBanner] = useState<IBanner | null>(null)
  const data: IBanner[] = []
  const dataDetail: IDetailBanner[] = []
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_banner'))
    dispatch(bannerRedux.actions.fetchAllBanner())
    dispatch(bannerRedux.actions.fetchAllHashtag())
  }, [dispatch])
  const intl = useIntl()
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-10'>
        {/* begin::Table container */}
        <div className='row gy-5'>
          {data.map((value: IBanner) => (
            <div className='col-lg-4'>
              <div className='card card-custom overlay overflow-hidden '>
                <div className='card-body p-0'>
                  <div className='overlay-wrapper'>
                    <img
                      src={value.lokasi_gambar}
                      alt=''
                      className='w-100 rounded'
                      onError={({currentTarget}) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = toAbsoluteUrl('/media/svg/unitedpalms/Image.svg')
                      }}
                    />
                  </div>
                  <div className='overlay-layer bg-dark bg-opacity-10'>
                    <button
                      onClick={() => {
                        setSelectdBanner(value)
                        dispatch(
                          bannerRedux.actions.fetchBannerDetail({
                            kode_banner: value.kode_banner,
                            limit_from: 0,
                            limit_item: 250,
                          })
                        )
                        setTimeout(() => {
                          window.scrollTo({
                            left: 0,
                            top: document.body.scrollHeight,
                            behavior: 'smooth',
                          })
                        }, 200)
                      }}
                      className='btn btn-light-primary btn-shadow ms-2'
                    >
                      {!loading && intl.formatMessage({id: 'SEE.ITEM'})}
                      {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                    <button
                      data-bs-toggle='modal'
                      data-bs-target={`#kt_modal_banner`}
                      onClick={() => {
                        dispatch(toolbar.actions.SetCreateModalActive(false))
                        dispatch(bannerRedux.actions.setEditBanner(value))
                      }}
                      className='btn btn-light-warning btn-shadow ms-2'
                    >
                      {!loading && intl.formatMessage({id: 'EDIT.ITEM'})}
                      {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setloading(true)
                        Swal.fire({
                          title: 'Are you sure?',
                          text: "You won't be able to revert this!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          heightAuto: false,
                          confirmButtonText: 'Yes, delete it!',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(bannerRedux.actions.deleteBanner(value))
                          }
                        })
                        setloading(false)
                      }}
                      className='btn btn-light-danger btn-shadow ms-2'
                    >
                      <span className='svg-icon svg-icon-1'>
                        <KTSVG
                          path='/media/icons/duotune/files/fil007.svg'
                          className='svg-icon-muted svg-icon-1'
                        />
                      </span>
                      {!loading && intl.formatMessage({id: 'DELETE'})}
                      {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {SelectdBanner != null ? (
          <div>
            <hr className='border-secondary border-2 my-10' />
            <h1 className='d-flex align-items-center text-dark fw-bolder my-1 fs-2'>
              Detail Items - {SelectdBanner.deskripsi}
            </h1>
            <p className='text-muted my-1 fs-7 mb-5'>Type : {SelectdBanner.category}</p>
            <p className='text-muted my-1 fs-7 mb-5'>{SelectdBanner?.detail_hashtag?.join(',')}</p>
            {dataDetail.length < 1 ? (
              <div className='text-center'>
                <img
                  src={toAbsoluteUrl('/media/svg/unitedpalms/Feedback.svg')}
                  alt=''
                  className='w-300px h-300px card-rounded'
                />
                <h1 className='text-dark fw-bolder my-1 fs-2 mb-5'>Nothing Here</h1>
                <h1 className='text-muted fw-light my-1 fs-4 mb-5'>
                  You can add the item by edit this banner on list banner
                </h1>
              </div>
            ) : null}
            <div className='row gy-5 mb-5'>
              {dataDetail.map((value: IDetailBanner) => (
                <div className='col-lg-3'>
                  <div className='card  overlay overlay-show border border-2'>
                    <div className='card-body p-0'>
                      <div className='overlay-wrapper'>
                        <img
                          src={value.gambar[0].lokasi_gambar}
                          onError={({currentTarget}) => {
                            currentTarget.onerror = null // prevents looping
                            currentTarget.src = toAbsoluteUrl('/media/svg/unitedpalms/Image.svg')
                          }}
                          alt=''
                          className='w-100 card-rounded'
                        />
                      </div>
                      <div className='overlay-layer-stick-bottom card-rounded align-items-end justify-content-center'>
                        <div className='col-lg-12 px-5 mt-10 mb-4 text-muted'>
                          <h6 className='text-light'>
                            <i className='bi bi-qr-code-scan text-light me-2'></i>
                            {value.code_item}
                          </h6>
                          <h4 className='text-light'>
                            <i className='bi bi-tag-fill text-light me-2'></i>
                            {value.item_name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {BannerWidget}
