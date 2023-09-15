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
import * as shatterItemRedux from '../../rfid/shatter_item/redux/shatterItemRedux'
import {KTSVG} from '../../../../_metronic/helpers'
import {
  BasicDateVerticalFormik,
  BasicInputVerticalFormik,
} from '../../../modules/Formik/Component/basicInput'
import {IResponseReportItem} from '../../item/add/model/ItemModel'
import ReportShatterItemPDF from './report/reportShatterItemPDF'
import {
  decreaseDay,
  formatDateWithTime,
  getStringDateOnly,
} from '../../../../_metronic/helpers/dateHelper'
import ReportShatterItemExcel from './report/reportShatterItemExcel'
import {IReqeustReportShatterItem} from './model/shatterModel'

type Props = {
  className: string
}

const ReportShatterItemWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IResponseReportItem[] = useSelector<RootState>(
    ({shatterItem}) => shatterItem.reportData
  ) as IResponseReportItem[]

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
      dataField: 'no_hancur',
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
    values: IReqeustReportShatterItem,
    actions: FormikHelpers<IReqeustReportShatterItem>
  ) => {
    try {
      dispatch(shatterItemRedux.actions.fetchReportShatterItem(values))
    } catch (error) {
      console.log(error)
    }
  }

  const soldItemTypeSchema = Yup.object().shape({
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
          kode_barcode: 'ALL',
        }}
        validationSchema={soldItemTypeSchema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<IReqeustReportShatterItem>) => (
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
                  <div className='col-lg-4'>
                    <BasicDateVerticalFormik label='Tanggal Dari' name='startDate' />
                  </div>

                  <div className='col-lg-4'>
                    <BasicDateVerticalFormik label='Tanggal Sampai' name='endDate' />
                  </div>
                  <div className='col-lg-4'>
                    <BasicInputVerticalFormik
                      label={intl.formatMessage({id: 'BARCODE'})}
                      name='kode_barcode'
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

export {ReportShatterItemWidget}
