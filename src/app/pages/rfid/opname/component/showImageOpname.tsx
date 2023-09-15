/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useIntl} from 'react-intl'

type Props = {
  imageURL: string
}

const ShowImageOpnameModal: FC<Props> = ({imageURL}) => {
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_gambar_barang_opname' aria-hidden='true'>
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
          <div className='modal-body  mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-5'>
              <h1 className='mb-3'>{intl.formatMessage({id: 'SHOW.IMAGE.ITEM'})}</h1>
            </div>
            <img className='col-lg-12 mb-3 rounded' alt='imageTaken' src={imageURL} />
          </div>
        </div>
      </div>
    </div>
  )
}

export {ShowImageOpnameModal}
