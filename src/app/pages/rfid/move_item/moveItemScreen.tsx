/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch} from 'react-redux'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import * as Yup from 'yup'
import * as itemRedux from '../../item/add/redux/ItemRedux'
import {IItem} from '../../item/add/model/ItemModel'
import Swal from 'sweetalert2'
import {IOpnameItem} from '../opname/model/opnameModel'
import {ShowImageOpnameModal} from '../opname/component/showImageOpname'
import {cancelMoveItem, fetchAllMoveItem, saveMoveItem} from './redux/moveItemCRUD'
import {Formik, FormikProps} from 'formik'
import {IRequestSaveMoveItem} from './model/moveItemModel'
import {MoveItemModal} from './component/moveItemModal'
import {Socket, io} from 'socket.io-client'

type Props = {
  className: string
}

const MoveItemWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(itemRedux.actions.clearItem())
  }, [dispatch])
  const [imageURL, setImageURL] = useState('-')
  const [moveItem, setMoveItem] = useState<IOpnameItem[]>([])
  const [isListening, setisListening] = useState(false)
  const intl = useIntl()
  const serverUrl = process.env.REACT_APP_SOCKET_URL ?? '-'
  const socket: Socket = io(serverUrl)
  socket?.on('move-item', (socket: IOpnameItem[]) => {
    setMoveItem(socket)
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
    const response = await fetchAllMoveItem()
    if (response.status === 200) {
      setMoveItem(response.data)
    }
    Swal.fire({
      title: intl.formatMessage({id: 'MOVE.ITEM.READY'}),
      text: intl.formatMessage({id: 'MOVE.ITEM.TEXT'}),
      icon: 'info',
      allowEscapeKey: false,
      allowOutsideClick: false,
      heightAuto: false,
    })
  }

  const handleCancel = async () => {
    try {
      dispatch(itemRedux.actions.clearItem())
      socket?.off('move-item')
      socket?.disconnect()
      await cancelMoveItem()
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

  const handleSave = async (value: IRequestSaveMoveItem) => {
    try {
      socket?.off('move-item')
      socket?.disconnect()
      await saveMoveItem(moveItem, value.kode_baki)
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
        <div className='card-header'>
          <h3 className='card-title'>Tabel Daftar Pindah Barang</h3>
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
          <GlobalTable columns={columns} data={moveItem} keyField='kode_barcode' />
        </div>
        <div
          className={
            moveItem.length > 0
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

export {MoveItemWidget}
