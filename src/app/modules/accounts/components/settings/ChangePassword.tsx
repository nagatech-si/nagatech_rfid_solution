import React, {useState} from 'react'
import {IChangePassword} from '../../model/ProfileModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import * as profileRedux from '../../redux/ProfileRedux'

import {useDispatch} from 'react-redux'

const changePasswordSchema = Yup.object().shape({
  password: Yup.string().required('Mohon Isi Password'),
  new_password: Yup.string().required('Mohon Isi Password baru'),
  retype_password: Yup.string()
    .required('Mohon Isi Ulangi Password')
    .oneOf([Yup.ref('new_password')], 'Password harus sama'),
})

const ChangePasswordWidget: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const formik = useFormik<IChangePassword>({
    enableReinitialize: true,
    initialValues: {
      password: '',
      new_password: '',
      retype_password: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      setLoading(true)
      console.log(values)

      dispatch(profileRedux.actions.postChangePassword(values))

      setLoading(false)
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_change_password'
        aria-expanded='true'
        aria-controls='kt_account_change_password'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Change Password</h3>
        </div>
      </div>

      <div id='kt_account_change_password' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Password</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='password'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Password'
                      {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className='fv-plugins-message-container'>
                        <div className='text-danger'>{formik.errors.password}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>New Password</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='password'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='New Password'
                      {...formik.getFieldProps('new_password')}
                    />
                    {formik.touched.new_password && formik.errors.new_password && (
                      <div className='fv-plugins-message-container'>
                        <div className='text-danger'>{formik.errors.new_password}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Retype Password
              </label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='password'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Retype Password'
                      {...formik.getFieldProps('retype_password')}
                    />
                    {formik.touched.retype_password && formik.errors.retype_password && (
                      <div className='fv-plugins-message-container'>
                        <div className='text-danger'>{formik.errors.retype_password}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
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
  )
}

export {ChangePasswordWidget}
