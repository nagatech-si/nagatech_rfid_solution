/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import * as Yup from 'yup'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {Form, Formik, FormikHelpers, FormikProps} from 'formik'
import {BasicInputVerticalFormik} from '../../../modules/Formik/Component/basicInput'
import {IItem} from '../../item/add/model/ItemModel'
import {ILocator, IResponseSocket} from './model/locatorModel'
import {ShowItemInfoLocatorModal} from './component/showItemInfoLocator'
import {ShowImageOpnameModal} from '../opname/component/showImageOpname'
import {KTSVG} from '../../../../_metronic/helpers'
import {endSocketItemLocator, fetchItemByBarcode, setItemLocator} from './redux/locatorCRUD'
import {IOpnameItem} from '../opname/model/opnameModel'
import Swal from 'sweetalert2'
import * as locatorRedux from './redux/locatorRedux'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'

import {Socket, io} from 'socket.io-client'

type Props = {
  className: string
}

const LocatorWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const itemFounded: IOpnameItem[] = useSelector<RootState>(
    ({locator}) => locator.data
  ) as IOpnameItem[]
  const [imageURL, setImageURL] = useState('')
  const intl = useIntl()
  const serverUrl = process.env.REACT_APP_SOCKET_URL ?? '-'
  const socket: Socket = io(serverUrl)
  useEffect(() => {
    const swal = Swal
    const prevLocator = localStorage.getItem('PREV-LOCATOR')
    const prevLocatorData = JSON.parse(localStorage.getItem('PREV-LOCATOR-DATA') ?? '{}')
    if (prevLocator !== null) {
      swal.fire({
        title: 'Pencarian Barang Siap',
        text: `Silahkan Gunakan Handheld dan pilih menu Item Locator untuk mulai mencari barang\n[Barcode : ${prevLocator}]`,
        icon: 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
      })
      socket?.on('item-found', (socket: IResponseSocket) => {
        if (socket.kode_barcode === prevLocator) {
          dispatch(locatorRedux.actions.saveItemFounded(prevLocatorData))
          swal.close()
          localStorage.removeItem('PREV-LOCATOR')
          localStorage.removeItem('PREV-LOCATOR-DATA')
        }
      })
    }
    return () => {
      const endSocket = async () => {
        await endSocketItemLocator()
      }
      endSocket()
    }
    // dispatch(locatorRedux.actions.clearItemFounded())
  }, [dispatch]) //eslint-disable-line

  const columns: ColumnDescription[] = [
    {
      dataField: 'kode_barcode',
      text: intl.formatMessage({id: 'BARCODE'}),
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
      text: intl.formatMessage({id: 'RATE'}),
      sort: true,
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
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IItem, index: number) => {
        return (
          <button
            type='button'
            data-bs-toggle='modal'
            data-bs-target={`#kt_modal_gambar_barang_opname`}
            className='btn btn-primary btn-icon me-5 mb-5'
            data-tip={intl.formatMessage({id: 'SHOW.IMAGE'})}
            onClick={() => {
              setImageURL(values.gambar_barang)
            }}
          >
            <i className='fa fa-image fs-4'></i>
          </button>
        )
      },
    },
  ]

  const locatorScheme = Yup.object().shape({
    kode_barcode: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
  })

  const handleSubmit = async (values: ILocator, action: FormikHelpers<ILocator>) => {
    const swal = Swal
    var response = await fetchItemByBarcode(values.kode_barcode)
    var setLocatorResult = await setItemLocator(values.kode_barcode)
    if (setLocatorResult.status !== 201) {
      swal.fire({
        title: intl.formatMessage({id: 'FAILED'}),
        text: intl.formatMessage({id: 'ITEM.LOCATOR.FAILED'}),
        icon: 'error',
      })
      return
    }
    if (response.data) {
      swal.fire({
        title: intl.formatMessage({id: 'ITEM.LOCATOR.READY'}),
        text: `${intl.formatMessage({id: 'ITEM.LOCATOR.TEXT'})}\n[${intl.formatMessage({
          id: 'BARCODE',
        })} : ${values.kode_barcode}]`,
        icon: 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
      })
      localStorage.setItem('PREV-LOCATOR', values.kode_barcode)
      localStorage.setItem('PREV-LOCATOR-DATA', JSON.stringify(response.data))
      socket?.on('item-found', (socket: IResponseSocket) => {
        if (socket.kode_barcode === values.kode_barcode) {
          dispatch(locatorRedux.actions.saveItemFounded(response.data))
          swal.close()
          localStorage.removeItem('PREV-LOCATOR')
          localStorage.removeItem('PREV-LOCATOR-DATA')
        }
      })
    } else {
      Swal.fire({
        title: intl.formatMessage({id: 'FAILED'}),
        text: 'Barcode not found',
        icon: 'error',
      })
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          kode_barcode: '',
        }}
        validationSchema={locatorScheme}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik: FormikProps<ILocator>) => (
          <Form noValidate>
            <div className={`card ${className} shadow`}>
              <div className='card-header'>
                <h3 className='card-title'>Silahkan Masukan Barcode</h3>
                <div className='card-toolbar'>
                  <button
                    type='button'
                    className='btn btn-sm btn-light'
                    onClick={() => {
                      dispatch(locatorRedux.actions.clearItemFounded())
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
                    <BasicInputVerticalFormik
                      label={intl.formatMessage({id: 'BARCODE'})}
                      name='kode_barcode'
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div className='mb-10'>
                      <label className='col-lg-5 col-form-label fw-bold fs-6'>&nbsp;</label>
                      <button
                        type='submit'
                        className='form-control form-control-lg btn btn-primary'
                        onClick={() => {}}
                        disabled={formik.isSubmitting}
                      >
                        {!formik.isSubmitting && (
                          <>
                            <KTSVG
                              path='/media/icons/duotune/general/gen021.svg'
                              className='svg-icon '
                            />
                            {intl.formatMessage({id: 'SEARCH'})}
                          </>
                        )}
                        {formik.isSubmitting && (
                          <span className='indicator-progress' style={{display: 'block'}}>
                            Please wait...{' '}
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className='col-lg-1'></div>
                  <div className='col-lg-2 my-auto'>
                    <h4>Fisik</h4>
                    <h1>{itemFounded?.length ?? 0}</h1>
                  </div>
                  <div className='col-lg-2 my-auto'>
                    <h4>Berat</h4>
                    <h1>{itemFounded?.reduce((a, b) => a + b.berat_asli, 0).toFixed(3)} Gram</h1>
                  </div>
                  <div className='col-lg-1'></div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className={`card`}>
        <div className='card-header'>
          <h3 className='card-title'>History Barang Ketemu</h3>
        </div>
        {/* begin::Body */}
        <div className='card-body p-10'>
          {/* begin::Table container */}
          <GlobalTable columns={columns} data={itemFounded} keyField='kode_barcode' />
        </div>
        <ShowItemInfoLocatorModal item={null} />
        <ShowImageOpnameModal imageURL={imageURL} />
        {/* begin::Body */}
      </div>
    </>
  )
}

export {LocatorWidget}
