import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import {ReportItemWidget} from './item/ReportItem'
import {ReportOpnameWidget} from './opname/ReportOpname'
import {ReportSoldItemWidget} from './sold_item/ReportSoldItem'
import {ReportShatterItemWidget} from './shatter_item/ReportShatterItem'
import {ReportMoveItemWidget} from './move_item/ReportMoveItem'

const itemBreadCrumbs: Array<PageLink> = [
  {
    title: 'Report',
    path: '/report',
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

const ItemPage: React.FC = () => {
  const intl = useIntl()
  return (
    <Switch>
      <Route path='/report/item'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>
          {intl.formatMessage({id: 'REPORT.ITEM'})}
        </PageTitle>
        <ReportItemWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/report/stock-opname'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>
          {intl.formatMessage({id: 'REPORT.OPNAME'})}
        </PageTitle>
        <ReportOpnameWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/report/sold-item'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>
          {intl.formatMessage({id: 'REPORT.STOCK.SOLD'})}
        </PageTitle>
        <ReportSoldItemWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/report/shatter-item'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>
          {intl.formatMessage({id: 'REPORT.SHATTER.ITEM'})}
        </PageTitle>
        <ReportShatterItemWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/report/move-item'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>
          {intl.formatMessage({id: 'REPORT.MOVE.ITEM'})}
        </PageTitle>
        <ReportMoveItemWidget className='mb-5 mb-xl-8' />
      </Route>

      <Redirect from='/report' exact={true} to='/report/item' />
      <Redirect to='/report/item' />
    </Switch>
  )
}

export default ItemPage
