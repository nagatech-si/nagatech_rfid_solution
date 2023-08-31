/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {ISlider} from '../model/SliderModal'
import {useDispatch} from 'react-redux'
import * as sampleTypeRedux from '../redux/SliderRedux'
import {uploadImage} from '../../../../../setup'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'

const sliderSchema = Yup.object().shape({
  lokasi_gambar: Yup.string().required('Required Image'),
})

const SliderModal: FC = () => {
  const dispatch = useDispatch()
  const [Slider, setSlider] = useState<string>('-')
  const [loading, setLoading] = useState(false)
  const [SelectedFile, setSelectedFile] = useState<File | null>(null)
  const formik = useFormik<ISlider>({
    enableReinitialize: true,
    initialValues: {
      _id: '',
      lokasi_gambar: 'Upload File',
    },
    validationSchema: sliderSchema,
    onSubmit: (values) => {
      if (SelectedFile === null) {
        formik.setFieldError('lokasi_gambar', 'Please Select Image')
        return
      }
      setLoading(true)
      setTimeout(async () => {
        setLoading(true)
        var publicURL = await uploadImage(SelectedFile!, `slider/${generateAlphanumeric(5)}.png`)
        dispatch(
          sampleTypeRedux.actions.postSlider({
            _id: '1',
            lokasi_gambar: publicURL,
          })
        )
        setLoading(false)
        setSlider('-')
        formik.resetForm()
      })
    },
  })
  return (
    <div className='modal fade' id='kt_modal_slider' aria-hidden='true'>
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
                <h1 className='mb-3'>{'Add Slider'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row text-center'>
                <div className='col-lg-4'></div>
                <div className='col-lg-4'>
                  <div className='card card-custom overlay overflow-hidden '>
                    <div className='card-body p-0'>
                      {Slider !== null || Slider !== '-' ? (
                        <div className='overlay-wrapper'>
                          <img src={Slider!} alt='' className='w-100 rounded' />
                        </div>
                      ) : null}
                      <div className='overlay-layer bg-dark bg-opacity-10'>
                        <button
                          type='button'
                          onClick={() => {
                            setSlider('-')
                          }}
                          className='btn btn-light-danger btn-shadow ms-2'
                        >
                          <span className='svg-icon svg-icon-1'>
                            <KTSVG
                              path='/media/icons/duotune/files/fil007.svg'
                              className='svg-icon-muted svg-icon-1'
                            />
                          </span>
                          {!loading && 'Delete'}
                          {loading && (
                            <span className='indicator-progress' style={{display: 'block'}}>
                              Please wait...{' '}
                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4'></div>
              </div>
              <div className='col-lg-12 fv-row mt-4 mb-4'>
                <input
                  type='file'
                  className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                  placeholder='Slider Image'
                  name='lokasi_gambar'
                  onBlur={formik.handleBlur}
                  onChange={async (e) => {
                    if (
                      e.currentTarget.files !== undefined &&
                      e.currentTarget.files !== null &&
                      e.currentTarget.files.length > 0
                    ) {
                      let image = e.currentTarget.files[0]
                      const reader = new FileReader()
                      reader.readAsDataURL(image) // assuming "image" is your file

                      reader.onload = () => {
                        formik.setFieldValue('logo', reader.result)
                        setSlider(reader.result?.toString() ?? '-')
                      }
                      setSelectedFile(image)
                    }
                  }}
                />
                {formik.touched.lokasi_gambar && formik.errors.lokasi_gambar && (
                  <div className='fv-plugins-message-container'>
                    <div className='text-danger'>{formik.errors.lokasi_gambar}</div>
                  </div>
                )}
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

export {SliderModal}
