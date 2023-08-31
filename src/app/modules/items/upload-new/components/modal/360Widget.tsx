/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {FormikProps} from 'formik'

import {IRequestUploadItem} from '../../model/UploadNewHelper'
import {KTSVG} from '../../../../../../_metronic/helpers'

import Spin360 from 'react-360-spin'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const Image360Widget: FC<Props> = ({formik}) => {
  return (
    <div className='modal fade' id={`kt_modal_image_360`} aria-hidden='true'>
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
            <div className='flex d-flex justify-content-center border rounded'>
              <Spin360
                imageArray={formik.values.gambar360.map((value) => value.lokasi_gambar)}
                width={400}
                height={400}
                speed={3}
              />
            </div>
            <div className='flex d-flex justify-content-center mt-5'>
              <h5>Click And Drag to look around the product</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Image360Widget}
