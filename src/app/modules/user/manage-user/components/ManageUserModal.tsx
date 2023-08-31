/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {IManageUser, typeUser} from '../model/ManageUserModel'
import {useDispatch, useSelector} from 'react-redux'
import * as sampleTypeRedux from '../redux/ManageUserRedux'
import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'

const manageUserSchema = Yup.object().shape({
  user_id: Yup.string().required('Mohon Isi UserID'),
  nama_lkp: Yup.string().required('Mohon Isi Nama Lengkap'),
  type: Yup.string().required('Mohon Pilih Type User'),
  password: Yup.string().required('Mohon Isi Password'),
  retype_password: Yup.string()
    .required('Mohon Isi Repassword')
    .oneOf([Yup.ref('password'), null], 'Password Tida Sama'),
})

const editManageUserSchema = Yup.object().shape({
  user_id: Yup.string().required('Mohon Isi UserID'),
  nama_lkp: Yup.string().required('Mohon Isi Nama Lengkap'),
  type: Yup.string().required('Mohon Pilih Type User'),
})

const ManageUserModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: IManageUser | null = useSelector<RootState>(
    ({manageUser}) => manageUser.payload
  ) as IManageUser | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)
  const intl = useIntl()
  const formik = useFormik<IManageUser>({
    enableReinitialize: true,
    initialValues: {
      user_id: createMode ? '' : prevData?.user_id ?? '-',
      nama_lkp: createMode ? '' : prevData?.nama_lkp ?? '',
      password: createMode ? '' : prevData?.password ?? '',
      retype_password: createMode ? '' : prevData?.retype_password ?? '',
      type: createMode ? typeUser.owner : prevData?.type ?? typeUser.owner,
      input_by: '-',
      input_date: '-',
    },
    validationSchema: createMode ? manageUserSchema : editManageUserSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(sampleTypeRedux.actions.postManageUser(values))
        } else {
          dispatch(sampleTypeRedux.actions.editManageUser(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  return (
    <div className='modal fade' id='kt_modal_manage_user' aria-hidden='true'>
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
                <h1 className='mb-3'>{!createMode ? 'Edit User' : 'Add User'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'USER.ID'})}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    disabled={!createMode}
                    key={'user_id'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage({id: 'USER.ID'})}
                    {...formik.getFieldProps('user_id')}
                  />
                  {formik.touched.user_id && formik.errors.user_id && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.user_id}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'FULL.NAME'})}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'nama_lkp'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage({id: 'FULL.NAME'})}
                    {...formik.getFieldProps('nama_lkp')}
                  />
                  {formik.touched.nama_lkp && formik.errors.nama_lkp && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.nama_lkp}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label fw-bold fs-6'>
                  <span className='required'>{intl.formatMessage({id: 'COUNTRY'})}</span>
                </label>

                <div className='col-lg-7 fv-row'>
                  <select
                    className='form-select form-select-solid form-select-lg fw-bold'
                    {...formik.getFieldProps('type')}
                  >
                    <option value=''>Select a Type...</option>
                    <option value={typeUser.admin}>{typeUser.admin}</option>
                    <option value={typeUser.manager}>{typeUser.manager}</option>
                    <option value={typeUser.marketing}>{typeUser.marketing}</option>
                    <option value={typeUser.owner}>{typeUser.owner}</option>
                    <option value={typeUser.supervisor}>{typeUser.supervisor}</option>
                  </select>
                  {formik.touched.type && formik.errors.type && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.type}</div>
                    </div>
                  )}
                </div>
              </div>
              {createMode ? (
                <>
                  <div className='row mb-6'>
                    <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                      {intl.formatMessage({id: 'AUTH.INPUT.PASSWORD'})}
                    </label>

                    <div className='col-lg-7 fv-row'>
                      <input
                        type='password'
                        key={'password'}
                        className='form-control form-control-lg form-control-solid'
                        placeholder={intl.formatMessage({id: 'AUTH.INPUT.PASSWORD'})}
                        {...formik.getFieldProps('password')}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <div className='fv-plugins-message-container'>
                          <div className='text-danger'>{formik.errors.password}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                      {intl.formatMessage({id: 'AUTH.INPUT.CONFIRM_PASSWORD'})}
                    </label>

                    <div className='col-lg-7 fv-row'>
                      <input
                        type='password'
                        key={'password'}
                        className='form-control form-control-lg form-control-solid'
                        placeholder={intl.formatMessage({id: 'AUTH.INPUT.CONFIRM_PASSWORD'})}
                        {...formik.getFieldProps('retype_password')}
                      />
                      {formik.touched.retype_password && formik.errors.retype_password && (
                        <div className='fv-plugins-message-container'>
                          <div className='text-danger'>{formik.errors.retype_password}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

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

export {ManageUserModal}
