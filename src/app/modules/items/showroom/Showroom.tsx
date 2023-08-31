/* eslint-disable jsx-a11y/anchor-is-valid */
/*eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as showroomRedux from './redux/ShowroomRedux'
import * as masterlineRedux from '../master-line/redux/MasterLineRedux'
import * as sampleTypeRedux from '../../master/sample-type/redux/sampleTypeRedux'
import {RootState} from '../../../../setup'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import ReactTooltip from 'react-tooltip'
import RangeSlider from 'react-bootstrap-range-slider'
import {useFormik} from 'formik'
import Pagination from '../../../../_metronic/helpers/components/PaginationWidget'
import {IItem, IRequestItemLine} from '../master-line/model/MasterLineModel'
import {ViewDetailWidget} from './component/ViewDetail'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'

type Props = {
  className: string
}

const ShowroomWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const [rangeValue, setValue] = useState('3')
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showDetail, setShowDetail] = useState<IItem | null>(null)
  const pageSize = 20
  const itemDatas: IItem[] = useSelector<RootState>(
    ({itemShowroom}) => itemShowroom.data
  ) as IItem[]
  const totalData: number = useSelector<RootState>(
    ({itemShowroom}) => itemShowroom.totalData
  ) as number

  useEffect(() => {
    dispatch(toolbarRedux.actions.SetModalToolbarName('EMPTY'))
    dispatch(sampleTypeRedux.actions.fetchAllSampleType())
    dispatch(
      showroomRedux.actions.fetchAllItemShowroom({
        item_name: '',
        category: 'SR',
        limit_finish_weight: 0,
        limit_from: currentPage - 1 ?? 0,
        limit_item: pageSize,
        limit_start_weight: 0,
      })
    )
  }, [dispatch])

  const formik = useFormik<IRequestItemLine>({
    enableReinitialize: true,
    initialValues: {
      item_name: '',
      category: 'SR',
      limit_finish_weight: 0,
      limit_from: 0,
      limit_item: 10000,
      limit_start_weight: 0,
    },
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        dispatch(
          showroomRedux.actions.fetchAllItemShowroom({
            item_name: values.item_name,
            category: values.category,
            limit_finish_weight: values.limit_finish_weight,
            limit_from: (currentPage - 1) * pageSize,
            limit_item: pageSize,
            limit_start_weight: values.limit_start_weight,
          })
        )
        setLoading(false)
        formik.resetForm()
      })
    },
  })

  function handlePageChange(page: number) {
    setCurrentPage(page)
    dispatch(
      showroomRedux.actions.fetchAllItemShowroom({
        item_name: formik.values.item_name,
        category: formik.values.category,
        limit_finish_weight: formik.values.limit_finish_weight,
        limit_from: (page - 1) * pageSize,
        limit_item: pageSize,
        limit_start_weight: formik.values.limit_start_weight,
      })
    )
  }

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
            <i className='bi bi-arrow-left-short me-3'></i>Back
          </button>
          <ViewDetailWidget itemData={showDetail} />
        </div>
      ) : (
        <></>
      )}
      {/* begin::Body */}
      <div className='card-body p-10'>
        <div className='input-group mb-3 form-control-solid'>
          <span className='input-group-text form-control-solid border-0'>
            <i className='bi bi-search'></i>
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
            {/* <div className='col-lg-3'>
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
                    isClearable
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
            </div> */}
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
                    {!loading && 'Filter Items'}
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
          ) : null}
          {itemDatas.map((value: IItem) => {
            return (
              <div className={`col-lg-${rangeValue}`}>
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
                          currentTarget.src = toAbsoluteUrl('/media/svg/unitedpalms/Image.svg')
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
                        <div className='col-lg-12 px-5 mt-4 mb-4 text-center'>
                          <button
                            type='button'
                            className='btn btn-icon btn-facebook me-3'
                            data-tip='Add To Master Line'
                            onClick={() => {
                              dispatch(masterlineRedux.actions.moveMasterline(value.code_item))
                            }}
                          >
                            <i className='las la-truck-loading'></i>
                          </button>

                          <button
                            type='button'
                            className='btn btn-icon btn-twitter'
                            data-tip='View Detail Item'
                            onClick={() => {
                              setShowDetail(value)
                            }}
                          >
                            <i className='bi bi-clipboard-data'></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
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
      {/* begin::Body */}
    </div>
  )
}

export {ShowroomWidget}
