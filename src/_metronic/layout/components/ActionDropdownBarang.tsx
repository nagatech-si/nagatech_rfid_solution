/* eslint-disable jsx-a11y/anchor-is-valid */
import ReactTooltip from 'react-tooltip'
import {KTSVG} from '../../helpers'
import {DropdownItem} from './DropdownItem'
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

const DropdownBarangAction: React.FC<IDropdownBarangAction> = ({
  handleImage,
  handleUpdate,
  handleDuplicate,
  modalName,
  modalDuplicateName,
  modalImageName,
  handleDelete,
}) => {
  return (
    <div className='text-center'>
      <ReactTooltip />
      <button
        key={generateAlphanumeric(2)}
        type='button'
        className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
        data-kt-menu-flip='top-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
      </button>
      <DropdownItem
        modalName={modalName}
        DeleteName=''
        handleDuplicate={handleDuplicate}
        handleImage={handleImage}
        handleUpdate={handleUpdate}
        modalDuplicateName={modalDuplicateName}
        modalImageName={modalImageName}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export {DropdownBarangAction}
