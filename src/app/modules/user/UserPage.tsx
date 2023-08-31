import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ManageUserWidget} from './manage-user/ManageUser'
import {CustomerActiveWidget} from './customer-active/CustomerActive'
import {CustomerVerificationWidget} from './customer-verification/CustomerVerification'
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
      <Route path='/manage/user/user-data'>
        <PageTitle breadcrumbs={userBreadCrumbs}>{intl.formatMessage({id: 'USER.DATA'})}</PageTitle>
        <ManageUserWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/manage/user/customer-active'>
        <PageTitle breadcrumbs={userBreadCrumbs}>
          {intl.formatMessage({id: 'CUSTOMER.ACTIVE'})}
        </PageTitle>
        <CustomerActiveWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/manage/user/customer-verification'>
        <PageTitle breadcrumbs={userBreadCrumbs}>
          {intl.formatMessage({id: 'CUSTOMER.VERIFICATION'})}
        </PageTitle>
        <CustomerVerificationWidget className='mb-5 mb-xl-8' />
      </Route>
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
