/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useRef, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {TypeInitValue, IType} from '../model/TypeModel'
import {useDispatch, useSelector} from 'react-redux'
import * as sampleTypeRedux from '../redux/TypeRedux'
import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'
import {useFocus} from '../../../../../_metronic/helpers/useFocus'

const groupTypeSchema = Yup.object().shape({
  kode_group: Yup.string().required('Type Code Cant Be Empty'),
  nama_jenis: Yup.string().required('Type Name Cant Be Empty'),
  kode_jenis: Yup.string().required('Type Code Cant Be Empty'),
})

const TypeModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: IType | null = useSelector<RootState>(({group}) => group.payload) as IType | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)

  const formik = useFormik<IType>({
    enableReinitialize: true,
    initialValues: {
      _id: createMode ? '' : prevData?._id ?? '',
      kode_group: createMode ? '' : prevData?.kode_group ?? '',
      kode_jenis: createMode ? '' : prevData?.kode_jenis ?? '',
      nama_jenis: createMode ? '' : prevData?.nama_jenis ?? '',
      status: createMode ? '' : prevData?.status ?? '',
    },
    validationSchema: groupTypeSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(sampleTypeRedux.actions.postType(values))
        } else {
          dispatch(sampleTypeRedux.actions.editType(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_type' aria-hidden='true'>
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
            <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
              <div className='text-center mb-13'>
                <h1 className='mb-3'>{!createMode ? 'Edit Type' : 'Add Type'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TYPE'})})}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    autoFocus
                    type='text'
                    disabled={!createMode}
                    key={'kode_jenis'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Type Code'
                    {...formik.getFieldProps('kode_jenis')}
                  />
                  {formik.touched.kode_jenis && formik.errors.kode_jenis && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.kode_jenis}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'TYPE'})})}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'nama_jenis'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Type Name'
                    {...formik.getFieldProps('nama_jenis')}
                  />
                  {formik.touched.nama_jenis && formik.errors.nama_jenis && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.nama_jenis}</div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type='submit'
                className='btn btn-light-primary fw-bolder w-100 mb-8'
                disabled={loading}
              >
                {!loading && 'Save Changes'}
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

export {TypeModal}
