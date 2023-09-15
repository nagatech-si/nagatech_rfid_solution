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
import * as opnameRedux from '../../rfid/opname/redux/opnameRedux'
import {KTSVG} from '../../../../_metronic/helpers'
import {
  BasicDateVerticalFormik,
  BasicSelectVerticalFormik,
} from '../../../modules/Formik/Component/basicInput'
import {ITray} from '../../master/tray/model/TrayModel'
import ReportItemPDF from './report/reportOpnamePDF'
import {decreaseDay, getStringDateOnly} from '../../../../_metronic/helpers/dateHelper'
import {IRequestReportOpname, IResponseReportOpname} from './model/reportOpnameModel'
import ReportOpnameExcel from './report/reportOpnameExcel'

type Props = {
  className: string
}

const ReportOpnameWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IResponseReportOpname[] = useSelector<RootState>(
    ({opname}) => opname.reportOpname
  ) as IResponseReportOpname[]
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
      dataField: 'kode_toko',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'BARCODE'})}),
      sort: true,
    },
    {
      dataField: 'qty_system',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'ITEM'})}),
      sort: true,
    },
    {
      dataField: 'berat_system',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TAG'})}),
      sort: true,
    },
    {
      dataField: 'qty_fisik',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'ITEM'})}),
      sort: true,
    },
    {
      dataField: 'berat_fisik',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TAG'})}),
      sort: true,
    },
    {
      dataField: 'qty_selisih',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'ITEM'})}),
      sort: true,
    },
    {
      dataField: 'berat_selisih',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TAG'})}),
      sort: true,
    },
  ]

  const handleSubmit = async (
    values: IRequestReportOpname,
    actions: FormikHelpers<IRequestReportOpname>
  ) => {
    try {
      dispatch(opnameRedux.actions.fetchReportOpname(values))
    } catch (error) {
      console.log(error)
    }
  }

  const reportOpnameScheme = Yup.object().shape({
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
        }}
        validationSchema={reportOpnameScheme}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik: FormikProps<IRequestReportOpname>) => (
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
                <GlobalTable columns={columns} data={data} keyField='kode_toko' />

                <div className={data.length > 1 ? 'row mt-5' : 'row mt-5 d-none'}>
                  <div className='col-lg-6'>
                    <ReportOpnameExcel
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

export {ReportOpnameWidget}
