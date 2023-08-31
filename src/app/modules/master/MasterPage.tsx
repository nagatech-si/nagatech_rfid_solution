import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SampleTypeWidget} from './sample-type/SampleType'
import {SampleQuantityTypeWidget} from './sample-quantity-type/SampleQuantityType'
import {MaterialTypeWidget} from './material-type/MaterialType'
import {SampleCategoryWidget} from './sample-category/SampleCategory'
import {FinishTypeWidget} from './finish-type/FinishType'
import {ChainTypeWidget} from './chain-type/ChainType'
import {FindingWidget} from './finding/Finding'
import {useIntl} from 'react-intl'

const masterBreadCrumbs: Array<PageLink> = [
  {
    title: 'Master',
    path: '/master/list/list',
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
      <Route path='/master/list/sample-type'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'SAMPLE.TYPE'})}
        </PageTitle>
        <SampleTypeWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/list/sample-category'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'SAMPLE.CATEGORY'})}
        </PageTitle>
        <SampleCategoryWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/list/sample-quantity-type'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'SAMPLE.QUANTITY_TYPE'})}
        </PageTitle>
        <SampleQuantityTypeWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/list/material-type'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'MATERIAL.TYPE'})}
        </PageTitle>
        <MaterialTypeWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/list/finish-type'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'FINISH.TYPE'})}
        </PageTitle>
        <FinishTypeWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/list/chain-type'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>
          {intl.formatMessage({id: 'CHAIN.TYPE'})}
        </PageTitle>
        <ChainTypeWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/list/finding'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>{intl.formatMessage({id: 'FINDING'})}</PageTitle>
        <FindingWidget className='mb-5 mb-xl-8' />
      </Route>

      <Redirect from='/master/list' exact={true} to='/master/list/sample-type' />
      <Redirect to='/master/list/sample-type' />
    </Switch>
  )
}

export default MasterPage
