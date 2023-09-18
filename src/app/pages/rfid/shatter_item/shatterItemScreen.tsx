/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch} from 'react-redux'

import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import * as Yup from 'yup'
import * as typeRedux from '../../master/type/redux/TypeRedux'
import * as itemRedux from '../../item/add/redux/ItemRedux'
import * as itemConditionRedux from '../../master/item_condition/redux/ItemConditionRedux'

import {IItem} from '../../item/add/model/ItemModel'

import Swal from 'sweetalert2'
import {IOpnameItem} from '../opname/model/opnameModel'

import {cancelShatterItem, fetchShatterItem, saveShatterItem} from './redux/shatterItemCRUD'
import {Formik, FormikProps} from 'formik'
import {IRequestSaveShetter} from './model/shetterModel'
import {ShetterModal} from './component/shetterModal'
import {ShowImageOpnameModal} from '../opname/component/showImageOpname'
import io, {Socket} from 'socket.io-client'

type Props = {
  className: string
}

const ShatterItemWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(typeRedux.actions.fetchAllType())
    dispatch(itemRedux.actions.clearItem())
    dispatch(itemConditionRedux.actions.fetchAllItemCondition())
  }, [dispatch])
  const [imageURL, setImageURL] = useState('-')
  const [shatterItem, setshatterItem] = useState<IOpnameItem[]>([])
  const [isListening, setisListening] = useState(false)
  const intl = useIntl()
  const serverUrl = process.env.REACT_APP_SOCKET_URL ?? '-'
  const socketIo: Socket = io(serverUrl)

  socketIo?.on('shatter-item', (socket: IOpnameItem[]) => {
    setshatterItem(socket)
  })

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

  const handleSubmit = async () => {
    setisListening(true)
    const response = await fetchShatterItem()
    if (response.status === 200) {
      setshatterItem(response.data)
    }
    Swal.fire({
      title: intl.formatMessage({id: 'SHATTER.ITEM.READY'}),
      text: intl.formatMessage({id: 'SHATTER.ITEM.TEXT'}),
      icon: 'info',
      allowEscapeKey: false,
      allowOutsideClick: false,
      heightAuto: false,
    })
  }

  const handleCancel = async () => {
    try {
      dispatch(itemRedux.actions.clearItem())
      socketIo?.off('shatter-item')
      socketIo?.disconnect()
      await cancelShatterItem()
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

  const handleSave = async (values: IRequestSaveShetter) => {
    try {
      socketIo?.off('shatter-item')
      socketIo?.disconnect()
      await saveShatterItem(shatterItem, values.kondisi_barang)
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

  const shatterSchema = Yup.object().shape({
    kondisi_barang: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
  })

  return (
    <>
      <div className={`card ${className} shadow`}>
        <div className='card-header'>
          <h3 className='card-title'>Tabel Daftar Hancur Barang</h3>
          <div className={'card-toolbar'}>
            {isListening ? (
              <button type='button' className='btn btn-sm btn-warning' onClick={() => {}} disabled>
                Listening from handheld response ...
              </button>
            ) : (
              <button type='button' className='btn btn-sm btn-primary' onClick={handleSubmit}>
                Start Listening
              </button>
            )}
          </div>
        </div>
        {/* begin::Body */}
        <div className='card-body p-10'>
          {/* begin::Table container */}
          <GlobalTable columns={columns} data={shatterItem} keyField='kode_barcode' />
        </div>
        <div
          className={
            shatterItem.length > 0
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
                data-bs-target={`#kt_modal_shetter_item`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <ShowImageOpnameModal imageURL={imageURL} />
        <Formik
          initialValues={{
            kondisi_barang: '',
          }}
          onSubmit={handleSave}
          validationSchema={shatterSchema}
        >
          {(formik: FormikProps<IRequestSaveShetter>) => <ShetterModal formik={formik} />}
        </Formik>
        {/* begin::Body */}
      </div>
    </>
  )
}

export {ShatterItemWidget}
