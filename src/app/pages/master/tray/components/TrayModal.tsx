/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Form, Formik, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {ITray} from '../model/TrayModel'
import {useDispatch, useSelector} from 'react-redux'
import * as typeRedux from '../redux/TrayRedux'

import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'
import {BasicInputFormik, BasicSelectFormik} from '../../../../modules/Formik/Component/basicInput'

import {IWarehouse} from '../../warehouse/model/WarehouseModel'
import {alfaNumerikOnly} from '../../../../../_metronic/helpers/YupCustomMiddleware'
import {IPriceTag} from '../../price_tag/model/PriceTagModel'

const TrayModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: ITray | null = useSelector<RootState>(({tray}) => tray.payload) as ITray | null
  const warehouseDatas: IWarehouse[] = useSelector<RootState>(
    ({warehouse}) => warehouse.data
  ) as IWarehouse[]
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const priceTag: IPriceTag[] = useSelector<RootState>(({priceTag}) => priceTag.data) as IPriceTag[]
  const [loading, setLoading] = useState(false)
  const intl = useIntl()

  const traySchema = Yup.object().shape({
    kode_gudang: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    nama_baki: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    kode_baki: alfaNumerikOnly(intl.formatMessage({id: 'ONLY.ALFA.NUMERIC'})).required(
      intl.formatMessage({id: 'CANT.BE.EMPTY'})
    ),
    berat_baki: Yup.number()
      .min(0.01)
      .required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    berat_bandrol: Yup.number()
      .min(0.01)
      .required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
  })

  const handleSubmit = (values: any, actions: FormikHelpers<ITray>) => {
    setLoading(true)
    if (createMode) {
      dispatch(typeRedux.actions.postTray(values))
    } else {
      dispatch(typeRedux.actions.editTray(values))
    }
    setLoading(false)
    actions.resetForm()
  }
  return (
    <div className='modal fade' id='kt_modal_tray' aria-hidden='true'>
      <div className='modal-dialog mw-750px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div
              className='btn btn-sm btn-icon btn-active-color-primary'
              id='close-modal'
              data-bs-dismiss='modal'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              _id: createMode ? '' : prevData?._id ?? '',
              berat_baki: createMode ? 0 : prevData?.berat_baki ?? 0,
              kode_baki: createMode ? '' : prevData?.kode_baki ?? '',
              berat_bandrol: createMode
                ? priceTag[0].berat_bandrol
                : prevData?.berat_bandrol ?? priceTag[0].berat_bandrol,
              kode_gudang: createMode ? '' : prevData?.kode_gudang ?? '',
              nama_baki: createMode ? '' : prevData?.nama_baki ?? '',
            }}
            validationSchema={traySchema}
            enableReinitialize
          >
            {(props) => (
              <Form>
                <div className='modal-body  mx-5 mx-xl-18 pt-0 pb-15'>
                  <div className='text-center mb-13'>
                    <h1 className='mb-3'>
                      {' '}
                      {!createMode
                        ? intl.formatMessage(
                            {id: 'PREFIX.EDIT'},
                            {name: intl.formatMessage({id: 'TRAY'})}
                          )
                        : intl.formatMessage(
                            {id: 'PREFIX.ADD'},
                            {name: intl.formatMessage({id: 'TRAY'})}
                          )}
                    </h1>

                    <div className='text-muted fw-bold fs-5'>
                      Please fill all field below and then click save
                    </div>
                  </div>
                  <BasicSelectFormik
                    label={intl.formatMessage(
                      {id: 'BASE.CODE'},
                      {name: intl.formatMessage({id: 'WAREHOUSE'})}
                    )}
                    name='kode_gudang'
                    options={warehouseDatas.map((data) => {
                      return {
                        value: data.kode_gudang,
                        label: data.kode_gudang,
                      }
                    })}
                    disabled={!createMode}
                    defaultValue={props.values.kode_gudang}
                  />
                  <BasicInputFormik
                    disabled={!createMode}
                    label={intl.formatMessage(
                      {id: 'BASE.CODE'},
                      {name: intl.formatMessage({id: 'TRAY'})}
                    )}
                    name='kode_baki'
                  />
                  <BasicInputFormik
                    label={intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'TRAY'})}
                    )}
                    name='nama_baki'
                  />
                  <BasicInputFormik
                    label={intl.formatMessage({id: 'WEIGHT.TRAY'})}
                    type='number'
                    name='berat_baki'
                  />
                  <BasicInputFormik
                    label={intl.formatMessage({id: 'WEIGHT.PRICE.TAG'})}
                    type='number'
                    name='berat_bandrol'
                  />

                  <button
                    type='submit'
                    className='btn btn-light-primary fw-bolder w-100 mb-8'
                    disabled={loading}
                  >
                    {!loading && intl.formatMessage({id: 'SAVE.DATA'})}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export {TrayModal}
