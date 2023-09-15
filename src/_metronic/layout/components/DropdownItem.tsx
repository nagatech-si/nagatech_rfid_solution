/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import generateAlphanumeric from '../../helpers/Generator'

interface IDropdownBarangAction {
  handleImage?: Function
  handleUpdate?: Function
  handleDuplicate?: Function
  handleDelete?: Function
  modalName: string
  modalDuplicateName?: string
  modalImageName?: string
  DeleteName?: string
}
export const DropdownItem: FC<IDropdownBarangAction> = ({
  handleImage,
  handleUpdate,
  handleDuplicate,
  modalName,
  modalDuplicateName,
  modalImageName,
  handleDelete,
}) => {
  const intl = useIntl()
  return (
    <div
      key={generateAlphanumeric(4)}
      className='menu menu-sub menu-sub-dropdown w-250px w-md-300px'
      data-kt-menu='true'
    >
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Action Options</div>
      </div>

      <div className='separator border-gray-200'></div>

      <div className='px-7 py-5'>
        {handleUpdate ? (
          <button
            type='button'
            data-bs-toggle='modal'
            data-bs-target={`#${modalName}`}
            data-tip={intl.formatMessage({id: 'UPDATE'})}
            className='btn btn-warning btn-icon w-100 me-5 mb-5'
            onClick={() => {
              handleUpdate()
            }}
          >
            <i className='fa fa-file fs-4'></i>
          </button>
        ) : (
          <></>
        )}
        {handleDuplicate ? (
          <button
            type='button'
            data-bs-toggle='modal'
            data-bs-target={`#${modalDuplicateName}`}
            data-tip={intl.formatMessage({id: 'DUPLICATE'}, {name: ''})}
            className='btn btn-secondary btn-icon w-100 me-5 mb-5'
            onClick={() => {
              handleDuplicate()
            }}
          >
            <i className='bi bi-clipboard-check-fill fs-4'></i>
          </button>
        ) : (
          <></>
        )}
        {handleImage ? (
          <button
            type='button'
            data-bs-toggle='modal'
            data-bs-target={`#${modalImageName}`}
            className='btn btn-primary btn-icon w-100 me-5 mb-5'
            data-tip={intl.formatMessage({id: 'SHOW.IMAGE'})}
            onClick={() => {
              handleImage()
            }}
          >
            <i className='fa fa-image fs-4'></i>
          </button>
        ) : null}
        {handleDelete ? (
          <button
            type='button'
            data-bs-toggle='modal'
            data-bs-target={`#${modalImageName}`}
            className='btn btn-danger btn-icon w-100 me-5 mb-5'
            data-tip={intl.formatMessage({id: 'DELETE.ITEM'})}
            onClick={() => {
              handleDelete()
            }}
          >
            <i className='fa fa-trash fs-4'></i>
          </button>
        ) : null}
      </div>
    </div>
  )
  // return (
  //   <div
  //     className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px px-10 py-10'
  //     data-kt-menu='true'
  //   >

  //   </div>
  // )
}
