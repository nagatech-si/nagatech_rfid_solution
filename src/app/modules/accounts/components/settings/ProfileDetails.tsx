import React, {useState} from 'react'
import {IProfile} from '../../model/ProfileModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'

import {useDispatch, useSelector} from 'react-redux'
import {RootState, uploadImage} from '../../../../../setup'
import * as profileRedux from '../../redux/ProfileRedux'

const profileDetailsSchema = Yup.object().shape({
  kode_perusahaan: Yup.string().required('Mohon Isi Kode Perusahaan'),
  nama_perusahaan: Yup.string().required('Mohon Isi Nama Perusahaan'),
  email: Yup.string().email().required('Mohon Isi Email'),
  no_hp: Yup.string().required('Mohon Isi Nomor Telepon'),
  alamat: Yup.string().required('Mohon Isi Alamat'),
  lokasi: Yup.string().required('Mohon Isi Lokasi'),
  logo: Yup.string().required('Mohon Pilih Logo'),
})

const ProfileDetails: React.FC = () => {
  const [companyLogo, setcompanyLogo] = useState('-')
  const dispatch = useDispatch()
  const profileDatas = useSelector<RootState>(({profile}) => profile.data) as IProfile[]
  let profileData = profileDatas.length > 0 ? profileDatas[0] : null

  const [loading, setLoading] = useState(false)
  const formik = useFormik<IProfile>({
    enableReinitialize: true,
    initialValues: {
      alamat: profileData?.alamat ?? '-',
      email: profileData?.email ?? '',
      kode_perusahaan: profileData?.kode_perusahaan ?? '',
      logo: profileData?.logo ?? '',
      lokasi: profileData?.lokasi ?? '',
      nama_perusahaan: profileData?.nama_perusahaan ?? '',
      no_hp: profileData?.no_hp ?? '',
    },
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        dispatch(profileRedux.actions.postProfile(values))

        setLoading(false)
      }, 1000)
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                <div
                  className='image-input image-input-outline'
                  data-kt-image-input='true'
                  style={{
                    backgroundImage: `url(${
                      companyLogo !== '-' ? companyLogo : formik.values.logo
                    })`,
                  }}
                >
                  <div
                    className='image-input-wrapper w-125px h-125px'
                    style={{
                      backgroundImage: `url(${
                        companyLogo !== '-' ? companyLogo : formik.values.logo
                      })`,
                    }}
                  ></div>
                </div>
                <div className='col-lg-6 fv-row mt-4'>
                  <input
                    type='file'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Company Picture'
                    onChange={async (e) => {
                      if (
                        e.currentTarget.files !== undefined &&
                        e.currentTarget.files !== null &&
                        e.currentTarget.files.length > 0
                      ) {
                        let image = e.currentTarget.files[0]
                        setLoading(true)
                        var publicURL = await uploadImage(image, 'logo/logo.png')
                        setLoading(false)
                        formik.setFieldValue('logo', publicURL)
                        setcompanyLogo(publicURL)
                      }
                    }}
                  />
                  {formik.touched.logo && formik.errors.logo && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.logo}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Company Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Company Name'
                      {...formik.getFieldProps('nama_perusahaan')}
                    />
                    {formik.touched.nama_perusahaan && formik.errors.nama_perusahaan && (
                      <div className='fv-plugins-message-container'>
                        <div className='text-danger'>{formik.errors.nama_perusahaan}</div>
                      </div>
                    )}
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Company Code'
                      {...formik.getFieldProps('kode_perusahaan')}
                    />
                    {formik.touched.kode_perusahaan && formik.errors.kode_perusahaan && (
                      <div className='fv-plugins-message-container'>
                        <div className='text-danger'>{formik.errors.kode_perusahaan}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Address</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Address'
                  {...formik.getFieldProps('alamat')}
                />
                {formik.touched.alamat && formik.errors.alamat && (
                  <div className='fv-plugins-message-container'>
                    <div className='text-danger'>{formik.errors.alamat}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Contact Phone</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Phone number'
                  {...formik.getFieldProps('no_hp')}
                />
                {formik.touched.no_hp && formik.errors.no_hp && (
                  <div className='fv-plugins-message-container'>
                    <div className='text-danger'>{formik.errors.no_hp}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Email</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Email'
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='text-danger'>{formik.errors.email}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Location</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Email'
                  {...formik.getFieldProps('lokasi')}
                />
                {formik.touched.lokasi && formik.errors.lokasi && (
                  <div className='fv-plugins-message-container'>
                    <div className='text-danger'>{formik.errors.lokasi}</div>
                  </div>
                )}
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

export {ProfileDetails}
