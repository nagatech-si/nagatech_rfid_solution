/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as Yup from 'yup'
import {RootState} from '../../../../setup'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {Form, Formik, FormikHelpers, FormikProps} from 'formik'

import * as groupRedux from '../../master/group/redux/GroupRedux'
import * as typeRedux from '../../master/type/redux/TypeRedux'
import * as warehouseRedux from '../../master/warehouse/redux/WarehouseRedux'
import * as moveItemRedux from '../../rfid/move_item/redux/moveItemRedux'
import {KTSVG} from '../../../../_metronic/helpers'
import {
  BasicDateVerticalFormik,
  BasicSelectVerticalFormik,
} from '../../../modules/Formik/Component/basicInput'
import {IResponseReportItem} from '../../item/add/model/ItemModel'
import ReportShatterItemPDF from './report/reportMoveItemPDF'
import {
  decreaseDay,
  formatDateWithTime,
  getStringDateOnly,
} from '../../../../_metronic/helpers/dateHelper'
import ReportShatterItemExcel from './report/reportMoveItemExcel'
import {IRequestReportMoveItem} from '../../rfid/move_item/model/moveItemModel'
import {IGroup} from '../../master/group/model/GroupModel'
import {ITray} from '../../master/tray/model/TrayModel'

type Props = {
  className: string
}

const ReportMoveItemWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IResponseReportItem[] = useSelector<RootState>(
    ({moveItem}) => moveItem.reportData
  ) as IResponseReportItem[]
  const groupDatas: IGroup[] = useSelector<RootState>(({group}) => group.data) as IGroup[]
  const trayDatas: ITray[] = useSelector<RootState>(({tray}) => tray.data) as ITray[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('EMPTY'))
    dispatch(toolbar.actions.SetFocusName('nama_barang'))
    dispatch(groupRedux.actions.fetchAllGroup())
    dispatch(typeRedux.actions.fetchAllType())
    dispatch(warehouseRedux.actions.fetchAllWarehouse())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'no_pindah',
      text: intl.formatMessage({id: 'NO.SHATTER'}),
      sort: true,
    },
    {
      dataField: 'kode_barcode',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'BARCODE'})}),
      sort: true,
    },
    {
      dataField: 'nama_barang',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'ITEM'})}),
      sort: true,
      headerStyle: () => {
        return {
          width: '15%',
        }
      },
    },
    {
      dataField: 'input_date',
      text: intl.formatMessage({id: 'INPUT.DATE'}),
      sort: true,
      formatter: (value) => formatDateWithTime(value),
    },
    {
      dataField: 'kode_baki',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TRAY'})}),
      sort: true,
    },
    {
      dataField: 'berat',
      text: intl.formatMessage({id: 'WEIGHT'}),
      sort: true,
    },
  ]

  const handleSubmit = async (
    values: IRequestReportMoveItem,
    actions: FormikHelpers<IRequestReportMoveItem>
  ) => {
    try {
      dispatch(moveItemRedux.actions.fetchReportMoveItem(values))
    } catch (error) {
      console.log(error)
    }
  }

  const soldItemTypeSchema = Yup.object().shape({
    kode_baki_asal: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    kode_baki_tujuan: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    kode_group: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    startDate: Yup.date().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    endDate: Yup.date().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
  })

  return (
    <>
      <Formik
        initialValues={{
          startDate: decreaseDay(new Date(), 7),
          endDate: new Date(),
          kode_baki_asal: '',
          kode_baki_tujuan: '',
          kode_group: '',
        }}
        validationSchema={soldItemTypeSchema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<IRequestReportMoveItem>) => (
          <Form noValidate>
            <div className={`card ${className} shadow`}>
              {/* begin::Body */}

              <div className='card-header'>
                <h3 className='card-title'>Pencarian</h3>
                <div className='card-toolbar'>
                  <button
                    type='button'
                    className='btn btn-sm btn-light'
                    onClick={() => {
                      formik.resetForm()
                    }}
                  >
                    {intl.formatMessage({id: 'REFRESH'})}
                  </button>
                </div>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-lg-3'>
                    <BasicDateVerticalFormik label='Tanggal Dari' name='startDate' />
                  </div>

                  <div className='col-lg-3'>
                    <BasicDateVerticalFormik label='Tanggal Sampai' name='endDate' />
                  </div>

                  <div className='col-lg-3'>
                    <BasicSelectVerticalFormik
                      label={intl.formatMessage(
                        {id: 'BASE.CODE'},
                        {name: intl.formatMessage({id: 'GROUP'})}
                      )}
                      name='kode_group'
                      options={groupDatas.map((values) => {
                        return {
                          value: values.kode_group,
                          label: values.kode_group,
                        }
                      })}
                      allLabel='Semua'
                      allValue='ALL'
                      showAllOption
                    />
                  </div>
                  <div className='col-lg-3'>
                    <BasicSelectVerticalFormik
                      label={intl.formatMessage({id: 'TRAY.FROM'})}
                      name='kode_baki_asal'
                      options={trayDatas.map((values) => {
                        return {
                          value: values.kode_baki,
                          label: values.kode_baki,
                        }
                      })}
                      allLabel='Semua'
                      allValue='ALL'
                      showAllOption
                    />
                  </div>
                  <div className='col-lg-3'>
                    <BasicSelectVerticalFormik
                      label={intl.formatMessage({id: 'TRAY.TO'})}
                      name='kode_baki_tujuan'
                      options={trayDatas.map((values) => {
                        return {
                          value: values.kode_baki,
                          label: values.kode_baki,
                        }
                      })}
                      allLabel='Semua'
                      allValue='ALL'
                      showAllOption
                    />
                  </div>

                  <div className='col-lg-12 mt-4'>
                    <div className='mb-3'>
                      <button
                        type='submit'
                        className='form-control form-control-lg btn btn-primary'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen021.svg'
                          className='svg-icon-muted sf-5'
                        />
                        {intl.formatMessage({id: 'SEARCH'})}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`card ${className} shadow`}>
              {/* begin::Body */}
              <div className='card-body p-10'>
                {/* begin::Table container */}
                <GlobalTable columns={columns} data={data} keyField='kode_barcode' />
                <div
                  className={
                    data.length > 1
                      ? 'col-lg-12 mt-5 justify-content-end text-end'
                      : 'col-lg-12 mt-5 justify-content-end text-end d-none'
                  }
                >
                  <h3>Total Qty : {data.length}</h3>
                </div>
                <div className={data.length > 0 ? 'row mt-5' : 'row mt-5 d-none'}>
                  <div className='col-lg-6'>
                    <ReportShatterItemExcel
                      data={data}
                      startDate={getStringDateOnly(formik.values.startDate, 'IDN')}
                      endDate={getStringDateOnly(formik.values.endDate, 'IDN')}
                    />
                  </div>
                  <div className='col-lg-6'>
                    <button
                      type='button'
                      className='btn btn-danger w-100'
                      onClick={() => {
                        ReportShatterItemPDF(
                          data,
                          getStringDateOnly(formik.values.startDate, 'IDN'),
                          getStringDateOnly(formik.values.endDate, 'IDN')
                        )
                      }}
                    >
                      Export PDF
                    </button>
                  </div>
                </div>
              </div>
              {/* begin::Body */}
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export {ReportMoveItemWidget}
