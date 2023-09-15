/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useIntl} from 'react-intl'
import {IOpnameItem} from '../../opname/model/opnameModel'

type Props = {
  item: IOpnameItem | null
}

const ShowItemInfoLocatorModal: FC<Props> = ({item}) => {
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_item_info' aria-hidden='true'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export {ShowItemInfoLocatorModal}
