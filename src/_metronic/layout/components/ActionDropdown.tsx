/* eslint-disable jsx-a11y/anchor-is-valid */
import {useIntl} from 'react-intl'
import ReactTooltip from 'react-tooltip'
import Swal from 'sweetalert2'

interface IDropdownAction {
  handleDelete: Function
  handleUpdate?: Function
  modalName: string
}

const DropdownAction: React.FC<IDropdownAction> = ({handleDelete, handleUpdate, modalName}) => {
  const intl = useIntl()
  return (
    <div className='text-end'>
      <ReactTooltip />
      {handleUpdate ? (
        <button
          type='button'
          data-bs-toggle='modal'
          data-bs-target={`#${modalName}`}
          data-tip={intl.formatMessage({id: 'UPDATE'})}
          className='btn  btn-sm btn-icon btn-light-facebook me-5'
          onClick={() => {
            handleUpdate()
          }}
        >
          <i className='fa fa-file fs-4'></i>
        </button>
      ) : (
        <></>
      )}
      <button
        type='button'
        className='btn btn-sm btn-icon btn-light-google me-5'
        data-tip={intl.formatMessage({id: 'DELETE'})}
        onClick={() => {
          Swal.fire({
            title: intl.formatMessage({id: 'TITLE.CONFIRM'}),
            text: intl.formatMessage({id: 'SUBTITLE.CONFIRM'}),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            heightAuto: false,
            confirmButtonText: intl.formatMessage({id: 'CONFIRM.TEXT'}),
          }).then((result) => {
            if (result.isConfirmed) {
              handleDelete()
            }
          })
        }}
      >
        <i className='fa fa-trash fs-4'></i>
      </button>
    </div>
  )
}

export {DropdownAction}
