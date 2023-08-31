import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import {GroupWidget} from './group/Group'
import {TypeWidget} from './type/Type'

const masterBreadCrumbs: Array<PageLink> = [
  {
    title: 'Master',
    path: '/master',
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
      <Route path='/master/group'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'MASTER.GROUP'})}
        </PageTitle>
        <GroupWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/type'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'MASTER.TYPE'})}
        </PageTitle>
        <TypeWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/warehouse'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'MASTER.WAREHOUSE'})}
        </PageTitle>
        <GroupWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/tray'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'MASTER.TRAY'})}
        </PageTitle>
        <GroupWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/price-tag'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'MASTER.PRICE.TAG'})}
        </PageTitle>
        <GroupWidget className='mb-5 mb-xl-8' />
      </Route>

      <Redirect from='/master' exact={true} to='/master/group' />
      <Redirect to='/master/group' />
    </Switch>
  )
}

export default MasterPage
