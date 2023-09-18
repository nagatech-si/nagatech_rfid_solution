/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as itemRedux from './redux/ItemRedux'
import * as Yup from 'yup'
import {RootState, uploadImage} from '../../../../setup'
import {IItem, ItemInitValue} from './model/ItemModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {Form, Formik, FormikHelpers, FormikProps} from 'formik'
import {BasicSelectVerticalFormik} from '../../../modules/Formik/Component/basicInput'
import {ItemModal} from './components/ItemModal'
import {IGroup} from '../../master/group/model/GroupModel'
import {IType} from '../../master/type/model/TypeModel'
import * as groupRedux from '../../master/group/redux/GroupRedux'
import * as typeRedux from '../../master/type/redux/TypeRedux'
import * as trayRedux from '../../master/tray/redux/TrayRedux'
import {MyOption} from '../../../../_metronic/helpers/FormikReactSelect'
import {KTSVG} from '../../../../_metronic/helpers'

import {b64toBlob} from '../../../../_metronic/helpers/imageHelper'
import {putItem, sendItem} from './redux/ItemCRUD'
import Swal from 'sweetalert2'
import hideModal from '../../../../_metronic/helpers/ModalHandler'
import {ShowImageModal} from './components/showImageModal'
import {EditItemModal} from './components/editItemModal'
import {prosesTagId} from '../../../../_metronic/helpers/auto_tag'
import {Socket, io} from 'socket.io-client'

type Props = {
  className: string
}

const ItemWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IItem[] = useSelector<RootState>(({items}) => items.data) as IItem[]
  const groupDatas: IGroup[] = useSelector<RootState>(({group}) => group.data) as IGroup[]
  const typeDatas: IType[] = useSelector<RootState>(({type}) => type.data) as IType[]
  const trayDatas: IItem[] = useSelector<RootState>(({tray}) => tray.data) as IItem[]
  const [complete, setComplete] = useState(false)
  const [editMode] = useState(false)
  const [initialValues, setInitialValues] = useState(ItemInitValue)
  const serverUrl = process.env.REACT_APP_SOCKET_URL ?? '-'
  const socket: Socket = io(serverUrl)
  const [duplicate, setDuplicate] = useState(false)

  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('EMPTY'))
    dispatch(toolbar.actions.SetFocusName('nama_barang'))
    dispatch(toolbar.actions.SetCreateModalActive(true))
    dispatch(groupRedux.actions.fetchAllGroup())
    dispatch(typeRedux.actions.fetchAllType())
    dispatch(trayRedux.actions.fetchAllTray())
    dispatch(itemRedux.actions.clearItem())
  }, [dispatch])
  const intl = useIntl()
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
      dataField: 'kode_group',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'GROUP'})}),
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
      dataField: 'berat',
      text: intl.formatMessage({id: 'WEIGHT'}),
      sort: true,
    },
    {
      dataField: 'kadar_cetak',
      text: intl.formatMessage({id: 'PRINT.RATE'}),
      sort: true,
    },
    {
      dataField: 'stock_on_hand',
      text: intl.formatMessage({id: 'STOCK.ONHAND'}),
      sort: true,
    },
    {
      dataField: 'input_date',
      text: intl.formatMessage({id: 'INPUT.DATE'}),
      sort: true,
      formatter: (_, value: IItem, ___) => {
        if (value.input_date != null) {
          const date = new Date(value.input_date)
          return date.toLocaleDateString()
        } else {
          return '-'
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
            data-bs-target={`#kt_modal_edit_item`}
            data-tip={intl.formatMessage({id: 'DUPLICATE'}, {name: ''})}
            className='btn btn-secondary btn-icon w-100 me-5 mb-5'
            onClick={() => {
              setDuplicate(true)
              setInitialValues({
                ...values,
                kode_jenis: values.kode_dept,
                kode_baki: values.kode_toko,
              })
            }}
          >
            <i className='bi bi-clipboard-check-fill fs-4'></i>
          </button>
        )
      },
    },
  ]

  const handleSubmit = async (values: IItem, actions: FormikHelpers<IItem>) => {
    try {
      if (editMode) {
        await putItem(values)
        hideModal()
      } else {
        if (!duplicate) {
          var publicURL = await uploadImage(
            b64toBlob(values.gambar_barang),
            `barang/${values.kadar_cetak + values.kadar + values.kode_group}.png`
          )
          values.gambar_barang = publicURL
        }
        values.tag_id = '-'
        var response = await sendItem(values)
        dispatch(itemRedux.actions.saveItem(response.data))
        prosesTagId(
          response.data[response.data.length - 1].kode_barcode ?? '-',
          socket,
          dispatch,
          values.kode_baki ?? '-'
        )
        hideModal()
        Swal.fire({
          title: 'INFORMASI !',
          text: 'Harap Scan Tag id',
          icon: 'success',
          heightAuto: false,
          showCloseButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'Tutup Tag ID',
          showConfirmButton: false,
          focusConfirm: true,
        }).then(async (response) => {
          if (response.isConfirmed || response.isDismissed) {
            socket?.off('edit-tag')
            socket?.disconnect()
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const itemTypeSchema = Yup.object().shape({
    kode_group: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    kode_jenis: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    kode_baki: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    nama_barang: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    berat_asli: Yup.number()
      .required(intl.formatMessage({id: 'CANT.BE.EMPTY'}))
      .min(0.001, intl.formatMessage({id: 'GREATER.THAN'}, {number: 0.001})),
    kadar: Yup.number()
      .required(intl.formatMessage({id: 'CANT.BE.EMPTY'}))
      .min(1, intl.formatMessage({id: 'GREATER.THAN'}, {number: 1})),
    kadar_cetak: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    kode_intern: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={itemTypeSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik: FormikProps<IItem>) => (
          <Form noValidate>
            <div className={`card ${className} shadow`}>
              {/* begin::Body */}
              <div className='card-body p-10'>
                <div className='row'>
                  <div className='col-lg-4'>
                    <BasicSelectVerticalFormik
                      label={intl.formatMessage(
                        {id: 'BASE.CODE'},
                        {name: intl.formatMessage({id: 'GROUP'})}
                      )}
                      name='kode_group'
                      options={groupDatas.map((value) => {
                        return {
                          value: value.kode_group,
                          label: value.kode_group,
                        }
                      })}
                      handleChange={(value: MyOption | string[]) => {
                        if (
                          formik.values.kode_group != null &&
                          formik.values.kode_jenis != null &&
                          formik.values.kode_baki !== null
                        ) {
                          setComplete(true)
                        }
                      }}
                      defaultValue={formik.values.kode_group}
                    />
                  </div>
                  <div className='col-lg-3'>
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
                      handleChange={(value: MyOption | string[]) => {
                        if (
                          formik.values.kode_group != null &&
                          formik.values.kode_jenis != null &&
                          formik.values.kode_baki !== null
                        ) {
                          setComplete(true)
                        }
                      }}
                      defaultValue={formik.values.kode_jenis}
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
                      handleChange={(value: MyOption | string[]) => {
                        if (
                          formik.values.kode_group != null &&
                          formik.values.kode_jenis != null &&
                          formik.values.kode_baki !== null
                        ) {
                          setComplete(true)
                        } else {
                          if (formik.values.kode_group === null) {
                            formik.setFieldError('kode_group', 'Mohon Pilih Terlebih Dahulu')
                          } else if (formik.values.kode_jenis === null) {
                            formik.setFieldError('kode_jenis', 'Mohon Pilih Terlebih Dahulu')
                          } else if (formik.values.kode_baki === null) {
                            formik.setFieldError('kode_baki', 'Mohon Pilih Terlebih Dahulu')
                          }
                        }
                      }}
                      defaultValue={formik.values.kode_baki}
                    />
                  </div>
                  <div className='col-lg-2'>
                    <div className='mb-10'>
                      <label className='col-lg-5 col-form-label fw-bold fs-6'>&nbsp;</label>
                      <button
                        type='button'
                        data-bs-toggle={complete ? 'modal' : 'button'}
                        data-bs-target={`#kt_modal_item`}
                        className='form-control form-control-lg btn btn-primary'
                        onClick={() => {
                          formik.submitForm()
                          if (formik.values.kode_group === '') {
                            formik.setErrors({kode_group: 'Mohon Pilih Terlebih Dahulu'})
                          } else if (formik.values.kode_jenis === '') {
                            formik.setErrors({kode_jenis: 'Mohon Pilih Terlebih Dahulu'})
                          } else if (formik.values.kode_baki === '') {
                            formik.setErrors({kode_baki: 'Mohon Pilih Terlebih Dahulu'})
                          }
                        }}
                      >
                        <KTSVG
                          path='/media/icons/duotune/files/fil005.svg'
                          className='svg-icon-muted svg-icon-1'
                        />{' '}
                        {intl.formatMessage({id: 'ITEM'})}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* begin::Body */}
            </div>
            <div className={`card ${className} shadow`}>
              {/* begin::Body */}
              <div className='card-body p-10'>
                {/* begin::Table container */}
                <GlobalTable columns={columns} data={data} keyField='kode_barcode' />
              </div>
              <ItemModal formik={formik} />
              <ShowImageModal formik={formik} />
              <EditItemModal formik={formik} />
              {/* begin::Body */}
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export {ItemWidget}
