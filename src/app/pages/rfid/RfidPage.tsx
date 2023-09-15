import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import {OpnameWidget} from './opname/OpnameScreen'
import {LocatorWidget} from './locator/LocatorScreen'
import {SoldItemWidget} from './sold_item/soldItemScreen'
import {ShatterItemWidget} from './shatter_item/shatterItemScreen'
import {MoveItemWidget} from './move_item/moveItemScreen'
import {MoveItemOneTrayWidget} from './move_item_one_tray/moveItemOneTrayScreen'

const itemBreadCrumbs: Array<PageLink> = [
  {
    title: 'Rfid',
    path: '/rfid',
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
      <Route path='/rfid/opname'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>
          {intl.formatMessage({id: 'STOCK.OPNAME'})}
        </PageTitle>
        <OpnameWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/rfid/locator'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>
          {intl.formatMessage({id: 'STOCK.LOCATOR'})}
        </PageTitle>
        <LocatorWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/rfid/sold-item'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>
          {intl.formatMessage({id: 'STOCK.SOLD'})}
        </PageTitle>
        <SoldItemWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/rfid/shatter-item'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>
          {intl.formatMessage({id: 'SHATTER.ITEM'})}
        </PageTitle>
        <ShatterItemWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/rfid/move-item'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>{intl.formatMessage({id: 'MOVE.ITEM'})}</PageTitle>
        <MoveItemWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/rfid/one-tray'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>
          {intl.formatMessage({id: 'MOVE.ITEM.ONE.TRAY'})}
        </PageTitle>
        <MoveItemOneTrayWidget className='mb-5 mb-xl-8' />
      </Route>

      <Redirect from='/rfid' exact={true} to='/rfid/opname' />
      <Redirect to='/rfid/opname' />
    </Switch>
  )
}

export default ItemPage
