import {useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {useIntl} from 'react-intl'

const SubmitButton = () => {
  const intl = useIntl()
  const isSubmitting: boolean = useSelector<RootState>(
    (state) => state.loading.isSubmittingAPI || false
  ) as boolean
  return (
    <button
      disabled={isSubmitting}
      type='submit'
      className='btn btn-light-primary fw-bolder w-100 mb-8'
    >
      {!isSubmitting && intl.formatMessage({id: 'SAVE.DATA'})}
      {isSubmitting && (
        <span className='indicator-progress' style={{display: 'block'}}>
          Please wait...{' '}
          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
        </span>
      )}
    </button>
  )
}

export default SubmitButton
