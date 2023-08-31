/* eslint-disable jsx-a11y/anchor-is-valid */
/*eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as masterLineRedux from './redux/MasterLineRedux'
import * as sampleTypeRedux from '../../master/sample-type/redux/sampleTypeRedux'
import * as uploadNewRedux from '../upload-new/redux/UploadNewRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {RootState} from '../../../../setup'
import {IItem, IRequestItemLine} from './model/MasterLineModel'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import ReactTooltip from 'react-tooltip'
import RangeSlider from 'react-bootstrap-range-slider'
import Select, {ActionMeta, CSSObjectWithLabel, SingleValue} from 'react-select'
import {useFormik} from 'formik'
import {ISampleType} from '../../master/sample-type/model/SampleTypeModel'
import Pagination from '../../../../_metronic/helpers/components/PaginationWidget'
import {ViewDetailWidget} from '../showroom/component/ViewDetail'
import {ScrollTopComponent} from '../../../../_metronic/assets/ts/components'
import {useIntl} from 'react-intl'
import Swal from 'sweetalert2'
import {removeKeys} from '../../../../_metronic/helpers/id_remover'

type Props = {
  className: string
}

const MasterLineWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const [rangeValue, setValue] = useState('3')
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState(null)
  const [loadingMove, setLoadingMove] = useState(false)
  const [showDetail, setShowDetail] = useState<IItem | null>(null)
  const itemDatas: IItem[] = useSelector<RootState>(({item}) => item.data) as IItem[]
  const totalData: number = useSelector<RootState>(({item}) => item.totalData) as number
  const sampleTypeDatas: ISampleType[] = useSelector<RootState>(
    ({sampleType}) => sampleType.data
  ) as ISampleType[]
  useEffect(() => {
    dispatch(toolbarRedux.actions.SetModalToolbarName('EMPTY'))
    dispatch(sampleTypeRedux.actions.fetchAllSampleType())
    dispatch(
      masterLineRedux.actions.fetchAllItem({
        item_name: '',
        category: 'ALL',
        limit_finish_weight: 0,
        limit_from: currentPage - 1,
        limit_item: currentPage * pageSize,
        limit_start_weight: 0,
      })
    )
  }, [dispatch])
  const formik = useFormik<IRequestItemLine>({
    enableReinitialize: true,
    initialValues: {
      item_name: '',
      category: 'ALL',
      limit_finish_weight: 0,
      limit_from: 0,
      limit_item: 10000,
      limit_start_weight: 0,
    },
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        dispatch(
          masterLineRedux.actions.fetchAllItem({
            item_name: values.item_name,
            category: values.category,
            limit_finish_weight: values.limit_finish_weight,
            limit_from: (currentPage - 1) * pageSize,
            limit_item: pageSize,
            limit_start_weight: values.limit_start_weight,
          })
        )
        setLoading(false)
      })
    },
  })
  const pageSize = 20

  function handlePageChange(page: number) {
    setCurrentPage(page)
    dispatch(
      masterLineRedux.actions.fetchAllItem({
        item_name: formik.values.item_name,
        category: formik.values.category,
        limit_finish_weight: formik.values.limit_finish_weight,
        limit_from: (page - 1) * pageSize,
        limit_item: pageSize,
        limit_start_weight: formik.values.limit_start_weight,
      })
    )
  }
  const [currentPage, setCurrentPage] = useState(1)

  const currentTableData = useMemo(() => {
    return itemDatas
  }, [currentPage, itemDatas])
  const intl = useIntl()
  return (
    <div className={`card ${className}`}>
      <ReactTooltip />
      {showDetail !== null ? (
        <div className='card-body p-10'>
          <button
            className='btn btn-light-primary mb-5'
            onClick={() => {
              setShowDetail(null)
            }}
          >
            <i className='bi bi-arrow-left-short me-3' />
            Back
          </button>
          <ViewDetailWidget itemData={showDetail} />
        </div>
      ) : (
        <div className='card-body p-10'>
          <div className='input-group mb-3 form-control-solid'>
            <span className='input-group-text form-control-solid border-0'>
              <i className='bi bi-search' />
            </span>
            <input
              type='text'
              className='form-control form-control-lg form-control-solid'
              placeholder='Search'
              aria-label='Search'
              {...formik.getFieldProps('item_name')}
            />
          </div>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='row'>
              <div className='col-lg-3'>
                <div className='row mb-6 mt-6'>
                  <div className='col-lg-12 fv-row'>
                    <Select
                      name='category'
                      options={[
                        {
                          value: 'ALL',
                          label: 'All Data',
                        },
                        {
                          value: 'ML',
                          label: 'Master Line',
                        },
                        {
                          value: 'SR',
                          label: 'Showroom',
                        },
                        ...sampleTypeDatas.map((value: ISampleType) => {
                          return {
                            value: value.sample_type_code,
                            label: value.sample_type_name,
                          }
                        }),
                      ]}
                      styles={{
                        menu: (base: CSSObjectWithLabel) => ({...base, zIndex: 99999}),
                        control: (base: CSSObjectWithLabel) => ({
                          ...base,
                          minHeight: '48px',
                          backgroundColor: '#F5F8FA',
                          border: '1px solid #F5F8FA',
                          borderColor: '#F5F8FA',
                          boxShadow: '1px solid #F5F8FA',
                        }),
                      }}
                      value={location}
                      className='basic-select fw-bold customeselect'
                      classNamePrefix='form-select-solid'
                      placeholder='Select Location ...'
                      closeMenuOnSelect
                      onChange={function (
                        newValue: SingleValue<any>,
                        actionMeta: ActionMeta<any>
                      ): void {
                        setLocation(newValue)
                        formik.setFieldValue('category', newValue.value)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-3'>
                <div className='row mb-6 mt-6'>
                  <div className='col-lg-12 fv-row'>
                    <input
                      type='text'
                      key={'from'}
                      className='form-control form-control-lg form-control-solid'
                      placeholder='From Weight'
                      {...formik.getFieldProps('limit_start_weight')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-3'>
                <div className='row mb-6 mt-6'>
                  <div className='col-lg-12 fv-row'>
                    <input
                      type='text'
                      key={'to'}
                      className='form-control form-control-lg form-control-solid'
                      placeholder='To Weight'
                      {...formik.getFieldProps('limit_finish_weight')}
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-3'>
                <div className='row mb-6 mt-6'>
                  <div className='col-lg-12 fv-row'>
                    <button
                      type='submit'
                      className='form-control btn btn-light-primary fw-bolder w-100 mb-8'
                    >
                      {!loading && intl.formatMessage({id: 'FILTER.ITEM'})}
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
          </form>

          <div className='row mb-6'>
            <div className='col-lg-3'>
              <div className='row'>
                <div className='col-lg-1'>
                  <i className='bi bi-columns'></i>
                </div>

                <div className='col-lg-10'>
                  <RangeSlider
                    className='col-lg-12'
                    max={5}
                    min={3}
                    value={rangeValue}
                    tooltip='off'
                    onChange={(changeEvent) => setValue(changeEvent.target.value)}
                  />
                </div>
                <div className='col-lg-1'>
                  <i className='bi bi-columns-gap'></i>
                </div>
              </div>
            </div>
          </div>
          <div className='row gy-5 justify-content-center'>
            {itemDatas.length < 1 ? (
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
            ) : (
              <>
                {currentTableData.map((value: IItem, index) => {
                  return (
                    <div className={`col-lg-${rangeValue}`} key={`ITEMDETAIL_${index}`}>
                      <div className='card border border-2 ribbon ribbon-top ribbon-vertical overlay overflow-hidden'>
                        <div
                          className={
                            value.status_active === 'VALID'
                              ? 'ribbon-label bg-primary'
                              : 'ribbon-label bg-danger'
                          }
                        >
                          {value.status_active === 'VALID' ? 'SR' : 'ML'}
                        </div>
                        <div className='card card-custom overlay overflow-hidden'>
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
                                className='w-100 card-rounded card-img-top'
                              />
                            </div>
                            {value.status_show === 'VALID' ? null : (
                              <div className='overlay-layer bg-dark bg-opacity-50 align-items-start justify-content-end z-index-3'>
                                <a
                                  href={'/item/upload-new'}
                                  onClick={() => {
                                    delete value.__v
                                    delete value.input_by
                                    delete value.input_date
                                    delete value.status_active
                                    delete value.status_show
                                    delete value.tgl_show
                                    delete value.edit_by
                                    delete value.edit_date
                                    delete value.active_date
                                    delete value.sample_type_name
                                    delete value.deskripsi_banner
                                    delete value.total_material_weight
                                    localStorage.setItem(
                                      'prevUpload',
                                      JSON.stringify(removeKeys(value, '_id'))
                                    )
                                    localStorage.setItem('prevUploadPosition', '2')
                                    localStorage.setItem('uploadType', 'EDIT')
                                    dispatch(uploadNewRedux.actions.setEditItem())
                                  }}
                                  className=' btn btn-icon btn-facebook me-2 mt-2'
                                >
                                  <i className='bi bi-pencil-fill' />
                                </a>

                                <a
                                  href={'/item/upload-new'}
                                  onClick={() => {
                                    delete value.__v
                                    delete value.input_by
                                    delete value.input_date
                                    delete value.status_active
                                    delete value.status_show
                                    delete value.tgl_show
                                    delete value.edit_by
                                    delete value.edit_date
                                    delete value.active_date
                                    delete value.sample_type_name
                                    delete value.deskripsi_banner
                                    delete value.total_material_weight
                                    localStorage.setItem(
                                      'prevUpload',
                                      JSON.stringify(removeKeys(value, '_id'))
                                    )
                                    localStorage.setItem('prevUploadPosition', '1')
                                    localStorage.setItem('uploadType', 'DUPLICATE')
                                    dispatch(uploadNewRedux.actions.setDuplicateItem())
                                  }}
                                  className='btn btn-icon btn-twitter me-2 mt-2'
                                >
                                  <i className='bi bi-clipboard-fill' />
                                </a>
                                <button
                                  onClick={() => {
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
                                        dispatch(
                                          masterLineRedux.actions.deleteMasterline(value.code_item)
                                        )
                                      }
                                    })
                                  }}
                                  type={'button'}
                                  className='btn btn-icon btn-google me-2 mt-2'
                                >
                                  <i className='bi bi-trash-fill' />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='card-body'>
                          <h5 className='card-title'>{value.item_name}</h5>
                          <h6 className=''>
                            <i className='bi bi-qr-code-scan me-2' />
                            {value.code_item}
                          </h6>
                          <div className='text-center mt-5'>
                            <button
                              type='button'
                              className='btn btn-icon btn-facebook me-3'
                              data-tip={
                                value.status_active === 'VALID'
                                  ? intl.formatMessage({id: 'ADD.TO.MASTER_LINE'})
                                  : intl.formatMessage({id: 'ADD.TO.SHOWROOM'})
                              }
                              onClick={async () => {
                                setLoadingMove(true)
                                setTimeout(() => {
                                  value.status_active === 'VALID'
                                    ? dispatch(
                                        masterLineRedux.actions.moveMasterline(value.code_item)
                                      )
                                    : dispatch(
                                        masterLineRedux.actions.moveShowroom(value.code_item)
                                      )
                                  setLoadingMove(false)
                                }, 500)
                              }}
                            >
                              {!loadingMove && (
                                <i
                                  className={
                                    value.status_active === 'VALID'
                                      ? 'bi bi-diagram-2-fill'
                                      : 'las la-truck-loading'
                                  }
                                />
                              )}
                              {loadingMove && (
                                <span className='indicator-progress' style={{display: 'block'}}>
                                  <span className='spinner-border spinner-border-sm align-middle' />
                                </span>
                              )}
                            </button>
                            <button
                              type='button'
                              className='btn btn-icon btn-twitter'
                              data-tip={intl.formatMessage({id: 'VIEW.DETAIL.ITEM'})}
                              onClick={() => {
                                setShowDetail(value)
                                ScrollTopComponent.goTop()
                              }}
                            >
                              <i className='bi bi-clipboard-data'></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>
          <div className='mt-5'>
            <Pagination
              currentPage={currentPage}
              totalCount={totalData}
              pageSize={pageSize}
              onPageChange={(page) => handlePageChange(page)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export {MasterLineWidget}
