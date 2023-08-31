/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {FormikProps, useFormik} from 'formik'

import {IRequestUploadItem, Size} from '../../model/UploadNewHelper'
import {KTSVG} from '../../../../../../_metronic/helpers'

import hideModal from '../../../../../../_metronic/helpers/ModalHandler'

type Props = {
  formikMaterial: FormikProps<IRequestUploadItem>
  indexSize: number
  indexMaterial: number
  prevSize: Size
}

const SizeModal: FC<Props> = ({formikMaterial, prevSize, indexMaterial, indexSize}) => {
  const [loading, setLoading] = useState(false)

  const formik = useFormik<Size>({
    enableReinitialize: true,
    initialValues: {
      size: prevSize.size,
      gross_weight: prevSize.gross_weight,
      nett_weight: prevSize.nett_weight,
      size_id: prevSize.size_id,
    },
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    },
  })
  return (
    <div className='modal fade' id={`kt_modal_edit_size_${indexSize}`} aria-hidden='true'>
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

          <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-13'>
              <h1 className='mb-3'>Edit Size</h1>

              <div className='text-muted fw-bold fs-5'>
                Please fill all field below and then click save
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-5 col-form-label required fw-bold fs-6'>Size</label>

              <div className='col-lg-7 fv-row'>
                <input
                  type='text'
                  key={'size'}
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Size'
                  {...formik.getFieldProps('size')}
                />
                {formik.touched.size && formik.errors.size && (
                  <div className='fv-plugins-message-container'>
                    <div className='text-danger'>{formik.errors.size}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-5 col-form-label required fw-bold fs-6'>Nett Weight</label>

              <div className='col-lg-7 fv-row'>
                <input
                  type='text'
                  key={'nett_weight'}
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Nett Weight'
                  {...formik.getFieldProps('nett_weight')}
                />
                {formik.touched.nett_weight && formik.errors.nett_weight && (
                  <div className='fv-plugins-message-container'>
                    <div className='text-danger'>{formik.errors.nett_weight}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-5 col-form-label required fw-bold fs-6'>Gross Weight</label>

              <div className='col-lg-7 fv-row'>
                <input
                  type='text'
                  key={'gross_weight'}
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Gross Weight'
                  {...formik.getFieldProps('gross_weight')}
                />
                {formik.touched.gross_weight && formik.errors.gross_weight && (
                  <div className='fv-plugins-message-container'>
                    <div className='text-danger'>{formik.errors.gross_weight}</div>
                  </div>
                )}
              </div>
            </div>

            <button
              type='button'
              className='btn btn-light-primary fw-bolder w-100 mb-8'
              disabled={loading}
              onClick={() => {
                formikMaterial.setFieldValue(
                  `material.${indexMaterial}.size.${indexSize}`,
                  formik.values
                )
                hideModal()
              }}
            >
              {!loading && 'Save Changes' + indexSize}
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
  )
}

export {SizeModal}
