/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {IGroup} from '../model/GroupModel'
import {useDispatch, useSelector} from 'react-redux'
import * as sampleTypeRedux from '../redux/GroupRedux'
import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'
import {alfaNumerikOnly} from '../../../../../_metronic/helpers/YupCustomMiddleware'

const GroupModal: FC = () => {
  const dispatch = useDispatch()
  const intl = useIntl()

  const prevData: IGroup | null = useSelector<RootState>(
    ({group}) => group.payload
  ) as IGroup | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)

  const groupTypeSchema = Yup.object().shape({
    kode_group: alfaNumerikOnly(intl.formatMessage({id: 'ONLY.ALFA.NUMERIC'})).required(
      intl.formatMessage({id: 'CANT.BE.EMPTY'})
    ),
    nama_group: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    harga: Yup.number()
      .required(intl.formatMessage({id: 'CANT.BE.EMPTY'}))
      .min(1, intl.formatMessage({id: 'GREATER.THAN'}, {number: 1})),
    harga_modal: Yup.number()
      .required(intl.formatMessage({id: 'CANT.BE.EMPTY'}))
      .min(1, intl.formatMessage({id: 'GREATER.THAN'}, {number: 1})),
  })

  const formik = useFormik<IGroup>({
    enableReinitialize: true,
    initialValues: {
      _id: createMode ? '' : prevData?._id ?? '',
      harga: createMode ? 0 : prevData?.harga ?? 0,
      harga_modal: createMode ? 0 : prevData?.harga_modal ?? 0,
      kode_group: createMode ? '' : prevData?.kode_group ?? '',
      nama_group: createMode ? '' : prevData?.nama_group ?? '',
    },
    validationSchema: groupTypeSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(sampleTypeRedux.actions.postGroup(values))
        } else {
          dispatch(sampleTypeRedux.actions.editGroup(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  return (
    <div className='modal fade' id='kt_modal_group' aria-hidden='true'>
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
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='modal-body  mx-5 mx-xl-18 pt-0 pb-15'>
              <div className='text-center mb-13'>
                <h1 className='mb-3'>
                  {' '}
                  {!createMode
                    ? intl.formatMessage(
                        {id: 'PREFIX.EDIT'},
                        {name: intl.formatMessage({id: 'GROUP'})}
                      )
                    : intl.formatMessage(
                        {id: 'PREFIX.ADD'},
                        {name: intl.formatMessage({id: 'GROUP'})}
                      )}
                </h1>

                <div className='text-muted fw-bold fs-5'>
                  {intl.formatMessage({id: 'DESC.MODAL'})}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'GROUP'})})}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    autoFocus
                    type='text'
                    disabled={!createMode}
                    key={'kode_group'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.CODE'},
                      {name: intl.formatMessage({id: 'GROUP'})}
                    )}
                    {...formik.getFieldProps('kode_group')}
                  />
                  {formik.touched.kode_group && formik.errors.kode_group && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.kode_group}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'GROUP'})})}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'nama_group'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'GROUP'})}
                    )}
                    {...formik.getFieldProps('nama_group')}
                  />
                  {formik.touched.nama_group && formik.errors.nama_group && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.nama_group}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'PRICE'})}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='number'
                    key={'harga'}
                    disabled={!createMode}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Group Name'
                    {...formik.getFieldProps('harga')}
                  />
                  {formik.touched.harga && formik.errors.harga && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.harga}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'CAPITAL.PRICE'})}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='number'
                    key={'harga_modal'}
                    disabled={!createMode}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Group Name'
                    {...formik.getFieldProps('harga_modal')}
                  />
                  {formik.touched.harga_modal && formik.errors.harga_modal && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.harga_modal}</div>
                    </div>
                  )}
                </div>
              </div>

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
          </form>
        </div>
      </div>
    </div>
  )
}

export {GroupModal}
