/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {MixedWidget1, StatisticsWidget5} from '../../../_metronic/partials/widgets'
import * as dashboardRedux from './redux/dashboardRexux'
import * as toolbarRedux from '../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {ICustomer} from '../../modules/user/customer-active/model/CustomerActiveModel'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {IItem} from '../../modules/items/master-line/model/MasterLineModel'
import {IClosingPO} from '../../modules/user/closing-po/model/ClosingPOModel'
import * as closingPORedux from '../../modules/user/closing-po/redux/ClosingPORedux'

const DashboardPage: FC = () => {
  const totalRegistered: number = useSelector<RootState>(
    ({dashbord}) => dashbord.totalRegistered
  ) as number
  const totalShowroom: number = useSelector<RootState>(
    ({dashbord}) => dashbord.totalShowroom
  ) as number
  const totalCustomerActive = useSelector<RootState>(
    ({dashbord}) => dashbord.totalCustomerActive
  ) as number
  const customerData: ICustomer[] = useSelector<RootState>(
    ({dashbord}) => dashbord.customerData
  ) as ICustomer[]
  const showroomDatas: IItem[] = useSelector<RootState>(
    ({dashbord}) => dashbord.showroom
  ) as IItem[]
  const masterLine: IItem[] = useSelector<RootState>(({dashbord}) => dashbord.masterLine) as IItem[]
  const totalPO: IClosingPO[] = useSelector<RootState>(({closePO}) => closePO.data) as IClosingPO[]

  const intl = useIntl()
  return (
    <>
      {/* begin::Row */}
      <div className='row'>
        {/* begin::Row */}
        <div className='row'>
          <div className='col-xl-3'>
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8 border rounded'
              svgIcon='/media/icons/duotune/ecommerce/ecm009.svg'
              color='white'
              iconColor='primary'
              title={totalRegistered.toString()}
              description={intl.formatMessage({id: 'TOTAL.GOODS.REGISTERED'})}
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              svgIcon='/media/icons/duotune/ecommerce/ecm004.svg'
              color='dark'
              iconColor='white'
              title={totalShowroom.toString()}
              description={intl.formatMessage({id: 'TOTAL.GOODS.SHOWROOM'})}
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              svgIcon='/media/icons/duotune/communication/com006.svg'
              color='warning'
              iconColor='white'
              title={totalCustomerActive.toString()}
              description={intl.formatMessage({id: 'REQUEST.CUSTOMER.ACTIVATION'})}
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget5
              className='card-xl-stretch mb-5 mb-xl-8'
              svgIcon='/media/icons/duotune/ecommerce/ecm002.svg'
              color='info'
              iconColor='white'
              title={totalPO.length.toString() ?? '0'}
              description={intl.formatMessage({id: 'CLOSING.PO.REQUEST'})}
            />
          </div>
        </div>
        <div className='card mb-5'>
          <div className='card-header border-0 mt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bolder text-dark'>
                {intl.formatMessage(
                  {id: 'SUFFIX.ITEM'},
                  {name: intl.formatMessage({id: 'SHOWROOM'})}
                )}
              </span>
              <span className='text-muted mt-1 fw-bold fs-7'>
                {intl.formatMessage({id: 'LAST.4.ITEM'})}
              </span>
            </h3>
          </div>
          <div className='card-body pt-5 mb-5'>
            <div className='row'>
              {showroomDatas.length > 0 ? (
                showroomDatas.map((value: IItem) => {
                  return (
                    <div className={`col-lg-3`}>
                      <div className='card overlay overlay-show border border-2 ribbon ribbon-top ribbon-vertical'>
                        <div
                          className={
                            value.status_active === 'VALID'
                              ? 'ribbon-label bg-primary'
                              : 'ribbon-label bg-danger'
                          }
                        >
                          {value.status_active === 'VALID' ? 'SR' : 'ML'}
                        </div>
                        <div className='card-body p-0'>
                          <div className='overlay-wrapper'>
                            <img
                              src={value.gambar?.length > 0 ? value.gambar[0].lokasi_gambar : '-'}
                              alt={value.code_item}
                              onError={({currentTarget}) => {
                                currentTarget.onerror = null // prevents looping
                                currentTarget.src = toAbsoluteUrl(
                                  '/media/svg/unitedpalms/Image.svg'
                                )
                              }}
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
                  )
                })
              ) : (
                <div className='row justify-content-center text-center'>
                  <img
                    alt='empty'
                    className='w-250px'
                    src={toAbsoluteUrl('/media/svg/unitedpalms/Search-find.svg')}
                  />
                  <h5>It's empty ? add some item on item area</h5>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='card mb-5 mt-5'>
          <div className='card-header border-0 mt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bolder text-dark'>
                {intl.formatMessage(
                  {id: 'SUFFIX.ITEM'},
                  {name: intl.formatMessage({id: 'MASTER.LINE'})}
                )}
              </span>
              <span className='text-muted mt-1 fw-bold fs-7'>
                {intl.formatMessage({id: 'LAST.4.ITEM'})}
              </span>
            </h3>
          </div>
          <div className='card-body pt-5 mb-5'>
            <div className='row'>
              {masterLine.filter((value) => value.status_show === 'OPEN').length > 0 ? (
                masterLine
                  .filter((value) => value.status_show === 'OPEN')
                  .map((value: IItem) => {
                    return (
                      <div className={`col-lg-3`}>
                        <div className='card overlay overlay-show border border-2 ribbon ribbon-top ribbon-vertical'>
                          <div
                            className={
                              value.status_active === 'VALID'
                                ? 'ribbon-label bg-primary'
                                : 'ribbon-label bg-danger'
                            }
                          >
                            {value.status_active === 'VALID' ? 'SR' : 'ML'}
                          </div>
                          <div className='card-body p-0'>
                            <div className='overlay-wrapper'>
                              <img
                                src={value.gambar?.length > 0 ? value.gambar[0].lokasi_gambar : '-'}
                                alt={value.code_item}
                                onError={({currentTarget}) => {
                                  currentTarget.onerror = null // prevents looping
                                  currentTarget.src = toAbsoluteUrl(
                                    '/media/svg/unitedpalms/Image.svg'
                                  )
                                }}
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
                    )
                  })
              ) : (
                <div className='row justify-content-center text-center'>
                  <img
                    alt='empty'
                    className='w-250px'
                    src={toAbsoluteUrl('/media/svg/unitedpalms/Search-find.svg')}
                  />
                  <h5>It's empty ? add some item on item area</h5>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='row'>
          {/* begin::Col */}
          <div className='col-xl-6'>
            <MixedWidget1
              className='card-xl-stretch mb-xl-8'
              color='primary'
              name={intl.formatMessage(
                {id: 'SUFFIX.ACTIVE'},
                {name: intl.formatMessage({id: 'CUSTOMER'})}
              )}
              valueTitle={intl.formatMessage(
                {id: 'SUFFIX.ACTIVE'},
                {name: intl.formatMessage({id: 'CUSTOMER'})}
              )}
              title={intl.formatMessage({id: 'VIEW.PRODUK'})}
              datas={customerData.map((value) => {
                return {
                  title: value.nama_customer,
                  subtitle: 'Total Activity',
                  value: value.total?.toString() ?? '0',
                }
              })}
            />
          </div>
          {/* end::Col */}

          {/* begin::Col */}
          <div className='col-xl-6'>
            <MixedWidget1
              className='card-xl-stretch mb-xl-8'
              color='danger'
              name={intl.formatMessage(
                {id: 'SUFFIX.ACTIVE'},
                {name: intl.formatMessage({id: 'REGION'})}
              )}
              valueTitle={intl.formatMessage(
                {id: 'SUFFIX.ACTIVE'},
                {name: intl.formatMessage({id: 'REGION'})}
              )}
              title={intl.formatMessage({id: 'VIEW.PRODUK'})}
              datas={customerData.map((value) => {
                return {
                  title: value.negara,
                  subtitle: '',
                  value: '',
                }
              })}
            />
          </div>
          {/* end::Col */}
        </div>
      </div>
      {/* end::Row */}
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(dashboardRedux.actions.fetchShowroom())
    dispatch(dashboardRedux.actions.fetchRegistered())
    dispatch(dashboardRedux.actions.fetchAllCustomerActive())
    dispatch(dashboardRedux.actions.fetchTopCustomer())
    dispatch(dashboardRedux.actions.fetchLastShowroom())
    dispatch(closingPORedux.actions.fetchAllOpenPO())
    dispatch(toolbarRedux.actions.SetModalToolbarName('EMPTY'))
  }, [dispatch])
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
