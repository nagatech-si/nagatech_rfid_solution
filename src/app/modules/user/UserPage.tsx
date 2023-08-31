import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {ClosingPOWidget} from './closing-po/ClosingPO'
import {useIntl} from 'react-intl'

const userBreadCrumbs: Array<PageLink> = [
  {
    title: 'Manage User',
    path: '/manage/user',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const MasterPage: React.FC = () => {
  const intl = useIntl()
  return (
    <Switch>
      <Route path='/manage/user/closing-po'>
        <PageTitle breadcrumbs={userBreadCrumbs}>
          {intl.formatMessage({id: 'CLOSING.PO.ORDER'})}
        </PageTitle>
        <ClosingPOWidget className='mb-5 mb-xl-8' />
      </Route>

      <Redirect from='/manage/user' exact={true} to='/manage/user/user-data' />
      <Redirect to='/manage/user/user-data' />
    </Switch>
  )
}

export default MasterPage
