import {useIntl} from 'react-intl'
export interface INotification {
  success: string
  failed: string
  addSuccess: string
  addFailed: string
  updateSuccess: string
  updateFailed: string
  deleteSuccess: string
  deleteFailed: string
}

function useNotification() {
  const intl = useIntl()

  const data: INotification = {
    success: intl.formatMessage({id: 'SUCCESS'}),
    failed: intl.formatMessage({id: 'FAILED'}),
    addFailed: intl.formatMessage({id: 'DATA.FAILED.SAVED'}),
    addSuccess: intl.formatMessage({id: 'DATA.SUCCESS.SAVED'}),
    deleteFailed: intl.formatMessage({id: 'DATA.FAILED.DELETED'}),
    deleteSuccess: intl.formatMessage({id: 'DATA.SUCCESS.DELETED'}),
    updateFailed: intl.formatMessage({id: 'DATA.FAILED.EDITED'}),
    updateSuccess: intl.formatMessage({id: 'DATA.SUCCESS.EDITED'}),
  }

  return data
}

export default useNotification
