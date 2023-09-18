/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as itemRedux from '../add/redux/ItemRedux'
import * as Yup from 'yup'
import {RootState} from '../../../../setup'
import {IItem, ItemInitValue} from '../add/model/ItemModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {Form, Formik, FormikHelpers, FormikProps} from 'formik'

import * as groupRedux from '../../master/group/redux/GroupRedux'
import * as typeRedux from '../../master/type/redux/TypeRedux'
import {putItem} from '../add/redux/ItemCRUD'
import hideModal from '../../../../_metronic/helpers/ModalHandler'
import {EditItemModal} from '../add/components/editItemModal'
import {ShowImageModal} from '../add/components/showImageModal'
import {KTSVG} from '../../../../_metronic/helpers'
import {
  BasicInputVerticalFormik,
  BasicSelectVerticalFormik,
} from '../../../modules/Formik/Component/basicInput'
import {MyOption} from '../../../../_metronic/helpers/FormikReactSelect'
import {IGroup} from '../../master/group/model/GroupModel'
import {IType} from '../../master/type/model/TypeModel'
import {ISearch, initSearchValue} from './model/searchModel'
import ReactTooltip from 'react-tooltip'

type Props = {
  className: string
}

const ShowItemWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IItem[] = useSelector<RootState>(({items}) => items.data) as IItem[]
  const groupDatas: IGroup[] = useSelector<RootState>(({group}) => group.data) as IGroup[]
  const typeDatas: IType[] = useSelector<RootState>(({type}) => type.data) as IType[]
  const trayDatas: IItem[] = useSelector<RootState>(({tray}) => tray.data) as IItem[]
  const [initialValues, setInitialValues] = useState(ItemInitValue)
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('EMPTY'))
    dispatch(toolbar.actions.SetCreateModalActive(false))
    dispatch(toolbar.actions.SetFocusName('nama_barang'))
    dispatch(groupRedux.actions.fetchAllGroup())
    dispatch(typeRedux.actions.fetchAllType())
    dispatch(itemRedux.actions.fetchAllItem())
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
      align: 'center',
      headerAlign: 'center',
      formatter: (_: any, values: IItem, index: number) => {
        return (
          <>
            <button
              type='button'
              data-bs-toggle='modal'
              data-bs-target={`#kt_modal_edit_item`}
              data-tip={intl.formatMessage({id: 'UPDATE'})}
              className='btn btn-warning btn-icon mb-3'
              onClick={() => {
                setInitialValues({
                  ...values,
                  kode_jenis: values.kode_dept,
                  kode_baki: values.kode_toko,
                })
              }}
            >
              <i className='fa fa-file fs-4'></i>
            </button>
            <button
              type='button'
              data-bs-toggle='modal'
              data-bs-target={`#kt_modal_gambar_barang`}
              className='btn btn-primary btn-icon '
              data-tip={intl.formatMessage({id: 'SHOW.IMAGE'})}
              onClick={() => {
                setInitialValues({
                  ...values,
                  kode_jenis: values.kode_dept,
                  kode_baki: values.kode_toko,
                })
              }}
            >
              <i className='fa fa-image fs-4'></i>
            </button>
          </>
        )
      },
    },
  ]

  const handleSubmit = async (values: IItem, actions: FormikHelpers<IItem>) => {
    try {
      await putItem(values)
      hideModal()
      dispatch(itemRedux.actions.fetchAllItem())
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

  const searchScheme = Yup.object().shape({
    kode_group: Yup.string(),
    kode_jenis: Yup.string(),
    kode_baki: Yup.string(),
    nama_barang: Yup.string(),
    kode_barang: Yup.string(),
    tag_id: Yup.string(),
    berat_awal: Yup.number(),
    berat_akhir: Yup.number(),
  })

  const handleSearch = async (values: ISearch, actions: FormikHelpers<ISearch>) => {
    const payload: ISearch = {
      berat_dari: values.berat_dari,
      berat_sampai: values.berat_sampai,
      kode_baki: values.kode_baki === '' ? 'ALL' : values.kode_baki,
      kode_barcode: values.kode_barcode === '' ? 'ALL' : values.kode_barcode,
      kode_group: values.kode_group === '' ? 'ALL' : values.kode_group,
      kode_jenis: values.kode_jenis === '' ? 'ALL' : values.kode_jenis,
      nama_barang: values.nama_barang === '' ? 'ALL' : values.nama_barang,
      tag_id: values.tag_id === '' ? 'ALL' : values.tag_id,
    }
    dispatch(itemRedux.actions.fetchAllItemFiltered(payload))
  }

  return (
    <>
      <ReactTooltip />
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

              <Formik
                validationSchema={searchScheme}
                initialValues={initSearchValue}
                onSubmit={handleSearch}
                enableReinitialize
              >
                {(formikSearch: FormikProps<ISearch>) => (
                  <>
                    <div className='card-header'>
                      <h3 className='card-title'>Pencarian</h3>
                      <div className='card-toolbar'>
                        <button
                          type='button'
                          className='btn btn-sm btn-light'
                          onClick={() => formikSearch.resetForm()}
                        >
                          {intl.formatMessage({id: 'REFRESH'})}
                        </button>
                      </div>
                    </div>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-lg-3'>
                          <BasicInputVerticalFormik label='Kode Barcode' name='kode_barcode' />
                        </div>
                        <div className='col-lg-3'>
                          <BasicInputVerticalFormik label='Nama Barang' name='nama_barang' />
                        </div>
                        <div className='col-lg-3'>
                          <BasicInputVerticalFormik label={`Tag ID`} name='tag_id' />
                        </div>
                        <div className='col-lg-3'>
                          <BasicInputVerticalFormik
                            label='Berat Awal'
                            name='berat_dari'
                            type='number'
                          />
                        </div>
                        <div className='col-lg-3'>
                          <BasicInputVerticalFormik
                            label='Berat Akhir'
                            name='berat_sampai'
                            type='number'
                          />
                        </div>

                        <div className='col-lg-3'>
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
                              }
                            }}
                            defaultValue={formik.values.kode_group}
                            showAllOption
                            allLabel='SEMUA'
                            allValue='ALL'
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
                              }
                            }}
                            defaultValue={formik.values.kode_jenis}
                            showAllOption
                            allLabel='SEMUA'
                            allValue='ALL'
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
                            showAllOption
                            allLabel='SEMUA'
                            allValue='ALL'
                          />
                        </div>
                        <div className='col-lg-12 mt-3'>
                          <div className='mb-3'>
                            <button
                              type='button'
                              className='form-control form-control-lg btn btn-primary'
                              onClick={() => {
                                formikSearch.submitForm()
                              }}
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
                  </>
                )}
              </Formik>
              {/* begin::Body */}
            </div>
            <div className={`card ${className} shadow`}>
              {/* begin::Body */}
              <div className='card-body p-10'>
                {/* begin::Table container */}
                <GlobalTable columns={columns} data={data} keyField='kode_barcode' />
              </div>
              <EditItemModal formik={formik} />
              <ShowImageModal formik={formik} />
              {/* begin::Body */}
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export {ShowItemWidget}
