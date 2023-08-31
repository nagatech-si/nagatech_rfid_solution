/* eslint-disable jsx-a11y/anchor-is-valid */
import {useIntl} from 'react-intl'
import ReactTooltip from 'react-tooltip'
import Swal from 'sweetalert2'

interface IDropdownActionCustomer {
  handleDelete: Function
  handleSuspend: Function
  handleUnsusped: Function
  customerActive: boolean
}

const DropdownActionCustomer: React.FC<IDropdownActionCustomer> = ({
  handleDelete,
  handleSuspend,
  handleUnsusped,
  customerActive,
}) => {
  const intl = useIntl()
  return (
    <div className='text-end'>
      <ReactTooltip />
      {customerActive ? (
        <button
          type='button'
          className='btn  btn-sm btn-icon btn-light-instagram me-5'
          data-tip={intl.formatMessage({id: 'SUSPEND.CUSTOMER'})}
          onClick={() => {
            handleSuspend()
          }}
        >
          <i className='fa fa-power-off fs-4'></i>
        </button>
      ) : (
        <button
          className='btn  btn-sm btn-icon btn-light-twitter me-5'
          data-tip={intl.formatMessage({id: 'UNSUSPEND.CUSTOMER'})}
          onClick={() => {
            handleUnsusped()
          }}
        >
          <i className='fa fa-power-off fs-4'></i>
        </button>
      )}

      <button
        type='button'
        className='btn btn-sm btn-icon btn-light-google me-5'
        data-tip={intl.formatMessage({id: 'DELETE.CUSTOMER'})}
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
        <i className='fa fa-user-minus fs-4'></i>
      </button>
    </div>
  )
}

export {DropdownActionCustomer}
