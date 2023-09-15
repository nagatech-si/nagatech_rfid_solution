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
import * as soldItemRedux from '../../rfid/sold_item/redux/soldItemRedux'
import {KTSVG} from '../../../../_metronic/helpers'
import {
  BasicDateVerticalFormik,
  BasicInputVerticalFormik,
  BasicSelectVerticalFormik,
} from '../../../modules/Formik/Component/basicInput'
import {IResponseReportItem} from '../../item/add/model/ItemModel'
import {ITray} from '../../master/tray/model/TrayModel'
import ReportSoldItemPDF from './report/reportSoldItemPDF'
import {decreaseDay, getStringDateOnly} from '../../../../_metronic/helpers/dateHelper'
import ReportSoldItemExcel from './report/reportSoldItemExcel'
import {IRequestReportSoldItem} from './model/soldItemModel'

type Props = {
  className: string
}

const ReportSoldItemWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IResponseReportItem[] = useSelector<RootState>(
    ({soldItem}) => soldItem.reportData
  ) as IResponseReportItem[]

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
      dataField: 'tag_id',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TAG'})}),
      sort: true,
      headerStyle: () => {
        return {
          width: '10%',
        }
      },
    },
    {
      dataField: 'kode_toko',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TRAY'})}),
      sort: true,
    },
    {
      dataField: 'berat',
      text: intl.formatMessage({id: 'WEIGHT'}),
      sort: true,
    },
    {
      dataField: 'kadar',
      text: intl.formatMessage({id: 'WEIGHT'}),
      sort: true,
    },
    {
      dataField: 'kode_intern',
      text: intl.formatMessage({id: 'INTERNAL.CODE'}),
      sort: true,
    },
    {
      dataField: 'input_by',
      text: intl.formatMessage({id: 'INPUT.BY'}),
      sort: true,
    },
  ]

  const handleSubmit = async (
    values: IRequestReportSoldItem,
    actions: FormikHelpers<IRequestReportSoldItem>
  ) => {
    try {
      dispatch(soldItemRedux.actions.fetchReportSoldItem(values))
    } catch (error) {
      console.log(error)
    }
  }

  const soldItemTypeSchema = Yup.object().shape({
    kode_baki: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    kode_barcode: Yup.string().nullable(),
    startDate: Yup.date().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    endDate: Yup.date().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
  })

  return (
    <>
      <Formik
        initialValues={{
          startDate: decreaseDay(new Date(), 7),
          endDate: new Date(),
          kode_baki: '',
          kode_barcode: 'ALL',
        }}
        validationSchema={soldItemTypeSchema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<IRequestReportSoldItem>) => (
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
                    <BasicInputVerticalFormik
                      label={intl.formatMessage({id: 'BARCODE'})}
                      name='kode_barcode'
                    />
                  </div>
                  <div className='col-lg-3'>
                    <BasicSelectVerticalFormik
                      label={intl.formatMessage(
                        {id: 'BASE.CODE'},
                        {name: intl.formatMessage({id: 'TRAY'})}
                      )}
                      name='kode_baki'
                      options={trayDatas.map((value) => {
                        return {
                          value: value.kode_baki,
                          label: value.kode_baki,
                        }
                      })}
                      defaultValue={formik.values.kode_baki}
                      showAllOption
                      allLabel='SEMUA'
                      allValue='ALL'
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
                <div className={data.length > 1 ? 'row mt-5' : 'row mt-5 d-none'}>
                  <div className='col-lg-6'>
                    <ReportSoldItemExcel
                      data={data}
                      startDate={getStringDateOnly(formik.values.startDate, 'IDN')}
                      endDate={getStringDateOnly(formik.values.endDate, 'IDN')}
                      kode_baki={formik.values.kode_baki}
                    />
                  </div>
                  <div className='col-lg-6'>
                    <button
                      type='button'
                      className='btn btn-danger w-100'
                      onClick={() => {
                        ReportSoldItemPDF(
                          data,
                          getStringDateOnly(formik.values.startDate, 'IDN'),
                          getStringDateOnly(formik.values.endDate, 'IDN'),
                          `${intl.formatMessage({id: 'TRAY'}).toUpperCase()} : ${
                            formik.values.kode_baki
                          }`
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

export {ReportSoldItemWidget}
