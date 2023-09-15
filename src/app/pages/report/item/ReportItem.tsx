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
import * as itemRedux from '../../item/add/redux/ItemRedux'
import {KTSVG} from '../../../../_metronic/helpers'
import {
  BasicDateVerticalFormik,
  BasicSelectVerticalFormik,
} from '../../../modules/Formik/Component/basicInput'
import {IType} from '../../master/type/model/TypeModel'
import {IRequestReportItem, IResponseReportItem} from '../../item/add/model/ItemModel'
import {ITray} from '../../master/tray/model/TrayModel'
import {IWarehouse} from '../../master/warehouse/model/WarehouseModel'
import ReportItemPDF from './report/reportItemPDF'
import {decreaseDay, getStringDateOnly} from '../../../../_metronic/helpers/dateHelper'
import ReportItemExcel from './report/reportItemExcel'

type Props = {
  className: string
}

const ReportItemWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IResponseReportItem[] = useSelector<RootState>(
    ({items}) => items.reportData
  ) as IResponseReportItem[]
  const warehouseData: IWarehouse[] = useSelector<RootState>(
    ({warehouse}) => warehouse.data
  ) as IWarehouse[]
  const typeDatas: IType[] = useSelector<RootState>(({type}) => type.data) as IType[]
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
      dataField: 'kode_gudang',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'WAREHOUSE'})}),
      sort: true,
    },
    {
      dataField: 'kode_toko',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TRAY'})}),
      sort: true,
    },
    {
      dataField: 'kode_dept',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TYPE'})}),
      sort: true,
    },
    {
      dataField: 'kode_intern',
      text: intl.formatMessage({id: 'INTERNAL.CODE'}),
      sort: true,
    },
    {
      dataField: 'berat',
      text: intl.formatMessage({id: 'WEIGHT'}),
      sort: true,
    },

    {
      dataField: 'input_by',
      text: intl.formatMessage({id: 'INPUT.BY'}),
      sort: true,
    },
  ]

  const handleSubmit = async (
    values: IRequestReportItem,
    actions: FormikHelpers<IRequestReportItem>
  ) => {
    try {
      dispatch(itemRedux.actions.fetchReportItem(values))
    } catch (error) {
      console.log(error)
    }
  }

  const itemTypeSchema = Yup.object().shape({
    kode_gudang: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    kode_jenis: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    kode_baki: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
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
          kode_gudang: '',
          kode_jenis: '',
        }}
        validationSchema={itemTypeSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik: FormikProps<IRequestReportItem>) => (
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
                  <div className='col-lg-6'>
                    <BasicDateVerticalFormik label='Tanggal Dari' name='startDate' />
                  </div>

                  <div className='col-lg-6'>
                    <BasicDateVerticalFormik label='Tanggal Sampai' name='endDate' />
                  </div>

                  <div className='col-lg-4'>
                    <BasicSelectVerticalFormik
                      label={intl.formatMessage(
                        {id: 'BASE.CODE'},
                        {name: intl.formatMessage({id: 'WAREHOUSE'})}
                      )}
                      name='kode_gudang'
                      options={warehouseData.map((value) => {
                        return {
                          value: value.kode_gudang,
                          label: value.kode_gudang,
                        }
                      })}
                      defaultValue={formik.values.kode_gudang}
                      showAllOption
                      allLabel='SEMUA'
                      allValue='ALL'
                    />
                  </div>
                  <div className='col-lg-4'>
                    <BasicSelectVerticalFormik
                      label={intl.formatMessage(
                        {id: 'BASE.CODE'},
                        {name: intl.formatMessage({id: 'TYPE'})}
                      )}
                      name='kode_jenis'
                      options={typeDatas.map((value) => {
                        return {
                          value: value.kode_jenis,
                          label: value.kode_jenis,
                        }
                      })}
                      defaultValue={formik.values.kode_jenis}
                      showAllOption
                      allLabel='SEMUA'
                      allValue='ALL'
                    />
                  </div>
                  <div className='col-lg-4'>
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
                    <ReportItemExcel
                      data={data}
                      endDate={getStringDateOnly(formik.values.startDate, 'IDN')}
                      startDate={getStringDateOnly(formik.values.endDate, 'IDN')}
                    />
                  </div>
                  <div className='col-lg-6'>
                    <button
                      type='button'
                      className='btn btn-danger w-100'
                      onClick={() => {
                        ReportItemPDF(
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

export {ReportItemWidget}
