/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'

import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import * as Yup from 'yup'
import * as itemRedux from '../../item/add/redux/ItemRedux'
import * as trayRedux from '../../master/tray/redux/TrayRedux'
import {DropdownBarangAction} from '../../../../_metronic/layout/components/ActionDropdownBarang'

import {IItem} from '../../item/add/model/ItemModel'

import Swal from 'sweetalert2'
import {IOpnameItem} from '../opname/model/opnameModel'
import {ShowImageOpnameModal} from '../opname/component/showImageOpname'
import useSocket from '../../../../_metronic/helpers/useSocket'
import {saveMoveItem} from './redux/moveItemOneTrayCRUD'
import {Formik, FormikProps} from 'formik'
import {MoveItemModal} from './component/moveItemOneTrayModal'
import {IRequestSaveMoveItem} from '../move_item/model/moveItemModel'
import {BasicSelectVerticalFormik} from '../../../modules/Formik/Component/basicInput'
import {fetchAllItemFiltered} from '../opname/redux/opnameCRUD'
import {ITray} from '../../master/tray/model/TrayModel'
import {RootState} from '../../../../setup'

type Props = {
  className: string
}

const MoveItemOneTrayWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(itemRedux.actions.clearItem())
    dispatch(trayRedux.actions.fetchAllTray())
  }, [dispatch])

  const trayDatas: ITray[] = useSelector<RootState>(({tray}) => tray.data) as ITray[]
  const [imageURL, setImageURL] = useState('-')
  const [moveItems, setmoveItems] = useState<IOpnameItem[]>([])
  const intl = useIntl()
  const socket = useSocket()

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
          <DropdownBarangAction
            DeleteName={intl.formatMessage({id: 'TRAY'}) + ' ' + values.kode_baki}
            modalName='kt_modal_edit_item'
            modalDuplicateName='kt_modal_item'
            modalImageName='kt_modal_gambar_barang_opname'
            handleImage={() => {
              setImageURL(values.gambar_barang)
            }}
          />
        )
      },
    },
  ]

  const handleSubmit = async (value: IRequestSaveMoveItem) => {
    try {
      const items = await fetchAllItemFiltered({
        berat_dari: 0,
        berat_sampai: 0,
        kode_baki: value.kode_baki,
        kode_barcode: 'ALL',
        kode_group: 'ALL',
        kode_jenis: 'ALL',
        nama_barang: 'ALL',
        tag_id: 'ALL',
      })
      setmoveItems(items.data)
    } catch (error) {}
  }

  const handleCancel = async () => {
    try {
      setmoveItems([])
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
    } catch (error) {}
  }

  const handleSave = async (value: IRequestSaveMoveItem) => {
    try {
      socket?.off('move-item')
      socket?.disconnect()
      await saveMoveItem(moveItems, value.kode_baki)
      Swal.fire({
        title: intl.formatMessage({id: 'SUCCESS'}),
        text: intl.formatMessage({id: 'DATA.SUCCESS.SAVED'}),
        icon: 'success',
        heightAuto: false,
        focusConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    } catch (error) {}
  }

  const moveSchema = Yup.object().shape({
    kode_baki: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
  })

  return (
    <>
      <div className={`card ${className} shadow`}>
        {/* begin::Body */}
        <div className='card-body p-10'>
          <Formik
            initialValues={{
              kode_baki: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={moveSchema}
          >
            {(formik: FormikProps<IRequestSaveMoveItem>) => (
              <div className='row'>
                <div className='col-lg-6'>
                  <BasicSelectVerticalFormik
                    label='Baki Asal'
                    name='kode_baki'
                    options={trayDatas.map((value) => {
                      return {
                        value: value.kode_baki,
                        label: value.kode_baki,
                      }
                    })}
                  />
                </div>
                <div className='col-lg-6'>
                  <label className='col-lg-5 col-form-label fw-bold fs-6 w-100'>&nbsp;</label>
                  <button
                    type='submit'
                    className='btn btn-primary w-100'
                    onClick={() => formik.submitForm()}
                    disabled={formik.isSubmitting}
                  >
                    {!formik.isSubmitting && intl.formatMessage({id: 'SEARCH'})}
                    {formik.isSubmitting && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </Formik>
        </div>

        {/* begin::Body */}
      </div>
      <div className={`card ${className} shadow`}>
        <div className='card-header'>
          <h3 className='card-title'>Tabel Daftar Pindah Barang</h3>
        </div>
        {/* begin::Body */}
        <div className='card-body p-10'>
          {/* begin::Table container */}
          <GlobalTable columns={columns} data={moveItems} keyField='kode_barcode' />
        </div>
        <div
          className={
            moveItems.length > 0
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
                data-bs-toggle='modal'
                data-bs-target={`#kt_modal_move_item`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <ShowImageOpnameModal imageURL={imageURL} />
        <Formik
          initialValues={{
            kode_baki: '',
          }}
          onSubmit={handleSave}
          validationSchema={moveSchema}
        >
          {(formik: FormikProps<IRequestSaveMoveItem>) => <MoveItemModal formik={formik} />}
        </Formik>
        {/* begin::Body */}
      </div>
    </>
  )
}

export {MoveItemOneTrayWidget}
