/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {RootState} from '../../../../setup'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {Form, Formik, FormikHelpers, FormikProps} from 'formik'
import * as typeRedux from '../../master/type/redux/TypeRedux'
import * as itemRedux from '../../item/add/redux/ItemRedux'

import {BasicSelectVerticalFormik} from '../../../modules/Formik/Component/basicInput'

import {IItem} from '../../item/add/model/ItemModel'
import {ITray} from '../../master/tray/model/TrayModel'
import {MyOption} from '../../../../_metronic/helpers/FormikReactSelect'
import SmartInterval from '../../../../_metronic/helpers/SmartInterval'
import Swal from 'sweetalert2'
import {IOpname, IOpnameItem} from '../opname/model/opnameModel'
import {ShowImageOpnameModal} from '../opname/component/showImageOpname'
import {cancelSoldItem, fetchAllSoldItem, saveSoldItem} from './redux/soldItemCRUD'
import {Socket, io} from 'socket.io-client'

type Props = {
  className: string
}

const SoldItemWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const itemData: IItem[] = useSelector<RootState>(({items}) => items.data) as IItem[]
  const trayDatas: ITray[] = useSelector<RootState>(({tray}) => tray.data) as ITray[]
  useEffect(() => {
    dispatch(typeRedux.actions.fetchAllType())
    dispatch(itemRedux.actions.clearItem())
  }, [dispatch])
  const [loading, setLoading] = useState(false)
  const [imageURL, setImageURL] = useState('-')
  const [selectedTray, setSelectedTray] = useState<string | Boolean>(false)
  const [itemSold, setitemSold] = useState<IOpnameItem[]>([])
  const intl = useIntl()
  const serverUrl = process.env.REACT_APP_SOCKET_URL ?? '-'
  const socket: Socket = io(serverUrl)

  socket?.on('sold-item', (socket: IOpnameItem[]) => {
    setitemSold(socket.filter((filter) => filter.kode_toko === selectedTray))
  })

  useEffect(() => {
    const smartInterval = new SmartInterval(async () => {
      dispatch(
        itemRedux.actions.fetchAllItemFiltered({
          berat_dari: 0,
          berat_sampai: 0,
          kode_baki: selectedTray,
          kode_barcode: 'ALL',
          kode_group: 'ALL',
          kode_jenis: 'ALL',
          nama_barang: 'ALL',
          tag_id: 'ALL',
        })
      )
    }, 2500)

    if (selectedTray === false) {
      smartInterval.stop()
      dispatch(itemRedux.actions.clearItem())
    }

    if (selectedTray !== false) {
      smartInterval.start()
    }

    return () => {
      smartInterval.stop()
      socket?.off('sold-item')
      socket?.disconnect()
    }
    // eslint-disable-next-line
  }, [selectedTray])

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

  const soldItemScheme = Yup.object().shape({
    kode_toko: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
  })

  const handleSubmit = (values: IOpname, action: FormikHelpers<IOpname>) => {
    Swal.fire({
      title: intl.formatMessage({id: 'SOLD.ITEM.READY'}),
      text: intl.formatMessage({id: 'SOLD.ITEM.TEXT'}),
      icon: 'info',
      allowEscapeKey: false,
      allowOutsideClick: false,
      heightAuto: false,
    })
  }

  const handleCancel = async () => {
    try {
      dispatch(itemRedux.actions.clearItem())
      setSelectedTray(false)
      socket?.off('sold-item')
      socket?.disconnect()
      await cancelSoldItem()
      Swal.fire({
        title: intl.formatMessage({id: 'SUCCESS'}),
        text: intl.formatMessage({id: 'SUCCESS.CANCEL'}),
        icon: 'success',
        heightAuto: false,
        focusConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    } catch (error) {
      Swal.fire({
        title: intl.formatMessage({id: 'FAILED'}),
        text: intl.formatMessage({id: 'FAILED.CANCEL'}),
        icon: 'error',
        heightAuto: false,
        focusConfirm: true,
      })
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      socket?.off('sold-item')
      socket?.disconnect()
      await saveSoldItem(itemSold)
      Swal.fire({
        title: intl.formatMessage({id: 'SUCCESS'}),
        text: intl.formatMessage({id: 'DATA.SUCCESS.SAVED'}),
        icon: 'success',
        heightAuto: false,
        focusConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(false)
          window.location.reload()
        }
      })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          kode_toko: '',
        }}
        validationSchema={soldItemScheme}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik: FormikProps<IOpname>) => (
          <Form noValidate>
            <div className={`card ${className} shadow`}>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-lg-3'>
                    <BasicSelectVerticalFormik
                      label={intl.formatMessage(
                        {id: 'BASE.CODE'},
                        {name: intl.formatMessage({id: 'TRAY'})}
                      )}
                      name='kode_toko'
                      options={trayDatas.map((value) => {
                        return {
                          value: value.kode_baki,
                          label: value.kode_baki,
                        }
                      })}
                      handleChange={async (value: MyOption | String[]) => {
                        if (value) {
                          value = value as MyOption
                          setSelectedTray(value.value)
                          const response = await fetchAllSoldItem()
                          if (response.status === 200) {
                            setitemSold(response.data)
                          }
                          setTimeout(() => {
                            formik.submitForm()
                          }, 500)
                        } else {
                          setSelectedTray(false)
                          dispatch(itemRedux.actions.clearItem())
                        }
                      }}
                      defaultValue={formik.values.kode_toko}
                    />
                  </div>
                  <div className='col-lg-1'></div>
                  <div className='col-lg-2 my-auto'>
                    <h4>System</h4>
                    <h1>{itemData?.length ?? 0}</h1>
                    <h6>({itemData.reduce((a, b) => a + b.berat_asli, 0).toFixed(3)} Gram)</h6>
                  </div>
                  <div className='col-lg-2 my-auto'>
                    <h4>Terjual</h4>
                    <h1>{itemSold?.length ?? 0}</h1>
                    <h6> ({itemSold.reduce((a, b) => a + b.berat_asli, 0).toFixed(3)} Gram)</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className={`card ${className} shadow`}>
              <div className='card-header'>
                <h3 className='card-title'>Tabel Daftar Barang Terjual</h3>
                <div className={selectedTray ? 'card-toolbar' : 'card-toolbar d-none'}>
                  <button
                    type='button'
                    className='btn btn-sm btn-primary'
                    onClick={() => {}}
                    disabled
                  >
                    Listening from handheld response ...
                  </button>
                </div>
              </div>
              {/* begin::Body */}
              <div className='card-body p-10'>
                {/* begin::Table container */}
                <GlobalTable columns={columns} data={itemSold} keyField='kode_barcode' />
              </div>
              <div
                className={
                  itemSold.length > 0
                    ? 'card-footer justify-content-end'
                    : 'card-footer justify-content-end d-none'
                }
              >
                <div className='row justify-content-end'>
                  <div className='col-lg-2'>
                    <button className='btn btn-danger w-100' type='button' onClick={handleCancel}>
                      Batal
                    </button>
                  </div>
                  <div className='col-lg-2'>
                    <button
                      className='btn btn-primary w-100'
                      type='button'
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {!loading && <>{intl.formatMessage({id: 'SAVE.DATA'})}</>}
                      {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <ShowImageOpnameModal imageURL={imageURL} />
              {/* begin::Body */}
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export {SoldItemWidget}
