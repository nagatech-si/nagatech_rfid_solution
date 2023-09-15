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

import {IOpname, IOpnameItem} from './model/opnameModel'
import {IItem} from '../../item/add/model/ItemModel'
import {ITray} from '../../master/tray/model/TrayModel'
import {ShowImageOpnameModal} from './component/showImageOpname'
import {MyOption} from '../../../../_metronic/helpers/FormikReactSelect'
import SmartInterval from '../../../../_metronic/helpers/SmartInterval'
import {cancelOpname, fetchAll, fetchAllItemForOpname, saveOpname} from './redux/opnameCRUD'
import Swal from 'sweetalert2'

type Props = {
  className: string
}

const OpnameWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const trayDatas: ITray[] = useSelector<RootState>(({tray}) => tray.data) as ITray[]
  useEffect(() => {
    dispatch(typeRedux.actions.fetchAllType())
    dispatch(itemRedux.actions.clearItem())
  }, [dispatch])
  const [imageURL, setImageURL] = useState('-')
  const [selectedTray, setSelectedTray] = useState<string | Boolean>(false)
  const [itemData, setItemData] = useState<IOpnameItem[]>([])
  const [itemMiss, setitemMiss] = useState<IOpnameItem[]>([])
  const [itemFounded, setitemFounded] = useState<IOpnameItem[]>([])
  const [itemWrongTray, setitemWrongTray] = useState<IOpnameItem[]>([])
  const intl = useIntl()

  useEffect(() => {
    const smartInterval = new SmartInterval(async () => {
      if (selectedTray !== false) {
        let resultItem: any = await fetchAllItemForOpname({
          kode_toko: selectedTray as string,
          prev_barang: itemData.length,
        })
        if (resultItem.data?.message !== 'Not Modified') {
          setItemData(resultItem.data)
        }
      }

      // eslint-disable-next-line
      let resultOpname: any = await fetchAll({
        prev_barang_ketemu: itemFounded?.length ?? 0,
        prev_barang_miss: itemMiss?.length ?? 0,
        prev_barang_salah_baki: itemWrongTray?.length ?? 0,
      })
      if (resultOpname.data?.message !== 'Not Modified') {
        setitemMiss(resultOpname.data.itemMiss ?? [])
        setitemFounded(resultOpname.data.itemMatch ?? [])
        setitemWrongTray(resultOpname.data.itemWrongTray ?? [])
      }
    }, 2500)

    if (selectedTray !== false) {
      smartInterval.start()
    }

    return () => smartInterval.stop()
    // eslint-disable-next-line
  }, [selectedTray, itemData])

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
      dataField: 'kode_group',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'GROUP'})}),
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

  const opnameScheme = Yup.object().shape({
    kode_toko: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
  })

  const handleSubmit = (values: IOpname, action: FormikHelpers<IOpname>) => {}

  const handleCancel = async () => {
    try {
      await cancelOpname()
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

  const handleSave = async () => {
    try {
      let beratSystem = itemData.reduce((a, b) => a + b.berat, 0)
      let beratFisik = itemFounded.reduce((a, b) => a + b.berat, 0)
      let lengthSystem = itemData.length
      let lengthFisik = itemFounded.length
      await saveOpname({
        berat_fisik: beratSystem,
        berat_system: beratSystem,
        berat_selisih: beratSystem - beratFisik,
        kode_toko: selectedTray as string,
        qty_fisik: lengthFisik,
        qty_selisih: lengthSystem - lengthFisik,
        qty_system: lengthSystem,
      })
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

  return (
    <>
      <Formik
        initialValues={{
          kode_toko: '',
        }}
        validationSchema={opnameScheme}
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
                      handleChange={(value: MyOption | String[]) => {
                        value = value as MyOption
                        setSelectedTray(value.value)
                        dispatch(
                          itemRedux.actions.fetchAllItemFiltered({
                            berat_dari: 0,
                            berat_sampai: 0,
                            kode_baki: value.value,
                            kode_barcode: 'ALL',
                            kode_group: 'ALL',
                            kode_jenis: 'ALL',
                            nama_barang: 'ALL',
                            tag_id: 'ALL',
                          })
                        )
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
                    <h4>Fisik</h4>
                    <h1>{itemFounded?.length ?? 0}</h1>
                    <h6> ({itemFounded.reduce((a, b) => a + b.berat_asli, 0).toFixed(3)} Gram)</h6>
                  </div>
                  <div className='col-lg-2 my-auto'>
                    <h4>Hilang</h4>
                    <h1>{itemMiss?.length ?? 0}</h1>
                    <h6>({itemMiss.reduce((a, b) => a + b.berat_asli, 0).toFixed(3)} Gram)</h6>
                  </div>
                  <div className='col-lg-2 my-auto'>
                    <h4>Salah Tag</h4>
                    <h1>{itemWrongTray?.length ?? 0}</h1>
                    <h6>({itemWrongTray.reduce((a, b) => a + b.berat_asli, 0).toFixed(3)} Gram)</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className={`card ${className} shadow`}>
              <div className='card-header'>
                <h3 className='card-title'>Tabel Daftar Barang Hilang</h3>
              </div>
              {/* begin::Body */}
              <div className='card-body p-10'>
                {/* begin::Table container */}
                <GlobalTable columns={columns} data={itemMiss} keyField='kode_barcode' />
              </div>
              <ShowImageOpnameModal imageURL={imageURL} />
              {/* begin::Body */}
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <div className={`card ${className} shadow`}>
                  <div className='card-header'>
                    <h3 className='card-title'>Tabel Daftar Barang Ketemu</h3>
                  </div>
                  {/* begin::Body */}
                  <div className='card-body p-10'>
                    {/* begin::Table container */}
                    <GlobalTable columns={columns} data={itemFounded} keyField='kode_barcode' />
                  </div>
                  <ShowImageOpnameModal imageURL={imageURL} />
                  {/* begin::Body */}
                </div>
              </div>
              <div className='col-lg-12'>
                <div className={`card ${className} shadow`}>
                  <div className='card-header'>
                    <h3 className='card-title'>Tabel Daftar Barang Salah Baki</h3>
                  </div>
                  {/* begin::Body */}
                  <div className='card-body p-10'>
                    {/* begin::Table container */}
                    <GlobalTable columns={columns} data={itemWrongTray} keyField='kode_barcode' />
                  </div>
                  <div className='card-footer justify-content-end'>
                    <div className='row justify-content-end'>
                      <div className='col-lg-2'>
                        <button className='btn btn-danger w-100' onClick={handleCancel}>
                          Batal
                        </button>
                      </div>
                      <div className='col-lg-2'>
                        <button className='btn btn-primary w-100' onClick={handleSave}>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                  <ShowImageOpnameModal imageURL={imageURL} />
                  {/* begin::Body */}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export {OpnameWidget}
