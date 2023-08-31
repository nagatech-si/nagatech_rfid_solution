/* eslint-disable jsx-a11y/anchor-is-valid */
import {FormikProps} from 'formik'
import React, {FC} from 'react'
import {IRequestUploadItem, Size} from '../model/UploadNewHelper'
import {SizeModal} from './modal/SizeModal'

type Props = {
  formik: FormikProps<IRequestUploadItem>
  indexMaterial: number
  indexSize: number
  prevSize: Size
}

export const MaterialDropdown: FC<Props> = ({formik, indexMaterial, indexSize, prevSize}) => {
  return (
    <>
      <div className='menu menu-sub menu-sub-dropdown w-180px w-md-230px' data-kt-menu='true'>
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Available Action</div>
        </div>

        <div className='separator border-gray-200'></div>

        <div className='px-5 py-5'>
          <div className='flex d-flex justify-content-center'>
            <a
              href='#'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_edit_size'
              className='btn  btn-sm btn-icon btn-light-instagram me-5'
            >
              <i className='bi bi-pencil-fill fs-4'></i>
            </a>
            <a
              href='#'
              className='btn  btn-sm btn-icon btn-light-facebook me-5'
              onClick={() => {
                console.log(formik.values.material[indexMaterial].size.push(prevSize))
              }}
            >
              <i className='bi bi-clipboard2-plus-fill fs-4'></i>
            </a>
            <a
              href='#'
              data-bs-toggle='modal'
              data-bs-target={`#2344`}
              className='btn  btn-sm btn-icon btn-light-google me-5'
              onClick={() => {}}
            >
              <i className='bi bi-x-octagon-fill'></i>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
